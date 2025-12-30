import { Campaign } from "@db";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CampaignForm } from "../forms/CampaignForm";
import { updateCampaign } from "../../actions";
import { BaseDialogProps } from "@/types/ui";
import { toast } from "sonner";

interface EditCampaignDialogProps extends BaseDialogProps {
    campaign: Campaign;
}

export default function EditCampaignDialog({
    campaign,
    open,
    onOpenChange,
}: EditCampaignDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle>Editar Campanha</DialogTitle>
                <CampaignForm
                    submitLabel="Editar Campanha"
                    defaultValues={campaign}
                    onSubmit={async (data) => {
                        const result = await updateCampaign(campaign.id, data);
                        if (result.successful) {
                            toast.success(
                                "Modificações realizadas com sucesso!",
                            );
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
