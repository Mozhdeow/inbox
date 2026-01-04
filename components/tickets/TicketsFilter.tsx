"use client";

import {Input} from "@/components/ui/input";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import type {TicketSort, TicketStatusFilter} from "@/hooks/useTicketQuery";
import {Button} from "@/components/ui/button";

interface Props {
    q: string;
    status: TicketStatusFilter;
    sort: TicketSort;
    onQChange: (v: string) => void;
    onStatusChange: (v: TicketStatusFilter) => void;
    onSortChange: (v: TicketSort) => void;
    onClear: () => void;
    hasActiveFilters: boolean;
}

export function TicketsFilter({
                                  q,
                                  status,
                                  sort,
                                  onQChange,
                                  onStatusChange,
                                  onSortChange,
                                  onClear,
                                  hasActiveFilters,

                              }: Props) {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:max-w-md">
                <Input
                    value={q}
                    onChange={(e) => onQChange(e.target.value)}
                    placeholder="Search by title or requester name…"
                />
            </div>

            <div className="flex gap-3">
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        onClick={onClear}
                        className="text-muted-foreground hover:text-white hover:bg-rose-500"
                    >
                        Clear filters
                    </Button>
                )}

                <Select value={status} onValueChange={(v) => onStatusChange(v as TicketStatusFilter)}>
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Status"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={sort} onValueChange={(v) => onSortChange(v as TicketSort)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
