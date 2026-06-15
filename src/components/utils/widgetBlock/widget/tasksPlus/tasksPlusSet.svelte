<script lang="ts">
    import { pluginT } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let TaskManPlusTitle: string = "";
    export let isCustomFilter: boolean = false;
    export let internalFilter: string = "all";
    export let customFilter: string = "";
    export let tasksSort: string = "startdate";

    const tutorialLink = getTutorialLink("widgets.tasksPlus");

    function t(key: string, vars?: Record<string, string | number>) {
        return pluginT(plugin, key, vars);
    }
</script>

<div class="tasks-plus-settings">
    <div class="setting-item">
        <label for="task-plus-title">{t("common.widgetTitle")}</label>
        <input
            id="task-plus-title"
            type="text"
            bind:value={TaskManPlusTitle}
            placeholder={t("widgets.defaults.taskManPlusTitle")}
        />
    </div>

    <div class="setting-item">
        <label>
            <input type="checkbox" bind:checked={isCustomFilter} />
            {t("widgets.tasksPlus.customFilter")}
        </label>
    </div>

    {#if !isCustomFilter}
        <div class="setting-item">
            <label for="internal-filter"
                >{t("widgets.tasksPlus.filter")}</label
            >
            <select id="internal-filter" bind:value={internalFilter}>
                <option value="all"
                    >{t("widgets.tasksPlus.filterAll")}</option
                >
                <option value="uncompleted"
                    >{t("widgets.tasksPlus.filterUncompleted")}</option
                >
                <option value="completed"
                    >{t("widgets.tasksPlus.filterCompleted")}</option
                >
                <option value="today"
                    >{t("widgets.tasksPlus.filterToday")}</option
                >
                <option value="tomorrow"
                    >{t("widgets.tasksPlus.filterTomorrow")}</option
                >
                <option value="mostImportant"
                    >{t("widgets.tasksPlus.filterMostImportant")}</option
                >
            </select>
        </div>
    {:else}
        <div class="setting-item">
            <label for="custom-filter"
                >{t("widgets.tasksPlus.filterSyntax")}</label
            >
            <textarea
                id="custom-filter"
                placeholder={t("widgets.tasksPlus.filterSyntaxPlaceholder")}
                bind:value={customFilter}
            ></textarea>
            <p>
                {t("widgets.tasksPlus.filterSyntaxHintPrefix")}<a
                    href={tutorialLink.url}
                    target="_blank"
                    >{t("widgets.tasksPlus.filterSyntaxLink")}</a
                >{t("widgets.tasksPlus.filterSyntaxHintSuffix")}
            </p>
        </div>
    {/if}

    <div class="setting-item">
        <label for="tasks-sort">{t("widgets.tasksPlus.sort")}</label>
        <select id="tasks-sort" bind:value={tasksSort}>
            <option value="startdate"
                >{t("widgets.tasksPlus.sortStartDate")}</option
            >
            <option value="deadline"
                >{t("widgets.tasksPlus.sortDeadline")}</option
            >
            <option value="priority"
                >{t("widgets.tasksPlus.sortPriority")}</option
            >
        </select>
    </div>

    <div class="component-help">
        <hr />
        <div>
            {t("common.componentDescription")}<a
                href={tutorialLink.url}
                target="_blank">{tutorialLink.label}</a
            >
        </div>
    </div>
</div>

<style lang="scss">
</style>
