import { Link } from "react-router-dom";
import { Card, CardBody } from "../../components/ui/Card";
import { PageHeader } from "../../components/ui/PageHeader";
import { useApp } from "../../context/AppContext";

export function FacultyDashboard() {
  const { user, savedMarks, nptelRecords } = useApp();
  const pendingNptel = nptelRecords.filter((record) => record.status === "Pending").length;
  const savedBatches = Object.keys(savedMarks).length;

  return (
    <div>
      <PageHeader
        eyebrow="Faculty workspace"
        title={`Welcome, ${user?.name?.split(" ").slice(-1)}`}
        description="Record regular assessments and review NPTEL certificates submitted by students."
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Saved mark sheets" value={savedBatches} />
        <Stat label="Pending NPTEL reviews" value={pendingNptel} />
        <Stat label="Department" value={user?.department ?? "—"} />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <ActionCard
          to="/faculty/marks"
          kicker="Assessment"
          title="Regular Assessment Mark Entry"
          body="Choose department, year, section and test. Enter marks against the class register and save locally for this prototype."
        />
        <ActionCard
          to="/faculty/nptel"
          kicker="Certification"
          title="NPTEL Certificate Verification"
          body="Review submitted certificates, inspect course details, and mark records as verified or rejected."
        />
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <Card>
      <CardBody>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
        <p className="mt-2 font-serif text-2xl text-navy-900">{value}</p>
      </CardBody>
    </Card>
  );
}

function ActionCard({ to, kicker, title, body }) {
  return (
    <Link to={to} className="block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800">
      <Card className="h-full transition hover:border-navy-700/30">
        <CardBody className="flex min-h-44 flex-col justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-600">{kicker}</p>
            <h2 className="mt-2 font-serif text-2xl text-navy-900">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">{body}</p>
          </div>
          <p className="mt-6 text-sm font-semibold text-navy-800">Open workspace →</p>
        </CardBody>
      </Card>
    </Link>
  );
}
