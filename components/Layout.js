import Head from "next/head";
import Navbar from "./Navbar";
import { Toaster } from "@/components/ui/toaster";
import { useUser } from "@clerk/nextjs";

export default function Layout({ children }) {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) {
    return (
      <>
        <Head>
          <title>Nyaya Nidhi</title>
        </Head>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Nyaya Nidhi</title>
      </Head>
      <Navbar />
      <main className="bg-gray-200">{children}</main>
      <Toaster />
    </>
  );
}
