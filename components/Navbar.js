import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div className="w-full flex justify-between py-3 px-6 bg-slate-800 border-b-1 border-b-slate-100 shadow-md">
      <div className="flex items-center">
        <div className="text-white font-bold text-xl">Nyaya Nidhi</div>
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
