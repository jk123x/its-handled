import Link from "next/link";

// Mock data for now
const mockItems = [
  {
    id: "1",
    title: "Book Week Parade",
    event_date: "2024-08-15",
    event_time: "09:00",
    action_required: "Dress up as favourite book character",
    cost: null,
    status: "pending",
    school_name: "Sunrise Primary",
  },
  {
    id: "2",
    title: "Athletics Carnival",
    event_date: "2024-08-22",
    event_time: "08:30",
    action_required: "Wear house colours, pack lunch and water",
    cost: null,
    status: "pending",
    school_name: "Sunrise Primary",
  },
  {
    id: "3",
    title: "Excursion - Science Museum",
    event_date: "2024-08-28",
    event_time: null,
    action_required: "Return permission slip, pack lunch",
    cost: 15,
    status: "added_to_calendar",
    school_name: "Sunrise Primary",
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function Dashboard() {
  const pendingItems = mockItems.filter((i) => i.status === "pending");
  const doneItems = mockItems.filter((i) => i.status === "added_to_calendar");

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="px-6 md:px-12 lg:px-24 py-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link href="/" className="font-bold text-xl">
          handled.
        </Link>
        <button className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
          Sign out
        </button>
      </header>

      <main className="px-6 md:px-12 lg:px-24 py-12 max-w-5xl mx-auto">
        {/* Upload area */}
        <div className="mb-16">
          <div className="border-2 border-dashed border-[var(--foreground)]/20 rounded-2xl p-8 md:p-12 text-center hover:border-[var(--accent)] transition-colors cursor-pointer">
            <p className="text-lg md:text-xl font-medium mb-2">
              Chuck a document in here
            </p>
            <p className="text-[var(--muted)]">
              Drag a file, click to upload, or just forward emails to{" "}
              <span className="font-mono text-[var(--accent)]">
                handled@itshandled.app
              </span>
            </p>
          </div>
        </div>

        {/* Pending items */}
        {pendingItems.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Needs doing
              <span className="ml-3 text-[var(--accent)]">
                {pendingItems.length}
              </span>
            </h2>

            <div className="space-y-4">
              {pendingItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      {item.cost && (
                        <span className="text-sm bg-[var(--accent-light)] text-[var(--accent)] px-3 py-1 rounded-full font-medium">
                          ${item.cost}
                        </span>
                      )}
                    </div>
                    <p className="text-[var(--muted)]">{item.action_required}</p>
                    <p className="text-sm text-[var(--muted)]">
                      {item.school_name}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold">{formatDate(item.event_date)}</p>
                      {item.event_time && (
                        <p className="text-sm text-[var(--muted)]">
                          {item.event_time}
                        </p>
                      )}
                    </div>

                    <button className="bg-[var(--foreground)] text-[var(--background)] px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
                      Add to calendar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Done items */}
        {doneItems.length > 0 && (
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[var(--muted)]">
              In your calendar
              <span className="ml-3">{doneItems.length}</span>
            </h2>

            <div className="space-y-4">
              {doneItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[var(--foreground)]/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[var(--success)]">✓</span>
                      <h3 className="text-xl font-semibold text-[var(--muted)]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[var(--muted)] opacity-70">
                      {item.action_required}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-[var(--muted)]">
                      {formatDate(item.event_date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {mockItems.length === 0 && (
          <div className="text-center py-24">
            <p className="text-2xl font-semibold mb-4">Nothing here yet</p>
            <p className="text-[var(--muted)] text-lg">
              Forward a school email to{" "}
              <span className="font-mono text-[var(--accent)]">
                handled@itshandled.app
              </span>{" "}
              and we&apos;ll pull out the important bits.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
