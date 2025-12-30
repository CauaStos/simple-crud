import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useCampaignDialog } from "../CampaignDialogManager";

export default function CampaignToolbarActions() {
    const { openDialog } = useCampaignDialog();

    return (
        <>
            <Button
                onClick={() => {
                    openDialog("create");
                }}
            >
                <PlusIcon /> Nova campanha
            </Button>
        </>
    );
}
