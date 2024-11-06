import Main from "./home_page_main/home_page_main";
import { auth } from "../lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="w-full">
      <Main role={session?.user.expertise || ""} />
    </div>
  );
}
