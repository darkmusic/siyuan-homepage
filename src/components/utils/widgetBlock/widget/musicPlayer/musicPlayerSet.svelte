<script lang="ts">
    import { showMessage } from "siyuan";
    import { pluginT as t } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let advancedEnabled: boolean;
    export let musicFolderPath: string = "";
    export let autoPlay: boolean = false;

    const tutorial = getTutorialLink("widgets.musicPlayer");

    // 选择音乐文件夹
    async function selectMusicFolder() {
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
                musicFolderPath = filePaths[0];
            }
        } catch (error) {
            console.error("选择文件夹时发生错误：", error);
        }
    }
</script>

<div class="music-player-settings">
    {#if advancedEnabled}
        <div class="content-panel musicPlayer">
            <label class="folder-select-label">
                <span>{t(plugin, "widgets.musicPlayer.path")}</span>
                <input
                    type="text"
                    bind:value={musicFolderPath}
                    placeholder={t(plugin, "widgets.musicPlayer.pathPlaceholder")}
                />
                <button
                    title={t(plugin, "widgets.musicPlayer.selectFolder")}
                    on:click={selectMusicFolder}>📁</button
                >
            </label>
            <label>
                <input type="checkbox" bind:checked={autoPlay} />
                {t(plugin, "widgets.musicPlayer.autoPlay")}
            </label>
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
    .musicPlayer {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

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
