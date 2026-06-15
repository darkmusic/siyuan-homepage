<script lang="ts">
    import { pluginT as t } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let hotSource: string;

    const tutorial = getTutorialLink("widgets.hot");

    const hotSourceCategories = [
        {
            categoryKey: "widgets.hot.category.videoCommunity",
            sources: [
                { value: "bilibili", key: "widgets.hot.source.bilibili" },
                { value: "acfun", key: "widgets.hot.source.acfun" },
                { value: "weibo", key: "widgets.hot.source.weibo" },
                { value: "zhihu", key: "widgets.hot.source.zhihu" },
                { value: "douyin", key: "widgets.hot.source.douyin" },
                { value: "kuaishou", key: "widgets.hot.source.kuaishou" },
                { value: "douban-movie", key: "widgets.hot.source.doubanMovie" },
                { value: "douban-group", key: "widgets.hot.source.doubanGroup" },
                { value: "tieba", key: "widgets.hot.source.tieba" },
                { value: "hupu", key: "widgets.hot.source.hupu" },
                { value: "miyoushe", key: "widgets.hot.source.miyoushe" },
                { value: "ngabbs", key: "widgets.hot.source.ngabbs" },
                { value: "v2ex", key: "widgets.hot.source.v2ex" },
                { value: "52pojie", key: "widgets.hot.source.pojie52" },
                { value: "hostloc", key: "widgets.hot.source.hostloc" },
                { value: "coolapk", key: "widgets.hot.source.coolapk" },
            ],
        },
        {
            categoryKey: "widgets.hot.category.news",
            sources: [
                { value: "baidu", key: "widgets.hot.source.baidu" },
                { value: "thepaper", key: "widgets.hot.source.thepaper" },
                { value: "toutiao", key: "widgets.hot.source.toutiao" },
                { value: "qq-news", key: "widgets.hot.source.qqNews" },
                { value: "sina", key: "widgets.hot.source.sina" },
                { value: "sina-news", key: "widgets.hot.source.sinaNews" },
                { value: "netease-news", key: "widgets.hot.source.netease" },
                { value: "huxiu", key: "widgets.hot.source.huxiu" },
                { value: "ifanr", key: "widgets.hot.source.ifanr" },
            ],
        },
        {
            categoryKey: "widgets.hot.category.tech",
            sources: [
                { value: "sspai", key: "widgets.hot.source.sspai" },
                { value: "ithome", key: "widgets.hot.source.ithome" },
                { value: "ithome-xijiayi", key: "widgets.hot.source.ithomeXijiayi" },
                { value: "juejin", key: "widgets.hot.source.juejin" },
                { value: "jianshu", key: "widgets.hot.source.jianshu" },
                { value: "guokr", key: "widgets.hot.source.guokr" },
                { value: "36kr", key: "widgets.hot.source.36kr" },
                { value: "51cto", key: "widgets.hot.source.cto51" },
                { value: "csdn", key: "widgets.hot.source.csdn" },
                { value: "nodeseek", key: "widgets.hot.source.nodeseek" },
                { value: "hellogithub", key: "widgets.hot.source.hellogithub" },
            ],
        },
        {
            categoryKey: "widgets.hot.category.games",
            sources: [
                { value: "lol", key: "widgets.hot.source.lol" },
                { value: "genshin", key: "widgets.hot.source.genshin" },
                { value: "honkai", key: "widgets.hot.source.honkai" },
                { value: "starrail", key: "widgets.hot.source.starrail" },
            ],
        },
        {
            categoryKey: "widgets.hot.category.other",
            sources: [{ value: "weread", key: "widgets.hot.source.weread" }],
        },
    ];
</script>

<div class="hot-set">
    <div class="form-group">
        <label for="hot-source">
            {t(plugin, "widgets.hot.platform")}
            <select id="hot-source" bind:value={hotSource}>
                {#each hotSourceCategories as category}
                    <optgroup label={t(plugin, category.categoryKey)}>
                        {#each category.sources as source}
                            <option value={source.value}>{t(plugin, source.key)}</option>
                        {/each}
                    </optgroup>
                {/each}
            </select>
        </label>
    </div>
    <hr />
    <div>
        {t(plugin, "common.componentDescription")}<a
            href={tutorial.url}
            target="_blank">{tutorial.label}</a
        >
    </div>
    <p>{t(plugin, "common.apiNote")}</p>
</div>

<style lang="scss">
</style>
