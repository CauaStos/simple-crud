import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres.").trim(),
    email: z.email("Por favor, insira um endereço de email válido.").trim(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
    name: z.string().optional(),
    email: z.email().optional(),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
