/**
 * Converte string de números (ex: "12345") para valor decimal (ex: 123.45)
 */
export function parseCurrencyString(value: string): number {
  if (!value || value === "") return 0;
  const numbers = value.replace(/\D/g, "");
  if (!numbers) return 0;
  return parseFloat(numbers) / 100;
}

/**
 * Converte valor decimal para string de números (ex: 123.45 -> "12345")
 */
export function formatCurrencyString(value: number): string {
  if (value === 0) return "";
  return Math.round(value * 100).toString();
}

