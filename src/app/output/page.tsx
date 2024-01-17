"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/Protected";
import LoadingIcon from "@/assets/icons/LoadingIcon";

interface Output {
  download_url: string;
}

function OutputPage(): JSX.Element {
  const lcl = localStorage.getItem("2ndEnd");
  const [output, setOutput] = useState<boolean>(false);
  const [outputData, setOutputData] = useState<Output | null>(null);
  const [respFail, setRespFail] = useState<boolean>(false);

  useEffect(() => {
    const fetchDownload = async (lcl: string) => {
      try {
        const conv = localStorage.getItem("converse") === "true" ? true : false;
        const body = {
          session_id: localStorage.getItem("sessionId"),
          converse: conv,
          moreinfo_data: JSON.parse(lcl),
        };

        const resp = await fetch(
          "https://nyayanidhi.azurewebsites.net/output",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        if (!resp.ok) {
          // Check if the response status is not okay
          throw new Error(`Failed to fetch data. Status: ${resp.status}`);
        }

        const data = await resp.json();
        console.log(data);
        setOutputData(data);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        // Handle the error or log it as needed
      }
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
            {lcl === null ? (
              <div>Nothing to download</div>
            ) : (
              <div className="w-full flex justify-center mt-10 flex-col items-center gap-10">
                <span className="text-3xl">Your output is being generated</span>
                <div className="flex flex-col gap-4">
                  {!outputData && <LoadingIcon />}
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
