import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-teal-700">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-white">
              +
            </span>
            PharmaCare
          </Link>
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} PharmaCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
