<script lang="ts">
    import { pluginT } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let advancedEnabled: boolean = false;
    export let conditionDocsTitle: string = "";
    export let conditionDocsPrefix: string = "📄";
    export let showConditionDocsDetails: boolean = true;
    export let conditionDocsCondition: string = "keyword";
    export let conditionDocsKeyPosition: string = "anywhere";
    export let conditionDocsKeyWord: string = "";
    export let conditionDocsSortOrder: string = "updated";
    export let showConditionDocsFloatDoc: boolean = true;
    export let conditionDocsFloatDocShowTime: number = 0.1;
    export let conditionDocsTag: string = "";

    const tutorialLink = getTutorialLink("widgets.conditionDocs");

    function t(key: string, vars?: Record<string, string | number>) {
        return pluginT(plugin, key, vars);
    }
</script>

<div class="content-display">
    {#if advancedEnabled}
        <div class="content-panel conditionDocs">
            <div class="form-group conditionDocs-title">
                <label for="conditionDocs-title">
                    {t("common.widgetTitle")}
                    <input
                        id="conditionDocs-title"
                        type="text"
                        bind:value={conditionDocsTitle}
                        placeholder={t("common.widgetTitleInput")}
                    />
                </label>
            </div>
            <div class="form-group conditionDocs-prefix">
                <label for="conditionDocs-prefix">
                    {t("widgets.conditionDocs.docPrefix")}
                    <input
                        id="conditionDocs-prefix"
                        type="text"
                        bind:value={conditionDocsPrefix}
                        placeholder={t("widgets.conditionDocs.prefix")}
                    />
                </label>
                <label for="conditionDocs-sortOrder">
                    {t("common.sortOrder")}
                    <select
                        id="conditionDocs-sortOrder"
                        bind:value={conditionDocsSortOrder}
                    >
                        <option value="updated"
                            >{t("common.updatedTime")}</option
                        >
                        <option value="created"
                            >{t("common.createdTime")}</option
                        >
                    </select>
                </label>
                <label for="conditionDocs-showconditionDocsDetails">
                    {t("widgets.conditionDocs.showDetails")}
                    <input
                        id="conditionDocs-showconditionDocsDetails"
                        type="checkbox"
                        bind:checked={showConditionDocsDetails}
                    />
                </label>
            </div>
            <hr />
            <div
                class="form-group conditionDocs-condition"
                style="display: flex; flex-direction: column;"
            >
                <label for="conditionDocs-condition">
                    {t("widgets.conditionDocs.filterLabel")}
                    <select
                        id="conditionDocs-condition"
                        bind:value={conditionDocsCondition}
                        placeholder={t("widgets.conditionDocs.filter")}
                    >
                        <option value="keyword"
                            >{t("widgets.conditionDocs.keyword")}</option
                        >
                        <option value="tag"
                            >{t("widgets.conditionDocs.tag")}</option
                        >
                    </select>
                </label>

                {#if conditionDocsCondition === "keyword"}
                    <div
                        style="display: flex; align-items: center; gap: 0.5rem;"
                    >
                        <label for="conditionDocs-key-position">
                            {t("widgets.conditionDocs.keywordPosition")}
                            <select
                                id="conditionDocs-key-position"
                                bind:value={conditionDocsKeyPosition}
                            >
                                <option value="anywhere"
                                    >{t("widgets.conditionDocs.anywhere")}</option
                                >
                                <option value="DocTitle"
                                    >{t("widgets.conditionDocs.docTitle")}</option
                                >
                                <option value="body"
                                    >{t("widgets.conditionDocs.body")}</option
                                >
                                <option value="bodyTitle"
                                    >{t("widgets.conditionDocs.bodyTitle")}</option
                                >
                                <option value="paragraph"
                                    >{t("widgets.conditionDocs.paragraph")}</option
                                >
                                <option value="list"
                                    >{t("widgets.conditionDocs.list")}</option
                                >
                                <option value="table"
                                    >{t("widgets.conditionDocs.table")}</option
                                >
                                <option value="code"
                                    >{t("widgets.conditionDocs.code")}</option
                                >
                                <option value="quote"
                                    >{t("widgets.conditionDocs.quote")}</option
                                >
                                <option value="formula"
                                    >{t("widgets.conditionDocs.formula")}</option
                                >
                            </select>
                        </label>
                        <label for="conditionDocs-key">
                            {t("widgets.conditionDocs.keywordLabel")}
                            <input
                                id="conditionDocs-key"
                                type="text"
                                bind:value={conditionDocsKeyWord}
                                placeholder={t(
                                    "widgets.conditionDocs.keywordPlaceholder",
                                )}
                                style="width: 50%;"
                            />
                        </label>
                    </div>
                {:else if conditionDocsCondition === "tag"}
                    <label for="conditionDocs-tag">
                        {t("widgets.conditionDocs.tagLabel")}
                        <input
                            id="conditionDocs-tag"
                            type="text"
                            bind:value={conditionDocsTag}
                            placeholder={t(
                                "widgets.conditionDocs.tagPlaceholder",
                            )}
                            style="width: 50%;"
                        />
                    </label>
                {/if}
            </div>
            <hr />
            <div class="form-group">
                <label for="show-conditionDocs-float-doc">
                    <input
                        id="show-conditionDocs-float-doc"
                        type="checkbox"
                        bind:checked={showConditionDocsFloatDoc}
                    />
                    {t("common.showPreviewPopup")}
                </label>
                <label for="conditionDocs-float-doc-show-time">
                    {t("common.hoverTime")}
                    <input
                        type="number"
                        title={t("common.hoverTimeTitle")}
                        bind:value={conditionDocsFloatDocShowTime}
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
    .conditionDocs {
        .conditionDocs-prefix {
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
