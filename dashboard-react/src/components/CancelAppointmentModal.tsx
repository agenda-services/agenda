import { Button } from "./Button";
import { Color } from "../utils/tailwindCss";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { formatDate, formatHour } from "../utils/dates";

interface CancelAppointmentModalProps {
  handleModalClose: () => void
  confirmAppointmentCancellation: () => void
  personName: string
  date: Date
}

export const CancelAppointmentModal: React.FunctionComponent<CancelAppointmentModalProps> = ({ handleModalClose, confirmAppointmentCancellation, personName, date }) => {


  return (
    <div data-testid="cancelAppointmentModal" className="flex flex-col items-center justify-between gap-4">
      <h1 className="text-center">{`¿Estas seguro de querer cancelar la reserva de ${personName} para el ${formatDate(date)} a las ${formatHour(date)}?`}</h1>
      <div className="flex justify-between gap-4">
        <Button
          data-testid="cancelButton"
          color={Color.Error}
          icon={faClose}
          onClick={handleModalClose}
        >Cancelar
        </Button>
        <Button
          data-testid="confirmButton"
          className="bg-primary-200 text-primary-600"
          type="submit"
          icon={faCheck}
          onClick={confirmAppointmentCancellation}>
          Confirmar
        </Button>
      </div>
    </div>
  )
}

