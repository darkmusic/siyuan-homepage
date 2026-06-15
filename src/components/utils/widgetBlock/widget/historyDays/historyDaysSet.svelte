<script lang="ts">
    import { pluginT as t } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let advancedEnabled: boolean;
    export let historyDaysType: string;

    const tutorial = getTutorialLink("widgets.historyDays");
</script>

<div class="historyDays-set">
    {#if advancedEnabled}
        <div class="form-group">
            <label for="historyDaysType">
                {t(plugin, "widgets.historyDays.displayType")}
                <select
                    id="historyDaysType"
                    bind:value={historyDaysType}
                >
                    <option value="list">{t(plugin, "common.list")}</option>
                    <option value="img">{t(plugin, "common.image")}</option>
                </select>
            </label>
        </div>
    {:else}
        <h3>{t(plugin, "common.vipBenefitTitle")}</h3>
    {/if}
    <hr>
    <div>{t(plugin, "common.componentDescription")}<a href={tutorial.url} target="_blank">{tutorial.label}</a></div>
    <p>{t(plugin, "common.apiNoteShort")}</p>
</div>

<style lang="scss">
</style>
