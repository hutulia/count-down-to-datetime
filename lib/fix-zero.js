export function fixZero(digit) {
    return digit < 10 ? `0${digit}` : `${digit}`;
}