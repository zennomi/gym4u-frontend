export function getAvatarFromString(str: string) {
    return `https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_${str.split('').map(i => i.charCodeAt(0)).reduce((a, b) => a + b, 0) % 25 + 1}.jpg`
}