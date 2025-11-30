import { useState } from 'react';
import type { DateRange } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';
import { ReportCards } from '@/pages/report/components/ReportCards';
import { DateRangePicker } from '@/pages/report/components/DateRangePicker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useReportData } from '@/pages/report/hooks/useReportData';
import { If } from '@/components/common/If';

export default function ReportPage() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const {
    todayTotal,
    weekTotal,
    monthTotal,
    mostSoldProduct,
    filteredSales,
    filteredTotal,
  } = useReportData(dateRange);

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Relatório</h1>
        <p className="text-base text-muted-foreground">
          Visualize suas vendas e estatísticas
        </p>
      </div>

      <ReportCards
        todayTotal={todayTotal}
        weekTotal={weekTotal}
        monthTotal={monthTotal}
        mostSoldProduct={mostSoldProduct}
      />

      <DateRangePicker dateRange={dateRange} onChange={setDateRange} />

      <If condition={!!(dateRange.from || dateRange.to)}>
        <Card>
          <CardHeader>
            <CardTitle>Total do Período Selecionado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(filteredTotal)}
            </div>
            <p className="text-xs text-muted-foreground">
              {filteredSales.length} venda(s) no período
            </p>
          </CardContent>
        </Card>
      </If>
    </div>
  );
}

