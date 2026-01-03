export type TicketStatus = "open" | "pending" | "closed";
export type TicketPriority = "low" | "medium" | "high";

export type Ticket = {
    id: string;
    title: string;
    userName: string;
    email: string;
    status: TicketStatus;
    priority: TicketPriority;
    createdAt: string;
    messagesCount: number;
};
