import { AuthContextProvider } from "@/context/AuthContext";
import { Inter } from "next/font/google";
import "./globals.css";

// Metadata for the application
export const metadata = {
  title: "Nyaya Nidhi",
  description: "A vakil companion for the modern age.",
};

// Root layout component for the application
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      {/*
        The <head /> component will contain the components returned by the nearest parent
        head.js. It can be used to define the document head for SEO, metadata, and other purposes.
        Learn more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* Wrap the children with the AuthContextProvider to provide authentication context */}
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
