'use client';

import { Loader2 } from 'lucide-react';

export default function LoadingPage() {
    return (
        <main className="flex flex-col items-center justify-center h-screen bg-[#000010] text-white">
            <Loader2 className="animate-spin w-12 h-12 text-red-600 mb-4" aria-label="Loading" />
            <p className="text-lg text-gray-300">Loading...</p>
        </main>
    );
}