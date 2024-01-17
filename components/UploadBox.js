import UploadIcon from "@/assets/icon-components/UploadIcon";

export default function UploadBox({
  title = "Upload your documents",
  fileType = "pdf",
  setFiles,
}) {
  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFileObjects = Array.from(e.target.files).map((file) => ({
        file,
        option: "",
      }));
      setFiles(newFileObjects);
    }
  };
  return (
    <>
      <div className="text-3xl font-semibold text-gray-800 mb-4">{title}</div>
      <label className="flex justify-center w-full h-96 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
        <span className="flex items-center space-x-2">
          <UploadIcon />
          <span className="font-medium text-gray-600">
            Drop pdf files to Attach, or{" "}
            <span className="text-blue-600 underline">browse {fileType}</span>
          </span>
        </span>
        <input
          type="file"
          name="file_upload"
          className="hidden"
          multiple
          accept={`.${fileType}`}
          onChange={handleFileChange}
        />
      </label>
    </>
  );
}
