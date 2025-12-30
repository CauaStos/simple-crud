import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface DataTableNavProps {
    page: number;
    setPage: (page: number) => void;
    pageCount: number;
}

export default function DataTableNav({
    page,
    setPage,
    pageCount,
}: DataTableNavProps) {
    return (
        <div className="flex items-center justify-end space-x-2 px-4 py-2">
            <Button variant="outline" className="hover:bg-transparent">
                {page} de {pageCount}
            </Button>
            <ButtonGroup>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1 ? true : false}
                >
                    <ArrowLeft />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage(page + 1)}
                    disabled={page >= pageCount ? true : false}
                >
                    <ArrowRight />
                </Button>
            </ButtonGroup>
        </div>
    );
}
