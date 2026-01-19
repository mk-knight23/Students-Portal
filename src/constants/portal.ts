export const CASTE_CATEGORIES = [
    "Open",
    "OBC",
    "SC",
    "ST",
    "VJ",
    "NT-B",
    "NT-C",
    "NT-D",
    "EWS",
    "SEBC"
] as const;

export const COUNSELING_TYPES = [
    { id: "state_85", label: "85% State Quota", description: "Home state institutional quota" },
    { id: "aiq", label: "All India Quota (AIQ)", description: "15% seats in Govt colleges" },
    { id: "aiims_afmc", label: "AIIMS/AFMC", description: "Central institutes" },
    { id: "deemed", label: "Deemed Universities", description: "Private deemed medical/dental" },
    { id: "private", label: "Private Institutions", description: "Across different states" },
    { id: "open_states", label: "Open State Seats", description: "Karnataka, Kerala, UP support" }
] as const;

export const STATES_SUPPORTED = [
    { id: "MH", name: "Maharashtra", code: "27" },
    { id: "KA", name: "Karnataka", code: "29" },
    { id: "KL", name: "Kerala", code: "32" },
    { id: "UP", name: "Uttar Pradesh", code: "09" }
] as const;

export const DOCUMENT_SLOTS = [
    { id: "aadhaar", label: "Aadhaar Card", required: true, formats: ["pdf", "jpg"] },
    { id: "marks_10", label: "10th Marksheet", required: true, formats: ["pdf"] },
    { id: "marks_12", label: "12th Marksheet", required: true, formats: ["pdf"] },
    { id: "neet_score", label: "NEET Score Card", required: true, formats: ["pdf"] },
    { id: "caste_cert", label: "Caste Certificate", required: false, formats: ["pdf", "jpg"] },
    { id: "ncl", label: "Non-Creamy Layer (NCL)", required: false, formats: ["pdf"] }
] as const;
