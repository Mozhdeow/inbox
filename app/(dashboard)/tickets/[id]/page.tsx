'use client'

import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {Loader} from "@/components/Loader";
import {getTicketById} from "@/lib/tickets/api";
import {Ticket, Message} from "@/lib/tickets/types";
import {MessageThread} from "@/components/tickets/MessageThread";
import {TicketDetailSidebar} from "@/components/tickets/TicketDetailSidebar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Menu} from "lucide-react";
import Link from "next/link";
import {saveTicketUpdate, applyTicketUpdates} from "@/lib/tickets/storage";

export default function TicketDetailPage() {
    const params = useParams();
    const ticketId = params.id as string;

    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const ticketData = await getTicketById(ticketId);
                const ticketWithUpdates = applyTicketUpdates(ticketData);
                setTicket(ticketWithUpdates);

                setMessages([
                    {
                        id: "1",
                        ticketId: ticketId,
                        senderName: "Mitchel Marsh",
                        senderEmail: "mitchel22@gmail.com",
                        recipientEmail: "supportidealoop",
                        content: `Hello support,
I'm having trouble adding payment methods to my account. I've tried multiple times but keep getting an error message.
Also, I'd like to introduce you to David Boyd, who is interested in a Creative Director position. We worked together at Apple company and I believe he would be a great fit for your team.`,

                    },
                ]);
            } catch (e: any) {
                setError(e?.message ?? "Failed to load ticket");
            } finally {
                setIsLoading(false);
            }
        })();
    }, [ticketId]);


    const handleUpdate = async (updates: Partial<Ticket>) => {
        if (ticket) {
            setIsUpdating(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));

                const updatedTicket = {...ticket, ...updates};
                setTicket(updatedTicket);

                saveTicketUpdate(ticketId, updates);
            } catch (error) {
                console.error("Failed to update ticket:", error);
            } finally {
                setIsUpdating(false);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader/>
            </div>
        );
    }

    if (error || !ticket) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg text-red-600">{error || "Ticket not found"}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                {/* Header */}
                <div className="border-b bg-background px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Link href="/tickets" className="hover:text-foreground">
                                tickets
                            </Link>
                            <span>/</span>
                            <span className="text-foreground">Ticket details</span>
                        </div>
                        {/* Mobile Sidebar Toggle */}
                        <Sheet>
                            <SheetTrigger asChild className="lg:hidden">
                                <Button variant="outline" size="icon-sm">
                                    <Menu className="h-4 w-4"/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[85vw] sm:w-[400px] overflow-y-auto p-8 bg-sidebar">
                                <TicketDetailSidebar ticket={ticket} onUpdate={handleUpdate} isUpdating={isUpdating}/>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
                    <div className="mb-6">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                            <h1 className="text-xl sm:text-2xl font-semibold break-words">{ticket.title}</h1>
                            <Badge variant="destructive" className="text-xs">ID #{ticket.id}</Badge>
                        </div>
                    </div>

                    {/* Message Thread */}
                    <MessageThread messages={messages}/>
                </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-80 border-l p-6 overflow-y-auto bg-sidebar">
                <TicketDetailSidebar ticket={ticket} onUpdate={handleUpdate} isUpdating={isUpdating}/>
            </div>
        </div>
    );
}
