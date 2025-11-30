import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Sale, SaleItem } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SaleItemRow } from '@/pages/sales/components/SaleItemRow';
import { AddProductModal } from '@/pages/sales/components/AddProductModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface SaleFormProps {
  sale?: Sale | null;
  onSave: (sale: Omit<Sale, 'id'>) => void;
}

export function SaleForm({ sale, onSave }: SaleFormProps) {
  const navigate = useNavigate();

  const [clientName, setClientName] = useState(() => sale?.clientName || '');
  const [items, setItems] = useState<SaleItem[]>(() => sale?.items || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  const saleKey = sale?.id || 'new';

  const handleAddItem = (item: SaleItem) => {
    setItems([...items, item]);
    setError('');
    setIsModalOpen(false);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.subtotal, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      setError('Adicione pelo menos um produto à venda');
      return;
    }

    const saleData: Omit<Sale, 'id'> = {
      clientName: clientName.trim() || '',
      date: sale?.date || new Date().toISOString(),
      items,
      total: calculateTotal(),
    };

    onSave(saleData);
    navigate('/sales');
  };

  return (
    <div className="space-y-6 w-full" key={saleKey}>
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {sale ? 'Editar Venda' : 'Nova Venda'}
        </h1>
        <p className="text-lg text-muted-foreground">
          {sale ? 'Atualize os dados da venda' : 'Registre uma nova venda'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="clientName">Nome do cliente (opcional)</Label>
          <Input
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Ex: Maria"
          />
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Itens da Venda</CardTitle>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto"
              >
                <Plus className="h-5 w-5 mr-2" />
                Adicionar Produto
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>Nenhum produto adicionado ainda</p>
                <p className="text-sm">
                  Clique em "Adicionar Produto" para começar
                </p>
              </div>
            ) : (
              <>
                {items.map((item, index) => (
                  <SaleItemRow
                    key={index}
                    item={item}
                    onRemove={() => handleRemoveItem(index)}
                  />
                ))}
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-xl font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-primary whitespace-nowrap">
                      {formatCurrency(calculateTotal())}
                    </span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/sales')}
            className="flex-1 w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="flex-1 w-full sm:w-auto"
            disabled={items.length === 0}
          >
            {sale ? 'Salvar Alterações' : 'Finalizar Venda'}
          </Button>
        </div>
      </form>

      <AddProductModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddItem}
      />
    </div>
  );
}
