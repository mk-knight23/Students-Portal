"use client";

import React from "react";
import { Palette, Image, Type, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTenantBranding, TenantLogo } from "./tenant-branding";
import { toast } from "sonner";

export function BrandingSettings() {
    const { branding, updateBranding } = useTenantBranding();
    const [localConfig, setLocalConfig] = React.useState(branding);
    const [hasChanges, setHasChanges] = React.useState(false);

    const handleChange = (key: string, value: string) => {
        setLocalConfig(prev => ({ ...prev, [key]: value }));
        setHasChanges(true);
    };

    const handleSave = () => {
        updateBranding(localConfig);
        setHasChanges(false);
        toast.success("Branding settings saved successfully!");
    };

    const handleReset = () => {
        setLocalConfig(branding);
        setHasChanges(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Branding Settings</h2>
                    <p className="text-sm text-muted-foreground">
                        Customize your portal's appearance to match your brand.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={handleReset}
                        disabled={!hasChanges}
                        className="rounded-xl"
                    >
                        <RotateCcw className="h-4 w-4 mr-2" /> Reset
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!hasChanges}
                        className="rounded-xl bg-primary"
                    >
                        <Save className="h-4 w-4 mr-2" /> Save Changes
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Identity */}
                <Card className="glass border-white/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Type className="h-5 w-5 text-primary" /> Identity
                        </CardTitle>
                        <CardDescription>Your organization's name and tagline.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Organization Name</Label>
                            <Input
                                id="name"
                                value={localConfig.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                className="glass border-white/10 rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tagline">Tagline</Label>
                            <Input
                                id="tagline"
                                value={localConfig.tagline || ""}
                                onChange={(e) => handleChange("tagline", e.target.value)}
                                placeholder="Your Journey to Success"
                                className="glass border-white/10 rounded-xl"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Colors */}
                <Card className="glass border-white/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Palette className="h-5 w-5 text-primary" /> Colors
                        </CardTitle>
                        <CardDescription>Customize your brand colors.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="primaryColor">Primary Color</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="primaryColor"
                                    type="color"
                                    value={localConfig.primaryColor}
                                    onChange={(e) => handleChange("primaryColor", e.target.value)}
                                    className="w-14 h-10 p-1 rounded-xl cursor-pointer"
                                />
                                <Input
                                    value={localConfig.primaryColor}
                                    onChange={(e) => handleChange("primaryColor", e.target.value)}
                                    className="glass border-white/10 rounded-xl flex-1"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="accentColor">Accent Color</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="accentColor"
                                    type="color"
                                    value={localConfig.accentColor}
                                    onChange={(e) => handleChange("accentColor", e.target.value)}
                                    className="w-14 h-10 p-1 rounded-xl cursor-pointer"
                                />
                                <Input
                                    value={localConfig.accentColor}
                                    onChange={(e) => handleChange("accentColor", e.target.value)}
                                    className="glass border-white/10 rounded-xl flex-1"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Logo */}
                <Card className="glass border-white/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Image className="h-5 w-5 text-primary" /> Logo
                        </CardTitle>
                        <CardDescription>Upload your organization's logo.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="logo">Logo URL</Label>
                            <Input
                                id="logo"
                                value={localConfig.logo || ""}
                                onChange={(e) => handleChange("logo", e.target.value)}
                                placeholder="/logo.svg"
                                className="glass border-white/10 rounded-xl"
                            />
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                            <TenantLogo className="h-12 w-auto" />
                        </div>
                    </CardContent>
                </Card>

                {/* Preview */}
                <Card className="glass border-white/10">
                    <CardHeader>
                        <CardTitle className="text-lg">Preview</CardTitle>
                        <CardDescription>See how your branding looks.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="p-6 rounded-xl border border-white/10"
                            style={{
                                background: `linear-gradient(135deg, ${localConfig.primaryColor}20, ${localConfig.accentColor}20)`
                            }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold"
                                    style={{ backgroundColor: localConfig.primaryColor }}
                                >
                                    {localConfig.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                                </div>
                                <div>
                                    <p className="font-bold">{localConfig.name}</p>
                                    <p className="text-xs text-muted-foreground">{localConfig.tagline}</p>
                                </div>
                            </div>
                            <Button
                                className="w-full rounded-xl"
                                style={{ backgroundColor: localConfig.primaryColor }}
                            >
                                Sample Button
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
