"use client";

import Link from "next/link";
import {Calendar, CalendarDays, PlusCircle, Menu, X, ChevronRight, ChevronLeft, Dot} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
    const pathname = usePathname();

    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const linkStyle = (path: string) =>
        `nav-link ${pathname === path ? "nav-active" : ""}`;

    const NavContent = ({ isMobile = false }: { isMobile?: boolean }) => (
        <div className="h-full flex flex-col justify-between p-4 glass border-r border-[#1E2164]">

            <div>
                <div className="flex items-center justify-between mb-6">
                    {!collapsed && (
                        <span className="text-2xl font-bold text-red-500">Eventmatic</span>
                        //couldn't find a more original name
                    )}

                    {!isMobile && (
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="p-2 hover:bg-[#1E2164] rounded-lg transition"
                            aria-label="Colaps Nav/Open Nav"
                        >
                            {collapsed ? <ChevronRight/> : <ChevronLeft/>}
                        </button>
                    )}
                    {isMobile && (
                        <button onClick={() => setMobileOpen(false)}
                                aria-label="Close Nav">
                            <X />
                        </button>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <Link href="/" className={linkStyle("/")}>
                        <Calendar className="icon" />
                        {!collapsed && <span>Calendar</span>}
                    </Link>

                    <Link href="/event" className={linkStyle("/event")}>
                        <CalendarDays className="icon" />
                        {!collapsed && <span>Events</span>}
                    </Link>

                    <Link href="/event/new-event" className={linkStyle("/event/new-event")}>
                        <PlusCircle className="icon" />
                        {!collapsed && <span>Add Event</span>}
                    </Link>
                </div>
            </div>

            {!collapsed && (
                <div className="text-xs text-gray-400">
                    © {new Date().getFullYear()} Eventmatic  <br/>   Made by <a href="https://github.com/roryTheGnome">Gnome</a>
                </div>
            )}
        </div>
    );

    return (
        <>
            <div className="md:hidden fixed top-0 left-0 w-full h-14 flex items-center justify-between px-4 bg-[#070830] border-b border-[#1E2164] z-50">
                <span className="text-lg font-bold text-red-500">Eventmatic</span>

                <button onClick={() => setMobileOpen(true)}
                        aria-label="Open Nav">
                    <Menu />
                </button>
            </div>

            <motion.nav
                animate={{ width: collapsed ? 80 : 256 }}
                className="hidden md:block fixed left-0 top-0 h-screen">
                <NavContent />
            </motion.nav>

            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                        />

                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 260, damping: 25 }}
                            className="fixed left-0 top-0 h-full w-64 z-50"
                        >
                            <NavContent isMobile />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}