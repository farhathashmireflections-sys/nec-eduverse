
-- 1. Add missing columns to students table
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS parent_name text;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS parent_phone text;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS student_code text;

-- 2. Create permission RPC functions used by useSchoolPermissions
CREATE OR REPLACE FUNCTION public.can_manage_staff(_school_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
      AND school_id = _school_id
      AND role IN ('school_owner','principal','vice_principal','hr_manager')
  )
$$;

CREATE OR REPLACE FUNCTION public.can_manage_students(_school_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
      AND school_id = _school_id
      AND role IN ('school_owner','principal','vice_principal','teacher','academic_coordinator')
  )
$$;

CREATE OR REPLACE FUNCTION public.can_work_crm(_school_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
      AND school_id = _school_id
      AND role IN ('school_owner','principal','vice_principal','marketing_staff')
  )
$$;

CREATE OR REPLACE FUNCTION public.can_manage_finance(_school_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
      AND school_id = _school_id
      AND role IN ('school_owner','principal','vice_principal','accountant')
  )
$$;

-- has_role with _school_id + _role signature (useSchoolPermissions calls it this way)
CREATE OR REPLACE FUNCTION public.has_role(_school_id uuid, _role text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
      AND school_id = _school_id
      AND role = _role
  )
$$;

-- 3. Create messaging tables
CREATE TABLE IF NOT EXISTS public.admin_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  sender_user_id uuid NOT NULL,
  content text NOT NULL,
  subject text,
  reply_to_id uuid,
  attachment_urls jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.admin_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "am_select" ON public.admin_messages FOR SELECT USING (is_school_member(auth.uid(), school_id));
CREATE POLICY "am_insert" ON public.admin_messages FOR INSERT WITH CHECK (is_school_member(auth.uid(), school_id));
CREATE POLICY "am_delete" ON public.admin_messages FOR DELETE USING (sender_user_id = auth.uid());

CREATE TABLE IF NOT EXISTS public.admin_message_recipients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid NOT NULL,
  recipient_user_id uuid NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.admin_message_recipients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "amr_select" ON public.admin_message_recipients FOR SELECT USING (
  recipient_user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.admin_messages am WHERE am.id = message_id AND am.sender_user_id = auth.uid()
  )
);
CREATE POLICY "amr_insert" ON public.admin_message_recipients FOR INSERT WITH CHECK (true);
CREATE POLICY "amr_update" ON public.admin_message_recipients FOR UPDATE USING (recipient_user_id = auth.uid());
CREATE POLICY "amr_delete" ON public.admin_message_recipients FOR DELETE USING (recipient_user_id = auth.uid());

CREATE TABLE IF NOT EXISTS public.cleared_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  user_id uuid NOT NULL,
  partner_user_id uuid NOT NULL,
  cleared_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(school_id, user_id, partner_user_id)
);
ALTER TABLE public.cleared_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cc_all" ON public.cleared_conversations FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE TABLE IF NOT EXISTS public.app_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  user_id uuid NOT NULL,
  title text NOT NULL,
  body text,
  link text,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.app_notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "an_select" ON public.app_notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "an_insert" ON public.app_notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "an_update" ON public.app_notifications FOR UPDATE USING (user_id = auth.uid());

-- 4. Create exams table
CREATE TABLE IF NOT EXISTS public.exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  title text NOT NULL,
  exam_type text NOT NULL DEFAULT 'term',
  class_section_id uuid,
  subject_id uuid,
  max_marks numeric NOT NULL DEFAULT 100,
  exam_date date,
  term_label text,
  status text NOT NULL DEFAULT 'draft',
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "exams_select" ON public.exams FOR SELECT USING (is_school_member(auth.uid(), school_id));
CREATE POLICY "exams_manage" ON public.exams FOR ALL USING (
  has_school_role(auth.uid(), school_id, 'teacher') OR
  has_school_role(auth.uid(), school_id, 'principal') OR
  has_school_role(auth.uid(), school_id, 'vice_principal')
) WITH CHECK (
  has_school_role(auth.uid(), school_id, 'teacher') OR
  has_school_role(auth.uid(), school_id, 'principal') OR
  has_school_role(auth.uid(), school_id, 'vice_principal')
);

-- 5. Create diary_entries table
CREATE TABLE IF NOT EXISTS public.diary_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  class_section_id uuid NOT NULL,
  entry_date date NOT NULL DEFAULT CURRENT_DATE,
  content text,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.diary_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "de_select" ON public.diary_entries FOR SELECT USING (is_school_member(auth.uid(), school_id));
CREATE POLICY "de_manage" ON public.diary_entries FOR ALL USING (
  has_school_role(auth.uid(), school_id, 'teacher') OR
  has_school_role(auth.uid(), school_id, 'principal') OR
  has_school_role(auth.uid(), school_id, 'vice_principal')
) WITH CHECK (
  has_school_role(auth.uid(), school_id, 'teacher') OR
  has_school_role(auth.uid(), school_id, 'principal') OR
  has_school_role(auth.uid(), school_id, 'vice_principal')
);

-- 6. Create notices table
CREATE TABLE IF NOT EXISTS public.notices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  title text NOT NULL,
  content text,
  audience text NOT NULL DEFAULT 'all',
  is_pinned boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notices_select" ON public.notices FOR SELECT USING (is_school_member(auth.uid(), school_id));
CREATE POLICY "notices_manage" ON public.notices FOR ALL USING (
  has_school_role(auth.uid(), school_id, 'principal') OR
  has_school_role(auth.uid(), school_id, 'vice_principal') OR
  has_school_role(auth.uid(), school_id, 'school_owner')
) WITH CHECK (
  has_school_role(auth.uid(), school_id, 'principal') OR
  has_school_role(auth.uid(), school_id, 'vice_principal') OR
  has_school_role(auth.uid(), school_id, 'school_owner')
);

-- Enable realtime for messaging tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_message_recipients;
ALTER PUBLICATION supabase_realtime ADD TABLE public.app_notifications;

-- Create storage bucket for message attachments
INSERT INTO storage.buckets (id, name, public) VALUES ('message-attachments', 'message-attachments', true) ON CONFLICT (id) DO NOTHING;
CREATE POLICY "msg_attach_select" ON storage.objects FOR SELECT USING (bucket_id = 'message-attachments');
CREATE POLICY "msg_attach_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'message-attachments' AND auth.role() = 'authenticated');
