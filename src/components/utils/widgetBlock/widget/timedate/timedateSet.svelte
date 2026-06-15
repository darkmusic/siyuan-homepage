<script lang="ts">
    import { onMount } from "svelte";
    import { getImage } from "@/components/tools/getImage";
    import { pluginT as t } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;

    const tutorial = getTutorialLink("widgets.timedate");

    // 时间样式
    export let timeType: string = "classic";

    // 时钟配置
    export let showSeconds: boolean = true;
    export let dateFormat: string = "YYYY年MM月DD日";
    export let showLunar: boolean = true;
    export let showZodiac: boolean = true;
    export let showSolarTerm: boolean = true;
    export let showWeek: boolean = true;
    export let showDate: boolean = true;
    export let timedateFontSize: number = 3;

    // 背景图片配置
    export let morningImageType: string = "remote";
    export let afternoonImageType: string = "remote";
    export let nightImageType: string = "remote";
    export let morningBgUrl: string = "";
    export let afternoonBgUrl: string = "";
    export let nightBgUrl: string = "";
    export let morningBgImage: string = "";
    export let afternoonBgImage: string = "";
    export let nightBgImage: string = "";

    // 简单时钟配置
    export let simple1Size: number = 3;
    export let simple1FontWeight: number = 4;
    export let simple1ShowSecond: boolean = true;
    export let simple1ShowDate: boolean = true;

    // 简单时钟2配置
    export let simple2BgSelect: string = "remote";
    export let simple2RemoteBg: string =
        "https://haowallpaper.com/link/common/file/previewFileImg/17882739641666944";
    export let simple2LocalBg: string = "";

    // 表盘时钟配置
    export let dial1ShowSecond: boolean = true;
    export let dial1ShowMarkers: boolean = true;
    export let dial1ShowDate: boolean = true;

    // 表盘2配置
    export let dial2ShowSecond: boolean = true;
    export let dial2ShowMarkers: boolean = true;
    export let dial2ShowDate: boolean = true;

    // 表盘3配置
    export let dial3ShowSecond: boolean = true;

    // 表盘4配置
    export let dial4ShowSecond: boolean = true;

    // 表盘5配置
    export let dial5ShowSecond: boolean = true;

    // 表盘6配置
    export let dial6ShowSecond: boolean = true;

    // 表盘7配置
    export let dial7ShowSecond: boolean = true;

    // 表盘8配置
    export let dial8ShowSecond: boolean = true;

    // 表盘9配置
    export let dial9ShowSecond: boolean = true;

    let advancedEnabled = false;

    let morningBgInput: HTMLInputElement;
    let afternoonBgInput: HTMLInputElement;
    let nightBgInput: HTMLInputElement;

    // 初始化图片数据
    async function initializeImages() {
        if (
            !window.navigator.userAgent.includes("Electron") ||
            typeof window.require !== "function"
        ) {
            if (morningImageType === "remote" && morningBgUrl) {
                morningBgImageData = await getImage(morningBgUrl);
            }
            if (afternoonImageType === "remote" && afternoonBgUrl) {
                afternoonBgImageData = await getImage(afternoonBgUrl);
            }
            if (nightImageType === "remote" && nightBgUrl) {
                nightBgImageData = await getImage(nightBgUrl);
            }
        } else {
            if (morningImageType === "remote" && morningBgUrl) {
                morningBgImageData = morningBgUrl;
            }
            if (afternoonImageType === "remote" && afternoonBgUrl) {
                afternoonBgImageData = afternoonBgUrl;
            }
            if (nightImageType === "remote" && nightBgUrl) {
                nightBgImageData = nightBgUrl;
            }
        }
    }

    // 处理早晨背景上传
    function handleMorningUpload() {
        const file = morningBgInput?.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result && typeof reader.result === "string") {
                morningBgImage = reader.result;
            }
        };
        reader.readAsDataURL(file);
    }

    // 处理下午背景上传
    function handleAfternoonUpload() {
        const file = afternoonBgInput?.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result && typeof reader.result === "string") {
                afternoonBgImage = reader.result;
            }
        };
        reader.readAsDataURL(file);
    }

    // 处理晚上背景上传
    function handleNightUpload() {
        const file = nightBgInput?.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result && typeof reader.result === "string") {
                nightBgImage = reader.result;
            }
        };
        reader.readAsDataURL(file);
    }

    let simple2BgImageData: string = "";
    let getSimple2BgImage: () => Promise<void>;
    // 获取简单时钟2背景图片
    getSimple2BgImage = async () => {
        if (simple2BgSelect === "remote") {
            simple2BgImageData = await getImage(simple2RemoteBg);
        } else {
            simple2BgImageData = simple2LocalBg;
        }
    };
    let handleSimple2Upload: () => void;
    let simple2BgInput: HTMLInputElement;
    // 处理图片上传
    handleSimple2Upload = () => {
        const file = simple2BgInput?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                simple2LocalBg = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    let morningBgImageData: string = "";
    let afternoonBgImageData: string = "";
    let nightBgImageData: string = "";

    onMount(async () => {
        advancedEnabled = plugin.ADVANCED;

        await initializeImages();

        // 初始化背景图片
        if (!simple2BgImageData && simple2BgSelect === "remote") {
            await getSimple2BgImage();
        }
    });

    // 监听图片类型和地址变化
    $: if (morningImageType === "remote" && morningBgUrl) {
        (async () => {
            if (
                !window.navigator.userAgent.includes("Electron") ||
                typeof window.require !== "function"
            ) {
                morningBgImageData = await getImage(morningBgUrl);
            } else {
                morningBgImageData = morningBgUrl;
            }
        })();
    }

    $: if (afternoonImageType === "remote" && afternoonBgUrl) {
        (async () => {
            if (
                !window.navigator.userAgent.includes("Electron") ||
                typeof window.require !== "function"
            ) {
                afternoonBgImageData = await getImage(afternoonBgUrl);
            } else {
                afternoonBgImageData = afternoonBgUrl;
            }
        })();
    }

    $: if (nightImageType === "remote" && nightBgUrl) {
        (async () => {
            if (
                !window.navigator.userAgent.includes("Electron") ||
                typeof window.require !== "function"
            ) {
                nightBgImageData = await getImage(nightBgUrl);
            } else {
                nightBgImageData = nightBgUrl;
            }
        })();
    }
</script>

<div class="content-panel timedate">
    <div class="time-type-select">
        <label for="timeType"
            >{t(plugin, "widgets.timedate.mode")}
            <select id="timeType" bind:value={timeType}>
                <option value="classic">{t(plugin, "widgets.timedate.classic")}</option>
                <option value="simple1">{t(plugin, "widgets.timedate.simple1")}</option>
                <option value="simple2">{t(plugin, "widgets.timedate.simple2")}</option>
                <option value="dial1">{t(plugin, "widgets.timedate.dial1")}</option>
                <option value="dial2">{t(plugin, "widgets.timedate.dial2")}</option>
                <option value="dial3">{t(plugin, "widgets.timedate.dial3")}</option>
                <option value="dial4">{t(plugin, "widgets.timedate.dial4")}</option>
                <option value="dial5">{t(plugin, "widgets.timedate.dial5")}</option>
                <option value="dial6">{t(plugin, "widgets.timedate.dial6")}</option>
                <option value="dial7">{t(plugin, "widgets.timedate.dial7")}</option>
                <option value="dial8">{t(plugin, "widgets.timedate.dial8")}</option>
                <option value="dial9">{t(plugin, "widgets.timedate.dial9")}</option>
            </select>
        </label>
    </div>

    {#if timeType === "classic"}
        <div>
            <div
                class="form-group"
                style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;"
            >
                <label
                    ><input type="checkbox" bind:checked={showSeconds} /> {t(plugin, "widgets.timedate.showSeconds")}</label
                >
                <label
                    ><input type="checkbox" bind:checked={showDate} /> {t(plugin, "widgets.timedate.showDate")}</label
                >
                <label
                    ><input type="checkbox" bind:checked={showWeek} /> {t(plugin, "widgets.timedate.showWeek")}</label
                >
                <label
                    ><input type="checkbox" bind:checked={showLunar} /> {t(plugin, "widgets.timedate.showLunar")}</label
                >
                <label
                    ><input type="checkbox" bind:checked={showZodiac} /> {t(plugin, "widgets.timedate.showZodiac")}</label
                >
                <label
                    ><input type="checkbox" bind:checked={showSolarTerm} /> {t(plugin, "widgets.timedate.showSolarTerm")}</label
                >
            </div>

            <div class="form-group">
                {#if showDate}
                    <label for="dateFormat">{t(plugin, "widgets.timedate.dateFormat")}</label>
                    <select id="dateFormat" bind:value={dateFormat}>
                        <option value="YYYY年MM月DD日">{t(plugin, "widgets.timedate.dateFormatZh")}</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        <option value="YYYY/MM/DD">YYYY/MM/DD</option>
                        <option value="YYYY.MM.DD">YYYY.MM.DD</option>
                    </select>
                {/if}
                <label for="timedate-fontSize">
                    {t(plugin, "widgets.timedate.fontSize")}
                    <input
                        type="number"
                        min="1"
                        max="10"
                        bind:value={timedateFontSize}
                        placeholder={t(plugin, "widgets.timedate.fontSizePlaceholder")}
                    />
                </label>
            </div>

            <!-- 隐藏的文件输入 -->
            <input
                type="file"
                bind:this={morningBgInput}
                accept="image/*"
                on:change={handleMorningUpload}
                style="display: none;"
            />
            <input
                type="file"
                bind:this={afternoonBgInput}
                accept="image/*"
                on:change={handleAfternoonUpload}
                style="display: none;"
            />
            <input
                type="file"
                bind:this={nightBgInput}
                accept="image/*"
                on:change={handleNightUpload}
                style="display: none;"
            />

            <div class="form-group">
                <h5>{t(plugin, "widgets.timedate.bgSettings")}</h5>

                <!-- 早晨 -->
                <div class="background-option">
                    <div class="background-row">
                        <!-- 左侧配置 -->
                        <div class="type-select-and-input">
                            <label for="morning-bg-select"
                                >{t(plugin, "widgets.timedate.morning")}</label
                            >
                            <div class="type-select">
                                <select
                                    id="morning-bg-select"
                                    bind:value={morningImageType}
                                >
                                    <option value="remote">{t(plugin, "common.remoteImage")}</option>
                                    <option value="local">{t(plugin, "common.localImage")}</option>
                                </select>
                            </div>

                            {#if morningImageType === "remote"}
                                <input
                                    type="text"
                                    bind:value={morningBgUrl}
                                    placeholder={t(plugin, "widgets.timedate.morningUrlPlaceholder")}
                                />
                            {:else}
                                <button on:click={() => morningBgInput?.click()}
                                    >{t(plugin, "common.uploadImage")}</button
                                >
                            {/if}
                        </div>

                        <!-- 右侧预览 -->
                        <div class="image-preview">
                            {#if morningImageType === "remote" && morningBgUrl}
                                <img src={morningBgImageData} alt={t(plugin, "widgets.timedate.morningPreview")} />
                            {:else if morningImageType === "local" && morningBgImage}
                                <img src={morningBgImage} alt={t(plugin, "widgets.timedate.morningPreview")} />
                            {/if}
                        </div>
                    </div>
                </div>

                <!-- 中午 -->
                <div class="background-option">
                    <div class="background-row">
                        <!-- 左侧配置 -->
                        <div class="type-select-and-input">
                            <label for="afternoon-bg-select"
                                >{t(plugin, "widgets.timedate.afternoon")}</label
                            >
                            <div class="type-select">
                                <select
                                    id="afternoon-bg-select"
                                    bind:value={afternoonImageType}
                                >
                                    <option value="remote">{t(plugin, "common.remoteImage")}</option>
                                    <option value="local">{t(plugin, "common.localImage")}</option>
                                </select>
                            </div>

                            {#if afternoonImageType === "remote"}
                                <input
                                    type="text"
                                    bind:value={afternoonBgUrl}
                                    placeholder={t(plugin, "widgets.timedate.afternoonUrlPlaceholder")}
                                />
                            {:else}
                                <button
                                    on:click={() => afternoonBgInput?.click()}
                                    >{t(plugin, "common.uploadImage")}</button
                                >
                            {/if}
                        </div>

                        <!-- 右侧预览 -->
                        <div class="image-preview">
                            {#if afternoonImageType === "remote" && afternoonBgUrl}
                                <img
                                    src={afternoonBgImageData}
                                    alt={t(plugin, "widgets.timedate.afternoonPreview")}
                                />
                            {:else if afternoonImageType === "local" && afternoonBgImage}
                                <img src={afternoonBgImage} alt={t(plugin, "widgets.timedate.afternoonPreview")} />
                            {/if}
                        </div>
                    </div>
                </div>

                <!-- 晚上 -->
                <div class="background-option">
                    <div class="background-row">
                        <!-- 左侧配置 -->
                        <div class="type-select-and-input">
                            <label for="night-bg-select"
                                >{t(plugin, "widgets.timedate.night")}</label
                            >
                            <div class="type-select">
                                <select
                                    id="night-bg-select"
                                    bind:value={nightImageType}
                                >
                                    <option value="remote">{t(plugin, "common.remoteImage")}</option>
                                    <option value="local">{t(plugin, "common.localImage")}</option>
                                </select>
                            </div>

                            {#if nightImageType === "remote"}
                                <input
                                    type="text"
                                    bind:value={nightBgUrl}
                                    placeholder={t(plugin, "widgets.timedate.nightUrlPlaceholder")}
                                />
                            {:else}
                                <button on:click={() => nightBgInput?.click()}
                                    >{t(plugin, "common.uploadImage")}</button
                                >
                            {/if}
                        </div>

                        <!-- 右侧预览 -->
                        <div class="image-preview">
                            {#if nightImageType === "remote" && nightBgUrl}
                                <img src={nightBgImageData} alt={t(plugin, "widgets.timedate.nightPreview")} />
                            {:else if nightImageType === "local" && nightBgImage}
                                <img src={nightBgImage} alt={t(plugin, "widgets.timedate.nightPreview")} />
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {:else if timeType === "simple1"}
        <div class="form-group">
            <label for=""
                >{t(plugin, "widgets.timedate.clockSize")}
                <input type="number" bind:value={simple1Size} />
            </label>
            <label for=""
                >{t(plugin, "widgets.timedate.fontWeight")}
                <input type="number" bind:value={simple1FontWeight} />
            </label>
        </div>
        <div class="form-group">
            <label for="">
                <input type="checkbox" bind:checked={simple1ShowSecond} />
                {t(plugin, "widgets.timedate.showSecondsShort")}
            </label>
            <label for="">
                <input type="checkbox" bind:checked={simple1ShowDate} />
                {t(plugin, "widgets.timedate.showDate")}
            </label>
        </div>
    {:else if timeType === "simple2"}
        <div class="form-group simple2BackgroundImg">
            <div class="type-select-and-input">
                <label>
                    {t(plugin, "common.backgroundSettings")}
                    <select
                        bind:value={simple2BgSelect}
                        on:change={() => {
                            if (simple2BgSelect === "remote") {
                                simple2LocalBg = "";
                            } else {
                                simple2RemoteBg = "";
                            }
                        }}
                    >
                        <option value="remote">{t(plugin, "common.remoteImage")}</option>
                        <option value="local">{t(plugin, "common.localImage")}</option>
                    </select>
                </label>
                {#if simple2BgSelect === "remote"}
                    <input
                        type="text"
                        bind:value={simple2RemoteBg}
                        on:change={getSimple2BgImage}
                        placeholder={t(plugin, "widgets.timedate.remoteUrlPlaceholder")}
                    />
                {:else}
                    <button on:click={() => simple2BgInput?.click()}>
                        {t(plugin, "common.uploadImage")}
                    </button>

                    <input
                        type="file"
                        bind:this={simple2BgInput}
                        accept="image/*"
                        on:change={handleSimple2Upload}
                        style="display: none;"
                    />
                {/if}
            </div>
            <div class="image-preview">
                {#if simple2BgSelect === "remote" && simple2BgImageData}
                    <img src={simple2BgImageData} alt={t(plugin, "widgets.timedate.simple2BgPreview")} />
                {:else if simple2BgSelect === "local" && simple2LocalBg}
                    <img src={simple2LocalBg} alt={t(plugin, "widgets.timedate.simple2BgPreview")} />
                {/if}
            </div>
        </div>
    {:else if timeType === "dial1"}
        <div class="form-group form-group-dial1">
            <label for="">
                <input type="checkbox" bind:checked={dial1ShowSecond} />
                {t(plugin, "widgets.timedate.showSecondHand")}
            </label>
            <label for="">
                <input type="checkbox" bind:checked={dial1ShowMarkers} />
                {t(plugin, "widgets.timedate.showMarkers")}
            </label>
            <label for="">
                <input type="checkbox" bind:checked={dial1ShowDate} />
                {t(plugin, "widgets.timedate.showDate")}
            </label>
        </div>
    {:else if timeType === "dial2"}
        <div class="form-group form-group-dial2">
            <label for="">
                <input type="checkbox" bind:checked={dial2ShowSecond} />
                {t(plugin, "widgets.timedate.showSecondHand")}
            </label>
            <label for="">
                <input type="checkbox" bind:checked={dial2ShowMarkers} />
                {t(plugin, "widgets.timedate.showMarkers")}
            </label>
            <label for="">
                <input type="checkbox" bind:checked={dial2ShowDate} />
                {t(plugin, "widgets.timedate.showDate")}
            </label>
        </div>
    {:else if timeType === "dial3" && advancedEnabled}
        <div class="form-group form-group-dial3">
            <label for="">
                <input type="checkbox" bind:checked={dial3ShowSecond} />
                {t(plugin, "widgets.timedate.showSecondHand")}
            </label>
        </div>
    {:else if timeType === "dial4" && advancedEnabled}
        <div class="form-group form-group-dial4">
            <label for="">
                <input type="checkbox" bind:checked={dial4ShowSecond} />
                {t(plugin, "widgets.timedate.showSecondHand")}
            </label>
        </div>
    {:else if timeType === "dial5" && advancedEnabled}
        <div class="form-group form-group-dial5">
            <label for="">
                <input type="checkbox" bind:checked={dial5ShowSecond} />
                {t(plugin, "widgets.timedate.showSecondHand")}
            </label>
        </div>
    {:else if timeType === "dial6" && advancedEnabled}
        <div class="form-group form-group-dial6">
            <label for="">
                <input type="checkbox" bind:checked={dial6ShowSecond} />
                {t(plugin, "widgets.timedate.showSecondHand")}
            </label>
        </div>
    {:else if timeType === "dial7" && advancedEnabled}
        <div class="form-group form-group-dial7">
            <label for="">
                <input type="checkbox" bind:checked={dial7ShowSecond} />
                {t(plugin, "widgets.timedate.showSecondHand")}
            </label>
        </div>
    {:else if timeType === "dial8" && advancedEnabled}
        <div class="form-group form-group-dial8">
            <label for="">
                <input type="checkbox" bind:checked={dial8ShowSecond} />
                {t(plugin, "widgets.timedate.showSecondHand")}
            </label>
        </div>
    {:else if timeType === "dial9" && advancedEnabled}
        <div class="form-group form-group-dial9">
            <label for="">
                <input type="checkbox" bind:checked={dial9ShowSecond} />
                {t(plugin, "widgets.timedate.showSecondHand")}
            </label>
        </div>
    {/if}

    <hr />
    <div>
        {t(plugin, "common.componentDescription")}<a
            href={tutorial.url}
            target="_blank">{tutorial.label}</a
        >
    </div>
</div>

<style lang="scss">
    .timedate {
        .background-option {
            margin-bottom: 1rem;

            .background-row {
                display: flex;
                align-items: flex-start;
                gap: 1rem;
                flex-wrap: wrap;
            }

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
                    border: 1px solid var(--b3-theme-primary-lighter);
                    width: 100%;
                    background-color: var(--b3-theme-background);
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
                    background-color: var(--b3-theme-surface);
                    color: var(--b3-theme-on-surface);
                    border: 1px solid var(--b3-border-color);
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    width: 100%;
                    align-self: flex-start;

                    &:hover {
                        background-color: var(--b3-theme-primary-light);
                        color: var(--b3-theme-primary);
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
                width: auto; // 固定宽度为 200px
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                border: 1px solid #ccc;
                transition: box-shadow 0.3s ease;
                padding: 0.5rem;

                img {
                    width: 150px; // 宽度填满容器（200px）
                    height: auto; // 高度自适应，保持图片比例
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

    .simple2BackgroundImg {
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
            width: auto; // 固定宽度为 200px
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            border: 1px solid #ccc;
            transition: box-shadow 0.3s ease;
            padding: 0.5rem;

            img {
                width: 150px; // 宽度填满容器（200px）
                height: auto; // 高度自适应，保持图片比例
                max-height: 100px;
                object-fit: contain;
                border-radius: 6px;
            }

            &:hover {
                box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
            }
        }
    }
</style>
