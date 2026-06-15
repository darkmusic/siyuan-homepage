<script lang="ts">
    import { onMount } from "svelte";
    import { pluginT as t } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let advancedEnabled: boolean = false;
    export let CMKnockSound: string = "普通";

    const tutorial = getTutorialLink("widgets.cybmok");

    let CYBMOKData: any = {};
    let totalMerit: number = 0;
    let maxMeritDate: { date: string; count: number } = { date: "", count: 0 };

    onMount(async () => {
        CYBMOKData = await plugin.loadData("CYBMOKData.json");

        totalMerit = Number(getTotalMerit());

        maxMeritDate = getMaxMeritDate();
    });

    // 计算总功德数
    function getTotalMerit() {
        if (!CYBMOKData || typeof CYBMOKData !== "object") return 0;
        return Object.values(CYBMOKData).reduce(
            (total: number, count: any) => total + (Number(count) || 0),
            0,
        );
    }

    // 获取最多功德的日期
    function getMaxMeritDate() {
        if (
            !CYBMOKData ||
            typeof CYBMOKData !== "object" ||
            Object.keys(CYBMOKData).length === 0
        ) {
            return { date: "", count: 0 };
        }

        let maxDate = "";
        let maxCount = 0;

        for (const [date, count] of Object.entries(CYBMOKData)) {
            const numCount = Number(count) || 0;
            if (numCount > maxCount) {
                maxCount = numCount;
                maxDate = date;
            }
        }

        const formattedDate =
            maxDate.length === 8
                ? t(plugin, "widgets.cybmok.dateDisplay", {
                      year: maxDate.slice(0, 4),
                      month: maxDate.slice(4, 6),
                      day: maxDate.slice(6, 8),
                  })
                : maxDate;

        return { date: formattedDate, count: maxCount };
    }
</script>

<div class="content-panel">
    {#if advancedEnabled}
        <div class="content-panel">
            <label>
                {t(plugin, "widgets.cybmok.soundEffect")}
                <select bind:value={CMKnockSound}>
                    <option value="普通">{t(plugin, "widgets.cybmok.soundNormal")}</option>
                    <option value="空洞">{t(plugin, "widgets.cybmok.soundHollow")}</option>
                    <option value="空灵">{t(plugin, "widgets.cybmok.soundEthereal")}</option>
                </select>
            </label>
        </div>

        {#if totalMerit > 0}
            <!-- 功德统计总结 -->
            <div class="merit-summary">
                <div class="summary-item">
                    <span class="summary-label">{t(plugin, "widgets.cybmok.totalMeritLabel")}</span>
                    <span class="summary-value">{totalMerit}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">{t(plugin, "widgets.cybmok.maxMeritOn")}</span>
                    <span class="summary-date">{maxMeritDate.date}</span>
                    <span class="summary-label">{t(plugin, "widgets.cybmok.maxMeritDayLabel")}</span
                    >
                    <span class="summary-value">{maxMeritDate.count}</span>
                </div>
            </div>
        {:else}
            <h3>{t(plugin, "widgets.cybmok.noMeritRecord")}</h3>
        {/if}
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
</div>

<style lang="scss">
    .merit-summary {
        margin-top: 1rem;
        padding: 1rem;
        background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
        border-radius: 8px;
        border-left: 4px solid #ffd700;
    }

    .summary-item {
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5rem;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .summary-label {
        color: #666;
        font-size: 0.9rem;
    }

    .summary-value {
        color: #ff6b35;
        font-weight: bold;
        font-size: 1.1rem;
        background: linear-gradient(45deg, #ffd700, #ffa500);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .summary-date {
        color: red;
        font-weight: 600;
        padding: 0.2rem 0.5rem;
        background: rgba(74, 144, 226, 0.1);
        border-radius: 4px;
        font-size: 0.9rem;
    }
</style>
