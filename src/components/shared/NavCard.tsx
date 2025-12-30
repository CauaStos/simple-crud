"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import { ReactNode } from "react";

type NavCardProps = {
    title: string;
    description: string;
    content?: ReactNode;
    footer?: ReactNode;
    href: Route;
    className?: string;
};

export default function NavCard({
    title,
    description,
    content,
    footer,
    href,
    className,
}: NavCardProps) {
    return (
        <Link href={href} className={cn("w-full max-w-[460px]", className)}>
            <Card className="group flex flex-col border border-muted-foreground/20 transition hover:border-primary/50 hover:shadow-md aspect-18/9 overflow-hidden">
                <CardHeader className="shrink-0">
                    <div className="flex items-center justify-between mb-2">
                        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-2" />
                    </div>
                    <CardTitle className="text-xl font-semibold line-clamp-1">
                        {title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 wrap-break-word overflow-hidden">
                        {description}
                    </CardDescription>
                </CardHeader>

                {content && (
                    <CardContent className="flex-1 text-sm text-muted-foreground overflow-hidden">
                        <div className="line-clamp-3 wrap-break-word">
                            {content}
                        </div>
                    </CardContent>
                )}

                {footer && (
                    <CardFooter className="flex h-5 items-center justify-center text-xs text-muted-foreground border-t shrink-0">
                        {footer}
                    </CardFooter>
                )}
            </Card>
        </Link>
    );
}
