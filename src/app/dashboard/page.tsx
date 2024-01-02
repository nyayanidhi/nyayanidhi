"use client";
import ProtectedRoute from "@/components/Protected";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logoutFunc from "@/firebase/auth/logout";

function Page(): JSX.Element {
  return (
    <ProtectedRoute>
      <div className="h-screen bg-slate-800 p-4 flex flex-col justify-between">
        <div className="flex flex-col w-full">
          <div className="w-full flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-[#19c37d] rounded px-3 py-2">
                <svg
                  color="white"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 50 50"
                >
                  <path d="M 2 9 L 2 11 L 48 11 L 48 9 L 2 9 z M 2 24 L 2 26 L 48 26 L 48 24 L 2 24 z M 2 39 L 2 41 L 48 41 L 48 39 L 2 39 z"></path>
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutFunc}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="text-white ml-3 text-lg">Text goes here...</div>
        </div>
        <div className="flex items-center">
          <Input
            placeholder="Ask me anything..."
            className="bg-slate-200 flex-grow"
            type="textarea"
          />
          <Button
            type="submit"
            className="ml-2 p-2 rounded bg-[#19c37d] text-white font-semibold hover:bg-[#17b16b]"
          >
            Submit
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Page;
