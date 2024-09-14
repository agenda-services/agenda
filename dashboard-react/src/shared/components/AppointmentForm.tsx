import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./Input";
import { useCreateAppointment } from "../hooks/appointments";
import { CreateAppointment } from "../../models/Appointment";
import { PropsWithChildren, useEffect } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { cn } from "../../utils/tailwindCss";

type FormValues = {
  firstname: string;
  lastname: string;
  phone_number: string;
  country_code: string;
  date: string;
  hour: number;
  minutes: number;
};

const formSchema = Joi.object({
  firstname: Joi.string()
    .required()
    .messages({ "string.empty": "El nombre es necesario" }),
  lastname: Joi.string().optional().allow(""),
  country_code: Joi.string().required(),
  phone_number: Joi.string().optional().allow(""),
  date: Joi.string()
    .pattern(/^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/)
    .required()
    .messages({
      "string.empty": "La fecha es necesaria",
      "string.pattern.base": "Esta no es una fecha valida (año/mes/día)"
    }),
  hour: Joi.number().integer().min(0).max(12),
  minutes: Joi.number().integer().min(0).max(59)
});

interface AppointmentFormProps {
  closeForm: () => void;
  getAppointments: () => void;
  defaultFirstName: string;
}

interface ErrorHintProps extends PropsWithChildren {
  className?: string;
}
const ErrorHint: React.FunctionComponent<ErrorHintProps> = ({
  children,
  className
}) => (
  <small className={cn("text-xs text-red-400 break-words", className)}>
    {children}
  </small>
);

export const AppointmentForm: React.FunctionComponent<AppointmentFormProps> = ({
  defaultFirstName,
  closeForm,
  getAppointments
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: joiResolver(formSchema) });
  const {
    data: appointmentCreated,
    loading,
    error,
    createAppointment
  } = useCreateAppointment();

  const inputClassName = "flex flex-col gap-2";

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const dataAppointment: CreateAppointment = {
      firstname: data.firstname,
      lastname: data.lastname,
      date: new Date()
    };

    createAppointment(dataAppointment);
  };

  useEffect(() => {
    if (appointmentCreated?.id) {
      closeForm();
      getAppointments();
    }
  }, [appointmentCreated, closeForm]);

  return (
    <>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="" className={inputClassName}>
          Nombres
          <Input
            className=""
            defaultValue={defaultFirstName}
            formRegister={{ ...register("firstname") }}
            hasError={!!errors.firstname}
          />
          {errors.firstname && (
            <ErrorHint>{errors.firstname.message}</ErrorHint>
          )}
        </label>
        <label htmlFor="" className={inputClassName}>
          Apellidos
          <Input
            formRegister={register("lastname")}
            hasError={!!errors.lastname}
          />
          {errors.lastname && <ErrorHint>{errors.lastname.message}</ErrorHint>}
        </label>
        <label htmlFor="" className={inputClassName}>
          Teléfono
          <fieldset className="grid grid-cols-[80px_1fr] gap-2">
            <Input
              defaultValue="+57"
              formRegister={register("country_code")}
              hasError={!!errors.country_code}
            />
            <Input
              formRegister={register("phone_number")}
              hasError={!!errors.phone_number}
            />
          </fieldset>
          {errors.phone_number && (
            <ErrorHint>{errors.phone_number.message}</ErrorHint>
          )}
        </label>

        <div className="flex flex-wrap gap-4">
          <label htmlFor="" className={inputClassName}>
            Día
            <Input
              className="min-w-[150px] max-w-[220px]"
              formRegister={register("date")}
              hasError={!!errors.date}
            />
            {errors.date && (
              <ErrorHint className="min-w-[150px] max-w-[220px]">
                {errors.date.message}
              </ErrorHint>
            )}
          </label>
          <label htmlFor="" className={inputClassName}>
            Hora
            <fieldset className="grid grid-cols-[80px_80px] grid-rows-[50px_1fr] gap-1">
              <Input
                defaultValue={0}
                className="max-w-[60px]"
                formRegister={register("hour")}
                hasError={!!errors.hour}
              />
              <Input
                defaultValue={0}
                className="max-w-[60px]"
                formRegister={register("minutes")}
                hasError={!!errors.minutes}
              />
              {errors.hour && (
                <ErrorHint className="max-w-[60px]">
                  {errors.hour.message}
                </ErrorHint>
              )}
              {errors.minutes && (
                <ErrorHint className="max-w-[60px]">
                  {errors.minutes.message}
                </ErrorHint>
              )}
            </fieldset>
          </label>
        </div>
        <div className="w-full flex justify-end my-4">
          <button>Agendar</button>
        </div>
      </form>
    </>
  );
};
