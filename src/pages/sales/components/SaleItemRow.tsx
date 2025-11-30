import type { SaleItem } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface SaleItemRowProps {
  item: SaleItem;
  onRemove: () => void;
}

export function SaleItemRow({ item, onRemove }: SaleItemRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 border border-border rounded-lg">
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-base truncate">{item.name}</p>
        <p className="text-xs text-muted-foreground">
          {item.quantity}x {formatCurrency(item.price)} ={' '}
          {formatCurrency(item.subtotal)}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="text-destructive hover:text-destructive flex-shrink-0"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
