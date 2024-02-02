import { useEffect, useState } from "react";
import axios from "axios";

export default function CheckUser(user) {
  const [iLoading, setILoading] = useState(true);
  const [errorD, setErrorD] = useState({
    fail: false,
    message: "",
  });
  const [response, setResponse] = useState({
    success: false,
    message: "",
    data: null,
  });

  useEffect(() => {
    const checkNewUser = async () => {
      await axios
        .post(
          "https://nyayanidhi.azurewebsites.net/newuser",
          JSON.stringify({ email_id: user.primaryEmailAddress.emailAddress }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setResponse({
              success: true,
              message: "Successful",
              data: response.data,
            });
          } else {
            throw new Error("Request failed");
          }
        })
        .catch((error) => {
          setErrorD({
            fail: true,
            message: error.message,
            error: error.status,
          });
        })
        .finally(() => {
          setILoading(false);
        });
    };
    if (user) {
      checkNewUser();
    }
  }, []);

  return { iLoading, errorD, response };
}
