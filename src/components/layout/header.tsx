export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 px-6 py-4 backdrop-blur-lg md:px-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back</p>
          <h2 className="text-2xl font-semibold text-foreground">
            Dashboard overview
          </h2>
        </div>
      </div>
    </header>
  );
}
