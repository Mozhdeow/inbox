import {Sidebar, SidebarProvider} from "@/components/ui/sidebar";
import {SiteHeader} from "@/components/SiteHeader";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <Sidebar/>
                <SiteHeader/>
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </SidebarProvider>

    );
}
