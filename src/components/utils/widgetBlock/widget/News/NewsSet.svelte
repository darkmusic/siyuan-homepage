<script lang="ts">
    import { pluginT as t } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let advancedEnabled: boolean;
    export let NewsType: string = "daily-news-bulletin";

    const tutorial = getTutorialLink("widgets.news");
</script>

{#if advancedEnabled}
    <div class="content-panel News">
        <div class="form-group News-type">
            <label for="News-type">
                {t(plugin, "widgets.news.type")}
                <select name="News-type" id="News-type" bind:value={NewsType}>
                    <option value="daily-news-bulletin">{t(plugin, "widgets.news.dailyBulletin")}</option>
                    <option value="daily-news-bulletin-v2">{t(plugin, "widgets.news.dailyBulletinV2")}</option>
                    <option value="daily-news-bulletin-v3">{t(plugin, "widgets.news.dailyBulletinV3")}</option>
                    <option value="daily-news-bulletin-weather">{t(plugin, "widgets.news.dailyBulletinWeather")}</option>
                    <option value="daily-news-zhihu">{t(plugin, "widgets.news.zhihuDaily")}</option>
                </select>
            </label>
        </div>
    </div>
{:else}
    <h3>{t(plugin, "common.vipBenefitTitle")}</h3>
{/if}
<hr />
<div>
    {t(plugin, "common.componentDescription")}<a
        href={tutorial.url}
        target="_blank">{tutorial.label}</a
    >
</div>
<p>{t(plugin, "common.apiNote")}</p>
