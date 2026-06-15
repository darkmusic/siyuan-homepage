<script lang="ts">
    import { onMount } from "svelte";
    import { pluginT as t } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let heatmapTitle: string = "";
    export let pastMonthCount: number = 6;
    export let showLabel: boolean = true;
    export let selectedColorPreset: "github" | "blue" | "custom" = "github";
    export let customColor: string = "#1ea769";
    export let heatmapCountType: string = "block";

    const tutorial = getTutorialLink("widgets.heatmap");

    onMount(() => {
        if (!heatmapTitle) {
            heatmapTitle = t(plugin, "widgets.defaults.heatmapTitle");
        }
    });
</script>

<div class="content-panel heatmap">
    <div class="form-group">
        <label for="heatmap-title">{t(plugin, "widgets.heatmap.title")}</label>
        <input type="text" id="heatmap-title" bind:value={heatmapTitle} />
    </div>
    <div class="form-group">
        <label for="month-count">{t(plugin, "widgets.heatmap.range")}</label>
        <select id="month-count" bind:value={pastMonthCount}>
            {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as month}
                <option value={month}>{t(plugin, "widgets.heatmap.pastMonths", { n: month })}</option>
            {/each}
        </select>

        <label for="show-label">
            {t(plugin, "widgets.heatmap.showLabel")}
            <input type="checkbox" id="show-label" bind:checked={showLabel} />
        </label>
    </div>

    <div class="form-group">
        <label for="color-preset-select">{t(plugin, "widgets.heatmap.colorPreset")}</label>
        <select id="color-preset-select" bind:value={selectedColorPreset}>
            <option value="github">{t(plugin, "widgets.heatmap.githubGreen")}</option>
            <option value="blue">{t(plugin, "widgets.heatmap.blue")}</option>
            <option value="custom">{t(plugin, "widgets.heatmap.customColor")}</option>
        </select>
    </div>

    {#if selectedColorPreset === "custom"}
        <div class="form-group">
            <label for="custom-color-picker">{t(plugin, "widgets.heatmap.baseColor")}</label>
            <input
                id="custom-color-picker"
                type="color"
                bind:value={customColor}
            />
        </div>
    {/if}

    <div class="form-group">
        <label for=""
            >{t(plugin, "widgets.heatmap.countType")}<select bind:value={heatmapCountType}>
                <option value="block">{t(plugin, "widgets.heatmap.countBlock")}</option>
                <option value="words">{t(plugin, "widgets.heatmap.countWords")}</option>
            </select></label
        >
        {#if heatmapCountType === "words"}
            <p>{t(plugin, "widgets.heatmap.vipSubscribe")}</p>
            <p>{t(plugin, "widgets.heatmap.blockTypes")}</p>
        {/if}
    </div>

    <hr />
    <div>
        {t(plugin, "common.componentDescription")}<a
            href={tutorial.url}
            target="_blank">{tutorial.label}</a
        >
    </div>
</div>

<style lang="scss">
</style>
