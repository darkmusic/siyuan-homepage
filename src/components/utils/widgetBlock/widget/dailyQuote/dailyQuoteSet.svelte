<script lang="ts">
    import { onMount } from "svelte";
    import { getImage } from "@/components/tools/getImage";
    import { pluginT as t } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let advancedEnabled: boolean = false;
    export let dailyQuoteMode: string = "custom";
    export let dailyQuoteFontSize: number = 1;
    export let dailyQuoteSource: string = "classic";
    export let customDailyQuoteContent: string = "";
    export let dailyQuoteBgSelect: string = "remote";
    export let dailyQuoteRemoteBg: string =
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
    export let dailyQuoteLocalBg: string = "";
    export let dailyQuoteBgInput: HTMLInputElement | null = null;

    const tutorial = getTutorialLink("widgets.dailyQuote");

    let getDailyQuoteBgImage: () => Promise<void>;
    let handleDailyQuoteUpload: () => void;

    let dailyQuoteBgImageData: string = "";

    onMount(async () => {
        if (!dailyQuoteBgImageData && dailyQuoteBgSelect === "remote") {
            await getDailyQuoteBgImage();
        }
    });

    getDailyQuoteBgImage = async () => {
        if (dailyQuoteBgSelect === "remote") {
            dailyQuoteBgImageData = await getImage(dailyQuoteRemoteBg);
        } else {
            dailyQuoteBgImageData = dailyQuoteLocalBg;
        }
    };

    handleDailyQuoteUpload = () => {
        const file = dailyQuoteBgInput?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                dailyQuoteLocalBg = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    };
</script>

<div class="content-display">
    <div class="content-panel dailyQuote">
        <div class="form-group dailyQuoteMode">
            <label>
                {t(plugin, "widgets.dailyQuote.mode")}<select bind:value={dailyQuoteMode}>
                    <option value="custom">{t(plugin, "widgets.dailyQuote.custom")}</option>
                    <option value="remote">{t(plugin, "widgets.dailyQuote.remote")}</option>
                </select>
            </label>
            <label for="">
                {t(plugin, "widgets.dailyQuote.fontSize")}<input
                    type="number"
                    bind:value={dailyQuoteFontSize}
                />
            </label>
        </div>

        {#if dailyQuoteMode === "remote"}
            {#if advancedEnabled}
                <label for="">
                    {t(plugin, "widgets.dailyQuote.source")}<select bind:value={dailyQuoteSource}>
                        <option value="classic">{t(plugin, "widgets.dailyQuote.sourceClassic")}</option>
                        <option value="celebrity">{t(plugin, "widgets.dailyQuote.sourceCelebrity")}</option>
                        <option value="emotion">{t(plugin, "widgets.dailyQuote.sourceEmotion")}</option>
                        <option value="gaoxiao">{t(plugin, "widgets.dailyQuote.sourceGaoxiao")}</option>
                        <option value="pyq">{t(plugin, "widgets.dailyQuote.sourcePyq")}</option>
                        <option value="straybirdsZH">{t(plugin, "widgets.dailyQuote.sourceStraybirdsZH")}</option>
                        <option value="straybirdsEN">{t(plugin, "widgets.dailyQuote.sourceStraybirdsEN")}</option>
                        <option value="lovegarden">{t(plugin, "widgets.dailyQuote.sourceLovegarden")}</option>
                    </select>
                </label>
            {:else}
                <h3>{t(plugin, "common.vipBenefitTitle")}</h3>
            {/if}
        {:else}
            <label for="">
                {t(plugin, "widgets.dailyQuote.customContent")}
                <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    bind:value={customDailyQuoteContent}
                ></textarea>
            </label>
        {/if}

        <div class="form-group dailyQuoteBackgroundImg">
            <div class="type-select-and-input">
                <label>
                    {t(plugin, "common.backgroundSettings")}
                    <select
                        bind:value={dailyQuoteBgSelect}
                        on:change={() => {
                            if (dailyQuoteBgSelect === "remote") {
                                dailyQuoteLocalBg = "";
                            } else {
                                dailyQuoteRemoteBg = "";
                            }
                        }}
                    >
                        <option value="remote">{t(plugin, "common.remoteImage")}</option>
                        <option value="local">{t(plugin, "common.localImage")}</option>
                    </select>
                </label>
                {#if dailyQuoteBgSelect === "remote"}
                    <input
                        type="text"
                        bind:value={dailyQuoteRemoteBg}
                        on:change={getDailyQuoteBgImage}
                        placeholder={t(plugin, "common.remoteUrlPlaceholder")}
                    />
                {:else}
                    <button on:click={() => dailyQuoteBgInput?.click()}>
                        {t(plugin, "common.uploadImage")}
                    </button>

                    <input
                        type="file"
                        bind:this={dailyQuoteBgInput}
                        accept="image/*"
                        on:change={handleDailyQuoteUpload}
                        style="display: none;"
                    />
                {/if}
            </div>
            <div class="image-preview">
                {#if dailyQuoteBgSelect === "remote" && dailyQuoteBgImageData}
                    <img src={dailyQuoteBgImageData} alt={t(plugin, "widgets.dailyQuote.bgPreviewAlt")} />
                {:else if dailyQuoteBgSelect === "local" && dailyQuoteLocalBg}
                    <img src={dailyQuoteLocalBg} alt={t(plugin, "widgets.dailyQuote.bgPreviewAlt")} />
                {/if}
            </div>
        </div>

        <hr />
        <div>
            {t(plugin, "common.componentDescription")}<a
                href={tutorial.url}
                target="_blank">{tutorial.label}</a
            >
        </div>
        <p>{t(plugin, "common.apiNote")}</p>
    </div>
</div>

<style lang="scss">
    .dailyQuote {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        textarea {
            height: 100px;
        }

        .dailyQuoteBackgroundImg {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            flex-wrap: wrap;
            border-top: 1px solid var(--b3-border-color);
            padding: 1rem 0;

            .type-select-and-input {
                flex: 1 1 auto;
                max-width: 200px;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;

                label {
                    font-size: 14px;
                    font-weight: 500;
                }

                select,
                input[type="text"] {
                    padding: 0.4rem;
                    box-sizing: border-box;
                    font-size: 14px;
                    border-radius: 6px;
                    width: 100%;
                    transition: all 0.2s ease;

                    &:focus {
                        outline: none;
                        border-color: var(--b3-theme-primary);
                        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
                    }

                    &:hover {
                        border-color: var(--b3-theme-primary-light);
                    }
                }

                button {
                    padding: 0.4rem 0.6rem;
                    font-size: 14px;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    width: 100%;
                    align-self: flex-start;

                    &:hover {
                        background-color: var(--b3-theme-primary-light);
                        border-color: var(--b3-theme-primary);
                    }

                    &:focus {
                        outline: none;
                        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
                    }
                }
            }

            .image-preview {
                flex: 0 0 auto;
                display: flex;
                align-items: center;
                justify-content: center;
                width: auto;
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                border: 1px solid #ccc;
                transition: box-shadow 0.3s ease;
                padding: 0.5rem;

                img {
                    width: 150px;
                    height: auto;
                    max-height: 100px;
                    object-fit: contain;
                    border-radius: 6px;
                }

                &:hover {
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
                }
            }
        }
    }
</style>
