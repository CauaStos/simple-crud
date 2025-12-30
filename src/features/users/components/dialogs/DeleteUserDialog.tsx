import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BaseDialogProps } from "@/types/ui";
import { User } from "@db";
import { buttonVariants } from "@/components/ui/button";
import { useTransition } from "react";
import { deleteUser } from "../../actions";
import { toast } from "sonner";

interface DeleteUserDialogProps extends BaseDialogProps {
    user: User;
}

export default function DeleteUserDialog({
    user,
    open,
    onOpenChange,
}: DeleteUserDialogProps) {
    const [isPending, startTransition] = useTransition();

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Tem certeza que deseja excluir essa conta?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso irá excluir
                        permanentemente a conta de{" "}
                        <span className="text-primary font-bold">
                            {user.name}
                        </span>{" "}
                        e irá remover seus dados dos nossos servidores.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className={buttonVariants({
                            variant: "destructive",
                        })}
                        onClick={() =>
                            startTransition(async () => {
                                const result = await deleteUser(user.id);

                                if (result.successful)
                                    toast.success("Usuário deletado");
                                else toast.error(result.error);
                            })
                        }
                        disabled={isPending}
                    >
                        Excluir conta
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
