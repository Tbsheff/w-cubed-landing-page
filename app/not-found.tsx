import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        {/* 404 badge */}
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#4986C8]">
          404
        </p>

        <h1 className="mb-3 text-3xl font-bold tracking-tight text-[#1C4E80]">
          Page Not Found
        </h1>

        <p className="mb-8 text-gray-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved or no longer exists.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-lg bg-[#1C4E80] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4986C8] focus:outline-none focus:ring-2 focus:ring-[#4986C8] focus:ring-offset-2 sm:w-auto"
          >
            Go Home
          </Link>

          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center rounded-lg border border-[#1C4E80] px-6 py-3 text-sm font-semibold text-[#1C4E80] transition-colors hover:bg-[#1C4E80]/5 focus:outline-none focus:ring-2 focus:ring-[#4986C8] focus:ring-offset-2 sm:w-auto"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
