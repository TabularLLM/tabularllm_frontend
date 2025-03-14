import { cookies } from "next/headers"

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <main className="h-full">
          <div className="text-[#BEBEBE] text-[22px] font-bold w-full py-[15px] px-5">TabularLLM</div>
          {children}
        </main>  
      </SidebarInset>
    </SidebarProvider>
  )
}

