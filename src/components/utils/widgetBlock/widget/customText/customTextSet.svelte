<script lang="ts">
    import { onMount } from "svelte";
    import { pluginT } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let customTextInputValue: string = "";

    const tutorial = getTutorialLink("widgets.customText");

    function t(key: string, vars?: Record<string, string | number>) {
        return pluginT(plugin, key, vars);
    }

    onMount(async () => {
        if (!customTextInputValue) {
            customTextInputValue = "";
        }
    });
</script>

<div class="content-display">
    <div class="content-panel custom-text">
        <h4>{t("widgets.customText.title")}</h4>
        <textarea
            placeholder={t("widgets.customText.placeholder")}
            bind:value={customTextInputValue}
        ></textarea>

        <hr />
        <div>
            {t("common.componentDescription")}<a
                href={tutorial.url}
                target="_blank">{tutorial.label}</a
            >
        </div>
    </div>
</div>

<style lang="scss">
    textarea {
        width: 100%;
        max-width: 100%;
        min-height: 150px;
        padding: 0.6rem 0.8rem;
        border: 1px solid var(--b3-theme-border-color);
        border-radius: 6px;
        background-color: var(--b3-theme-background);
        font-size: 0.95rem;
        transition: all 0.2s ease-in-out;
        resize: vertical;
        font-family: inherit;
        box-sizing: border-box;
        transition: all 0.2s ease-in-out;

        &:focus {
            outline: none;
            border-color: var(--b3-theme-border-color);
            box-shadow: 0 1px 3px var(--b3-theme-primary);
        }

        &:hover {
            border-color: var(--b3-theme-border-color);
            box-shadow: 0 1px 3px var(--b3-theme-primary);
        }
    }
</style>
