import axios from "axios";

export function DownloadRequest(email_id, session_id, moreinfo_data, converse) {
  return axios
    .post("https://nyayanidhi.azurewebsites.net/output", {
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email: email_id,
        session_id: session_id,
        converse: converse,
        moreinfo_data: moreinfo_data,
      }),
    })
    .then((response) => {
      if (response.status === 200) {
        return {
          success: true,
          message: "Successful",
          data: response.data,
        };
      } else {
        throw new Error("Request failed");
      }
    })
    .catch((error) => {
      return {
        success: false,
        message: error.message,
      };
    });
}
