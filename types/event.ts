// I did not wanted to have the UI connected to raw structure

import {APIEvent, Result} from "@/types/api";
import data from "@/data/data.json";

export type SortKey = "match" | "date" | "time" | "stadium" | "stage" | "status";


export type Event={
    id: number,
    date: string,
    time:string,
    title: string,
    description: string,
    status: "played" | "scheduled" |  string,
    homeTeam: string | "TBA",
    awayTeam: string | "TBA",
    stadium: string;
    stage: string;
    result: Result| null,
}


export const transformEvent=(event:APIEvent, index:number):Event=>{

    const home=event.homeTeam?.name ?? 'TBA';
    const away=event.awayTeam?.name ?? 'TBA';

    return{
        id: index,
        date: event.dateVenue,
        time: event.timeVenueUTC,
        title: `${event.originCompetitionName} : ${home} vs ${away}`,
        description: `${event.originCompetitionName} - ${event.stage?.name}`,
        status: event.status,
        homeTeam: home,
        awayTeam: away,
        stadium: event?.stadium ?? 'TBA',
        stage: event?.stage?.name ?? 'TBA',
        result:event.result,
    }

}

export const getEvents = ()=>{
    // @ts-ignore
    return (data.data as APIEvent[]).map(transformEvent);}