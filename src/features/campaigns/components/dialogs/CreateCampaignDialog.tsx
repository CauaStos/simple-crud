import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { BaseDialogProps } from "@/types/ui";
import { createCampaign } from "../../actions";
import { CampaignForm } from "../forms/CampaignForm";
import { toast } from "sonner";

export default function CreateCampaignDialog({
    open,
    onOpenChange,
}: BaseDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle>Criar Campanha</DialogTitle>
                <CampaignForm
                    submitLabel="Criar Campanha"
                    onSubmit={async (data) => {
                        const result = await createCampaign(data);
                        if (result.successful) {
                            toast.success("Campanha criada com sucesso!");
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
