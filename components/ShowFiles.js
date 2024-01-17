import { InputFileTypes } from "@/utils/constants";

export default function ShowFiles({ files, setFiles }) {
  const handleSelectChange = (e, index) => {
    const newFileObjects = [...files];
    newFileObjects[index].option = e.target.value;
    setFiles(newFileObjects);
  };
  return (
    <>
      <div className="text-3xl font-semibold text-gray-800 mb-4">
        Your documents
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
          <span className="font-semibold">Currently nothing is uploaded</span>
        )}
      </div>
    </>
  );
}
