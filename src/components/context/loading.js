// context/PageLoadingContext.jsx
import { createContext, useContext, useState } from "react";

const PageLoadingContext = createContext(null);

export const PageLoadingProvider = ({ children }) => {
  const [pageLoading, setPageLoading] = useState(false);

  return (
    <PageLoadingContext.Provider value={{ pageLoading, setPageLoading }}>
      {children}
    </PageLoadingContext.Provider>
  );
};

export const usePageLoading = () => {
  const ctx = useContext(PageLoadingContext);
  if (!ctx) throw new Error("usePageLoading must be used inside provider");
  return ctx;
};
