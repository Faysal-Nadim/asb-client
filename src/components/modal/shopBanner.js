import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../../redux/helpers/axios";
import axios from "axios";
import { getShopSettings } from "../../redux/actions";
import { successToast } from "../../utils/toast";

export const ShopBannerModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [shopBanner, setShopBanner] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handlePreviewImg = async (e) => {
    const file = e.target.files[0];

    const { width, height } = await getImageDimensions(file);

    if (width === 1380 && height === 440) {
      setShopBanner(file);
      setPreviewImg(URL.createObjectURL(file));
    } else {
      console.log("Not 1380x440, need to crop");
    }
  };

  const getImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
        });
        URL.revokeObjectURL(objectUrl);
      };

      img.onerror = reject;
      img.src = objectUrl;
    });
  };

  const handleShopBannerUpload = async () => {
    if (!shopBanner) return;
    setUploading(true);
    try {
      const res = await axiosInstance.get(
        `/shop/services/get-presigned-url?fileName=${shopBanner.name}&contentType=${shopBanner.type}`,
      );

      const { uploadUrl, key, path } = res.data;

      await axios.put(uploadUrl, shopBanner, {
        headers: {
          "Content-Type": shopBanner.type,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });

      await axiosInstance.post("/shop/services/update-shop-banner", {
        key,
        path,
      });
      successToast("Shop banner updated successfully.");

      dispatch(getShopSettings());

      setUploading(false);
      onClose();

      setPreviewImg(null);
      setShopBanner(null);
    } catch (error) {
      console.error("Error uploading shop banner:", error);
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
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-3xl mx-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-2">Update Shop Banner</h2>
            <p className="text-sm text-red-600 ">
              Use a image with dimensions of 1380x440 pixels.
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Choose a new shop banner to upload. Supported formats are JPG,
              PNG, and GIF.
            </p>

            {/* Shop banner upload form goes here */}
            <div className="flex flex-col items-center">
              <label htmlFor="shopImage" className="cursor-pointer mb-4">
                {previewImg ? (
                  <img
                    src={previewImg}
                    alt="Preview"
                    className="lg:h-64 lg:w-[720px] md:h-48 md:w-[720px] sm:h-32 sm:w-[256px] rounded object-cover mb-4"
                  />
                ) : (
                  <div className="lg:h-64 lg:w-[720px] md:h-48 md:w-[720px] sm:h-32 sm:w-[256px] rounded bg-gray-200 flex items-center justify-center mb-4">
                    <span className="text-gray-500 text-6xl">+</span>
                  </div>
                )}
              </label>

              <input
                id="shopImage"
                type="file"
                accept="image/*"
                onChange={handlePreviewImg}
                className="hidden"
              />

              <button
                className="bg-[#2F5651] text-white px-8 py-2 rounded hover:bg-[#24443F] transition"
                onClick={() => {
                  handleShopBannerUpload();
                }}
                disabled={!shopBanner || uploading}
              >
                {uploading ? "Uploading..." : "Update Banner"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
