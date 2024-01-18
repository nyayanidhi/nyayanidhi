import PageCard from "@/components/PageCard";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { DownloadRequest } from "@/utils/requests/Output";
import Layout from "@/components/Layout";

export default function OutPutPage() {
  const { user } = useUser();
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    const apir2 = JSON.parse(localStorage.getItem("apir2"));
    const converse = localStorage.getItem("converse") === "true" ? true : false;
    const session_id = localStorage.getItem("session_id");
    const convo_key = localStorage.getItem("convo_key");
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
          <div
            className="flex justify-center items-center"
            style={{ minHeight: "calc(100vh - 140px)" }}
          >
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md"
              data-v0-t="card"
            >
              <div className="flex flex-col p-6 gap-4">
                <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                  Output
                </h3>
                <p className="text-sm text-muted-foreground">
                  {success
                    ? " The output of the files will be sent to your mail."
                    : "Failed to send download link"}
                </p>
              </div>
            </div>
          </div>
        </PageCard>
      </main>
    </Layout>
  );
}
