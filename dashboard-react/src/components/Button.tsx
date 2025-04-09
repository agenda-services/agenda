import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { cn, Color } from "../utils/tailwindCss";

const colorOptions: Record<Color, string> = {
  [Color.Info]: "bg-blue-200 text-blue-600",
  [Color.Error]: "bg-red-200 text-red-600",
  [Color.Primary]: "bg-primary-200 text-primary-600"
};

interface ButtonProps extends React.PropsWithChildren {
  icon?: IconProp;
  color?: Color;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  icon,
  color,
  type = "button",
  className,
  disabled,
  onClick
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        className,
        color ? colorOptions[color] : "",
        "text-lg py-2 px-4 text-center rounded-lg font-semibold flex gap-2 justify-center items-center",
        disabled ? "opacity-65" : "",
        className
      )}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {children}
    </button>
  );
};
