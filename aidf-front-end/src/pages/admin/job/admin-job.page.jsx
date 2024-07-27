import { Separator } from "@/components/ui/separator";
import { getJobApllicationsForJob } from "@/lib/services/api/jobApplications";
import { getJobById } from "@/lib/services/api/jobs";
import { Briefcase, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobApplicationCard from "./components/JobApplicationCard";

function AdminJobPage() {
  const [job, setJob] = useState(null);
  const [isJobLoading, setIsJobLoading] = useState(true);
  const [jobApplications, setJobApplications] = useState(
    []
  );
  const [isJobApplicationsLoading, setIsJobApplicationsLoading] =
    useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }

    getJobById(id)
      .then((data) => {
        setJob(data);
        setIsJobLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsJobLoading(false);
      });

    getJobApllicationsForJob(id)
      .then((data) => {
        setJobApplications(data);
        setIsJobApplicationsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsJobApplicationsLoading(false);
      });
  }, [id, setJob, setJobApplications]);

  if (isJobLoading || isJobApplicationsLoading) {
    return null;
  }

  return (
    <div>
      <div>
        <h2>{job?.title}</h2>
        <div className="flex items-center gap-x-4 mt-4">
          <div className="flex items-center gap-x-2">
            <Briefcase />
            <span>{job?.type}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPin />
            <span>{job?.location}</span>
          </div>
        </div>
        {/* <div className="gap-x-4 flex items-center mt-4">
          <Badge>NodeJS</Badge>
          <Badge>ReactJS</Badge>
          <Badge>AWS</Badge>
        </div> */}
      </div>
      <div className="mt-4 py-4">
        <p>{job?.description}</p>
      </div>
      <Separator />
      <div className="py-8">
        <h2>Job Applications</h2>
        <div className="mt-4 flex flex-col gap-y-4">
          {jobApplications.map((application) => (
            <JobApplicationCard
              key={application._id}
              fullName={application.fullName}
              _id={application._id}
              jobId={id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminJobPage;
