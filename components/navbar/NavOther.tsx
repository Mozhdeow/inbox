"use client"

import {
    IconDots,
    type Icon,
} from "@tabler/icons-react"

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

export function NavOther({
                             items,
                         }: {
    items: {
        name: string
        url: string
        icon: Icon
        count: number
    }[]
}) {

    const path = usePathname()
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Other</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (


                    <SidebarMenuItem key={item.name}>
                        <Link href={item.url}>
                            <SidebarMenuButton tooltip={item.name} size='lg'
                                               className={`rounded-none transition-colors duration-200 cursor-pointer 
                                         ${path === item.url ? " border-l-4 border-l-primary font-semibold  bg-primary/15" : ''}`}>
                                {item.icon && <item.icon
                                    className={` !size-[18px] ${path === item.url ? "text-primary" : ""}`}
                                />}
                                <div className='flex justify-between w-full items-center'>
                                    <p className='text-base'>{item.name}</p>
                                    <p className={` text-muted-foreground
                                         ${path === item.url ? " bg-primary/80 px-2 py-0.5 rounded  text-white" : ''}`}>{item.count}</p>
                                </div>
                            </SidebarMenuButton>
                        </Link>

                    </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                    <SidebarMenuButton className="text-sidebar-foreground/70">
                        <IconDots className="text-sidebar-foreground/70"/>
                        <span>More</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    )
}
