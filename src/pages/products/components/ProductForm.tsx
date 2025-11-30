import { useState, useEffect } from "react";
import type { Product, ProductUnit } from "@/types";
import { PRODUCT_UNITS } from "@/utils/constants";
import { parseCurrencyString, formatCurrencyString } from "@/utils/currency";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProductFormProps {
  product?: Product | null;
  open: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, "id" | "createdAt">) => void;
}

export function ProductForm({ product, open, onClose, onSave }: ProductFormProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState<ProductUnit>("Unidade");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(formatCurrencyString(product.price));
      setUnit(product.unit);
      setNotes(product.notes || "");
    } else {
      setName("");
      setPrice("");
      setUnit("Unidade");
      setNotes("");
    }
    setErrors({});
  }, [product, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    const priceValue = parseCurrencyString(price);
    if (!price || priceValue <= 0) {
      newErrors.price = "Preço deve ser maior que zero";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      name: name.trim(),
      price: parseCurrencyString(price),
      unit,
      notes: notes.trim() || undefined,
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[calc(100%-2rem)]">
        <DialogHeader>
          <DialogTitle>
            {product ? "Editar Produto" : "Adicionar Produto"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do produto *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              placeholder="Ex: Tomate"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço *</Label>
              <CurrencyInput
                id="price"
                value={price}
                onChange={(value) => {
                  setPrice(value);
                  if (errors.price) setErrors({ ...errors, price: "" });
                }}
              />
              {errors.price && (
                <p className="text-sm text-destructive">{errors.price}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unidade *</Label>
              <Select value={unit} onValueChange={(value) => setUnit(value as ProductUnit)}>
                <SelectTrigger id="unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_UNITS.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observação (opcional)</Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Informações adicionais sobre o produto"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {product ? "Salvar" : "Adicionar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

