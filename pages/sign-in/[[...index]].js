import Head from "next/head";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <Head>
        <title>Nyaya Nidhi</title>
      </Head>
      <main className="h-screen flex justify-center items-center w-screen bg-gradient-to-b from-violet-600/[.15] via-transparent bg-slate-900">
        <SignIn />
      </main>
    </>
  );
}
