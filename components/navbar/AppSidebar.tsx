"use client"

import * as React from "react"
import {
    IconAlertCircle,
    IconArchive,
    IconClock,
    IconHelp, IconInbox,
    IconInnerShadowTop, IconLoader3,
    IconNotes,
    IconSearch, IconSend,
    IconSettings, IconStar, IconTrashX,
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
            url: "/tickets?view=pinned",
            icon: IconStar,
            count: 6,
        },
        {
            title: "Snoozed",
            url: "/tickets?status=pending",
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
            url: "/tickets?status=closed",
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
            icon: IconTrashX,
            count: 3,
        },
    ],
};


export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="#">
                                <IconLoader3 className="!size-8 text-primary"/>
                                <span className="text-lg font-semibold">Inbox</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
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
