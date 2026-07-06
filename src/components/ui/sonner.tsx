import { useEffect, useState } from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

function getTheme(): ToasterProps["theme"] {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function Toaster(props: ToasterProps) {
  const [theme, setTheme] = useState<ToasterProps["theme"]>(getTheme());

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--card)",
          "--normal-text": "var(--card-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "var(--card)",
          "--success-text": "var(--success)",
          "--success-border": "var(--success)",
          "--error-bg": "var(--card)",
          "--error-text": "var(--destructive)",
          "--error-border": "var(--destructive)",
          "--warning-bg": "var(--card)",
          "--warning-text": "var(--warning)",
          "--warning-border": "var(--warning)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
}
