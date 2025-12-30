"use client";

import { User } from "@db";
import DataTable from "@/components/shared/table/DataTable";
import UserToolbarActions from "./UserToolbarActions";
import { columns } from "./UserColumns";
import UserDialogManager from "../UserDialogManager";

interface UsersTableProps {
    users: User[];
    pageSize: number;
    pageCount: number;
    rowCount: number;
}

export default function UserTable({
    users,
    pageSize,
    pageCount,
    rowCount,
}: UsersTableProps) {
    return (
        <>
            <DataTable
                tableName="Usuários"
                columns={columns}
                data={users}
                pageSize={pageSize}
                pageCount={pageCount}
                rowCount={rowCount}
                actions={<UserToolbarActions />}
            />
            <UserDialogManager />
        </>
    );
}
