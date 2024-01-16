"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/Protected";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { uuidv4 } from "@/lib/utils";
import LoadingIcon from "@/assets/icons/LoadingIcon";

interface ApiResponse {
  folder_id: string;
  file_info: Array<[string, string]>;
}

interface ListOfLists {
  list: Array<[string, string]>;
}

interface FileObject {
  file: File;
  option: string;
}

const InputFileTypes = [
  "Select",
  "FIR",
  "482",
  "Complaint",
  "Charge Sheet",
  "Order",
  "Notice",
  "Petition",
  "Written Statement",
  "Judgement",
  "Order sheet",
  "Written Petition",
  "Response to Appeals",
];

const OutputTypes = [
  { name: "Select", disabled: false },
  { name: "appeal", disabled: false },
  { name: "petition", disabled: false },
  { name: "written_statement", disabled: false },
  { name: "482", disabled: false },
  { name: "writ_petition", disabled: false },
  { name: "impleading_application", disabled: false },
  { name: "injunction_app", disabled: false },
  { name: "criminal_appeal", disabled: true },
  { name: "response_to_appeal", disabled: true },
  { name: "notices", disabled: false },
  { name: "revision_petition", disabled: true },
  { name: "criminal_petition", disabled: true },
  { name: "criminal_complaint", disabled: true },
  { name: "consumer_complaint", disabled: true },
  { name: "version_consumercourts", disabled: true },
  { name: "translations", disabled: false },
  { name: "summarisations", disabled: false },
];

function UploadFiles(): JSX.Element {
  const { user } = useAuthContext() as { user: any };
  const [files, setFiles] = useState<{ file: File; option: string }[]>([]);
  const [outputSection, setOutputSection] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errText, setErrText] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);

  const [checkedFiles, setCheckedFiles] = useState<string[][]>([]);

  const handleCheck = (file: FileObject, isChecked: boolean) => {
    if (isChecked) {
      setCheckedFiles((prev) => [...prev, [file.option, file.file.name]]);
    } else {
      setCheckedFiles((prev) => prev.filter((f) => f[1] !== file.file.name));
    }
  };

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
    localStorage.setItem("sessionId", sessionId);
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
    let data;
    let resp;
    try {
      resp = await fetch("https://nyayanidhi.azurewebsites.net/upload", {
        method: "POST",
        body: formData,
      });

      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }

      data = await resp.json();
      setResponse("Success!!");
    } catch (error) {
      console.log("Error => ", error);
      localStorage.removeItem("sessionId");
    } finally {
      setLoading(false);
    }

    // setResponse("");
    setErrText("");
    // setFiles([]);
    setApiResponse(data);
    setTimeout(() => {
      setShowModal(true);
    }, 1000);
  };

  const choosenFiles = async () => {
    const notInCheckedFiles = apiResponse?.file_info.filter(
      (apiFile) =>
        !checkedFiles.some(
          (checkedFile) =>
            checkedFile[0] === apiFile[0] && checkedFile[1] === apiFile[1]
        )
    );
    const body = {
      converse: false,
      session_id: localStorage.getItem("sessionId"),
      chosen_file_tuples: checkedFiles,
      unchosen_file_tuples: notInCheckedFiles,
      output_type: outputSection,
    };
    if (checkedFiles.length > 0) {
      body["converse"] = true;
      localStorage.setItem("converse", "true");
    } else {
      localStorage.setItem("converse", "false");
    }
    let data;
    try {
      const resp = await fetch("https://nyayanidhi.azurewebsites.net/choose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }

      data = await resp.json();
      console.log("Data => ", data);
    } catch (error) {
      console.log("Error => ", error);
      localStorage.removeItem("sessionId");
      return;
    }
    localStorage.setItem("2ndEnd", JSON.stringify(data));

    setTimeout(() => {
      if (checkedFiles.length <= 0) {
        window.location.href = `/output`;
      }
    }, 1000);
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
                          {InputFileTypes.map((type, index) => {
                            let typex = type === "Select" ? "" : type;
                            return (
                              <option key={index} value={typex}>
                                {type}
                              </option>
                            );
                          })}
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
                    {OutputTypes.map((type, index) => {
                      let typex = type.name === "Select" ? "" : type.name;
                      if (type.disabled)
                        return (
                          <option key={index} value={typex} disabled>
                            {type.name}
                          </option>
                        );
                      return (
                        <option key={index} value={typex}>
                          {type.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <Button className="bg-blue-500 w-full" onClick={uploadFiles}>
                  Proceed
                </Button>
                {loading && (
                  <div className="w-full">
                    <div className="w-full flex items-center">
                      <div>
                        <LoadingIcon />
                      </div>
                      <div className="font-bold">Loading...</div>
                    </div>
                    <span className="font-semibold text-yellow-600">
                      Do not refresh the page, it will take some time to upload
                    </span>
                  </div>
                )}
                {errText && (
                  <div className="w-full text-red-500">{errText}</div>
                )}
                {response && (
                  <div className="w-full text-green-500 font-bold">
                    {response}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`relative z-10 ${!showModal && "hidden"}`}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full m-3">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Choose your files to interact with
                    </h3>
                    <div className="mt-2 flex gap-4">
                      {files.length > 0 &&
                        files.map((file, index) => {
                          return (
                            <div
                              className="bg-blue-300 p-2 flex gap-4 rounded"
                              key={index}
                            >
                              <span>{file.file.name}</span>
                              <input
                                type="checkbox"
                                className="ml-6 accent-blue-300 md:accent-blue-500"
                                onChange={(e) =>
                                  handleCheck(file, e.target.checked)
                                }
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  disabled={loading ? true : false}
                  onClick={choosenFiles}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default UploadFiles;
