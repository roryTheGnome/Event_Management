"use client";

import { format } from "date-fns";
import Link from "next/link";
import { useEventStore } from "@/store/eventStore";
import React, { useEffect, useMemo, useState } from "react";
import {SortKey} from "@/types/event";
import {SortHeader} from "@/components/SortHeader";
import LoadingPage from "@/app/loading";


export default function EventsPage() {
    const { events, loadEvents } = useEventStore();
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState<SortKey>("date");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        if (events.length === 0) loadEvents();
    }, []);

    const handleSort = (key: SortKey) => {
        if (key === sortKey) setSortDir(sortDir === "asc" ? "desc" : "asc");
        else {
            setSortKey(key);
            setSortDir("asc");
        }
    };

    const filteredAndSortedEvents = useMemo(() => {
        return events
            .filter((e) =>
                `${e.homeTeam} ${e.awayTeam}`.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) => {
                let aValue: string | number = "";
                let bValue: string | number = "";

                switch (sortKey) {
                    case "match":
                        aValue = `${a.homeTeam} ${a.awayTeam}`;
                        bValue = `${b.homeTeam} ${b.awayTeam}`;
                        break;
                    case "date":
                        aValue = new Date(a.date).getTime();
                        bValue = new Date(b.date).getTime();
                        break;
                    case "time":
                        aValue = a.time;
                        bValue = b.time;
                        break;
                    case "stadium":
                        aValue = a.stadium;
                        bValue = b.stadium;
                        break;
                    case "stage":
                        aValue = a.stage;
                        bValue = b.stage;
                        break;
                    case "status":
                        aValue = a.status;
                        bValue = b.status;
                        break;
                }

                if (aValue < bValue) return sortDir === "asc" ? -1 : 1;
                if (aValue > bValue) return sortDir === "asc" ? 1 : -1;
                return 0;
            });
    }, [events, search, sortKey, sortDir]);

    if (events.length === 0) return <LoadingPage/>;

    return (
        <main className="p-4 md:p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                All Events
            </h1>

            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Search match.."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-sm px-4 py-2 rounded-full bg-[#070830] border border-[#1E2164] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                    aria-label="Search events by match"
                />
            </div>

            <div className="overflow-x-auto rounded-xl shadow-lg bg-[#070830]/80 backdrop-blur border border-[#1E2164]">
                <table className="min-w-full border-collapse">
                    <thead className="bg-[#1E2164] text-left text-white">
                    <tr>
                        <SortHeader
                            label="Match"
                            sortKeyValue="match"
                            {...{ sortKey, sortDir, handleSort }}
                        />
                        <SortHeader
                            label="Date"
                            sortKeyValue="date"
                            {...{ sortKey, sortDir, handleSort }}
                        />
                        <SortHeader
                            label="Time"
                            sortKeyValue="time"
                            {...{ sortKey, sortDir, handleSort }}
                        />
                        <SortHeader
                            label="Stadium"
                            sortKeyValue="stadium"
                            {...{ sortKey, sortDir, handleSort }}
                        />
                        <SortHeader
                            label="Stage"
                            sortKeyValue="stage"
                            {...{ sortKey, sortDir, handleSort }}
                        />
                        <SortHeader
                            label="Status"
                            sortKeyValue="status"
                            {...{ sortKey, sortDir, handleSort }}
                        />
                    </tr>
                    </thead>

                    <tbody className="text-white">
                    {filteredAndSortedEvents.map((event) => (
                        <tr
                            key={event.id}
                            className="hover:bg-[#1E2164]/60 transition-colors"
                        >
                            <td className="p-3 border-b border-[#1E2164]">
                                <Link
                                    href={`/event/${event.id}`}
                                    className="hover:text-red-500 transition-colors"
                                    aria-label={`${event.homeTeam} vs ${event.awayTeam}`}
                                >
                                    {event.homeTeam} vs {event.awayTeam}
                                </Link>
                            </td>
                            <td className="p-3 border-b border-[#1E2164]">
                                {format(new Date(event.date), "PPP")}
                            </td>
                            <td className="p-3 border-b border-[#1E2164]">{event.time}</td>
                            <td className="p-3 border-b border-[#1E2164]">{event.stadium}</td>
                            <td className="p-3 border-b border-[#1E2164]">{event.stage}</td>
                            <td className="p-3 border-b border-[#1E2164]">{event.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

