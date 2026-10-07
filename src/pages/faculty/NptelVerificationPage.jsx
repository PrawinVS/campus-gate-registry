import { useState } from "react";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card, CardHeader } from "../../components/ui/Card";
import { Modal } from "../../components/ui/Modal";
import { PageHeader } from "../../components/ui/PageHeader";
import { Table, Td } from "../../components/ui/Table";
import { useApp } from "../../context/AppContext";
import { useToast } from "../../context/ToastContext";
import { NPTEL_STATUS } from "../../data/constants";

export function NptelVerificationPage() {
  const { nptelRecords, updateNptelStatus } = useApp();
  const { notify } = useToast();
  const [selected, setSelected] = useState(null);

  const verify = (record) => {
    updateNptelStatus(record.id, NPTEL_STATUS.VERIFIED);
    notify(`${record.studentName}'s certificate marked as verified.`);
  };

  const reject = (record) => {
    updateNptelStatus(record.id, NPTEL_STATUS.REJECTED);
    notify(`${record.studentName}'s certificate was rejected.`, "error");
  };

  return (
    <div>
      <PageHeader
        eyebrow="Faculty"
        title="NPTEL Certificate Verification"
        description="Review submitted certificates. View opens course details. Verify and Reject update status in frontend state only."
      />
      <Card>
        <CardHeader title="Submitted certificates" subtitle={`${nptelRecords.length} records`} />
        <Table
          columns={["Register Number", "Student Name", "Course Name", "Score", "Certificate", "Status", "Action"]}
          empty={nptelRecords.length === 0 ? "No NPTEL submissions yet." : ""}
        >
          {nptelRecords.map((record) => (
            <tr key={record.id}>
              <Td className="font-medium text-navy-900">{record.registerNumber}</Td>
              <Td>{record.studentName}</Td>
              <Td>{record.courseName}</Td>
              <Td>{record.score}</Td>
              <Td className="text-slate-500">{record.fileName}</Td>
              <Td>
                <Badge tone={record.status}>{record.status}</Badge>
              </Td>
              <Td>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="secondary" onClick={() => setSelected(record)}>
                    View
                  </Button>
                  <Button size="sm" variant="success" onClick={() => verify(record)}>
                    Verify
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => reject(record)}>
                    Reject
                  </Button>
                </div>
              </Td>
            </tr>
          ))}
        </Table>
      </Card>
      <Modal open={Boolean(selected)} title="Certificate details" onClose={() => setSelected(null)}>
        {selected ? (
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <Detail label="Register Number" value={selected.registerNumber} />
            <Detail label="Student" value={selected.studentName} />
            <Detail label="Course" value={selected.courseName} />
            <Detail label="Course ID" value={selected.courseId} />
            <Detail label="Duration" value={selected.duration} />
            <Detail label="Exam date" value={selected.examDate} />
            <Detail label="Score" value={selected.score} />
            <Detail label="Certificate ID" value={selected.certificateId} />
            <Detail label="File" value={selected.fileName} />
            <Detail label="Status" value={selected.status} />
          </dl>
        ) : null}
      </Modal>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 font-medium text-navy-900">{value}</dd>
    </div>
  );
}
