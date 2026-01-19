"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CASTE_CATEGORIES } from "@/constants/portal"

interface IdentityDetailsProps {
    data: any;
    update: (data: any) => void;
}

export function IdentityDetails({ data, update }: IdentityDetailsProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name (As per Aadhaar)</Label>
                    <Input
                        id="name"
                        placeholder="Enter full name"
                        value={data.name}
                        onChange={(e) => update({ name: e.target.value })}
                        className="rounded-xl"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        value={data.email}
                        onChange={(e) => update({ email: e.target.value })}
                        className="rounded-xl"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Mobile Number</Label>
                    <Input
                        id="phone"
                        placeholder="+91 XXXXX XXXXX"
                        value={data.phone}
                        onChange={(e) => update({ phone: e.target.value })}
                        className="rounded-xl"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={data.gender} onValueChange={(val) => update({ gender: val })}>
                        <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                        id="dob"
                        type="date"
                        value={data.dob}
                        onChange={(e) => update({ dob: e.target.value })}
                        className="rounded-xl"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="category">Caste Category</Label>
                    <Select value={data.category} onValueChange={(val) => update({ category: val })}>
                        <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {CASTE_CATEGORIES.map(cat => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}
