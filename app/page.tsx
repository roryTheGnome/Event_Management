'use client';

import { useEffect } from 'react';
import Calendar from '@/components/calender/Calender';
import Link from "next/link";
import {useEventStore} from "@/store/eventStore";

export default function Home() {
    const { events, loadEvents } = useEventStore();

    useEffect(() => {
        loadEvents();
    }, []);

    return (
        <main className="p-4">
            <h1 className="text-xl font-bold mb-4">Sports Calendar</h1>

            <Calendar events={events} />

            <Link href="/event/new-event" className="inline-block mt-4 px-4 py-2 bg-primary text-red-700 rounded">
                + Add Event
            </Link>
        </main>
    );
}