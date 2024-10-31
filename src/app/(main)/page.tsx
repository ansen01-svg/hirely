import { auth } from "@/app/lib/auth";
import { getcurrentUser } from "../lib/getCurrentUser";
import Main from "./home_page_main/home_page_main";

export default async function Home() {
  const session = await auth();
  await getcurrentUser({ email: session?.user?.email as string });

  return (
    <div className="w-full">
      <Main />
    </div>
  );
}
