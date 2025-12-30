export interface BaseDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export interface Option<T> {
    value: T;
    label: string;
}
