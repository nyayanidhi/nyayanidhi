import { ChooseFilesData } from "@/utils/formCreate";
import { ChooseRequest } from "@/utils/requests/UploadPage";
import PopUpModal from "./PopUpModal";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "./ui/use-toast";

const ChoosePopUp = ({
  showModal,
  files,
  setCheckedFiles,
  checkedFiles,
  outputSection,
  setShowModal,
}) => {
  const { toast } = useToast();
  const handleCheck = (file, isChecked) => {
    if (isChecked) {
      setCheckedFiles((prev) => [...prev, [file.option, file.file.name]]);
    } else {
      setCheckedFiles((prev) => prev.filter((f) => f[1] !== file.file.name));
    }
  };

  const handleChooseRequest = async () => {
    const apirObj = JSON.parse(localStorage.getItem("apir"));
    const data = ChooseFilesData(
      checkedFiles,
      apirObj.file_info,
      outputSection
    );

    const response = await ChooseRequest(data);
    if (response.success) {
      localStorage.setItem("apir2", JSON.stringify(response.data));
      localStorage.setItem("init", "true");
      setTimeout(() => {
        if (checkedFiles.length > 0) {
          window.location.href = "/chat";
        } else {
          window.location.href = "/output";
        }
      }, 2000);
    } else {
      toast({
        title: "Error: Upload",
        description: response.message,
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setShowModal(false);
      localStorage.removeItem("apir");
      localStorage.removeItem("session_id");
      localStorage.removeItem("converse");
    }
  };

  return (
    <PopUpModal showModal={showModal}>
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
                        onChange={(e) => handleCheck(file, e.target.checked)}
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
          onClick={handleChooseRequest}
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Proceed
        </button>
      </div>
    </PopUpModal>
  );
};

export default ChoosePopUp;
