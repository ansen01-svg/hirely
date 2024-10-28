import { auth } from "@/app/lib/auth";
import { getcurrentUser } from "../lib/getCurrentUser";
import { fetchJobs } from "../lib/fetch_jobs";
import Main from "./home_page_main/home_page_main";

export default async function Home() {
  const session = await auth();
  await getcurrentUser({ email: session?.user?.email as string });
  const data = await fetchJobs();

  return (
    <div className="w-full">
      <Main data={data.data} />
    </div>
  );
}
