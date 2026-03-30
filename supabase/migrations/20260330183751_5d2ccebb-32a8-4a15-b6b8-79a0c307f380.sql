
-- 1. Add missing column to school_exams
ALTER TABLE public.school_exams ADD COLUMN IF NOT EXISTS description text;

-- 2. Create all missing tables referenced by the codebase

-- admin_message_pins
CREATE TABLE IF NOT EXISTS public.admin_message_pins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid NOT NULL,
  user_id uuid NOT NULL,
  school_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(message_id, user_id)
);
ALTER TABLE public.admin_message_pins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "amp_all" ON public.admin_message_pins FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "amp_select" ON public.admin_message_pins FOR SELECT USING (is_school_member(auth.uid(), school_id));

-- admin_message_reactions
CREATE TABLE IF NOT EXISTS public.admin_message_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid NOT NULL,
  user_id uuid NOT NULL,
  school_id uuid NOT NULL,
  emoji text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(message_id, user_id, emoji)
);
ALTER TABLE public.admin_message_reactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "amr2_all" ON public.admin_message_reactions FOR ALL USING (is_school_member(auth.uid(), school_id)) WITH CHECK (is_school_member(auth.uid(), school_id));

-- ai_timetable_suggestions
CREATE TABLE IF NOT EXISTS public.ai_timetable_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  suggestion jsonb DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'pending',
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.ai_timetable_suggestions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ats_select" ON public.ai_timetable_suggestions FOR SELECT USING (is_school_member(auth.uid(), school_id));
CREATE POLICY "ats_manage" ON public.ai_timetable_suggestions FOR ALL USING (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'vice_principal')
) WITH CHECK (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'vice_principal')
);

-- class_section_subjects (code uses this instead of section_subjects)
CREATE TABLE IF NOT EXISTS public.class_section_subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  class_section_id uuid NOT NULL,
  subject_id uuid NOT NULL,
  periods_per_week integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(school_id, class_section_id, subject_id)
);
ALTER TABLE public.class_section_subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "css_select" ON public.class_section_subjects FOR SELECT USING (is_school_member(auth.uid(), school_id));
CREATE POLICY "css_manage" ON public.class_section_subjects FOR ALL USING (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'vice_principal') OR has_school_role(auth.uid(), school_id, 'academic_coordinator')
) WITH CHECK (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'vice_principal') OR has_school_role(auth.uid(), school_id, 'academic_coordinator')
);

-- crm_call_logs
CREATE TABLE IF NOT EXISTS public.crm_call_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  lead_id uuid,
  caller_user_id uuid NOT NULL,
  phone text,
  duration_seconds integer DEFAULT 0,
  outcome text,
  notes text,
  called_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.crm_call_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ccl_all" ON public.crm_call_logs FOR ALL USING (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'marketing_staff')
) WITH CHECK (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'marketing_staff')
);

-- exam_papers
CREATE TABLE IF NOT EXISTS public.exam_papers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  exam_id uuid NOT NULL,
  subject_id uuid,
  class_section_id uuid,
  title text,
  total_marks numeric DEFAULT 100,
  duration_minutes integer DEFAULT 60,
  exam_date date,
  instructions text,
  status text NOT NULL DEFAULT 'draft',
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.exam_papers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ep_select" ON public.exam_papers FOR SELECT USING (is_school_member(auth.uid(), school_id));
CREATE POLICY "ep_manage" ON public.exam_papers FOR ALL USING (
  has_school_role(auth.uid(), school_id, 'teacher') OR has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'vice_principal')
) WITH CHECK (
  has_school_role(auth.uid(), school_id, 'teacher') OR has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'vice_principal')
);

-- fee_plan_installments
CREATE TABLE IF NOT EXISTS public.fee_plan_installments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  fee_plan_id uuid NOT NULL,
  label text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  due_date date,
  sort_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.fee_plan_installments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "fpi_select" ON public.fee_plan_installments FOR SELECT USING (is_school_member(auth.uid(), school_id));
CREATE POLICY "fpi_manage" ON public.fee_plan_installments FOR ALL USING (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'accountant')
) WITH CHECK (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'accountant')
);

-- fee_reminders
CREATE TABLE IF NOT EXISTS public.fee_reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  student_id uuid NOT NULL,
  fee_slip_id uuid,
  reminder_type text DEFAULT 'sms',
  sent_at timestamptz,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.fee_reminders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "fr_all" ON public.fee_reminders FOR ALL USING (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'accountant')
) WITH CHECK (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'accountant')
);

-- homework (code uses "homework" not "homework_assignments")
CREATE TABLE IF NOT EXISTS public.homework (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  class_section_id uuid NOT NULL,
  subject_id uuid,
  title text NOT NULL,
  description text,
  due_date date NOT NULL,
  assigned_by uuid NOT NULL,
  max_marks numeric,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.homework ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hw2_select" ON public.homework FOR SELECT USING (is_school_member(auth.uid(), school_id));
CREATE POLICY "hw2_manage" ON public.homework FOR ALL USING (
  has_school_role(auth.uid(), school_id, 'teacher') OR has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'vice_principal')
) WITH CHECK (
  has_school_role(auth.uid(), school_id, 'teacher') OR has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'vice_principal')
);

