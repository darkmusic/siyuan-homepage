<script lang="ts">
    import { onMount } from "svelte";
    import { getLatestFavoritesNotes } from "./favorites";
    import { openDocs } from "@/components/tools/openDocs";
    import { pluginT } from "@/libs/i18n";
    import {
        createFloatingDocPopup,
        setMouseOnTrigger,
        hideImmediately,
    } from "@/components/tools/floatingDoc";

    export let plugin: any;
    export let contentTypeJson: string = "{}";

    const contentTypeJsonObj = JSON.parse(contentTypeJson);

    let favoritesNotes: any[] = [];
    const favoritiesTitle =
        contentTypeJsonObj.data?.favoritiesTitle ||
        pluginT(plugin, "widgets.defaults.favoritesTitle");
    const showNoteMeta = contentTypeJsonObj.data?.showNoteMeta ?? true;
    const favoritiesDocPrefix =
        contentTypeJsonObj.data?.favoritiesDocPrefix || "❤";
    const showFavFloatDoc = contentTypeJsonObj.data?.showFavFloatDoc ?? true;
    const favFloatDocShowTime =
        contentTypeJsonObj.data?.favFloatDocShowTime || 0.1;

    function t(key: string, vars?: Record<string, string | number>) {
        return pluginT(plugin, key, vars);
    }

    function formatDate(raw: string): string {
        const year = raw.slice(0, 4);
        const month = raw.slice(4, 6);
        const day = raw.slice(6, 8);
        return t("common.dateFormatDisplay", { year, month, day });
    }

    let floatDocTimeout: number | null = null;

    onMount(async () => {
        favoritesNotes = await getLatestFavoritesNotes(
            contentTypeJsonObj.data?.favoritiesSortOrder,
            contentTypeJsonObj.data?.favoritesNotebookId,
        );
    });
</script>

<div class="content-display">
    <h3 class="widget-title">{favoritiesTitle}</h3>
    <div class="favorites-content-container">
        {#if favoritesNotes.length}
            <ul class="favorites-list">
                {#each favoritesNotes as note}
                    <li class="favorites-item">
                        <div
                            class="favorites-item-content"
                            on:keydown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    openDocs(plugin, note.id);
                                }
                            }}
                            on:mouseenter={(e) => {
                                if (showFavFloatDoc && !plugin.isMobile) {
                                    if (floatDocTimeout) {
                                        clearTimeout(floatDocTimeout);
                                    }
                                    floatDocTimeout = window.setTimeout(() => {
                                        createFloatingDocPopup(note, e, plugin);
                                        floatDocTimeout = null;
                                    }, favFloatDocShowTime * 1000);
                                }
                            }}
                            on:mouseleave={() => {
                                if (showFavFloatDoc && !plugin.isMobile) {
                                    if (floatDocTimeout) {
                                        clearTimeout(floatDocTimeout);
                                        floatDocTimeout = null;
                                    }
                                    setTimeout(() => {
                                        setMouseOnTrigger(false);
                                    }, 150);
                                }
                            }}
                            on:click={() => {
                                if (showFavFloatDoc && !plugin.isMobile) {
                                    hideImmediately();
                                }
                                openDocs(plugin, note.id);
                            }}
                            role="button"
                            tabindex="0"
                            aria-label={t("widgets.favorites.openAria", {
                                content: note.content,
                            })}
                        >
                            {favoritiesDocPrefix}
                            {note.content}
                        </div>
                        {#if showNoteMeta}
                            <div class="note-meta">
                                {#if contentTypeJsonObj.data?.favoritiesSortOrder === "created"}
                                    {t("widgets.favorites.createdTimeLabel", {
                                        date: formatDate(note.created),
                                    })}
                                {:else}
                                    {t("widgets.favorites.updatedTimeLabel", {
                                        date: formatDate(note.updated),
                                    })}
                                {/if}
                            </div>
                        {/if}
                    </li>
                {/each}
            </ul>
        {:else}
            <p>{t("common.noFavorites")}</p>
        {/if}
    </div>
</div>

<style lang="scss">
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

    .content-display {
        width: 100%;
        height: calc(100%);
        display: flex;
        flex-direction: column;
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 12px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

        .favorites-content-container {
            width: 100%;
            height: 100%;
            overflow-y: auto;
        }

        .favorites-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            grid-gap: 1rem;
            list-style: none;
            padding-left: 0;
            margin: 0;
        }

        .favorites-item {
            padding: 0.5rem 0.75rem;
            background-color: var(--b3-theme-surface);
            border-radius: 6px;
            font-size: 14px;
            transition: background-color 0.2s ease;
            break-inside: avoid;
            display: flex;
            flex-direction: column;

            &:hover {
                background-color: var(--b3-list-hover);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
        }

        .favorites-item-content {
            margin-top: 4px;
            display: block;
            color: var(--b3-theme-primary);
            text-decoration: none;
            font-weight: bold;
            cursor: pointer;
            flex-grow: 1;

            &:hover {
                text-decoration: underline;
            }
        }

        .note-meta {
            font-size: 12px;
            margin-top: 4px;
            margin-left: 4px;
        }
    }
</style>
