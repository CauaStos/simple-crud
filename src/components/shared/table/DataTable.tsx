"use client";

import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Table } from "../../ui/table";
import { Separator } from "../../ui/separator";
import { useQueryParam } from "@/hooks/use-query-param";
import DataTableHeader from "./DataTableHeader";
import DataTableBody from "./DataTableBody";
import DataTableToolbar from "./DataTableToolbar";
import DataTableNav from "./DataTableNav";
import DataTableSummary from "./DataTableSummary";

interface DataTableProps<TData, TValue> {
    tableName: string;
    tableDescription?: string;
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pageSize: number;
    pageCount: number;
    rowCount: number;
    actions?: React.ReactNode;
}

export default function DataTable<TData, TValue>({
    tableName,
    tableDescription,
    columns,
    data,
    pageSize,
    pageCount,
    rowCount,
    actions,
}: DataTableProps<TData, TValue>) {
    const [page, setPage] = useQueryParam<number>("page", {
        parse: (v) => Number(v) || 1,
    });

    const [search, setSearch] = useQueryParam<string | null>("search", {
        parse: (v) => v,
        debounceMs: 250,
        resetPageOnChange: true,
    });

    const [sort, setSort] = useQueryParam<string | null>("sort", {
        parse: (v) => v,
        resetPageOnChange: true,
    });

    // eslint-disable-next-line
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        defaultColumn: {},
        manualPagination: true,
        state: {
            pagination: {
                pageIndex: page - 1,
                pageSize,
            },
        },
        pageCount,
    });

    const headers = table.getHeaderGroups();
    const rows = table.getRowModel().rows;

    return (
        <div className="w-[95%] mid:w-[80%] max-w-300 mx-auto mt-8 space-y-4">
            <DataTableSummary
                tableName={tableName}
                tableDescription={tableDescription}
            />
            <DataTableToolbar
                search={search}
                setSearch={setSearch}
                rowCount={rowCount}
            >
                {actions}
            </DataTableToolbar>
            <div className="w-full min-h-80 border border-border shadow-sm rounded-md">
                <Table>
                    <DataTableHeader
                        headers={headers}
                        sort={sort}
                        setSort={setSort}
                    />
                    <DataTableBody
                        rows={rows}
                        columns={columns}
                        pageSize={pageSize}
                    />
                </Table>
                <Separator />
                <DataTableNav
                    page={page}
                    pageCount={pageCount}
                    setPage={setPage}
                />
            </div>
        </div>
    );
}
