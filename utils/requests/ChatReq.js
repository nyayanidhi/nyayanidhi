import axios from "axios";

export function ChatRequestInit(data) {
  return axios
    .post("https://nyayanidhi.azurewebsites.net/moreinfo", data)
    .then((response) => {
      if (response.status === 200) {
        return {
          success: true,
          message: "Successful",
          data: response.data,
        };
      }
    })
    .catch((error) => {
      return {
        success: false,
        message: error.message,
      };
    });
}
