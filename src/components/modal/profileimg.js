import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../../redux/helpers/axios";
import { getUserByToken } from "../../redux/actions";
import { successToast } from "../../utils/toast";
import { handleFileUpload } from "../../utils/upload";

export const ProfileImgModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [profileImg, setProfileImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handlePreviewImg = (e) => {
    const file = e.target.files[0];
    setProfileImg(file);
    setPreviewImg(URL.createObjectURL(file));
  };

  const handleProfileImgUpload = async () => {
    if (!profileImg) return;
    setUploading(true);
    try {
      const { key, path } = await handleFileUpload(profileImg, "user");

      await axiosInstance.post("/user/services/update-profile-image", {
        key,
        path,
      });
      successToast("Profile image updated successfully.");

      dispatch(getUserByToken());

      setUploading(false);
      onClose();

      setPreviewImg(null);
      setProfileImg(null);
    } catch (error) {
      console.error("Error uploading profile image:", error);
    } finally {
      setUploading(false);
    }
  };

  // Close when pressing ESC
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Update Profile Image</h2>
            <p className="text-sm text-gray-600 mb-6">
              Choose a new profile image to upload. Supported formats are JPG,
              PNG, and GIF.
            </p>
            {/* Profile image upload form goes here */}
            <div className="flex flex-col items-center">
              <label htmlFor="profileImage" className="cursor-pointer mb-4">
                {previewImg ? (
                  <img
                    src={previewImg}
                    alt="Preview"
                    className="lg:h-64 lg:w-64 md:h-48 md:w-48 sm:h-32 sm:w-32 rounded-full object-cover mb-4"
                  />
                ) : (
                  <div className="lg:h-64 lg:w-64 md:h-48 md:w-48 sm:h-32 sm:w-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <span className="text-gray-500 text-6xl">+</span>
                  </div>
                )}
              </label>

              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handlePreviewImg}
                className="hidden"
              />

              <button
                className="bg-[#2F5651] text-white px-8 py-2 rounded hover:bg-[#24443F] transition"
                onClick={() => {
                  handleProfileImgUpload();
                }}
                disabled={!profileImg || uploading}
              >
                {uploading ? "Uploading..." : "Update Image"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
