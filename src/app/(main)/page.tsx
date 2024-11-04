import { getCurrentUser } from "../lib/getCurrentUser";
import Main from "./home_page_main/home_page_main";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="w-full">
      <Main role={user.expertise || ""} />
    </div>
  );
}
