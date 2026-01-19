"use client";

import React, { useRef } from "react";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

interface PrintButtonProps extends Omit<React.ComponentPropsWithoutRef<typeof Button>, "onClick"> {
    targetRef?: React.RefObject<HTMLElement>;
    documentTitle?: string;
    onBeforePrint?: () => void;
    onAfterPrint?: () => void;
}

export function PrintButton({
    targetRef,
    documentTitle = "Print Preview",
    onBeforePrint,
    onAfterPrint,
    children,
    className,
    ...props
}: PrintButtonProps) {
    const handlePrint = () => {
        onBeforePrint?.();

        if (targetRef?.current) {
            // Print specific element
            const printWindow = window.open("", "_blank");
            if (printWindow) {
                printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${documentTitle}</title>
              <style>
                body { 
                  font-family: system-ui, -apple-system, sans-serif;
                  padding: 20px;
                  margin: 0;
                }
                @media print {
                  body { padding: 0; }
                }
              </style>
            </head>
            <body>
              ${targetRef.current.innerHTML}
            </body>
          </html>
        `);
                printWindow.document.close();
                printWindow.focus();
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                    onAfterPrint?.();
                }, 250);
            }
        } else {
            // Print entire page
            window.print();
            onAfterPrint?.();
        }
    };

    return (
        <Button
            variant="outline"
            onClick={handlePrint}
            className={cn("text-xs font-bold uppercase tracking-widest", className)}
            {...props}
        >
            <Printer className="mr-2 h-4 w-4" />
            {children || "Print"}
        </Button>
    );
}

// Print-hidden wrapper component
interface PrintHiddenProps {
    children: React.ReactNode;
    className?: string;
}

export function PrintHidden({ children, className }: PrintHiddenProps) {
    return <div className={cn("print:hidden", className)}>{children}</div>;
}

// Print-only wrapper component
interface PrintOnlyProps {
    children: React.ReactNode;
    className?: string;
}

export function PrintOnly({ children, className }: PrintOnlyProps) {
    return <div className={cn("hidden print:block", className)}>{children}</div>;
}

// Printable area wrapper
interface PrintableAreaProps {
    children: React.ReactNode;
    className?: string;
}

export const PrintableArea = React.forwardRef<HTMLDivElement, PrintableAreaProps>(
    ({ children, className }, ref) => {
        return (
            <div ref={ref} className={cn("print:p-0", className)}>
                {children}
            </div>
        );
    }
);

PrintableArea.displayName = "PrintableArea";

export default PrintButton;
