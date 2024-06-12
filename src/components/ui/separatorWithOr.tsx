// SeparatorWithOr.tsx
import React from "react";

const SeparatorWithOr: React.FC = () => {
  return (
    <div className="flex items-center justify-center my-4">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 text-gray-500">OR</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};

export default SeparatorWithOr;
