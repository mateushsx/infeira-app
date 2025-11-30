import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "@/services/storage/user";
import { getProducts } from "@/services/storage/products";
import { getSales, getSalesByDate } from "@/services/storage/sales";
import { formatCurrency } from "@/utils/formatCurrency";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, DollarSign, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user] = useState(getUser());
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalToday: 0,
  });

  useEffect(() => {
    const products = getProducts();
    const sales = getSales();
    const todaySales = getSalesByDate(new Date());
    
    const totalToday = todaySales.reduce((sum, sale) => sum + sale.total, 0);

    setStats({
      totalProducts: products.length,
      totalSales: sales.length,
      totalToday,
    });
  }, []);

  return (
    <div className="space-y-8 w-full">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Olá, {user?.name || "Feirante"}!
        </h1>
        <p className="text-lg text-muted-foreground">
          Bem-vindo ao seu painel de controle
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Produtos</CardTitle>
            <Package className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalProducts}</div>
            <p className="text-sm text-muted-foreground">
              produtos cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Vendas</CardTitle>
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalSales}</div>
            <p className="text-sm text-muted-foreground">
              vendas realizadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Hoje</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(stats.totalToday)}
            </div>
            <p className="text-sm text-muted-foreground">
              vendido hoje
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Button
          size="lg"
          variant="default"
          className="w-full h-20 flex-col gap-2"
          onClick={() => navigate("/products")}
        >
          <Package className="h-6 w-6" />
          <span>Produtos</span>
          <ArrowRight className="h-4 w-4" />
        </Button>

        <Button
          size="lg"
          variant="secondary"
          className="w-full h-20 flex-col gap-2"
          onClick={() => navigate("/sales")}
        >
          <ShoppingCart className="h-6 w-6" />
          <span>Vendas</span>
          <ArrowRight className="h-4 w-4" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-full h-20 flex-col gap-2"
          onClick={() => navigate("/report")}
        >
          <DollarSign className="h-6 w-6" />
          <span>Relatório</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

