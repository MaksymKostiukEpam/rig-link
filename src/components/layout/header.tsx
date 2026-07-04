import { Menu } from "lucide-react";
import SearchBar from "../ui/search-bar";
import ThemeToggle from "../ui/theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-8">
        <div className="flex items-center gap-5">
          <button className="rounded-lg p-2 transition hover:bg-muted md:hidden">
            <Menu className="h-5 w-5" />
          </button>

          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

            <p className="text-sm text-muted-foreground">
              Monitor offshore rigs, warehouses and shipments
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SearchBar />

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
