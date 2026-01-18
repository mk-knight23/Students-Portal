"use client";

import React from "react";
import { useTheme } from "next-themes";

interface TenantBrandingConfig {
    name: string;
    logo?: string;
    primaryColor: string;
    accentColor: string;
    tagline?: string;
}

// Default branding - would be fetched from tenant settings in production
const defaultBranding: TenantBrandingConfig = {
    name: "Admissions Made Easy",
    logo: "/logo.svg",
    primaryColor: "#6366f1",
    accentColor: "#22c55e",
    tagline: "Your Journey to Success Starts Here",
};

const TenantBrandingContext = React.createContext<{
    branding: TenantBrandingConfig;
    updateBranding: (config: Partial<TenantBrandingConfig>) => void;
}>({
    branding: defaultBranding,
    updateBranding: () => { },
});

export function useTenantBranding() {
    return React.useContext(TenantBrandingContext);
}

export function TenantBrandingProvider({
    children,
    initialBranding
}: {
    children: React.ReactNode;
    initialBranding?: Partial<TenantBrandingConfig>;
}) {
    const [branding, setBranding] = React.useState<TenantBrandingConfig>({
        ...defaultBranding,
        ...initialBranding,
    });

    const updateBranding = React.useCallback((config: Partial<TenantBrandingConfig>) => {
        setBranding(prev => ({ ...prev, ...config }));

        // Apply primary color to CSS custom properties
        if (config.primaryColor) {
            document.documentElement.style.setProperty('--primary', config.primaryColor);
        }
        if (config.accentColor) {
            document.documentElement.style.setProperty('--accent', config.accentColor);
        }
    }, []);

    // Apply initial branding on mount
    React.useEffect(() => {
        if (initialBranding?.primaryColor) {
            document.documentElement.style.setProperty('--primary', initialBranding.primaryColor);
        }
    }, [initialBranding]);

    return (
        <TenantBrandingContext.Provider value={{ branding, updateBranding }}>
            {children}
        </TenantBrandingContext.Provider>
    );
}

// Logo component that uses tenant branding
export function TenantLogo({ className }: { className?: string }) {
    const { branding } = useTenantBranding();

    if (branding.logo) {
        return (
            <img
                src={branding.logo}
                alt={branding.name}
                className={className}
            />
        );
    }

    // Fallback to text logo
    return (
        <span className={`font-bold text-gradient ${className}`}>
            {branding.name.split(' ').map(w => w[0]).join('')}
        </span>
    );
}
