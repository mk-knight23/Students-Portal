"use client"

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    CreditCard, CheckCircle2, Clock, AlertCircle,
    ArrowLeft, Download, Receipt, IndianRupee
} from "lucide-react"
import Link from "next/link"

import { useAppStore } from "@/store/useAppStore"
import { mockStudents } from "@/modules/students/mock-data"

export default function StudentPaymentsPage() {
    const { currentUser, students } = useAppStore();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const student = students.find(s => s.id === currentUser?.id) || mockStudents[0];

    if (!mounted || !student) return null;

    // Safe mapping for payment status
    const getStatus = (status: string) => {
        if (status === 'paid') return 'paid';
        if (status === 'unpaid') return 'pending';
        return 'upcoming';
    };

    const payments = student.payments.map(p => ({
        id: p.id,
        name: p.type.charAt(0).toUpperCase() + p.type.slice(1) + ' Fee',
        amount: p.amount,
        status: getStatus(p.status) as 'paid' | 'pending' | 'upcoming',
        paidAt: p.paidAt ? new Date(p.paidAt).toLocaleDateString() : undefined,
        method: p.method,
        receiptNo: p.status === 'paid' ? `TXN${p.id.split('-')[1]}` : undefined,
        dueDate: '25 Jan 2026', // Mock due date
        description: 'Payment for admission process'
    }));

    const paymentSummary = {
        paid: payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
        pending: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
        upcoming: payments.filter(p => p.status === 'upcoming').reduce((sum, p) => sum + p.amount, 0),
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="space-y-4">
                <Link href="/portal/student/dashboard">
                    <Button variant="ghost" size="sm" className="text-xs">
                        <ArrowLeft className="mr-2 h-3 w-3" />
                        Back to Dashboard
                    </Button>
                </Link>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary w-fit border border-primary/20">
                        <CreditCard className="h-3 w-3" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.1em]">Fee Center</span>
                    </div>
                    <h1 className="text-3xl font-black tracking-tight">
                        Fees & <span className="text-primary">Payments</span>
                    </h1>
                    <p className="text-sm text-muted-foreground font-medium">
                        Track your payments and download receipts
                    </p>
                </div>
            </div>

            {/* Payment Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="glass-card border-green-500/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                                    Total Paid
                                </p>
                                <p className="text-2xl font-black text-green-500">
                                    ₹{paymentSummary.paid.toLocaleString()}
                                </p>
                            </div>
                            <div className="bg-green-500/10 p-3 rounded-xl">
                                <CheckCircle2 className="h-6 w-6 text-green-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="glass-card border-yellow-500/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                                    Pending Due
                                </p>
                                <p className="text-2xl font-black text-yellow-500">
                                    ₹{paymentSummary.pending.toLocaleString()}
                                </p>
                            </div>
                            <div className="bg-yellow-500/10 p-3 rounded-xl">
                                <Clock className="h-6 w-6 text-yellow-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                                    Upcoming
                                </p>
                                <p className="text-2xl font-black text-muted-foreground">
                                    ₹{paymentSummary.upcoming.toLocaleString()}
                                </p>
                            </div>
                            <div className="bg-muted/30 p-3 rounded-xl">
                                <IndianRupee className="h-6 w-6 text-muted-foreground" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Payments List */}
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-bold">
                        <Receipt className="h-5 w-5 text-primary" />
                        Payment History
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {payments.map((payment) => (
                        <div
                            key={payment.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-muted/20 gap-4"
                        >
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold">{payment.name}</p>
                                    <Badge
                                        variant={
                                            payment.status === 'paid' ? 'default' :
                                                payment.status === 'pending' ? 'secondary' : 'outline'
                                        }
                                        className={`text-[10px] ${payment.status === 'paid' ? 'bg-green-500' :
                                            payment.status === 'pending' ? 'bg-yellow-500' : ''
                                            }`}
                                    >
                                        {payment.status === 'paid' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                        {payment.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                                        {payment.status}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {payment.status === 'paid' && `Paid on ${payment.paidAt} via ${payment.method}`}
                                    {payment.status === 'pending' && `Due by ${payment.dueDate}`}
                                    {payment.status === 'upcoming' && (payment.dueDate ? `Expected by ${payment.dueDate}` : payment.description)}
                                </p>
                                {payment.receiptNo && (
                                    <p className="text-[10px] text-primary font-mono">
                                        Receipt: {payment.receiptNo}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="text-lg font-black">₹{payment.amount.toLocaleString()}</p>
                                {payment.status === 'paid' && (
                                    <Button variant="outline" size="sm" className="text-xs">
                                        <Download className="mr-2 h-3 w-3" />
                                        Receipt
                                    </Button>
                                )}
                                {payment.status === 'pending' && (
                                    <Button size="sm" className="text-xs font-bold shadow-lg">
                                        Pay Now
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="glass-card border-blue-500/20">
                <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-500/10 p-2 rounded-xl">
                            <CreditCard className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="font-bold">Payment Methods</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                We accept UPI, Net Banking, Credit/Debit Cards, and NEFT/RTGS.
                                All transactions are secured with 256-bit encryption.
                            </p>
                            <div className="flex gap-2 mt-3">
                                <Badge variant="outline" className="text-xs">UPI</Badge>
                                <Badge variant="outline" className="text-xs">Cards</Badge>
                                <Badge variant="outline" className="text-xs">Net Banking</Badge>
                                <Badge variant="outline" className="text-xs">NEFT</Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
