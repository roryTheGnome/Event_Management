'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Event } from '@/types/event';
import { useEventStore } from "@/store/eventStore";
import FormField from "@/components/form/FormField";

export default function NewEventForm() {
    const router = useRouter();
    const { addEvent, events } = useEventStore();

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
            description: `${form.stage} `,
            result: null,
        };

        addEvent(newEvent);
        router.push('/');
    };

    return (
        <main className="p-4 md:p-6 max-w-xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                Create Event
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-[#070830]/80 backdrop-blur border border-[#1E2164] rounded-2xl p-6 shadow-lg"
                aria-label="Create a new event form"
            >
                <FormField
                    label="Date"
                    id="date"
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                />

                <FormField
                    label="Time"
                    id="time"
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                />

                <FormField
                    label="Home Team"
                    id="homeTeam"
                    type="text"
                    name="homeTeam"
                    value={form.homeTeam}
                    onChange={handleChange}
                    placeholder="Home Team"
                />

                <FormField
                    label="Away Team"
                    id="awayTeam"
                    type="text"
                    name="awayTeam"
                    value={form.awayTeam}
                    onChange={handleChange}
                    placeholder="Away Team"
                />

                <FormField
                    label="Stadium"
                    id="stadium"
                    type="text"
                    name="stadium"
                    value={form.stadium}
                    onChange={handleChange}
                    placeholder="Stadium"
                />

                <FormField
                    label="Stage"
                    id="stage"
                    type="text"
                    name="stage"
                    value={form.stage}
                    onChange={handleChange}
                    placeholder="Stage (e.g. Final)"
                />

                <div className="flex flex-col">
                    <label htmlFor="status" className="mb-1 text-gray-400 font-semibold">
                        Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-[#1E2164] rounded-xl bg-[#000010] text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                        aria-label="Event status"
                    >
                        <option value="scheduled">Scheduled</option>
                        <option value="played">Played</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label="Create new event"
                >
                    Create Event
                </button>
            </form>
        </main>
    );
}