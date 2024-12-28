import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { cn, Color } from "../utils/tailwindCss";

const colorOptions: Record<Color, string> = {
  [Color.Info]: "bg-blue-200 text-blue-600",
  [Color.Error]: "bg-red-200 text-red-600"
};

interface ButtonProps extends React.PropsWithChildren {
  icon?: IconProp;
  color?: Color;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  icon,
  color = Color.Info,
  type = "button",
  className,
  onClick
}) => {
  return (
    <button
      type={type}
      className={cn(
        className,
        colorOptions[color],
        "text-lg py-2 px-4 text-center rounded-lg font-semibold flex gap-2 items-center"
      )}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {children}
    </button>
  );
};
