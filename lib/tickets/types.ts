export type TicketStatus = "open" | "pending" | "closed";
export type TicketPriority = "low" | "medium" | "high";

export type Message = {
    id: string;
    ticketId: string;
    senderName: string;
    senderEmail: string;
    recipientEmail?: string;
    content: string;
    avatar?: string;
};

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
