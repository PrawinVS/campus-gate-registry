const NAMES = [
  "Arun Kumar",
  "Bala Kumar",
  "Charan",
  "Dinesh",
  "Gokul",
  "Harini S",
  "Ishwarya",
  "Jeevan Raj",
  "Kavya M",
  "Lokesh",
];

const YEAR_PREFIX = {
  1: "25",
  2: "24",
  3: "23",
  4: "22",
};

export function getStudents({ department, year, section }) {
  const prefix = YEAR_PREFIX[year] ?? "23";
  const count = 5 + (section.charCodeAt(0) % 3);

  return Array.from({ length: count }, (_, index) => {
    const serial = String(index + 1).padStart(3, "0");
    return {
      registerNumber: `${prefix}${department}${serial}`,
      name: NAMES[index % NAMES.length],
      department,
      year,
      section,
    };
  });
}

export const DEMO_STUDENT = {
  registerNumber: "23ECE001",
  name: "Arun Kumar",
  department: "ECE",
  year: "3",
  section: "A",
  email: "arun.kumar@college.edu",
  programme: "B.E. Electronics and Communication Engineering",
};
