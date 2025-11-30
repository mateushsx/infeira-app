import type { ProductUnit } from "@/types";

export const PRODUCT_UNITS: ProductUnit[] = [
  "Kg",
  "Grama",
  "Pacote",
  "Dúzia",
  "Unidade",
  "Litro",
  "Maço",
];

export const UNIT_MASKS: Record<string, string> = {
  "Kg": "kg",
  "Grama": "g",
  "Pacote": "pacote",
  "Dúzia": "dúzia",
  "Unidade": "un",
  "Litro": "L",
  "Maço": "maço",
};

export function formatUnit(unit: ProductUnit, quantity: number = 1): string {
  const mask = UNIT_MASKS[unit] || unit;
  return `${quantity} ${mask}${quantity > 1 && unit !== "Kg" && unit !== "Litro" ? "s" : ""}`;
}

