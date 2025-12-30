import prisma from "@/lib/prisma";
import filteredPaginate from "@/lib/pagination/filteredPaginate";
import UserTable from "@/features/users/components/table/UserTable";

const PAGE_SIZE = 10;

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;

    const tableName = "Usuario";

    const {
        items: users,
        pageCount,
        rowCount,
    } = await filteredPaginate(
        prisma.user,
        ["name", "email"],
        params,
        10,
        "id",
        tableName,
    );

    return (
        <div className="flex flex-1 justify-center items-center">
            <UserTable
                users={users}
                pageSize={PAGE_SIZE}
                pageCount={pageCount}
                rowCount={rowCount}
            />
        </div>
    );
}
