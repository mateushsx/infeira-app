import { SaleForm } from '@/pages/sales/components/SaleForm';
import { createSale } from '@/services/storage/sales';
import type { Sale } from '@/types';

export function CreateSalePage() {
  const handleSave = (saleData: Omit<Sale, 'id'>) => {
    createSale(saleData);
  };

  return <SaleForm onSave={handleSave} />;
}
