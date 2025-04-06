import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { cookies } from "next/headers"
import prisma from '@/lib/prisma'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"
  const items = await prisma.analysis_insights.findMany(
    {
        select: {
            id: true,
            insight_name: true
        }
    }
  )

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar items={items}/>
      <SidebarInset>
        <main className="flex flex-col h-full">
          <div className="text-[#BEBEBE] text-[20px] font-bold w-full py-[17px] px-7">TabularLLM</div>
          {children}
        </main>  
      </SidebarInset>
    </SidebarProvider>
  )
}

