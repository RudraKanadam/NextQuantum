import React, { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const FormContainer: React.FC<FormContainerProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="bg-white dark:bg-black p-6 rounded-xl shadow-md border">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        {title}
      </h2>
      {subtitle && (
        <p className="text-neutral-600 text-sm mt-2 dark:text-neutral-300">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
};

export default FormContainer;
