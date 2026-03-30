export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      academic_assessments: {
        Row: {
          assessment_date: string | null
          assessment_type: string
          class_section_id: string | null
          created_at: string
          created_by: string
          id: string
          is_published: boolean
          max_marks: number
          school_id: string
          subject_id: string | null
          title: string
        }
        Insert: {
          assessment_date?: string | null
          assessment_type?: string
          class_section_id?: string | null
          created_at?: string
          created_by: string
          id?: string
          is_published?: boolean
          max_marks?: number
          school_id: string
          subject_id?: string | null
          title: string
        }
        Update: {
          assessment_date?: string | null
          assessment_type?: string
          class_section_id?: string | null
          created_at?: string
          created_by?: string
          id?: string
          is_published?: boolean
          max_marks?: number
          school_id?: string
          subject_id?: string | null
          title?: string
        }
        Relationships: []
      }
      academic_classes: {
        Row: {
          created_at: string
          grade_level: string | null
          id: string
          name: string
          school_id: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          grade_level?: string | null
          id?: string
          name: string
          school_id: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          grade_level?: string | null
          id?: string
          name?: string
          school_id?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      ai_academic_predictions: {
        Row: {
          created_at: string
          failure_risk: number | null
          grade_confidence: number | null
          id: string
          improvement_probability: number | null
          predicted_final_grade: number | null
          promotion_probability: number | null
          school_id: string
          student_id: string
          subject_predictions: Json | null
          suggested_focus_areas: Json | null
        }
        Insert: {
          created_at?: string
          failure_risk?: number | null
          grade_confidence?: number | null
          id?: string
          improvement_probability?: number | null
          predicted_final_grade?: number | null
          promotion_probability?: number | null
          school_id: string
          student_id: string
          subject_predictions?: Json | null
          suggested_focus_areas?: Json | null
        }
        Update: {
          created_at?: string
          failure_risk?: number | null
          grade_confidence?: number | null
          id?: string
          improvement_probability?: number | null
          predicted_final_grade?: number | null
          promotion_probability?: number | null
          school_id?: string
          student_id?: string
          subject_predictions?: Json | null
          suggested_focus_areas?: Json | null
        }
        Relationships: []
      }
      ai_career_suggestions: {
        Row: {
          aptitude_scores: Json | null
          created_at: string
          id: string
          personality_type: string | null
          recommended_streams: Json | null
          school_id: string
          skill_gaps: Json | null
          student_id: string
          suggested_careers: Json | null
        }
        Insert: {
          aptitude_scores?: Json | null
          created_at?: string
          id?: string
          personality_type?: string | null
          recommended_streams?: Json | null
          school_id: string
          skill_gaps?: Json | null
          student_id: string
          suggested_careers?: Json | null
        }
        Update: {
          aptitude_scores?: Json | null
          created_at?: string
          id?: string
          personality_type?: string | null
          recommended_streams?: Json | null
          school_id?: string
          skill_gaps?: Json | null
          student_id?: string
          suggested_careers?: Json | null
        }
        Relationships: []
      }
      ai_counseling_queue: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string
          id: string
          notes: string | null
          priority: string | null
          reason: string | null
          scheduled_at: string | null
          school_id: string
          status: string | null
          student_id: string
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          priority?: string | null
          reason?: string | null
          scheduled_at?: string | null
          school_id: string
          status?: string | null
          student_id: string
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          priority?: string | null
          reason?: string | null
          scheduled_at?: string | null
          school_id?: string
          status?: string | null
          student_id?: string
        }
        Relationships: []
      }
      ai_early_warnings: {
        Row: {
          acknowledged_at: string | null
          created_at: string
          description: string | null
          detected_patterns: Json | null
          id: string
          resolved_at: string | null
          school_id: string
          severity: string | null
          status: string | null
          student_id: string
          title: string
          warning_type: string | null
        }
        Insert: {
          acknowledged_at?: string | null
          created_at?: string
          description?: string | null
          detected_patterns?: Json | null
          id?: string
          resolved_at?: string | null
          school_id: string
          severity?: string | null
          status?: string | null
          student_id: string
          title: string
          warning_type?: string | null
        }
        Update: {
          acknowledged_at?: string | null
          created_at?: string
          description?: string | null
          detected_patterns?: Json | null
          id?: string
          resolved_at?: string | null
          school_id?: string
          severity?: string | null
          status?: string | null
          student_id?: string
          title?: string
          warning_type?: string | null
        }
        Relationships: []
      }
      ai_parent_updates: {
        Row: {
          academic_snapshot: Json | null
          attendance_summary: Json | null
          concerns: Json | null
          created_at: string
          highlights: Json | null
          id: string
          parent_user_id: string
          school_id: string
          student_id: string
          summary: string | null
          update_date: string | null
          update_type: string | null
        }
        Insert: {
          academic_snapshot?: Json | null
          attendance_summary?: Json | null
          concerns?: Json | null
          created_at?: string
          highlights?: Json | null
          id?: string
          parent_user_id: string
          school_id: string
          student_id: string
          summary?: string | null
          update_date?: string | null
          update_type?: string | null
        }
        Update: {
          academic_snapshot?: Json | null
          attendance_summary?: Json | null
          concerns?: Json | null
          created_at?: string
          highlights?: Json | null
          id?: string
          parent_user_id?: string
          school_id?: string
          student_id?: string
          summary?: string | null
          update_date?: string | null
          update_type?: string | null
        }
        Relationships: []
      }
      ai_school_reputation: {
        Row: {
          academic_excellence: number | null
          created_at: string
          extracurricular_score: number | null
          faculty_quality: number | null
          id: string
          infrastructure_score: number | null
          insights: Json | null
          nps_score: number | null
          parent_satisfaction_index: number | null
          reputation_score: number | null
          safety_score: number | null
          school_id: string
          trend: string | null
        }
        Insert: {
          academic_excellence?: number | null
          created_at?: string
          extracurricular_score?: number | null
          faculty_quality?: number | null
          id?: string
          infrastructure_score?: number | null
          insights?: Json | null
          nps_score?: number | null
          parent_satisfaction_index?: number | null
          reputation_score?: number | null
          safety_score?: number | null
          school_id: string
          trend?: string | null
        }
        Update: {
          academic_excellence?: number | null
          created_at?: string
          extracurricular_score?: number | null
          faculty_quality?: number | null
          id?: string
          infrastructure_score?: number | null
          insights?: Json | null
          nps_score?: number | null
          parent_satisfaction_index?: number | null
          reputation_score?: number | null
          safety_score?: number | null
          school_id?: string
          trend?: string | null
        }
        Relationships: []
      }
      ai_student_profiles: {
        Row: {
          attention_span_minutes: number | null
          best_learning_time: string | null
          burnout_probability: number | null
          created_at: string
          dropout_risk: number | null
          emotional_trend: string | null
          focus_drop_detected: boolean | null
          id: string
          last_analyzed_at: string | null
          learning_speed: string | null
          learning_style: string | null
          learning_style_confidence: number | null
          needs_counseling: boolean | null
          needs_extra_support: boolean | null
          needs_remedial_classes: boolean | null
          risk_score: number | null
          school_id: string
          should_be_accelerated: boolean | null
          strong_subjects: Json | null
          student_id: string
          updated_at: string
          weak_subjects: Json | null
        }
        Insert: {
          attention_span_minutes?: number | null
          best_learning_time?: string | null
          burnout_probability?: number | null
          created_at?: string
          dropout_risk?: number | null
          emotional_trend?: string | null
          focus_drop_detected?: boolean | null
          id?: string
          last_analyzed_at?: string | null
          learning_speed?: string | null
          learning_style?: string | null
          learning_style_confidence?: number | null
          needs_counseling?: boolean | null
          needs_extra_support?: boolean | null
          needs_remedial_classes?: boolean | null
          risk_score?: number | null
          school_id: string
          should_be_accelerated?: boolean | null
          strong_subjects?: Json | null
          student_id: string
          updated_at?: string
          weak_subjects?: Json | null
        }
        Update: {
          attention_span_minutes?: number | null
          best_learning_time?: string | null
          burnout_probability?: number | null
          created_at?: string
          dropout_risk?: number | null
          emotional_trend?: string | null
          focus_drop_detected?: boolean | null
          id?: string
          last_analyzed_at?: string | null
          learning_speed?: string | null
          learning_style?: string | null
          learning_style_confidence?: number | null
          needs_counseling?: boolean | null
          needs_extra_support?: boolean | null
          needs_remedial_classes?: boolean | null
          risk_score?: number | null
          school_id?: string
          should_be_accelerated?: boolean | null
          strong_subjects?: Json | null
          student_id?: string
          updated_at?: string
          weak_subjects?: Json | null
        }
        Relationships: []
      }
      ai_teacher_performance: {
        Row: {
          attendance_reliability: number | null
          communication_score: number | null
          created_at: string
          id: string
          improvement_areas: Json | null
          innovation_score: number | null
          last_analyzed_at: string | null
          needs_training: boolean | null
          overall_score: number | null
          school_id: string
          strengths: Json | null
          student_engagement: number | null
          teacher_user_id: string
          teaching_quality: number | null
          tier: string | null
        }
        Insert: {
          attendance_reliability?: number | null
          communication_score?: number | null
          created_at?: string
          id?: string
          improvement_areas?: Json | null
          innovation_score?: number | null
          last_analyzed_at?: string | null
          needs_training?: boolean | null
          overall_score?: number | null
          school_id: string
          strengths?: Json | null
          student_engagement?: number | null
          teacher_user_id: string
          teaching_quality?: number | null
          tier?: string | null
        }
        Update: {
          attendance_reliability?: number | null
          communication_score?: number | null
          created_at?: string
          id?: string
          improvement_areas?: Json | null
          innovation_score?: number | null
          last_analyzed_at?: string | null
          needs_training?: boolean | null
          overall_score?: number | null
          school_id?: string
          strengths?: Json | null
          student_engagement?: number | null
          teacher_user_id?: string
          teaching_quality?: number | null
          tier?: string | null
        }
        Relationships: []
      }
      assignment_submissions: {
        Row: {
          assignment_id: string
          created_at: string
          graded_at: string | null
          graded_by: string | null
          id: string
          marks_obtained: number | null
          school_id: string
          status: string
          student_id: string
          submission_text: string | null
          submitted_at: string | null
        }
        Insert: {
          assignment_id: string
          created_at?: string
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          marks_obtained?: number | null
          school_id: string
          status?: string
          student_id: string
          submission_text?: string | null
          submitted_at?: string | null
        }
        Update: {
          assignment_id?: string
          created_at?: string
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          marks_obtained?: number | null
          school_id?: string
          status?: string
          student_id?: string
          submission_text?: string | null
          submitted_at?: string | null
        }
        Relationships: []
      }
      assignments: {
        Row: {
          class_section_id: string
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          max_marks: number | null
          school_id: string
          status: string
          subject_id: string | null
          teacher_user_id: string
          title: string
        }
        Insert: {
          class_section_id: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          max_marks?: number | null
          school_id: string
          status?: string
          subject_id?: string | null
          teacher_user_id: string
          title: string
        }
        Update: {
          class_section_id?: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          max_marks?: number | null
          school_id?: string
          status?: string
          subject_id?: string | null
          teacher_user_id?: string
          title?: string
        }
        Relationships: []
      }
      attendance_entries: {
        Row: {
          created_at: string
          id: string
          remarks: string | null
          school_id: string
          session_id: string
          status: string
          student_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          remarks?: string | null
          school_id: string
          session_id: string
          status?: string
          student_id: string
        }
        Update: {
          created_at?: string
          id?: string
          remarks?: string | null
          school_id?: string
          session_id?: string
          status?: string
          student_id?: string
        }
        Relationships: []
      }
      attendance_sessions: {
        Row: {
          class_section_id: string
          created_at: string
          created_by: string
          id: string
          period_label: string | null
          school_id: string
          session_date: string
          status: string
        }
        Insert: {
          class_section_id: string
          created_at?: string
          created_by: string
          id?: string
          period_label?: string | null
          school_id: string
          session_date?: string
          status?: string
        }
        Update: {
          class_section_id?: string
          created_at?: string
          created_by?: string
          id?: string
          period_label?: string | null
          school_id?: string
          session_date?: string
          status?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          actor_user_id: string
          created_at: string
          id: string
          metadata: Json | null
          school_id: string
          target_id: string | null
          target_type: string | null
        }
        Insert: {
          action: string
          actor_user_id: string
          created_at?: string
          id?: string
          metadata?: Json | null
          school_id: string
          target_id?: string | null
          target_type?: string | null
        }
        Update: {
          action?: string
          actor_user_id?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          school_id?: string
          target_id?: string | null
          target_type?: string | null
        }
        Relationships: []
      }
      behavior_notes: {
        Row: {
          content: string
          created_at: string
          created_by: string
          id: string
          note_type: string
          school_id: string
          severity: string
          student_id: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by: string
          id?: string
          note_type?: string
          school_id: string
          severity?: string
          student_id: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string
          id?: string
          note_type?: string
          school_id?: string
          severity?: string
          student_id?: string
        }
        Relationships: []
      }
      class_sections: {
        Row: {
          capacity: number | null
          class_id: string
          created_at: string
          id: string
          name: string
          room: string | null
          school_id: string
        }
        Insert: {
          capacity?: number | null
          class_id: string
          created_at?: string
          id?: string
          name?: string
          room?: string | null
          school_id: string
        }
        Update: {
          capacity?: number | null
          class_id?: string
          created_at?: string
          id?: string
          name?: string
          room?: string | null
          school_id?: string
        }
        Relationships: []
      }
      crm_activities: {
        Row: {
          activity_type: string
          completed_at: string | null
          content: string | null
          created_at: string
          created_by: string
          id: string
          lead_id: string
          outcome: string | null
          scheduled_at: string | null
          school_id: string
        }
        Insert: {
          activity_type?: string
          completed_at?: string | null
          content?: string | null
          created_at?: string
          created_by: string
          id?: string
          lead_id: string
          outcome?: string | null
          scheduled_at?: string | null
          school_id: string
        }
        Update: {
          activity_type?: string
          completed_at?: string | null
          content?: string | null
          created_at?: string
          created_by?: string
          id?: string
          lead_id?: string
          outcome?: string | null
          scheduled_at?: string | null
          school_id?: string
        }
        Relationships: []
      }
      crm_campaigns: {
        Row: {
          budget: number | null
          channel: string
          created_at: string
          created_by: string | null
          id: string
          name: string
          school_id: string
          status: string
        }
        Insert: {
          budget?: number | null
          channel?: string
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          school_id: string
          status?: string
        }
        Update: {
          budget?: number | null
          channel?: string
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          school_id?: string
          status?: string
        }
        Relationships: []
      }
      crm_lead_attributions: {
        Row: {
          campaign_id: string
          created_at: string
          id: string
          lead_id: string
          school_id: string
        }
        Insert: {
          campaign_id: string
          created_at?: string
          id?: string
          lead_id: string
          school_id: string
        }
        Update: {
          campaign_id?: string
          created_at?: string
          id?: string
          lead_id?: string
          school_id?: string
        }
        Relationships: []
      }
      crm_leads: {
        Row: {
          assigned_to: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          next_follow_up_at: string | null
          notes: string | null
          phone: string | null
          pipeline_id: string | null
          school_id: string
          score: number
          source: string | null
          source_id: string | null
          stage_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          next_follow_up_at?: string | null
          notes?: string | null
          phone?: string | null
          pipeline_id?: string | null
          school_id: string
          score?: number
          source?: string | null
          source_id?: string | null
          stage_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          next_follow_up_at?: string | null
          notes?: string | null
          phone?: string | null
          pipeline_id?: string | null
          school_id?: string
          score?: number
          source?: string | null
          source_id?: string | null
          stage_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      crm_pipelines: {
        Row: {
          created_at: string
          id: string
          is_default: boolean
          name: string
          school_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_default?: boolean
          name: string
          school_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_default?: boolean
          name?: string
          school_id?: string
        }
        Relationships: []
      }
      crm_sources: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
          school_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          school_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          school_id?: string
        }
        Relationships: []
      }
      crm_stages: {
        Row: {
          created_at: string
          id: string
          name: string
          pipeline_id: string
          school_id: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          pipeline_id: string
          school_id: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          pipeline_id?: string
          school_id?: string
          sort_order?: number
        }
        Relationships: []
      }
      exam_question_papers: {
        Row: {
          created_at: string
          created_by: string
          duration_minutes: number | null
          exam_id: string
          id: string
          questions: Json
          school_id: string
          status: string
          title: string
          total_marks: number | null
        }
        Insert: {
          created_at?: string
          created_by: string
          duration_minutes?: number | null
          exam_id: string
          id?: string
          questions?: Json
          school_id: string
          status?: string
          title: string
          total_marks?: number | null
        }
        Update: {
          created_at?: string
          created_by?: string
          duration_minutes?: number | null
          exam_id?: string
          id?: string
          questions?: Json
          school_id?: string
          status?: string
          title?: string
          total_marks?: number | null
        }
        Relationships: []
      }
      exam_results: {
        Row: {
          created_at: string
          created_by: string | null
          exam_id: string
          grade: string | null
          id: string
          is_absent: boolean
          marks_obtained: number | null
          remarks: string | null
          school_id: string
          student_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          exam_id: string
          grade?: string | null
          id?: string
          is_absent?: boolean
          marks_obtained?: number | null
          remarks?: string | null
          school_id: string
          student_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          exam_id?: string
          grade?: string | null
          id?: string
          is_absent?: boolean
          marks_obtained?: number | null
          remarks?: string | null
          school_id?: string
          student_id?: string
        }
        Relationships: []
      }
      fee_plans: {
        Row: {
          created_at: string
          currency: string
          id: string
          is_active: boolean
          name: string
          school_id: string
        }
        Insert: {
          created_at?: string
          currency?: string
          id?: string
          is_active?: boolean
          name: string
          school_id: string
        }
        Update: {
          created_at?: string
          currency?: string
          id?: string
          is_active?: boolean
          name?: string
          school_id?: string
        }
        Relationships: []
      }
      fee_slips: {
        Row: {
          amount: number
          created_at: string
          discount: number
          due_date: string | null
          fee_month: string
          fee_type: string
          fine: number
          generated_by: string
          id: string
          notes: string | null
          paid_at: string | null
          school_id: string
          slip_number: string | null
          status: string
          student_id: string
          total_amount: number
        }
        Insert: {
          amount?: number
          created_at?: string
          discount?: number
          due_date?: string | null
          fee_month: string
          fee_type?: string
          fine?: number
          generated_by: string
          id?: string
          notes?: string | null
          paid_at?: string | null
          school_id: string
          slip_number?: string | null
          status?: string
          student_id: string
          total_amount?: number
        }
        Update: {
          amount?: number
          created_at?: string
          discount?: number
          due_date?: string | null
          fee_month?: string
          fee_type?: string
          fine?: number
          generated_by?: string
          id?: string
          notes?: string | null
          paid_at?: string | null
          school_id?: string
          slip_number?: string | null
          status?: string
          student_id?: string
          total_amount?: number
        }
        Relationships: []
      }
      finance_expenses: {
        Row: {
          amount: number
          approved_by: string | null
          category: string
          created_at: string
          created_by: string | null
          description: string
          expense_date: string
          id: string
          receipt_url: string | null
          school_id: string
          vendor: string | null
        }
        Insert: {
          amount?: number
          approved_by?: string | null
          category?: string
          created_at?: string
          created_by?: string | null
          description: string
          expense_date?: string
          id?: string
          receipt_url?: string | null
          school_id: string
          vendor?: string | null
        }
        Update: {
          amount?: number
          approved_by?: string | null
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string
          expense_date?: string
          id?: string
          receipt_url?: string | null
          school_id?: string
          vendor?: string | null
        }
        Relationships: []
      }
      finance_invoices: {
        Row: {
          created_at: string
          created_by: string | null
          discount: number
          due_date: string | null
          id: string
          invoice_no: string | null
          issue_date: string
          notes: string | null
          school_id: string
          status: string
          student_id: string
          subtotal: number
          total: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          discount?: number
          due_date?: string | null
          id?: string
          invoice_no?: string | null
          issue_date?: string
          notes?: string | null
          school_id: string
          status?: string
          student_id: string
          subtotal?: number
          total?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          discount?: number
          due_date?: string | null
          id?: string
          invoice_no?: string | null
          issue_date?: string
          notes?: string | null
          school_id?: string
          status?: string
          student_id?: string
          subtotal?: number
          total?: number
        }
        Relationships: []
      }
      finance_payment_methods: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
          school_id: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          school_id: string
          type?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          school_id?: string
          type?: string
        }
        Relationships: []
      }
      finance_payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          invoice_id: string | null
          method_id: string | null
          notes: string | null
          paid_at: string
          received_by: string | null
          reference: string | null
          school_id: string
          student_id: string | null
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: string
          invoice_id?: string | null
          method_id?: string | null
          notes?: string | null
          paid_at?: string
          received_by?: string | null
          reference?: string | null
          school_id: string
          student_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          invoice_id?: string | null
          method_id?: string | null
          notes?: string | null
          paid_at?: string
          received_by?: string | null
          reference?: string | null
          school_id?: string
          student_id?: string | null
        }
        Relationships: []
      }
      grade_thresholds: {
        Row: {
          created_at: string
          gpa_value: number | null
          grade_label: string
          id: string
          max_percentage: number
          min_percentage: number
          school_id: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string
          gpa_value?: number | null
          grade_label: string
          id?: string
          max_percentage?: number
          min_percentage?: number
          school_id: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string
          gpa_value?: number | null
          grade_label?: string
          id?: string
          max_percentage?: number
          min_percentage?: number
          school_id?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      homework_assignments: {
        Row: {
          assigned_by: string
          class_section_id: string
          created_at: string
          description: string | null
          diary_entry_id: string | null
          due_date: string
          id: string
          max_marks: number | null
          school_id: string
          status: string
          subject_id: string | null
          title: string
        }
        Insert: {
          assigned_by: string
          class_section_id: string
          created_at?: string
          description?: string | null
          diary_entry_id?: string | null
          due_date: string
          id?: string
          max_marks?: number | null
          school_id: string
          status?: string
          subject_id?: string | null
          title: string
        }
        Update: {
          assigned_by?: string
          class_section_id?: string
          created_at?: string
          description?: string | null
          diary_entry_id?: string | null
          due_date?: string
          id?: string
          max_marks?: number | null
          school_id?: string
          status?: string
          subject_id?: string | null
          title?: string
        }
        Relationships: []
      }
      homework_submissions: {
        Row: {
          created_at: string
          graded_at: string | null
          graded_by: string | null
          homework_id: string
          id: string
          marks_obtained: number | null
          status: string
          student_id: string
          submission_text: string | null
          submitted_at: string | null
        }
        Insert: {
          created_at?: string
          graded_at?: string | null
          graded_by?: string | null
          homework_id: string
          id?: string
          marks_obtained?: number | null
          status?: string
          student_id: string
          submission_text?: string | null
          submitted_at?: string | null
        }
        Update: {
          created_at?: string
          graded_at?: string | null
          graded_by?: string | null
          homework_id?: string
          id?: string
          marks_obtained?: number | null
          status?: string
          student_id?: string
          submission_text?: string | null
          submitted_at?: string | null
        }
        Relationships: []
      }
      hr_contracts: {
        Row: {
          contract_type: string
          created_at: string
          document_url: string | null
          end_date: string | null
          id: string
          school_id: string
          start_date: string
          status: string
          user_id: string
        }
        Insert: {
          contract_type?: string
          created_at?: string
          document_url?: string | null
          end_date?: string | null
          id?: string
          school_id: string
          start_date: string
          status?: string
          user_id: string
        }
        Update: {
          contract_type?: string
          created_at?: string
          document_url?: string | null
          end_date?: string | null
          id?: string
          school_id?: string
          start_date?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      hr_documents: {
        Row: {
          created_at: string
          document_type: string
          document_url: string
          id: string
          school_id: string
          title: string
          uploaded_by: string
          user_id: string
        }
        Insert: {
          created_at?: string
          document_type?: string
          document_url: string
          id?: string
          school_id: string
          title: string
          uploaded_by: string
          user_id: string
        }
        Update: {
          created_at?: string
          document_type?: string
          document_url?: string
          id?: string
          school_id?: string
          title?: string
          uploaded_by?: string
          user_id?: string
        }
        Relationships: []
      }
      hr_leaves: {
        Row: {
          approved_by: string | null
          created_at: string
          end_date: string
          id: string
          leave_type: string
          reason: string | null
          school_id: string
          start_date: string
          status: string
          user_id: string
        }
        Insert: {
          approved_by?: string | null
          created_at?: string
          end_date: string
          id?: string
          leave_type?: string
          reason?: string | null
          school_id: string
          start_date: string
          status?: string
          user_id: string
        }
        Update: {
          approved_by?: string | null
          created_at?: string
          end_date?: string
          id?: string
          leave_type?: string
          reason?: string | null
          school_id?: string
          start_date?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      hr_pay_runs: {
        Row: {
          created_at: string
          created_by: string | null
          gross_amount: number
          id: string
          net_amount: number
          paid_at: string | null
          period_end: string
          period_start: string
          school_id: string
          status: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          gross_amount?: number
          id?: string
          net_amount?: number
          paid_at?: string | null
          period_end: string
          period_start: string
          school_id: string
          status?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          gross_amount?: number
          id?: string
          net_amount?: number
          paid_at?: string | null
          period_end?: string
          period_start?: string
          school_id?: string
          status?: string
        }
        Relationships: []
      }
      hr_reviews: {
        Row: {
          areas_to_improve: string | null
          comments: string | null
          created_at: string
          id: string
          rating: number | null
          review_period: string | null
          reviewer_id: string
          school_id: string
          status: string
          strengths: string | null
          user_id: string
        }
        Insert: {
          areas_to_improve?: string | null
          comments?: string | null
          created_at?: string
          id?: string
          rating?: number | null
          review_period?: string | null
          reviewer_id: string
          school_id: string
          status?: string
          strengths?: string | null
          user_id: string
        }
        Update: {
          areas_to_improve?: string | null
          comments?: string | null
          created_at?: string
          id?: string
          rating?: number | null
          review_period?: string | null
          reviewer_id?: string
          school_id?: string
          status?: string
          strengths?: string | null
          user_id?: string
        }
        Relationships: []
      }
      hr_salary_records: {
        Row: {
          allowances: number
          base_salary: number
          created_at: string
          deductions: number
          effective_from: string | null
          id: string
          is_active: boolean
          school_id: string
          user_id: string
        }
        Insert: {
          allowances?: number
          base_salary?: number
          created_at?: string
          deductions?: number
          effective_from?: string | null
          id?: string
          is_active?: boolean
          school_id: string
          user_id: string
        }
        Update: {
          allowances?: number
          base_salary?: number
          created_at?: string
          deductions?: number
          effective_from?: string | null
          id?: string
          is_active?: boolean
          school_id?: string
          user_id?: string
        }
        Relationships: []
      }
      parent_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean
          parent_message_id: string | null
          read_at: string | null
          recipient_user_id: string
          school_id: string
          sender_user_id: string
          subject: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean
          parent_message_id?: string | null
          read_at?: string | null
          recipient_user_id: string
          school_id: string
          sender_user_id: string
          subject?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean
          parent_message_id?: string | null
          read_at?: string | null
          recipient_user_id?: string
          school_id?: string
          sender_user_id?: string
          subject?: string | null
        }
        Relationships: []
      }
      platform_settings: {
        Row: {
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          key: string
          updated_at?: string
          value?: string
        }
        Update: {
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      platform_super_admins: {
        Row: {
          created_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      scheduled_messages: {
        Row: {
          channel: string
          content: string
          created_at: string
          id: string
          recipient_user_id: string | null
          scheduled_at: string
          school_id: string
          sender_user_id: string
          sent_at: string | null
          status: string
          subject: string | null
        }
        Insert: {
          channel?: string
          content: string
          created_at?: string
          id?: string
          recipient_user_id?: string | null
          scheduled_at: string
          school_id: string
          sender_user_id: string
          sent_at?: string | null
          status?: string
          subject?: string | null
        }
        Update: {
          channel?: string
          content?: string
          created_at?: string
          id?: string
          recipient_user_id?: string | null
          scheduled_at?: string
          school_id?: string
          sender_user_id?: string
          sent_at?: string | null
          status?: string
          subject?: string | null
        }
        Relationships: []
      }
      school_bootstrap: {
        Row: {
          created_at: string
          locked: boolean
          locked_at: string | null
          school_id: string
        }
        Insert: {
          created_at?: string
          locked?: boolean
          locked_at?: string | null
          school_id: string
        }
        Update: {
          created_at?: string
          locked?: boolean
          locked_at?: string | null
          school_id?: string
        }
        Relationships: []
      }
      school_branding: {
        Row: {
          accent_hue: number
          accent_lightness: number
          accent_saturation: number
          id: string
          logo_url: string | null
          radius_scale: number
          school_id: string
          updated_at: string
        }
        Insert: {
          accent_hue?: number
          accent_lightness?: number
          accent_saturation?: number
          id?: string
          logo_url?: string | null
          radius_scale?: number
          school_id: string
          updated_at?: string
        }
        Update: {
          accent_hue?: number
          accent_lightness?: number
          accent_saturation?: number
          id?: string
          logo_url?: string | null
          radius_scale?: number
          school_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      school_diary_entries: {
        Row: {
          attachments: Json | null
          class_section_id: string | null
          content: string
          created_at: string
          created_by: string
          diary_date: string
          diary_type: string
          id: string
          is_published: boolean
          school_id: string
          student_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          attachments?: Json | null
          class_section_id?: string | null
          content: string
          created_at?: string
          created_by: string
          diary_date?: string
          diary_type?: string
          id?: string
          is_published?: boolean
          school_id: string
          student_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          attachments?: Json | null
          class_section_id?: string | null
          content?: string
          created_at?: string
          created_by?: string
          diary_date?: string
          diary_type?: string
          id?: string
          is_published?: boolean
          school_id?: string
          student_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      school_exams: {
        Row: {
          class_section_id: string | null
          created_at: string
          created_by: string
          end_date: string | null
          exam_type: string
          id: string
          instructions: string | null
          passing_marks: number | null
          school_id: string
          start_date: string | null
          status: string
          subject_id: string | null
          title: string
          total_marks: number | null
          updated_at: string
        }
        Insert: {
          class_section_id?: string | null
          created_at?: string
          created_by: string
          end_date?: string | null
          exam_type?: string
          id?: string
          instructions?: string | null
          passing_marks?: number | null
          school_id: string
          start_date?: string | null
          status?: string
          subject_id?: string | null
          title: string
          total_marks?: number | null
          updated_at?: string
        }
        Update: {
          class_section_id?: string | null
          created_at?: string
          created_by?: string
          end_date?: string | null
          exam_type?: string
          id?: string
          instructions?: string | null
          passing_marks?: number | null
          school_id?: string
          start_date?: string | null
          status?: string
          subject_id?: string | null
          title?: string
          total_marks?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      school_holidays: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          end_date: string
          holiday_type: string
          id: string
          is_active: boolean
          school_id: string
          start_date: string
          title: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          end_date: string
          holiday_type?: string
          id?: string
          is_active?: boolean
          school_id: string
          start_date: string
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          end_date?: string
          holiday_type?: string
          id?: string
          is_active?: boolean
          school_id?: string
          start_date?: string
          title?: string
        }
        Relationships: []
      }
      school_memberships: {
        Row: {
          created_at: string
          department: string | null
          designation: string | null
          id: string
          school_id: string
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          designation?: string | null
          id?: string
          school_id: string
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string | null
          designation?: string | null
          id?: string
          school_id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      school_notices: {
        Row: {
          content: string
          created_at: string
          created_by: string
          expires_at: string | null
          id: string
          is_pinned: boolean
          is_published: boolean
          notice_type: string
          priority: string
          school_id: string
          target_audience: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by: string
          expires_at?: string | null
          id?: string
          is_pinned?: boolean
          is_published?: boolean
          notice_type?: string
          priority?: string
          school_id: string
          target_audience?: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string
          expires_at?: string | null
          id?: string
          is_pinned?: boolean
          is_published?: boolean
          notice_type?: string
          priority?: string
          school_id?: string
          target_audience?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      school_user_directory: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          school_id: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          school_id: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          school_id?: string
          user_id?: string
        }
        Relationships: []
      }
      schools: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          name: string
          primary_color: string | null
          slug: string
          tagline: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          primary_color?: string | null
          slug: string
          tagline?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          primary_color?: string | null
          slug?: string
          tagline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      section_subjects: {
        Row: {
          class_section_id: string
          created_at: string
          id: string
          school_id: string
          subject_id: string
        }
        Insert: {
          class_section_id: string
          created_at?: string
          id?: string
          school_id: string
          subject_id: string
        }
        Update: {
          class_section_id?: string
          created_at?: string
          id?: string
          school_id?: string
          subject_id?: string
        }
        Relationships: []
      }
      staff_attendance: {
        Row: {
          attendance_date: string
          check_in: string | null
          check_out: string | null
          created_at: string
          id: string
          school_id: string
          status: string
          user_id: string
        }
        Insert: {
          attendance_date?: string
          check_in?: string | null
          check_out?: string | null
          created_at?: string
          id?: string
          school_id: string
          status?: string
          user_id: string
        }
        Update: {
          attendance_date?: string
          check_in?: string | null
          check_out?: string | null
          created_at?: string
          id?: string
          school_id?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      student_complaints: {
        Row: {
          complaint_type: string
          created_at: string
          description: string
          id: string
          resolution_notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          school_id: string
          severity: string
          status: string
          student_id: string
          subject: string
        }
        Insert: {
          complaint_type?: string
          created_at?: string
          description: string
          id?: string
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          school_id: string
          severity?: string
          status?: string
          student_id: string
          subject: string
        }
        Update: {
          complaint_type?: string
          created_at?: string
          description?: string
          id?: string
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          school_id?: string
          severity?: string
          status?: string
          student_id?: string
          subject?: string
        }
        Relationships: []
      }
      student_enrollments: {
        Row: {
          academic_year: string | null
          class_section_id: string
          created_at: string
          id: string
          school_id: string
          status: string
          student_id: string
        }
        Insert: {
          academic_year?: string | null
          class_section_id: string
          created_at?: string
          id?: string
          school_id: string
          status?: string
          student_id: string
        }
        Update: {
          academic_year?: string | null
          class_section_id?: string
          created_at?: string
          id?: string
          school_id?: string
          status?: string
          student_id?: string
        }
        Relationships: []
      }
      student_feedback: {
        Row: {
          category: string
          created_at: string
          feedback_text: string
          id: string
          is_anonymous: boolean
          rating: number | null
          school_id: string
          student_id: string
          teacher_id: string
        }
        Insert: {
          category?: string
          created_at?: string
          feedback_text: string
          id?: string
          is_anonymous?: boolean
          rating?: number | null
          school_id: string
          student_id: string
          teacher_id: string
        }
        Update: {
          category?: string
          created_at?: string
          feedback_text?: string
          id?: string
          is_anonymous?: boolean
          rating?: number | null
          school_id?: string
          student_id?: string
          teacher_id?: string
        }
        Relationships: []
      }
      student_marks: {
        Row: {
          assessment_id: string
          computed_grade: string | null
          created_at: string
          id: string
          marks: number | null
          remarks: string | null
          school_id: string
          student_id: string
        }
        Insert: {
          assessment_id: string
          computed_grade?: string | null
          created_at?: string
          id?: string
          marks?: number | null
          remarks?: string | null
          school_id: string
          student_id: string
        }
        Update: {
          assessment_id?: string
          computed_grade?: string | null
          created_at?: string
          id?: string
          marks?: number | null
          remarks?: string | null
          school_id?: string
          student_id?: string
        }
        Relationships: []
      }
      student_queries: {
        Row: {
          created_at: string
          id: string
          message: string
          replied_at: string | null
          replied_by: string | null
          reply: string | null
          school_id: string
          status: string
          student_id: string
          subject: string
          target_teacher_id: string | null
          target_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          replied_at?: string | null
          replied_by?: string | null
          reply?: string | null
          school_id: string
          status?: string
          student_id: string
          subject: string
          target_teacher_id?: string | null
          target_type?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          replied_at?: string | null
          replied_by?: string | null
          reply?: string | null
          school_id?: string
          status?: string
          student_id?: string
          subject?: string
          target_teacher_id?: string | null
          target_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          address: string | null
          admission_number: string | null
          class_section_id: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          first_name: string
          gender: string | null
          id: string
          last_name: string | null
          parent_profile_id: string | null
          phone: string | null
          profile_id: string | null
          roll_number: string | null
          school_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          admission_number?: string | null
          class_section_id?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          first_name?: string
          gender?: string | null
          id?: string
          last_name?: string | null
          parent_profile_id?: string | null
          phone?: string | null
          profile_id?: string | null
          roll_number?: string | null
          school_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          admission_number?: string | null
          class_section_id?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          first_name?: string
          gender?: string | null
          id?: string
          last_name?: string | null
          parent_profile_id?: string | null
          phone?: string | null
          profile_id?: string | null
          roll_number?: string | null
          school_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      subjects: {
        Row: {
          code: string | null
          created_at: string
          description: string | null
          id: string
          is_elective: boolean
          name: string
          school_id: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_elective?: boolean
          name: string
          school_id: string
        }
        Update: {
          code?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_elective?: boolean
          name?: string
          school_id?: string
        }
        Relationships: []
      }
      submission_files: {
        Row: {
          created_at: string
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          mime_type: string | null
          school_id: string
          submission_id: string
          uploaded_by: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          mime_type?: string | null
          school_id: string
          submission_id: string
          uploaded_by: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          mime_type?: string | null
          school_id?: string
          submission_id?: string
          uploaded_by?: string
        }
        Relationships: []
      }
      support_conversations: {
        Row: {
          created_at: string
          id: string
          school_id: string
          status: string
          student_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          school_id: string
          status?: string
          student_id: string
        }
        Update: {
          created_at?: string
          id?: string
          school_id?: string
          status?: string
          student_id?: string
        }
        Relationships: []
      }
      support_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          school_id: string
          sender_user_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          school_id: string
          sender_user_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          school_id?: string
          sender_user_id?: string
        }
        Relationships: []
      }
      teacher_assignments: {
        Row: {
          class_section_id: string
          created_at: string
          id: string
          is_class_teacher: boolean
          school_id: string
          teacher_user_id: string
        }
        Insert: {
          class_section_id: string
          created_at?: string
          id?: string
          is_class_teacher?: boolean
          school_id: string
          teacher_user_id: string
        }
        Update: {
          class_section_id?: string
          created_at?: string
          id?: string
          is_class_teacher?: boolean
          school_id?: string
          teacher_user_id?: string
        }
        Relationships: []
      }
      teacher_period_logs: {
        Row: {
          class_section_id: string | null
          created_at: string
          id: string
          logged_at: string
          notes: string | null
          period_id: string | null
          school_id: string
          subject_id: string | null
          teacher_user_id: string
          topic_covered: string | null
        }
        Insert: {
          class_section_id?: string | null
          created_at?: string
          id?: string
          logged_at?: string
          notes?: string | null
          period_id?: string | null
          school_id: string
          subject_id?: string | null
          teacher_user_id: string
          topic_covered?: string | null
        }
        Update: {
          class_section_id?: string | null
          created_at?: string
          id?: string
          logged_at?: string
          notes?: string | null
          period_id?: string | null
          school_id?: string
          subject_id?: string | null
          teacher_user_id?: string
          topic_covered?: string | null
        }
        Relationships: []
      }
      teacher_subject_assignments: {
        Row: {
          class_section_id: string
          created_at: string
          id: string
          school_id: string
          subject_id: string
          teacher_user_id: string
        }
        Insert: {
          class_section_id: string
          created_at?: string
          id?: string
          school_id: string
          subject_id: string
          teacher_user_id: string
        }
        Update: {
          class_section_id?: string
          created_at?: string
          id?: string
          school_id?: string
          subject_id?: string
          teacher_user_id?: string
        }
        Relationships: []
      }
      timetable_entries: {
        Row: {
          class_section_id: string
          created_at: string
          day_of_week: number
          end_time: string | null
          id: string
          is_published: boolean
          period_id: string | null
          room: string | null
          school_id: string
          start_time: string | null
          subject_id: string | null
          subject_name: string | null
          teacher_user_id: string | null
        }
        Insert: {
          class_section_id: string
          created_at?: string
          day_of_week: number
          end_time?: string | null
          id?: string
          is_published?: boolean
          period_id?: string | null
          room?: string | null
          school_id: string
          start_time?: string | null
          subject_id?: string | null
          subject_name?: string | null
          teacher_user_id?: string | null
        }
        Update: {
          class_section_id?: string
          created_at?: string
          day_of_week?: number
          end_time?: string | null
          id?: string
          is_published?: boolean
          period_id?: string | null
          room?: string | null
          school_id?: string
          start_time?: string | null
          subject_id?: string | null
          subject_name?: string | null
          teacher_user_id?: string | null
        }
        Relationships: []
      }
      timetable_periods: {
        Row: {
          created_at: string
          end_time: string
          id: string
          is_break: boolean
          label: string
          school_id: string
          sort_order: number
          start_time: string
        }
        Insert: {
          created_at?: string
          end_time: string
          id?: string
          is_break?: boolean
          label: string
          school_id: string
          sort_order?: number
          start_time: string
        }
        Update: {
          created_at?: string
          end_time?: string
          id?: string
          is_break?: boolean
          label?: string
          school_id?: string
          sort_order?: number
          start_time?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: string
          school_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: string
          school_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          school_id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_school_public_by_slug: {
        Args: { _slug: string }
        Returns: {
          id: string
          name: string
          slug: string
        }[]
      }
      get_student_id: {
        Args: { _school_id: string; _user_id: string }
        Returns: string
      }
      has_school_role: {
        Args: { _role: string; _school_id: string; _user_id: string }
        Returns: boolean
      }
      is_school_member: {
        Args: { _school_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
