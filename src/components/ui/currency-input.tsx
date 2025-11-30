import * as React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface CurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const formatCurrency = (numbers: string): string => {
      if (!numbers || numbers === "") return "";
      
      const padded = numbers.padStart(3, "0");
      const amount = parseFloat(padded) / 100;
      
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }).format(amount);
    };

    const parseCurrency = (val: string): string => {
      return val.replace(/\D/g, "");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const numbers = parseCurrency(inputValue);
      
      if (numbers.length > 10) return;
      
      onChange(numbers);
    };

    const displayValue = formatCurrency(value || "");

    return (
      <Input
        ref={ref}
        type="text"
        inputMode="decimal"
        value={displayValue}
        onChange={handleChange}
        placeholder="R$ 0,00"
        className={cn(className)}
        {...props}
      />
    );
  }
);
CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };

