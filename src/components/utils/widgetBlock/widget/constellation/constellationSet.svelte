<script lang="ts">
    import { pluginT as t } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let advancedEnabled: boolean = false;
    export let selectedConstellation: string = "capricorn";

    const tutorial = getTutorialLink("widgets.constellation");

    const constellations = [
        { value: "capricorn", key: "widgets.constellation.capricorn" },
        { value: "aquarius", key: "widgets.constellation.aquarius" },
        { value: "pisces", key: "widgets.constellation.pisces" },
        { value: "aries", key: "widgets.constellation.aries" },
        { value: "taurus", key: "widgets.constellation.taurus" },
        { value: "gemini", key: "widgets.constellation.gemini" },
        { value: "cancer", key: "widgets.constellation.cancer" },
        { value: "leo", key: "widgets.constellation.leo" },
        { value: "virgo", key: "widgets.constellation.virgo" },
        { value: "libra", key: "widgets.constellation.libra" },
        { value: "scorpio", key: "widgets.constellation.scorpio" },
        { value: "sagittarius", key: "widgets.constellation.sagittarius" },
    ];
</script>

<div class="content-display">
    {#if advancedEnabled}
        <div class="content-panel constellation">
            <label for="constellation"
                >{t(plugin, "widgets.constellation.select")}
                <select id="constellation" bind:value={selectedConstellation}>
                    {#each constellations as constellation}
                        <option value={constellation.value}>{t(plugin, constellation.key)}</option>
                    {/each}
                </select>
            </label>
        </div>
    {:else}
        <h3>{t(plugin, "common.vipBenefitTitle")}</h3>
    {/if}
    <hr />
    <div>
        {t(plugin, "common.componentDescription")}<a
            href={tutorial.url}
            target="_blank">{tutorial.label}</a
        >
    </div>
    <p>{t(plugin, "common.apiNote")}</p>
</div>
