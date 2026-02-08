"use client"

import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        {/* Error icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#1C4E80]/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-[#1C4E80]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="mb-3 text-3xl font-bold tracking-tight text-[#1C4E80]">
          Something went wrong
        </h1>

        <p className="mb-8 text-gray-600">
          We encountered an unexpected error. Please try again, or return to the
          homepage if the problem persists.
        </p>

        {error.digest && (
          <p className="mb-6 text-xs text-gray-400">Error ID: {error.digest}</p>
        )}

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex w-full items-center justify-center rounded-lg bg-[#1C4E80] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4986C8] focus:outline-none focus:ring-2 focus:ring-[#4986C8] focus:ring-offset-2 sm:w-auto"
          >
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-lg border border-[#1C4E80] px-6 py-3 text-sm font-semibold text-[#1C4E80] transition-colors hover:bg-[#1C4E80]/5 focus:outline-none focus:ring-2 focus:ring-[#4986C8] focus:ring-offset-2 sm:w-auto"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
