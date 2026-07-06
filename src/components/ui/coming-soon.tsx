import { Construction, Clock3 } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-lg">
          <Construction className="h-12 w-12" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight">
          Module Under Development
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          This section is currently being built and will be available in a
          future update.
        </p>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-left shadow-sm">
          <div className="flex items-start gap-4">
            <Clock3 className="mt-0.5 h-5 w-5 text-primary" />

            <div>
              <h2 className="font-semibold">Work in Progress</h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                The UI, business logic, and backend integration for this module
                are still in development. It has been intentionally left out of
                this demo while the remaining parts of the application continue
                to evolve.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Thanks for checking out the project.
        </p>
      </div>
    </div>
  );
}
