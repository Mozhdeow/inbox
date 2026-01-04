"use client";

import {useEffect, useMemo, useState} from "react";
import type {Ticket} from "@/lib/tickets/types";
import {Loader} from "@/components/Loader";
import {TicketsList} from "@/components/tickets/TicketsList";
import {getTickets} from "@/lib/tickets/api";
import {TicketsFilter} from "@/components/tickets/TicketsFilter";
import {useTicketQuery} from "@/hooks/useTicketQuery";

const PINNED_KEY = "tickets:pinned";
type PinnedMap = Record<string, boolean>;


function Page() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pinnedMap, setPinnedMap] = useState<PinnedMap>({});

    useEffect(() => {
        try {
            const raw = localStorage.getItem(PINNED_KEY);
            if (raw) setPinnedMap(JSON.parse(raw));
        } catch {
        }
    }, []);

    const togglePin = (id: string) => {
        setPinnedMap((prev) => {
            const next = {...prev, [id]: !prev[id]};
            if (!next[id]) delete next[id];
            try {
                localStorage.setItem(PINNED_KEY, JSON.stringify(next));
            } catch {
            }
            return next;
        });
    };

    const isPinned = (id: string) => !!pinnedMap[id];

    const {q, status, sort, setParams, clearFilters} = useTicketQuery();

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setIsLoading(true);
            setError(null);
            try {
                const t = await getTickets();
                if (!cancelled) setTickets(t);
            } catch (e: unknown) {
                if (!cancelled) setError(e instanceof Error ? e.message : "tickets cannot be found.");
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    const filtered = useMemo(() => {
        const query = q.trim().toLowerCase();
        let out = tickets;

        if (query) {
            out = out.filter(
                (t) =>
                    t.title.toLowerCase().includes(query) ||
                    t.userName.toLowerCase().includes(query)
            );
        }

        if (status !== "all") {
            out = out.filter((t) => t.status === status);
        }

        out = [...out].sort((a, b) => {
            const da = new Date(a.createdAt).getTime();
            const db = new Date(b.createdAt).getTime();
            return sort === "newest" ? db - da : da - db;
        });

        const pinned: typeof out = [];
        const normal: typeof out = [];
        for (const t of out) (isPinned(t.id) ? pinned : normal).push(t);

        return [...pinned, ...normal];
    }, [tickets, q, status, sort, pinnedMap]);

    const hasActiveFilters =
        q.length > 0 || status !== "all" || sort !== "newest";


    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg"><Loader/></p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg text-red-600">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-2">
                <h1 className="text-2xl font-semibold">Tickets</h1>
                <p className="text-muted-foreground">Showing {filtered.length} tickets</p>
            </div>

            <TicketsFilter
                q={q}
                status={status}
                sort={sort}
                onQChange={(v) => setParams({q: v}, {resetPage: true})}
                onStatusChange={(v) => setParams({status: v}, {resetPage: true})}
                onSortChange={(v) => setParams({sort: v}, {resetPage: true})}
                hasActiveFilters={hasActiveFilters}
                onClear={clearFilters}
            />

            <TicketsList tickets={filtered}
                         isPinned={isPinned}
                         onTogglePin={togglePin}/>
        </div>
    );
}

export default Page;
