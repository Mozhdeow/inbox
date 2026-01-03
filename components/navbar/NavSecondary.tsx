"use client"

import * as React from "react"
import { type Icon } from "@tabler/icons-react"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import {cn} from "@/lib/utils";
import Link from "next/link";
import {usePathname} from "next/navigation";

export function NavSecondary({
                                 items,
                                 ...props
                             }: {
    items: {
        title: string
        url: string
        icon: Icon
    }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {

    const path = usePathname()

    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <Link href={item.url}>
                                <SidebarMenuButton tooltip={item.title} size='lg'
                                                   className={`rounded-none transition-colors duration-200 cursor-pointer 
                                         ${path === item.url ? " border-l-4 border-l-primary font-semibold  bg-primary/15" : ''}`}>
                                    {item.icon && <item.icon
                                        className={` !size-[18px] ${path === item.url ? "text-primary" : ""}`}
                                    />}
                                    <p className='text-base'>{item.title}</p>

                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
