import prisma from "@/lib/prisma";
import filteredPaginate, {
    DEFAULT_SORT,
} from "@/lib/pagination/filteredPaginate";
import CampaignTable from "@/features/campaigns/components/table/CampaignTable";

const PAGE_SIZE = 10;

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;

    const {
        items: campaigns,
        pageCount,
        rowCount,
    } = await filteredPaginate(
        prisma.campaign,
        ["name", "description"],
        params,
        PAGE_SIZE,
        DEFAULT_SORT,
        "Campanha",
    );

    return (
        <div className="flex flex-1 justify-center items-center">
            <CampaignTable
                campaigns={campaigns}
                pageSize={PAGE_SIZE}
                pageCount={pageCount}
                rowCount={rowCount}
            />
        </div>
    );
}
