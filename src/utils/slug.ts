export const generateSlug = (text: string) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\u0E00-\u0E7Fa-z0-9\s-]/g, '') // รองรับไทย + eng
        .replace(/\s+/g, '-')
}