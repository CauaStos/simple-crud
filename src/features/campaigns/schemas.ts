import { z } from "zod";

export const createCampaignSchema = z.object({
    name: z.string().min(2, "o nome deve ter pelo menos 2 caracteres").trim(),
    description: z.string().optional().nullable(),
    isActive: z.boolean(),
    userId: z.number({ error: "selecione um responsável" }).int(),
});

export type CreateCampaignSchema = z.infer<typeof createCampaignSchema>;

export const updateCampaignSchema = z.object({
    name: z.string().min(2).optional(),
    description: z.string().optional().nullable(),
    isActive: z.boolean().optional(),
    userId: z.number().int().optional(),
});

export type UpdateCampaignSchema = z.infer<typeof updateCampaignSchema>;
