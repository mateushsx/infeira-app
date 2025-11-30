import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
const heroBg = '/images/landing/hero-bg.jpg';

interface LandingHeroProps {
  onInstall: () => void;
}

export function LandingHero({ onInstall }: LandingHeroProps) {
  return (
    <section
      className="relative min-h-[600px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
          InFeira
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-white drop-shadow-lg">
          Gerencie sua Feira com Facilidade
        </h2>
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
          Sistema simples e completo para você gerenciar produtos, vendas e
          relatórios na sua feira. Funciona totalmente offline!
        </p>
        <div className="pt-4">
          <Button
            size="lg"
            onClick={onInstall}
            className="text-xl px-8 py-6 h-auto"
          >
            <Download className="h-6 w-6 mr-3" />
            Baixar e Instalar Agora
          </Button>
        </div>
      </div>
    </section>
  );
}
