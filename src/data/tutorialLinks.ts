import { getSiyuanLang, type SiyuanLang } from "@/libs/i18n";

export type TutorialLink = { label: string; url: string };
export type LocalizedTutorial = Record<SiyuanLang, TutorialLink>;

function link(zhLabel: string, zhUrl: string, enLabel: string, enUrl?: string): LocalizedTutorial {
    return {
        zh_CN: { label: zhLabel, url: zhUrl },
        en_US: { label: enLabel, url: enUrl ?? zhUrl },
    };
}

export const tutorialLinks = {
    mainUsage: link(
        "详细使用教程",
        "https://ttl8ygt82u.feishu.cn/wiki/Skg2woe9DidYNNkQSiEcWRLrnRg?from=from_copylink",
        "Detailed Usage Tutorial",
    ),
    changelog: link(
        "更新日志",
        "https://ttl8ygt82u.feishu.cn/wiki/SsoTww8CFiDD4WkLsSwctgWqnAd?from=from_copylink",
        "Changelog",
    ),
    specialThanks: link(
        "特别鸣谢",
        "https://ttl8ygt82u.feishu.cn/wiki/Skg2woe9DidYNNkQSiEcWRLrnRg#share-XBtxdkEYqo7cHjx0FArcQlZWnFd",
        "Special Thanks",
    ),
    vipSelfActivate: link(
        "自主激活 VIP 教程",
        "https://ai.feishu.cn/wiki/AFBLwGsdwicWEYkQkjbczLTxnpg?from=from_copylink",
        "Self-activation VIP Tutorial",
    ),
    vipActivate: link(
        "激活 VIP",
        "https://ai.feishu.cn/wiki/GEHMwHxE0icZZ8kq124cCAP6njh?from=from_copylink",
        "Activate VIP",
    ),
    pluginTutorial: link(
        "插件教程",
        "https://ttl8ygt82u.feishu.cn/wiki/Skg2woe9DidYNNkQSiEcWRLrnRg?from=from_copylink",
        "Plugin Tutorial",
    ),
    homepageFooter: link(
        "详细教程",
        "https://ttl8ygt82u.feishu.cn/wiki/Skg2woe9DidYNNkQSiEcWRLrnRg#share-S7k1dPUtuomNB3x1hg8coMnunZf",
        "Detailed Tutorial",
    ),
    bannerSettings: link(
        "横幅设置教程",
        "https://ttl8ygt82u.feishu.cn/wiki/Z4QOwYEXpifRb9kZQg4c2FafnXc?from=from_copylink",
        "Banner Settings Tutorial",
    ),
    vipThanks: link(
        "鸣谢",
        "https://ttl8ygt82u.feishu.cn/wiki/Skg2woe9DidYNNkQSiEcWRLrnRg#share-Ej8kdvO2iohj1dxWXEzcGZ8Xn7d",
        "Thanks",
    ),
    widgets: {
        favorites: link("收藏文档", "https://ttl8ygt82u.feishu.cn/wiki/HCICwChqpi9Iglkw6nwcVuP1nsf?from=from_copylink", "Favorites"),
        latestDocs: link("最近文档", "https://ttl8ygt82u.feishu.cn/wiki/XQV7wtEtsihu2IkbYpWcOWSunKf?from=from_copylink", "Recent Documents"),
        childDocs: link("子文档", "https://ttl8ygt82u.feishu.cn/wiki/DAaIweKDBipUhbkGXOvcL6Q5nqh?from=from_copylink", "Child Documents"),
        conditionDocs: link("条件文档", "https://ai.feishu.cn/wiki/RhI7wf1HGi997vkjE9dc3ionnPw?from=from_copylink", "Conditional Documents"),
        latestDailyNotes: link("最近日记", "https://ttl8ygt82u.feishu.cn/wiki/JeWrwUDxmiPX5lk0XbZcHI1bn5g?from=from_copylink", "Recent Daily Notes"),
        tasks: link("任务管理", "https://ttl8ygt82u.feishu.cn/wiki/T18vwmZeqinQW2kxoxccpYVHndf?from=from_copylink", "Task Manager"),
        tasksPlus: link("任务管理Plus", "https://ttl8ygt82u.feishu.cn/wiki/CCwfwq75Ziu8m5kQ0HXcnVbfnod?from=from_copylink", "Task Manager Plus"),
        quickNotes: link("快速笔记", "https://ttl8ygt82u.feishu.cn/wiki/XhZ7ww1PDimrZxkbxPqcvZrKnIb?from=from_copylink", "Quick Notes"),
        stikynot: link("便签", "https://ttl8ygt82u.feishu.cn/wiki/Dmm6wkiPCi8sNzk1ju4cD14JnKy?from=from_copylink", "Sticky Notes"),
        countdown: link("倒数日", "https://ttl8ygt82u.feishu.cn/wiki/KjYew1TbViBCIQkmsbBcBO6vnOd?from=from_copylink", "Countdown"),
        countdownTimer: link("倒计时", "https://ai.feishu.cn/wiki/R3bswPuXkiM8pYkUJ0VcSAben4c?from=from_copylink", "Countdown Timer"),
        weather: link("天气", "https://ttl8ygt82u.feishu.cn/wiki/ER44wITRDi0m8okvcsGcxtZInix?from=from_copylink", "Weather"),
        hot: link("热搜", "https://ttl8ygt82u.feishu.cn/wiki/W7u5wQCEOibCxhkyA7mc5mDWnWh?from=from_copylink", "Hot Search"),
        dailyQuote: link("每日一言", "https://ttl8ygt82u.feishu.cn/wiki/QRVowj3azihjGukBoR5cmBKsnKg?from=from_copylink", "Daily Quote"),
        news: link("新闻资讯", "https://ttl8ygt82u.feishu.cn/wiki/FM0PwE2KVin6ytkQBuzca5pWnZf?from=from_copylink", "News"),
        constellation: link("星座运势", "https://ttl8ygt82u.feishu.cn/wiki/RqNUwkJaBiJwHHkFAc4cHmWenqb?from=from_copylink", "Horoscope"),
        historyDays: link("历史上的今天", "https://ttl8ygt82u.feishu.cn/wiki/SgHPwf76fiVlsnkxUNTcZ0ADnXg?from=from_copylink", "On This Day"),
        heatmap: link("创作热力图", "https://ttl8ygt82u.feishu.cn/wiki/W2QjwU3DkiCMaok69yqcfV5knLc?from=from_copylink", "Writing Heatmap"),
        sql: link("SQL 查询", "https://ttl8ygt82u.feishu.cn/wiki/QG5nw3GPkiKjk3kIG9lcYpzOn6g?from=from_copylink", "SQL Query"),
        databaseChart: link("数据库图表", "https://ttl8ygt82u.feishu.cn/wiki/TVpYw7TRPiG6hRksrYKc7oBjnmd?from=from_copylink", "Database Chart"),
        customText: link("自定义文本", "https://ttl8ygt82u.feishu.cn/wiki/DkJnwuWzuipxpgkcTKZcEyaMnHf?from=from_copylink", "Custom Text"),
        protyle: link("自定义块", "https://ttl8ygt82u.feishu.cn/wiki/XQV7wtEtsihu2IkbYpWcOWSunKf?from=from_copylink", "Custom Block"),
        webview: link("自定义网页", "https://ttl8ygt82u.feishu.cn/wiki/Tk3mwYwMTiQrpSkkzQpcPsdGnUd?from=from_copylink", "Custom Webpage"),
        timedate: link("时钟", "https://ttl8ygt82u.feishu.cn/wiki/NlvZweO3LiUA2XkC2escjktKnXg?from=from_copylink", "Clock"),
        focus: link("专注", "https://ttl8ygt82u.feishu.cn/wiki/R1KPw7ZqNi4iVJkjGdhcVYmtnkd?from=from_copylink", "Focus"),
        visualChart: link("可视化图表", "https://ttl8ygt82u.feishu.cn/wiki/M7FzwiwMQiNdKXkrIrucpOtenxb?from=from_copylink", "Visual Chart"),
        musicPlayer: link("音乐播放器", "https://ttl8ygt82u.feishu.cn/wiki/GJQNwPxiBiRGYAkbJxMcCHTanag?from=from_copylink", "Music Player"),
        statisticalCard: link("统计卡片", "https://ttl8ygt82u.feishu.cn/wiki/B8kGwSDdui3vy3kz55EcJkVHnHD?from=from_copylink", "Statistics Card"),
        almanac: link("黄历", "https://ai.feishu.cn/wiki/LoLMwANVLibTQFkChB0csi2dnjb", "Almanac"),
        picCaro: link("图片轮播", "https://ai.feishu.cn/wiki/MLaew9FOwiEREHkao1HcZof2nEd", "Image Carousel"),
        cybmok: link("成语填空", "https://ai.feishu.cn/wiki/GJIDwjfIhizRNVkXlaHcmncfnf1", "Idiom Puzzle"),
    },
} as const;

export type TutorialLinkKey =
    | keyof typeof tutorialLinks
    | `widgets.${keyof typeof tutorialLinks.widgets}`;

export function getTutorialLink(key: TutorialLinkKey, lang?: SiyuanLang): TutorialLink {
    const resolvedLang = lang ?? getSiyuanLang();
    if (key.startsWith("widgets.")) {
        const widgetKey = key.slice("widgets.".length) as keyof typeof tutorialLinks.widgets;
        return tutorialLinks.widgets[widgetKey][resolvedLang];
    }
    const entry = tutorialLinks[key as keyof typeof tutorialLinks];
    if (typeof entry === "object" && "zh_CN" in entry) {
        return entry[resolvedLang];
    }
    return { label: key, url: "#" };
}
