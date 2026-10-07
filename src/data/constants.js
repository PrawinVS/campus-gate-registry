export const DEPARTMENTS = [
  { value: "ECE", label: "ECE — Electronics & Communication" },
  { value: "CSE", label: "CSE — Computer Science" },
  { value: "EEE", label: "EEE — Electrical & Electronics" },
  { value: "MECH", label: "MECH — Mechanical" },
];

export const YEARS = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
];

export const SECTIONS = [
  { value: "A", label: "Section A" },
  { value: "B", label: "Section B" },
  { value: "C", label: "Section C" },
];

export const ASSESSMENTS = [
  { value: "test-1", label: "Test 1", maxMarks: 60 },
  { value: "assessment-1", label: "Assessment 1", maxMarks: 40 },
  { value: "test-2", label: "Test 2", maxMarks: 60 },
  { value: "assessment-2", label: "Assessment 2", maxMarks: 40 },
];

export const ROLES = {
  FACULTY: "faculty",
  STUDENT: "student",
};

export const NPTEL_STATUS = {
  PENDING: "Pending",
  VERIFIED: "Verified",
  REJECTED: "Rejected",
};

export function getAssessment(value) {
  return ASSESSMENTS.find((item) => item.value === value) ?? ASSESSMENTS[0];
}

export function marksKey({ department, year, section, assessment }) {
  return `${department}|${year}|${section}|${assessment}`;
}
