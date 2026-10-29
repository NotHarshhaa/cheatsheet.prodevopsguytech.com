export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {/* Header HUD skeleton */}
      <div className="shimmer mb-8 rounded-3xl border border-border/80 bg-card p-6 shadow-xl sm:p-10">
        <div className="mb-8 flex items-start gap-6">
          <div className="h-20 w-20 rounded-2xl bg-muted" />
          <div className="flex-1 space-y-3">
            <div className="h-3 w-32 rounded bg-muted" />
            <div className="h-10 w-64 rounded bg-muted" />
            <div className="h-4 w-full max-w-lg rounded bg-muted" />
          </div>
        </div>
        <div className="flex gap-2.5 border-t border-border/60 pt-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-7 w-24 rounded-full bg-muted" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* TOC skeleton */}
        <div className="hidden lg:col-span-1 lg:block">
          <div className="shimmer sticky top-24 space-y-3 rounded-2xl border border-border/80 bg-card p-5">
            <div className="h-3 w-28 rounded bg-muted" />
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-3.5 w-full rounded bg-muted" />
            ))}
          </div>
        </div>

        {/* Section skeletons */}
        <div className="space-y-8 lg:col-span-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="shimmer rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-8"
            >
              <div className="mb-6 flex items-center gap-3 border-b border-border/60 pb-4">
                <div className="h-8 w-8 rounded-xl bg-muted" />
                <div className="h-6 w-48 rounded bg-muted" />
              </div>
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-5/6 rounded bg-muted" />
                <div className="h-32 w-full rounded-2xl bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
