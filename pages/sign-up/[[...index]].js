import Head from "next/head";
// import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <Head>
        <title>Nyaya Nidhi</title>
      </Head>
      <main className="h-screen flex justify-center items-center w-screen bg-gradient-to-b from-violet-600/[.15] via-transparent bg-slate-900">
        <h1 className="text-3xl text-white font-bold">
          The appliation is in Alpha. Contact admin for access
        </h1>
      </main>
    </>
  );
}
