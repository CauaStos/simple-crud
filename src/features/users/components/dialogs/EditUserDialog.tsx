import { User } from "@db";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { updateUser } from "../../actions";
import { BaseDialogProps } from "@/types/ui";
import UserForm from "../forms/UserForm";
import { toast } from "sonner";

interface EditUserDialogProps extends BaseDialogProps {
    user: User;
}

export default function EditUserDialog({
    user,
    open,
    onOpenChange,
}: EditUserDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle>Editar Usuário</DialogTitle>
                <UserForm
                    submitLabel="Editar Usuário"
                    defaultValues={user}
                    onSubmit={async (data) => {
                        const result = await updateUser(user.id, data);
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
