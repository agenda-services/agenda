import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../components/Input";
import {
  useAppointments,
  useCreateAppointment,
  useUpdateAppointment
} from "../../../hooks/appointments";
import { CreateAppointment } from "../../../models/Appointment";
import { useEffect, useMemo } from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Color } from "../../../utils/tailwindCss";
import { Button } from "../../../components/Button";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { formatHour } from "../../../utils/dates";

type FormValues = {
  firstname: string;
  lastname: string;
  phone_number: string;
  country_code: string;
  date: string;
  hour: string;
};

const formSchema = Joi.object({
  firstname: Joi.string()
    .required()
    .messages({ "string.empty": "El nombre es necesario" }),
  lastname: Joi.string().optional().allow(""),
  country_code: Joi.string().required(),
  phone_number: Joi.string().optional().allow(""),
  date: Joi.string()
    .pattern(/^\d{4}-\d{1,2}-\d{1,2}$/)
    .required()
    .messages({
      "string.empty": "La fecha es necesaria",
      "string.pattern.base": "Esta no es una fecha valida (día/mes/año)"
    }),
  hour: Joi.string()
    .pattern(/^\d{1,2}:\d{1,2}$/)
    .required()
    .messages({
      "string.pattern.base": "Esta no es una hora valida"
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

export const AppointmentForm: React.FunctionComponent<AppointmentFormProps> = ({
  defaultFirstName,
  appointmentSelected,
  closeForm,
  getAppointments
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({ resolver: joiResolver(formSchema) });

  const {
    loading: loadingAppointment,
    error: errorAppointment,
    appointment
  } = useAppointments({
    useAppointmentsRequest: false,
    appointmentId: appointmentSelected
  });

  const {
    data: appointmentCreated,
    loading: createLoading,
    error: createError,
    createAppointment
  } = useCreateAppointment();

  const {
    data: appointmentUpdated,
    error: updateError,
    loading: updateLoading,
    updateAppointement
  } = useUpdateAppointment();

  const isRequestLoading = useMemo(
    () => createLoading || updateLoading || loadingAppointment,
    [createLoading, updateLoading, loadingAppointment]
  );

  const isInputDisable = useMemo(
    () => isRequestLoading || !!appointment,
    [isRequestLoading, appointment]
  );

  const personPhoneNumber = useMemo(
    () => appointment?.person.phone_number?.split(":")[1] || "",
    [appointment]
  );

  const inputClassName = "flex flex-col gap-2";
  const errorClassName = "p-4 bg-red-200 text-red-800 rounded-lg w-full";

  const now = new Date().toLocaleDateString("en-CA");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const [year, month, day] = data.date.split("-");

    const dateParsed = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );

    const dataAppointment: CreateAppointment = {
      firstname: data.firstname,
      lastname: data.lastname,
      date: dateParsed,
      phone_number: `${data.country_code}:${data.phone_number}`
    };

    if (data.hour) {
      const [hour, minutes] = data.hour.split(":");

      const hourParsed = parseInt(hour);
      const minutesParsed = parseInt(minutes);

      dataAppointment.date.setHours(hourParsed);
      dataAppointment.date.setMinutes(minutesParsed);
    }

    if (!appointment?.id) {
      createAppointment(dataAppointment);
      return;
    }

    updateAppointement(appointment?.id, {
      status: appointment.status,
      ...dataAppointment
    });
  };

  const getError = (name: keyof FormValues): string =>
    errors[name]?.message || "";

  useEffect(() => {
    if (appointmentCreated?.id) {
      closeForm();
      getAppointments();
    }
  }, [appointmentCreated, closeForm, getAppointments]);

  useEffect(() => {
    if (appointmentUpdated?.id) {
      closeForm();
      getAppointments();
    }
  }, [appointmentUpdated, closeForm, getAppointments]);

  useEffect(() => {
    if (!appointment) {
      return;
    }

    const dateParsed = appointment.date.toLocaleDateString("en-CA");
    const [country_code, number] = appointment.person.phone_number?.split(
      ":"
    ) || ["+57", ""];

    reset({
      firstname: appointment.person.firstname,
      lastname: appointment.person.lastname,
      country_code: country_code,
      phone_number: number,
      date: dateParsed,
      hour: formatHour(appointment.date, false)
    });
  }, [appointment, reset]);

  return (
    <>
      {isRequestLoading && <p>Cargando...</p>}
      {createError && <p className={errorClassName}>{createError}</p>}
      {updateError && <p className={errorClassName}>{updateError}</p>}
      {errorAppointment && <p className={errorClassName}>{errorAppointment}</p>}

      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="" className={inputClassName}>
          Nombres
          <Input
            defaultValue={defaultFirstName}
            formRegister={register("firstname")}
            disabled={isInputDisable}
            error={getError("firstname")}
          />
        </label>

        <label htmlFor="" className={inputClassName}>
          Apellidos
          <Input
            formRegister={register("lastname")}
            disabled={isInputDisable}
            error={getError("lastname")}
          />
        </label>

        <label htmlFor="" className={inputClassName}>
          Teléfono
          <fieldset className="grid grid-cols-[80px_1fr] gap-2">
            <Input
              defaultValue="+57"
              formRegister={register("country_code")}
              disabled={isInputDisable}
              error={getError("country_code")}
            />

            <Input
              defaultValue={personPhoneNumber}
              formRegister={register("phone_number")}
              disabled={isInputDisable}
              error={getError("phone_number")}
            />
          </fieldset>
        </label>

        <div className="flex flex-wrap gap-4">
          <label htmlFor="" className={inputClassName}>
            Día
            <Input
              type="date"
              defaultValue={appointment?.date.toLocaleDateString("en-CA")}
              min={now}
              className="min-w-[80px] max-w-[150px]"
              formRegister={register("date")}
              disabled={createLoading}
              error={getError("date")}
            />
          </label>

          <label htmlFor="" className={inputClassName}>
            Hora
            <Input
              type="time"
              defaultValue={
                formatHour(appointment?.date, false) ||
                formatHour(new Date(), false)
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg w-full h-full p-[10px] px-2 max-w-[200px]"
              formRegister={register("hour")}
              setTimeValue={(val) => setValue("hour", val)}
              disabled={createLoading}
              error={getError("hour")}
            />
          </label>
        </div>
        <div className="w-full flex gap-4 justify-end my-4">
          <Button
            disabled={isRequestLoading}
            color={Color.Error}
            icon={faClose}
            onClick={closeForm}
          >
            Cancelar
          </Button>

          <Button
            disabled={isRequestLoading}
            className="bg-primary-200 text-primary-600"
            type="submit"
            icon={faCheck}
          >
            Agendar
          </Button>
        </div>
      </form>
    </>
  );
};
