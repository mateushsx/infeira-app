import { useMemo } from 'react';
import type { Sale } from '@/types';
import {
  getSales,
  getSalesByDate,
  getSalesByDateRange,
} from '@/services/storage/sales';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import type { DateRange } from '@/types';

interface MostSoldProduct {
  name: string;
  quantity: number;
}

interface ReportData {
  allSales: Sale[];
  todaySales: Sale[];
  weekSales: Sale[];
  monthSales: Sale[];
  filteredSales: Sale[];
  todayTotal: number;
  weekTotal: number;
  monthTotal: number;
  filteredTotal: number;
  mostSoldProduct: MostSoldProduct | null;
}

export function useReportData(dateRange: DateRange): ReportData {
  const allSales = useMemo(() => getSales(), []);

  const todaySales = useMemo(() => {
    return getSalesByDate(new Date());
  }, []);

  const weekSales = useMemo(() => {
    const now = new Date();
    return getSalesByDateRange(startOfWeek(now), endOfWeek(now));
  }, []);

  const monthSales = useMemo(() => {
    const now = new Date();
    return getSalesByDateRange(startOfMonth(now), endOfMonth(now));
  }, []);

  const filteredSales = useMemo(() => {
    if (dateRange.from && dateRange.to) {
      return getSalesByDateRange(dateRange.from, dateRange.to);
    }
    return allSales;
  }, [dateRange, allSales]);

  const todayTotal = useMemo(
    () => todaySales.reduce((sum, sale) => sum + sale.total, 0),
    [todaySales]
  );

  const weekTotal = useMemo(
    () => weekSales.reduce((sum, sale) => sum + sale.total, 0),
    [weekSales]
  );

  const monthTotal = useMemo(
    () => monthSales.reduce((sum, sale) => sum + sale.total, 0),
    [monthSales]
  );

  const mostSoldProduct = useMemo(() => {
    const productCounts: Record<string, { name: string; quantity: number }> = {};

    allSales.forEach((sale) => {
      sale.items.forEach((item) => {
        if (!productCounts[item.productId]) {
          productCounts[item.productId] = {
            name: item.name,
            quantity: 0,
          };
        }
        productCounts[item.productId].quantity += item.quantity;
      });
    });

    const products = Object.values(productCounts);
    if (products.length === 0) return null;

    return products.reduce((max, product) =>
      product.quantity > max.quantity ? product : max
    );
  }, [allSales]);

  const filteredTotal = useMemo(
    () => filteredSales.reduce((sum, sale) => sum + sale.total, 0),
    [filteredSales]
  );

  return {
    allSales,
    todaySales,
    weekSales,
    monthSales,
    filteredSales,
    todayTotal,
    weekTotal,
    monthTotal,
    mostSoldProduct,
    filteredTotal,
  };
}

