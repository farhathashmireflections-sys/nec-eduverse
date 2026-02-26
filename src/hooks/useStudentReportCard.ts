import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  computeGrade,
  type GradeThreshold,
  type ReportCardData,
  type ReportCardSubjectResult,
} from "@/components/academic/ReportCardView";

/**
 * Hook that generates a report card for a single student by finding their
 * active enrollment section and aggregating published assessment data.
 */
export function useStudentReportCard() {
  const [reportCard, setReportCard] = useState<ReportCardData | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = async ({
    schoolId,
    studentId,
    termLabel,
    schoolName,
  }: {
    schoolId: string;
    studentId: string;
    termLabel?: string;
    schoolName?: string;
  }) => {
    setLoading(true);
    setReportCard(null);

    try {
      // 1. Find the student's active enrollment to get section
      const { data: enrollment } = await supabase
        .from("student_enrollments")
        .select("class_section_id")
        .eq("school_id", schoolId)
        .eq("student_id", studentId)
        .is("end_date", null)
        .order("start_date", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!enrollment) {
        toast.error("No active enrollment found.");
        return;
      }

      const sectionId = enrollment.class_section_id;

      // 2. Fetch all required data in parallel
      const [
        studentRes,
        enrollRes,
        assessRes,
        subjectsRes,
        thresholdsRes,
        sectionRes,
        classesRes,
        attendanceSessionsRes,
      ] = await Promise.all([
        supabase.from("students").select("id, first_name, last_name, parent_name").eq("id", studentId).single(),
        supabase.from("student_enrollments").select("student_id").eq("school_id", schoolId).eq("class_section_id", sectionId).is("end_date", null),
        supabase.from("academic_assessments").select("id, title, max_marks, subject_id, term_label, is_published").eq("school_id", schoolId).eq("class_section_id", sectionId).eq("is_published", true).limit(500),
        supabase.from("subjects").select("id, name").eq("school_id", schoolId),
        supabase.from("grade_thresholds").select("grade_label, min_percentage, max_percentage").eq("school_id", schoolId).order("sort_order"),
        supabase.from("class_sections").select("id, name, class_id").eq("id", sectionId).single(),
        supabase.from("academic_classes").select("id, name").eq("school_id", schoolId),
        supabase.from("attendance_sessions").select("id").eq("school_id", schoolId).eq("class_section_id", sectionId),
      ]);

      const student = studentRes.data;
      if (!student) { toast.error("Student not found."); return; }

      const assessments = assessRes.data ?? [];
      const subjects = subjectsRes.data ?? [];
      const thresholds = (thresholdsRes.data ?? []) as GradeThreshold[];
      const section = sectionRes.data;
      const classes = classesRes.data ?? [];
      const totalStudents = enrollRes.data?.length ?? 0;

      // Filter by term
      const filteredAssessments = termLabel
        ? assessments.filter((a: any) => a.term_label === termLabel)
        : assessments;

      if (filteredAssessments.length === 0) {
        toast.error("No published assessments found" + (termLabel ? ` for "${termLabel}"` : ""));
        return;
      }

      const cls = classes.find((c: any) => c.id === section?.class_id);
      const className = cls?.name ?? "Class";
      const sectionName = section?.name ?? "Section";
      const subjectMap = new Map(subjects.map((s: any) => [s.id, s.name]));

      // 3. Fetch marks for ALL students in section (for ranking)
      const assessmentIds = filteredAssessments.map((a: any) => a.id);
      const { data: allMarks } = await supabase
        .from("student_marks")
        .select("student_id, assessment_id, marks")
        .eq("school_id", schoolId)
        .in("assessment_id", assessmentIds);

      const marks = allMarks ?? [];

      // 4. Attendance
      const sessionIds = (attendanceSessionsRes.data ?? []).map((s: any) => s.id);
      let attendanceEntries: any[] = [];
      if (sessionIds.length > 0) {
        const { data: attData } = await supabase
          .from("attendance_entries")
          .select("student_id, status")
          .eq("school_id", schoolId)
          .in("session_id", sessionIds);
        attendanceEntries = attData ?? [];
      }

      // 5. Group assessments by subject
      const assessmentsBySubject = new Map<string, any[]>();
      filteredAssessments.forEach((a: any) => {
        const key = a.subject_id || "__no_subject__";
        if (!assessmentsBySubject.has(key)) assessmentsBySubject.set(key, []);
        assessmentsBySubject.get(key)!.push(a);
      });

      // 6. Build marks lookup per student
      const marksLookup = new Map<string, Map<string, number>>();
      marks.forEach((m: any) => {
        if (!marksLookup.has(m.student_id)) marksLookup.set(m.student_id, new Map());
        if (m.marks !== null) marksLookup.get(m.student_id)!.set(m.assessment_id, m.marks);
      });

      // 7. Calculate percentage for each student (for ranking)
      const studentPercentages: { studentId: string; pct: number }[] = [];
      const enrolledStudentIds = (enrollRes.data ?? []).map((e: any) => e.student_id);

      for (const sid of enrolledStudentIds) {
        const sm = marksLookup.get(sid) ?? new Map();
        let totalObt = 0, totalMax = 0;
        assessmentsBySubject.forEach((subjectAssessments) => {
          subjectAssessments.forEach((a: any) => {
            totalMax += a.max_marks;
            totalObt += sm.get(a.id) ?? 0;
          });
        });
        studentPercentages.push({ studentId: sid, pct: totalMax > 0 ? (totalObt / totalMax) * 100 : 0 });
      }

      studentPercentages.sort((a, b) => b.pct - a.pct);
      const rank = studentPercentages.findIndex((s) => s.studentId === studentId) + 1;

      // 8. Build this student's report card
      const studentMarks = marksLookup.get(studentId) ?? new Map();
      const subjectResults: ReportCardSubjectResult[] = [];

      assessmentsBySubject.forEach((subjectAssessments, subjectKey) => {
        const subjectName = subjectKey === "__no_subject__" ? "General" : (String(subjectMap.get(subjectKey) ?? "Unknown"));
        let totalObtained = 0, totalMax = 0;
        const assessmentDetails: { title: string; marks: number | null; maxMarks: number }[] = [];

        subjectAssessments.forEach((a: any) => {
          const m = studentMarks.get(a.id) ?? null;
          assessmentDetails.push({ title: a.title, marks: m, maxMarks: a.max_marks });
          totalMax += a.max_marks;
          if (m !== null) totalObtained += m;
        });

        const percentage = totalMax > 0 ? (totalObtained / totalMax) * 100 : 0;
        subjectResults.push({
          subjectName,
          assessments: assessmentDetails,
          totalObtained,
          totalMax,
          percentage,
          grade: computeGrade(percentage, thresholds),
        });
      });

      subjectResults.sort((a, b) => a.subjectName.localeCompare(b.subjectName));

      const grandTotalObtained = subjectResults.reduce((s, r) => s + r.totalObtained, 0);
      const grandTotalMax = subjectResults.reduce((s, r) => s + r.totalMax, 0);
      const overallPercentage = grandTotalMax > 0 ? (grandTotalObtained / grandTotalMax) * 100 : 0;

      // Attendance for this student
      const att = { present: 0, absent: 0, total: 0 };
      attendanceEntries
        .filter((e: any) => e.student_id === studentId)
        .forEach((e: any) => {
          att.total++;
          if (e.status === "present" || e.status === "late") att.present++;
          else att.absent++;
        });

      const card: ReportCardData = {
        studentId,
        studentName: `${student.first_name} ${student.last_name ?? ""}`.trim(),
        parentName: student.parent_name ?? null,
        className,
        sectionName,
        subjects: subjectResults,
        grandTotalObtained,
        grandTotalMax,
        overallPercentage,
        overallGrade: computeGrade(overallPercentage, thresholds),
        rank: rank > 0 ? rank : null,
        totalStudents,
        attendance: att.total > 0 ? att : undefined,
        term: termLabel,
        schoolName,
      };

      setReportCard(card);
      toast.success("Report card generated");
    } catch (err: any) {
      toast.error(err.message ?? "Failed to generate report card");
    } finally {
      setLoading(false);
    }
  };

  return { reportCard, loading, generate };
}
