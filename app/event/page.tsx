import { getEvents } from "@/types/event";
import { format } from "date-fns";
import Link from "next/link";

export default async function EventsPage() {
    const events = await getEvents();

    return (
        <main className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">
                All Events
            </h1>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border rounded-lg overflow-hidden">
                    <thead className="bg-[var(--color-surface)] text-left">
                    <tr>
                        <th className="p-3 border">Match</th>
                        <th className="p-3 border">Date</th>
                        <th className="p-3 border">Time</th>
                        <th className="p-3 border">Stadium</th>
                        <th className="p-3 border">Stage</th>
                        <th className="p-3 border">Status</th>
                    </tr>
                    </thead>

                    <tbody>
                    {events.map((event) => (
                        <tr
                            key={event.id}
                            className="hover:bg-[var(--color-surface)] transition"
                        >
                            <Link href={`/event/${event.id}`}>
                                <td >{event.homeTeam} vs {event.awayTeam}</td>
                            </Link>

                            <td >{format(new Date(event.date), "PPP")}</td>

                            <td >{event.time}</td>

                            <td >{event.stadium}</td>

                            <td >{event.stage}</td>

                            <td >{event.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}