import enUS from "../../public/i18n/en_US.json";
import zhCN from "../../public/i18n/zh_CN.json";

export type SiyuanLang = "zh_CN" | "en_US";

type I18nObject = Record<string, unknown>;

const bundledI18n: Record<SiyuanLang, I18nObject> = {
    en_US: enUS,
    zh_CN: zhCN,
};

export function getSiyuanLang(): SiyuanLang {
    const lang =
        window.siyuan?.config?.lang ??
        window.siyuan?.config?.appearance?.lang;
    if (lang === "en_US" || lang === "zh_CN") {
        return lang;
    }
    return "en_US";
}

export function getIntlLocale(lang?: SiyuanLang): string {
    const resolved = lang ?? getSiyuanLang();
    return resolved === "zh_CN" ? "zh-CN" : "en-US";
}

function hasI18nContent(i18n: I18nObject | undefined): boolean {
    return i18n != null && Object.keys(i18n).length > 0;
}

export function getPluginI18n(
    plugin?: { i18n?: I18nObject },
    lang?: SiyuanLang,
): I18nObject {
    if (hasI18nContent(plugin?.i18n)) {
        return plugin!.i18n!;
    }
    return bundledI18n[lang ?? getSiyuanLang()];
}

function resolveKey(i18n: I18nObject, key: string): string | undefined {
    const parts = key.split(".");
    let current: unknown = i18n;
    for (const part of parts) {
        if (current == null || typeof current !== "object") {
            current = undefined;
            break;
        }
        current = (current as I18nObject)[part];
    }
    if (typeof current === "string") {
        return current;
    }

    const flat = i18n[key];
    return typeof flat === "string" ? flat : undefined;
}

function interpolate(
    template: string,
    vars: Record<string, string | number>,
): string {
    return template
        .replace(/\$\{(\w+)\}/g, (_, name: string) => {
            const value = vars[name];
            return value == null ? "" : String(value);
        })
        .replace(/\{(\w+)\}/g, (_, name: string) => {
            const value = vars[name];
            return value == null ? "" : String(value);
        });
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
    return interpolate(template, vars);
}

export function pluginT(
    plugin: { i18n?: I18nObject } | undefined,
    key: string,
    vars?: Record<string, string | number>,
): string {
    return t(getPluginI18n(plugin), key, vars);
}
