'use client'

import {useState} from "react";
import {Ticket} from "@/lib/tickets/types";
import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Badge} from "@/components/ui/badge";
import {Loader2} from "lucide-react";

interface TicketDetailSidebarProps {
    ticket: Ticket;
    onUpdate?: (updates: Partial<Ticket>) => Promise<void> | void;
    isUpdating?: boolean;
}

export function TicketDetailSidebar({ticket, onUpdate, isUpdating = false}: TicketDetailSidebarProps) {
    const [pendingUpdates, setPendingUpdates] = useState<Partial<Ticket>>({});
    const handleStatusChange = (value: string) => {
        setPendingUpdates(prev => ({...prev, status: value as Ticket["status"]}));
    };

    const handleUpdateClick = async () => {
        if (Object.keys(pendingUpdates).length === 0) return;

        if (onUpdate) {
            await onUpdate(pendingUpdates);
            setPendingUpdates({});
        }
    };

    const currentStatus = pendingUpdates.status !== undefined ? pendingUpdates.status : ticket.status;

    return (
        <div className="w-full space-y-6 bg-sidebar">
            <div className="space-y-4">
                <div className="space-y-6 text-sm">
                    <div>
                        <Badge variant="destructive" className="text-xs">
                            ID #{ticket.id}
                        </Badge>
                    </div>
                    <div>
                        <p className="text-muted-foreground mb-1">Subject</p>
                        <p className="font-medium">{ticket.title}</p>
                    </div>
                </div>
            </div>

            {/* Requester */}
            <div className="space-y-4">
                <div className="space-y-3 text-sm">
                    <div>
                        <p className="text-muted-foreground mb-1">Requester</p>
                        <p className="font-medium">{ticket.userName}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground mb-1">Email</p>
                        <p className="font-medium">{ticket.email}</p>
                    </div>
                </div>
            </div>

            {/* Properties */}
            <div className="space-y-4">
                <h3 className="font-semibold text-sm">Properties</h3>
                <div className="space-y-3">

                    <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Status</label>
                        <Select
                            value={currentStatus}
                            onValueChange={handleStatusChange}
                            disabled={isUpdating}
                        >
                            <SelectTrigger>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="open">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-green-500"/>
                                        Open
                                    </div>
                                </SelectItem>
                                <SelectItem value="pending">
                                    <span className="h-2 w-2 rounded-full bg-yellow-500"/>
                                    Pending</SelectItem>
                                <SelectItem value="closed">
                                    <span className="h-2 w-2 rounded-full bg-rose-500"/>
                                    Closed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>


                </div>
            </div>

            <Button
                className="w-full"
                onClick={handleUpdateClick}
                disabled={isUpdating || Object.keys(pendingUpdates).length === 0}
            >
                {isUpdating ? (
                    <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin"/>
                        Updating...
                    </>
                ) : (
                    "Update"
                )}
            </Button>
        </div>
    );
}

