<script lang="ts">
    import { pluginT } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let advancedEnabled;
    export let stikynotStyle;

    const tutorialLink = getTutorialLink("widgets.stikynot");

    function t(key: string, vars?: Record<string, string | number>) {
        return pluginT(plugin, key, vars);
    }
</script>

{#if advancedEnabled}
    <div class="content-panel stikynot">
        <div class="form-group stikynot-background">
            <label for="stikynot-style">
                {t("widgets.stikynot.style")}
                <select
                    name="stikynot-style"
                    id="stikynot-style"
                    bind:value={stikynotStyle}
                >
                    <option value="default">{t("common.default")}</option>
                    <option value="kraftPaper"
                        >{t("widgets.stikynot.kraftPaper")}</option
                    >
                    <option value="wood">{t("widgets.stikynot.wood")}</option>
                    <option value="marble"
                        >{t("widgets.stikynot.marble")}</option
                    >
                    <option value="Ink">{t("widgets.stikynot.ink")}</option>
                    <option value="beach">{t("widgets.stikynot.beach")}</option>
                    <option value="BlueSky"
                        >{t("widgets.stikynot.blueSky")}</option
                    >
                    <option value="sunsetHeart"
                        >{t("widgets.stikynot.sunsetHeart")}</option
                    >
                    <option value="Stars">{t("widgets.stikynot.stars")}</option>
                    <option value="waterDrop"
                        >{t("widgets.stikynot.waterDrop")}</option
                    >
                    <option value="PinkPorcelain"
                        >{t("widgets.stikynot.pinkPorcelain")}</option
                    >
                </select>
            </label>
        </div>
    </div>
{:else}
    <h3>{t("common.vipBenefitTitle")}</h3>
{/if}
<hr />
<div>
    {t("common.componentDescription")}<a
        href={tutorialLink.url}
        target="_blank">{tutorialLink.label}</a
    >
</div>
