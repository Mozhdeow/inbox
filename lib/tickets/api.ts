import {Ticket} from "@/lib/tickets/types";
import {api} from "@/app/api/client";

export async function getTickets() {
    const {data} = await api.get<{ items: Ticket[] }>("/tickets");
    return data.items;
}

export async function getTicketById(id: string) {
    const {data} = await api.get<{ items: Ticket }>(`/tickets/${id}`);
    return data.items;
}

