"use client";

import React, { useCallback, useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import DescriptionSection from "./description_section";
import FormSection from "./form_section";
import JobsHolderSection from "./jobs_holder_section";
import { JobData } from "@/app/types";
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
  const [isFetching, setIsFetching] = useState<boolean>(true);

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
  const [radius, setRadius] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

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

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
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

  const handleRadiusChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setRadius(value);
  };

  // Fetch jobs based on `page` number and `jobSearch` criteria
  const fetchJobs = useCallback(
    async (title: string, location: string) => {
      setIsFetching(true);

      // Set default values if title or location is empty
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
          const data = await response.json();
          setJobs((prevJobs) => {
            const newJobs = data.data.filter(
              (newJob: Record<string, unknown>) =>
                !prevJobs.some((job) => job.job_id === newJob.job_id)
            );
            return [...prevJobs, ...newJobs];
          });
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsFetching(false);
      }
    },
    [role]
  );

  // fetch job filters values from local storage and update state
  useEffect(() => {
    const jobSearch = localStorage.getItem("jobSearch");
    const storedFilters = localStorage.getItem("jobFilters");

    if (jobSearch) {
      const parsedFilters = JSON.parse(jobSearch);
      setJobSearch({
        title: parsedFilters.title,
        location: parsedFilters.location,
      });
    }

    if (storedFilters) {
      const parsedFilters = JSON.parse(storedFilters);
      setDatePosted(parsedFilters.datePosted || "");
      setEmploymentType(parsedFilters.employmentType || "");
      setJobRequirements(parsedFilters.jobRequirements || "");
      setRadius(parsedFilters.radius || "");
    }
  }, []);

  // When filter states are updated, stores it to local storage
  useEffect(() => {
    if (jobSearch.title && jobSearch.location) {
      localStorage.setItem("jobSearch", JSON.stringify(jobSearch));
    }

    // Store all filter values, conditionally including jobSearch values
    const filtersToStore = {
      datePosted,
      employmentType,
      jobRequirements,
      radius,
    };

    localStorage.setItem("jobFilters", JSON.stringify(filtersToStore));
  }, [jobSearch, datePosted, employmentType, jobRequirements, radius]);

  // triggers jobFetch and fetches jobs when `jobSearch` has valid values
  // useEffect(() => {
  //   // Clear the previous timeout if it exists
  //   if (typingTimeout) {
  //     clearTimeout(typingTimeout);
  //   }

  //   // Set a new timeout
  //   const newTimeout = setTimeout(() => {
  //     if (jobSearch.title && jobSearch.location) {
  //       setJobs([]); // Clear previous jobs
  //       fetchJobs(jobSearch.title, jobSearch.location);
  //       // console.log("triggered");
  //     }
  //   }, 2000);

  //   // Store the timeout ID
  //   setTypingTimeout(newTimeout);

  //   // Cleanup function to clear timeout on component unmount or jobSearch change
  //   return () => {
  //     clearTimeout(newTimeout);
  //   };
  // }, [jobSearch]);

  // fetch jobs on load
  useEffect(() => {
    fetchJobs(jobSearch.title, jobSearch.location);
  }, [fetchJobs, jobSearch]);

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
        radius={radius}
        checked={checked}
        handleDatePostedChange={handleDatePostedChange}
        handleEmploymentTypeChange={handleEmploymentTypeChange}
        handleJobRequirementsChange={handleJobRequirementsChange}
        handleRadiusChange={handleRadiusChange}
        handleSwitchChange={handleSwitchChange}
      />
      <JobsHolderSection jobs={jobs} />
      {isFetching && <LoadingJobs />}
    </main>
  );
}

function LoadingJobs(props: CircularProgressProps) {
  return (
    <div className="w-full px-8 md:px-24 lg:px-44">
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
