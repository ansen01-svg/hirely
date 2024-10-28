import { auth } from "@/app/lib/auth";
import Conent from "./content";

export default async function Header() {
  const session = await auth();

  const getFirstLetter = () => {
    return session?.user?.name?.at(0)?.toLocaleUpperCase();
  };

  return (
    <div className="w-full border-b-[1px] border-slate-300">
      <Conent user={getFirstLetter() as string} />
    </div>
  );
}
