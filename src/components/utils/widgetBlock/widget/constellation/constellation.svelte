<script lang="ts">
    import { showMessage } from "siyuan";
    import { onMount } from "svelte";
    import { pluginT as t } from "@/libs/i18n";

    export let plugin: any;
    export let contentTypeJson: string = "{}";
    const parsedContent = JSON.parse(contentTypeJson);
    const selectedConstellation =
        parsedContent.data?.selectedConstellation || "capricorn";

    let constellationData: any = null;
    let advancedEnabled = false;

    const constellationKeys = [
        "aries",
        "taurus",
        "gemini",
        "cancer",
        "leo",
        "virgo",
        "libra",
        "scorpio",
        "sagittarius",
        "capricorn",
        "aquarius",
        "pisces",
    ] as const;

    type ConstellationKey = (typeof constellationKeys)[number];

    onMount(async () => {
        advancedEnabled = plugin.ADVANCED;
        constellationData = await getConstellationInfo();
    });

    const getConstellationInfo = async () => {
        const response = await fetch(
            `https://v2.xxapi.cn/api/horoscope?type=${selectedConstellation}&time=today`,
        );
        const data = await response.json();

        if (data.code != 200) {
            showMessage(
                t(plugin, "messages.constellationError", {
                    name: getDisplayName(selectedConstellation),
                    msg: data.msg,
                }),
            );
            return;
        }

        return data.data;
    };

    const getDisplayName = (englishName: string): string => {
        if (constellationKeys.includes(englishName as ConstellationKey)) {
            return t(plugin, `widgets.constellation.${englishName}`);
        }
        return englishName;
    };

    const getFieldName = (field: string): string => {
        return t(plugin, `widgets.constellation.field.${field}`);
    };
</script>

<div class="content-display">
    {#if advancedEnabled}
        <h3 class="widget-title">
            {constellationData?.title ? constellationData.title : getDisplayName(selectedConstellation)}
        </h3>

        {#if constellationData}
            <div class="fortune-card">
                <div class="fortune-card1">
                    <div class="fortune-item">
                        <span><strong>{t(plugin, "widgets.constellation.index.all")}</strong>：{constellationData.index?.all || 'N/A'}</span>
                    </div>
                    <div class="fortune-item">
                        <span><strong>{t(plugin, "widgets.constellation.index.health")}</strong>：{constellationData.index?.health || 'N/A'}</span>
                    </div>
                    <div class="fortune-item">
                        <span><strong>{t(plugin, "widgets.constellation.index.love")}</strong>：{constellationData.index?.love || 'N/A'}</span>
                    </div>
                    <div class="fortune-item">
                        <span><strong>{t(plugin, "widgets.constellation.index.money")}</strong>：{constellationData.index?.money || 'N/A'}</span>
                    </div>
                    <div class="fortune-item">
                        <span><strong>{t(plugin, "widgets.constellation.index.work")}</strong>：{constellationData.index?.work || 'N/A'}</span>
                    </div>
                </div>

                <div class="fortune-card1">
                    <div class="fortune-item">
                        <span><strong>{getFieldName("luckycolor")}</strong>：{constellationData.luckycolor}</span>
                    </div>
                    <div class="fortune-item">
                        <span><strong>{getFieldName("luckynumber")}</strong>：{constellationData.luckynumber}</span>
                    </div>
                    <div class="fortune-item">
                        <span><strong>{getFieldName("luckyconstellation")}</strong>：{constellationData.luckyconstellation}</span>
                    </div>
                    <div class="fortune-item">
                        <span><strong>{t(plugin, "widgets.constellation.todo")}</strong>：{t(plugin, "widgets.constellation.todoYiJi", { yi: constellationData.todo?.yi || 'N/A', ji: constellationData.todo?.ji || 'N/A' })}</span>
                    </div>
                    <div class="fortune-item">
                        <span><strong>{t(plugin, "widgets.constellation.shortComment")}</strong>：{constellationData.shortcomment}</span>
                    </div>
                </div>

                <div class="fortune-card2">
                    {#each ["all", "health", "love", "money", "work"] as field}
                        <div class="fortune-item">
                            <h4>{getFieldName(field)}</h4>
                            <p>{constellationData.fortunetext?.[field]}</p>
                        </div>
                    {/each}
                </div>
            </div>
        {:else}
            <div style="text-align: center; padding: 2rem; color: var(--b3-theme-on-surface-light);">
                <p>{t(plugin, "widgets.constellation.loading")}</p>
                <small style="font-size: 12px; margin-top: 8px; display: block;">
                    {t(plugin, "widgets.constellation.constellationLabel", { name: getDisplayName(selectedConstellation) })}
                </small>
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
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 12px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

        .widget-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 0.5rem;
            padding-bottom: 0.3rem;
            border-bottom: 1px solid var(--b3-border-color);
            text-align: center;
            display: inline-block;
            line-height: 1.2;
        }

        .fortune-card {
            display: flex;
            overflow-y: auto;
            flex-direction: column;
            gap: 1.5rem;

            .fortune-card1 {
                padding-left: 0;
                margin: 0;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                grid-gap: 0.8rem;
                align-items: start;
            }

            .fortune-card2 {
                display: flex;
                flex-direction: column;
                gap: 1.2rem;
            }

            .fortune-item {
                padding: 0.6rem 0.8rem;
                background-color: var(--b3-theme-surface);
                border-radius: 8px;
                font-size: 14px;
                transition: background-color 0.2s ease;
                break-inside: avoid;
                display: flex;
                flex-direction: column;
                border-left: 3px solid var(--b3-theme-primary);

                h4 {
                    font-weight: 600;
                    margin-bottom: 0.4rem;
                    color: var(--b3-theme-on-surface);
                    font-size: 15px;
                }

                p {
                    margin: 0;
                    line-height: 1.5;
                    color: var(--b3-theme-on-surface-light);
                }

                span {
                    line-height: 1.4;
                }
            }
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
    }
</style>
