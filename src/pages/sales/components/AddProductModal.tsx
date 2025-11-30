import { useState } from 'react';
import type { SaleItem } from '@/types';
import { getProducts } from '@/services/storage/products';
import { formatCurrency } from '@/utils/formatCurrency';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (item: SaleItem) => void;
}

export function AddProductModal({
  open,
  onClose,
  onAdd,
}: AddProductModalProps) {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [error, setError] = useState('');

  const products = getProducts();
  const selectedProduct = products.find((p) => p.id === selectedProductId);

  const resetForm = () => {
    setSelectedProductId('');
    setQuantity('1');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProductId) {
      setError('Selecione um produto');
      return;
    }

    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) {
      setError('Quantidade deve ser maior que zero');
      return;
    }

    if (!selectedProduct) {
      setError('Produto não encontrado');
      return;
    }

    const item: SaleItem = {
      productId: selectedProduct.id,
      name: selectedProduct.name,
      quantity: qty,
      price: selectedProduct.price,
      subtotal: selectedProduct.price * qty,
    };

    onAdd(item);
    setSelectedProductId('');
    setQuantity('1');
    setError('');
    onClose();
  };

  const subtotal = selectedProduct
    ? selectedProduct.price * parseFloat(quantity || '0')
    : 0;

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md w-[calc(100%-2rem)]">
        <DialogHeader>
          <DialogTitle>Adicionar Produto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product">Produto *</Label>
            <Select
              value={selectedProductId}
              onValueChange={(value) => {
                setSelectedProductId(value);
                setError('');
              }}
            >
              <SelectTrigger id="product">
                <SelectValue placeholder="Selecione um produto" />
              </SelectTrigger>
              <SelectContent>
                {products.length === 0 ? (
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    Nenhum produto cadastrado
                  </div>
                ) : (
                  products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} - {formatCurrency(product.price)}/
                      {product.unit}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {error && !selectedProductId && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantidade *</Label>
            <Input
              id="quantity"
              type="number"
              step="0.01"
              min="0.01"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                setError('');
              }}
              placeholder="1"
            />
            {error && selectedProductId && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>

          {selectedProduct && (
            <div className="p-4 bg-muted rounded-lg space-y-1">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Preço unitário:
                </span>
                <span className="font-semibold">
                  {formatCurrency(selectedProduct.price)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Subtotal:</span>
                <span className="font-bold text-lg">
                  {formatCurrency(subtotal)}
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={products.length === 0}
              className="w-full sm:w-auto"
            >
              Adicionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
