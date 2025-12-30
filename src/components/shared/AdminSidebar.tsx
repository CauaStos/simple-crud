"use client";

import { Flag, LucideIcon, UsersRound } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { Route } from "next";

type SidebarRoute = {
    title: string;
    path: Route;
    icon: LucideIcon;
};

const routes: SidebarRoute[] = [
    {
        title: "Usuários",
        path: "/admin/usuarios",
        icon: UsersRound,
    },
    {
        title: "Campanhas",
        path: "/admin/campanhas",
        icon: Flag,
    },
];

export default function AdminSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Admin</SidebarGroupLabel>
                    <SidebarGroupContent>
                        {routes.map((route) => (
                            <SidebarMenuItem key={route.path}>
                                <SidebarMenuButton asChild>
                                    <Link href={route.path}>
                                        <route.icon />
                                        <span>{route.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
