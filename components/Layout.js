import Head from "next/head";
import Navbar from "./Navbar";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@clerk/nextjs";

export default function Layout({ children }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded || !isSignedIn) {
    return null;
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
