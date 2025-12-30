import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useUserDialog } from "../UserDialogManager";

export default function UserToolbarActions() {
    const { openDialog } = useUserDialog();

    return (
        <>
            <Button
                onClick={() => {
                    openDialog("create");
                }}
            >
                <PlusIcon /> Novo Usuário
            </Button>
        </>
    );
}
