import { ColumnDef } from "@tanstack/react-table";
import UserRowActions from "./UserRowActions";
import { User } from "@db";

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Nome",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "createdAt",
        header: "Criado Em",
        cell: ({ row }) => {
            const user = row.original;

            const formatted = user.createdAt.toLocaleString("pt-BR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            });

            return <div>{formatted}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original;

            return <UserRowActions user={user} />;
        },
        enableSorting: false,
    },
];
