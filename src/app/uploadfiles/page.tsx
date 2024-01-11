"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/Protected";
import Link from "next/link";

function UploadFiles(): JSX.Element {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
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
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="font-medium text-gray-600">
                    Drop pdf files to Attach, or{" "}
                    <span className="text-blue-600 underline">browse pdf</span>
                  </span>
                </span>
                <input
                  type="file"
                  name="file_upload"
                  className="hidden"
                  multiple
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div className="w-full">
              <div className="text-3xl font-semibold text-gray-800 mb-4">
                Your uploaded documents
              </div>
              <div
                className={`border-2 h-96 ${
                  files.length <= 0 && "flex items-center justify-center"
                }  rounded`}
              >
                {files.length > 0 ? (
                  <div className="flex gap-2 flex-col p-5">
                    {files.map((file, index) => (
                      <span
                        key={index}
                        className="text-gray-700 p-2 bg-blue-200 rounded"
                      >
                        {file.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="font-semibold">
                    Currently nothing is uploaded
                  </span>
                )}
              </div>
            </div>
            <div className="w-full border-2 h-80 p-4 rounded">
              <div className="text-2xl font-semibold text-gray-800 mb-4">
                Your price for {files.length} files would be
              </div>
              <div className="text-7xl font-bold text-green-500 mb-4 flex w-full justify-center mt-16">
                ₹ {files.length * 100}
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
                <Link href={`/chatwithapp`} className="w-full">
                  <Button className="bg-blue-500 w-full">Proceed</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default UploadFiles;
