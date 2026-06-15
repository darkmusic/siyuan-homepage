<script lang="ts">
    import { pluginT as t } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let advancedEnabled;
    export let statisticalCardTitle;
    export let statisticalCardTitleSize;
    export let statisticalCardTitleColor;
    export let statisticalCardContent;
    export let statisticalCardCountSize;
    export let statisticalCardCountColor;
    export let customSQLCount;

    const tutorial = getTutorialLink("widgets.statisticalCard");
</script>

<div class="content-panel statisticalCard">
    {#if advancedEnabled}
        <div class="content-panel statisticalCard">
            <div class="form-group statisticalCardTitle">
                <div>
                    <label for="">{t(plugin, "widgets.statisticalCard.title")}</label><input
                        type="text"
                        bind:value={statisticalCardTitle}
                    />
                </div>
                <div>
                    <label for=""
                        >{t(plugin, "widgets.statisticalCard.titleSize")}<input
                            type="number"
                            bind:value={statisticalCardTitleSize}
                        /></label
                    >
                    <label for=""
                        >{t(plugin, "widgets.statisticalCard.titleColor")}<input
                            type="color"
                            bind:value={statisticalCardTitleColor}
                        /></label
                    >
                </div>
            </div>
            <div class="form-group statisticalCardContent">
                <label for=""
                    >{t(plugin, "widgets.statisticalCard.content")}<select
                        name=""
                        id=""
                        bind:value={statisticalCardContent}
                    >
                        <option value="notebooksCount">{t(plugin, "widgets.statisticalCard.notebooksCount")}</option>
                        <option value="docsCount">{t(plugin, "widgets.statisticalCard.docsCount")}</option>
                        <option value="blocksCount">{t(plugin, "widgets.statisticalCard.blocksCount")}</option>
                        <option value="wordsCount">{t(plugin, "widgets.statisticalCard.wordsCount")}</option>
                        <option value="tasksCount">{t(plugin, "widgets.statisticalCard.tasksCount")}</option>
                        <option value="doneTasksCount">{t(plugin, "widgets.statisticalCard.doneTasksCount")}</option>
                        <option value="undoneTasksCount">{t(plugin, "widgets.statisticalCard.undoneTasksCount")}</option>
                        <option value="dailynotesCount">{t(plugin, "widgets.statisticalCard.dailynotesCount")}</option>
                        <option value="tagsCount">{t(plugin, "widgets.statisticalCard.tagsCount")}</option>
                        <option value="citationCount">{t(plugin, "widgets.statisticalCard.citationCount")}</option>
                        <option value="codeBlocksCount">{t(plugin, "widgets.statisticalCard.codeBlocksCount")}</option>
                        <option value="mathBlocksCount">{t(plugin, "widgets.statisticalCard.mathBlocksCount")}</option>
                        <option value="customSQLCount">{t(plugin, "widgets.statisticalCard.customSQLCount")}</option>
                    </select></label
                >
                <div>
                    <label for=""
                        >{t(plugin, "widgets.statisticalCard.countSize")}<input
                            type="number"
                            bind:value={statisticalCardCountSize}
                        /></label
                    >
                    <label for=""
                        >{t(plugin, "widgets.statisticalCard.countColor")}<input
                            type="color"
                            bind:value={statisticalCardCountColor}
                        /></label
                    >
                </div>
            </div>
            {#if statisticalCardContent === "customSQLCount"}
                <div class="form-group">
                    <label for=""
                        >{t(plugin, "widgets.statisticalCard.customSQL")}<textarea
                            bind:value={customSQLCount}
                        /></label
                    >
                </div>
            {/if}
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
</div>

<style lang="scss">
    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        div {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
        }
    }
</style>
