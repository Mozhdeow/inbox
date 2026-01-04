import {NextResponse} from "next/server";
import {tickets} from "@/lib/tickets/data";

export async function GET(
    request: Request,
    {params}: { params: Promise<{ id: string }> }
) {
    try {
        const {id} = await params;
        const ticket = tickets.find((t) => t.id === id);
        
        if (!ticket) {
            return NextResponse.json(
                {error: "Ticket not found"},
                {status: 404}
            );
        }
        
        return NextResponse.json({items: ticket});
    } catch (error) {
        return NextResponse.json(
            {error: "Failed to fetch ticket"},
            {status: 500}
        );
    }
}

