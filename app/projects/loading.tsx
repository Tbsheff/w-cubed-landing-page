export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header skeleton */}
        <div className="text-center mb-12">
          <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-4" />
          <div className="h-5 w-96 bg-gray-200 rounded animate-pulse mx-auto" />
        </div>
        {/* Cards grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-gray-200 overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
