import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, Row } from "@tanstack/react-table";

interface DataTableBodyProps<TData, TValue> {
    rows: Row<TData>[];
    columns: ColumnDef<TData, TValue>[];
    pageSize: number;
}

export default function DataTableBody<TData, TValue>({
    rows,
    columns,
    pageSize,
}: DataTableBodyProps<TData, TValue>) {
    const hasData = rows.length > 0;

    const ghostRowCount = Math.max(
        0,
        hasData ? pageSize - rows.length : pageSize - 1,
    );

    return (
        <TableBody>
            {rows.map((row) => (
                <ContentRow key={row.id} row={row} />
            ))}

            {!hasData && <NoResults colSpan={columns.length} />}

            {Array.from({ length: ghostRowCount }).map((_, index) => (
                <GhostRow key={`ghost-${index}`} colSpan={columns.length} />
            ))}
        </TableBody>
    );
}

function NoResults({ colSpan }: { colSpan: number }) {
    return (
        <TableRow className="text-center h-13">
            <TableCell colSpan={colSpan}>Sem resultados.</TableCell>
        </TableRow>
    );
}

function GhostRow({ colSpan }: { colSpan: number }) {
    return (
        <TableRow className="h-13">
            <TableCell colSpan={colSpan} />
        </TableRow>
    );
}

function ContentRow<TData>({ row }: { row: Row<TData> }) {
    return (
        <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "Selected"}
            className="text-center h-13"
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="truncate max-w-20">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </TableRow>
    );
}
