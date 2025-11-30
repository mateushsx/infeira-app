import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Smartphone } from 'lucide-react';
import { LandingHero } from '@/pages/landing/components/LandingHero';
import { LandingFeatures } from '@/pages/landing/components/LandingFeatures';
import { AboutDeveloper } from '@/pages/landing/components/AboutDeveloper';
import { LandingFooter } from '@/pages/landing/components/LandingFooter';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      navigate('/onboarding');
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, [navigate]);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      navigate('/onboarding');

      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      navigate('/onboarding');
    }
  };

  const handleSkip = () => {
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-background">
      <LandingHero onInstall={handleInstall} />
      <LandingFeatures />
      <AboutDeveloper />
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="space-y-4 p-8 bg-card rounded-xl border border-border shadow-lg">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Smartphone className="h-8 w-8" />
              <h2 className="text-3xl md:text-4xl font-bold">Baixe o App</h2>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Para uma melhor experiência, baixe e instale o InFeira no seu
              dispositivo. Assim você terá acesso rápido e funcionamento offline
              completo.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              size="lg"
              onClick={handleInstall}
              className="w-full md:w-auto text-xl px-8 py-6 h-auto"
            >
              Baixar e Instalar
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleSkip}
              className="w-full md:w-auto text-lg px-6 py-4 h-auto"
            >
              Continuar sem instalar
            </Button>
          </div>

          {!deferredPrompt && (
            <div className="text-sm text-muted-foreground space-y-2 max-w-2xl mx-auto mt-8">
              <p className="font-semibold">💡 Dica: Para instalar o app:</p>
              <ul className="text-left space-y-1 list-disc list-inside">
                <li>
                  No Chrome/Edge: Menu → "Instalar app" ou ícone de instalação
                  na barra de endereços
                </li>
                <li>
                  No Safari (iOS): Compartilhar → "Adicionar à Tela de Início"
                </li>
                <li>No Firefox: Menu → "Instalar"</li>
              </ul>
            </div>
          )}
        </div>
      </section>
      <LandingFooter />
    </div>
  );
}

