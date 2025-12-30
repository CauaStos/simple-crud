import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, Header, HeaderGroup } from "@tanstack/react-table";
import {
    ArrowDownIcon,
    ArrowUpDownIcon,
    ArrowUpIcon,
} from "lucide-react";

interface DataTableHeaderProps<TData> {
    headers: HeaderGroup<TData>[];
    sort: string | null;
    setSort: (filter: string | null) => void;
}

export default function DataTableHeader<TData>({
    headers,
    sort,
    setSort,
}: DataTableHeaderProps<TData>) {
    const handleSort = (header: Header<TData, unknown>) => {
        if (!header.column.getCanSort()) return;

        const columnId = header.id;
        const [sortedColumn, sortTarget] = sort
            ? sort.split(":")
            : [null, null];

        if (sortedColumn !== columnId) {
            setSort(`${columnId}:asc`);
        } else if (sortTarget === "asc") {
            setSort(`${columnId}:desc`);
        } else {
            setSort(null);
        }
    };

    const getSortIcon = (columnId: string) => {
        const [currentCol, currentDir] = (sort || "").split(":");

        if (currentCol !== columnId)
            return <ArrowUpDownIcon className="w-4 h-4" />;

        return currentDir === "asc" ? (
            <ArrowDownIcon className="w-4 h-4" />
        ) : (
            <ArrowUpIcon className="w-4 h-4" />
        );
    };

    return (
        <TableHeader>
            {headers.map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        const isSortable = header.column.getCanSort();

                        return (
                            <TableHead
                                key={header.id}
                                className="text-center min-w-0"
                                onClick={() => handleSort(header)}
                            >
                                {header.isPlaceholder ? null : (
                                    <div className="flex items-center justify-center gap-1">
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                        {isSortable && getSortIcon(header.id)}
                                    </div>
                                )}
                            </TableHead>
                        );
                    })}
                </TableRow>
            ))}
        </TableHeader>
    );
}
