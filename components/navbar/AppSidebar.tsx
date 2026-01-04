"use client"

import * as React from "react"
import {
    IconAlertCircle,
    IconArchive,
    IconClock,
    IconHelp, IconInbox,
    IconLoader3,
    IconNotes,
    IconSend,
    IconSettings, IconStar, IconTrash,
} from "@tabler/icons-react"
import {NavMain} from '@/components/navbar/NavMain'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import {NavUser} from "@/components/navbar/NavUser";
import {NavSecondary} from "@/components/navbar/NavSecondary";
import {NavOther} from "@/components/navbar/NavOther";
import avatar from "@/public/avatar.png"
import {Separator} from "@/components/ui/separator";
import Link from "next/link";

const data = {
    user: {
        name: "Mozhdeow",
        email: "m@example.com",
        avatar: avatar,
    },

    navMain: [
        {
            title: "Inbox",
            url: "/tickets",
            icon: IconInbox,
            count: 24,
        },
        {
            title: "Important",
            url: "#",
            icon: IconStar,
            count: 6,
        },
        {
            title: "Snoozed",
            url: "#",
            icon: IconClock,
            count: 5,
        },
        {
            title: "Sent",
            url: "#",
            icon: IconSend,
            count: 12,
        },
        {
            title: "Draft",
            url: "#",
            icon: IconNotes,
            count: 2,
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: IconSettings,
        },
        {
            title: "Get Help",
            url: "#",
            icon: IconHelp,
        },
    ],

    other: [
        {
            name: "Archived",
            url: "/#",
            icon: IconArchive,
            count: 18,
        },
        {
            name: "Spam",
            url: "#",
            icon: IconAlertCircle,
            count: 1,
        },
        {
            name: "Trash",
            url: "#",
            icon: IconTrash,
            count: 3,
        },
    ],
};


export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>

                <Link href="/" className='flex gap-3 items-center p-2'>
                    <IconLoader3 className="!size-8 text-primary"/>
                    <span className="sm:text-xl text-lg font-semibold">Inbox</span>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain}/>
                <Separator/>
                <NavOther items={data.other}/>
                <NavSecondary items={data.navSecondary} className="mt-auto"/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user}/>
            </SidebarFooter>
        </Sidebar>
    )
}
