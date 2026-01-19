"use client";

import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldError } from "@/components/ui/validation-alert";
import { MaskedInput } from "@/components/ui/masked-input";
import { cn } from "@/utils";

export type FieldType =
    | "text"
    | "email"
    | "phone"
    | "password"
    | "number"
    | "textarea"
    | "select"
    | "checkbox"
    | "date"
    | "aadhaar"
    | "pan";

export interface FieldOption {
    label: string;
    value: string;
}

export interface FormField {
    name: string;
    label: string;
    type: FieldType;
    placeholder?: string;
    description?: string;
    required?: boolean;
    options?: FieldOption[];
    className?: string;
    disabled?: boolean;
    defaultValue?: string | boolean | number;
}

export interface FormBuilderProps {
    fields: FormField[];
    onSubmit: (data: FieldValues) => void | Promise<void>;
    submitLabel?: string;
    cancelLabel?: string;
    onCancel?: () => void;
    loading?: boolean;
    className?: string;
    columns?: 1 | 2 | 3;
    defaultValues?: Record<string, unknown>;
}

export function FormBuilder({
    fields,
    onSubmit,
    submitLabel = "Submit",
    cancelLabel = "Cancel",
    onCancel,
    loading = false,
    className,
    columns = 1,
    defaultValues,
}: FormBuilderProps) {
    const form = useForm({
        defaultValues: defaultValues || {},
    });

    const { register, handleSubmit, formState: { errors }, setValue, watch } = form;

    const gridCols = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    };

    const renderField = (field: FormField) => {
        const value = watch(field.name);
        const error = errors[field.name];
        const commonProps = {
            id: field.name,
            placeholder: field.placeholder,
            disabled: field.disabled,
            className: cn(error && "border-red-500"),
        };

        switch (field.type) {
            case "textarea":
                return (
                    <textarea
                        {...commonProps}
                        {...register(field.name, { required: field.required })}
                        rows={4}
                        className={cn(
                            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                            error && "border-red-500"
                        )}
                    />
                );

            case "select":
                return (
                    <Select
                        value={value as string}
                        onValueChange={(val: string) => setValue(field.name, val)}
                        disabled={field.disabled}
                    >
                        <SelectTrigger className={cn(error && "border-red-500")}>
                            <SelectValue placeholder={field.placeholder || "Select..."} />
                        </SelectTrigger>
                        <SelectContent>
                            {field.options?.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );

            case "checkbox":
                return (
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id={field.name}
                            checked={value as boolean}
                            onCheckedChange={(checked) => setValue(field.name, checked)}
                            disabled={field.disabled}
                        />
                        <Label htmlFor={field.name} className="text-sm font-normal">
                            {field.description || field.label}
                        </Label>
                    </div>
                );

            case "aadhaar":
            case "pan":
            case "phone":
                return (
                    <MaskedInput
                        {...commonProps}
                        maskPattern={field.type === "phone" ? "phone" : field.type === "pan" ? "pan" : "aadhaar"}
                        onChange={(e) => setValue(field.name, e.target.value)}
                        value={value as string}
                    />
                );

            case "date":
                return (
                    <Input
                        {...commonProps}
                        {...register(field.name, { required: field.required })}
                        type="date"
                    />
                );

            case "number":
                return (
                    <Input
                        {...commonProps}
                        {...register(field.name, { required: field.required })}
                        type="number"
                    />
                );

            case "email":
                return (
                    <Input
                        {...commonProps}
                        {...register(field.name, { required: field.required })}
                        type="email"
                    />
                );

            case "password":
                return (
                    <Input
                        {...commonProps}
                        {...register(field.name, { required: field.required })}
                        type="password"
                    />
                );

            default:
                return (
                    <Input
                        {...commonProps}
                        {...register(field.name, { required: field.required })}
                        type="text"
                    />
                );
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-6", className)}>
            <div className={cn("grid gap-4", gridCols[columns])}>
                {fields.map((field) => (
                    <div
                        key={field.name}
                        className={cn(
                            "space-y-2",
                            field.type === "checkbox" && "flex items-start",
                            field.className
                        )}
                    >
                        {field.type !== "checkbox" && (
                            <Label htmlFor={field.name} className="text-sm font-medium">
                                {field.label}
                                {field.required && <span className="text-red-500 ml-1">*</span>}
                            </Label>
                        )}

                        {renderField(field)}

                        {field.description && field.type !== "checkbox" && (
                            <p className="text-[10px] text-muted-foreground">{field.description}</p>
                        )}

                        <FieldError message={errors[field.name]?.message as string} />
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-3 pt-4 border-t">
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
                        {cancelLabel}
                    </Button>
                )}
                <Button type="submit" disabled={loading} className="min-w-[120px]">
                    {loading ? "Submitting..." : submitLabel}
                </Button>
            </div>
        </form>
    );
}

export default FormBuilder;
