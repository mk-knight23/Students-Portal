"use client";

import React from "react";
import { motion } from "framer-motion";
import { HelpCircle, MessageCircle, Book, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "How do I register a new student?",
        answer: "Navigate to Students → Add Student. Fill in the required details including Aadhaar, academic scores, and contact information. The system validates Aadhaar using the Verhoeff algorithm."
    },
    {
        question: "How does the counseling preference system work?",
        answer: "Students can select up to 10 colleges in order of priority. During each allotment round, the system matches students with available seats based on rank, category, and preferences."
    },
    {
        question: "How are payments processed?",
        answer: "Staff can record payments on the Payments page. Each transaction generates an audit log entry. Receipts can be downloaded or printed directly from the system."
    },
    {
        question: "What data protection measures are in place?",
        answer: "The portal is DPDPA 2023 compliant. Aadhaar numbers are masked, all actions are logged in an immutable audit ledger, and access is controlled via role-based permissions."
    },
    {
        question: "Can I switch between branches?",
        answer: "Admin users can switch branches using the Branch Switcher in the sidebar. Staff users only see data from their assigned branch."
    },
    {
        question: "How do I export reports?",
        answer: "Navigate to the Intelligence page. Use the export buttons to download data in Excel or PDF format. Reports can be filtered by date range and category."
    }
];

function FAQAccordion({ item }: { item: FAQItem }) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="border-b border-white/10 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 flex items-center justify-between text-left hover:text-primary transition-colors"
            >
                <span className="text-sm font-medium">{item.question}</span>
                {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
            </button>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="pb-4"
                >
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                </motion.div>
            )}
        </div>
    );
}

export function HelpPanel() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="fixed bottom-6 right-6 h-14 w-14 rounded-full glass border-white/10 shadow-2xl hover:scale-110 transition-transform z-40"
                >
                    <HelpCircle className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent className="glass border-white/10 w-[400px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-white flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-primary" /> Help & Support
                    </SheetTitle>
                    <SheetDescription>
                        Find answers to common questions or contact support.
                    </SheetDescription>
                </SheetHeader>

                <div className="space-y-6 py-6">
                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3">
                        <Card className="glass border-white/10 hover:border-primary/50 transition-colors cursor-pointer">
                            <CardContent className="p-4 flex flex-col items-center gap-2">
                                <Book className="h-6 w-6 text-primary" />
                                <span className="text-xs font-medium">Documentation</span>
                            </CardContent>
                        </Card>
                        <Card className="glass border-white/10 hover:border-primary/50 transition-colors cursor-pointer">
                            <CardContent className="p-4 flex flex-col items-center gap-2">
                                <MessageCircle className="h-6 w-6 text-green-400" />
                                <span className="text-xs font-medium">Live Chat</span>
                            </CardContent>
                        </Card>
                    </div>

                    {/* FAQs */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                            Frequently Asked Questions
                        </h3>
                        <div className="glass rounded-xl border border-white/10 p-4">
                            {faqs.map((faq, index) => (
                                <FAQAccordion key={index} item={faq} />
                            ))}
                        </div>
                    </div>

                    {/* Contact Support */}
                    <Card className="glass border-white/10">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Need more help?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-xs text-muted-foreground">
                                Our support team is available Monday-Saturday, 9 AM - 6 PM IST.
                            </p>
                            <div className="flex gap-2">
                                <Button size="sm" className="rounded-xl flex-1 bg-primary">
                                    <MessageCircle className="h-4 w-4 mr-2" /> Contact Support
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* External Links */}
                    <div className="space-y-2">
                        <a
                            href="#"
                            className="flex items-center justify-between p-3 rounded-xl glass border border-white/10 hover:border-primary/50 transition-colors text-sm"
                        >
                            <span>Video Tutorials</span>
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </a>
                        <a
                            href="#"
                            className="flex items-center justify-between p-3 rounded-xl glass border border-white/10 hover:border-primary/50 transition-colors text-sm"
                        >
                            <span>Release Notes</span>
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </a>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
