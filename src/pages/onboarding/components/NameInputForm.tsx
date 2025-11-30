import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { setUser } from '@/services/storage/user';

export function NameInputForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Por favor, digite seu nome');
      return;
    }

    setUser(name.trim());
    navigate('/app');
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">
          Qual é o seu nome?
        </h2>
        <p className="text-lg text-muted-foreground">
          Vamos começar personalizando sua experiência
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nome do feirante</Label>
          <Input
            id="name"
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            autoFocus
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <Button type="submit" size="lg" className="w-full">
          Continuar
        </Button>
      </form>
    </div>
  );
}
