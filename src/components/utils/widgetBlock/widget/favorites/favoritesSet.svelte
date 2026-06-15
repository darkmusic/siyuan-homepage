<script lang="ts">
    import MultiSelect from "svelte-multiselect";
    import { onMount } from "svelte";
    import { pluginT } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let favoritiesTitle: string = "";
    export let favoritiesSortOrder: string = "created";
    export let showNoteMeta: boolean = true;
    export let favoritiesDocPrefix: string = "❤";
    export let favoritesNotebookId: string = "";
    export let selectedFavoritesNotebookIds: {
        label: string;
        value: string;
    }[] = [];
    export let showFavFloatDoc: boolean = true;
    export let favFloatDocShowTime: number = 0.1;
    export let notebooks: any[] = [];

    const tutorialLink = getTutorialLink("widgets.favorites");

    function t(key: string, vars?: Record<string, string | number>) {
        return pluginT(plugin, key, vars);
    }

    function initializeSelectedNotebooks() {
        if (
            favoritesNotebookId &&
            notebooks.length > 0 &&
            selectedFavoritesNotebookIds.length === 0
        ) {
            selectedFavoritesNotebookIds = favoritesNotebookId
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

    $: if (favoritesNotebookId && notebooks.length > 0) {
        initializeSelectedNotebooks();
    }

    $: if (selectedFavoritesNotebookIds) {
        favoritesNotebookId =
            selectedFavoritesNotebookIds.length > 0
                ? selectedFavoritesNotebookIds
                      .map((item) => item.value)
                      .join(",")
                : "";
    }
</script>

<div class="content-panel favorites">
    <div class="favorites-setting-top">
        <div>
            <div class="form-group">
                <label for="favorities-title">
                    {t("common.widgetTitle")}
                    <input
                        id="favorities-title"
                        type="text"
                        bind:value={favoritiesTitle}
                        placeholder={t("common.widgetTitleInput")}
                    />
                </label>
            </div>
            <div class="form-group">
                <label for="favorities-doc-prefix">
                    {t("widgets.favorites.docPrefix")}
                    <input
                        id="favorities-doc-prefix"
                        type="text"
                        bind:value={favoritiesDocPrefix}
                    />
                </label>
            </div>
        </div>
        <div>
            <div class="form-group">
                <label for="favorities-sort-order">
                    {t("common.sortOrder")}
                </label>
                <select
                    id="favorities-sort-order"
                    bind:value={favoritiesSortOrder}
                >
                    <option value="created">{t("common.createdTime")}</option>
                    <option value="updated">{t("common.updatedTime")}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="favorities-show-note-meta">
                    <input
                        id="favorities-show-note-meta"
                        type="checkbox"
                        bind:checked={showNoteMeta}
                    />
                    {t("widgets.favorites.showMeta")}
                </label>
            </div>
        </div>
    </div>
    <div class="favorites-setting-bottom">
        <div class="form-group doc-notebook-id">
            <label for="doc-notebook-id">
                {t("widgets.favorites.notebook")}
            </label>
            <MultiSelect
                id="doc-notebook-id"
                bind:selected={selectedFavoritesNotebookIds}
                options={notebooks.map((notebook) => ({
                    label: notebook.name,
                    value: notebook.id,
                }))}
                placeholder={t("common.selectNotebook")}
            />
            <div class="form-group">
                <label for="show-fav-float-doc">
                    <input
                        id="show-fav-float-doc"
                        type="checkbox"
                        bind:checked={showFavFloatDoc}
                    />
                    {t("common.showPreviewPopup")}
                </label>
                <label for="fav-float-doc-show-time">
                    {t("common.hoverTime")}
                    <input
                        type="number"
                        title={t("common.hoverTimeTitle")}
                        bind:value={favFloatDocShowTime}
                    />
                    {t("common.seconds")}
                </label>
            </div>
        </div>
    </div>
    <hr />
    <div>
        {t("common.componentDescription")}
        <a href={tutorialLink.url} target="_blank">{tutorialLink.label}</a>
    </div>
</div>

<style lang="scss">
    .favorites-setting-top {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;

        input {
            max-width: 150px;
        }
    }
</style>
