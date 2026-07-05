import { ArrowLeft, Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { usePageMeta } from "@/hooks/use-page-meta";
import ThemeToggle from "../ui/theme-toggle";
import Button from "../ui/button";

export default function Header() {
  const { title, subtitle } = usePageMeta();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isDetailsPage =
    pathname.startsWith("/rigs/") ||
    pathname.startsWith("/shipments/") ||
    pathname.startsWith("/warehouses/");

  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <button className="rounded-lg p-2 transition hover:bg-muted md:hidden">
            <Menu className="h-5 w-5" />
          </button>

          {isDetailsPage && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Go back"
              onClick={() => navigate(-1)}
              className="rounded-xl"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}

          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>

            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
