'use client'

import {useState} from "react";
import {Ticket} from "@/lib/tickets/types";
import {format} from "date-fns";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {cn} from "@/lib/utils";
import {Star, Archive, Trash2, Mail, Clock} from "lucide-react";
import {IconActivityHeartbeat, IconChartArrows} from "@tabler/icons-react";

interface TicketCardProps {
    ticket: Ticket;
    onClick?: () => void;
}

export function TicketCard({ticket, onClick}: TicketCardProps) {
    const [isChecked, setIsChecked] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const [showActions, setShowActions] = useState(false);

    const formattedDate = format(new Date(ticket.createdAt), "MMM d, yyyy, h:mma");

    const handleCheckboxChange = (checked: boolean) => {
        setIsChecked(checked);
    };

    const handlePinClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPinned(!isPinned);
    };



    return (
        <div
            className={cn(
                "group relative flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 sm:py-3 border-b cursor-pointer transition-colors",
                isChecked ? "bg-primary/35" : "hover:bg-primary/15"
            )}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
            onClick={onClick}
        >
            {/* Checkbox */}
            <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                    checked={isChecked}
                    onCheckedChange={handleCheckboxChange}
                    className="h-4 w-4 sm:h-5 sm:w-5"
                />
            </div>

            {/* Pin Button */}
            <Button
                variant="ghost"
                size="icon-sm"
                className={cn(
                    "flex-shrink-0 h-7 w-7 sm:h-8 sm:w-8 transition-opacity",
                    "hover:bg-sidebar-accent",
                    isPinned
                        ? "opacity-100"
                        : "opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                )}
                onClick={handlePinClick}
            >

            <Star
                    className={cn(
                        "h-3.5 w-3.5 sm:h-4 sm:w-4",
                        isPinned ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                    )}
                />
            </Button>

            {/* Ticket Content */}
            <div className="flex-1 min-w-0">
                {/* Status Line and Text */}
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <div
                        className={cn(
                            "w-4 h-0.5 sm:w-6 sm:h-1 rounded-full flex-shrink-0",
                            ticket.status === "open" && "bg-green-500",
                            ticket.status === "pending" && "bg-yellow-500",
                            ticket.status === "closed" && "bg-red-500"
                        )}
                    />
                    <span className="text-[10px] sm:text-xs font-medium text-muted-foreground capitalize flex">
                        {ticket.status} - priority {ticket.priority}
                    </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                    <h3 className="font-semibold text-xs sm:text-sm text-foreground truncate">
                        {ticket.title}
                    </h3>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-4 text-xs sm:text-sm">
                    <span className="text-muted-foreground truncate text-xs sm:text-sm">
                        {ticket.userName} ({ticket.email})
                    </span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground">
                        {formattedDate}
                    </span>
                </div>
            </div>

            {/* Action Icons */}
            <div
                className={cn(
                    "flex items-center gap-0.5 sm:gap-1 flex-shrink-0 transition-opacity",
                    "opacity-100 sm:transition-opacity",
                    showActions ? "sm:opacity-100" : "sm:opacity-0"
                )}
            >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-sidebar-accent"
                        >
                            <Archive className="h-3.5 w-3.5 sm:h-4 sm:w-4"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Archive ticket</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-sidebar-accent"
                        >
                            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Delete ticket</p>
                    </TooltipContent>
                </Tooltip>



                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            className="hidden sm:flex h-8 w-8 hover:bg-sidebar-accent"
                        >
                            <Mail className="h-4 w-4"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Mark as read</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            className="hidden sm:flex h-8 w-8 hover:bg-sidebar-accent"
                        >
                            <Clock className="h-4 w-4"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Snooze ticket</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
}

