import Link from "next/link";

export default function Nav(){
    return(
        <nav className="h-full flex flex-col justify-between p-2">
            <div className="flex flex-col ">
                <Link href="/">Calender</Link>
                <Link href="/event">Events</Link>
                <Link href="/event/new-event">Add Event</Link>
            </div>

        </nav>
    )
}