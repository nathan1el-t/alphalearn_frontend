const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "UTC",
});

export function formatShortDate(date: string | number | Date) {
  return shortDateFormatter.format(new Date(date));
}

export function formatDateTime(date: string | number | Date) {
  return dateTimeFormatter.format(new Date(date));
}
