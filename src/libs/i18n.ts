export type SiyuanLang = "zh_CN" | "en_US";

type I18nObject = Record<string, unknown>;

export function getSiyuanLang(): SiyuanLang {
    const lang = window.siyuan?.config?.lang;
    if (lang === "en_US" || lang === "zh_CN") {
        return lang;
    }
    return "en_US";
}

export function getIntlLocale(lang?: SiyuanLang): string {
    const resolved = lang ?? getSiyuanLang();
    return resolved === "zh_CN" ? "zh-CN" : "en-US";
}

function resolveKey(i18n: I18nObject, key: string): string | undefined {
    const parts = key.split(".");
    let current: unknown = i18n;
    for (const part of parts) {
        if (current == null || typeof current !== "object") {
            return undefined;
        }
        current = (current as I18nObject)[part];
    }
    return typeof current === "string" ? current : undefined;
}

export function t(
    i18n: I18nObject | undefined,
    key: string,
    vars?: Record<string, string | number>,
): string {
    const template = resolveKey(i18n ?? {}, key) ?? key;
    if (!vars) {
        return template;
    }
    return template.replace(/\$\{(\w+)\}/g, (_, name: string) => {
        const value = vars[name];
        return value == null ? "" : String(value);
    });
}

export function pluginT(
    plugin: { i18n?: I18nObject } | undefined,
    key: string,
    vars?: Record<string, string | number>,
): string {
    return t(plugin?.i18n, key, vars);
}
