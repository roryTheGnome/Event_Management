'use client';

import { useParams, useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { useEventStore } from '@/store/eventStore';
import React from "react";
import { Trash2 } from "lucide-react";
import DetailRow from "@/components/Detail";
import NotFound from "next/dist/client/components/builtin/not-found";
import NotFoundPage from "@/app/not-found";
import LoadingPage from "@/app/loading";
import toast from "react-hot-toast";

export default function EventPage() {
    const { id } = useParams();
    const router = useRouter();
    const { events, loadEvents, deleteEvent } = useEventStore();

    React.useEffect(() => {
        if (events.length === 0) loadEvents();
    }, []);

    const event = events.find((e) => e.id === Number(id));

    if (events.length === 0)
        return <LoadingPage/>;
    if (!event)
        return <NotFoundPage/>;

    const handleDelete = () => {
        const toastId = toast((t) => (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span>Are you sure you want to delete this event?!?</span>
                <div className="flex gap-2 mt-2 sm:mt-0">
                    <button
                        onClick={() => {
                            deleteEvent(event.id);
                            router.push('/');
                            toast.dismiss(t.id);
                            toast.success('Event deleted successfully!!');
                        }}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        aria-label="Delete"
                    >Delete</button>

                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
                        aria-label="Cancel"
                    >Cancel</button>
                </div>
            </div>
        ), {
            duration: Infinity,
        });
    };

    return (
        <main className="p-4 md:p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                {event.homeTeam} vs {event.awayTeam}
            </h1>

            <div
                className="bg-[#070830]/80 backdrop-blur border border-[#1E2164] rounded-2xl p-6 space-y-4 shadow-lg"
                role="region"
                aria-label={`Details for ${event.homeTeam} vs ${event.awayTeam}`}
            >
                <DetailRow label="Date" value={format(new Date(event.date), 'PPP')} />
                <DetailRow label="Time" value={event.time} />
                <DetailRow label="Stadium" value={event.stadium} />
                <DetailRow label="Stage" value={event.stage} />
                <DetailRow label="Status" value={event.status} />
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 justify-center px-4 py-2 bg-red-700 hover:bg-red-900 text-white rounded-xl transition focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label="Delete this event"
                >
                    <Trash2 size={16} />
                    Delete
                </button>
                {/*later add `edit` here if you have time left to improv*/}
            </div>
        </main>
    );
}