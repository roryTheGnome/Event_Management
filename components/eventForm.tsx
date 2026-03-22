'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {Event} from '@/types/event';
import {useEventStore} from "@/store/eventStore";

export default function NewEventForm() {
    const router = useRouter();
    const { addEvent } = useEventStore();
    const {events}=useEventStore();


    const [form, setForm] = useState({
        date: '',
        time: '',
        homeTeam: '',
        awayTeam: '',
        stadium: '',
        stage: '',
        status: 'scheduled',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newEvent: Event = {
            id: events.length+1,
            date: form.date,
            time: form.time,
            homeTeam: form.homeTeam || 'TBA',
            awayTeam: form.awayTeam || 'TBA',
            stadium: form.stadium || 'TBA',
            stage: form.stage || 'Friendly',
            status: form.status,
            title: `${form.homeTeam} vs ${form.awayTeam}`,
            description: `${form.stage} match`,
            result: null,
        };

        addEvent(newEvent);

        router.push('/');
    };

    return (
        <main className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create Event</h1>

            <form onSubmit={handleSubmit} className="space-y-3">

                <input name="date" type="date" onChange={handleChange} required className="w-full p-2 border rounded" />
                <input name="time" type="time" onChange={handleChange} required className="w-full p-2 border rounded" />

                <input name="homeTeam" placeholder="Home Team" onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="awayTeam" placeholder="Away Team" onChange={handleChange} className="w-full p-2 border rounded" />

                <input name="stadium" placeholder="Stadium" onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="stage" placeholder="Stage (e.g. Final)" onChange={handleChange} className="w-full p-2 border rounded" />

                <select name="status" onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="scheduled">Scheduled</option>
                    <option value="played">Played</option>
                </select>

                <button className="w-full bg-primary  p-2 rounded hover:bg-red-700 transition">
                    Create Event
                </button>
            </form>
        </main>
    );
}