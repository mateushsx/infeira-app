import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Sale } from '@/types';
import { SaleCard } from '@/pages/sales/components/SaleCard';
import { Button } from '@/components/ui/button';
import { Plus, ShoppingCart } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSales } from '@/pages/sales/hooks/useSales';
import { If } from '@/components/common/If';

interface SalesListProps {
  sales: Sale[];
  onDelete: (id: string) => void;
}

function SalesListContent({ sales, onDelete }: SalesListProps) {
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    onDelete(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vendas</h1>
          <p className="text-lg text-muted-foreground">
            Gerencie suas vendas registradas
          </p>
        </div>
        <Button
          size="lg"
          onClick={() => navigate('/sales/new')}
          className="w-full sm:w-auto"
        >
          <Plus className="h-5 w-5 mr-2" />
          Registrar Venda
        </Button>
      </div>

      <If
        condition={sales.length === 0}
        elseRender={
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {sales.map((sale) => (
              <SaleCard
                key={sale.id}
                sale={sale}
                onEdit={(sale) => navigate(`/sales/${sale.id}`)}
                onDelete={(id) => setDeleteConfirm(id)}
              />
            ))}
          </div>
        }
      >
        <div className="text-center py-12 space-y-4">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground" />
          <p className="text-xl text-muted-foreground">
            Nenhuma venda registrada ainda
          </p>
          <Button onClick={() => navigate('/sales/new')}>
            <Plus className="h-5 w-5 mr-2" />
            Registrar Primeira Venda
          </Button>
        </div>
      </If>

      <Dialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir esta venda? Esta ação não pode ser
              desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            >
              Excluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function SalesListPage() {
  const { sales, handleDelete } = useSales();

  return <SalesListContent sales={sales} onDelete={handleDelete} />;
}
