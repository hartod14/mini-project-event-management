"use client"

import * as React from "react";

export type LoadingContextType = {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
};

export const LoadingContext = React.createContext<LoadingContextType | null>(
  null
);

const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
export default LoadingProvider;
