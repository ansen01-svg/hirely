import { OptionArrayTypes } from "../types";

export const datePostedOptions: OptionArrayTypes = [
  { id: 0, title: "None", value: "None" },
  { id: 1, title: "All", value: "all" },
  { id: 2, title: "Today", value: "today" },
  { id: 3, title: "3 days ago", value: "3days" },
  { id: 4, title: "1 week ago", value: "week" },
  { id: 5, title: "1 month ago", value: "month" },
];

export const employmentTypeOptions: OptionArrayTypes = [
  { id: 0, title: "None", value: "None" },
  { id: 1, title: "Fulltime", value: "FULLTIME" },
  { id: 2, title: "Contractor", value: "CONTRACTOR" },
  { id: 3, title: "Part time", value: "PARTTIME" },
  { id: 4, title: "Intern", value: "INTERN" },
];

export const jobRequirementsOptions: OptionArrayTypes = [
  { id: 0, title: "None", value: "None" },
  { id: 1, title: "Less than 3 years", value: "under_3_years_experience" },
  { id: 2, title: "More than 3 years", value: "more_than_3_years_experience" },
  { id: 3, title: "Fresher", value: "no_experience" },
  { id: 4, title: "No degree", value: "no_degree" },
];

export const radiusOptions: OptionArrayTypes = [
  { id: 0, title: "None", value: "None" },
  { id: 1, title: "Within 30 Kms", value: "30" },
  { id: 2, title: "Within 50 Kms", value: "50" },
  { id: 3, title: "Within 100 Kms", value: "100" },
  { id: 4, title: "Within 150 Kms", value: "150" },
];
