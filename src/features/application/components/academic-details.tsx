"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { STATES_SUPPORTED } from "@/constants/portal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AcademicDetailsProps {
    data: any;
    update: (data: any) => void;
}

export function AcademicDetails({ data, update }: AcademicDetailsProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="neet_score">NEET Score (Out of 720)</Label>
                    <Input
                        id="neet_score"
                        type="number"
                        placeholder="e.g. 642"
                        value={data.neet_score || ''}
                        onChange={(e) => update({ neet_score: parseInt(e.target.value) || 0 })}
                        className="rounded-xl"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="neet_rank">NEET All India Rank</Label>
                    <Input
                        id="neet_rank"
                        type="number"
                        placeholder="e.g. 4521"
                        value={data.neet_rank || ''}
                        onChange={(e) => update({ neet_rank: parseInt(e.target.value) || 0 })}
                        className="rounded-xl"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="state">Domicile State</Label>
                    <Select value={data.state} onValueChange={(val) => update({ state: val })}>
                        <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                            {STATES_SUPPORTED.map(s => (
                                <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>
                            ))}
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="aadhaar">Aadhaar Number</Label>
                    <Input
                        id="aadhaar"
                        placeholder="12 Digit Aadhaar Number"
                        value={data.aadhaar}
                        onChange={(e) => update({ aadhaar: e.target.value })}
                        className="rounded-xl"
                        maxLength={12}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="apaar_id">APAAR ID (Mandatory for 2026+)</Label>
                    <Input
                        id="apaar_id"
                        placeholder="Enter APAAR ID"
                        value={data.apaar_id}
                        onChange={(e) => update({ apaar_id: e.target.value })}
                        className="rounded-xl"
                    />
                </div>
            </div>
        </div>
    )
}
