import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { cn, Color } from "../utils/tailwindCss";
import { dateMonth } from "../utils/dates";
import { Appointment, AppointmentStatus } from "../models/Appointment";
import { Modal } from "./Modal";
import { Input } from "./Input";
import Joi from "joi";
import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button } from "./Button";

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


type FormValues = {
  fullname: string;
  phone_number: string;
};

const formSchema = Joi.object({
  fullname: Joi.string()
    .required()
    .messages({ "string.empty": "El nombre es necesario" }),
  phone_number: Joi.string().optional().allow(""),
});


interface CalendarProps {
  initialDate?: Date;
}

export const Calendar: FunctionComponent<CalendarProps> = ({ initialDate }) => {
  const [date, setDate] = useState(initialDate || now);
  const [days, setDays] = useState(0);
  const [offsetDays, setOffsetDays] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStep, setFormStep] = useState(1);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    reset,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({ resolver: joiResolver(formSchema) });


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

  const getError = (name: keyof FormValues): string =>
    errors[name]?.message || "";

  const onSubmit: SubmitHandler<FormValues> = async (data) => { console.log(data) }

  useEffect(() => {
    setDays(getDays(date.getMonth(), date.getFullYear()));
    setOffsetDays(getOffsetDays(date.getMonth(), date.getFullYear()));
  }, []);

  const handleNext = () => {
    const fullname = getValues("fullname");
    if (!fullname) {
      setError("fullname", {
        type: "manual",
        message: "El nombre es necesario"
      });

      return;
    }

    setFormStep(2);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormStep(1);
  };

  return (
    <div
      data-testid="calendar"
      className="flex flex-col h-[100dvh] max-h-[650px] max-w-[1080px] mx-auto text-center relative"
    >
      <div className="grid grid-cols-3 gap-2 justify-center capitalize my-5">
        <button onClick={() => changeMonth(-1)}>{"<"}</button>
        {dateMonth(date)}
        <button onClick={() => changeMonth(1)}>{">"}</button>
      </div>
      <section className="grid grid-cols-7 gap-[2px] bg-white mb-[1px] shadow-md">
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
            onClick={() => setIsModalOpen(true)}
            className={cn(
              "relative flex flex-col justify-start items-center gap-1 text-sm w-full h-full border-t-[1px] border-primary-400 p-1 cursor-pointer hover:opacity-20 hover:bg-primary-100 transition-all duration-50",
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
            <ul className="flex flex-col items-start gap-1 h-full overflow-hidden">
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
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <h2 className="text-2xl font-semibold text-center text-primary-600">Excelente elección!</h2>
        <img className="w-full h-40 object-contain" src="/appointment-request.png" alt="appointment request" />

        <form
          className="py-2 w-full h-full flex gap-4 overflow-hidden relative"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={cn(
            "px-4 flex flex-col gap-2 transition-transform duration-300 w-full",
            formStep === 2 ? "absolute -translate-x-full" : "translate-x-0"
          )}>
            <label className="flex flex-col gap-2">
              Tu nombre porfavor
              <Input formRegister={register("fullname")} error={getError("fullname")} />
            </label>
            <Button className="text-center" color={Color.Primary} onClick={handleNext}>
              Siguiente
            </Button>
          </div>

          <div className={cn(
            "px-4 flex flex-col gap-2 transition-transform duration-300 w-full",
            formStep === 1 ? "absolute translate-x-full" : "translate-x-0"
          )}>
            <label className="flex flex-col gap-2">
              Celular
              <Input formRegister={register("phone_number")} error={getError("phone_number")} />
            </label>
            <Button type="submit" color={Color.Primary}>
              Enviar
            </Button>
          </div>
        </form>
      </Modal>
    </div >
  );
};
