import { googleLogoutAction } from "@/app/actions/google_logout";

export default function Logout() {
  return (
    <form action={googleLogoutAction}>
      <button className="p-2 bg-slate-400" type="submit">
        Logout
      </button>
    </form>
  );
}
