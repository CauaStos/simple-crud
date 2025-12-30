"use client";

import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError,
} from "@/components/ui/field";
import { CreateUserSchema, createUserSchema } from "../../schemas";

interface UserFormProps {
    defaultValues?: Partial<CreateUserSchema>;
    onSubmit: (data: CreateUserSchema) => Promise<void>;
    submitLabel: string;
}

export default function UserForm({
    defaultValues,
    onSubmit,
    submitLabel,
}: UserFormProps) {
    const form = useForm({
        defaultValues: {
            name: defaultValues?.name ?? "",
            email: defaultValues?.email ?? "",
        } as CreateUserSchema,
        validators: {
            onChange: createUserSchema,
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
                                placeholder="Pedro Duarte"
                            />
                            <FieldError errors={field.state.meta.errors} />
                        </Field>
                    )}
                </form.Field>

                <form.Field name="email">
                    {(field) => (
                        <Field
                            data-invalid={
                                field.state.meta.isTouched &&
                                !!field.state.meta.errors.length
                            }
                        >
                            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                                placeholder="pedro@exemplo.com"
                            />
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
