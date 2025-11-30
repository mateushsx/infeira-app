import { Routes, Route } from 'react-router-dom';
import { SalesListPage } from '@/pages/sales/components/SalesList';
import { CreateSalePage } from '@/pages/sales/components/CreateSalePage';
import { EditSalePage } from '@/pages/sales/components/EditSalePage';

export default function SalesPage() {
  return (
    <Routes>
      <Route index element={<SalesListPage />} />
      <Route path="new" element={<CreateSalePage />} />
      <Route path=":id" element={<EditSalePage />} />
    </Routes>
  );
}
