import { create } from 'zustand';
import { Event, getEvents } from '@/types/event';

type EventStore = {
    events: Event[];
    loadEvents: () => void;
    addEvent: (event: Event) => void;
    deleteEvent: (id: number) => void;
};

export const useEventStore = create<EventStore>((set) => ({
    events: [],

    loadEvents: () => {
        const base = getEvents();
        const stored = JSON.parse(sessionStorage.getItem('events') || '[]');

        //without the merge logic I have duplicates
        const merged = [...base, ...stored].filter(
            (event, index, self) =>
                index === self.findIndex((e) => e.id === event.id)
        );

        set({ events: merged });
    },

    addEvent: (event) => {
        set((state) => {
            const updated = [...state.events, event];
            sessionStorage.setItem('events', JSON.stringify(updated));
            return { events: updated };
        });
    },

    deleteEvent: (id) => {
        set((state) => {
            const updated = state.events.filter((e) => e.id !== id);
            sessionStorage.setItem('events', JSON.stringify(updated));
            return { events: updated };
        });
    },

}));