-- hr_leave_requests (code uses this instead of hr_leaves)
CREATE TABLE IF NOT EXISTS public.hr_leave_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  user_id uuid NOT NULL,
  leave_type text NOT NULL DEFAULT 'casual',
  start_date date NOT NULL,
  end_date date NOT NULL,
  reason text,
  status text NOT NULL DEFAULT 'pending',
  approved_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.hr_leave_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hlr_select" ON public.hr_leave_requests FOR SELECT USING (
  user_id = auth.uid() OR has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'vice_principal') OR has_school_role(auth.uid(), school_id, 'hr_manager')
);
CREATE POLICY "hlr_insert" ON public.hr_leave_requests FOR INSERT WITH CHECK (is_school_member(auth.uid(), school_id));
CREATE POLICY "hlr_update" ON public.hr_leave_requests FOR UPDATE USING (
  user_id = auth.uid() OR has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'hr_manager')
);

-- hr_leave_types
CREATE TABLE IF NOT EXISTS public.hr_leave_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  name text NOT NULL,
  max_days integer DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.hr_leave_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hlt_select" ON public.hr_leave_types FOR SELECT USING (is_school_member(auth.uid(), school_id));
CREATE POLICY "hlt_manage" ON public.hr_leave_types FOR ALL USING (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'hr_manager')
) WITH CHECK (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'hr_manager')
);

-- hr_performance_reviews (code uses this instead of hr_reviews)
CREATE TABLE IF NOT EXISTS public.hr_performance_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  user_id uuid NOT NULL,
  reviewer_id uuid NOT NULL,
  review_period text,
  rating numeric,
  strengths text,
  areas_to_improve text,
  comments text,
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.hr_performance_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hpr_select" ON public.hr_performance_reviews FOR SELECT USING (
  user_id = auth.uid() OR reviewer_id = auth.uid() OR has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'hr_manager')
);
CREATE POLICY "hpr_manage" ON public.hr_performance_reviews FOR ALL USING (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'hr_manager')
) WITH CHECK (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'hr_manager')
);

-- hr_staff_attendance
CREATE TABLE IF NOT EXISTS public.hr_staff_attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  user_id uuid NOT NULL,
  attendance_date date NOT NULL DEFAULT CURRENT_DATE,
  status text NOT NULL DEFAULT 'present',
  check_in timestamptz,
  check_out timestamptz,
  remarks text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(school_id, user_id, attendance_date)
);
ALTER TABLE public.hr_staff_attendance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hsa_select" ON public.hr_staff_attendance FOR SELECT USING (
  user_id = auth.uid() OR has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'hr_manager')
);
CREATE POLICY "hsa_manage" ON public.hr_staff_attendance FOR ALL USING (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'hr_manager')
) WITH CHECK (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'hr_manager')
);

-- lesson_plans
CREATE TABLE IF NOT EXISTS public.lesson_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  teacher_user_id uuid NOT NULL,
  class_section_id uuid,
  subject_id uuid,
  title text NOT NULL,
  content text,
  plan_date date,
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.lesson_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "lp_select" ON public.lesson_plans FOR SELECT USING (
  teacher_user_id = auth.uid() OR has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'vice_principal')
);
CREATE POLICY "lp_manage" ON public.lesson_plans FOR ALL USING (
  teacher_user_id = auth.uid() OR has_school_role(auth.uid(), school_id, 'principal')
) WITH CHECK (
  is_school_member(auth.uid(), school_id)
);

-- messages (generic, used by OwnerBrandModule)
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  sender_user_id uuid NOT NULL,
  recipient_user_id uuid,
  content text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "msg_select" ON public.messages FOR SELECT USING (is_school_member(auth.uid(), school_id));
CREATE POLICY "msg_insert" ON public.messages FOR INSERT WITH CHECK (is_school_member(auth.uid(), school_id));

-- parent_notification_preferences
CREATE TABLE IF NOT EXISTS public.parent_notification_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  user_id uuid NOT NULL,
  channel text NOT NULL DEFAULT 'in_app',
  category text NOT NULL DEFAULT 'all',
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(school_id, user_id, channel, category)
);
ALTER TABLE public.parent_notification_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pnp_all" ON public.parent_notification_preferences FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- parent_student_links
CREATE TABLE IF NOT EXISTS public.parent_student_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  parent_user_id uuid NOT NULL,
  student_id uuid NOT NULL,
  relationship text DEFAULT 'parent',
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(school_id, parent_user_id, student_id)
);
ALTER TABLE public.parent_student_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "psl_select" ON public.parent_student_links FOR SELECT USING (is_school_member(auth.uid(), school_id));
CREATE POLICY "psl_manage" ON public.parent_student_links FOR ALL USING (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'vice_principal') OR has_school_role(auth.uid(), school_id, 'teacher')
) WITH CHECK (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'vice_principal') OR has_school_role(auth.uid(), school_id, 'teacher')
);

