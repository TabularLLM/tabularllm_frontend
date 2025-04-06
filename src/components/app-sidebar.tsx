"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"

import { useSidebar } from "@/components/ui/sidebar"

import { MdLogout } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import SidebarItemAction from "./SidebarItemAction"

interface AppSidebarProps{
    items: {
        id: number,
        insight_name: string
    }[]
}

export function AppSidebar({ items } : AppSidebarProps) {
    const { toggleSidebar } = useSidebar()

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
                                <Link href={`/upload`} className="flex w-full items-center gap-4 overflow-hidden rounded-md text-left pl-[7px] pr-2 text-sm outline-none mt-3 hover:bg-[#D9D9D9]/25">
                                    <div className="flex items-center justify-center h-[2rem] px-2 rounded-sm text-[#767676] bg-white border border-[#BEBEBE]">
                                        <FaPlus/>
                                    </div>
                                    <span className="font-bold text-[#767676] text-nowrap">
                                        Upload New Table
                                    </span>    
                                </Link>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarGroup>
                        <SidebarGroupLabel>Analyzed Tables</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu className="space-y-2">
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarItemAction id={item.id} insight_name={item.insight_name}/>   
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
  