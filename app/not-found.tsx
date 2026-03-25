'use client';

import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <main className="flex flex-col items-center justify-center h-screen p-4 bg-[#000010] text-white">
            <h1 className="text-6xl md:text-8xl font-bold text-red-600 mb-4" aria-label="404">
                404
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 mb-6">
                Oops! Ball is out of the field.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white font-semibold transition focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Go back to homepage"
            >
                Go Home
            </Link>
        </main>
    );
}