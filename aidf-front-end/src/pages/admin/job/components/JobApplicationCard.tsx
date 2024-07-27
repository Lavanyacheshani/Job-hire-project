import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

type JobApplicationCardProps = {
  _id: string;
  jobId: string;
  fullName: string;
};

function JobApplicationCard({ _id, jobId, fullName }: JobApplicationCardProps) {
  return (
    <Link to={`/admin/job/${jobId}/application/${_id}`} className="block">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>{fullName}</CardTitle>
          <Button>View</Button>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default JobApplicationCard;
