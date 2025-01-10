export const formatDate = (date: Date | undefined) => {
  if (!date) return "";

  new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(date);
};

export const formatHour = (date: Date | undefined, hour12 = true) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12
  }).format(date);
};
