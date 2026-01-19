"use client"

import { useAppStore } from "@/store/useAppStore"
import {
    Bell,
    CheckCircle2,
    AlertTriangle,
    Info,
    XCircle,
    Clock,
    MailOpen
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function CommunicationHub() {
    const { notifications, markAsRead } = useAppStore();

    const getIcon = (type: string) => {
        switch (type) {
            case 'Success': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
            case 'Warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
            case 'Error': return <XCircle className="h-4 w-4 text-red-500" />;
            default: return <Info className="h-4 w-4 text-blue-500" />;
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-xl font-black uppercase tracking-tight italic">Inbox</h3>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-none">Category 11.2 - Communication & Alerts</p>
                </div>
                <Badge variant="outline" className="rounded-full bg-primary/10 text-primary border-primary/20 px-3 py-1 font-black text-[10px] uppercase">
                    {notifications.filter(n => !n.read).length} Unread
                </Badge>
            </div>

            <div className="space-y-4">
                {notifications.length > 0 ? notifications.map((n) => (
                    <Card key={n.id} className={`glass-card transition-all duration-300 ${!n.read ? 'border-primary/40 bg-primary/5' : 'opacity-70'}`}>
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className={`p-2 rounded-xl ${!n.read ? 'bg-primary/10' : 'bg-muted/20'}`}>
                                    {getIcon(n.type)}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className={`text-sm font-black uppercase tracking-tight ${!n.read ? 'text-primary' : 'text-foreground'}`}>
                                            {n.title}
                                        </h4>
                                        <span className="text-[9px] font-bold text-muted-foreground flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> {new Date(n.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                                        {n.message}
                                    </p>
                                    {!n.read && (
                                        <div className="pt-3">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 text-[9px] font-black uppercase tracking-widest gap-2 bg-primary/5 hover:bg-primary/10"
                                                onClick={() => markAsRead(n.id)}
                                            >
                                                <MailOpen className="h-3 w-3" /> Mark as read
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )) : (
                    <div className="py-20 text-center space-y-4 opacity-30">
                        <Bell className="h-12 w-12 mx-auto" />
                        <p className="text-xs font-black uppercase tracking-widest italic">Your inbox is clear</p>
                    </div>
                )}
            </div>
        </div>
    )
}
