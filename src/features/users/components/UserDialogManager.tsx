import { createDialogStore, DialogType } from "@/stores/createDialogStore";
import CreateUserDialog from "./dialogs/CreateUserDialog";
import DeleteUserDialog from "./dialogs/DeleteUserDialog";
import EditUserDialog from "./dialogs/EditUserDialog";
import { User } from "@db";
import { ReactNode } from "react";

export const useUserDialog = createDialogStore<User>();

export default function UserDialogManager() {
    const {
        isOpen,
        type,
        selected: selectedUser,
        closeDialog,
    } = useUserDialog();

    const handleClose = (open: boolean) => !open && closeDialog();

    const dialogMap: Record<DialogType, ReactNode | null> = {
        create: <CreateUserDialog open={isOpen} onOpenChange={closeDialog} />,
        edit: (
            <EditUserDialog
                open={isOpen}
                onOpenChange={handleClose}
                user={selectedUser!}
            />
        ),
        delete: (
            <DeleteUserDialog
                open={isOpen}
                onOpenChange={handleClose}
                user={selectedUser!}
            />
        ),
    };

    return type && dialogMap[type];
}
