"use client"

import { createContext, useState } from "react";


type LoadingContextType = {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
};

export const LoadingContext = createContext<LoadingContextType | null>(
  null
);

const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
export default LoadingProvider;
