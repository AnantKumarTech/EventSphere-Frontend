export { cn } from "cn";
import { format, parseISO, isValid } from "date-fns";

export function formatPrice(amount, currency = "INR") {
  const value = Number(amount);

  if (!value) return "Free";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatEventDate(dateInput) {
  if (!dateInput || typeof dateInput !== "string") return "Date TBD";

  const date = parseISO(dateInput);

  if (!isValid(date)) return "Date TBD";

  return format(date, "EEE, MMM dd, yyyy");
}
