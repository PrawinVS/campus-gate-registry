import { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/ui/Button";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import { EmptyState } from "../../components/ui/EmptyState";
import { PageHeader } from "../../components/ui/PageHeader";
import { Select } from "../../components/ui/Select";
import { Table, Td } from "../../components/ui/Table";
import { useApp } from "../../context/AppContext";
import { useToast } from "../../context/ToastContext";
import { ASSESSMENTS, DEPARTMENTS, SECTIONS, YEARS, getAssessment } from "../../data/constants";
import { getStudents } from "../../data/mockStudents";
import { countEnteredMarks, getMarkError, isMarkValid } from "../../utils/marks";

const emptyFilters = {
  department: "",
  year: "",
  section: "",
  assessment: "",
};

export function MarkEntryPage() {
  const { saveClassMarks, getSavedClassMarks } = useApp();
  const { notify } = useToast();
  const [filters, setFilters] = useState(emptyFilters);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(false);

  const ready = Boolean(filters.department && filters.year && filters.section && filters.assessment);
  const assessment = getAssessment(filters.assessment);
  const students = useMemo(
    () => (ready ? getStudents(filters) : []),
    [ready, filters.department, filters.year, filters.section],
  );

  const currentKey = `${filters.department}|${filters.year}|${filters.section}|${filters.assessment}`;

  const setFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  useEffect(() => {
    if (!ready) {
      setMarks({});
      setLoading(false);
      return undefined;
    }

    setLoading(true);
    const timer = window.setTimeout(() => {
      setMarks(getSavedClassMarks(filters));
      setLoading(false);
    }, 280);

    return () => window.clearTimeout(timer);
  }, [currentKey, ready]);

  const updateMark = (registerNumber, value) => {
    setMarks((current) => ({ ...current, [registerNumber]: value }));
  };

  const invalidCount = students.filter(
    (student) => !isMarkValid(marks[student.registerNumber] ?? "", assessment.maxMarks),
  ).length;

  const handleSave = () => {
    if (invalidCount > 0) {
      notify("Correct invalid marks before saving.", "error");
      return;
    }
    saveClassMarks(filters, marks);
    notify(`Marks saved for ${filters.department} ${filters.year}${filters.section} · ${assessment.label}.`);
  };

  const handleReset = () => {
    setMarks({});
    notify("Mark sheet reset for this class.");
  };

  const tableReady = ready && !loading;

  return (
    <div>
      <PageHeader
        eyebrow="Faculty"
        title="Regular Assessment Mark Entry"
        description="Select the class and assessment. Maximum marks update automatically based on the chosen test."
      />
      <Card className="mb-5">
        <CardHeader title="Class filters" subtitle="All four fields are required before the register is shown." />
        <CardBody>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Select
              label="Department"
              name="department"
              placeholder="Select department"
              options={DEPARTMENTS}
              value={filters.department}
              onChange={(value) => setFilter("department", value)}
            />
            <Select
              label="Year"
              name="year"
              placeholder="Select year"
              options={YEARS}
              value={filters.year}
              onChange={(value) => setFilter("year", value)}
            />
            <Select
              label="Section"
              name="section"
              placeholder="Select section"
              options={SECTIONS}
              value={filters.section}
              onChange={(value) => setFilter("section", value)}
            />
            <Select
              label="Assessment"
              name="assessment"
              placeholder="Select assessment"
              options={ASSESSMENTS.map((item) => ({
                value: item.value,
                label: `${item.label} — ${item.maxMarks} marks`,
              }))}
              value={filters.assessment}
              onChange={(value) => setFilter("assessment", value)}
            />
          </div>
          {ready ? (
            <p className="mt-4 text-sm text-slate-500">
              Maximum marks for {assessment.label}:{" "}
              <span className="font-semibold text-navy-900">{assessment.maxMarks}</span>
            </p>
          ) : null}
        </CardBody>
      </Card>

      {!ready ? (
        <EmptyState
          title="Choose a class to begin"
          description="Department, year, section and assessment are required to load the mock student register."
        />
      ) : (
        <Card>
          <CardHeader
            title="Student register"
            subtitle={`${countEnteredMarks(marks)} of ${students.length} marks entered`}
            action={
              <div className="flex gap-2">
                <Button variant="secondary" onClick={handleReset} disabled={!tableReady}>
                  Reset
                </Button>
                <Button onClick={handleSave} disabled={!tableReady}>
                  Save Marks
                </Button>
              </div>
            }
          />
          <Table
            columns={["Register Number", "Student Name", `Marks / ${assessment.maxMarks}`]}
            loading={loading}
            empty={tableReady && students.length === 0 ? "No students found for this class." : ""}
          >
            {students.map((student) => {
              const value = marks[student.registerNumber] ?? "";
              const error = getMarkError(value, assessment.maxMarks);
              return (
                <tr key={student.registerNumber}>
                  <Td className="font-medium text-navy-900">{student.registerNumber}</Td>
                  <Td>{student.name}</Td>
                  <Td>
                    <div className="max-w-40">
                      <input
                        type="number"
                        min="0"
                        max={assessment.maxMarks}
                        value={value}
                        onChange={(event) => updateMark(student.registerNumber, event.target.value)}
                        className={`h-10 w-full rounded-lg border px-3 text-sm outline-none focus:ring-2 ${
                          error
                            ? "border-red-400 bg-red-50 text-red-800 focus:border-red-500 focus:ring-red-500/15"
                            : "border-slate-200 focus:border-navy-700 focus:ring-navy-700/15"
                        }`}
                        aria-invalid={Boolean(error)}
                      />
                      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
                    </div>
                  </Td>
                </tr>
              );
            })}
          </Table>
        </Card>
      )}
    </div>
  );
}
