/** @format */

import { api_url } from "../config"
import { api } from "./apis/_api";
import { getAccessToken } from "./apis/auth";

// export const uploadImage = async (formData: FormData) => {
//   try {
//     const res = await fetch(api_url + 'upload-image', {
//       method: "POST",
//       body: formData,
//     })
//     if (!res.ok) {
//       throw new Error(`Error: ${res.status} - ${res.statusText}`);
//     }

//     return await res.json();
//   } catch (error) {
//     console.error("Upload failed:", error);
//     throw error;
//   }
// }

export const uploadImage = async (formData: FormData) => {
  try { // Retrieve the access token

    return await api(
      "/upload-image",
      "POST",
      {
        body: formData,
      }
    );

  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};
