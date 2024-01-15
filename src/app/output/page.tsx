"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/Protected";

function OutputPage(): JSX.Element {
  const lcl = localStorage.getItem("2ndEnd");
  const [output, setOutput] = useState(false);
  const [outputData, setOutputData] = useState(null);

  useEffect(() => {
    const fetchDownload = async (lcl: string) => {
      const conv = localStorage.getItem("converse") === "true" ? true : false;
      const body = {
        session_id: localStorage.getItem("sessionId"),
        converse: conv,
        moreinfo_data: JSON.parse(lcl),
      };
      const resp = await fetch("https://nyayanidhi.azurewebsites.net/output", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await resp.json();
      console.log(data);
      setOutputData(data);
    };
    if (lcl) {
      fetchDownload(lcl);
    }
  }, []);

  return (
    <ProtectedRoute>
      <Navbar />
      <div
        className="bg-slate-800 p-4 flex flex-col justify-between min-h-screen"
        style={{ minHeight: "calc(100vh - 60px)" }}
      >
        <div
          className="min-h-screen bg-white p-6 rounded shadow-lg"
          style={{ minHeight: "calc(100vh - 100px)" }}
        >
          <div className="text-3xl font-semibold text-gray-800 mb-4">
            Your output is here
          </div>
          <div className="w-full flex justify-center mt-10 flex-col items-center gap-10">
            {output ? (
              <div>Nothing to download</div>
            ) : (
              <div className="w-full flex justify-center mt-10 flex-col items-center gap-10">
                <span className="text-3xl">
                  Your output files has been generated
                </span>
                <div className="flex flex-col gap-4">
                  {outputData && (
                    <>
                      <a
                        className="bg-black p-4 text-white rounded-lg"
                        href={outputData.download_url}
                      >
                        Download file
                      </a>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default OutputPage;
