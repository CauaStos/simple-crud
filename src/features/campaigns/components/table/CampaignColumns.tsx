import { ColumnDef } from "@tanstack/react-table";
import { Campaign } from "@db";
import CampaignRowActions from "./CampaignRowActions";
import { CheckIcon, XIcon } from "lucide-react";

export const columns: ColumnDef<Campaign>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Nome",
    },

    {
        accessorKey: "createdAt",
        header: "Criado Em",
        cell: ({ row }) => {
            const campaign = row.original;

            const formatted = campaign.createdAt.toLocaleString("pt-BR", {
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
        accessorKey: "isActive",
        header: "Ativa",

        cell: ({ row }) => {
            const campaign = row.original;
            return campaign.isActive ? (
                <CheckIcon className="w-4 h-4 mx-auto" />
            ) : (
                <XIcon className="w-4 h-4 mx-auto" />
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const campaign = row.original;

            return <CampaignRowActions campaign={campaign} />;
        },
        enableSorting: false,
    },
];
