import Main from "./main";
import { getCurrentUser } from "@/app/lib/getCurrentUser";

export default async function SingleJob() {
  const user = await getCurrentUser();

  return (
    <div className="w-full">
      <Main user={user} />
    </div>
  );
}
