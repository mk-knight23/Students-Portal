export type StateRuleResult = {
    eligible: boolean;
    reason?: string;
    candidatureType?: string;
    quota?: 'State' | 'AIQ' | 'NRIC';
};

export function validateMaharashtraRule(student: any): StateRuleResult {
    // Type A: Birth in MH + SSC/HSC in MH
    if (student.state === "Maharashtra" && student.academic_history?.class10?.board === "State Board") {
        return { eligible: true, candidatureType: "Type A", quota: "State" };
    }
    // Simple Mock for others
    return { eligible: true, candidatureType: "Type B", quota: "AIQ" };
}

export function validateKarnatakaRule(student: any): StateRuleResult {
    // 7-Year Rule Mock
    if (student.state === "Karnataka") {
        return { eligible: true, reason: "Verified via 7-Year Study Certificate", quota: "State" };
    }
    return { eligible: false, reason: "Domicile Verification Pending (Rule 7a)", quota: "AIQ" };
}

export function validateUPRule(student: any): StateRuleResult {
    if (student.state === "Uttar Pradesh") {
        return { eligible: true, quota: "State" };
    }
    return { eligible: true, quota: "AIQ" };
}

export function getStateEligibility(state: string, student: any): StateRuleResult {
    switch (state) {
        case "Maharashtra": return validateMaharashtraRule(student);
        case "Karnataka": return validateKarnatakaRule(student);
        case "Uttar Pradesh": return validateUPRule(student);
        default: return { eligible: true, quota: "AIQ" };
    }
}
