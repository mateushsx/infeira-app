import { If } from '@/components/common/If';
import { SaleForm } from '@/pages/sales/components/SaleForm';
import { useSaleById } from '@/pages/sales/hooks/useSaleById';
import { updateSale } from '@/services/storage/sales';
import type { Sale } from '@/types';

export function EditSalePage() {
  const { sale, isLoading, saleId } = useSaleById();

  const handleSave = (saleData: Omit<Sale, 'id'>) => {
    if (saleId) {
      updateSale(saleId, saleData);
    }
  };

  return (
    <If condition={!isLoading && !!sale} elseRender={<div>Carregando...</div>}>
      {sale && <SaleForm sale={sale} onSave={handleSave} />}
    </If>
  );
}
