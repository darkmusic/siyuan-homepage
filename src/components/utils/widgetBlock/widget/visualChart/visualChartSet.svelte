<script lang="ts">
    import { pluginT as t } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let visualChartType: string = "progressBar";

    const tutorial = getTutorialLink("widgets.visualChart");
</script>

<div class="visualChart-settings">
    <div class="setting-item">
        <div class="form-group">
            <label for="visualChart-type">
                {t(plugin, "widgets.visualChart.type")}
                <select id="visualChart-type" bind:value={visualChartType}>
                    <option value="progressBar">{t(plugin, "widgets.visualChart.progressBar")}</option>
                    <option value="tagCloud">{t(plugin, "widgets.visualChart.tagCloud")}</option>
                </select>
            </label>
        </div>
    </div>

    <div class="component-help">
        <hr />
        <div>
            {t(plugin, "common.componentDescription")}<a
                href={tutorial.url}
                target="_blank">{tutorial.label}</a
            >
        </div>
    </div>
</div>

<style lang="scss">
    
</style>
