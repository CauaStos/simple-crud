"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
    CreateUserSchema,
    createUserSchema,
    UpdateUserSchema,
} from "./schemas";
import { Result } from "@/types/results";
import { Option } from "@/types/ui";
import { User } from "@db";

export async function getUser(id: number): Promise<Option<User["id"]> | null> {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: { id: true, name: true },
        });

        return user ? { value: user.id, label: user.name } : null;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}

export async function searchUsers(
    query: string,
): Promise<Option<User["id"]>[]> {
    if (!query) {
        const users = await prisma.user.findMany({
            take: 20,
            select: { id: true, name: true },
            orderBy: { name: "asc" },
        });

        return users.map((user) => ({
            value: user.id,
            label: user.name,
        }));
    }

    try {
        const users = await prisma.user.findMany({
            where: query
                ? {
                      OR: [
                          { name: { startsWith: query, mode: "insensitive" } },
                          { email: { startsWith: query, mode: "insensitive" } },
                      ],
                  }
                : undefined,
            take: 50,
            select: { id: true, name: true },
            orderBy: { name: "asc" },
        });
        return users.map((user) => ({
            value: user.id,
            label: user.name,
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function createUser(data: CreateUserSchema): Promise<Result> {
    const validated = createUserSchema.safeParse(data);

    if (!validated.success) {
        return {
            successful: false,
            error: "Erro de validação",
        };
    }

    try {
        await prisma.user.create({ data: validated.data });
        revalidatePath("/admin/usuarios");
        return {
            successful: true,
        };
    } catch (error) {
        console.error(error);
        return {
            successful: false,
            error: "Erro ao salvar no banco",
        };
    }
}

export async function updateUser(
    id: number,
    data: UpdateUserSchema,
): Promise<Result> {
    const validated = createUserSchema.safeParse(data);

    if (!validated.success) {
        return {
            successful: false,
            error: "Erro de validação",
        };
    }

    try {
        await prisma.user.update({
            data: validated.data,
            where: {
                id,
            },
        });
        revalidatePath("/admin/usuarios");
        return {
            successful: true,
        };
    } catch (error) {
        console.error(error);
        return {
            successful: false,
            error: "Erro ao atualizar no banco",
        };
    }
}

export async function deleteUser(id: number): Promise<Result> {
    try {
        const campaignCount = await prisma.campaign.count({
            where: { userId: id },
        });

        if (campaignCount > 0) {
            return {
                successful: false,
                error: "Não é possível deletar usuário: existem campanhas associadas",
            };
        }

        await prisma.user.delete({ where: { id } });

        revalidatePath("/admin/usuarios");

        return { successful: true };
    } catch (error) {
        console.error("Delete user error:", error);
        return { successful: false, error: "Ocorreu um erro inesperado" };
    }
}
