import { cache } from "react";
import Link from "next/link";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import { CustomImage } from "../../home_page_main/jobs_holder_section";
import { fetchJobDetails } from "@/app/lib/fetch_job_details";
import { getTimeDifference } from "../../home_page_main/jobs_holder_section";
import { JobData } from "@/app/types";

const getJobDetails = cache(fetchJobDetails);

type SingleJobProps = {
  params: Promise<{ id: string }>;
};

export default async function SingleJob({ params }: SingleJobProps) {
  const { id } = await params;
  const job = await getJobDetails(id[0]);
  const jobDetails = job.data[0];

  // console.log(jobDetails);

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

type HeaderPropType = {
  companyLogo: string;
  companyName: string;
  datePosted: string;
};

function Header({ companyLogo, companyName, datePosted }: HeaderPropType) {
  return (
    <div className="w-full px-4 md:px-24 lg:px-72">
      <div className="w-full py-8 flex items-center justify-center">
        <div className="w-14 h-14">
          <div className="w-full h-full relative border-[1px] border-slate-300 rounded-full">
            {companyLogo ? (
              <CustomImage src={companyLogo} alt="company_logo" sizes={128} />
            ) : (
              <div className="w-full h-full flex items-center justify-center rounded-full border-[1px] border-slate-300">
                <ImageNotSupportedOutlinedIcon sx={{ color: "#2d333a" }} />
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 h-full px-5 text-[14px] text-primaryLight flex flex-col items-start justify-center gap-1">
          <h1 className="text-[22px]">{companyName}</h1>
          <h2 className="text-center">
            Posted {getTimeDifference(datePosted)}
          </h2>
        </div>
      </div>
    </div>
  );
}

type MainCardPropType = {
  job: JobData;
};

function MainCard({ job }: MainCardPropType) {
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

function JobDescription({ job }: MainCardPropType) {
  const {
    job_benefits,
    job_description,
    // job_required_education,
    // job_required_experience,
    // job_required_skills,
  } = job;

  return (
    <div className="w-full px-4 md:px-24 lg:px-72">
      <div className="w-full py-6 flex flex-col items-start justify-center gap-5">
        <div className="text-[14px] text-primaryLight flex flex-col items-start justify-center gap-5">
          <h1 className="text-[22px] text-black">About the role:</h1>
          <div
            dangerouslySetInnerHTML={{ __html: job_description }}
            className="job-description"
          />
        </div>
        {job_benefits && (
          <div className="text-[14px] text-primaryLight flex flex-col items-start justify-center gap-5">
            <p>Benefits:</p>
            {/* <p>Benefits:</p> */}
          </div>
        )}
      </div>
    </div>
  );
}
