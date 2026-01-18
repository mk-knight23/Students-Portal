"use client";

import { motion } from "framer-motion";
import { Settings, Bell, Shield, Palette, Globe, Database, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function SettingsPage() {
    const handleSave = () => {
        toast.success("Settings saved successfully");
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your application preferences</p>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="glass">
                    <TabsTrigger value="general" className="gap-2">
                        <Settings className="h-4 w-4" /> General
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="gap-2">
                        <Bell className="h-4 w-4" /> Notifications
                    </TabsTrigger>
                    <TabsTrigger value="security" className="gap-2">
                        <Shield className="h-4 w-4" /> Security
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="gap-2">
                        <Palette className="h-4 w-4" /> Appearance
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <Card className="glass">
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                            <CardDescription>Basic application configuration</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Organization Name</Label>
                                    <Input defaultValue="Admissions Made Easy" className="glass" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Default Branch</Label>
                                    <Input defaultValue="Latur" className="glass" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Enable Multi-Branch Mode</p>
                                    <p className="text-sm text-muted-foreground">Allow managing multiple branches</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Button onClick={handleSave} className="gap-2">
                                <Save className="h-4 w-4" /> Save Changes
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications">
                    <Card className="glass">
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Configure how you receive alerts</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { label: "Email Notifications", description: "Receive updates via email" },
                                { label: "SMS Alerts", description: "Get critical alerts via SMS" },
                                { label: "Push Notifications", description: "Browser push notifications" },
                                { label: "Daily Digest", description: "Summary of daily activities" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                                    <div>
                                        <p className="font-medium">{item.label}</p>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                    <Switch defaultChecked={i < 2} />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card className="glass">
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>Protect your account and data</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                                <div>
                                    <p className="font-medium">Two-Factor Authentication</p>
                                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                                </div>
                                <Button variant="outline">Enable 2FA</Button>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                                <div>
                                    <p className="font-medium">Session Timeout</p>
                                    <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                                </div>
                                <Input defaultValue="30" className="w-20 glass" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="appearance">
                    <Card className="glass">
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                            <CardDescription>Customize the look and feel</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                                <div>
                                    <p className="font-medium">Dark Mode</p>
                                    <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                                <div>
                                    <p className="font-medium">Compact Mode</p>
                                    <p className="text-sm text-muted-foreground">Reduce spacing for more content</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
