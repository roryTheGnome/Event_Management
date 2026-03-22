'use client'

import {getCalenderDayes} from "@/components/calender/calender-brain";
import {format, isSameMonth, isSameDay} from "date-fns";
import {Event} from '@/types/event';

type Props={events:Event[]};

export default function Calendar({ events }: Props) {
    const today = new Date();
    const days = getCalenderDayes(today);

    const hasEvent = (day: Date) => {
        return events.some((event) =>
            isSameDay(new Date(event.date), day)
        );
    };


    return (
        <div className="grid grid-cols-7 gap-2">
            {days.map((day) => (
                <div
                    key={day.toISOString()}
                    className={`p-2 border rounded h-24 ${
                        !isSameMonth(day, today) ? 'bg-gray-100' : ''
                    }`}
                >
                    <div className="text-sm">{format(day, 'd')}</div>

                    {hasEvent(day) && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />
                    )}
                </div>
            ))}
        </div>
    );
}