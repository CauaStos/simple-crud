import { createDialogStore, DialogType } from "@/stores/createDialogStore";
import CreateCampaignDialog from "./dialogs/CreateCampaignDialog";
import DeleteCampaignDialog from "./dialogs/DeleteCampaignDialog";
import EditCampaignDialog from "./dialogs/EditCampaignDialog";
import { Campaign } from "@db";

export const useCampaignDialog = createDialogStore<Campaign>();

export default function CampaignDialogManager() {
    const {
        isOpen,
        type,
        selected: selectedCampaign,
        closeDialog,
    } = useCampaignDialog();
    const handleClose = (open: boolean) => !open && closeDialog();

    const dialogMap: Record<DialogType, React.ReactNode | null> = {
        create: (
            <CreateCampaignDialog open={isOpen} onOpenChange={closeDialog} />
        ),
        edit: (
            <EditCampaignDialog
                open={isOpen}
                onOpenChange={handleClose}
                campaign={selectedCampaign!}
            />
        ),
        delete: (
            <DeleteCampaignDialog
                open={isOpen}
                onOpenChange={handleClose}
                campaign={selectedCampaign!}
            />
        ),
    };

    return type && dialogMap[type];
}
