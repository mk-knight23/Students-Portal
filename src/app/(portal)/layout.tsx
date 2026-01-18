import { MainLayout } from "@/components/layout/main-layout";

export default function PortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MainLayout>{children}</MainLayout>;
}
