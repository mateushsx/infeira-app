import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Sale } from '@/types';
import { getSale } from '@/services/storage/sales';

export function useSaleById() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sale, setSale] = useState<Sale | null>(() => {
    if (!id) return null;
    return getSale(id) || null;
  });
  const [isLoading, setIsLoading] = useState(() => !id);

  useEffect(() => {
    if (!id) {
      return;
    }

    const foundSale = getSale(id);
    if (foundSale) {
      setSale(foundSale);
      setIsLoading(false);
    } else {
      navigate('/sales');
    }
  }, [id, navigate]);

  return { sale, isLoading, saleId: id };
}

