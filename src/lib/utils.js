export { cn } from "cn";
import { format, parseISO, isValid, formatDistanceToNow } from "date-fns";

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
  if (!dateInput) return;

  const date = parseISO(dateInput);

  return format(date, "EEE, MMM dd, yyyy");
}

export function formatEventTimeRange(startDate, endDate) {
  if (!startDate || !endDate) return;
  const start = parseISO(startDate);
  const startTime = format(start, "h:m a");
  const end = parseISO(startDate);
  const endTime = format(end, "h:m a");
  return `${startTime}-${endTime}`;
}

export function getDayRemaing(startDate) {
  if (!startDate ) return;
  const start = parseISO(startDate);
  const currentDate=new Date();
  if(currentDate>start){
    return "Ended";
  }
return formatDistanceToNow(start,{addSuffix:true}); 

}