import {ArrowDown, ArrowUp, ArrowUpDown} from "lucide-react";
import React from "react";
import {SortKey} from "@/types/event";

export function SortHeader({
                        label,
                        sortKeyValue,
                        sortKey,
                        sortDir,
                        handleSort,
                    }: {
    label: string;
    sortKeyValue: SortKey;
    sortKey: SortKey;
    sortDir: "asc" | "desc";
    handleSort: (key: SortKey) => void;
}) {
    const isActive = sortKey === sortKeyValue;

    return (
        <th
            onClick={() => handleSort(sortKeyValue)}
            className="p-3 cursor-pointer select-none text-white font-semibold"
            scope="col"
            aria-sort={
                isActive ? (sortDir === "asc" ? "ascending" : "descending") : "none"
            }
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleSort(sortKeyValue);
            }}
        >
            <div className="flex items-center gap-1">
                {label}
                {isActive ? (
                    sortDir === "asc" ? (
                        <ArrowUp size={16} aria-hidden="true" />
                    ) : (
                        <ArrowDown size={16} aria-hidden="true" />
                    )
                ) : (
                    <ArrowUpDown size={16} className="opacity-40" aria-hidden="true" />
                )}
            </div>
        </th>
    );
}