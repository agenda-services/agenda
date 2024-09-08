export interface Appointment {
  appointment_id: string; // Prefijo AID seguido de un UUID sin guiones
  person_id: string; // Prefijo PID seguido de un UUID sin guiones
  date: string; // Fecha en formato ISO 8601
  service_id: string; // Prefijo SID seguido de un UUID sin guiones
  created_at: string;
  updated_at: string;
}
