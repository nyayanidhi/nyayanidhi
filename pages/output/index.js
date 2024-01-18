import PageCard from "@/components/PageCard";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { DownloadRequest } from "@/utils/requests/Output";
import Layout from "@/components/Layout";

export default function OutPutPage() {
  const { user } = useUser();
  const [success, setSuccess] = useState(true);
  const apir2 = JSON.parse(localStorage.getItem("apir2"));
  const converse = localStorage.getItem("converse") === "true" ? true : false;
  const session_id = localStorage.getItem("session_id");
  const convo_key = localStorage.getItem("convo_key");

  useEffect(() => {
    const fetchOutput = async () => {
      const Mydata = {
        session_id: session_id,
        moreinfo_data: apir2,
        email_id: user.primaryEmailAddress.emailAddress,
        converse: converse,
      };
      if (converse) {
        Mydata.convo_key = convo_key;
      }

      const response = await DownloadRequest(Mydata);
      console.log(response);
      if (response.success) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
      localStorage.removeItem("apir2");
      localStorage.removeItem("session_id");
      localStorage.removeItem("converse");
      localStorage.removeItem("apir");
      localStorage.removeItem("init");
    };
    if (apir2 != null) {
      fetchOutput();
    } else {
      setSuccess(false);
    }
  }, []);
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
