import axios from "axios";

export function DownloadRequest(data) {
  return axios
    .post("https://nyayanidhi.azurewebsites.net/output", data)
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
