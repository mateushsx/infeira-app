import type { Sale } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface SaleCardProps {
  sale: Sale;
  onEdit: (sale: Sale) => void;
  onDelete: (id: string) => void;
}

export function SaleCard({ sale, onEdit, onDelete }: SaleCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">
            {sale.clientName || 'Cliente não informado'}
          </CardTitle>
          <Badge variant="secondary">{formatCurrency(sale.total)}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{formatDate(sale.date)}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold">Itens:</p>
          <ul className="space-y-1">
            {sale.items.map((item, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                {item.quantity}x {item.name} - {formatCurrency(item.subtotal)}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(sale)}
            className="flex-1"
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(sale.id)}
            className="flex-1 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
