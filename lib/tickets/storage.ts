import {Ticket} from "@/lib/tickets/types";

const STORAGE_KEY = 'ticket_updates';

export interface TicketUpdates {
    [ticketId: string]: Partial<Ticket>;
}

export function getTicketUpdates(): TicketUpdates {
    if (typeof window === 'undefined') return {};
    
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return {};
    }
}

export function saveTicketUpdate(ticketId: string, updates: Partial<Ticket>): void {
    if (typeof window === 'undefined') return;
    
    try {
        const allUpdates = getTicketUpdates();
        const existingUpdates = allUpdates[ticketId] || {};
        allUpdates[ticketId] = {...existingUpdates, ...updates};
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allUpdates));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

export function getTicketUpdate(ticketId: string): Partial<Ticket> | null {
    const allUpdates = getTicketUpdates();
    return allUpdates[ticketId] || null;
}

export function applyTicketUpdates(ticket: Ticket): Ticket {
    const updates = getTicketUpdate(ticket.id);
    return updates ? {...ticket, ...updates} : ticket;
}

