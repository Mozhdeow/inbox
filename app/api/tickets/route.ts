import {NextResponse} from "next/server";
import {tickets} from "@/lib/tickets/data";

export async function GET() {
    try {
        return NextResponse.json({items: tickets});
    } catch (error) {
        return NextResponse.json(
            {error: "Failed to fetch tickets"},
            {status: 500}
        );
    }
}
