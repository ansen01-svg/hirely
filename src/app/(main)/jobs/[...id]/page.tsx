import { cache } from "react";
import { fetchJobDetails } from "@/app/lib/fetch_job_details";
import NotFound from "@/app/components/[jobId]/not_found";
import Header from "@/app/components/[jobId]/header";
import MainCard from "@/app/components/[jobId]/main_card";
import JobDescription from "@/app/components/[jobId]/job_description";

type SingleJobProps = {
  params: Promise<{ id: string }>;
};

const getJobDetails = cache(fetchJobDetails);

export const generateMetadata = async ({ params }: SingleJobProps) => {
  const { id } = await params;
  const job = await getJobDetails(id[0]);

  return {
    title:
      job.data.length > 0
        ? `${job.data[0].employer_name} - ${job.data[0].job_title}`
        : "Not found - 404 Error",
    description:
      job.data.length > 0
        ? "View detailed job information, requirements, and application links on JobGregate. Discover your next role and apply directly to top platforms."
        : "Not found - 404 Error",
  };
};

export default async function SingleJob({ params }: SingleJobProps) {
  const { id } = await params;
  const job = await getJobDetails(id[0]);
  const jobDetails = job.data[0];

  if (job.data.length === 0) {
    return <NotFound />;
  }

  return (
    <main className="w-full">
      <div className="w-full">
        <Header
          companyLogo={jobDetails.employer_logo}
          companyName={jobDetails.employer_name}
          datePosted={jobDetails.job_posted_at_datetime_utc}
        />
        <MainCard job={jobDetails} />
        <JobDescription job={jobDetails} />
      </div>
    </main>
  );
}
