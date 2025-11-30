import { format, formatDistanceToNow, isToday, isYesterday, isThisWeek, isThisMonth } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "dd/MM/yyyy", { locale: ptBR });
}

export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
}

export function formatDateRelative(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  if (isToday(dateObj)) {
    return "Hoje";
  }
  if (isYesterday(dateObj)) {
    return "Ontem";
  }
  if (isThisWeek(dateObj)) {
    return formatDistanceToNow(dateObj, { addSuffix: true, locale: ptBR });
  }
  
  return formatDate(dateObj);
}

export function isDateToday(date: string | Date): boolean {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return isToday(dateObj);
}

export function isDateThisWeek(date: string | Date): boolean {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return isThisWeek(dateObj);
}

export function isDateThisMonth(date: string | Date): boolean {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return isThisMonth(dateObj);
}

