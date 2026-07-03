import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/use-theme";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="app-header sticky top-0 z-10 border-b border-border bg-background/95 px-6 py-4 backdrop-blur-lg md:px-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back</p>
          <h2 className="text-2xl font-semibold text-foreground">
            Dashboard overview
          </h2>
        </div>

        <div className="flex items-center gap-3 rounded-full border border-border bg-card px-3 py-2 text-sm text-foreground">
          <span className="text-muted-foreground">Theme</span>
          <button
            type="button"
            className={`rounded-full px-3 py-1 transition ${
              theme === "light"
                ? "bg-secondary text-secondary-foreground"
                : "bg-primary text-primary-foreground"
            }`}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {mounted ? (theme === "light" ? "Dark" : "Light") : "Toggle"}
          </button>
        </div>
      </div>
    </header>
  );
}
