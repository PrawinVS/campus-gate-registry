export function parseMark(value) {
  if (value === "" || value === null || value === undefined) {
    return { empty: true, number: null };
  }

  const number = Number(value);
  if (!Number.isFinite(number)) {
    return { empty: false, number: NaN };
  }

  return { empty: false, number };
}

export function getMarkError(value, maxMarks) {
  const { empty, number } = parseMark(value);
  if (empty) return "";
  if (!Number.isFinite(number)) return "Enter a valid number";
  if (number < 0) return "Marks cannot be negative";
  if (number > maxMarks) return `Cannot exceed ${maxMarks}`;
  return "";
}

export function isMarkValid(value, maxMarks) {
  return getMarkError(value, maxMarks) === "";
}

export function countEnteredMarks(marks) {
  return Object.values(marks).filter((value) => {
    const { empty, number } = parseMark(value);
    return !empty && Number.isFinite(number);
  }).length;
}
