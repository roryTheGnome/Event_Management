import Calender from '@/components/calender/Calender';
import { getEvents } from '@/types/event';

export default function Home() {
    const events = getEvents();

    return (
        <main className="p-4">
            <h1 className="text-xl font-bold mb-4">Calendar View  ???(find a title here latr)</h1>
            <Calender events={events} />
        </main>
    );
}