-- salary_budget_targets
CREATE TABLE IF NOT EXISTS public.salary_budget_targets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  month text NOT NULL,
  target_amount numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(school_id, month)
);
ALTER TABLE public.salary_budget_targets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sbt_select" ON public.salary_budget_targets FOR SELECT USING (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'accountant') OR has_school_role(auth.uid(), school_id, 'school_owner')
);
CREATE POLICY "sbt_manage" ON public.salary_budget_targets FOR ALL USING (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'accountant')
) WITH CHECK (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'accountant')
);

-- school_alert_settings
CREATE TABLE IF NOT EXISTS public.school_alert_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  user_id uuid NOT NULL,
  alert_type text NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  threshold numeric,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(school_id, user_id, alert_type)
);
ALTER TABLE public.school_alert_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sas_all" ON public.school_alert_settings FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- student_certificates
CREATE TABLE IF NOT EXISTS public.student_certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  student_id uuid NOT NULL,
  certificate_type text NOT NULL DEFAULT 'completion',
  title text NOT NULL,
  issued_date date DEFAULT CURRENT_DATE,
  issued_by uuid,
  file_url text,
  status text NOT NULL DEFAULT 'issued',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.student_certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sc_select" ON public.student_certificates FOR SELECT USING (
  is_school_member(auth.uid(), school_id) OR student_id = get_student_id(auth.uid(), school_id)
);
CREATE POLICY "sc_manage" ON public.student_certificates FOR ALL USING (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'vice_principal')
) WITH CHECK (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'vice_principal')
);

-- student_fee_ledger
CREATE TABLE IF NOT EXISTS public.student_fee_ledger (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  student_id uuid NOT NULL,
  description text,
  debit numeric NOT NULL DEFAULT 0,
  credit numeric NOT NULL DEFAULT 0,
  balance numeric NOT NULL DEFAULT 0,
  reference_id uuid,
  reference_type text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.student_fee_ledger ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sfl_select" ON public.student_fee_ledger FOR SELECT USING (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'accountant') OR student_id = get_student_id(auth.uid(), school_id)
);
CREATE POLICY "sfl_manage" ON public.student_fee_ledger FOR ALL USING (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'accountant')
) WITH CHECK (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'accountant')
);

-- student_guardians
CREATE TABLE IF NOT EXISTS public.student_guardians (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  student_id uuid NOT NULL,
  guardian_user_id uuid,
  guardian_name text,
  relationship text DEFAULT 'parent',
  phone text,
  email text,
  is_primary boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.student_guardians ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sg_select" ON public.student_guardians FOR SELECT USING (is_school_member(auth.uid(), school_id));
CREATE POLICY "sg_manage" ON public.student_guardians FOR ALL USING (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'vice_principal') OR has_school_role(auth.uid(), school_id, 'teacher')
) WITH CHECK (
  has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'vice_principal') OR has_school_role(auth.uid(), school_id, 'teacher')
);

-- student_results
CREATE TABLE IF NOT EXISTS public.student_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  student_id uuid NOT NULL,
  exam_id uuid,
  subject_id uuid,
  marks_obtained numeric,
  total_marks numeric DEFAULT 100,
  grade text,
  remarks text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.student_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sr_select" ON public.student_results FOR SELECT USING (
  is_school_member(auth.uid(), school_id) OR student_id = get_student_id(auth.uid(), school_id)
);
CREATE POLICY "sr_manage" ON public.student_results FOR ALL USING (
  has_school_role(auth.uid(), school_id, 'teacher') OR has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'vice_principal')
) WITH CHECK (
  has_school_role(auth.uid(), school_id, 'teacher') OR has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'vice_principal')
);

-- support_tickets
CREATE TABLE IF NOT EXISTS public.support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  user_id uuid NOT NULL,
  subject text NOT NULL,
  description text,
  category text DEFAULT 'general',
  priority text DEFAULT 'medium',
  status text NOT NULL DEFAULT 'open',
  assigned_to uuid,
  resolved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "st_select" ON public.support_tickets FOR SELECT USING (
  user_id = auth.uid() OR has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'school_owner')
);
CREATE POLICY "st_insert" ON public.support_tickets FOR INSERT WITH CHECK (is_school_member(auth.uid(), school_id));
CREATE POLICY "st_update" ON public.support_tickets FOR UPDATE USING (
  user_id = auth.uid() OR has_school_role(auth.uid(), school_id, 'principal') OR has_school_role(auth.uid(), school_id, 'school_owner')
);

-- timetable_period_logs
CREATE TABLE IF NOT EXISTS public.timetable_period_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL,
  timetable_entry_id uuid,
  teacher_user_id uuid,
  logged_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'completed',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.timetable_period_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tpl_select" ON public.timetable_period_logs FOR SELECT USING (is_school_member(auth.uid(), school_id));
CREATE POLICY "tpl_manage" ON public.timetable_period_logs FOR ALL USING (
  has_school_role(auth.uid(), school_id, 'teacher') OR has_school_role(auth.uid(), school_id, 'principal')
) WITH CHECK (
  has_school_role(auth.uid(), school_id, 'teacher') OR has_school_role(auth.uid(), school_id, 'principal')
);
