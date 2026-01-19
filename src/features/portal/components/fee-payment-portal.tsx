"use client"

import { useState } from "react"
import { useAppStore } from "@/store/useAppStore"
import {
    CreditCard,
    CheckCircle2,
    ShieldCheck,
    ArrowRight,
    Loader2,
    Wallet,
    Receipt,
    Download
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function FeePaymentPortal() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [step, setStep] = useState<'selection' | 'gateway' | 'success'>('selection');
    const { students, currentUser, updateStudent, addNotification } = useAppStore();

    // Find the logged in student
    const student = students.find(s => s.id === currentUser?.id) || students[0];

    // Find a pending payment to "pay" in the demo
    const pendingPayment = student.payments?.find(p => p.status === 'unpaid') || { amount: 5500, type: 'tuition' as const };

    const handlePay = async () => {
        setIsProcessing(true);
        // Simulate payment gateway delay
        await new Promise(resolve => setTimeout(resolve, 3000));

        const newPaymentId = `PAY${Date.now()}`;

        // Update the actual payment if it exists, otherwise add new
        const updatedPayments = student.payments?.map(p =>
            (p.amount === pendingPayment.amount && p.type === pendingPayment.type && p.status === 'unpaid')
                ? { ...p, status: 'paid' as const, id: newPaymentId, paidAt: new Date().toISOString() }
                : p
        ) || [];

        updateStudent(student.id, {
            payments: updatedPayments
        });

        addNotification({
            title: "Payment Successful",
            message: `₹${pendingPayment.amount.toLocaleString()} received for ${pendingPayment.type} Fees. Transaction ID: ${newPaymentId}`,
            type: "Success"
        });

        setIsProcessing(false);
        setStep('success');
        toast.success("Payment Completed", {
            description: "Receipt available in your dashboard."
        });
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-700">
            {step === 'selection' && (
                <Card className="glass-card overflow-hidden">
                    <CardHeader className="bg-primary/5 pb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                <Wallet className="h-5 w-5" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-black uppercase tracking-tight">Active Installments</CardTitle>
                                <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Academic Year 2026-27</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-6 rounded-3xl bg-muted/10 border-2 border-primary/20 relative group">
                                <div className="space-y-1">
                                    <p className="text-xs font-black uppercase tracking-tight">{pendingPayment.type} Fee - Current Phase</p>
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase">Due: Feb 15, 2026</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black italic tracking-tighter">₹{pendingPayment.amount.toLocaleString()}</p>
                                    <Badge className="bg-primary/20 text-primary text-[8px] font-black uppercase mt-1">unpaid</Badge>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-6 rounded-3xl bg-muted/5 border border-white/5 opacity-40">
                                <div className="space-y-1">
                                    <p className="text-xs font-black uppercase tracking-tight">Future Installment</p>
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase">Locked</p>
                                </div>
                                <p className="text-lg font-black italic outline-text">₹{(pendingPayment.amount * 1.5).toLocaleString()}</p>
                            </div>
                        </div>
                        <Button className="w-full h-14 rounded-3xl bg-primary font-black uppercase tracking-widest shadow-xl shadow-primary/20" onClick={() => setStep('gateway')}>
                            Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </CardContent>
                </Card>
            )}

            {step === 'gateway' && (
                <Card className="glass-card shadow-2xl border-primary/20">
                    <CardContent className="p-12 flex flex-col items-center text-center space-y-8">
                        <div className="space-y-2">
                            <div className="h-16 w-16 bg-muted/20 rounded-full mx-auto flex items-center justify-center animate-pulse">
                                <CreditCard className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight italic">Secure Gateway</h3>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Bridging to HDFC Bank payment node...</p>
                        </div>

                        <div className="w-full space-y-4">
                            <div className="p-4 rounded-2xl bg-muted/10 border border-white/5 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-muted-foreground">Order ID</span>
                                <span className="text-xs font-mono font-bold">AME_TXN_{student.id.slice(-5)}</span>
                            </div>
                            <div className="p-4 rounded-2xl bg-muted/10 border border-white/5 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-muted-foreground">Total Payable</span>
                                <span className="text-lg font-black italic text-primary">₹{pendingPayment.amount.toLocaleString()}.00</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full">
                            <Button variant="outline" className="h-12 rounded-2xl font-black uppercase text-xs" onClick={() => setStep('selection')} disabled={isProcessing}>
                                Cancel
                            </Button>
                            <Button className="h-12 rounded-2xl bg-primary font-black uppercase text-xs" onClick={handlePay} disabled={isProcessing}>
                                {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Authorise UPI"}
                            </Button>
                        </div>

                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground tracking-widest pt-4">
                            <ShieldCheck className="h-4 w-4 text-green-500" /> 256-bit AES Encryption Active
                        </div>
                    </CardContent>
                </Card>
            )}

            {step === 'success' && (
                <Card className="glass-card border-green-500/20 bg-green-500/5">
                    <CardContent className="p-12 flex flex-col items-center text-center space-y-8">
                        <div className="h-20 w-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-green-500/30 animate-bounce">
                            <CheckCircle2 className="h-10 w-10" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black italic tracking-tighter uppercase">Transaction Successful</h2>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Payment verified for SID: {student.id}</p>
                        </div>

                        <div className="w-full p-6 rounded-[2rem] bg-black text-white space-y-4 text-left relative overflow-hidden">
                            <Receipt className="absolute -right-4 -bottom-4 h-24 w-24 opacity-10" />
                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                    <p className="text-[10px] font-black uppercase text-white/40">Amount Authorized</p>
                                    <p className="text-xl font-black italic">₹{pendingPayment.amount.toLocaleString()}.00</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-[10px] font-black uppercase text-white/40">Auth Code</p>
                                    <p className="text-xs font-mono font-bold tracking-widest">4422119900</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 w-full">
                            <Button className="flex-1 rounded-2xl h-12 bg-white text-black font-black hover:bg-white/90">
                                <Download className="mr-2 h-4 w-4" /> Get Receipt
                            </Button>
                            <Button variant="outline" className="rounded-2xl h-12 px-8 font-black uppercase text-xs" onClick={() => setStep('selection')}>
                                Done
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${className}`}>
            {children}
        </span>
    )
}
