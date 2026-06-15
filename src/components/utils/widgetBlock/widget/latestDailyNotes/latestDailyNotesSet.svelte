<script lang="ts">
    import { pluginT } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let docJournalLimit: number = 5;
    export let recentJournalsShowType: string = "list";
    export let recentJournalsCalendarIcon: string = "📝";
    export let recentJournalsCalendarIconSize: number = 16;
    export let showLatestDailyNotesFloatDoc: boolean = true;
    export let latestDailyNotesFloatDocShowTime: number = 0.1;

    const tutorialLink = getTutorialLink("widgets.latestDailyNotes");
    const limitOptions = [5, 10, 15, 20, 50, 100];

    function t(key: string, vars?: Record<string, string | number>) {
        return pluginT(plugin, key, vars);
    }
</script>

<div class="content-panel recent-journals">
    <div>
        <label for="recentJournalsShowType"
            >{t("widgets.latestDailyNotes.displayMode")}</label
        >
        <select
            id="recentJournalsShowType"
            class="form-control"
            bind:value={recentJournalsShowType}
        >
            <option value="list"
                >{t("widgets.latestDailyNotes.listMode")}</option
            >
            <option value="calendar"
                >{t("widgets.latestDailyNotes.calendarMode")}</option
            >
        </select>
    </div>
    {#if recentJournalsShowType === "list"}
        <div class="form-group">
            <label for="journal-limit"
                >{t("widgets.latestDailyNotes.limit")}</label
            >
            <select id="journal-limit" bind:value={docJournalLimit}>
                {#each limitOptions as option}
                    <option value={option}>{option}</option>
                {/each}
            </select>
        </div>
    {/if}
    {#if recentJournalsShowType === "calendar"}
        <div class="form-group recent-journals-calendar">
            <label for="recentJournalsCalendarIcon">
                {t("widgets.latestDailyNotes.icon")}
                <input
                    id="recentJournalsCalendarIcon"
                    type="text"
                    bind:value={recentJournalsCalendarIcon}
                />
            </label>
            <label for="recentJournalsCalendarIconSize">
                {t("widgets.latestDailyNotes.iconSize")}
                <input
                    id="recentJournalsCalendarIconSize"
                    min="10"
                    max="50"
                    type="number"
                    bind:value={recentJournalsCalendarIconSize}
                />
            </label>
        </div>
    {/if}

    <div class="form-group">
        <label for="show-latest-daily-notes-float-doc">
            <input
                id="show-latest-daily-notes-float-doc"
                type="checkbox"
                bind:checked={showLatestDailyNotesFloatDoc}
            />
            {t("common.showPreviewPopup")}
        </label>
        <label for="latest-daily-notes-float-doc-show-time">
            {t("common.hoverTime")}
            <input
                type="number"
                title={t("common.hoverTimeTitle")}
                bind:value={latestDailyNotesFloatDocShowTime}
            />
            {t("common.seconds")}
        </label>
    </div>

    <hr />
    <div>
        {t("common.componentDescription")}<a
            href={tutorialLink.url}
            target="_blank">{tutorialLink.label}</a
        >
    </div>
</div>

<style lang="scss">
    .recent-journals-calendar {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 10px;

        #recentJournalsCalendarIcon,
        #recentJournalsCalendarIconSize {
            width: 50px;
        }
    }
</style>
