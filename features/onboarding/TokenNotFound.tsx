import Link from "next/link";

export default function TokenNotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center mb-6">
        <svg
          className="w-10 h-10 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Invalid or Missing Registration Link
      </h1>
      <p className="text-text-muted text-sm max-w-sm mb-8">
        This registration link is invalid, has expired, or has already been used.
        Please request a new one to continue setting up your hospital workspace.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/register"
          className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Request a New Link
        </Link>
        <Link
          href="/support"
          className="px-6 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:border-gray-300 hover:text-gray-800 transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
