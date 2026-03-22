import {getEvents} from "@/types/event";
import {notFound} from "next/navigation";
import {format} from "date-fns";


type Props={
    params: Promise<{id: string}>;
}

export default async function EventPage({params}:Props){
    const {id}=await params;

    const events=getEvents();
    const event= events.find((e)=>e.id===Number(id));

    if(!event) return notFound(); //TODO custom this part later

    return(
        <main className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4"> {event.homeTeam} vs {event.awayTeam}</h1>

            <div className="bg-base-white p-4 rounded-lg shadow-md space-y-3">
                <div><strong>Date:</strong> {format(new Date(event.date), 'PPP')}</div>
                <div><strong>Time:</strong> {event.time}</div>
                <div><strong>Stadium:</strong> {event.stadium}</div>
                <div><strong>Stage:</strong> {event.stage}</div>
                <div><strong>Status:</strong> {event.status}</div>
            </div>
        </main>
    )

}