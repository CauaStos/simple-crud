"use client";

import { Campaign } from "@db";
import DataTable from "@/components/shared/table/DataTable";
import CampaignDialogManager from "../CampaignDialogManager";
import { columns } from "./CampaignColumns";
import CampaignToolbarActions from "./CampaignToolbarActions";

interface CampaignTableProps {
    campaigns: Campaign[];
    pageSize: number;
    pageCount: number;
    rowCount: number;
}

export default function CampaignTable({
    campaigns,
    pageSize,
    pageCount,
    rowCount,
}: CampaignTableProps) {
    return (
        <>
            <DataTable
                tableName="Campanhas"
                columns={columns}
                data={campaigns}
                pageSize={pageSize}
                pageCount={pageCount}
                rowCount={rowCount}
                actions={<CampaignToolbarActions />}
            />
            <CampaignDialogManager />
        </>
    );
}
