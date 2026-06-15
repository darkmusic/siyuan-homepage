<script lang="ts">
    import { onMount } from "svelte";
    import { UapiClient } from "uapi-sdk-typescript";
    import { pluginT as t } from "@/libs/i18n";

    export let plugin: any;
    export let contentTypeJson: string = "{}";

    interface HotItem {
        title: string;
        heat: string;
        link: string;
    }

    const SOURCE_I18N_KEYS: Record<string, string> = {
        bilibili: "widgets.hot.source.bilibili",
        acfun: "widgets.hot.source.acfun",
        weibo: "widgets.hot.source.weibo",
        zhihu: "widgets.hot.source.zhihu",
        douyin: "widgets.hot.source.douyin",
        kuaishou: "widgets.hot.source.kuaishou",
        "douban-movie": "widgets.hot.source.doubanMovie",
        "douban-group": "widgets.hot.source.doubanGroup",
        tieba: "widgets.hot.source.tieba",
        hupu: "widgets.hot.source.hupu",
        miyoushe: "widgets.hot.source.miyoushe",
        ngabbs: "widgets.hot.source.ngabbs",
        v2ex: "widgets.hot.source.v2ex",
        "52pojie": "widgets.hot.source.pojie52",
        hostloc: "widgets.hot.source.hostloc",
        coolapk: "widgets.hot.source.coolapk",
        baidu: "widgets.hot.source.baidu",
        thepaper: "widgets.hot.source.thepaper",
        toutiao: "widgets.hot.source.toutiao",
        "qq-news": "widgets.hot.source.qqNews",
        sina: "widgets.hot.source.sina",
        "sina-news": "widgets.hot.source.sinaNews",
        "netease-news": "widgets.hot.source.netease",
        huxiu: "widgets.hot.source.huxiu",
        ifanr: "widgets.hot.source.ifanr",
        sspai: "widgets.hot.source.sspai",
        ithome: "widgets.hot.source.ithome",
        "ithome-xijiayi": "widgets.hot.source.ithomeXijiayi",
        juejin: "widgets.hot.source.juejin",
        jianshu: "widgets.hot.source.jianshu",
        guokr: "widgets.hot.source.guokr",
        "36kr": "widgets.hot.source.36kr",
        "51cto": "widgets.hot.source.cto51",
        csdn: "widgets.hot.source.csdn",
        nodeseek: "widgets.hot.source.nodeseek",
        hellogithub: "widgets.hot.source.hellogithub",
        lol: "widgets.hot.source.lol",
        genshin: "widgets.hot.source.genshin",
        honkai: "widgets.hot.source.honkai",
        starrail: "widgets.hot.source.starrail",
        weread: "widgets.hot.source.weread",
    };

    let hotList: HotItem[] = [];
    let loading: boolean = true;
    let error: string | null = null;
    let widgetTitle: string = t(plugin, "widgets.hot.title");

    function getSourceName(source: string): string {
        const key = SOURCE_I18N_KEYS[source];
        return key ? t(plugin, key) : t(plugin, "common.unknown");
    }

    function getRankingTitle(source: string): string {
        return t(plugin, "widgets.hot.rankingTitle", {
            source: getSourceName(source),
        });
    }

    const parsers = {
        bilibili(data: any): HotItem[] {
            return data.data.map((item) => ({
                title: item.title,
                heat: item.hot,
                link: item.url,
            }));
        },
        baidu(data: any): HotItem[] {
            return data.data.map((item) => ({
                title: item.title,
                heat: item.hot,
                link: item.url,
            }));
        },
        weibo(data: any): HotItem[] {
            return data.data.map((item) => ({
                title: item.title,
                heat: t(plugin, "widgets.hot.heat", {
                    n: item.hot.toLocaleString(),
                }),
                link: item.mobilUrl || item.url,
            }));
        },
        douyin(data: any): HotItem[] {
            return data.data.map((item) => ({
                title: item.word,
                heat: t(plugin, "widgets.hot.heat", {
                    n: item.hot_value.toLocaleString(),
                }),
                link: `https://www.douyin.com/search/${encodeURIComponent(item.word)}`,
            }));
        },
        zhihu(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        toutiao(data: any): HotItem[] {
            return parseUapisHotData(data, false);
        },
        kuaishou(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        acfun(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        tieba(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        "douban-movie"(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        "douban-group"(data: any): HotItem[] {
            return parseUapisHotData(data, false);
        },
        hellogithub(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        hupu(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        miyoushe(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        ngabbs(data: any): HotItem[] {
            return parseUapisHotData(data, false);
        },
        v2ex(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        "52pojie"(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        hostloc(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        coolapk(data: any): HotItem[] {
            return parseUapisHotData(data, false);
        },
        thepaper(data: any): HotItem[] {
            return parseUapisHotData(data, false);
        },
        "qq-news"(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        sina(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        "sina-news"(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        "netease-news"(data: any): HotItem[] {
            return parseUapisHotData(data, false);
        },
        huxiu(data: any): HotItem[] {
            return parseUapisHotData(data, false);
        },
        ifanr(data: any): HotItem[] {
            return parseUapisHotData(data, false);
        },
        sspai(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        ithome(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        "ithome-xijiayi"(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        juejin(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        jianshu(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        guokr(data: any): HotItem[] {
            return parseUapisHotData(data, false);
        },
        "36kr"(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        "51cto"(data: any): HotItem[] {
            return parseUapisHotData(data, false);
        },
        csdn(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        nodeseek(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        lol(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
        genshin(data: any): HotItem[] {
            return parseUapisHotData(data, false);
        },
        honkai(data: any): HotItem[] {
            return parseUapisHotData(data, false);
        },
        starrail(data: any): HotItem[] {
            return parseUapisHotData(data, false);
        },
        weread(data: any): HotItem[] {
            return parseUapisHotData(data);
        },
    };

    function parseUapisHotData(data: any, hasHeat: boolean = true): HotItem[] {
        return data.map((item) => ({
            title: item.title,
            heat: hasHeat
                ? item.hot_value
                : t(plugin, "widgets.hot.heatUnknown"),
            link: item.url,
        }));
    }

    async function fetchData(source: string) {
        let url = "";
        let data: any = {};
        if (source === "bilibili") {
            url = "https://dailyhotapi.3yu3.top/bilibili";
        } else if (source === "baidu") {
            url = "https://v2.xxapi.cn/api/baiduhot";
        } else if (source === "weibo") {
            url = "https://v2.xxapi.cn/api/weibohot";
        } else if (source === "douyin") {
            url = "https://v2.xxapi.cn/api/douyinhot";
        } else {
            data = await uapisSource(source);
            const parser = parsers[source as keyof typeof parsers];
            if (!parser) {
                throw new Error(
                    t(plugin, "messages.parserNotFound", { source }),
                );
            }
            hotList = parser(data);
            widgetTitle = getRankingTitle(source);
            loading = false;
            return;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(t(plugin, "messages.networkResponseFailed"));
            }
            data = await response.json();

            const parser = parsers[source as keyof typeof parsers];
            if (!parser) {
                throw new Error(
                    t(plugin, "messages.parserNotFound", { source }),
                );
            }

            hotList = parser(data);
            widgetTitle = getRankingTitle(source);
        } catch (err) {
            console.error(err);
            error = t(plugin, "messages.hotLoadFailed", { title: widgetTitle });
        } finally {
            loading = false;
        }
    }

    async function uapisSource(source: string) {
        try {
            const client = new UapiClient("https://uapis.cn");
            const payload = {
                type: source,
            };
            // @ts-ignore - 临时忽略类型检查
            const response = await client.misc.getMiscHotboard(payload);

            if (response && response.list) {
                return response.list;
            }
        } catch (error) {
            console.error("uapis API调用失败:", error);
        }
    }

    onMount(() => {
        try {
            const config = JSON.parse(contentTypeJson);
            const source = config?.data?.source || "bilibili";
            fetchData(source);
        } catch (e) {
            console.error("配置解析失败", e);
            error = t(plugin, "messages.configError");
            loading = false;
        }
    });
</script>

<div class="content-display">
    <h3 class="widget-title">{widgetTitle}</h3>
    <div class="HOT-content-container">
        {#if loading}
            <p>{t(plugin, "common.loading")}</p>
        {:else if error}
            <p style="color: red;">{error}</p>
        {:else}
            <ul class="hot-list">
                {#each hotList as item, index}
                    <li
                        class="hot-item {index < 3 ? 'top-' + (index + 1) : ''}"
                    >
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {#if index === 0}
                                <span class="rank-icon">🏆</span>
                            {:else if index === 1}
                                <span class="rank-icon">🥈</span>
                            {:else if index === 2}
                                <span class="rank-icon">🥉</span>
                            {:else}
                                <span class="rank-icon">🔥</span>
                            {/if}

                            <span class="rank">{index + 1}</span>
                            <span class="title">{item.title}</span>
                            <span class="heat">{item.heat}</span>
                        </a>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
</div>

<style>
    .widget-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 0.5rem;
        padding-bottom: 0.3rem;
        border-bottom: 1px solid var(--b3-border-color);
        text-align: center;
        display: inline-block;
        line-height: 1.2;
    }

    .content-display {
        width: 100%;
        height: calc(100%);
        display: flex;
        flex-direction: column;
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 12px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }

    .HOT-content-container {
        flex: 1;
        overflow-y: auto;
        padding-right: 0.5rem;
    }

    .hot-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .hot-item {
        background-color: var(--b3-theme-surface);
        border-radius: 8px;
        margin-bottom: 8px;
        padding: 0.75rem 1rem;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        transition: all 0.2s ease-in-out;
    }

    .hot-item a {
        text-decoration: none;
        display: flex;
        align-items: center;
        font-family: "Segoe UI", sans-serif;
        line-height: 1.5;
    }

    .rank-icon {
        margin-right: 8px;
        font-size: 14px;
    }

    .rank {
        min-width: 24px;
        text-align: center;
        font-weight: bold;
    }

    .title {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.95rem;
        font-weight: 500;
        color: var(--b3-theme-primary);
    }

    .heat {
        background-color: var(--b3-theme-background);
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: 500;
        font-size: 0.8rem;
        width: max-content;
        white-space: nowrap;
    }

    .hot-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
</style>
