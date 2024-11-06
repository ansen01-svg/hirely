import Main from "./main";
import { auth } from "@/app/lib/auth";
import { UserDataType } from "@/app/types";

export default async function SingleJob() {
  const session = await auth();

  return (
    <div className="w-full">
      <Main user={session?.user as UserDataType} />
    </div>
  );
}
