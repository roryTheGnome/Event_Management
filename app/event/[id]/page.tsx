'use client';

import { useParams, useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { useEventStore } from '@/store/eventStore';
import React from "react";

export default function EventPage() {
    const { id } = useParams();
    const router = useRouter();
    const { events, loadEvents, deleteEvent } = useEventStore();

    // Load events if empty
    React.useEffect(() => {
        if (events.length === 0) loadEvents();
    }, []);

    const event = events.find((e) => e.id === Number(id));

    if (events.length === 0) return <div className="p-4">Loading...</div>;
    if (!event) return <div className="p-4">Event not found</div>;

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this event?!?')) {
            deleteEvent(event.id);
            router.push('/');
        }
    };

    return (
        <main className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{event.homeTeam} vs {event.awayTeam}</h1>

            <div className="bg-base-white p-4 rounded-lg shadow-md space-y-3">
                <div><strong>Date:</strong> {format(new Date(event.date), 'PPP')}</div>
                <div><strong>Time:</strong> {event.time}</div>
                <div><strong>Stadium:</strong> {event.stadium}</div>
                <div><strong>Stage:</strong> {event.stage}</div>
                <div><strong>Status:</strong> {event.status}</div>
            </div>

            <div className="flex gap-2 mt-4">
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-700  rounded hover:bg-red-900 transition"
                >Delete</button>

            </div>
        </main>
    );
}