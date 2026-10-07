import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import { FileInput, Input } from "../../components/ui/Input";
import { PageHeader } from "../../components/ui/PageHeader";
import { useApp } from "../../context/AppContext";
import { useToast } from "../../context/ToastContext";

const initialForm = {
  courseName: "",
  courseId: "",
  duration: "",
  examDate: "",
  score: "",
  certificateId: "",
  fileName: "",
};

export function NptelSubmissionPage() {
  const { submitNptelCertificate, studentSubmission } = useApp();
  const { notify } = useToast();
  const [form, setForm] = useState(initialForm);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    update("fileName", file ? file.name : "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.courseName || !form.courseId || !form.score) {
      notify("Course name, course ID and score are required.", "error");
      return;
    }
    submitNptelCertificate({
      courseName: form.courseName,
      courseId: form.courseId,
      duration: form.duration,
      examDate: form.examDate,
      score: Number(form.score),
      certificateId: form.certificateId,
      fileName: form.fileName || "No file selected",
    });
    notify("NPTEL certificate submitted for faculty verification.");
    setForm(initialForm);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Student"
        title="NPTEL Certification"
        description="Submit course details and attach the certificate file. The file stays on this device; only the filename is stored in the prototype."
      />
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader title="Certificate submission" />
          <CardBody>
            <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
              <Input
                label="Course name"
                name="courseName"
                value={form.courseName}
                onChange={(event) => update("courseName", event.target.value)}
              />
              <Input
                label="Course ID"
                name="courseId"
                placeholder="noc25-cs08"
                value={form.courseId}
                onChange={(event) => update("courseId", event.target.value)}
              />
              <Input
                label="Duration"
                name="duration"
                placeholder="12 weeks"
                value={form.duration}
                onChange={(event) => update("duration", event.target.value)}
              />
              <Input
                label="Exam date"
                name="examDate"
                type="date"
                value={form.examDate}
                onChange={(event) => update("examDate", event.target.value)}
              />
              <Input
                label="Score"
                name="score"
                type="number"
                min="0"
                max="100"
                value={form.score}
                onChange={(event) => update("score", event.target.value)}
              />
              <Input
                label="Certificate ID"
                name="certificateId"
                value={form.certificateId}
                onChange={(event) => update("certificateId", event.target.value)}
              />
              <div className="sm:col-span-2">
                <FileInput label="Certificate upload" fileName={form.fileName} onChange={handleFile} />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Latest submission" />
          <CardBody>
            {studentSubmission ? (
              <dl className="space-y-3 text-sm">
                <Row label="Course" value={studentSubmission.courseName} />
                <Row label="Score" value={studentSubmission.score} />
                <Row label="File" value={studentSubmission.fileName} />
                <Row label="Status" value={studentSubmission.status} />
              </dl>
            ) : (
              <p className="text-sm text-slate-500">No submission in this session.</p>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-navy-900">{value}</dd>
    </div>
  );
}
