<script lang="ts">
    import { pluginT } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let isRandomDoc: boolean = false;
    export let customBlockID: string = "";

    const tutorial = getTutorialLink("widgets.protyle");

    function t(key: string, vars?: Record<string, string | number>) {
        return pluginT(plugin, key, vars);
    }
</script>

<div class="content-panel custom-protyle">
    <div class="form-group">
        <label for="">
            <input type="checkbox" bind:checked={isRandomDoc} />
            {t("widgets.protyle.random")}
        </label>
    </div>
    {#if !isRandomDoc}
        <div class="form-group">
            <label for="protyle-block-id">{t("widgets.protyle.blockId")}</label>
            <input
                id="protyle-block-id"
                type="text"
                bind:value={customBlockID}
                placeholder={t("widgets.protyle.blockIdPlaceholder")}
            />
        </div>
    {/if}

    <hr />
    <div>
        {t("common.componentDescription")}<a
            href={tutorial.url}
            target="_blank">{tutorial.label}</a
        >
    </div>
</div>
