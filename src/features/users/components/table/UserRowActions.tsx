"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit2Icon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { User } from "@db";
import { useUserDialog } from "../UserDialogManager";

interface UserRowActionsProps {
    user: User;
}

export default function UserRowActions({ user }: UserRowActionsProps) {
    const { openDialog } = useUserDialog();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Ações</span>
                    <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => openDialog("edit", user)}>
                    <Edit2Icon className="h-4 w-4" />
                    Modificar Dados
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => openDialog("delete", user)}
                >
                    <Trash2Icon className="h-4 w-4 text-destructive" />
                    Deletar Usuário
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
