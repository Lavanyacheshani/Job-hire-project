import JobCard from "@/components/shared/JobCard";
import { getJobs } from "@/lib/services/api/jobs";
import { useEffect, useState } from "react";

function JobSection() {
  const [jobs, setJobs] = useState([]);
  const [isJobsLoading, setIsJobsLoading] = useState(false);
  const [isJobsError, setIsJobsError] = useState(false);

  useEffect(() => {
    setIsJobsLoading(true);
    getJobs()
      .then((data) => {
        setJobs(data);
      })
      .catch(() => {
        setIsJobsError(true);
      })
      .finally(() => {
        setIsJobsLoading(false);
      });
  }, []);

  if (isJobsLoading) {
    return (
      <section className="py-8">
        <h2>Available Jobs</h2>
        <div className="mt-4 flex flex-col gap-y-8">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (isJobsError) {
    return (
      <section className="py-8">
        <h2>Available Jobs</h2>
        <div className="mt-4 flex flex-col gap-y-8">
          <p>Error while fething data...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <h2>Available Jobs</h2>
      <div className="mt-4 flex flex-col gap-y-8">
        {jobs.map((job) => {
          return (
            <JobCard
              key={job._id}
              title={job.title}
              _id={job._id}
              type={job.type}
              location={job.location}
            />
          );
        })}
      </div>
    </section>
  );
}

export default JobSection;
