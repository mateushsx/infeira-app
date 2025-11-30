import { formatCurrency } from "@/utils/formatCurrency";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Calendar, TrendingUp, Package } from "lucide-react";

interface ReportCardsProps {
  todayTotal: number;
  weekTotal: number;
  monthTotal: number;
  mostSoldProduct?: { name: string; quantity: number } | null;
}

export function ReportCards({
  todayTotal,
  weekTotal,
  monthTotal,
  mostSoldProduct,
}: ReportCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-semibold">Hoje</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(todayTotal)}</div>
          <p className="text-xs text-muted-foreground">Total vendido hoje</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-semibold">Esta Semana</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(weekTotal)}</div>
          <p className="text-xs text-muted-foreground">Total da semana</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-semibold">Este Mês</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(monthTotal)}</div>
          <p className="text-xs text-muted-foreground">Total do mês</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-semibold">Mais Vendido</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {mostSoldProduct ? (
            <>
              <div className="text-xl font-bold">{mostSoldProduct.name}</div>
              <p className="text-xs text-muted-foreground">
                {mostSoldProduct.quantity} vendas
              </p>
            </>
          ) : (
            <>
              <div className="text-xl font-bold text-muted-foreground">-</div>
              <p className="text-xs text-muted-foreground">Nenhum produto ainda</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

