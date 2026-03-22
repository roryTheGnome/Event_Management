// I did not wanted to have the UI connected to raw structure

import {APIEvent} from "@/types/api";
import data from "@/data/data.json";

export type Event={
    id: string,
    date: string,
    time:string,
    title: string,
    description: string,
    status: "played" | "scheduled" |  string
}


export const transformEvent=(event:APIEvent, index:number):Event=>{

    const home=event.homeTeam?.name ?? 'TBA';
    const away=event.awayTeam?.name ?? 'TBA';

    return{
        id: `${event.dateVenue}-${index}`,
        date: event.dateVenue,
        time: event.timeVenueUTC,
        title: `${event.originCompetitionName} : ${home} vs ${away}`,
        description: `${event.originCompetitionName} - ${event.stage?.name}`,
        status: event.status
    }

}

export const getEvents = ()=>{
    // @ts-ignore
    return data.data.map(transformEvent);
}