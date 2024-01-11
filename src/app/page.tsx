"use client";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import ChromeIcon from "@/assets/icons/Chrome";
import signIn from "@/firebase/auth/signIn";
import ProtectedRoute from "@/components/Protected";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomeComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  // Handle form submission
  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Attempt to sign in with provided email and password
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Invalid email format.",
        variant: "destructive",
      });
      return;
    }
    const { result, error } = await signIn(email, password);

    if (error) {
      // Display and log any sign-in errors
      toast({
        title: "Error",
        description: "Login Failure",
        variant: "destructive",
      });
      console.log(error);

      return;
    }

    router.push("/uploadfiles");
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <Toaster />
      <Card className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 dark:bg-gray-800">
        <CardHeader className="md:flex">
          <div className="p-8">
            <div className="uppercase text-sm text-indigo-500 font-semibold">
              Sign In
            </div>
            <h2 className="block mt-1 text-2xl leading-tight font-bold text-black dark:text-white">
              Welcome back to Nyaya Nidhi
            </h2>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleForm}>
            <div className="px-8">
              <div className="mb-5">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                  id="email"
                  placeholder="name@gmail.com"
                  required
                  type="email"
                />
              </div>
              <div className="mb-5">
                <Label htmlFor="password">Password</Label>
                <Input
                  className="mt-1"
                  id="password"
                  required
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button className="w-full mb-5" type="submit">
                Sign In
              </Button>
              <div className="w-full flex justify-between">
                <Link
                  className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  href="#"
                >
                  Forgot password?
                </Link>
                <Link
                  className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  href="/signup"
                >
                  Don't have an account?
                </Link>
              </div>
              <Separator className="my-8" />
              <Button
                className="w-full flex justify-center items-center gap-2"
                variant="outline"
              >
                <ChromeIcon className="w-5 h-5" />
                Sign in with Google
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
