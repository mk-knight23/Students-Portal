"use client";

import React from "react";
import {
    FileText, Download, CheckCircle2, Building2,
    CreditCard, Calendar, IndianRupee, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

interface PaymentReceiptProps {
    receiptNo: string;
    studentName: string;
    studentId: string;
    paymentDate: string;
    paymentMethod: string;
    transactionId: string;
    items: { name: string; amount: number }[];
    total: number;
    className?: string;
    onDownload?: () => void;
    onPrint?: () => void;
}

export function PaymentReceipt({
    receiptNo,
    studentName,
    studentId,
    paymentDate,
    paymentMethod,
    transactionId,
    items,
    total,
    className,
    onDownload,
    onPrint,
}: PaymentReceiptProps) {
    const handleDownload = () => {
        // Mock download - in real app would generate PDF
        console.log("Downloading receipt:", receiptNo);
        onDownload?.();
    };

    const handlePrint = () => {
        window.print();
        onPrint?.();
    };

    return (
        <div className={cn("max-w-md mx-auto", className)}>
            <div className="bg-card border rounded-2xl overflow-hidden print:border-black print:shadow-none">
                {/* Header */}
                <div className="bg-primary text-primary-foreground p-6 text-center print:bg-black">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Building2 className="h-6 w-6" />
                        <span className="font-black text-lg tracking-tight">Admissions Made Easy</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest opacity-80">Official Payment Receipt</p>
                </div>

                {/* Receipt Content */}
                <div className="p-6 space-y-6">
                    {/* Receipt Number & Status */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] text-muted-foreground uppercase font-bold">Receipt No.</p>
                            <p className="font-mono font-bold">{receiptNo}</p>
                        </div>
                        <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-3 py-1.5 rounded-full">
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="text-xs font-bold">Paid</span>
                        </div>
                    </div>

                    {/* Student Info */}
                    <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-muted/30">
                        <div className="flex items-start gap-2">
                            <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold">Student Name</p>
                                <p className="text-sm font-bold">{studentName}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold">Student ID</p>
                                <p className="text-sm font-bold font-mono">{studentId}</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold">Payment Date</p>
                                <p className="text-sm font-medium">{paymentDate}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <CreditCard className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold">Payment Method</p>
                                <p className="text-sm font-medium">{paymentMethod}</p>
                            </div>
                        </div>
                    </div>

                    {/* Transaction ID */}
                    <div className="p-3 rounded-lg bg-muted/20 border">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Transaction ID</p>
                        <p className="font-mono text-sm">{transactionId}</p>
                    </div>

                    {/* Line Items */}
                    <div className="space-y-2">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Payment Breakdown</p>
                        <div className="border rounded-xl overflow-hidden">
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex items-center justify-between p-3",
                                        index < items.length - 1 && "border-b"
                                    )}
                                >
                                    <span className="text-sm">{item.name}</span>
                                    <span className="font-mono font-medium">₹{item.amount.toLocaleString()}</span>
                                </div>
                            ))}
                            <div className="flex items-center justify-between p-3 bg-primary/5 font-bold">
                                <span className="flex items-center gap-2">
                                    <IndianRupee className="h-4 w-4" />
                                    Total Amount
                                </span>
                                <span className="font-mono text-lg text-primary">₹{total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <p className="text-[10px] text-muted-foreground text-center">
                        This is a computer-generated receipt and does not require a signature.
                        For any queries, contact support@ameportal.com
                    </p>
                </div>

                {/* Actions - Hidden in print */}
                <div className="p-4 border-t flex gap-3 print:hidden">
                    <Button variant="outline" className="flex-1 text-xs font-bold" onClick={handlePrint}>
                        Print
                    </Button>
                    <Button className="flex-1 text-xs font-bold" onClick={handleDownload}>
                        <Download className="mr-2 h-3 w-3" />
                        Download PDF
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default PaymentReceipt;
