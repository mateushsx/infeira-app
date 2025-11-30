import { getUser } from "@/services/storage/user";

export function TopBar() {
  const user = getUser();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-primary">InFeira</h1>
        </div>
        {user && (
          <div className="text-sm text-muted-foreground">
            Olá, <span className="font-semibold text-foreground">{user.name}</span>
          </div>
        )}
      </div>
    </header>
  );
}

