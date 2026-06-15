<script lang="ts">
    import { pluginT } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let advancedEnabled: boolean = false;
    export let countdownTimerStyle: string = "default";

    const tutorial = getTutorialLink("widgets.countdownTimer");

    function t(key: string, vars?: Record<string, string | number>) {
        return pluginT(plugin, key, vars);
    }
</script>

<div class="content-display">
    {#if advancedEnabled}
        <div class="content-panel countdownTimer">
            <div class="form-group">
                <label for="countdownTimerStyle">{t("widgets.countdownTimer.style")}</label>
                <select
                    id="countdownTimerStyle"
                    bind:value={countdownTimerStyle}
                >
                    <option value="default">{t("common.default")}</option>
                    <option value="ring1">{t("widgets.countdownTimer.ring1")}</option>
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
