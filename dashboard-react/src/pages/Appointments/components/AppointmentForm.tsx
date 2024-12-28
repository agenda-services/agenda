import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../components/Input";
import {
  useAppointments,
  useCreateAppointment
} from "../../../hooks/appointments";
import { CreateAppointment } from "../../../models/Appointment";
import { PropsWithChildren, useEffect } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { cn, Color } from "../../../utils/tailwindCss";
import { Button } from "../../../components/Button";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { Select } from "../../../components/Select";

type FormValues = {
  firstname: string;
  lastname: string;
  phone_number: string;
  country_code: string;
  date: string;
  hour: number;
  minutes: number;
  time: string;
};

const formSchema = Joi.object({
  firstname: Joi.string()
    .required()
    .messages({ "string.empty": "El nombre es necesario" }),
  lastname: Joi.string().optional().allow(""),
  country_code: Joi.string().required(),
  phone_number: Joi.string().optional().allow(""),
  date: Joi.string()
    .pattern(/^\d{1,2}\/\d{1,2}\/\d{4}$/)
    .required()
    .messages({
      "string.empty": "La fecha es necesaria",
      "string.pattern.base": "Esta no es una fecha valida (día/mes/año)"
    }),
  hour: Joi.number().integer().min(0).max(12).messages({
    "number.max": "La hora no puede ser mayor a 12"
  }),
  minutes: Joi.number().integer().min(0).max(59),
  time: Joi.string()
});

interface AppointmentFormProps {
  closeForm: () => void;
  getAppointments: () => void;
  defaultFirstName: string;
  appointmentSelected: string;
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
  appointmentSelected,
  closeForm,
  getAppointments
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: joiResolver(formSchema) });

  const {
    loading: loadingAppointment,
    error: errorAppointment,
    appointment
  } = useAppointments(appointmentSelected);

  const {
    data: appointmentCreated,
    loading,
    error,
    createAppointment
  } = useCreateAppointment();

  const isInputDisable = loading || loadingAppointment || !!appointment;

  const inputClassName = "flex flex-col gap-2";

  const now = new Date().toLocaleDateString();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const [day, month, year] = data.date.split("/");

    const dateParsed = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );
    const dataAppointment: CreateAppointment = {
      firstname: data.firstname,
      lastname: data.lastname,
      date: dateParsed
    };

    if (data.hour) {
      if (data.time === "p.m.") {
        data.hour += 12;
      }

      dataAppointment.date.setHours(data.hour);
    }

    if (data.minutes) {
      dataAppointment.date.setMinutes(data.minutes);
    }

    createAppointment(dataAppointment);
  };

  useEffect(() => {
    if (appointmentCreated?.id) {
      closeForm();
      getAppointments();
    }
  }, [appointmentCreated, closeForm, getAppointments]);

  return (
    <>
      {(loading || loadingAppointment) && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {errorAppointment && <p>{errorAppointment}</p>}
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="" className={inputClassName}>
          Nombres
          <Input
            defaultValue={defaultFirstName || appointment?.person.firstname}
            formRegister={{ ...register("firstname") }}
            hasError={!!errors.firstname}
            disabled={isInputDisable}
          />
          {errors.firstname && (
            <ErrorHint>{errors.firstname.message}</ErrorHint>
          )}
        </label>
        <label htmlFor="" className={inputClassName}>
          Apellidos
          <Input
            defaultValue={appointment?.person.lastname}
            formRegister={register("lastname")}
            hasError={!!errors.lastname}
            disabled={isInputDisable}
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
              disabled={isInputDisable}
            />
            <Input
              defaultValue={appointment?.person.phone_number}
              formRegister={register("phone_number")}
              hasError={!!errors.phone_number}
              disabled={isInputDisable}
            />
          </fieldset>
          {errors.phone_number && (
            <ErrorHint>{errors.phone_number.message}</ErrorHint>
          )}
        </label>

        <div className="flex flex-wrap gap-4">
          <label htmlFor="" className={inputClassName}>
            Día
            {appointment?.date && (
              <Input
                defaultValue={appointment?.date.toLocaleDateString()}
                className="min-w-[80px] max-w-[150px]"
                formRegister={register("date")}
                hasError={!!errors.date}
                disabled={loading}
              />
            )}
            {!appointment?.date && (
              <Input
                defaultValue={appointment?.date.toLocaleDateString() || now}
                className="min-w-[80px] max-w-[150px]"
                formRegister={register("date")}
                hasError={!!errors.date}
                disabled={loading}
              />
            )}
            {errors.date && (
              <ErrorHint className="min-w-[150px] max-w-[220px]">
                {errors.date.message}
              </ErrorHint>
            )}
          </label>
          <label htmlFor="" className={inputClassName}>
            Hora
            <fieldset className="flex gap-1 items-center bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg w-full p-[3.5px] px-2 max-h-[50px] max-w-[200px]">
              <Input
                defaultValue={
                  appointment?.date ? appointment.date.getHours() : 0
                }
                type="number"
                max={2}
                hasEmptyStyle
                className="w-full px-1 rounded-sm"
                formRegister={register("hour")}
                hasError={!!errors.hour}
                disabled={loading}
              />
              :
              <Input
                defaultValue={
                  appointment?.date ? appointment.date.getMinutes() : 0
                }
                type="number"
                max={2}
                hasEmptyStyle
                className="w-full px-1 rounded-sm"
                formRegister={register("minutes")}
                hasError={!!errors.minutes}
                disabled={loading}
              />
              <Select
                formRegister={register("time")}
                options={["a.m.", "p.m."]}
              />
            </fieldset>
            <div>
              {errors.hour && <ErrorHint>{errors.hour.message}</ErrorHint>}
              {errors.minutes && (
                <ErrorHint>{errors.minutes.message}</ErrorHint>
              )}
            </div>
          </label>
        </div>
        <div className="w-full flex gap-4 justify-end my-4">
          <Button color={Color.Error} icon={faClose} onClick={closeForm}>
            Cancelar
          </Button>
          <Button type="submit" icon={faCheck}>
            Agendar
          </Button>
        </div>
      </form>
    </>
  );
};
