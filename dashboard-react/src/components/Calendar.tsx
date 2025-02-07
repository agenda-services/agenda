import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { cn } from "../utils/tailwindCss";
import { dateMonth } from "../utils/dates";
import { Appointment, AppointmentStatus } from "../models/Appointment";

const dayLabels = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado"
];

const dayLetterLabels = ["D", "L", "M", "M", "J", "V", "S"];

const now = new Date();

const widthMobile = 420;

const mockAppointments: Appointment[] = [
  {
    date: new Date(),
    id: "AID123",
    created_at: new Date(),
    updated_at: new Date(),
    service_id: "",
    status: AppointmentStatus.Active,
    person: {
      id: "PID123",
      firstname: "Juan",
      lastname: "ramirez",
      phone_number: "",
      created_at: new Date(),
      updated_at: new Date()
    }
  },
  {
    date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2),
    id: "AIDdd3",
    created_at: new Date(),
    updated_at: new Date(),
    service_id: "",
    status: AppointmentStatus.Active,
    person: {
      id: "PID123",
      firstname: "Lautaro",
      lastname: "ramirez",
      phone_number: "",
      created_at: new Date(),
      updated_at: new Date()
    }
  },
  {
    date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2),
    id: "AIDlio2",
    created_at: new Date(),
    updated_at: new Date(),
    service_id: "",
    status: AppointmentStatus.Active,
    person: {
      id: "PID123",
      firstname: "Esteban",
      lastname: "ramirez",
      phone_number: "",
      created_at: new Date(),
      updated_at: new Date()
    }
  },
  {
    date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8),
    id: "AIDpp3m",
    created_at: new Date(),
    updated_at: new Date(),
    service_id: "",
    status: AppointmentStatus.Active,
    person: {
      id: "PID123",
      firstname: "Aldulfo",
      lastname: "ramirez",
      phone_number: "",
      created_at: new Date(),
      updated_at: new Date()
    }
  },
  {
    date: new Date(),
    id: "AIDee2",
    created_at: new Date(),
    updated_at: new Date(),
    service_id: "",
    status: AppointmentStatus.Active,
    person: {
      id: "PID123",
      firstname: "Camilo",
      lastname: "ramirez",
      phone_number: "",
      created_at: new Date(),
      updated_at: new Date()
    }
  }
];

interface CalendarProps {
  initialDate?: Date;
}

export const Calendar: FunctionComponent<CalendarProps> = ({ initialDate }) => {
  const [date, setDate] = useState(initialDate || now);
  const [days, setDays] = useState(0);
  const [offsetDays, setOffsetDays] = useState(0);

  const offsetDaysMemo = useMemo(
    () => Array.from(Array(offsetDays).keys()),
    [offsetDays]
  );

  const daysMemo = useMemo(() => Array.from(Array(days).keys()), [days]);

  const isValidDate = useCallback((day: number) => {
    return new Date() < new Date(date.getFullYear(), date.getMonth(), day + 1);
  }, []);

  const getDays = useCallback(
    (month: number, year: number) =>
      new Date(month - 1 < 0 ? year - 1 : year, month + 1, 0).getDate(),
    []
  );

  const getOffsetDays = useCallback(
    (month: number, year: number) =>
      new Date(month - 1 < 0 ? year - 1 : year, month, 1).getDay(),
    []
  );

  const changeMonth = useCallback(
    (ammount: number) => {
      setDate((prev: Date) => {
        prev.setMonth(prev.getMonth() + ammount);

        setDays(getDays(prev.getMonth(), date.getFullYear()));
        setOffsetDays(getOffsetDays(prev.getMonth(), date.getFullYear()));

        return prev;
      });
    },
    [date, setDays, setOffsetDays]
  );

  const filterAppointmentDay = (date: Date): Appointment[] => {
    return mockAppointments.filter(
      (appointment) =>
        appointment.date.toLocaleDateString() === date.toLocaleDateString()
    );
  };

  useEffect(() => {
    setDays(getDays(date.getMonth(), date.getFullYear()));
    setOffsetDays(getOffsetDays(date.getMonth(), date.getFullYear()));
  }, []);

  return (
    <div
      data-testid="calendar"
      className="flex flex-col h-[100dvh] max-h-[550px] text-center relative"
    >
      <div className="grid grid-cols-3 gap-2 justify-center capitalize my-5">
        <button onClick={() => changeMonth(-1)}>{"<"}</button>
        {dateMonth(date)}
        <button onClick={() => changeMonth(1)}>{">"}</button>
      </div>
      <section className="grid grid-cols-7 gap-[2px] sticky top-0 bg-white mb-[1px] shadow-md z-10">
        {(window.innerWidth <= widthMobile ? dayLetterLabels : dayLabels).map(
          (date, i) => (
            <span
              data-testid="day"
              key={`day-date-${i}`}
              className="w-full h-full border-t-[1px] border-primary-400"
            >
              {date}
            </span>
          )
        )}
      </section>
      <section className="grid grid-cols-7 h-full gap-[2px]">
        {offsetDaysMemo.map((_, i) => (
          <span key={`empty-${i}`} className="w-full h-full"></span>
        ))}
        {daysMemo.map((day) => (
          <button
            data-testid="date"
            key={`date-${day}`}
            disabled={!isValidDate(day + 1)}
            className={cn(
              "flex flex-col justify-start items-center gap-1 text-sm w-full h-full border-t-[1px] border-primary-400 p-1",
              !isValidDate(day + 1) ? "opacity-60 bg-slate-200" : ""
            )}
          >
            <span
              className={cn(
                "w-[30px] h-[30px] text-center grid place-content-center",
                new Date().toLocaleDateString() ===
                  new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    day + 1
                  ).toLocaleDateString()
                  ? "bg-primary-600 text-white rounded-full"
                  : ""
              )}
            >
              {day + 1}
            </span>
            <ul className="flex flex-col items-start gap-1">
              {filterAppointmentDay(
                new Date(date.getFullYear(), date.getMonth(), day + 1)
              ).map((appointment: Appointment) => (
                <li
                  key={appointment.id}
                  className="bg-primary-200 rounded-lg text-xs px-1"
                >
                  {appointment.person.firstname}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </section>
    </div>
  );
};
