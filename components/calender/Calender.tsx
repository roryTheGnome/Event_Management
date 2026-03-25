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
import {ChevronLeft, ChevronRight} from "lucide-react";

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
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={prevMonth}
                    className="px-4 py-2 rounded-xl bg-[#1E2164] hover:bg-[#FF0000] transition-all duration-300 cursor-pointer"
                    aria-label="Previous month"
                >
                    <ChevronLeft/>
                </button>

                <div className="font-bold text-xl tracking-wide" aria-live="polite">
                    {format(current, "MMMM yyyy")}
                </div>

                <button
                    onClick={nextMonth}
                    className="px-4 py-2 rounded-xl bg-[#1E2164] hover:bg-[#FF0000] transition-all duration-300 cursor-pointer"
                    aria-label="Next month"
                >
                    <ChevronRight/>
                </button>
            </div>


            <div className="grid grid-cols-7 gap-2 text-center mb-3 text-xs sm:text-sm text-gray-400">
                {weekdays.map((day) => (
                    <div key={day} className="font-semibold tracking-wide">
                        {day}
                    </div>
                ))}
            </div>


            <div className="grid grid-cols-7 gap-2">
                {days.map((day) => {
                    const dateKey = format(day, "yyyy-MM-dd");
                    const dayEvents = datedEvents[dateKey] || [];
                    const isToday = isSameDay(day, today);
                    const isCurrentMonth = isSameMonth(day, current);

                    return (
                        <div
                            key={day.toISOString()}
                            className={`
              group relative p-2 rounded-xl flex flex-col
              transition-all duration-300
              min-h-[90px] sm:min-h-[120px] lg:min-h-[140px]

              ${isCurrentMonth
                                ? "bg-[#070830]/80 backdrop-blur border border-[#1E2164]"
                                : "bg-[#000010] text-gray-600 border border-[#00003C]"
                            }

              ${isToday
                                ? "ring-2 ring-red-500 shadow-[0_0_15px_rgba(255,0,0,0.5)]"
                                : ""
                            }

              hover:scale-[1.02] hover:border-red-500
            `}
                            role="gridcell"
                            aria-label={`${
                                format(day, "EEEE, MMMM do yyyy")
                            }, ${dayEvents.length} event${dayEvents.length !== 1 ? "s" : ""}`}
                        >
                            <div className="text-xs sm:text-sm font-semibold mb-1 flex justify-between items-center">
                                <span>{format(day, "d")}</span>
                                {isToday && (
                                    <span
                                        className="text-[10px] text-red-500"
                                        aria-label="Today"
                                    >
                  Today
                </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-1 overflow-hidden">
                                {dayEvents.slice(0, 2).map((event, idx) => (
                                    <Link
                                        key={idx}
                                        href={`/event/${event.id}`}
                                        aria-label={`${event.homeTeam} vs ${event.awayTeam}, status: ${event.status}`}
                                    >
                                        <div
                                            className={`
                      text-[10px] sm:text-xs px-2 py-[3px] rounded-md truncate
                      transition-all duration-200
                      ${event.status === "played"
                                                ? "bg-[#00003C] text-gray-400"
                                                : "bg-red-600/90 hover:bg-red-500 text-white"
                                            }
                    `}
                                        >
                                            {event.homeTeam} vs {event.awayTeam}
                                        </div>
                                    </Link>
                                ))}

                                {dayEvents.length > 2 && (
                                    <div
                                        className="text-[10px] text-gray-500 mt-1"
                                        aria-label={`plus ${dayEvents.length - 2} more events`}
                                    >
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