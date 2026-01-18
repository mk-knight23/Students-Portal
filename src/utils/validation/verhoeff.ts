/**
 * Verhoeff Algorithm for identity number validation (Aadhaar, APAAR, etc.)
 * Optimized for performance in Next.js 16/React 19 environments.
 */

const multiplicationTable = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
];

const permutationTable = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
];

const inverseTable = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

/**
 * Validates a number using the Verhoeff algorithm.
 * Aadhaar numbers are 12 digits where the 12th is the checksum.
 * APAAR IDs are also 12 digits.
 */
export function validateVerhoeff(id: string): boolean {
    if (!id || id.length !== 12 || !/^\d+$/.test(id)) {
        return false;
    }

    let c = 0;
    const reversedArray = id.split("").map(Number).reverse();

    for (let i = 0; i < reversedArray.length; i++) {
        c = multiplicationTable[c][permutationTable[i % 8][reversedArray[i]]];
    }

    return c === 0;
}

/**
 * Masks Aadhaar number for DPDPA compliance
 * Returns XXXX XXXX 1234
 */
export function maskAadhaar(aadhaar: string): string {
    if (!aadhaar || aadhaar.length < 4) return aadhaar;
    return `XXXX XXXX ${aadhaar.slice(-4)}`;
}
