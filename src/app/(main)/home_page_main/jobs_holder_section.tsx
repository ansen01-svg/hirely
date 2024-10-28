import Image from "next/image";
import Link from "next/link";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";

type JobsHolderSectionPropType = {
  jobs: Record<string, unknown>[];
};

export default function JobsHolderSection({ jobs }: JobsHolderSectionPropType) {
  return (
    <div className="w-full px-8 md:px-24 lg:px-44">
      <div className="w-full py-8 border-solid">
        <p className="text-[15px] text-primaryLight font-bold">
          {jobs.length} jobs
        </p>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-5 border-solid">
        {jobs &&
          jobs.map((job) => {
            return <JobCard key={job.job_id as string} job={job} />;
          })}
      </div>
    </div>
  );
}

type JobCardPropType = {
  job: Record<string, unknown>;
};

// calculate when job was posted
function getTimeDifference(dateString: string): string {
  const targetDate = new Date(dateString);
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const differenceInMs = currentDate.getTime() - targetDate.getTime();

  // Convert the difference to hours
  const hoursDifference = differenceInMs / (1000 * 60 * 60);

  if (hoursDifference < 24) {
    // If the difference is less than 24 hours, return it in hours
    if (hoursDifference === 1) {
      return `${Math.floor(hoursDifference)} hour ago`;
    } else {
      return `${Math.floor(hoursDifference)} hours ago`;
    }
  } else if (hoursDifference === 24) {
    const daysDifference = hoursDifference / 24;
    return `${Math.floor(daysDifference)} day ago`;
  } else {
    // If the difference is 24 hours or more, return it in days
    const daysDifference = hoursDifference / 24;
    return `${Math.floor(daysDifference)} days ago`;
  }
}

function JobCard({ job }: JobCardPropType) {
  const {
    employer_logo,
    employer_name,
    job_city,
    job_country,
    job_employment_type,
    job_id,
    job_title,
    job_posted_at_datetime_utc,
    job_is_remote,
  } = job;

  return (
    <Link
      href={`/jobs/${job_id}`}
      className="w-full h-[250px] px-5 py-5 flex flex-col items-center justify-center gap-5 border-solid border-[1px] border-slate-300 md:h-[150px] md:flex-row shadow"
    >
      <div className="w-full md:w-[10%] flex items-center justify-center">
        {employer_logo ? (
          <div className="w-12 h-12 rounded-full relative border-[1px] border-slate-300">
            <Image
              src={employer_logo as string}
              alt={"company_logo"}
              fill
              priority
              sizes="48px"
              style={{ objectFit: "contain" }}
              className="rounded-full"
            />
          </div>
        ) : (
          <div className="w-12 h-12 flex items-center justify-center rounded-full border-[1px] border-slate-300">
            <ImageNotSupportedOutlinedIcon sx={{ color: "#2d333a" }} />
          </div>
        )}
      </div>
      <div className="w-full md:w-[90%] flex flex-col items-center justify-start gap-3 md:items-start">
        <div className="text-[15px] flex items-center justify-center">
          <span className="font-medium text-center">
            {employer_name as string}
          </span>
          &nbsp;
          {(job_posted_at_datetime_utc as string) && (
            <span className="text-gray-500 text-center">
              (Posted {getTimeDifference(job_posted_at_datetime_utc as string)})
            </span>
          )}
        </div>

        <div className=" text-[15px]">
          <span className="font-medium text-secondary text-center">
            {job_title as string}
          </span>
        </div>

        <div className=" text-[15px] flex items-center justify-center">
          <span className="font-medium text-center">
            {job_employment_type as string}
          </span>
          {(job_city as string) && (
            <>
              <span className="h-5 w-[1px] bg-slate-300 ml-2 mr-2"></span>
              <span className="text-gray-500 text-center">
                {job_city as string}, {job_country as string}
              </span>
            </>
          )}
          {(job_is_remote as boolean) && (
            <>
              <span className="h-5 w-[1px] bg-slate-300 ml-2 mr-2"></span>
              <span className="text-gray-500">Remote</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
