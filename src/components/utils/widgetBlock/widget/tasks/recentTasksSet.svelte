<script lang="ts">
    import MultiSelect from "svelte-multiselect";
    import { onMount } from "svelte";
    import { pluginT } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let notebooks: any[] = [];
    export let TaskManTitle: string = "";
    export let showCompletedTasks: boolean = false;
    export let showTasksDetails: boolean = false;
    export let selectedTasksNotebookIds: any[] = [];
    export let docNotebookId: string = "";

    const tutorialLink = getTutorialLink("widgets.tasks");

    function t(key: string, vars?: Record<string, string | number>) {
        return pluginT(plugin, key, vars);
    }

    function initializeSelectedNotebooks() {
        if (
            docNotebookId &&
            notebooks.length > 0 &&
            selectedTasksNotebookIds.length === 0
        ) {
            selectedTasksNotebookIds = docNotebookId
                .split(",")
                .filter((id) => id.trim())
                .map((id) => {
                    const notebook = notebooks.find(
                        (notebook) => notebook.id === id,
                    );
                    return {
                        label: notebook ? notebook.name : id,
                        value: id,
                    };
                });
        }
    }

    onMount(() => {
        initializeSelectedNotebooks();
    });

    $: if (docNotebookId && notebooks.length > 0) {
        initializeSelectedNotebooks();
    }
</script>

<div class="content-panel TaskMan">
    <div class="form-group">
        <label for="TaskMan-title">
            {t("common.widgetTitle")}
            <input
                id="TaskMan-title"
                type="text"
                bind:value={TaskManTitle}
                placeholder={t("common.widgetTitleInput")}
            />
        </label>
    </div>
    <div class="form-group TaskMan-checkbox">
        <label>
            <input type="checkbox" bind:checked={showCompletedTasks} />
            {t("widgets.tasks.showCompleted")}
        </label>
        <label>
            <input type="checkbox" bind:checked={showTasksDetails} />
            {t("widgets.tasks.showDetails")}
        </label>
    </div>
    <div class="form-group TaskMan-notebook-id">
        <label for="TaskMan-notebook-id"
            >{t("widgets.tasks.notebook")}</label
        >
        <MultiSelect
            id="TaskMan-notebook-id"
            bind:selected={selectedTasksNotebookIds}
            options={notebooks.map((notebook) => ({
                label: notebook.name,
                value: notebook.id,
            }))}
            placeholder={t("common.selectNotebook")}
        />
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
    .TaskMan-checkbox {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .TaskMan-notebook-id {
        display: flex;
        flex-direction: column;

        label {
            font-size: 14px;
            margin-right: 0.5rem;
            white-space: nowrap;
            width: auto;
        }
    }
</style>
