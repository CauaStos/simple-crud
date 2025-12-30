import AdminSidebar from "@/components/shared/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <main className="flex flex-1">{children}</main>
        </SidebarProvider>
    );
}
