export interface Person {
  person_id: string; // Prefijo PID seguido de un UUID sin guiones
  firstname: string; // Primer nombre de la persona
  lastname: string; // Apellido de la persona
  phone_number: string; // Número de teléfono de la persona
  created_at: string; // Fecha de creación en formato ISO 8601
  updated_at: string; // Fecha de actualización en formato ISO 8601
}
