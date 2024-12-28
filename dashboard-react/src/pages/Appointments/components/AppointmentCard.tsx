import React, { useCallback, useState, type Key } from "react";
import { Appointment, AppointmentStatus } from "../../../models/Appointment";
import { cn } from "../../../utils/tailwindCss";
import { formatDate, formatHour } from "../../../utils/dates";
import { useUpdateAppointment } from "../../../hooks/appointments";
import { ActionsCard } from "./ActionsCard";
import {
  faCalendarDay,
  faSun,
  faTriangleExclamation,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AppointmentCardProps {
  appointment: Appointment;
  key?: Key | null | undefined;
  reprogram: (appointmentId: string) => void;
}

export const AppointmentCard: React.FunctionComponent<AppointmentCardProps> = ({
  appointment,
  reprogram
}) => {
  const { loading: loadingUpdate, updateAppointement } = useUpdateAppointment();

  const [action, setAction] = useState<AppointmentStatus>(appointment.status);
  const now = new Date();
  const isCurrentDate =
    now.getFullYear() === appointment.date.getFullYear() &&
    now.getMonth() === appointment.date.getMonth() &&
    now.getDate() === appointment.date.getDate();

  const isNextDate =
    now.getTime() < appointment.date.getTime() && !isCurrentDate;
  const isOldDate =
    now.getTime() > appointment.date.getTime() && !isCurrentDate;

  const nextDatesClass = "opacity-60 border-green-400";
  const oldDatesClass = "border-yellow-300";

  const getIcon = (): IconDefinition => {
    if (isOldDate) {
      return faTriangleExclamation;
    }

    if (isNextDate) {
      return faCalendarDay;
    }

    return faSun;
  };

  const diffInMs = now.getTime() - appointment.date.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  const getLabelToDays = useCallback(() => {
    const diffInDaysInteger = Math.floor(diffInDays);
    const plural = diffInDays === 1 ? "" : "s";

    if (diffInDays === -1) {
      return "Mañana";
    }

    if (diffInDays < 0) {
      if (diffInDays > -1) {
        return "Mañana";
      }

      return `Faltan ${Math.abs(diffInDaysInteger)} día${plural}`;
    }

    if (diffInDays > 1) {
      if (diffInDays < 2) {
        return "Ayer";
      }

      return `Hace ${diffInDaysInteger} día${plural}`;
    }

    return "Hoy";
  }, [diffInDays]);

  const addAnimationToCard = useCallback((appointmentId: string) => {
    const appointmentDom = document.getElementById(appointmentId);

    if (!appointmentDom) return;

    appointmentDom.classList.add("animate-slide-right");
    appointmentDom.classList.add("translate-x-[100%]");
    appointmentDom.classList.add("shadow-lg");

    setTimeout(async () => {
      appointmentDom.remove();
    }, 500);
  }, []);

  return (
    <article
      className={cn(
        "transition-all duration-[0.5s] ease-in-out grid grid-rows-2 grid-cols-[.8fr_1fr_1fr] items-center justify-items-center gap-4 w-full px-4 py-2 border border-gray-400 rounded-md",
        isNextDate ? nextDatesClass : "",
        isOldDate ? oldDatesClass : "",
        loadingUpdate ? "opacity-30" : "",
        action === AppointmentStatus.Done ? "bg-blue-400" : "",
        action === AppointmentStatus.Canceled ? "bg-red-400" : ""
      )}
    >
      {/* <FontAwesomeIcon icon={getIcon()} /> */}
      <span className="justify-self-start font-semibold text-xs">
        {formatHour(appointment.date)}
      </span>
      <span className="text-left w-full capitalize truncate">
        {appointment.person.firstname} {appointment.person.lastname}
      </span>
      <small className="w-full capitalize break-words text-[10px] text-end text-xs">
        {formatDate(appointment.date)}
      </small>

      <div className="w-full grid grid-cols-[25px_1fr_1fr] gap-2 col-span-3 items-center">
        <p className="flex items-center gap-3 text-xs col-span-2 font-semibold">
          <FontAwesomeIcon icon={getIcon()} />
          <span>{getLabelToDays()}</span>
        </p>
        <ActionsCard
          reprogram={() => reprogram(appointment.id)}
          cancel={async () => {
            try {
              await updateAppointement(appointment.id, {
                status: AppointmentStatus.Canceled
              });

              setAction(AppointmentStatus.Canceled);

              addAnimationToCard(appointment.id);
            } catch (error) {
              console.log(error);
            }
          }}
          done={async () => {
            try {
              await updateAppointement(appointment.id, {
                status: AppointmentStatus.Done
              });

              setAction(AppointmentStatus.Done);

              addAnimationToCard(appointment.id);
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </div>
    </article>
  );
};
