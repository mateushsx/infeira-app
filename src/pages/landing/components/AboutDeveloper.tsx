import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Linkedin } from 'lucide-react';
const developerAvatar = '/images/landing/developer-avatar.jpg';

export function AboutDeveloper() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Sobre o Desenvolvedor
          </h2>
        </div>

        <Card className="overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img
                  src={developerAvatar}
                  alt="Mateus Henrique"
                  className="w-48 h-48 rounded-full object-cover border-4 border-primary shadow-lg"
                />
              </div>
              <div className="flex-1 text-center md:text-left space-y-4">
                <h3 className="text-3xl font-bold text-foreground">
                  Mateus Henrique
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Desenvolvedor de software especializado em criar soluções
                  práticas e acessíveis. Apaixonado por tecnologia e sempre
                  buscando desenvolver aplicações que façam a diferença no dia a
                  dia das pessoas.
                </p>
                <div className="pt-4">
                  <Button
                    size="lg"
                    asChild
                    className="w-full md:w-auto bg-[#0077B5] hover:bg-[#005885] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <a
                      href="https://www.linkedin.com/in/mateushsx/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Linkedin className="h-6 w-6" />
                      <span className="font-semibold">Ver Perfil no LinkedIn</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

