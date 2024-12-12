import { MainCardPropType } from "./main_card";

export default function JobDescription({ job }: MainCardPropType) {
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
