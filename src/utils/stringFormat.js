export function toTitleCase(str) {
    const charArray = str.split('')

    for (let i = 0; i < charArray.length - 1; i++) {
        if (i === 0) {
            charArray[i] = charArray[i].toUpperCase()
        }
        if (charArray[i].match(/\s/)) {
            charArray[i+1] = charArray[i+1].toUpperCase()
        }
    }

    return charArray.join('');
}