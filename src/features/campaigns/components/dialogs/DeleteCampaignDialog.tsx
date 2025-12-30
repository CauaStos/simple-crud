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
import { Campaign } from "@db";
import { buttonVariants } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteCampaign } from "../../actions";

interface DeleteCampaignDialogProps extends BaseDialogProps {
    campaign: Campaign;
}

export default function DeleteCampaignDialog({
    campaign,
    open,
    onOpenChange,
}: DeleteCampaignDialogProps) {
    const [isPending, startTransition] = useTransition();

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Tem certeza que deseja excluir esta campanha?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso irá excluir
                        permanentemente a campanha{" "}
                        <span className="text-primary font-bold">
                            {campaign.name}
                        </span>{" "}
                        e remover seus dados dos nossos servidores.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className={buttonVariants({ variant: "destructive" })}
                        onClick={() =>
                            startTransition(async () => {
                                const result = await deleteCampaign(
                                    campaign.id,
                                );

                                if (result.successful)
                                    toast.success("Campanha excluída");
                                else toast.error(result.error);
                            })
                        }
                        disabled={isPending}
                    >
                        Excluir campanha
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
