"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

type Parser<T> = (value: string | null) => T;
type Serializer<T> = (value: T) => string | null;

interface BaseOptions<T> {
    parse: Parser<T>;
    serialize?: Serializer<T>;
    debounceMs?: number;
    resetPageOnChange?: boolean;
}

type Options<T, Name extends string> = BaseOptions<T> &
    (Lowercase<Name> extends "page"
        ? { resetPageOnChange?: never }
        : { resetPageOnChange?: boolean });

export function useQueryParam<T, Name extends string = string>(
    name: Name,
    options: Options<T, Name>,
) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const { parse, serialize, debounceMs, resetPageOnChange } = options;

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const paramValue = searchParams.get(name);
    const value = parse(paramValue);

    const setValue = (next: T | null) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        const apply = () => {
            const params = new URLSearchParams(searchParams.toString());

            const serialized =
                next === null
                    ? null
                    : serialize
                      ? serialize(next)
                      : String(next);

            if (!serialized) {
                params.delete(name);
            } else {
                params.set(name, serialized);
            }

            if (resetPageOnChange) {
                params.set("page", "1");
            }

            router.replace(`?${params.toString()}`, { scroll: false });
        };

        if (debounceMs && debounceMs > 0) {
            timeoutRef.current = setTimeout(apply, debounceMs);
        } else {
            apply();
        }
    };

    return [value, setValue] as const;
}
