<script lang="ts">
    import { onMount } from "svelte";
    import { saveLayout } from "./utils/layout-handler";
    import { saveLayout as saveSidebarLayout } from "@/components/utils/sidebar/widget_layout";
    import { saveLayout as saveMobileLayout } from "@/components/utils/mobileHomepage/mobileHomepage_layout";
    import { pluginT } from "@/libs/i18n";

    // 弹窗接收的 props
    export let plugin: any;
    export let onClose: () => void;
    export let onDelete: () => void;
    export let onSetSize: (size: number) => void;

    // 新增：接收当前区块的ID
    export let currentBlockId: string = "";

    // 新增：背景颜色和透明度
    export let backgroundColor: string = "#ffffff";
    export let backgroundOpacity: number = 0.5;

    // 新增：边框颜色和粗细
    export let borderColor: string = "#000000";
    export let borderWidth: number = 1;

    let widgetLayoutNumber = 4;

    let rowSize = 1;
    let colSize = 1;

    function t(key: string, vars?: Record<string, string | number>): string {
        return pluginT(plugin, key, vars);
    }

    $: sizeOptions = Array.from(
        { length: widgetLayoutNumber },
        (_, i) => i + 1,
    );

    // 更新背景的方法
    function updateBackground() {
        const rgbaColor = hexToRgba(backgroundColor, backgroundOpacity);
        const blockElement = document.getElementById(currentBlockId);

        if (blockElement) {
            blockElement.style.backgroundColor = rgbaColor;
        }
    }

    // 更新边框的方法
    function updateBorder() {
        const blockElement = document.getElementById(currentBlockId);

        if (blockElement) {
            blockElement.style.borderColor = borderColor;
            blockElement.style.borderWidth = `${borderWidth}px`;
            blockElement.style.borderStyle = "solid";
        }
    }

    // 将 hex 转换为 rgba
    function hexToRgba(hex: string, opacity: number): string {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    // 从元素获取当前样式并赋值给变量
    function loadCurrentStyles() {
        const blockElement = document.getElementById(currentBlockId);
        if (!blockElement) return;

        const computedStyle = window.getComputedStyle(blockElement);

        // 设置背景颜色和透明度
        const bgColor = computedStyle.backgroundColor;
        const rgbaMatch = bgColor.match(
            /rgba?\((\d+[\d.]*),\s*(\d+[\d.]*),\s*(\d+[\d.]*)[\s,]*(\d*\.?\d*)?\)/i,
        );
        if (rgbaMatch) {
            const r = parseFloat(rgbaMatch[1]);
            const g = parseFloat(rgbaMatch[2]);
            const b = parseFloat(rgbaMatch[3]);
            const a = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;

            backgroundColor = convertToHex(`rgb(${r},${g},${b})`) || "#ffffff";
            backgroundOpacity = a;
        }

        // 设置边框颜色
        const currentBorderColor = computedStyle.borderColor;
        if (currentBorderColor && currentBorderColor !== "transparent") {
            borderColor = convertToHex(currentBorderColor) || borderColor;
        }

        // 设置边框宽度
        const currentBorderWidth = computedStyle.borderWidth;
        if (currentBorderWidth) {
            const widthValue = parseFloat(currentBorderWidth);
            if (!isNaN(widthValue)) {
                borderWidth = widthValue;
            }
        }

        // 获取并设置组件的宽高比
        const aspectRatio = computedStyle.aspectRatio;
        if (aspectRatio) {
            const [widthRatio, heightRatio] = aspectRatio
                .split("/")
                .map((s) => s.trim());
            if (widthRatio && heightRatio) {
                colSize = parseInt(widthRatio);
                rowSize = parseInt(heightRatio);
            }
        }
    }

    // 统一颜色转换器
    function convertToHex(color: string): string | null {
        const matches = color.match(/(\d+(\.\d+)?)/g);
        if (!matches) return null;

        const values = matches.map(Number);

        // 辅助函数：十进制转两位十六进制
        function toHex(value: number): string {
            const hex = Math.min(255, Math.max(0, Math.round(value))).toString(
                16,
            );
            return hex.length === 1 ? "0" + hex : hex;
        }

        // 处理 RGB
        if (values.length === 3) {
            const [r, g, b] = values;
            return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        }

        // 处理 RGBA（混合到白色背景）
        if (values.length === 4) {
            const [r, g, b, a] = values;
            const blend = (c: number) => Math.round((1 - a) * 255 + a * c);
            const blendedR = blend(r);
            const blendedG = blend(g);
            const blendedB = blend(b);
            return `#${toHex(blendedR)}${toHex(blendedG)}${toHex(blendedB)}`;
        }

        return null;
    }

    onMount(async () => {
        const config = await plugin.loadData("homepageSettingConfig.json");
        widgetLayoutNumber = config.widgetLayoutNumber || 4;

        loadCurrentStyles();

        // 加载保存的行列尺寸
        try {
            const widgetConfig = await plugin.loadData(`widget-${currentBlockId}.json`);
            if (widgetConfig && widgetConfig.rowSize && widgetConfig.colSize) {
                rowSize = widgetConfig.rowSize;
                colSize = widgetConfig.colSize;
            } else {
                // 如果没有保存的尺寸，从当前样式获取
                const blockElement = document.getElementById(currentBlockId);
                if (blockElement) {
                    const computedStyle = window.getComputedStyle(blockElement);
                    const aspectRatio = computedStyle.aspectRatio;
                    if (aspectRatio) {
                        const [widthRatio, heightRatio] = aspectRatio
                            .split("/")
                            .map((s) => s.trim());
                        if (widthRatio && heightRatio) {
                            colSize = parseInt(widthRatio);
                            rowSize = parseInt(heightRatio);
                        }
                    }
                }
            }
        } catch (error) {
            console.warn(`Failed to load saved size for widget ${currentBlockId}:`, error);
            // 如果加载失败，从当前样式获取
            const blockElement = document.getElementById(currentBlockId);
            if (blockElement) {
                const computedStyle = window.getComputedStyle(blockElement);
                const aspectRatio = computedStyle.aspectRatio;
                if (aspectRatio) {
                    const [widthRatio, heightRatio] = aspectRatio
                        .split("/")
                        .map((s) => s.trim());
                    if (widthRatio && heightRatio) {
                        colSize = parseInt(widthRatio);
                        rowSize = parseInt(heightRatio);
                    }
                }
            }
        }

        updateBackground();
        updateBorder();
    });
</script>

<div class="settings-group">
    <div class="setting-item">
        <div class="size-options-row">
            <div class="size-option-group">
                <label for="rowSize">{t("common.rowSize")}</label>
                <select id="rowSize" bind:value={rowSize}>
                    {#each sizeOptions as size}
                        <option value={size}>{size}</option>
                    {/each}
                </select>
                <label for="colSize">{t("common.colSize")}</label>
                <select id="colSize" bind:value={colSize}>
                    {#each sizeOptions as size}
                        <option value={size}>{size}</option>
                    {/each}
                </select>
            </div>

            <button
                type="button"
                class="apply-size-button"
                on:click={() => {
                    onSetSize(parseInt(`${rowSize}${colSize}`)); 
                    // 保存行列尺寸到组件设置文件中
                    plugin.loadData(`widget-${currentBlockId}.json`).then(widgetConfig => {
                        const updatedConfig = {
                            ...widgetConfig,
                            rowSize: rowSize,
                            colSize: colSize
                        };
                        plugin.saveData(`widget-${currentBlockId}.json`, updatedConfig);
                    });
                    saveLayout(plugin);
                    saveSidebarLayout(plugin);
                    saveMobileLayout(plugin);
                }}
            >
                {t("common.applySize")}
            </button>
        </div>
    </div>

    <div class="setting-item">
        <div class="style-controls-row">

            <!-- 第一行：背景颜色 + 背景透明度 -->
            <div class="style-subgroup" style="margin-bottom: 0.5rem; ">
                <!-- 颜色选择器 -->
                <div class="color-picker-group">
                    <label for="bg-color">{t("common.backgroundColor")}</label>
                    <input
                        id="bg-color"
                        type="color"
                        bind:value={backgroundColor}
                        on:change={() => {
                            updateBackground();
                            saveLayout(plugin);
                            saveSidebarLayout(plugin);
                            saveMobileLayout(plugin);
                        }}
                    />
                </div>

                <!-- 透明度滑块 -->
                <div class="opacity-slider-group">
                    <label for="bg-opacity">{t("common.backgroundOpacity")}</label>
                    <input
                        id="bg-opacity"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        bind:value={backgroundOpacity}
                        on:input={() => {
                            updateBackground();
                            saveLayout(plugin);
                            saveSidebarLayout(plugin);
                            saveMobileLayout(plugin);
                        }}
                    />
                    <span>{Math.round(backgroundOpacity * 100)}%</span>
                </div>
            </div>

            <!-- 第二行：边框颜色 + 边框粗细 -->
            <div class="style-subgroup">
                <!-- 边框颜色选择器 -->
                <div class="border-color-picker-group">
                    <label for="border-color">{t("common.borderColor")}</label>
                    <input
                        id="border-color"
                        type="color"
                        bind:value={borderColor}
                        on:change={() => {
                            updateBorder();
                            saveLayout(plugin);
                            saveSidebarLayout(plugin);
                            saveMobileLayout(plugin);
                        }}
                    />
                </div>

                <!-- 边框粗细滑块 -->
                <div class="border-width-slider-group">
                    <label for="border-width">{t("common.borderWidth")}</label>
                    <input
                        id="border-width"
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        bind:value={borderWidth}
                        on:input={() => {
                            updateBorder();
                            saveLayout(plugin);
                            saveSidebarLayout(plugin);
                            saveMobileLayout(plugin);
                        }}
                    />
                    <span>{borderWidth}px</span>
                </div>
            </div>
        </div>
    </div>

    <!-- 操作按钮：删除和取消在一行 -->
    <div class="action-buttons-row">
        <button class="delete-button" on:click={onDelete}>{t("common.deleteWidget")}</button>
        <button class="cancel-button" on:click={onClose}>{t("common.cancel")}</button>
    </div>
</div>

<style lang="scss">
    .settings-group {
        display: inline-flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        border-bottom: 1px solid var(--b3-border-color);
    }

    .style-controls-row,
    .size-options-row {
        display: flex;
        gap: 0.5rem;
        flex-direction: column;
        align-items: center;
    }

    .color-picker-group label,
    .opacity-slider-group label,
    .border-color-picker-group label,
    .border-width-slider-group label {
        font-size: 13px;
        margin-bottom: 4px;
        font-weight: 500;
    }

    input[type="color"] {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        padding: 3px;
        border: 2px solid var(--b3-border-color);
    }

    input[type="range"] {
        accent-color: var(--b3-theme-primary);
        height: 4px;
    }

    .opacity-slider-group span,
    .border-width-slider-group span {
        min-width: 40px;
        background: var(--b3-theme-background);
        padding: 2px 8px;
        border-radius: 4px;
        margin-left: 12px;
    }

    .action-buttons-row {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
    }

    .delete-button {
        background: linear-gradient(45deg, #ef4444 0%, #dc2626 100%);
        box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);
        color: white;
        border: none;
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
        cursor: pointer;
    }

    .cancel-button {
        background: linear-gradient(45deg, #f1f5f9 0%, #e2e8f0 100%);
        color: #475569;
        border: none;
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
        cursor: pointer;
    }

    .style-controls-row > .style-subgroup {
        display: flex;
        gap: 1rem;
        border: #000000 1px dashed;
        width: 100%;
        box-sizing: border-box;
        padding-left: 1rem;
        align-items: center;
    }

    select {
        width: max-content;
        padding: 0.5rem 2.5rem 0.5rem 1rem;
        font-size: 14px;
        border: 1px solid var(--b3-theme-primary-lighter);
        border-radius: 8px;
        background-color: var(--b3-theme-surface);
        appearance: none;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2390a3bf' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 0.75rem center;
        background-size: 16px;
        transition: all 0.2s ease;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        color: var(--b3-theme-text);

        &:hover {
            border-color: var(--b3-theme-primary);
            box-shadow: 0 1px 3px rgba(59, 130, 246, 0.1);
        }

        &:focus {
            outline: none;
            border-color: var(--b3-theme-primary);
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }

        &:disabled {
            background-color: var(--b3-theme-surface);
            cursor: not-allowed;
        }

        option {
            padding: 0.5rem;
            background: var(--b3-theme-surface);

            &:checked {
                background: var(--b3-theme-primary-light);
                color: white;
            }

            &:hover {
                background: var(--b3-theme-primary-light);
            }
        }
    }

    .apply-size-button {
        background-color: var(--b3-theme-primary);
        color: white;
        border: none;
        padding: 0.4rem 0.8rem;
        border-radius: 6px;
        cursor: pointer;

        &:hover {
            transform: translateY(-1px);
        }
    }
</style>
