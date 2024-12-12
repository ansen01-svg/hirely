import Link from "next/link";
import { JobData } from "@/app/types";

export type MainCardPropType = {
  job: JobData;
};

export default function MainCard({ job }: MainCardPropType) {
  const {
    apply_options,
    job_apply_link,
    job_city,
    job_country,
    job_employment_type,
    job_is_remote,
    job_min_salary,
    job_max_salary,
    job_title,
    employer_name,
  } = job;

  const filteredApplyOptions = apply_options
    .filter((job) =>
      [
        "LinkedIn",
        "Glassdoor",
        "Foundit.in",
        "SimplyHired",
        "Talentify",
        "Wellfound",
      ].includes(job.publisher)
    )
    .filter(
      (job, index, self) =>
        index === self.findIndex((j) => j.publisher === job.publisher)
    );

  return (
    <div className="w-full px-4 md:px-24 lg:px-72">
      <div className="w-full px-7 py-4 flex flex-col items-start justify-center gap-5 border-solid border-[1px] border-slate-300">
        <div className="text-primaryLight text-[15px] flex flex-col items-start justify-center gap-1">
          <h1 className="text-[22px] text-start">{job_title}</h1>
          {job_min_salary && job_max_salary ? (
            <h2 className=" text-black font-medium">
              Rs.{job_min_salary} - Rs.{job_max_salary}
            </h2>
          ) : (
            <h2 className="text-sm">Salary undisclosed</h2>
          )}
        </div>

        <div className="flex items-center justify-center gap-5">
          <div className="text-[14px] text-primaryLight">
            <p className="text-black font-medium">Location</p>
            {job_is_remote ? (
              <p>
                Currently remote/{job_city}, {job_country}
              </p>
            ) : (
              <p>
                {job_city}, {job_country}
              </p>
            )}
          </div>
          <div className="text-[14px] text-primaryLight">
            <p className="text-black font-medium">Job Type</p>
            <p>{job_employment_type}</p>
          </div>
        </div>

        <hr className="w-full h-[1px] bg-slate-300 border-none my-4" />

        <div className="flex flex-col items-start justify-center gap-5">
          <div className="text-[14px] text-primaryLight">
            <p>Apply to {employer_name} via -</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            {filteredApplyOptions.map((option, index) => {
              return (
                <Link
                  href={option.apply_link}
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 text-[14px]"
                >
                  {option.publisher}
                </Link>
              );
            })}
            <Link
              href={job_apply_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] hover:text-blue-500"
            >
              Direct apply
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
