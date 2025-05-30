import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "../utils/tailwindCss";
import { Key, LegacyRef } from "react";
import { ErrorHint } from "../pages/Appointments/components/ErrorHint";

interface InputProps {
  className?: string;
  formRegister?: UseFormRegisterReturn;
  key?: Key | null;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  defaultValue?: string | number | readonly string[] | undefined;
  _ref?: LegacyRef<HTMLInputElement>;
  disabled?: boolean;
  hasEmptyStyle?: boolean;
  max?: number;
  min?: number | string;
  error?: string;
  setTimeValue?: (value: string) => void;
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
  min,
  type = "text",
  disabled = false,
  hasEmptyStyle = false,
  error = ""
}) => {
  return (
    <>
      <input
        type={type}
        {...formRegister}
        className={cn(
          !hasEmptyStyle && defaultCalss,
          "bg-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          className,
          error ? errorClass : "",
          disabled ? disabledClass : ""
        )}
        min={min}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
      />
      {error && <ErrorHint>{error}</ErrorHint>}
    </>
  );
};
