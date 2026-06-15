<script lang="ts">
    import { sql } from "@/api";
    import { onMount } from "svelte";
    import { openDocs } from "@/components/tools/openDocs";
    import { pluginT as t } from "@/libs/i18n";

    export let plugin: any;
    export let contentTypeJson: string = "{}";

    const parsed = JSON.parse(contentTypeJson);
    let sqlTitle = parsed.data?.sqlTitle || t(plugin, "widgets.defaults.sqlTitle");
    const sqlInput = parsed.data?.sqlInput || "";
    const columnOrder =
        parsed.data?.columnOrder
            ?.replace(/，/g, ",")
            .split(",")
            .map((s) => s.trim()) || [];

    let data: any[] = [];
    let filteredData: any[] = [];
    let notebooksList: any[] = [];

    let hiddenFields =
        parsed.data?.hiddenFields
            ?.replace(/，/g, ",")
            .split(",")
            .map((s) => s.trim()) || [];
    let hiddenProperties: Record<string, any> = {};

    const fieldKeyMap: Record<string, string> = {
        id: "id",
        parent_id: "parentId",
        root_id: "rootId",
        box: "box",
        path: "path",
        hpath: "hpath",
        name: "name",
        alias: "alias",
        memo: "memo",
        tag: "tag",
        content: "content",
        fcontent: "fcontent",
        markdown: "markdown",
        length: "length",
        type: "type",
        subtype: "subtype",
        ial: "ial",
        sort: "sort",
        created: "created",
        updated: "updated",
    };

    const blockTypeKeys = [
        "audio",
        "av",
        "b",
        "c",
        "d",
        "h",
        "html",
        "i",
        "iframe",
        "l",
        "m",
        "p",
        "query_embed",
        "s",
        "t",
        "tb",
        "video",
        "widget",
    ] as const;

    function getFieldName(key: string): string {
        const i18nKey = fieldKeyMap[key];
        return i18nKey
            ? t(plugin, `widgets.sql.field.${i18nKey}`)
            : key;
    }

    function getBlockTypeName(value: string): string {
        if (blockTypeKeys.includes(value as (typeof blockTypeKeys)[number])) {
            return t(plugin, `widgets.sql.blockType.${value}`);
        }
        return value;
    }

    function processItem(item: any) {
        const notebookName =
            notebooksList.find((n) => n.id === item.box)?.name || item.box;

        const [visiblePart, hiddenPart] = Object.entries(item).reduce(
            ([vis, hid], [key, value]) => {
                if (hiddenFields.includes(key)) {
                    hid[key] = value;
                    return [vis, hid];
                }

                if (key === "box") {
                    vis[key] = notebookName;
                } else {
                    vis[key] = value;
                }
                return [vis, hid];
            },
            [{}, {}] as [Record<string, any>, Record<string, any>],
        );

        hiddenProperties = hiddenPart;

        return Object.entries(visiblePart).reduce(
            (acc, [key, value]) => {
                const displayKey = getFieldName(key);
                const formattedValue =
                    key === "created" || key === "updated"
                        ? formatTimestamp(value as string)
                        : value;

                acc[displayKey] =
                    key === "type"
                        ? getBlockTypeName(value as string)
                        : formattedValue;
                return acc;
            },
            {} as Record<string, any>,
        );
    }

    async function runSql() {
        const result = await sql(sqlInput);
        data = result;
        filteredData = result.map(processItem);
    }

    async function getNotebooks() {
        const result = await plugin.client.lsNotebooks();
        notebooksList = result.data?.notebooks || [];
    }

    function formatTimestamp(ts: string): string {
        if (!ts || ts.length !== 14) return ts;

        const year = ts.substring(0, 4);
        const month = ts.substring(4, 6);
        const day = ts.substring(6, 8);
        const hour = ts.substring(8, 10);
        const minute = ts.substring(10, 12);
        const second = ts.substring(12, 14);

        return t(plugin, "common.dateTimeFormat", {
            year,
            month,
            day,
            hour,
            minute,
            second,
        });
    }

    function openDocument(id: string) {
        openDocs(plugin, id);
    }

    function getSortedColumns(item: Record<string, any>) {
        const allKeys = Object.keys(item);
        const orderedKeys = columnOrder
            .map((k) => getFieldName(k))
            .filter((k) => !hiddenFields.includes(k) && allKeys.includes(k));
        const remainingKeys = allKeys.filter(
            (k) => !orderedKeys.includes(k) && !hiddenFields.includes(k),
        );

        return [...orderedKeys, ...remainingKeys];
    }

    onMount(async () => {
        await getNotebooks();
        runSql();
    });
</script>

<div class="content-display">
    <h3 class="widget-title">{sqlTitle}</h3>
    <div class="sql-display-content">
        {#if filteredData.length > 0}
            <table class="sql-table">
                <thead>
                    <tr>
                        {#if filteredData[0]}
                            {#each getSortedColumns(filteredData[0]) as key}
                                <th>{key}</th>
                            {/each}
                        {/if}
                    </tr>
                </thead>
                <tbody>
                    {#each filteredData as row}
                        <tr>
                            {#each getSortedColumns(row) as key}
                                <td
                                    class={key === getFieldName("hpath")
                                        ? "clickable-path"
                                        : ""}
                                    on:click={key === getFieldName("hpath")
                                        ? () => openDocument(row[getFieldName("id")])
                                        : null}
                                >
                                    {row[key] || "-"}
                                </td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        {:else}
            <p>{t(plugin, "widgets.sql.noResults")}</p>
        {/if}
    </div>
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

        .sql-display-content {
            width: 100%;
            height: 100%;
            overflow: auto;

            .sql-table {
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
                border-radius: 8px;
                overflow: hidden;
                table-layout: fixed;

                th,
                td {
                    padding: 8px 12px;
                    border: 1px solid var(--b3-border-color);
                    max-width: 300px;
                    white-space: nowrap;
                    user-select: text;
                }

                th {
                    position: sticky;
                    text-align: center;
                    top: 0;
                    z-index: 1;
                    font-weight: 600;
                    text-transform: capitalize;
                    color: var(--b3-theme-primary);
                    border-bottom: 2px solid var(--b3-border-color);
                }

                td {
                    text-align: left;
                    transition: background-color 0.2s;
                    overflow: auto;
                }

                tr:last-child td {
                    border-bottom: none;
                }

                .clickable-path {
                    color: var(--b3-theme-primary);
                    text-decoration: underline;

                    &:hover {
                        color: var(--b3-list-hover);
                        cursor: pointer;
                    }
                }
            }

            // 空状态提示美化
            p {
                text-align: center;
                color: var(--text-secondary);
                padding: 1.5rem;
                font-style: italic;
            }
        }
    }
</style>
