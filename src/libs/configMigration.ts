import { t, getSiyuanLang, getPluginI18n } from "@/libs/i18n";

export const I18N_MIGRATION_VERSION = 1;

/** Exact Chinese factory defaults → i18n key for replacement */
export const CANONICAL_ZH_DEFAULTS: Record<string, string> = {
    "思源笔记首页": "homepage.title",
    "自{{startDate}} 写下第一条笔记以来，你已累计记录笔记 {{notesCount}} 条。\n当前共有 {{notebooksCount}} 个笔记本和 {{DocsCount}} 篇笔记。\n感谢自己的坚持！❤":
        "homepage.statsDefault",
    "🔍 搜索笔记": "homepage.button.searchNotes",
    "📅 今日日记": "homepage.button.todayJournal",
    "➕ 添加组件": "homepage.button.addWidget",
    "⚙ 主页设置": "homepage.button.settings",
    "📄子文档": "widgets.defaults.childDocsTitle",
    "📄条件文档": "widgets.defaults.conditionDocsTitle",
    "🕒最近文档": "widgets.defaults.latestDocsTitle",
    "💖收藏文档": "widgets.defaults.favoritesTitle",
    "📋任务管理": "widgets.defaults.taskManTitle",
    "📋任务管理Plus": "widgets.defaults.taskManPlusTitle",
    "📝快速笔记": "widgets.defaults.quickNotesTitle",
    "📅创作热力图": "widgets.defaults.heatmapTitle",
    "🔍SQL 查询结果": "widgets.defaults.sqlTitle",
    "统计卡片": "widgets.defaults.statisticalCardTitle",
};

/** Widget JSON title field names and their i18n keys */
export const WIDGET_TITLE_FIELDS: Record<string, string> = {
    childDocsTitle: "widgets.defaults.childDocsTitle",
    conditionDocsTitle: "widgets.defaults.conditionDocsTitle",
    latestDocsTitle: "widgets.defaults.latestDocsTitle",
    favoritiesTitle: "widgets.defaults.favoritesTitle",
    TaskManTitle: "widgets.defaults.taskManTitle",
    TaskManPlusTitle: "widgets.defaults.taskManPlusTitle",
    quickNotesTitle: "widgets.defaults.quickNotesTitle",
    heatmapTitle: "widgets.defaults.heatmapTitle",
    sqlTitle: "widgets.defaults.sqlTitle",
    statisticalCardTitle: "widgets.defaults.statisticalCardTitle",
};

type PluginLike = {
    i18n?: Record<string, unknown>;
    loadData: (name: string) => Promise<Record<string, unknown> | null>;
    saveData: (name: string, data: Record<string, unknown>) => Promise<void>;
};

function migrateString(
    value: unknown,
    i18n: Record<string, unknown>,
): string | undefined {
    if (typeof value !== "string") {
        return undefined;
    }
    const key = CANONICAL_ZH_DEFAULTS[value];
    if (!key) {
        return undefined;
    }
    return t(i18n, key);
}

function migrateHomepageConfig(
    config: Record<string, unknown>,
    i18n: Record<string, unknown>,
): boolean {
    let changed = false;

    const newTitle = migrateString(config.customTitle, i18n);
    if (newTitle) {
        config.customTitle = newTitle;
        changed = true;
    }

    const newStats = migrateString(config.statsInfoText, i18n);
    if (newStats) {
        config.statsInfoText = newStats;
        changed = true;
    }

    if (Array.isArray(config.buttonsList)) {
        for (const item of config.buttonsList) {
            if (item && typeof item === "object" && "label" in item) {
                const newLabel = migrateString(
                    (item as { label: unknown }).label,
                    i18n,
                );
                if (newLabel) {
                    (item as { label: string }).label = newLabel;
                    changed = true;
                }
            }
        }
    }

    return changed;
}

function migrateWidgetConfig(
    data: Record<string, unknown>,
    i18n: Record<string, unknown>,
): boolean {
    let changed = false;
    const payload = data.data;
    if (!payload || typeof payload !== "object") {
        return false;
    }
    const record = payload as Record<string, unknown>;

    for (const [field, i18nKey] of Object.entries(WIDGET_TITLE_FIELDS)) {
        const current = record[field];
        if (typeof current !== "string") {
            continue;
        }
        const zhCanonical = Object.entries(CANONICAL_ZH_DEFAULTS).find(
            ([, key]) => key === i18nKey,
        )?.[0];
        if (current === zhCanonical) {
            record[field] = t(i18n, i18nKey);
            changed = true;
        }
    }

    return changed;
}

async function getWidgetIds(plugin: PluginLike): Promise<string[]> {
    const ids = new Set<string>();
    const layoutFiles = [
        "widgetLayout.json",
        "sidebarWidgetLayout.json",
        "mobileHomepageWidgetLayout.json",
    ];

    for (const file of layoutFiles) {
        const layout = await plugin.loadData(file);
        const order = layout?.order;
        if (Array.isArray(order)) {
            for (const item of order) {
                if (item && typeof item === "object" && "id" in item) {
                    ids.add(String((item as { id: string }).id));
                }
            }
        }
    }

    return [...ids];
}

export async function migratePersistedConfig(plugin: PluginLike): Promise<void> {
    const i18n = getPluginI18n(plugin);
    const config =
        (await plugin.loadData("homepageSettingConfig.json")) ?? {};
    const currentVersion =
        typeof config.i18nMigrationVersion === "number"
            ? config.i18nMigrationVersion
            : 0;

    if (currentVersion >= I18N_MIGRATION_VERSION) {
        return;
    }

    let changed = migrateHomepageConfig(config, i18n);

    const widgetIds = await getWidgetIds(plugin);
    for (const id of widgetIds) {
        const widgetConfig = await plugin.loadData(`widget-${id}.json`);
        if (widgetConfig && migrateWidgetConfig(widgetConfig, i18n)) {
            await plugin.saveData(`widget-${id}.json`, widgetConfig);
            changed = true;
        }
    }

    config.i18nMigrationVersion = I18N_MIGRATION_VERSION;
    await plugin.saveData("homepageSettingConfig.json", config);

    if (changed && process.env.DEV_MODE) {
        console.log(
            `[i18n] Migrated persisted config to ${getSiyuanLang()}`,
        );
    }
}
