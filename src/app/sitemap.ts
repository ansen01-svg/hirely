import { fetchJobs } from "./lib/fetch_jobs";
import { JobData } from "./types";

export default async function sitemap() {
  const jobs = await fetchJobs();

  // /jobs/[id] urls
  const jobIdUrls = jobs.map((job: JobData) => {
    return {
      url: `${process.env.NEXT_PUBLIC_URL}/jobs/${job.job_id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  return [
    {
      url: process.env.NEXT_PUBLIC_DOMAIN,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/register`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...jobIdUrls,
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/profile`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
