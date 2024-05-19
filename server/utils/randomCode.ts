export function generateSixDigitCode() {
    const max = 999999;
    const code = Math.floor(Math.random() * (max + 1));
    const paddedCode = code.toString().padStart(6, '0');
    return paddedCode;
}