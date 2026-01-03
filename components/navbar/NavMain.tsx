"use client"

import {
    type Icon,
    IconSquareRoundedPlus
} from "@tabler/icons-react"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

export function NavMain({
                            items,
                        }: {
    items: {
        title: string
        url: string
        icon?: Icon
        count: number
    }[]
}) {

    const path = usePathname()

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-2 py-5">
                        <SidebarMenuButton
                            tooltip="New ticket" size='lg'
                            className="bg-primary text-base p-4 text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground
                             min-w-8 duration-200 ease-linear justify-between font-semibold"
                        >
                            <span>New ticket</span>
                            <IconSquareRoundedPlus style={{width: 20, height: 20}}/>

                        </SidebarMenuButton>

                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu className='gap-2'>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}
                        >
                            <Link href={item.url}>
                                <SidebarMenuButton tooltip={item.title} size='lg'
                                                   className={`rounded-none transition-colors duration-200 cursor-pointer 
                                         ${path === item.url ? " border-l-4 border-l-primary font-semibold  bg-primary/15" : ''}`}>
                                    {item.icon && <item.icon
                                        className={` !size-[18px] ${path === item.url ? "text-primary" : ""}`}
                                    />}
                                    <div className='flex justify-between w-full items-center'>
                                        <p className='text-base'>{item.title}</p>
                                        <p className={` text-muted-foreground
                                         ${path === item.url ? " bg-primary/80 px-2 py-0.5 rounded  text-white" : ''}`}>{item.count}</p>
                                    </div>
                                </SidebarMenuButton>
                            </Link>

                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
