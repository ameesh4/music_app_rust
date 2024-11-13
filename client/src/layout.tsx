import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import MusicBar from "./components/MusicBar"
import { Outlet } from "react-router-dom"
 
export default function Layout() {
  return (
    <>
      <SidebarProvider >
        <AppSidebar />
        <div className="w-screen">
          <MusicBar />
          <Outlet />
        </div>
      </SidebarProvider>
    </>
  )
}