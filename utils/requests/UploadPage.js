import { headers } from "@/next.config";
import axios from "axios";

export function UploadRequest(formData) {
  return axios
    .post("https://nyayanidhi.azurewebsites.net/upload", formData)
    .then((response) => {
      if (response.status === 200) {
        return {
          success: true,
          message: "Upload successful",
          data: response.data,
        };
      } else {
        throw new Error("Upload failed");
      }
    })
    .catch((error) => {
      return {
        success: false,
        message: error.message,
      };
    });
}

export function ChooseRequest(data) {
  return axios
    .post("https://nyayanidhi.azurewebsites.net/choose", data)
    .then((response) => {
      if (response.status === 200) {
        return {
          success: true,
          message: "successful",
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
