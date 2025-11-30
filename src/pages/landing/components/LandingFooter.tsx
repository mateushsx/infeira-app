import { ShoppingBag } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="bg-primary text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            <span className="text-xl font-bold">InFeira</span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm md:text-base">
              Desenvolvido por{' '}
              <span className="font-semibold">Inovix Sistemas</span>
            </p>
            <p className="text-xs md:text-sm text-white/80 mt-1">
              © {new Date().getFullYear()} Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

