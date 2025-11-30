import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function OnboardingWelcome() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">InFeira</h1>
        <p className="text-xl text-muted-foreground">
          Sistema simples para você gerenciar seus produtos, vendas e relatórios na feira.
        </p>
        <p className="text-lg text-muted-foreground">
          Funciona totalmente offline, sem precisar de internet!
        </p>
      </div>
      <Button
        size="lg"
        onClick={() => navigate("/onboarding/name")}
        className="w-full"
      >
        Começar
      </Button>
    </div>
  );
}

