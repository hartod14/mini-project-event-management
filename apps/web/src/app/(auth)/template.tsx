/** @format */

import Image from "next/image";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function template({ children }: Props) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {children}
    </div>
  );
}
