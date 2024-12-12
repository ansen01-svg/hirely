import type { Metadata } from "next";
import Main from "../../components/profile/main";
import { auth } from "@/app/lib/auth";
import { UserDataType } from "@/app/types";

export const metadata: Metadata = {
  title: "JobGregate Profile | Manage Your Job Preferences and Applications",
  description:
    "Personalize your job search with JobGregate. Update preferences, save job listings, and streamline your applications—all from your profile page.",
};

export default async function SingleJob() {
  const session = await auth();

  return (
    <div className="w-full">
      <Main user={session?.user as UserDataType} />
    </div>
  );
}
