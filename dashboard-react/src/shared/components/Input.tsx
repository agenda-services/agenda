import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "../../utils/tailwindCss";
import { Key, LegacyRef } from "react";

interface InputProps {
  className?: string;
  formRegister?: UseFormRegisterReturn;
  key?: Key | null;
  placeholder?: string;
  defaultValue?: string | number | readonly string[];
  _ref?: LegacyRef<HTMLInputElement>;
  hasError?: boolean;
}

export const Input: React.FunctionComponent<InputProps> = ({
  className,
  formRegister,
  placeholder,
  defaultValue,
  _ref,
  hasError = false
}) => {
  const defaultCalss =
    "bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5 max-h-[50px]";

  const errorClass =
    "border-red-400 focus:border-gray-300 focus:outline focus:outline-offset-1 focus:outline-2 focus:outline-red-500";
  return (
    <input
      type="text"
      ref={_ref}
      {...formRegister}
      className={cn(defaultCalss, className, hasError ? errorClass : "")}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  );
};
