"use server";

import prisma from "@/lib/prisma";
import { Result } from "@/types/results";
import {
    createCampaignSchema,
    CreateCampaignSchema,
    updateCampaignSchema,
    UpdateCampaignSchema,
} from "../campaigns/schemas";
import { revalidatePath } from "next/cache";

export async function getCampaignsList() {
    try {
        const campaigns = await prisma.campaign.findMany({
            select: { id: true, name: true },
            orderBy: { name: "asc" },
        });
        return campaigns;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function deleteCampaign(id: number): Promise<Result> {
    try {
        await prisma.campaign.delete({
            where: { id },
        });

        revalidatePath("/admin/campanhas");

        return { successful: true };
    } catch (error) {
        console.error("Delete campaign error:", error);
        return {
            successful: false,
            error: "Ocorreu um erro inesperado",
        };
    }
}

export async function createCampaign(
    data: CreateCampaignSchema,
): Promise<Result> {
    const validated = createCampaignSchema.safeParse(data);

    if (!validated.success) {
        return {
            successful: false,
            error: "Erro de validação",
        };
    }

    try {
        await prisma.campaign.create({
            data: validated.data,
        });

        revalidatePath("/admin/campanhas");

        return {
            successful: true,
        };
    } catch (error) {
        console.error(error);
        return {
            successful: false,
            error: "Erro ao salvar no banco.",
        };
    }
}

export async function updateCampaign(
    id: number,
    data: UpdateCampaignSchema,
): Promise<Result> {
    const validated = updateCampaignSchema.safeParse(data);

    if (!validated.success) {
        return {
            successful: false,
            error: "Erro de validação",
        };
    }

    try {
        await prisma.campaign.update({
            data: validated.data,
            where: { id },
        });

        revalidatePath("/admin/campanhas");

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
