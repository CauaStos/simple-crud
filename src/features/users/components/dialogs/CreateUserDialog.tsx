import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { BaseDialogProps } from "@/types/ui";
import { createUser } from "../../actions";
import { toast } from "sonner";
import UserForm from "../forms/UserForm";

export default function CreateUserDialog({
    open,
    onOpenChange,
}: BaseDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle>Criar Usuário</DialogTitle>
                <UserForm
                    submitLabel="Criar Usuário"
                    onSubmit={async (data) => {
                        const result = await createUser(data);
                        if (result.successful) {
                            toast.success("Usuário Criado!");
                            onOpenChange(false);
                        } else {
                            toast.error(result.error);
                        }
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}
