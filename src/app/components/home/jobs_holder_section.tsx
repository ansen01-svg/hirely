import Image from "next/image";
import Link from "next/link";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import { JobData } from "@/app/types";
import { getTimeDifference } from "@/app/utils/getTimeDifference";

type JobsHolderSectionPropType = {
  jobs: JobData[];
};

export default function JobsHolderSection({ jobs }: JobsHolderSectionPropType) {
  return (
    <div className="w-full px-4 md:px-24 lg:px-44">
      {jobs.length > 0 && (
        <div className="w-full py-8">
          <p className="text-[15px] text-primaryLight font-bold">
            {jobs.length} jobs
          </p>
        </div>
      )}
      <div className="w-full flex flex-col items-center justify-center gap-2 border-solid">
        {jobs &&
          jobs.map((job) => {
            return <JobCard key={job.job_id as string} job={job} />;
          })}
      </div>
    </div>
  );
}

type JobCardPropType = {
  job: JobData;
};

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
      target="_blank"
      rel="noopener noreferrer"
      className="w-full bg-primary h-[250px] px-5 py-5 flex flex-col items-center justify-center gap-5 border-solid border-[1px] border-slate-300 md:h-[150px] md:flex-row"
    >
      <div className="w-full md:w-[10%] flex items-center justify-center">
        {employer_logo ? (
          <div className="w-12 h-12 rounded-full relative flex items-center justify-center border-[1px] border-slate-300">
            <CustomImage
              src={employer_logo as string}
              alt="compony_logo"
              sizes={48}
            />
          </div>
        ) : (
          <div className="w-12 h-12 flex items-center justify-center rounded-full border-[1px] border-slate-300">
            <ImageNotSupportedOutlinedIcon sx={{ color: "#2d333a" }} />
          </div>
        )}
      </div>
      <div className="w-full md:w-[90%] flex flex-col items-center justify-start gap-3 md:items-start">
        <div className="text-[15px] flex items-center justify-center text-center flex-wrap">
          <span className="font-medium">{employer_name as string}</span>
          &nbsp;
          {(job_posted_at_datetime_utc as string) && (
            <span className="text-gray-500 text-center">
              (Posted {getTimeDifference(job_posted_at_datetime_utc as string)})
            </span>
          )}
        </div>

        <div className=" text-[15px] text-center md:text-left">
          <span className="font-medium text-secondary">
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

interface CustomImageProps {
  src: string;
  alt: string;
  sizes: number;
}

export function CustomImage({ src, alt, sizes }: CustomImageProps) {
  const allowedDomains = [
    "upload.wikimedia.org",
    "encrypted-tbn0.gstatic.com",
    "www.soft-inc.com",
  ];
  const hostname = new URL(src).hostname;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority
      sizes={`${sizes}px`}
      unoptimized={!allowedDomains.includes(hostname)}
      style={{ objectFit: "contain" }}
      className="rounded-full"
    />
  );
}
