import { Search } from "lucide-react";
import { useEffect, useRef } from "react";

type Props = {
  placeholder?: string;
};

export default function SearchBar({ placeholder = "Search..." }: Props) {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
          <Search className="h-4 w-4" />
        </span>
        <input
          ref={ref}
          className="w-[380px] rounded-md border border-border/60 bg-input px-12 py-2 text-sm placeholder:text-muted-foreground focus:outline-none"
          placeholder={placeholder}
        />
        <span className="absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground bg-muted/0 rounded px-2">
          Ctrl+K
        </span>
      </div>
    </div>
  );
}
