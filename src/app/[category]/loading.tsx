export default function Loading() {
  return (
    <div className="min-h-screen py-10 sm:py-16">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Category Hero Skeleton */}
        <div className="shimmer mb-10 rounded-3xl border border-border/80 bg-card p-8 shadow-sm sm:p-10">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-2xl bg-muted" />
            <div className="flex-1 space-y-3">
              <div className="h-3 w-28 rounded bg-muted" />
              <div className="h-9 w-64 rounded bg-muted" />
              <div className="h-4 w-full max-w-md rounded bg-muted" />
            </div>
          </div>
        </div>

        {/* Filter chips skeleton */}
        <div className="mb-8 flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 w-24 rounded-xl bg-muted" />
          ))}
        </div>

        {/* Cheatsheet cards skeleton */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="shimmer rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
            >
              <div className="mb-5 flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-muted" />
                <div className="flex-1 space-y-2.5">
                  <div className="h-5 w-40 rounded bg-muted" />
                  <div className="h-3.5 w-full rounded bg-muted" />
                  <div className="h-3.5 w-3/4 rounded bg-muted" />
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border/60 pt-4">
                <div className="flex gap-1.5">
                  <div className="h-5 w-16 rounded-md bg-muted" />
                  <div className="h-5 w-16 rounded-md bg-muted" />
                </div>
                <div className="h-4 w-20 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
