<script lang="ts">
    import { onMount } from "svelte";
    import Sortable from "sortablejs";
    import { saveLayout, restoreLayout } from "./mobileHomepage_layout";
    import { addCustomBlock } from "./block-creator";
    import { pluginT } from "@/libs/i18n";

    import "./mobileHomepage.scss";

    export let plugin: any;
    export let close: () => void;

    function t(key: string, vars?: Record<string, string | number>): string {
        return pluginT(plugin, key, vars);
    }

    let currentBlockForSettings: HTMLElement | null = null;
    const currentBlockForSettingsRef = { value: currentBlockForSettings };

    let advanced: boolean;

    onMount(() => {
        // 组件拖拽
        const observer = new MutationObserver(async () => {
            const container = document.querySelector(
                ".mobile-homepage-widget",
            ) as HTMLElement;
            if (container) {
                observer.disconnect();

                new Sortable(container, {
                    animation: 150,
                    ghostClass: "sortable-ghost",
                    handle: ".drag-handle",
                    onEnd: () => {
                        saveLayout(plugin);
                    },
                });

                await restoreLayout(plugin, { value: container });
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        setInterval(() => {
            advanced = plugin.ADVANCED;
        }, 100);
    });
</script>

<div class="mobile-homepage">
    {#if advanced}
        <div class="mobile-homepage-widget"></div>
        <div class="mobile-homepage-setting">
            <button
                class="mobile-homepage-add-widget-btn"
                on:click={() =>
                    addCustomBlock(plugin, currentBlockForSettingsRef)}
                >{t("homepage.button.addWidget")}</button
            >
            <button class="mobile-homepage-close-btn" on:click={() => close()}
                >{t("common.back")}</button
            >
        </div>
        <div class="mobile-homepage-fit"></div>
    {:else}
        <div class="mobile-homepage-not-advanced">
            <h2>{t("common.vipFeatureTitle")}</h2>
            <h3>{t("common.vipFeatureHint")}</h3>
        </div>
    {/if}
</div>