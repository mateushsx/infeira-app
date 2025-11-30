export type ProductUnit = 
  | "Kg"
  | "Grama"
  | "Pacote"
  | "Dúzia"
  | "Unidade"
  | "Litro"
  | "Maço"
  | string; // Permite outras unidades

export interface User {
  name: string;
  completedOnboarding: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: ProductUnit;
  notes?: string;
  createdAt: string;
}

export interface SaleItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Sale {
  id: string;
  clientName: string;
  date: string;
  items: SaleItem[];
  total: number;
}

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

