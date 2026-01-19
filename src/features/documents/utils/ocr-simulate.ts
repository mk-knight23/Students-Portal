export interface OCRResult {
    confidence: number;
    extractedText: string;
    matchedFields: Record<string, string>;
}

export async function simulateOCR(file: File): Promise<OCRResult> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const fileName = file.name.toLowerCase();

    if (fileName.includes('aadhaar')) {
        return {
            confidence: 0.98,
            extractedText: "GOVERNMENT OF INDIA Aadhaar UIDAI...",
            matchedFields: {
                "Name": "SIDDHESH JADHAV",
                "Aadhaar No": "XXXX XXXX 1234",
                "Gender": "Male"
            }
        };
    }

    return {
        confidence: 0.85,
        extractedText: "Extracted content from marksheet...",
        matchedFields: {
            "Score": "642",
            "Year": "2025"
        }
    };
}
