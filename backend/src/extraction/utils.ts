export const cityParse = (text: string[]): string[] => {
    return text.filter((value) => {
        return [
            'San Francisco',
            'Denver',
            'New York',
            'New York City',
            'Seattle',
            'Los Angeles',
            'Boston',
            'Austin',
            'Chicago'
        ].some(city => value.includes(city));
    }, text);
}

export const cleanText = (text: string): string[] => {
    return text.split('/').map((t) => t.trim()).filter(Boolean);
}