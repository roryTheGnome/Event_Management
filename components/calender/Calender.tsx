import { Event } from '@/types/event';
import {
    addDays,
    addMonths,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    startOfMonth,
    startOfWeek,
    subMonths
} from "date-fns";
import Link from "next/link";
import {useState} from "react";

interface Props{
    events:Event[];
}

export default function Calender({events}:Props){

    const today=new Date();
    //i wanted to upgade the curernt calender by showing the prev-next months as well
    const [current, setCurrent]= useState(today);

    const monthStart = startOfMonth(current);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const prevMonth = () => setCurrent(subMonths(current, 1));
    const nextMonth = () => setCurrent(addMonths(current, 1));

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
        <div className="p-2 w-full max-w-full">
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={prevMonth}
                    className="px-3 py-1 rounded bg-neutral-200 hover:bg-neutral-300"
                >← Prev </button>

                <div className="font-semibold text-lg">
                    {format(current, "MMMM yyyy")}
                </div>

                <button
                    onClick={nextMonth}
                    className="px-3 py-1 rounded bg-neutral-200 hover:bg-neutral-300"
                >Next → </button>
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center mb-2 text-xs sm:text-sm">
                {weekdays.map((day) => (
                    <div key={day} className="font-semibold text-neutral-600">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {days.map((day) => {
                    const dateKey = format(day, 'yyyy-MM-dd');
                    const dayEvents = datedEvents[dateKey] || [];

                    return (
                        <div
                            key={day.toISOString()}
                            className={`
                        p-1 sm:p-2 rounded-lg border flex flex-col shadow-sm transition-all
                        min-h-[80px] sm:min-h-[120px] lg:min-h-[140px]
                        ${!isSameMonth(day, current) ? 'bg-neutral-100 text-neutral-400' : 'bg-base-white'}
                        ${isSameDay(day, current) ? 'border-2 border-primary' : 'border border-neutral-400'}
                        `}>
                            <div className="text-[10px] sm:text-sm font-semibold mb-1">
                                {format(day, 'd')}
                            </div>

                            <div className="flex flex-col gap-1 overflow-hidden">
                                {dayEvents.slice(0, 2).map((event, idx) => (
                                    <Link key={idx} href={`/event/${event.id}`}>
                                        <div
                                            className={`text-[9px] sm:text-xs px-1 py-[2px] rounded-full truncate
                                        ${event.status === 'played'
                                                ? 'bg-neutral-400 text-neutral-900'
                                                : 'bg-primary text-base-white'}`}>
                                            {event.homeTeam} vs {event.awayTeam}
                                        </div>
                                    </Link>
                                ))}

                                {dayEvents.length > 2 && (
                                    <div className="text-[9px] sm:text-[10px] text-neutral-500 mt-1">
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