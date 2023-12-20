"use client";
import { FC } from "react";
import { SWRConfig } from "swr";

type SWRProviderProps = {
  children: React.ReactNode;
};

export const SWRProvider: FC<SWRProviderProps> = ({ children }) => {
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      throw error;
    }

    return res.json();
  };

  return (
    <SWRConfig
      value={{
        fetcher,
        errorRetryInterval: 5000,
      }}
    >
      {children}
    </SWRConfig>
  );
};
