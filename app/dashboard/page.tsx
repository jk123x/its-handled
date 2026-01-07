import Link from "next/link"
import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { Item } from "@/lib/types"
import { SignOutButton } from "./sign-out-button"

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
}

export default async function Dashboard() {
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: items } = await supabase
    .from("items")
    .select(`
      *,
      children (name, school_name)
    `)
    .order("event_date", { ascending: true })

  const allItems = (items || []) as (Item & { children: { name: string; school_name: string | null } | null })[]
  const pendingItems = allItems.filter((i) => i.status === "pending")
  const doneItems = allItems.filter((i) => i.status === "added_to_calendar")

  return (
    <div className="min-h-screen">
      <header className="px-6 md:px-12 lg:px-24 py-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link href="/" className="font-bold text-xl">
          handled.
        </Link>
        <SignOutButton />
      </header>

      <main className="px-6 md:px-12 lg:px-24 py-12 max-w-5xl mx-auto">
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
                    {item.action_required && (
                      <p className="text-[var(--muted)]">{item.action_required}</p>
                    )}
                    {item.children?.school_name && (
                      <p className="text-sm text-[var(--muted)]">
                        {item.children.name && `${item.children.name} · `}{item.children.school_name}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    {item.event_date && (
                      <div className="text-right">
                        <p className="font-semibold">{formatDate(item.event_date)}</p>
                        {item.event_time && (
                          <p className="text-sm text-[var(--muted)]">
                            {item.event_time}
                          </p>
                        )}
                      </div>
                    )}

                    <button className="bg-[var(--foreground)] text-[var(--background)] px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
                      Add to calendar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

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
                    {item.action_required && (
                      <p className="text-[var(--muted)] opacity-70">
                        {item.action_required}
                      </p>
                    )}
                  </div>

                  {item.event_date && (
                    <div className="text-right">
                      <p className="font-semibold text-[var(--muted)]">
                        {formatDate(item.event_date)}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {allItems.length === 0 && (
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
  )
}
