
/**
 * Verhoeff algorithm implementation for Aadhaar number validation
 * The Verhoeff algorithm is a checksum formula for error detection required by UIDAI
 */

// The multiplication table
const d = [
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

// The permutation table
const p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
];

// The inverse table
const inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

/**
 * Validates a number string using Verhoeff algorithm
 * @param numStr The number string to validate
 * @returns boolean true if valid
 */
export const validateVerhoeff = (numStr: string): boolean => {
    let c = 0;
    const myArray = String(numStr).split("").map(Number).reverse();

    for (let i = 0; i < myArray.length; i++) {
        c = d[c][p[i % 8][myArray[i]]];
    }

    return c === 0;
};

/**
 * Generates the checksum digit for a number string
 * @param numStr The number string to generate checksum for
 * @returns number The checksum digit
 */
export const generateVerhoeff = (numStr: string): number => {
    let c = 0;
    const myArray = String(numStr).split("").map(Number).reverse();

    for (let i = 0; i < myArray.length; i++) {
        c = d[c][p[(i + 1) % 8][myArray[i]]];
    }

    return inv[c];
};

/**
 * Masks an Aadhaar number, showing only the last 4 digits
 * @param aadhaar The Aadhaar number (12 digits)
 * @returns string The masked Aadhaar number (XXXX XXXX 1234)
 */
export const maskAadhaar = (aadhaar: string): string => {
    if (!aadhaar || aadhaar.length !== 12) return aadhaar;
    return `XXXX XXXX ${aadhaar.slice(8)}`;
};
