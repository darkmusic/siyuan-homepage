<script lang="ts">
    import { pluginT } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let advancedEnabled: boolean = false;
    export let childDocsTitle: string = "";
    export let childDocsPrefix: string = "📄";
    export let showChildDocsDetails: boolean = true;
    export let childDocsParentId: string = "";
    export let childDocsSortOrder: string = "updated";
    export let showChildDocsFloatDoc: boolean = true;
    export let childDocsFloatDocShowTime: number = 0.1;

    const tutorialLink = getTutorialLink("widgets.childDocs");

    function t(key: string, vars?: Record<string, string | number>) {
        return pluginT(plugin, key, vars);
    }
</script>

<div class="content-display">
    {#if advancedEnabled}
        <div class="content-panel childDocs">
            <div class="form-group childDocs-title">
                <label for="childDocs-title">
                    {t("common.widgetTitle")}
                    <input
                        id="childDocs-title"
                        type="text"
                        bind:value={childDocsTitle}
                        placeholder={t("common.widgetTitleInput")}
                    />
                </label>
            </div>
            <div class="form-group childDocs-prefix">
                <label for="childDocs-prefix">
                    {t("widgets.childDocs.docPrefix")}
                    <input
                        id="childDocs-prefix"
                        type="text"
                        bind:value={childDocsPrefix}
                        placeholder={t("widgets.childDocs.prefix")}
                    />
                </label>
                <label for="childDocs-sortOrder">
                    {t("common.sortOrder")}
                    <select
                        id="childDocs-sortOrder"
                        bind:value={childDocsSortOrder}
                    >
                        <option value="updated"
                            >{t("common.updatedTime")}</option
                        >
                        <option value="created"
                            >{t("common.createdTime")}</option
                        >
                    </select>
                </label>
                <label for="childDocs-showChildDocsDetails">
                    {t("widgets.childDocs.showDetails")}
                    <input
                        id="childDocs-showChildDocsDetails"
                        type="checkbox"
                        bind:checked={showChildDocsDetails}
                    />
                </label>
            </div>
            <div class="form-group childDocs-parentId">
                <label for="childDocs-parentId">
                    {t("widgets.childDocs.parentIdLabel")}
                    <input
                        id="childDocs-parentId"
                        type="text"
                        bind:value={childDocsParentId}
                        placeholder={t("widgets.childDocs.parentId")}
                    />
                </label>
            </div>
            <div class="form-group">
                <label for="show-childDocs-float-doc">
                    <input
                        id="show-childDocs-float-doc"
                        type="checkbox"
                        bind:checked={showChildDocsFloatDoc}
                    />
                    {t("common.showPreviewPopup")}
                </label>
                <label for="childDocs-float-doc-show-time">
                    {t("common.hoverTime")}
                    <input
                        type="number"
                        title={t("common.hoverTimeTitle")}
                        bind:value={childDocsFloatDocShowTime}
                    />
                    {t("common.seconds")}
                </label>
            </div>
        </div>
    {:else}
        <h3>{t("common.vipBenefitTitle")}</h3>
    {/if}
    <hr />
    <div>
        {t("common.componentDescription")}<a
            href={tutorialLink.url}
            target="_blank">{tutorialLink.label}</a
        >
    </div>
</div>

<style lang="scss">
    .childDocs {
        .childDocs-prefix {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            gap: 10px;

            input {
                max-width: 50px;
            }
        }
    }
</style>
