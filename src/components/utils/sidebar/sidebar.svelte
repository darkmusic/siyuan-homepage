<script lang="ts">
    import { onMount } from "svelte";
    import Sortable from "sortablejs";
    import { saveLayout, restoreLayout } from "./widget_layout";
    import { addCustomBlock } from "./block-creator";
    import { pluginT } from "@/libs/i18n";

    import "./siderBar.scss";

    export let plugin: any;

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
                ".sidebar-widget",
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

<div class="sidebar-display">
    {#if advanced}
        <div class="sidebar-widget"></div>
        <div class="sidebar-setting">
            <button
                class="add-widget-btn"
                on:click={() =>
                    addCustomBlock(plugin, currentBlockForSettingsRef)}
                >{t("homepage.button.addWidget")}</button
            >
        </div>
    {:else}
        <div class="sidebar-not-advanced">
            <h2>{t("common.vipFeatureTitle")}</h2>
            <h3>{t("common.vipFeatureHint")}</h3>
        </div>
    {/if}
</div>
