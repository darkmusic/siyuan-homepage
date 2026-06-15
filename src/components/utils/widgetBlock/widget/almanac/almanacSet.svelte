<script lang="ts">
    import { pluginT } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let advancedEnabled: boolean;
    export let almanacStyle: string = "";

    const tutorial = getTutorialLink("widgets.almanac");

    function t(key: string, vars?: Record<string, string | number>) {
        return pluginT(plugin, key, vars);
    }
</script>

<div class="music-player-settings">
    {#if advancedEnabled}
        <div class="content-panel almanac">
            <div class="setting-item">
                <label for="almanacStyle">{t("widgets.almanac.style")}</label>
                <select id="almanacStyle" bind:value={almanacStyle}>
                    <option value="classic">{t("widgets.almanac.classic")}</option>
                    <option value="tradition1">{t("widgets.almanac.tradition1")}</option>
                </select>
            </div>
        </div>
    {:else}
        <h3>{t("common.vipBenefitTitle")}</h3>
    {/if}
    <hr />
    <div>
        {t("common.componentDescription")}<a
            href={tutorial.url}
            target="_blank">{tutorial.label}</a
        >
    </div>
</div>

<style lang="scss">
</style>
