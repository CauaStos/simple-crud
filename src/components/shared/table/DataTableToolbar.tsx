import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";

interface DataTableToolbarProps {
    search: string | null;
    setSearch: (query: string) => void;
    rowCount: number;
    children?: React.ReactNode;
}

export default function DataTableToolbar({
    search,
    setSearch,
    rowCount,
    children,
}: DataTableToolbarProps) {
    return (
        <div className="flex flex-1 gap-4">
            <InputGroup className="min-60 max-w-80">
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
                <InputGroupInput
                    placeholder="Pesquisar..."
                    defaultValue={search ?? ""}
                    onChange={(event) => {
                        setSearch(event.target.value);
                    }}
                />
                <InputGroupAddon align="inline-end">
                    <InputGroupText>{rowCount} resultados</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            {children}
        </div>
    );
}
