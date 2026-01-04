'use client'

import {useEffect, useState} from "react";
import {Ticket} from "@/lib/tickets/types";
import {Loader} from "@/components/Loader";
import {TicketsList} from "@/components/tickets/TicketsList";
import {getTickets} from "@/lib/tickets/api";

function Page() {
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setIsLoading(true)
            setError(null)
            try {
                const tickets = await getTickets()
                if (!cancelled) setTickets(tickets)
            } catch (e: unknown) {
                if (!cancelled) {
                    setError(e instanceof Error ? e.message : "tickets cannot be found.")
                }
            } finally {
                if (!cancelled) setIsLoading(false)
            }
        })()

        return () => {
            cancelled = true
        }
    }, [])

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
            <div className="mb-6">
                <h1 className="text-2xl font-semibold mb-2">Tickets</h1>
                <p className="text-muted-foreground">
                    Showing {tickets.length} tickets
                </p>
            </div>

            <TicketsList tickets={tickets}/>
        </div>
    );
}

export default Page;