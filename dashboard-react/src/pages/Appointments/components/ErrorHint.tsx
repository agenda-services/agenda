import { PropsWithChildren } from "react";
import { cn } from "../../../utils/tailwindCss";

interface ErrorHintProps extends PropsWithChildren {
  className?: string;
}

export const ErrorHint: React.FunctionComponent<ErrorHintProps> = ({
  children,
  className
}) => (
  <small className={cn("text-xs text-red-400 break-words", className)}>
    {children}
  </small>
);
