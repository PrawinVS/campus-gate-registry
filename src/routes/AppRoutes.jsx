import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { ROLES } from "../data/constants";
import { LoginPage } from "../pages/auth/LoginPage";
import { FacultyDashboard } from "../pages/faculty/FacultyDashboard";
import { MarkEntryPage } from "../pages/faculty/MarkEntryPage";
import { NptelVerificationPage } from "../pages/faculty/NptelVerificationPage";
import { NptelSubmissionPage } from "../pages/student/NptelSubmissionPage";
import { StudentDashboard } from "../pages/student/StudentDashboard";
import { StudentMarksPage } from "../pages/student/StudentMarksPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<DashboardLayout role={ROLES.FACULTY} />}>
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/faculty/marks" element={<MarkEntryPage />} />
        <Route path="/faculty/nptel" element={<NptelVerificationPage />} />
      </Route>
      <Route element={<DashboardLayout role={ROLES.STUDENT} />}>
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/marks" element={<StudentMarksPage />} />
        <Route path="/student/nptel" element={<NptelSubmissionPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
