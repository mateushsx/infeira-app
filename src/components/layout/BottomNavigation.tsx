import { Link, useLocation } from 'react-router-dom';
import { Home, Package, ShoppingCart, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { path: '/dashboard', icon: Home, label: 'Início' },
  { path: '/products', icon: Package, label: 'Produtos' },
  { path: '/sales', icon: ShoppingCart, label: 'Vendas' },
  { path: '/report', icon: BarChart3, label: 'Relatório' },
];

export function BottomNavigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around h-20 px-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
