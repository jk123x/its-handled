import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center px-8 md:px-16 max-w-4xl mx-auto py-12">
      <div className="space-y-8">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.1]">
          School emails.
          <br />
          <span className="text-[var(--accent)]">Sorted.</span>
        </h1>

        <p className="text-lg text-[var(--muted)] max-w-lg leading-relaxed">
          Forward school newsletters to us. We extract the dates, deadlines, and costs, 
          then send you a link to add them to your calendar.
        </p>

        <div className="bg-[var(--accent-light)] rounded-xl p-5 max-w-md">
          <p className="text-sm text-[var(--muted)] mb-1">Forward emails to</p>
          <p className="font-mono font-bold text-xl text-[var(--foreground)]">handled@itshandled.app</p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-7 py-3.5 bg-[var(--foreground)] text-[var(--background)] rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Open dashboard
          </Link>
          <p className="text-sm text-[var(--muted)]">
            5 free per month
          </p>
        </div>
      </div>

      <footer className="mt-auto pt-16">
        <p className="text-sm text-[var(--muted)]">
          Built by a parent who missed Book Week. Twice.
        </p>
      </footer>
    </div>
  );
}
