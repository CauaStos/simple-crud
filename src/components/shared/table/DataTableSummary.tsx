import { Separator } from "@/components/ui/separator";

interface DataTableSummaryProps {
    tableName: string;
    tableDescription?: string;
}

export default function DataTableSummary({
    tableName,
    tableDescription,
}: DataTableSummaryProps) {
    return (
        <div className="flex flex-row items-center gap-2">
            <h4 className="text-xl font-semibold tracking-tight">
                {tableName}
            </h4>
            {tableDescription && (
                <>
                    <div className="h-5">
                        {/* annoying fix */}
                        <Separator orientation="vertical" />
                    </div>
                    <h4 className="text-sm text-muted-foreground font-medium translate-y-[0.25px]">
                        {tableDescription}
                    </h4>
                </>
            )}
        </div>
    );
}
