import { Event } from '@/types/event';
import {addDays, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek} from "date-fns";
import Link from "next/link";

interface Props{
    events:Event[];
}

export default function Calender({events}:Props){

    const today=new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const datedEvents= events.reduce((acc,event)=>{
        const dateKey=event.date;
        if(!acc[dateKey]) acc[dateKey]=[];

        acc[dateKey].push(event);
        return acc;
    }, {} as Record<string, Event[]>);

    const days: Date[]=[];
    let day=startDate;
    while(day<=endDate){
        days.push(day);
        day=addDays(day,1);
    }

    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <div className="p-2">
            <div className="grid grid-cols-7 gap-2 text-center mb-2">
                {weekdays.map((day) => (
                    <div key={day} className="font-semibold text-neutral-600">{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
                {days.map((day) => {
                    const dateKey = format(day, 'yyyy-MM-dd');
                    const dayEvents = datedEvents[dateKey] || [];

                    return (
                        <div
                            key={day.toISOString()}
                            className={`
                            p-2 rounded-lg border h-32 flex flex-col shadow-sm transition-all
                            ${!isSameMonth(day, today) ? 'bg-neutral-100 text-neutral-400' : 'bg-base-white'}
                            ${isSameDay(day, today) ? 'border-2 border-primary' : 'border border-neutral-400'}
                             hover:scale-105
                          `}>
                            <div className="text-sm font-semibold mb-1">{format(day, 'd')}</div>

                            <div className="flex flex-col gap-1 overflow-hidden">
                                {dayEvents.slice(0, 2).map((event, idx) => (
                                    <div key={idx} className="relative group">

                                        <Link href={`/event/${event.id}`}>
                                            <div
                                                className={`text-xs px-1 py-[2px] rounded-full truncate
                                                ${event.status === 'played' ? 'bg-neutral-400 text-neutral-900' : 'bg-primary text-base-white'}`}>
                                                {event.homeTeam} vs {event.awayTeam}
                                            </div>
                                        </Link>

                                    </div>
                                ))}

                                {dayEvents.length > 2 && (
                                    <div className="text-[10px] text-neutral-500 mt-1">
                                        +{dayEvents.length - 2} more
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}