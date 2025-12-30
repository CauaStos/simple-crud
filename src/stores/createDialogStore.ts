import { create } from "zustand";

export type DialogType = "create" | "edit" | "delete";

interface DialogState<T> {
    isOpen: boolean;
    type: DialogType | null;
    selected: T | null;
    openDialog: (type: DialogType, data?: T) => void;
    closeDialog: () => void;
}

export const createDialogStore = <T>() =>
    create<DialogState<T>>((set) => ({
        isOpen: false,
        type: null,
        selected: null,
        openDialog: (type, selected) =>
            set({ isOpen: true, type, selected: selected ?? null }),
        closeDialog: () => set({ isOpen: false, type: null, selected: null }),
    }));
