import { getIntlLocale } from "@/libs/i18n";

function parseSiYuanTimestamp(dateString: string): Date | null {
    if (!dateString) return null;

    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const hour = dateString.substring(8, 10) || "0";
    const minute = dateString.substring(10, 12) || "0";
    const second = dateString.substring(12, 14) || "0";

    const date = new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10),
        parseInt(hour, 10),
        parseInt(minute, 10),
        parseInt(second, 10),
    );

    return isNaN(date.getTime()) ? null : date;
}

export function formatDate(dateString: string, locale?: string) {
    const date = parseSiYuanTimestamp(dateString);
    if (!date) return "";

    return new Intl.DateTimeFormat(locale ?? getIntlLocale(), {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).format(date);
}

export function formatDateShort(dateString: string, locale?: string) {
    const date = parseSiYuanTimestamp(dateString);
    if (!date) return "";

    return new Intl.DateTimeFormat(locale ?? getIntlLocale(), {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);
}
