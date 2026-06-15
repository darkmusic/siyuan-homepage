<script lang="ts">
    import MultiSelect from "svelte-multiselect";
    import { onMount } from "svelte";
    import { pluginT } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let notebooks: any[] = [];
    export let docLimit: number = 5;
    export let ensureOpenDocs: boolean = false;
    export let selectedNotebookIds: any[] = [];
    export let docNotebookId: string = "";
    export let latestDocsTitle: string = "";
    export let latestDocsPrefix: string = "";
    export let showLatestDocDetails: boolean = true;
    export let showLatestDocFloatDoc: boolean = true;
    export let latestDocsFloatDocShowTime: number = 0.1;

    const tutorialLink = getTutorialLink("widgets.latestDocs");

    function t(key: string, vars?: Record<string, string | number>) {
        return pluginT(plugin, key, vars);
    }

    $: limitOptions = [
        { value: 3, label: t("widgets.latestDocs.limit3") },
        { value: 5, label: t("widgets.latestDocs.limit5") },
        { value: 10, label: t("widgets.latestDocs.limit10") },
        { value: 15, label: t("widgets.latestDocs.limit15") },
        { value: 20, label: t("widgets.latestDocs.limit20") },
        { value: 50, label: t("widgets.latestDocs.limit50") },
        { value: 100, label: t("widgets.latestDocs.limit100") },
    ];

    function initializeSelectedNotebooks() {
        if (
            docNotebookId &&
            notebooks.length > 0 &&
            selectedNotebookIds.length === 0
        ) {
            selectedNotebookIds = docNotebookId
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

<div class="latest-docs-settings">
    <div class="group1">
        <div class="setting-item">
            <label for="latest-docs-title">
                {t("common.widgetTitle")}
                <input
                    id="latest-docs-title"
                    type="text"
                    bind:value={latestDocsTitle}
                    placeholder={t("widgets.defaults.latestDocsTitle")}
                />
            </label>
        </div>

        <div class="setting-item">
            <label for="latest-docs-prefix">
                {t("widgets.latestDocs.docPrefix")}
                <input
                    id="latest-docs-prefix"
                    type="text"
                    bind:value={latestDocsPrefix}
                    placeholder=""
                />
            </label>
        </div>
    </div>

    <div class="group2">
        <div class="setting-item">
            <label for="doc-limit">{t("widgets.latestDocs.limit")}</label>
            <select bind:value={docLimit}>
                {#each limitOptions as option}
                    <option value={option.value}>{option.label}</option>
                {/each}
            </select>
        </div>

        <div class="setting-item">
            <label>
                <input type="checkbox" bind:checked={ensureOpenDocs} />
                {t("widgets.latestDocs.includeOpen")}
            </label>
        </div>

        <div class="setting-item">
            <label>
                <input type="checkbox" bind:checked={showLatestDocDetails} />
                {t("widgets.latestDocs.showDetails")}
            </label>
        </div>
    </div>

    <div class="setting-item">
        <label for="doc-notebook-id">
            {t("widgets.latestDocs.notebook")}
            <MultiSelect
                bind:selected={selectedNotebookIds}
                options={notebooks.map((notebook) => ({
                    label: notebook.name,
                    value: notebook.id,
                }))}
                placeholder={t("common.selectNotebook")}
            /></label
        >
    </div>

    <div class="form-group">
        <label for="show-latest-docs-float-doc">
            <input
                id="show-latest-docs-float-doc"
                type="checkbox"
                bind:checked={showLatestDocFloatDoc}
            />
            {t("common.showPreviewPopup")}
        </label>
        <label for="latest-docs-float-doc-show-time">
            {t("common.hoverTime")}
            <input
                type="number"
                title={t("common.hoverTimeTitle")}
                bind:value={latestDocsFloatDocShowTime}
            />
            {t("common.seconds")}
        </label>
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
    .group1 {
        display: flex;
        gap: 10px;
        align-items: center;

        #latest-docs-title {
            width: 200px;
        }

        #latest-docs-prefix {
            width: 50px;
        }
    }

    .group2 {
        display: flex;
        gap: 10px;
        align-items: center;
    }
</style>
