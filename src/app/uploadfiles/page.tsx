"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/Protected";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { uuidv4 } from "@/lib/utils";

function UploadFiles(): JSX.Element {
  const { user } = useAuthContext() as { user: any };
  const [files, setFiles] = useState<{ file: File; option: string }[]>([]);
  const [outputSection, setOutputSection] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errText, setErrText] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFileObjects = Array.from(e.target.files).map((file) => ({
        file,
        option: "",
      }));
      setFiles(newFileObjects);
    }
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const newFileObjects = [...files];
    newFileObjects[index].option = e.target.value;
    setFiles(newFileObjects);
  };

  const handleOutputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOutputSection(e.target.value);
  };

  const uploadFiles = async () => {
    const formData = new FormData();
    if (files.length <= 0) {
      setErrText("Please upload atleast one file");
      return;
    }
    files.forEach((fileObject, index) => {
      if (fileObject.option === "" || fileObject.option === null) {
        setErrText(`Please select an option for file ${index + 1}`);
        return;
      }
    });
    if (outputSection === "" || outputSection === null) {
      setErrText("Please select an output option");
      return;
    }
    const sessionId = uuidv4();
    console.log("Session Id => ", sessionId);
    formData.append("user_id", user.uid);
    formData.append("session_id", sessionId);
    formData.append("output_request", outputSection);
    formData.append("email_id", user.reloadUserInfo.email);

    files.forEach((fileObject, index) => {
      formData.append(`file_type${index + 1}`, fileObject.option);
      formData.append(`file${index + 1}`, fileObject.file);
    });

    setLoading(true);
    try {
      const resp = await fetch("https://nyayanidhi.azurewebsites.net/upload", {
        method: "POST",
        body: formData,
      });
      console.log("Response => ", resp);
      setResponse("Success!!");
    } catch (error) {
      console.log("Error => ", error);
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      setResponse("");
      setErrText("");
      setFiles([]);
    }, 7000);
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
                      <div className="w-full flex gap-2" key={index}>
                        <span className="text-gray-700 p-2 bg-blue-200 rounded w-1/2">
                          {file.file.name}
                        </span>
                        <select
                          className="px-3 w-1/2"
                          defaultValue={""}
                          onChange={(e) => handleSelectChange(e, index)}
                        >
                          <option value={""}>Select</option>
                          <option value={"FIR"}>FIR</option>
                          <option value={"482"}>482</option>
                          <option value={"Complaint"}>Complaint</option>
                          <option value={"Charge Sheet"}>Charge Sheet</option>
                          <option value={"Order"}>Order</option>
                          <option value={"Notice"}>Notice</option>
                          <option value={"Petition"}>Petition</option>
                          <option value={"Written Statement"}>
                            Written Statement
                          </option>
                          <option value={"Judgement"}>Judgement</option>
                          <option value={"Order sheet"}>Order sheet</option>
                          <option value={"Written Petition"}>
                            Written Petition
                          </option>
                          <option value={"Response to Appeals"}>
                            Response to Appeals
                          </option>
                        </select>
                      </div>
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
                  <select
                    className="p-2 w-full rounded"
                    onChange={handleOutputChange}
                    defaultValue={""}
                  >
                    <option value={""}>Select</option>
                    <option value={"Notices"}>Notices</option>
                    <option value={"Petitions"}>Petitions</option>
                    <option value={"Written Statements"}>
                      Written Statements
                    </option>
                    <option value={"Criminal Appeal"}>Criminal Appeal</option>
                    <option value={"Criminal Complaint"}>
                      Criminal Complaint
                    </option>
                    <option value={"Criminal Petition"}>
                      Criminal Petition
                    </option>
                    <option value={"Write Petitions"}>Write Petitions</option>
                    <option value={"482"}>482</option>
                    <option value={"Impleading Applications"}>
                      Impleading Applications
                    </option>
                    <option value={"Bail"}>Bail</option>
                    <option value={"Consumer Complaint"}>
                      Consumer Complaint
                    </option>
                    <option value={"Version (Consumer Complaint)"}>
                      Version (Consumer Complaint)
                    </option>
                  </select>
                </div>
                {/* <Link href={`/chatwithapp`} className="w-full"> */}
                <Button className="bg-blue-500 w-full" onClick={uploadFiles}>
                  Proceed
                </Button>
                {loading && <div className="w-full">Loading...</div>}
                {errText && (
                  <div className="w-full text-red-500">{errText}</div>
                )}
                {response && (
                  <div className="w-full text-green-500">{response}</div>
                )}
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default UploadFiles;
