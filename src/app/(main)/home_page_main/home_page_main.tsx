"use client";

import React, { useCallback, useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import DescriptionSection from "./description_section";
import FormSection from "./form_section";
import JobsHolderSection from "./jobs_holder_section";
import { JobData } from "@/app/types";
import { subDays, isAfter, isToday } from "date-fns";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";

type MainPropType = {
  role: string;
};

export type JobSearchType = {
  title: string;
  location: string;
};

export default function Main({ role }: MainPropType) {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobData[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isSearchOrFilterApplied, setIsSearchOrFilterApplied] =
    useState<boolean>(false);

  const [jobSearch, setJobSearch] = useState<JobSearchType>({
    title: "",
    location: "",
  });
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const [datePosted, setDatePosted] = useState<string>("");
  const [employmentType, setEmploymentType] = useState<string>("");
  const [jobRequirements, setJobRequirements] = useState<string>("");
  const [companyType, setCompanyType] = useState<string>("");
  const [isRemote, setIsRemote] = useState<boolean>(false);

  const handleJobSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newJobSearch = {
      ...jobSearch,
      [event.target.name]: event.target.value,
    };
    setJobSearch(newJobSearch);
  };

  const clearJobSearchTitleValue = () => {
    setJobSearch({ ...jobSearch, title: "" });
    localStorage.removeItem("jobSearch");
  };

  const clearJobSearchLocationValue = () => {
    setJobSearch({ ...jobSearch, location: "" });
    localStorage.removeItem("jobSearch");
  };

  const handleIsRemoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsRemote(event.target.checked);
  };

  const handleDatePostedChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setDatePosted(value);
  };

  const handleEmploymentTypeChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setEmploymentType(value);
  };

  const handleJobRequirementsChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setJobRequirements(value);
  };

  const handleCompanyTypeChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setCompanyType(value);
  };

  // apply filters to jobs array
  const applyFilters = useCallback(
    (jobs: JobData[]) => {
      return jobs.filter((job) => {
        const experienceRequired = job.job_required_experience
          ?.required_experience_in_months
          ? parseInt(job.job_required_experience.required_experience_in_months)
          : 0;

        const jobDate = new Date(job.job_posted_at_datetime_utc);

        // filter by date posted
        if (datePosted && datePosted !== "All") {
          switch (datePosted) {
            case "Today":
              if (!isToday(jobDate)) return false;
              break;
            case "3 days ago":
              if (!isAfter(jobDate, subDays(new Date(), 3))) return false;
              break;
            case "1 week ago":
              if (!isAfter(jobDate, subDays(new Date(), 7))) return false;
              break;
            case "1 month ago":
              if (!isAfter(jobDate, subDays(new Date(), 30))) return false;
              break;
            default:
              break;
          }
        }

        // filter by jobRequirements
        if (jobRequirements && jobRequirements !== "All") {
          switch (jobRequirements) {
            case "Fresher":
              // Reject if experience required is more than 0
              if (experienceRequired > 0) return false;
              break;
            case "Less than 3 years":
              // Reject if experience required is 3 years or more
              if (experienceRequired >= 36) return false;
              break;
            case "More than 3 years":
              // Reject if experience required is 3 years or less
              if (experienceRequired <= 36) return false;
              break;
            default:
              break;
          }
        }

        // filter by employment type
        if (employmentType && employmentType !== "All") {
          if (job.job_employment_type !== employmentType.toUpperCase())
            return false;
        }

        // filter by company type
        // filter by company type
        if (companyType && companyType !== "All") {
          if (job.employer_company_type !== companyType) return false;
        }

        // filter by remote job
        if (isRemote && !job.job_is_remote) return false;
        return true;
      });
    },
    [isRemote, employmentType, jobRequirements, companyType, datePosted]
  );

  // Fetch jobs `jobSearch` criteria
  const fetchJobs = useCallback(
    async (title: string, location: string) => {
      setIsFetching(true);
      setIsSearchOrFilterApplied(false);

      const searchTitle = title || role || "Software developer";
      const searchLocation = location || "India";
      const query = `${searchTitle} in ${searchLocation}`.replace(/ /g, "%20");

      const url = `https://jsearch.p.rapidapi.com/search?query=${query}&page=1&num_pages=9&date_posted=all`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
          "x-rapidapi-host": "jsearch.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        if (response.status === 200) {
          const data = (await response.json()) as { data: JobData[] };
          const uniqueJobs: JobData[] = Array.from(
            new Map(data.data.map((job) => [job.job_id, job])).values()
          );

          setJobs(uniqueJobs);
          setFilteredJobs(applyFilters(uniqueJobs));
          setIsSearchOrFilterApplied(true);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsFetching(false);
      }
    },
    [role]
  );

  // fetch jobs and job filters values from local storage and update state on initial render
  useEffect(() => {
    const storedJobSearch = localStorage.getItem("jobSearch");
    const parsedSearch = storedJobSearch ? JSON.parse(storedJobSearch) : null;

    if (parsedSearch) setJobSearch(parsedSearch);

    const storedFilters = localStorage.getItem("jobFilters");
    const parsedFilters = storedFilters ? JSON.parse(storedFilters) : null;

    if (storedFilters) {
      setIsRemote(parsedFilters.isRemote || false);
      setDatePosted(parsedFilters.datePosted || "");
      setEmploymentType(parsedFilters.employmentType || "");
      setJobRequirements(parsedFilters.jobRequirements || "");
      setCompanyType(parsedFilters.companyType || "");
    }

    fetchJobs(
      parsedSearch?.title || jobSearch.title,
      parsedSearch?.location || jobSearch.location
    );
  }, [fetchJobs]);

  // triggers jobFetch and fetches jobs when `jobSearch` has valid values
  useEffect(() => {
    // Clear the previous timeout if it exists
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout
    const newTimeout = setTimeout(() => {
      if (jobSearch.title && jobSearch.location) {
        localStorage.setItem("jobSearch", JSON.stringify(jobSearch));
        fetchJobs(jobSearch.title, jobSearch.location);
      }
    }, 2000);

    // Store the timeout ID
    setTypingTimeout(newTimeout);

    // Cleanup function to clear timeout on component unmount or jobSearch change
    return () => {
      clearTimeout(newTimeout);
    };
  }, [jobSearch, fetchJobs]);

  // When filter states are updated, stores it to local storage
  useEffect(() => {
    const filtersToStore = {
      datePosted,
      employmentType,
      jobRequirements,
      companyType,
      isRemote,
    };

    localStorage.setItem("jobFilters", JSON.stringify(filtersToStore));
    setFilteredJobs(applyFilters(jobs));
    setIsSearchOrFilterApplied(true);
  }, [
    jobSearch,
    isRemote,
    datePosted,
    employmentType,
    jobRequirements,
    companyType,
    applyFilters,
    jobs,
  ]);

  return (
    <main className="w-full mb-8">
      <DescriptionSection />
      <FormSection
        jobSearch={jobSearch}
        handleJobSearchInputChange={handleJobSearchInputChange}
        clearJobSearchTitleValue={clearJobSearchTitleValue}
        clearJobSearchLocationValue={clearJobSearchLocationValue}
        datePosted={datePosted}
        employmentType={employmentType}
        jobRequirements={jobRequirements}
        companyType={companyType}
        isRemote={isRemote}
        handleDatePostedChange={handleDatePostedChange}
        handleEmploymentTypeChange={handleEmploymentTypeChange}
        handleJobRequirementsChange={handleJobRequirementsChange}
        handleCompanyTypeChange={handleCompanyTypeChange}
        handleIsRemoteChange={handleIsRemoteChange}
      />
      {isFetching ? (
        <LoadingJobs />
      ) : filteredJobs.length === 0 && isSearchOrFilterApplied ? (
        <NoJobsFound />
      ) : (
        <JobsHolderSection jobs={filteredJobs} />
      )}
    </main>
  );
}

function LoadingJobs(props: CircularProgressProps) {
  return (
    <div className="w-full px-4 md:px-24 lg:px-44">
      <div className="w-full py-8 flex items-center justify-center">
        <div className="relative">
          <CircularProgress
            variant="determinate"
            sx={(theme) => ({
              color: theme.palette.grey[200],
              ...theme.applyStyles("dark", {
                color: theme.palette.grey[800],
              }),
            })}
            size={32}
            thickness={5}
            {...props}
            value={100}
          />
          <CircularProgress
            variant="indeterminate"
            disableShrink
            sx={(theme) => ({
              color: "#1a90ff",
              animationDuration: "550ms",
              position: "absolute",
              left: 0,
              [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: "round",
              },
              ...theme.applyStyles("dark", {
                color: "#308fe8",
              }),
            })}
            size={32}
            thickness={5}
            {...props}
          />
        </div>
      </div>
    </div>
  );
}

function NoJobsFound() {
  return (
    <div className="w-full px-4 md:px-24 lg:px-44">
      <div className="w-full py-8 mt-10 flex items-center justify-center border-solid border-[1px] border-slate-300 shadow-md">
        <p className="text-sm text-gray500 font-medium">No jobs found</p>
      </div>
    </div>
  );
}
