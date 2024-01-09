"use client";
import ProtectedRoute from "@/components/Protected";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

function Page(): JSX.Element {
  return (
    <ProtectedRoute>
      <Navbar />
      <div
        className="bg-slate-800 p-4 flex flex-col justify-between min-h-screen"
        style={{ minHeight: "calc(100vh - 60px)" }}
      >
        <div className="text-white ml-3 text-lg flex-grow overflow-auto">
          Text goes here...
        </div>
        <div className="">
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
      </div>
    </ProtectedRoute>
  );
}

export default Page;
