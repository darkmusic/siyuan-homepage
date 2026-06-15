<script lang="ts">
    import { onMount } from "svelte";
    import { pluginT as t } from "@/libs/i18n";

    import Classic from "./_classic.svelte";
    import Tradition1 from "./_tradition1.svelte";

    export let plugin: any;
    export let contentTypeJson: string = "{}";

    const parsedContent = JSON.parse(contentTypeJson);
    const almanacStyle = parsedContent.data.almanacStyle || "classic";

    let advancedEnabled = false;

    onMount(async () => {
        advancedEnabled = plugin.ADVANCED;
    });
</script>

<div class="content-display">
    {#if advancedEnabled}
        {#if almanacStyle === "classic"}
            <Classic {plugin}></Classic>
        {:else if almanacStyle === "tradition1"}
            <Tradition1 {plugin}></Tradition1>
        {:else}
            <div class="almanac-display">
                <div class="almanac-classic"></div>
            </div>
        {/if}
    {:else}
        <div class="content-not-advanced">
            <h2>{t(plugin, "common.vipFeatureTitle")}</h2>
            <h3>{t(plugin, "common.vipFeatureHint")}</h3>
        </div>
    {/if}
</div>

<style lang="scss">
    .content-display {
        width: 100%;
        height: calc(100%);
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        border-radius: 12px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }

    .content-not-advanced {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }
</style>
