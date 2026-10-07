import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import { PageHeader } from "../../components/ui/PageHeader";
import { useApp } from "../../context/AppContext";
import { DEMO_STUDENT_MARKS } from "../../data/mockNptel";

export function StudentDashboard() {
  const { user, studentSubmission } = useApp();
  const published = DEMO_STUDENT_MARKS.filter((row) => row.marks !== null).length;

  return (
    <div>
      <PageHeader
        eyebrow="Student portal"
        title={`Hello, ${user?.name}`}
        description="View published assessment marks and submit NPTEL certificates for faculty verification."
      />
      <Card className="mb-5">
        <CardHeader title="Student information" />
        <CardBody>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Info label="Register Number" value={user?.registerNumber} />
            <Info label="Programme" value={user?.programme} />
            <Info label="Department" value={user?.department} />
            <Info label="Year / Section" value={`${user?.year} / ${user?.section}`} />
            <Info label="Email" value={user?.email} />
          </dl>
        </CardBody>
      </Card>
      <div className="grid gap-5 lg:grid-cols-2">
        <Link to="/student/marks" className="block">
          <Card className="h-full transition hover:border-navy-700/30">
            <CardBody className="min-h-40">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-600">Assessments</p>
              <h2 className="mt-2 font-serif text-2xl text-navy-900">My Assessment Marks</h2>
              <p className="mt-3 text-sm text-slate-500">
                {published} of {DEMO_STUDENT_MARKS.length} assessments published for the current semester.
              </p>
              <p className="mt-6 text-sm font-semibold text-navy-800">View marks →</p>
            </CardBody>
          </Card>
        </Link>
        <Link to="/student/nptel" className="block">
          <Card className="h-full transition hover:border-navy-700/30">
            <CardBody className="min-h-40">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-600">Certification</p>
              <h2 className="mt-2 font-serif text-2xl text-navy-900">NPTEL Certification</h2>
              <p className="mt-3 text-sm text-slate-500">
                {studentSubmission
                  ? `Latest submission: ${studentSubmission.courseName} (${studentSubmission.status})`
                  : "No certificate submitted in this session yet."}
              </p>
              <p className="mt-6 text-sm font-semibold text-navy-800">Submit certificate →</p>
            </CardBody>
          </Card>
        </Link>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 font-medium text-navy-900">{value || "—"}</dd>
    </div>
  );
}
