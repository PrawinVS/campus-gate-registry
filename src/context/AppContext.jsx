import { createContext, useContext, useMemo, useState } from "react";
import { MOCK_NPTEL_CERTIFICATES } from "../data/mockNptel";
import { DEMO_STUDENT } from "../data/mockStudents";
import { ROLES, marksKey } from "../data/constants";

const AppContext = createContext(null);

const DEMO_USERS = {
  [ROLES.FACULTY]: {
    name: "Dr. Meena Iyer",
    role: ROLES.FACULTY,
    title: "Associate Professor",
    department: "ECE",
    email: "meena.iyer@college.edu",
  },
  [ROLES.STUDENT]: {
    ...DEMO_STUDENT,
    role: ROLES.STUDENT,
    title: "Student",
  },
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [savedMarks, setSavedMarks] = useState({});
  const [nptelRecords, setNptelRecords] = useState(MOCK_NPTEL_CERTIFICATES);
  const [studentSubmission, setStudentSubmission] = useState(null);

  const login = (role = ROLES.FACULTY, identifier = "") => {
    const profile = DEMO_USERS[role] ?? DEMO_USERS[ROLES.FACULTY];
    setUser({
      ...profile,
      identifier: identifier || profile.email || profile.registerNumber,
    });
    return profile.role;
  };

  const logout = () => setUser(null);

  const saveClassMarks = (filters, marks) => {
    setSavedMarks((current) => ({
      ...current,
      [marksKey(filters)]: { ...marks, savedAt: new Date().toISOString() },
    }));
  };

  const getSavedClassMarks = (filters) => {
    const entry = savedMarks[marksKey(filters)];
    if (!entry) return {};
    const { savedAt, ...marks } = entry;
    return marks;
  };

  const updateNptelStatus = (id, status) => {
    setNptelRecords((current) =>
      current.map((record) => (record.id === id ? { ...record, status } : record)),
    );
  };

  const submitNptelCertificate = (payload) => {
    const record = {
      id: `nptel-${Date.now()}`,
      registerNumber: user?.registerNumber ?? DEMO_STUDENT.registerNumber,
      studentName: user?.name ?? DEMO_STUDENT.name,
      status: "Pending",
      ...payload,
    };
    setStudentSubmission(record);
    setNptelRecords((current) => [record, ...current]);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      savedMarks,
      saveClassMarks,
      getSavedClassMarks,
      nptelRecords,
      updateNptelStatus,
      studentSubmission,
      submitNptelCertificate,
    }),
    [user, savedMarks, nptelRecords, studentSubmission],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
