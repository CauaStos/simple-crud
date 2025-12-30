import { clsx, type ClassValue } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function redirectIfPageInvalid(
    pageCount: number,
    searchParams: { [key: string]: string | string[] | undefined },
) {
    const entries = Object.entries(searchParams).map(([k, v]) => [
        k,
        Array.isArray(v) ? v.join(",") : (v ?? ""),
    ]);
    const params = new URLSearchParams(entries);

    const page = Number(params.get("page") || 1);

    if (page < 1) {
        params.set("page", "1");
        redirect(`?${params.toString()}`);
    }

    if (page > pageCount && pageCount > 0) {
        params.set("page", pageCount.toString());
        redirect(`?${params.toString()}`);
    }
}
