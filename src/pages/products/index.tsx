import { useState } from 'react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '@/services/storage/products';
import type { Product } from '@/types';
import { ProductCard } from '@/pages/products/components/ProductCard';
import { ProductForm } from '@/pages/products/components/ProductForm';
import { Button } from '@/components/ui/button';
import { Plus, Package } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(() => getProducts());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const loadProducts = () => {
    setProducts(getProducts());
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSave = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      createProduct(productData);
    }
    loadProducts();
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    loadProducts();
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Produtos</h1>
          <p className="text-lg text-muted-foreground">
            Gerencie seus produtos cadastrados
          </p>
        </div>
        <Button size="lg" onClick={handleCreate} className="w-full sm:w-auto">
          <Plus className="h-5 w-5 mr-2" />
          Adicionar Produto
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <Package className="h-16 w-16 mx-auto text-muted-foreground" />
          <p className="text-xl text-muted-foreground">
            Nenhum produto cadastrado ainda
          </p>
          <Button onClick={handleCreate}>
            <Plus className="h-5 w-5 mr-2" />
            Adicionar Primeiro Produto
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={(id) => setDeleteConfirm(id)}
            />
          ))}
        </div>
      )}

      <ProductForm
        product={editingProduct}
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSave}
      />

      <Dialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este produto? Esta ação não pode
              ser desfeita.
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
