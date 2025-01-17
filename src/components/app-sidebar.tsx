"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar"

import { MdLogout } from "react-icons/md";

export function AppSidebar() {
    const { toggleSidebar, open } = useSidebar()

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuButton onClick={toggleSidebar} className="">
                        <div className={`flex h-[2em] ${!open && 'p-[6px]'} items-center justify-center rounded-lg text-[#767676]`}>
                            <MdLogout size={24}/>
                        </div>
                        <span className="font-semibold">
                            Close Sidebar
                        </span>
                    </SidebarMenuButton>
                </SidebarMenu>
            </SidebarHeader>
                <SidebarSeparator />
                <SidebarContent>
                    <SidebarGroup>
                        
                    </SidebarGroup>
                    <SidebarGroup>
                        <SidebarGroupLabel>Analyzed Tables</SidebarGroupLabel>
                    </SidebarGroup>
                </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
  