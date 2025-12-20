import toast from "react-hot-toast";

export const errorToast = (message, id) => {
  toast.error(message, {
    style: {
      padding: "12px",
      color: "#000000",
    },
    iconTheme: {
      primary: "#CD0000",
      secondary: "#FFFAEE",
    },
    id,
  });
};

export const successToast = (message, id) => {
  toast.success(message, {
    style: {
      border: "1px solid #2F5651",
      padding: "12px",
      color: "#2F5651",
    },
    iconTheme: {
      primary: "#2F5651",
      secondary: "#FFFAEE",
    },
    id,
  });
};
