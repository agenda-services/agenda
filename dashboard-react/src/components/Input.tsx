import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "../utils/tailwindCss";
import { Key, LegacyRef, useState } from "react";

interface InputProps {
  className?: string;
  formRegister?: UseFormRegisterReturn;
  key?: Key | null;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  defaultValue?: string | number | readonly string[] | undefined;
  _ref?: LegacyRef<HTMLInputElement>;
  hasError?: boolean;
  disabled?: boolean;
  hasEmptyStyle?: boolean;
  max?: number;
}

const defaultCalss =
  "border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5 max-h-[50px]";

const errorClass =
  "border-red-400 focus:border-gray-300 focus:outline focus:outline-offset-1 focus:outline-2 focus:outline-red-500";

const disabledClass = "opacity-50";

export const Input: React.FunctionComponent<InputProps> = ({
  className,
  formRegister,
  placeholder,
  defaultValue,
  max,
  _ref,
  type = "text",
  hasError = false,
  disabled = false,
  hasEmptyStyle = false
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleCharLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value || "";
    if (inputValue === null || !max) {
      return;
    }

    if (inputValue.length > max) {
      e.target.value = value as string;
      return;
    }

    setValue(() => inputValue || "");
  };

  return (
    <input
      type={type}
      ref={_ref}
      {...formRegister}
      className={cn(
        !hasEmptyStyle && defaultCalss,
        "bg-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
        className,
        hasError ? errorClass : "",
        disabled ? disabledClass : ""
      )}
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={disabled}
      onChange={handleCharLimit}
    />
  );
};
