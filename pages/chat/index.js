import PageCard from "@/components/PageCard";
import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ChatRequestInit } from "@/utils/requests/ChatReq";

export default function ChatPage() {
  const [initFlag, setInitFlag] = useState(true);
  const [chatText, setChatText] = useState([]);
  const [historyPath, setHistoryPath] = useState("");
  const [contKey, setContKey] = useState(false);
  const [convo_key, setConvo_key] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const InitChat = async () => {
      const apir2 = JSON.parse(localStorage.getItem("apir2"));
      const Mydata = {
        session_id: localStorage.getItem("session_id"),
        convo_moreinfo_data: apir2,
        initial_call: true,
      };

      const response = await ChatRequestInit(Mydata);
      if (response.success) {
        if (response.data.ai_response !== chatText[chatText.length - 1]) {
          let temp = {
            response: response.data.ai_response,
            user: "ai",
          };

          setChatText((prev) => [...prev, temp]);
        }
        setHistoryPath(response.data.history_path);
        setContKey(response.data.continue);
        setInitFlag(false);
        if (response.data.convo_key !== null) {
          setConvo_key(response.data.convo_key);
        } else {
          setConvo_key(1);
        }
      } else {
        let temp = {
          response: "Failed to initialize chat",
          user: "ai",
        };
        setChatText((prev) => [...prev, temp]);
      }
      setIsLoading(false);
    };
    if (initFlag) {
      InitChat();
    }
  }, []);

  return (
    <main>
      <PageCard>
        <div
          className="flex flex-col h-full"
          style={{ minHeight: "calc(100vh - 145px)" }}
        >
          <div className="flex flex-col flex-1 overflow-y-auto p-4 space-y-4">
            {chatText.map((text, index) => {
              if (text.user === "ai") {
                return (
                  <div className="flex items-end space-x-2" key={index}>
                    <Avatar>
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div className="p-2 rounded-lg bg-blue-500 text-white max-w-xs">
                      <p className="text-sm">{text.response}</p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="flex items-end space-x-2 ml-auto" key={index}>
                    <div className="p-2 rounded-lg bg-gray-200 text-gray-900 max-w-xs">
                      <p className="text-sm">{text.response}</p>
                    </div>
                    <Avatar>
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </div>
                );
              }
            })}
            {isLoading && <div>Loading...</div>}
          </div>
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                className="flex-1"
                placeholder="Type your message here..."
              />
              <Button>Send</Button>
            </div>
          </div>
        </div>
      </PageCard>
    </main>
  );
}
