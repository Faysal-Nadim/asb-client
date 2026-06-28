import axios from "axios";
import axiosInstance from "../redux/helpers/axios";

export const handleFileUpload = async (file, folder) => {
  if (!file) return;
  try {
    const res = await axiosInstance.get(
      `/public/utils/get-upload-url?fileName=${file.name}&contentType=${file.type}&folder=${folder}`,
    );

    const { uploadUrl, key, path } = res.data;

    await axios.put(uploadUrl, file, {
      headers: {
        "Content-Type": file.type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });

    return { key, path };
  } catch (error) {
    console.error("Error uploading profile image:", error);
  }
};
