"use client";

import React, { useState, useRef } from "react";
import { Upload, X, FileText, Image, File, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils";

interface DocumentUploadProps {
    slotId: string;
    slotName: string;
    allowedFormats?: string[];
    maxSizeMB?: number;
    required?: boolean;
    status?: "empty" | "pending" | "uploading" | "uploaded" | "reviewed" | "verified" | "rejected";
    existingFile?: { name: string; url: string };
    onUpload?: (file: File) => Promise<void>;
    onRemove?: () => void;
    instructions?: string;
    className?: string;
}

const formatIcons: Record<string, typeof FileText> = {
    pdf: FileText,
    jpg: Image,
    jpeg: Image,
    png: Image,
    default: File,
};

const statusConfig = {
    empty: { color: "border-dashed border-muted-foreground/30", badge: null },
    pending: { color: "border-dashed border-muted-foreground/30", badge: null },
    uploading: { color: "border-primary border-solid", badge: null },
    uploaded: { color: "border-yellow-500/50 border-solid", badge: { text: "Pending Review", variant: "secondary" as const } },
    reviewed: { color: "border-blue-500/50 border-solid", badge: { text: "In Review", variant: "secondary" as const } },
    verified: { color: "border-green-500/50 border-solid", badge: { text: "Verified", variant: "default" as const } },
    rejected: { color: "border-red-500/50 border-solid", badge: { text: "Rejected", variant: "destructive" as const } },
};

export function DocumentUpload({
    slotId,
    slotName,
    allowedFormats = ["pdf", "jpg", "png"],
    maxSizeMB = 5,
    required = true,
    status = "empty",
    existingFile,
    onUpload,
    onRemove,
    instructions,
    className,
}: DocumentUploadProps) {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const validateFile = (file: File): string | null => {
        const ext = file.name.split(".").pop()?.toLowerCase();
        if (!ext || !allowedFormats.includes(ext)) {
            return `Invalid format. Allowed: ${allowedFormats.join(", ")}`;
        }
        if (file.size > maxSizeMB * 1024 * 1024) {
            return `File too large. Maximum: ${maxSizeMB}MB`;
        }
        return null;
    };

    const handleFile = async (file: File) => {
        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);
        setSelectedFile(file);

        if (onUpload) {
            // Mock upload progress
            setUploadProgress(0);
            const interval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 90) {
                        clearInterval(interval);
                        return prev;
                    }
                    return prev + 10;
                });
            }, 100);

            try {
                await onUpload(file);
                setUploadProgress(100);
            } catch {
                setError("Upload failed. Please try again.");
                setSelectedFile(null);
            } finally {
                clearInterval(interval);
            }
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.empty;
    const FileIcon = formatIcons[selectedFile?.name.split(".").pop()?.toLowerCase() || "default"] || formatIcons.default;

    const displayFile = existingFile || (selectedFile ? { name: selectedFile.name, url: "" } : null);

    return (
        <div className={cn("space-y-2", className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{slotName}</span>
                    {required && <span className="text-red-500 text-xs">*</span>}
                    {config.badge && (
                        <Badge variant={config.badge.variant} className="text-[10px]">
                            {status === "verified" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                            {status === "rejected" && <AlertCircle className="h-3 w-3 mr-1" />}
                            {config.badge.text}
                        </Badge>
                    )}
                </div>
            </div>

            {/* Upload Area */}
            <div
                className={cn(
                    "relative rounded-xl border-2 p-6 transition-all",
                    config.color,
                    dragActive && "border-primary bg-primary/5",
                    displayFile ? "bg-muted/20" : "bg-transparent"
                )}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
            >
                {status === "uploading" || (uploadProgress > 0 && uploadProgress < 100) ? (
                    <div className="space-y-3 text-center">
                        <Loader2 className="h-8 w-8 mx-auto text-primary animate-spin" />
                        <p className="text-sm text-muted-foreground">Uploading...</p>
                        <Progress value={uploadProgress} className="h-2" />
                    </div>
                ) : displayFile ? (
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-xl">
                            <FileIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{displayFile.name}</p>
                            <p className="text-xs text-muted-foreground">
                                {status === "uploaded" && "Awaiting verification"}
                                {status === "verified" && "Document verified successfully"}
                                {status === "rejected" && "Please upload a valid document"}
                            </p>
                        </div>
                        {status !== "verified" && onRemove && (
                            <Button variant="ghost" size="icon" onClick={onRemove}>
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                ) : (
                    <div
                        className="text-center cursor-pointer"
                        onClick={() => inputRef.current?.click()}
                    >
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                        <p className="text-sm font-medium">
                            Drop file here or <span className="text-primary">browse</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {allowedFormats.map(f => f.toUpperCase()).join(", ")} • Max {maxSizeMB}MB
                        </p>
                    </div>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept={allowedFormats.map(f => `.${f}`).join(",")}
                    onChange={handleChange}
                />
            </div>

            {/* Error */}
            {error && (
                <p className="flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3" />
                    {error}
                </p>
            )}

            {/* Instructions */}
            {instructions && !error && (
                <p className="text-[10px] text-muted-foreground">{instructions}</p>
            )}
        </div>
    );
}

export default DocumentUpload;
