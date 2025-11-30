import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, BarChart3, WifiOff } from 'lucide-react';

const features = [
  {
    icon: Package,
    title: 'Produtos',
    description:
      'Cadastre e gerencie todos os seus produtos de forma simples. Organize preços, unidades e informações importantes.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: ShoppingCart,
    title: 'Vendas',
    description:
      'Registre vendas com múltiplos produtos de uma vez. Adicione o nome do cliente e acompanhe todas as transações.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    icon: BarChart3,
    title: 'Relatórios',
    description:
      'Visualize suas estatísticas de vendas. Veja totais do dia, semana, mês e descubra seus produtos mais vendidos.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: WifiOff,
    title: '100% Offline',
    description:
      'Funciona completamente sem internet! Todos os dados ficam salvos no seu dispositivo de forma segura.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
];

export function LandingFeatures() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Funcionalidades
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tudo que você precisa para gerenciar sua feira de forma profissional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 rounded-full ${feature.bgColor} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

