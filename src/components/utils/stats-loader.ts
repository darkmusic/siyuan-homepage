import { sql, lsNotebooks } from "@/api";
import { getIntlLocale, t, type SiyuanLang } from "@/libs/i18n";

export interface StatsData {
    startDate: string;
    notesCount: number;
    notebooksCount: number;
    DocsCount: number;
    nowDate: string;
}

function parseDateToTimestamp(dateStr: string): number | null {
    if (!dateStr || typeof dateStr !== "string") return null;

    const normalized = dateStr
        .replace(/年|月/g, "-")
        .replace(/日/g, "")
        .replace(/\./g, "-")
        .replace(/\//g, "-")
        .replace(/\s+/g, "")
        .trim();

    const date = new Date(normalized);

    return isNaN(date.getTime()) ? null : date.getTime();
}

export function parseDurationExpression(
    expression: string,
    statsData: StatsData,
    i18n?: Record<string, unknown>,
): string {
    const regex = /^(\s*[\w\u4e00-\u9fa5][\w\s\u4e00-\u9fa5\-:\/]*?)\s+([dp])\s+(\s*[\w\u4e00-\u9fa5][\w\s\u4e00-\u9fa5\-:\/]*?)(?:\s+as\s+([\w\u4e00-\u9fa5\s]+))?$/;
    const match = expression.match(regex);

    if (!match) return "";

    let var1: number | null = null;
    if (match[1] === "nowDate") {
        var1 = parseDateToTimestamp(statsData.nowDate);
    } else if (match[1] === "startDate") {
        var1 = parseDateToTimestamp(statsData.startDate);
    } else {
        var1 = parseDateToTimestamp(match[1]);
    }

    let var2: number | null = null;
    if (match[3] === "nowDate") {
        var2 = parseDateToTimestamp(statsData.nowDate);
    } else if (match[3] === "startDate") {
        var2 = parseDateToTimestamp(statsData.startDate);
    } else {
        var2 = parseDateToTimestamp(match[3]);
    }

    if (var1 === null || var2 === null) {
        return t(i18n, "common.invalidDate");
    }

    let result: number;
    if (match[2] === "d") {
        result = Math.abs(var1 - var2);
    } else if (match[2] === "p") {
        result = Math.abs(var1 + var2);
    } else {
        return "";
    }

    const seconds = Math.floor(result / 1000);
    const minutes = parseFloat((result / (1000 * 60)).toFixed(2));
    const hours = parseFloat((result / (1000 * 60 * 60)).toFixed(2));
    const days = parseFloat((result / (1000 * 60 * 60 * 24)).toFixed(2));
    const months = parseFloat((result / (1000 * 60 * 60 * 24 * 30)).toFixed(2));
    const years = parseFloat((result / (1000 * 60 * 60 * 24 * 365)).toFixed(2));

    if (match[4]) {
        if (match[4] === "Y") return `${years}`;
        else if (match[4] === "M") return `${months}`;
        else if (match[4] === "D") return `${days}`;
        else if (match[4] === "h") return `${hours}`;
        else if (match[4] === "m") return `${minutes}`;
        else if (match[4] === "s") return `${seconds}`;
    }

    return `${years}年同${months}月同${days}日同${hours}时同${minutes}分同${seconds}秒`;
}

function formatLocalizedDate(
    date: Date,
    lang?: SiyuanLang,
): string {
    return new Intl.DateTimeFormat(getIntlLocale(lang), {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);
}

function formatSiYuanTime(
    timestamp: string,
    i18n?: Record<string, unknown>,
    lang?: SiyuanLang,
): string {
    const unknown = t(i18n, "common.unknownStats");
    if (!timestamp || timestamp === unknown) {
        return unknown;
    }

    const year = timestamp.substring(0, 4);
    const month = timestamp.substring(4, 6);
    const day = timestamp.substring(6, 8);
    const date = new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10),
    );

    if (isNaN(date.getTime())) {
        return unknown;
    }

    return formatLocalizedDate(date, lang);
}

export async function loadStatsData(
    i18n?: Record<string, unknown>,
    lang?: SiyuanLang,
): Promise<StatsData> {
    const unknown = t(i18n, "common.unknownStats");

    try {
        const notebooksResponse = await lsNotebooks();

        const notesResponse = await sql("SELECT COUNT(*) AS totalDocuments FROM blocks WHERE type = 'd' LIMIT 9999999999999;");
        const totalNotesResponse = await sql("SELECT COUNT(*) AS totalDocuments FROM blocks WHERE type != 'd' LIMIT 9999999999999;");

        const startDateResult = await sql("SELECT created AS startDate FROM blocks WHERE type = 'd' ORDER BY created ASC LIMIT 1;");

        const nowDate = formatLocalizedDate(new Date(), lang);

        return {
            startDate: formatSiYuanTime(
                startDateResult[0]?.startDate || unknown,
                i18n,
                lang,
            ),
            notesCount: totalNotesResponse[0]?.totalDocuments || 0,
            notebooksCount: notebooksResponse.notebooks.length,
            DocsCount: notesResponse[0]?.totalDocuments || 0,
            nowDate,
        };
    } catch (error) {
        console.error("Failed to load stats data:", error);
        return {
            startDate: unknown,
            notesCount: 0,
            notebooksCount: 0,
            DocsCount: 0,
            nowDate: unknown,
        };
    }
}