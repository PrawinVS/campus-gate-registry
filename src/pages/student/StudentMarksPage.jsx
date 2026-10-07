import { Card, CardHeader } from "../../components/ui/Card";
import { PageHeader } from "../../components/ui/PageHeader";
import { Table, Td } from "../../components/ui/Table";
import { DEMO_STUDENT_MARKS } from "../../data/mockNptel";

export function StudentMarksPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Student"
        title="My Assessment Marks"
        description="Published scores for the current semester. Unpublished assessments remain blank until faculty save marks."
      />
      <Card>
        <CardHeader title="Current semester" subtitle="Mock published record for 23ECE001" />
        <Table columns={["Assessment", "Maximum", "Marks obtained", "Status"]}>
          {DEMO_STUDENT_MARKS.map((row) => (
            <tr key={row.assessment}>
              <Td className="font-medium text-navy-900">{row.assessment}</Td>
              <Td>{row.maxMarks}</Td>
              <Td>{row.marks ?? "—"}</Td>
              <Td className="text-slate-500">{row.marks === null ? "Awaiting publication" : "Published"}</Td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}
