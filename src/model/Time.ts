export function getNow(): string {
    let now = new Date();
    return now.toISOString();
}

export function getStringFromDate(date: Date): string {
    return date.toISOString();
}

export function compareTime(str1: string, str2: string): number {
    const date1 = new Date(str1);
    const date2 = new Date(str2);
    
    if (date1 < date2) {
        return -1;
    } else if (date1 > date2) {
        return 1;
    } else {
        return 0;
    }
}