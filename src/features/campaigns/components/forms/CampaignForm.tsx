"use client";

import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError,
} from "@/components/ui/field";
import { CreateCampaignSchema, createCampaignSchema } from "../../schemas";
import { getUser, searchUsers } from "@/features/users/actions";
import { SearchCombobox } from "@/components/shared/SearchCombobox";

interface CampaignFormProps {
    onSubmit: (data: CreateCampaignSchema) => Promise<void>;
    submitLabel: string;
    defaultValues?: Partial<CreateCampaignSchema>;
}

export function CampaignForm({
    onSubmit,
    submitLabel,
    defaultValues,
}: CampaignFormProps) {
    const form = useForm({
        defaultValues: {
            name: defaultValues?.name ?? "",
            description: defaultValues?.description ?? "",
            userId: defaultValues?.userId ?? undefined,
            isActive: defaultValues?.isActive ?? true,
        } as CreateCampaignSchema,

        validators: {
            onChange: createCampaignSchema,
        },
        onSubmit: async ({ value }) => {
            await onSubmit(value);
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="space-y-4"
        >
            <FieldGroup>
                <form.Field name="name">
                    {(field) => (
                        <Field
                            data-invalid={
                                field.state.meta.isTouched &&
                                !!field.state.meta.errors.length
                            }
                        >
                            <FieldLabel htmlFor={field.name}>Nome</FieldLabel>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                                placeholder="Campanha de Verão"
                            />
                            <FieldError errors={field.state.meta.errors} />
                        </Field>
                    )}
                </form.Field>

                <form.Field name="description">
                    {(field) => (
                        <Field
                            data-invalid={
                                field.state.meta.isTouched &&
                                !!field.state.meta.errors.length
                            }
                        >
                            <FieldLabel htmlFor={field.name}>
                                Descrição
                            </FieldLabel>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value ?? ""}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                                placeholder="Descrição da campanha"
                            />
                            <FieldError errors={field.state.meta.errors} />
                        </Field>
                    )}
                </form.Field>

                <form.Field name="userId">
                    {(field) => (
                        <Field
                            data-invalid={
                                field.state.meta.isTouched &&
                                !!field.state.meta.errors.length
                            }
                        >
                            <FieldLabel htmlFor={field.name}>
                                Responsável
                            </FieldLabel>

                            <SearchCombobox
                                selected={field.state.value}
                                resolveSelectedLabel={getUser}
                                onSelect={(value) =>
                                    value && field.handleChange(value)
                                }
                                onSearch={searchUsers}
                            />
                            <FieldError errors={field.state.meta.errors} />
                        </Field>
                    )}
                </form.Field>

                <form.Field name="isActive">
                    {(field) => (
                        <Field
                            orientation="horizontal"
                            data-invalid={
                                field.state.meta.isTouched &&
                                !!field.state.meta.errors.length
                            }
                        >
                            <Checkbox
                                id={field.name}
                                name={field.name}
                                checked={field.state.value}
                                onCheckedChange={(checked) =>
                                    field.handleChange(checked === true)
                                }
                            />
                            <FieldLabel htmlFor={field.name}>Ativa</FieldLabel>
                            <FieldError errors={field.state.meta.errors} />
                        </Field>
                    )}
                </form.Field>
            </FieldGroup>

            <div className="flex justify-end pt-4">
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                    {([canSubmit, isSubmitting]) => (
                        <Button
                            type="submit"
                            disabled={!canSubmit || isSubmitting}
                        >
                            {isSubmitting ? "Salvando..." : submitLabel}
                        </Button>
                    )}
                </form.Subscribe>
            </div>
        </form>
    );
}
