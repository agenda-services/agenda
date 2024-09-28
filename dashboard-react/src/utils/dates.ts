export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("es-ES", {
    weekday: "long", // Nombre completo del día (lunes, martes, etc.)
    day: "numeric", // Día del mes
    month: "long" // Nombre completo del mes (enero, febrero, etc.)
  }).format(date);
