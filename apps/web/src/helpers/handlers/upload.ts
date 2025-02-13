/** @format */

import { api_url } from "../config"

export const uploadImage = async (formData: FormData) => {
  try {
    const res = await fetch(api_url + 'upload-image', {
      method: "POST",
      body: formData,
    })
    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}
