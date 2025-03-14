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
import { FaPlus } from "react-icons/fa";

export function AppSidebar() {
    const { toggleSidebar, open } = useSidebar()

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={toggleSidebar} className="gap-[19px] my-2">
                            <div className={`flex items-center justify-center rounded-lg text-[#767676] transition-all duration-500`}>
                                <MdLogout size={24}/>
                            </div>
                            <span className="font-bold text-[#767676]">
                                Close Sidebar
                            </span>
                        </SidebarMenuButton>    
                    </SidebarMenuItem>    
                </SidebarMenu>
            </SidebarHeader>
                <SidebarSeparator />
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            <SidebarMenuItem className="cursor-pointer">
                                <div className="flex w-full items-center gap-4 overflow-hidden rounded-md text-left pl-[7px] pr-2 text-sm outline-none mt-3">
                                    <div className="flex items-center justify-center h-[2rem] px-2 rounded-sm text-[#767676] bg-white border border-[#BEBEBE]">
                                        <FaPlus/>
                                    </div>
                                    <span className="font-bold text-[#767676] text-nowrap">
                                        Upload New Table
                                    </span>    
                                </div>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarGroup>
                        <SidebarGroupLabel>Analyzed Tables</SidebarGroupLabel>
                    </SidebarGroup>
                </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
  