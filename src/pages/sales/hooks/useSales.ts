import { useState } from 'react';
import type { Sale } from '@/types';
import { getSales, deleteSale } from '@/services/storage/sales';

export function useSales() {
  const [sales, setSales] = useState<Sale[]>(() => {
    const allSales = getSales();
    return allSales.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  });

  const reloadSales = () => {
    const allSales = getSales();
    const sortedSales = allSales.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setSales(sortedSales);
  };

  const handleDelete = (id: string) => {
    deleteSale(id);
    reloadSales();
  };

  return {
    sales,
    reloadSales,
    handleDelete,
  };
}
