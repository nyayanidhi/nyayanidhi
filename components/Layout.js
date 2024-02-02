import Head from "next/head";
import Navbar from "./Navbar";
import Hero from "./Hero";
import { Toaster } from "@/components/ui/toaster";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function Layout({ children }) {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return null;
  }

  if (user) {
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

  return <Hero />;
}
