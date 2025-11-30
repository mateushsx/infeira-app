import type { Sale } from "@/types";
import { isAfter, isBefore, startOfDay, endOfDay, parseISO } from "date-fns";

const STORAGE_KEY = "infeira_sales";

export function getSales(): Sale[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as Sale[];
  } catch {
    return [];
  }
}

export function getSale(id: string): Sale | null {
  const sales = getSales();
  return sales.find((s) => s.id === id) || null;
}

export function createSale(sale: Omit<Sale, "id">): Sale {
  const sales = getSales();
  const newSale: Sale = {
    ...sale,
    id: crypto.randomUUID(),
  };
  sales.push(newSale);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
  return newSale;
}

export function updateSale(id: string, updates: Partial<Omit<Sale, "id">>): Sale | null {
  const sales = getSales();
  const index = sales.findIndex((s) => s.id === id);
  if (index === -1) return null;
  
  sales[index] = { ...sales[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
  return sales[index];
}

export function deleteSale(id: string): boolean {
  const sales = getSales();
  const filtered = sales.filter((s) => s.id !== id);
  if (filtered.length === sales.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

export function getSalesByDateRange(start: Date, end: Date): Sale[] {
  const sales = getSales();
  const startDay = startOfDay(start);
  const endDay = endOfDay(end);
  
  return sales.filter((sale) => {
    const saleDate = parseISO(sale.date);
    return (
      (isAfter(saleDate, startDay) || saleDate.getTime() === startDay.getTime()) &&
      (isBefore(saleDate, endDay) || saleDate.getTime() === endDay.getTime())
    );
  });
}

export function getSalesByDate(date: Date): Sale[] {
  return getSalesByDateRange(date, date);
}

