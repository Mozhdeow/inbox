'use client'

import {Ticket} from "@/lib/tickets/types";
import {TicketCard} from "./TicketCard";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {useSearchParams, useRouter, usePathname} from "next/navigation";
import {useEffect} from "react";

interface TicketsListProps {
    tickets: Ticket[];
    itemsPerPage?: number;
    isPinned: (id: string) => boolean;
    onTogglePin: (id: string) => void;
}

export function TicketsList({tickets, itemsPerPage = 10,isPinned,onTogglePin}: TicketsListProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const pageParam = searchParams.get('page');
    const currentPage = pageParam ? Math.max(1, parseInt(pageParam, 10) || 1) : 1;

    const totalPages = Math.ceil(tickets.length / itemsPerPage);
    const validPage = Math.min(currentPage, Math.max(1, totalPages || 1));
    const startIndex = (validPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTickets = tickets.slice(startIndex, endIndex);


    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (page === 1) {
            params.delete('page');
        } else {
            params.set('page', page.toString());
        }
        router.push(`${pathname}?${params.toString()}`, {scroll: false});
        if (page !== validPage) {
            window.scrollTo({top: 0, behavior: "smooth"});
        }
    };

    useEffect(() => {
        if (currentPage !== validPage) {
            handlePageChange(validPage);
        }
    }, [currentPage, validPage]);

    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (page === 1) {
            params.delete('page');
        } else {
            params.set('page', page.toString());
        }
        return `${pathname}?${params.toString()}`;
    };

    return (
        <>
            <div className="mb-8 border rounded-lg overflow-hidden bg-background">
                {currentTickets.length > 0 ? (
                    currentTickets.map((ticket: Ticket) => (
                            <TicketCard ticket={ticket} key={ticket.id}
                            onClick={()=>router.push(`/tickets/${ticket.id}`)}
                            isPinned={isPinned(ticket.id)}
                            onTogglePin={onTogglePin}/>
                    ))
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        No tickets found
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href={validPage > 1 ? createPageUrl(validPage - 1) : '#'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (validPage > 1) {
                                        handlePageChange(validPage - 1);
                                    }
                                }}
                                className={validPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-primary/25'}
                            />
                        </PaginationItem>

                        {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => {
                            if (page === 1 || page === totalPages || (page >= validPage - 1 && page <= validPage + 1)) {
                                return (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            href={createPageUrl(page)}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handlePageChange(page);
                                            }}
                                            isActive={validPage === page}
                                            className={`hover:bg-primary/25 ${validPage === page ? "bg-primary text-white" :""}`}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            } else if (page === validPage - 2 || page === validPage + 2) {
                                return (
                                    <PaginationItem key={page}>
                                        <PaginationEllipsis/>
                                    </PaginationItem>
                                );
                            }
                            return null;
                        })}

                        <PaginationItem>
                            <PaginationNext
                                href={validPage < totalPages ? createPageUrl(validPage + 1) : '#'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (validPage < totalPages) {
                                        handlePageChange(validPage + 1);
                                    }
                                }}
                                className={` ${validPage === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-primary/25'}`}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </>
    );
}

