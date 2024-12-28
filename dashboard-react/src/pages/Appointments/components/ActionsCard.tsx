import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCalendarXmark,
  faClockRotateLeft
} from "@fortawesome/free-solid-svg-icons";

interface ActionsProps {
  reprogram: () => void;
  cancel: () => void;
  done: () => void;
}

export const ActionsCard: React.FunctionComponent<ActionsProps> = ({
  reprogram,
  cancel,
  done
}) => {
  const buttonClass = "flex flex-col gap-1 items-center justify-center";
  const iconClass = "w-[16px] h-[16px]";

  return (
    <div className="flex gap-2 text-[7px] items-center justify-self-end">
      <button className={buttonClass} onClick={reprogram}>
        <FontAwesomeIcon className={iconClass} icon={faClockRotateLeft} />
        <span>Reprogramar</span>
      </button>
      <button className={buttonClass} onClick={cancel}>
        <FontAwesomeIcon className={iconClass} icon={faCalendarXmark} />
        <span>Cancelar</span>
      </button>
      <button className={buttonClass} onClick={done}>
        <FontAwesomeIcon className={iconClass} icon={faCalendarCheck} />
        <span>Completar</span>
      </button>
    </div>
  );
};
