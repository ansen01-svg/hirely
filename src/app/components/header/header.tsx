import { auth } from "@/app/lib/auth";
import Content from "./content";

export default async function Header() {
  const session = await auth();

  const getFirstLetter = () => {
    return session?.user?.name?.at(0)?.toLocaleUpperCase();
  };

  return (
    <div className="w-full border-b-[1px] border-slate-300">
      <Content
        image={session?.user?.image || ""}
        user={getFirstLetter() as string}
      />
    </div>
  );
}
