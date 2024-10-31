const fields = [
  "employer_logo",
  "employer_name",
  "job_posted_at_datetime_utc",
  "job_title",
  "job_employment_type",
  "job_city",
  "job_country",
  "job_is_remote",
  "job_description",
  "job_required_experience",
  "job_apply_link",
  "job_required_skills",
  "job_required_education",
  "job_min_salary",
  "job_max_salary",
  "employer_website",
  "employer_company_type",
  "employer_linkedin",
  "apply_options",
  "job_benefits",
];

export const fetchJobDetails = async (job_id: string) => {
  const queryFields = fields.join(",");

  const url = `https://jsearch.p.rapidapi.com/job-details?job_id=${job_id}&extended_publisher_details=true&fields=${queryFields}&markup_job_description=true`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching job details:", error);
  }
};

// required
//   "employer_logo",
//   "employer_name",
//   "job_posted_at_datetime_utc",
//   "job_title",
//   "job_employment_type",
//   "job_city",
//   "job_country",
//   "job_is_remote",
//   "job_description",
//   "job_required_experience",
//   "job_required_skills",
//   "job_required_education",
//   "job_min_salary",
//   "job_max_salary",
//   "employer_website",
//   "employer_company_type",
//   "employer_linkedin",

// "job_id",
//   "employer_name",
//   "employer_logo",
//   "employer_website",
//   "employer_company_type",
//   "employer_linkedin",
//   "job_publisher",
//   "job_employment_type",
//   "job_title",
//   "job_apply_link",
//   "job_apply_is_direct",
//   "job_apply_quality_score",
//   "apply_options",
//   "job_description",
//   "job_is_remote",
//   "job_posted_at_timestamp",
//   "job_posted_at_datetime_utc",
//   "job_city",
//   "job_state",
//   "job_country",
//   "job_latitude",
//   "job_longitude",
//   "job_benefits",
//   "job_google_link",
//   "job_offer_expiration_datetime_utc",
//   "job_offer_expiration_timestamp",
//   "job_required_experience",
//   "job_required_skills",
//   "job_required_education",
//   "job_experience_in_place_of_education",
//   "job_min_salary",
//   "job_max_salary",
//   "job_salary_currency",
//   "job_salary_period",
//   "job_highlights",
//   "job_job_title",
//   "job_posting_language",
//   "job_onet_soc",
//   "job_onet_job_zone",
//   "job_occupational_categories",
//   "job_naics_code",
//   "job_naics_name"
