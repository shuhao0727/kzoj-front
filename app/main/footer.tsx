"use client";

import { config } from "@/lib/config";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      <div className="flex justify-center space-x-4 items-center">
        {config.product} {config.version}
      </div>
    </footer>
  );
};
