import { useState } from "react";
import { useUser } from "@clerk/nextjs";

import PageCard from "@/components/PageCard";
import UploadBox from "@/components/UploadBox";
import ShowFiles from "@/components/ShowFiles";
import ChoosePopUp from "@/components/ChoosePopUp";
import { ToastAction } from "@/components/ui/toast";

import { useToast } from "@/components/ui/use-toast";
import { uploadValidation } from "@/utils/validators";
import { OutputTypes } from "@/utils/constants";
import { UploadFormCreate } from "@/utils/formCreate";
import { UploadRequest } from "@/utils/requests/UploadPage";

import LoadingIcon from "@/assets/icon-components/LoadingIcon";
import Layout from "@/components/Layout";

export default function Home() {
  const { user } = useUser();
  const { toast } = useToast();
  const [files, setFiles] = useState([]);
  const [outputSection, setOutputSection] = useState("");
  const [checkedFiles, setCheckedFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    const { isValid, errorMessage } = uploadValidation(files, outputSection);
    if (!isValid) {
      toast({
        title: "Error: Validation",
        description: errorMessage,
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    const formData = UploadFormCreate(files, outputSection, user);
    setIsLoading(true);
    const response = await UploadRequest(formData);
    setIsLoading(false);
    if (response.success) {
      toast({
        title: "Success",
        description: response.message,
        variant: "success",
        action: <ToastAction altText="Okay">Okay</ToastAction>,
      });
      setShowModal(true);
      localStorage.setItem("apir", JSON.stringify(response.data));
    } else {
      toast({
        title: "Error: Upload",
        description: response.message,
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      localStorage.removeItem("session_id");
    }
  };

  return (
    <Layout>
      <main>
        <PageCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <UploadBox setFiles={setFiles} />
            </div>
            <div className="w-full">
              <ShowFiles files={files} setFiles={setFiles} />
            </div>
            <div className="w-full border-2 h-80 p-4 rounded">
              <div className="text-2xl font-semibold text-gray-800 mb-4">
                Your price for {files.length} files would be
              </div>
              <div className="text-7xl font-bold text-green-500 mb-4 flex w-full justify-center mt-16">
                ₹ {files.length * 100}
              </div>
            </div>
            <div className="w-full border-2 h-80 p-4 rounded flex flex-col gap-3">
              <div className="text-2xl font-semibold text-gray-800 mb-4">
                How would you like your output?
              </div>
              <select
                className="p-2 w-full rounded"
                onChange={(e) => setOutputSection(e.target.value)}
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
              <button
                onClick={handleUpload}
                className="bg-black p-2 rounded text-white font-semibold hover:bg-slate-900"
                disabled={isLoading ? true : false}
              >
                Proceed
              </button>
              {isLoading && (
                <div className="flex flex-col">
                  <div className="flex text-bold items-center font-bold">
                    <LoadingIcon className="w-12" />
                    Loading...
                  </div>

                  <span className="font-semibold text-yellow-600 ml-1">
                    Do not refresh the page, it will take some time to upload
                  </span>
                </div>
              )}
            </div>
          </div>
        </PageCard>
        <ChoosePopUp
          files={files}
          setCheckedFiles={setCheckedFiles}
          showModal={showModal}
          checkedFiles={checkedFiles}
          outputSection={outputSection}
          setShowModal={setShowModal}
        />
      </main>
    </Layout>
  );
}
