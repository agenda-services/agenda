import { UseFormRegisterReturn } from "react-hook-form";

interface SelectProps {
  options: string[];
  formRegister?: UseFormRegisterReturn;
}

export const Select: React.FunctionComponent<SelectProps> = ({
  options,
  formRegister
}) => {
  return (
    <select {...formRegister} className="rounded-xl px-4 py-2">
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
