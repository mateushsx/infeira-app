import { useState } from "react";
import type { DateRange } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface DateRangePickerProps {
  dateRange: DateRange;
  onChange: (range: DateRange) => void;
}

export function DateRangePicker({ dateRange, onChange }: DateRangePickerProps) {
  const [fromDate, setFromDate] = useState(
    dateRange.from ? dateRange.from.toISOString().split("T")[0] : ""
  );
  const [toDate, setToDate] = useState(
    dateRange.to ? dateRange.to.toISOString().split("T")[0] : ""
  );

  const handleFromChange = (value: string) => {
    setFromDate(value);
    onChange({
      from: value ? new Date(value) : undefined,
      to: dateRange.to,
    });
  };

  const handleToChange = (value: string) => {
    setToDate(value);
    onChange({
      from: dateRange.from,
      to: value ? new Date(value) : undefined,
    });
  };

  const handleReset = () => {
    setFromDate("");
    setToDate("");
    onChange({ from: undefined, to: undefined });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Filtrar por Período
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="from">De</Label>
            <Input
              id="from"
              type="date"
              value={fromDate}
              onChange={(e) => handleFromChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="to">Até</Label>
            <Input
              id="to"
              type="date"
              value={toDate}
              onChange={(e) => handleToChange(e.target.value)}
            />
          </div>
        </div>
        {(fromDate || toDate) && (
          <Button variant="outline" onClick={handleReset} className="w-full">
            Limpar Filtro
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

