"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/Protected";

function UploadFiles(): JSX.Element {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <div className="text-3xl font-semibold text-gray-800 mb-4">
                Upload your documents
              </div>
              <label className="flex justify-center w-full h-96 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <span className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="font-medium text-gray-600">
                    Drop files to Attach, or{" "}
                    <span className="text-blue-600 underline">browse</span>
                  </span>
                </span>
                <input type="file" name="file_upload" className="hidden" />
              </label>
            </div>
            <div className="w-full">
              <div className="text-3xl font-semibold text-gray-800 mb-4">
                Your uploaded documents
              </div>
              <div className="border-2 h-96 flex items-center justify-center rounded">
                <span className="font-semibold">
                  Currently nothing is uploaded
                </span>
              </div>
            </div>
            <div className="w-full border-2 h-80 p-4 rounded">
              <div className="text-2xl font-semibold text-gray-800 mb-4">
                Your price for 4 files would be
              </div>
              <div className="text-7xl font-bold text-green-500 mb-4 flex w-full justify-center mt-16">
                ₹ 100
              </div>
            </div>
            <div className="w-full border-2 h-80 p-4 rounded">
              <div className="flex w-full justify-between flex-col gap-4">
                <div className="w-full">
                  <div className="text-2xl font-semibold text-gray-800 mb-4">
                    How would you like your output?
                  </div>
                  <select className="p-2 w-full rounded">
                    <option>CSV</option>
                    <option>JSON</option>
                    <option>Excel</option>
                  </select>
                </div>
                <Button className="bg-blue-500">Proceed</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default UploadFiles;
