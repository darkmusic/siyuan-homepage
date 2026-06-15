<script lang="ts">
    import { showMessage } from "siyuan";
    import { pluginT as t } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let advancedEnabled: boolean;
    export let PicFolderPath: string = ""; // 图片文件夹路径
    export let PicAutoPlay: boolean = false; // 是否自动播放
    export let PicInterval: number = 3; // 切换间隔（秒）
    export let PicNavigation: boolean = false; // 是否显示导航按钮
    export let PicPagination: boolean = false; // 是否显示分页按钮
    export let PicPaginationType: string = "bullets"; // 分页按钮类型
    export let PicPaginationDyBu: boolean = false; // 动态分页圆点
    export let PicPaginationPrOp: boolean = false; // 分页进度条是否反方向
    export let PicEffect: string = "slide"; // 切换效果
    export let PicSlidesPerView: string = "1"; // 每页显示的图片数量
    export let PicRandomSwitch: boolean = false; // 是否随机切换

    const tutorial = getTutorialLink("widgets.picCaro");

    // 选择图片文件夹
    async function selectPicFolder() {
        try {
            if (
                !window.navigator.userAgent.includes("Electron") ||
                typeof window.require !== "function"
            )
                return showMessage(t(plugin, "common.desktopOnly"));
            const { filePaths } = await window
                .require("@electron/remote")
                .dialog.showOpenDialog({
                    properties: ["openDirectory", "createDirectory"],
                });

            if (filePaths && filePaths.length > 0) {
                PicFolderPath = filePaths[0];
            }
        } catch (error) {
            console.error("选择文件夹时发生错误：", error);
        }
    }
</script>

<div class="pic-caro-settings">
    {#if advancedEnabled}
        <div class="content-panel picCaro">
            <label class="folder-select-label">
                <span>{t(plugin, "widgets.picCaro.path")}</span>
                <input
                    type="text"
                    bind:value={PicFolderPath}
                    placeholder={t(plugin, "widgets.picCaro.pathPlaceholder")}
                />
                <button
                    title={t(plugin, "widgets.picCaro.selectFolder")}
                    on:click={selectPicFolder}>📁</button
                >
            </label>
        </div>
        <div class="content-panel picCaro">
            <div
                style="display: flex; gap: 1rem; align-items: center; padding-top: 1rem;"
            >
                <label for="autoPlay"
                    ><input
                        type="checkbox"
                        id="autoPlay"
                        bind:checked={PicAutoPlay}
                    />{t(plugin, "widgets.picCaro.autoPlay")}</label
                >
                {#if PicAutoPlay}
                    <label for="interval"
                        >{t(plugin, "widgets.picCaro.interval")}<input
                            type="number"
                            id="interval"
                            style="width: 50px;"
                            bind:value={PicInterval}
                        />{t(plugin, "common.seconds")}</label
                    >
                {/if}
                <label for="navigation"
                    ><input
                        type="checkbox"
                        id="navigation"
                        bind:checked={PicNavigation}
                    />{t(plugin, "widgets.picCaro.navigation")}</label
                >
                <label for="randomSwitch"
                    ><input
                        type="checkbox"
                        id="randomSwitch"
                        bind:checked={PicRandomSwitch}
                    />{t(plugin, "widgets.picCaro.random")}</label
                >
            </div>
        </div>
        <div class="content-panel picCaro">
            <div
                style="display: flex; gap: 1rem; align-items: center; padding-top: 1rem;"
            >
                <label for="pagination"
                    ><input
                        type="checkbox"
                        id="pagination"
                        bind:checked={PicPagination}
                    />{t(plugin, "widgets.picCaro.pagination")}</label
                >
                {#if PicPagination}
                    <label for="paginationType"
                        >{t(plugin, "common.style")}<select
                            id="paginationType"
                            bind:value={PicPaginationType}
                        >
                            <option value="bullets">{t(plugin, "widgets.picCaro.bullets")}</option>
                            <option value="fraction">{t(plugin, "widgets.picCaro.fraction")}</option>
                            <option value="progressbar">{t(plugin, "widgets.picCaro.progressbar")}</option>
                        </select></label
                    >
                    {#if PicPaginationType === "bullets"}
                        <label for="dynamicBullets"
                            ><input
                                type="checkbox"
                                id="dynamicBullets"
                                bind:checked={PicPaginationDyBu}
                            />{t(plugin, "widgets.picCaro.dynamicBullets")}</label
                        >
                    {:else if PicPaginationType === "progressbar"}
                        <label for="paginationProgressOpposite"
                            ><input
                                type="checkbox"
                                id="paginationProgressOpposite"
                                bind:checked={PicPaginationPrOp}
                            />{t(plugin, "widgets.picCaro.reverseProgress")}</label
                        >
                    {/if}
                {/if}
            </div>
        </div>
        <div class="content-panel picCaro">
            <div
                style="display: flex; gap: 1rem; align-items: center; padding-top: 1rem;"
            >
                <label for="effect"
                    >{t(plugin, "widgets.picCaro.effect")}<select id="effect" bind:value={PicEffect}>
                        <option value="slide">{t(plugin, "widgets.picCaro.slide")}</option>
                        <option value="fade">{t(plugin, "widgets.picCaro.fade")}</option>
                        <option value="cube">{t(plugin, "widgets.picCaro.cube")}</option>
                        <option value="coverflow">{t(plugin, "widgets.picCaro.coverflow")}</option>
                        <option value="flip">{t(plugin, "widgets.picCaro.flip")}</option>
                    </select></label
                >
                {#if PicEffect === "slide"}
                    <label for="slidesPerView"
                        >{t(plugin, "widgets.picCaro.slidesPerView")}<input
                            type="number"
                            id="slidesPerView"
                            style="width: 50px;"
                            bind:value={PicSlidesPerView}
                        /></label
                    >
                {/if}
            </div>
        </div>
    {:else}
        <h3>{t(plugin, "common.vipBenefitTitle")}</h3>
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
    .picCaro {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .folder-select-label {
            display: flex;
            align-items: center;
            gap: 8px;
            width: 100%;

            span {
                white-space: nowrap; // 禁止文字换行
                flex-shrink: 0; // 禁止压缩
            }

            input[type="text"] {
                flex: 1 1 auto; // 允许压缩和扩展
                min-width: 120px; // 设置最小宽度防止过度压缩
            }

            button {
                white-space: nowrap;
                padding: 6px 12px;
                flex-shrink: 0; // 禁止按钮压缩
            }
        }
    }
</style>
