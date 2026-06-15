<script lang="ts">
    import { onMount } from "svelte";
    import "emoji-picker-element";
    import "./homepageSettingStyle/homepageSetting.scss";
    import { pluginT as t } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let close: () => void;

    const ADD_WIDGET_BUTTON_ID = 1728000002000;
    const SETTINGS_BUTTON_ID = 1728000003000;

    function defaultButtonsList(): ButtonItem[] {
        return [
            {
                id: 1728000000000,
                label: t(plugin, "homepage.button.searchNotes"),
                checked: true,
                shortcut: "Ctrl+P",
                order: 0,
            },
            {
                id: 1728000001000,
                label: t(plugin, "homepage.button.todayJournal"),
                checked: true,
                shortcut: "Alt+5",
                order: 1,
            },
            {
                id: ADD_WIDGET_BUTTON_ID,
                label: t(plugin, "homepage.button.addWidget"),
                checked: true,
                order: 2,
            },
            {
                id: SETTINGS_BUTTON_ID,
                label: t(plugin, "homepage.button.settings"),
                checked: true,
                order: 3,
            },
        ];
    }

    let activeTab = "homepage";

    // 主页设置相关配置变量
    let tempAutoOpenHomepage = true;
    let sidebarEnabled = false;
    let autoOpenMobileHomepage = false;
    let settingsActiveTab = "banner";
    // 横幅区域相关配置变量
    let bannerEnabled = true;
    let bannerGlobalType = "custom";
    let bingApiType = "POD_UHD";
    let bannerType = "local";
    let tempBannerEnabled = bannerEnabled;
    let tempBannerType = bannerType;
    let bannerLocalData: string | null = null;
    let bannerRemoteUrl = "";
    let bannerHeight = "300"; // 默认值为字符串类型以适配输入框
    let tempBannerHeight = bannerHeight;
    let fileInputEl: HTMLInputElement;
    // 标题区域相关配置变量
    let tempTitleIconStyle = "square";
    let showEmojiPicker = false;
    let emojiPickerPosition = { top: "0px", left: "0px" };
    let emojiPickerElement: HTMLElement | null = null;
    let emojiPickerCleanup: (() => void) | null = null;
    let showIcon = true;
    let titleIconType = "emoji";
    let tempTitleIconEmoji = "🏠";
    let tempTitleIconImage: string | null = null;
    let iconInputEl: HTMLInputElement;
    let tempCustomTitle = t(plugin, "homepage.title");

    let tempStatsInfoText = t(plugin, "homepage.statsDefault");

    type ButtonItem = {
        id: number;
        label: string;
        checked: boolean;
        shortcut?: string;
        order: number;
    };

    let buttonsList: ButtonItem[] = defaultButtonsList();

    // 当前选中的按钮项
    let selectedButton: ButtonItem | null = null;
    let nextId = Date.now();
    let selectedButtonIndex: number = -1;

    // 组件设置内容
    let widgetLayoutNumber = 4;
    let widgetGap = 0.2;
    // 快速笔记设置
    let quickNotesEnabled = false;
    let quickNotesPosition = "";
    let quickNotesTimestampEnabled = true;
    let quickNotesAddPosition = "bottom";
    // 任务管理Plus设置
    let taskEditorEnabled = true;

    // vip设置
    let footerEnabled = true;
    let footerContent = "";
    let mouseGlobalEnabled = false;
    let mouseIcon = "default";
    let MouseTrailEnabled = false;
    let ClickEffectEnabled = false;
    let ClickEffectContent = "";
    let FallEffectsEnabled = false;
    let GlobalFallingEffectsEnabled = false;
    let FallingIcon = "snow";
    let FallingDensity = "medium";
    let FallingSpeed = "medium";

    // VIP设置
    let advancedEnabled = false;

    // 设置页面加载时读取配置信息
    onMount(async () => {
        const savedConfig = await plugin.loadData("homepageSettingConfig.json");
        if (savedConfig) {
            // 全局配置
            tempAutoOpenHomepage = savedConfig.autoOpenHomepage ?? true;
            sidebarEnabled = savedConfig.sidebarEnabled ?? false;
            autoOpenMobileHomepage =
                savedConfig.autoOpenMobileHomepage ?? false;

            // 横幅配置
            bannerEnabled = savedConfig.bannerEnabled ?? true;
            bannerGlobalType = savedConfig.bannerGlobalType || "custom";
            bingApiType = savedConfig.bingApiType || "POD_UHD";
            bannerType = savedConfig.bannerType ?? "local";
            bannerLocalData = savedConfig.bannerLocalData || "";
            bannerRemoteUrl = savedConfig.bannerRemoteUrl || "";
            bannerHeight = savedConfig.bannerHeight || "300";

            // 标题配置
            showIcon = savedConfig.showIcon ?? true;
            titleIconType = savedConfig.titleIconType || "emoji";
            tempTitleIconEmoji = savedConfig.TitleIconEmoji || "🏠";
            tempTitleIconImage = savedConfig.TitleIconImage || null;
            tempTitleIconStyle = savedConfig.tempTitleIconStyle || "square";
            tempCustomTitle =
                savedConfig.customTitle || t(plugin, "homepage.title");
            tempStatsInfoText =
                savedConfig.statsInfoText ?? t(plugin, "homepage.statsDefault");

            // 恢复按钮配置
            if (savedConfig.buttonsList) {
                buttonsList = savedConfig.buttonsList.map((item) => ({
                    ...item,
                    order: item.order ?? 0,
                }));
                nextId = Math.max(...buttonsList.map((item) => item.id), 0) + 1;
            }

            if (savedConfig.selectedButton) {
                selectedButton = savedConfig.selectedButton;
            }

            // 组件设置
            widgetLayoutNumber = savedConfig.widgetLayoutNumber || 4;
            widgetGap = savedConfig.widgetGap || 0.2;

            quickNotesEnabled = savedConfig.quickNotesEnabled ?? false;
            quickNotesPosition = savedConfig.quickNotesPosition || "";
            quickNotesTimestampEnabled =
                savedConfig.quickNotesTimestampEnabled ?? true;
            quickNotesAddPosition =
                savedConfig.quickNotesAddPosition || "bottom";

            taskEditorEnabled = savedConfig.taskEditorEnabled ?? true;

            footerEnabled = savedConfig.footerEnabled ?? true;
            footerContent = savedConfig.footerContent || "";
            mouseIcon = savedConfig.mouseIcon || "default";
            MouseTrailEnabled = savedConfig.MouseTrailEnabled ?? false;
            mouseGlobalEnabled = savedConfig.mouseGlobalEnabled ?? false;
            ClickEffectEnabled = savedConfig.ClickEffectEnabled ?? false;
            ClickEffectContent = savedConfig.ClickEffectContent || "";
            FallEffectsEnabled = savedConfig.FallEffectsEnabled ?? false;
            GlobalFallingEffectsEnabled =
                savedConfig.GlobalFallingEffectsEnabled ?? false;
            FallingIcon = savedConfig.FallingIcon || "snow";
            FallingDensity = savedConfig.FallingDensity || "medium";
            FallingSpeed = savedConfig.FallingSpeed || "medium";
        }

        // 同步到临时变量
        tempBannerEnabled = bannerEnabled;
        tempBannerType = bannerType;
        tempBannerHeight = bannerHeight;

        advancedEnabled = plugin.ADVANCED;
    });

    function handleImageSelect(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                bannerLocalData = e.target?.result as string; // 存储 Base64 数据
            };

            reader.readAsDataURL(file);
        }
    }

    function handleIconImageSelect(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                tempTitleIconImage = e.target?.result as string;
            };

            reader.readAsDataURL(file);
        }
    }

    $: {
        if (tempBannerType === "remote") {
            bannerLocalData = null; // 清空本地图片数据
        }
    }

    // 响应式监听表情选择器事件
    $: {
        if (showEmojiPicker && emojiPickerElement) {
            const handler = (event: any) => {
                const detail = event.detail;
                tempTitleIconEmoji = detail.unicode;
                showEmojiPicker = false;
            };

            emojiPickerElement.addEventListener("emoji-click", handler);

            // 设置清理函数
            emojiPickerCleanup = () => {
                emojiPickerElement?.removeEventListener("emoji-click", handler);
            };
        } else if (!showEmojiPicker && emojiPickerCleanup) {
            emojiPickerCleanup();
            emojiPickerCleanup = null;
        }
    }

    function openEmojiPicker(event: Event) {
        const button = event.currentTarget as HTMLElement;
        const container = document.querySelector(
            ".settings-container",
        ) as HTMLElement;

        if (!container) return;

        const rect = button.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // 基于 container 的偏移量计算位置
        emojiPickerPosition = {
            top: `${rect.top - containerRect.top + button.offsetHeight}px`,
            left: `${rect.left - containerRect.left}px`,
        };

        showEmojiPicker = true;
    }

    // 添加新按钮
    function addNewButton() {
        const newId = nextId + 1;
        nextId = newId;

        const newItem = {
            id: newId,
            label: t(plugin, "settings.button.newDefault"),
            checked: false,
            order:
                buttonsList.length > 0
                    ? Math.max(...buttonsList.map((b) => b.order)) + 1
                    : 0,
        };

        buttonsList = [...buttonsList, newItem];
        selectedButton = newItem;
    }

    // 在编辑按钮标签时触发更新
    function updateButtonLabel(newLabel: string) {
        if (selectedButton) {
            // 创建一个新的按钮对象来替换旧的
            selectedButton = {
                ...selectedButton,
                label: newLabel,
            };

            // 更新 buttonsList 中对应的项
            buttonsList = buttonsList.map((item) =>
                item.id === selectedButton.id ? selectedButton : item,
            );
        }
    }

    function deleteCustomButton() {
        if (selectedButton) {
            const coreButtonIds = [ADD_WIDGET_BUTTON_ID, SETTINGS_BUTTON_ID];
            if (coreButtonIds.includes(selectedButton.id)) {
                return;
            }

            // 删除当前选中的按钮
            buttonsList = buttonsList.filter(
                (item) => item.id !== selectedButton.id,
            );
            selectedButton = null; // 清空选中
        }
    }

    $: {
        // 获取当前选中按钮在列表中的索引
        selectedButtonIndex = selectedButton
            ? buttonsList.findIndex((item) => item.id === selectedButton.id)
            : -1;
    }

    function moveUpButton() {
        if (selectedButtonIndex <= 0) return;

        const newIndex = selectedButtonIndex - 1;
        const newList = [...buttonsList];
        [newList[selectedButtonIndex], newList[newIndex]] = [
            newList[newIndex],
            newList[selectedButtonIndex],
        ];

        // 更新 order 字段
        buttonsList = newList.map((item, index) => ({ ...item, order: index }));
    }

    function moveDownButton() {
        if (
            selectedButtonIndex === -1 ||
            selectedButtonIndex >= buttonsList.length - 1
        )
            return;

        const newIndex = selectedButtonIndex + 1;
        const newList = [...buttonsList];
        [newList[selectedButtonIndex], newList[newIndex]] = [
            newList[newIndex],
            newList[selectedButtonIndex],
        ];

        // 更新 order 字段
        buttonsList = newList.map((item, index) => ({ ...item, order: index }));
    }

    // 保存配置并关闭对话框
    async function confirmSave() {
        const config = {
            // 全局配置
            autoOpenHomepage: tempAutoOpenHomepage,
            sidebarEnabled: sidebarEnabled,
            autoOpenMobileHomepage: autoOpenMobileHomepage,

            // 横幅配置
            bannerEnabled: tempBannerEnabled,
            bannerGlobalType: bannerGlobalType,
            bingApiType: bingApiType,
            bannerType: tempBannerType,
            bannerLocalData: bannerLocalData,
            bannerRemoteUrl: bannerRemoteUrl,
            bannerHeight: tempBannerHeight,

            // 标题配置
            showIcon: showIcon,
            titleIconType: titleIconType,
            TitleIconEmoji: tempTitleIconEmoji,
            TitleIconImage: tempTitleIconImage,
            customTitle: tempCustomTitle,
            tempTitleIconStyle: tempTitleIconStyle,

            statsInfoText: tempStatsInfoText,

            // 按钮配置
            buttonsList: buttonsList.map((item) => ({
                id: item.id,
                label: item.label,
                checked: item.checked,
                shortcut: item.shortcut || "",
                order: item.order,
            })),
            selectedButton: selectedButton,

            // 组件配置
            widgetLayoutNumber: widgetLayoutNumber,
            widgetGap: widgetGap,
            quickNotesEnabled: quickNotesEnabled,
            quickNotesPosition: quickNotesPosition,
            quickNotesTimestampEnabled: quickNotesTimestampEnabled,
            quickNotesAddPosition: quickNotesAddPosition,
            taskEditorEnabled: taskEditorEnabled,

            // 页脚配置
            footerEnabled: footerEnabled,
            footerContent: footerContent,

            // vip配置
            mouseIcon: mouseIcon,
            MouseTrailEnabled: MouseTrailEnabled,
            mouseGlobalEnabled: mouseGlobalEnabled,
            ClickEffectEnabled: ClickEffectEnabled,
            ClickEffectContent: ClickEffectContent,
            FallEffectsEnabled: FallEffectsEnabled,
            GlobalFallingEffectsEnabled: GlobalFallingEffectsEnabled,
            FallingIcon: FallingIcon,
            FallingDensity: FallingDensity,
            FallingSpeed: FallingSpeed,
        };

        await plugin.saveData("homepageSettingConfig.json", config);

        if (close) close();

        // 刷新页面以应用新的配置
        window.location.reload();
    }

    function cancelSave() {
        if (close) {
            close();
        }
    }
</script>

<div class="settings-container">
    <!-- 分类导航栏 -->
    <div class="tab-nav">
        <button
            on:click={() => (activeTab = "homepage")}
            class:active={activeTab === "homepage"}
            >{t(plugin, "settings.tab.homepage")}</button
        >
        <button
            on:click={() => (activeTab = "about")}
            class:active={activeTab === "about"}
            >{t(plugin, "settings.tab.about")}</button
        >
    </div>

    <!-- 动态内容容器 -->
    <div class="tab-content">
        {#if activeTab === "homepage"}
            <div class="homepage-global-settings">
                <label for="auto-open-homepage"
                    >{t(plugin, "settings.autoOpenHomepage")}<input
                        type="checkbox"
                        id="auto-open-homepage"
                        bind:checked={tempAutoOpenHomepage}
                    /></label
                >
                <label for=""
                    >{t(plugin, "settings.sidebarEnabled")}<input
                        type="checkbox"
                        bind:checked={sidebarEnabled}
                    /></label
                >
                <label for=""
                    >{t(plugin, "settings.autoOpenMobile")}<input
                        type="checkbox"
                        bind:checked={autoOpenMobileHomepage}
                    /></label
                >
            </div>

            <div class="homepage-content-settings">
                <!-- 子标签导航 -->
                <div class="sub-tab-nav">
                    <button
                        on:click={() => (settingsActiveTab = "banner")}
                        class:active={settingsActiveTab === "banner"}
                        >{t(plugin, "settings.subtab.banner")}</button
                    >
                    <button
                        on:click={() => (settingsActiveTab = "title")}
                        class:active={settingsActiveTab === "title"}
                        >{t(plugin, "settings.subtab.title")}</button
                    >
                    <button
                        on:click={() => (settingsActiveTab = "button")}
                        class:active={settingsActiveTab === "button"}
                        >{t(plugin, "settings.subtab.button")}</button
                    >
                    <button
                        on:click={() => (settingsActiveTab = "widgets")}
                        class:active={settingsActiveTab === "widgets"}
                        >{t(plugin, "settings.subtab.widgets")}</button
                    >
                    {#if advancedEnabled}
                        <button
                            on:click={() => (settingsActiveTab = "styles")}
                            class:active={settingsActiveTab === "styles"}
                            >{t(
                                plugin,
                                "settings.subtab.advancedStyles",
                            )}</button
                        >
                    {/if}
                </div>

                {#if settingsActiveTab === "banner"}
                    <div class="section-setting">
                        <div class="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    bind:checked={tempBannerEnabled}
                                />
                                {t(plugin, "settings.banner.enable")}
                            </label>
                        </div>
                        {#if tempBannerEnabled}
                            <div class="form-group">
                                <label for=""
                                    >{t(plugin, "settings.banner.type")}<select
                                        bind:value={bannerGlobalType}
                                    >
                                        <option value="custom"
                                            >{t(
                                                plugin,
                                                "settings.banner.typeCustom",
                                            )}</option
                                        >
                                        <option value="bing"
                                            >{t(
                                                plugin,
                                                "settings.banner.typeBing",
                                            )}</option
                                        >
                                    </select></label
                                >
                                <label for="banner-height-input"
                                    >{t(plugin, "settings.banner.height")}<input
                                        id="banner-height-input"
                                        type="number"
                                        bind:value={tempBannerHeight}
                                        min="100"
                                        max="800"
                                        step="10"
                                        placeholder={t(
                                            plugin,
                                            "settings.banner.heightPlaceholder",
                                        )}
                                    /></label
                                >
                            </div>
                            {#if bannerGlobalType === "custom"}
                                <div class="banner-settings-container">
                                    <!-- 左侧设置区域 -->
                                    <div class="banner-settings-left">
                                        <!-- 横幅来源选择 -->
                                        <div class="form-group">
                                            <label for="banner-source-select"
                                                >{t(
                                                    plugin,
                                                    "settings.banner.source",
                                                )}</label
                                            >
                                            <select
                                                id="banner-source-select"
                                                bind:value={tempBannerType}
                                            >
                                                <option value="local"
                                                    >{t(
                                                        plugin,
                                                        "common.localImage",
                                                    )}</option
                                                >
                                                <option value="remote"
                                                    >{t(
                                                        plugin,
                                                        "common.remoteImage",
                                                    )}</option
                                                >
                                            </select>
                                        </div>

                                        <!-- 来源具体内容 -->
                                        {#if tempBannerType === "local"}
                                            <div class="form-group">
                                                <label for="local-image-input"
                                                    >{t(
                                                        plugin,
                                                        "settings.banner.localPath",
                                                    )}</label
                                                >
                                                <button
                                                    on:click={() =>
                                                        fileInputEl.click()}
                                                    class="btn-select-file"
                                                    id="local-image-input"
                                                    >{t(
                                                        plugin,
                                                        "common.selectFile",
                                                    )}</button
                                                >
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    bind:this={fileInputEl}
                                                    on:change={handleImageSelect}
                                                    style="display:none;"
                                                />
                                            </div>
                                        {:else if tempBannerType === "remote"}
                                            <div
                                                class="form-group remote-url-input"
                                            >
                                                <div class="input-row">
                                                    <label
                                                        for="remote-image-url"
                                                        >{t(
                                                            plugin,
                                                            "settings.banner.remoteUrl",
                                                        )}</label
                                                    >
                                                    <input
                                                        id="remote-image-url"
                                                        type="text"
                                                        bind:value={
                                                            bannerRemoteUrl
                                                        }
                                                        placeholder={t(
                                                            plugin,
                                                            "settings.banner.remotePlaceholder",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        {/if}
                                    </div>

                                    <!-- 右侧图片预览区域 -->
                                    <div class="banner-preview-container">
                                        {#if tempBannerEnabled}
                                            {#if tempBannerType === "local" && bannerLocalData}
                                                <img
                                                    src={bannerLocalData}
                                                    alt={t(
                                                        plugin,
                                                        "settings.banner.localPreviewAlt",
                                                    )}
                                                    class="banner-preview"
                                                />
                                            {:else if tempBannerType === "remote" && bannerRemoteUrl}
                                                <img
                                                    src={bannerRemoteUrl}
                                                    alt={t(
                                                        plugin,
                                                        "settings.banner.remotePreviewAlt",
                                                    )}
                                                    class="banner-preview"
                                                />
                                            {:else}
                                                <div
                                                    class="banner-preview-placeholder"
                                                >
                                                    {t(
                                                        plugin,
                                                        "common.noImageSelected",
                                                    )}
                                                </div>
                                            {/if}
                                        {/if}
                                    </div>
                                </div>
                            {:else if bannerGlobalType === "bing"}
                                {#if advancedEnabled}
                                    <div class="banner-setting-bing">
                                        <label for=""
                                            >{t(
                                                plugin,
                                                "settings.banner.bingApi",
                                            )}<select bind:value={bingApiType}>
                                                <option value="POD_UHD"
                                                    >{t(
                                                        plugin,
                                                        "settings.banner.bingPodUhd",
                                                    )}</option
                                                >
                                                <option value="POD_1K"
                                                    >{t(
                                                        plugin,
                                                        "settings.banner.bingPod1k",
                                                    )}</option
                                                >
                                                <option value="POD_Normal"
                                                    >{t(
                                                        plugin,
                                                        "settings.banner.bingPodNormal",
                                                    )}</option
                                                >
                                                <option value="rand_uhd"
                                                    >{t(
                                                        plugin,
                                                        "settings.banner.bingRandUhd",
                                                    )}</option
                                                >
                                                <option value="rand_1K"
                                                    >{t(
                                                        plugin,
                                                        "settings.banner.bingRand1k",
                                                    )}</option
                                                >
                                                <option value="rand_Normal"
                                                    >{t(
                                                        plugin,
                                                        "settings.banner.bingRandNormal",
                                                    )}</option
                                                >
                                                <option value="ECY1"
                                                    >{t(
                                                        plugin,
                                                        "settings.banner.ecy1",
                                                    )}</option
                                                >
                                                <option value="RAND1"
                                                    >{t(
                                                        plugin,
                                                        "settings.banner.rand1",
                                                    )}</option
                                                >
                                            </select></label
                                        >
                                    </div>
                                {:else}
                                    <h3>
                                        {t(plugin, "common.vipBenefitTitle")}
                                    </h3>
                                {/if}
                            {/if}
                        {/if}
                    </div>
                {/if}

                {#if settingsActiveTab === "title"}
                    <!-- 标题区域设置 -->
                    <div class="section-setting titleBlock-setting">
                        <div class="title-setting">
                            <div class="form-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        bind:checked={showIcon}
                                    />
                                    {t(plugin, "settings.title.showIcon")}
                                </label>
                            </div>

                            {#if showIcon === true}
                                <!-- 图标选择与自定义标题容器 -->
                                <div class="icon-and-title-container">
                                    <!-- 顶部图标设置 -->
                                    <div class="icon-selection">
                                        <label for="title-icon-type"
                                            >{t(
                                                plugin,
                                                "settings.title.icon",
                                            )}</label
                                        >
                                        <select
                                            id="title-icon-type"
                                            bind:value={titleIconType}
                                        >
                                            <option value="emoji"
                                                >{t(
                                                    plugin,
                                                    "settings.title.iconEmoji",
                                                )}</option
                                            >
                                            <option value="image"
                                                >{t(
                                                    plugin,
                                                    "settings.title.iconImage",
                                                )}</option
                                            >
                                        </select>
                                        {#if titleIconType === "emoji"}
                                            <button
                                                id="emoji-picker-button"
                                                type="button"
                                                title={t(
                                                    plugin,
                                                    "settings.title.selectIcon",
                                                )}
                                                class="emoji-display"
                                                on:click={openEmojiPicker}
                                                aria-label={t(
                                                    plugin,
                                                    "settings.title.selectEmoji",
                                                )}
                                            >
                                                {tempTitleIconEmoji || "😊"}
                                            </button>
                                        {:else if titleIconType === "image"}
                                            <button
                                                on:click={() =>
                                                    iconInputEl.click()}
                                                class="btn-select-file"
                                                id="icon-image-input"
                                                title={t(
                                                    plugin,
                                                    "settings.title.selectIcon",
                                                )}
                                                >{t(
                                                    plugin,
                                                    "common.selectImage",
                                                )}</button
                                            >

                                            <input
                                                type="file"
                                                accept="image/*"
                                                bind:this={iconInputEl}
                                                on:change={handleIconImageSelect}
                                                style="display:none;"
                                            />
                                        {/if}

                                        {#if titleIconType === "image" && tempTitleIconImage}
                                            <img
                                                src={tempTitleIconImage}
                                                alt={t(
                                                    plugin,
                                                    "settings.title.iconPreview",
                                                )}
                                                title={t(
                                                    plugin,
                                                    "settings.title.iconPreview",
                                                )}
                                            />
                                            <select
                                                class="iconstyle"
                                                bind:value={tempTitleIconStyle}
                                            >
                                                <option value="square"
                                                    >{t(
                                                        plugin,
                                                        "settings.title.shapeSquare",
                                                    )}</option
                                                >
                                                <option value="round"
                                                    >{t(
                                                        plugin,
                                                        "settings.title.shapeRound",
                                                    )}</option
                                                >
                                                <option value="circle"
                                                    >{t(
                                                        plugin,
                                                        "settings.title.shapeCircle",
                                                    )}</option
                                                >
                                            </select>
                                        {/if}
                                    </div>
                                    <!-- 底部标题输入 -->
                                    <div class="custom-title-input">
                                        <label for="custom-title-input"
                                            >{t(
                                                plugin,
                                                "settings.title.text",
                                            )}</label
                                        >
                                        <input
                                            id="custom-title-input"
                                            type="text"
                                            bind:value={tempCustomTitle}
                                            placeholder={t(
                                                plugin,
                                                "settings.title.textPlaceholder",
                                            )}
                                        />
                                    </div>
                                </div>

                                <!-- 表情弹窗 -->
                                {#if showEmojiPicker}
                                    <button
                                        class="emoji-picker-overlay-bg"
                                        tabindex="0"
                                        on:click={() =>
                                            (showEmojiPicker = false)}
                                        on:keydown={(e) => {
                                            if (
                                                e.key === "Enter" ||
                                                e.key === " "
                                            )
                                                showEmojiPicker = false;
                                        }}
                                        aria-label={t(
                                            plugin,
                                            "settings.title.closeEmojiPicker",
                                        )}
                                    ></button>

                                    <div
                                        class="emoji-picker-modal"
                                        style="top: {emojiPickerPosition.top}; left: {emojiPickerPosition.left};"
                                        role="dialog"
                                        aria-modal="true"
                                    >
                                        <div class="emoji-picker-content">
                                            <emoji-picker
                                                bind:this={emojiPickerElement}
                                            />
                                        </div>
                                    </div>
                                {/if}
                            {/if}
                        </div>

                        <div class="stats-info-setting">
                            <div>
                                {t(plugin, "settings.title.customStats")}<a
                                    href={getTutorialLink("bannerSettings").url}
                                    target="_blank"
                                    >{t(
                                        plugin,
                                        "settings.title.viewVariables",
                                    )}</a
                                >
                            </div>
                            <textarea
                                class="stats-info-text"
                                bind:value={tempStatsInfoText}
                                placeholder={t(
                                    plugin,
                                    "settings.title.statsPlaceholder",
                                )}
                            />
                        </div>
                    </div>
                {/if}

                {#if settingsActiveTab === "button"}
                    <div class="section-setting buttons-setting">
                        <div class="buttons-setting-container">
                            <div class="buttons-list">
                                {#each buttonsList as item (item.id)}
                                    <button
                                        type="button"
                                        class="button-item"
                                        class:active={selectedButton?.id ===
                                            item.id}
                                        on:click={() => (selectedButton = item)}
                                        on:keydown={(e) => {
                                            if (
                                                e.key === "Enter" ||
                                                e.key === " "
                                            ) {
                                                selectedButton = item;
                                                e.preventDefault();
                                            }
                                        }}
                                        aria-label={t(
                                            plugin,
                                            "settings.button.selectAria",
                                            { label: item.label },
                                        )}
                                    >
                                        <input
                                            type="checkbox"
                                            bind:checked={item.checked}
                                            on:click|stopPropagation
                                        />
                                        <span>{item.label}</span>
                                    </button>
                                {/each}
                                <button
                                    class="add-button"
                                    on:click={addNewButton}
                                    >{t(plugin, "settings.button.add")}</button
                                >
                            </div>

                            <div class="button-details">
                                {#if selectedButton}
                                    <h4>
                                        {t(plugin, "settings.button.edit", {
                                            label: selectedButton.label,
                                        })}
                                    </h4>
                                    {#if selectedButton.id === ADD_WIDGET_BUTTON_ID}
                                        <p>
                                            {t(
                                                plugin,
                                                "settings.button.coreNoCustom",
                                            )}
                                        </p>
                                    {:else if selectedButton.id === SETTINGS_BUTTON_ID}
                                        <p>
                                            {t(
                                                plugin,
                                                "settings.button.coreNoCustom",
                                            )}
                                        </p>
                                    {:else}
                                        <!-- 自定义按钮设置项 -->
                                        <div class="form-group">
                                            <label for="custom-button-label"
                                                >{t(
                                                    plugin,
                                                    "settings.button.label",
                                                )}</label
                                            >
                                            <input
                                                id="custom-button-label"
                                                type="text"
                                                bind:value={
                                                    selectedButton.label
                                                }
                                                on:input={() =>
                                                    updateButtonLabel(
                                                        selectedButton.label,
                                                    )}
                                                placeholder={t(
                                                    plugin,
                                                    "settings.button.labelPlaceholder",
                                                )}
                                            />
                                        </div>
                                        <!-- 快捷键输入框 -->
                                        <div class="form-group">
                                            <label for="button-shortcut"
                                                >{t(
                                                    plugin,
                                                    "settings.button.shortcut",
                                                )}</label
                                            >
                                            <input
                                                id="button-shortcut"
                                                type="text"
                                                placeholder={t(
                                                    plugin,
                                                    "settings.button.shortcutPlaceholder",
                                                )}
                                                bind:value={
                                                    selectedButton.shortcut
                                                }
                                            />
                                        </div>
                                        <div class="button-actions">
                                            <button
                                                class="btn move-up"
                                                on:click={moveUpButton}
                                                disabled={selectedButtonIndex <=
                                                    0}
                                                title={t(
                                                    plugin,
                                                    "common.moveUp",
                                                )}>🔼</button
                                            >

                                            <button
                                                class="btn move-down"
                                                on:click={moveDownButton}
                                                disabled={selectedButtonIndex >=
                                                    buttonsList.length - 1 ||
                                                    selectedButtonIndex === -1}
                                                title={t(
                                                    plugin,
                                                    "common.moveDown",
                                                )}>🔽</button
                                            >

                                            <button
                                                class="btn danger"
                                                on:click={deleteCustomButton}
                                                >{t(
                                                    plugin,
                                                    "common.deleteButton",
                                                )}</button
                                            >
                                        </div>
                                    {/if}
                                {:else}
                                    <p>
                                        {t(
                                            plugin,
                                            "settings.button.selectHint",
                                        )}
                                    </p>
                                {/if}
                            </div>
                        </div>
                    </div>
                {/if}

                {#if settingsActiveTab === "widgets"}
                    <div class="section-setting widgets-setting">
                        <div class="form-group widget-layout-setting">
                            <h3>{t(plugin, "settings.widgets.layoutTitle")}</h3>
                            <label for=""
                                >{t(plugin, "settings.widgets.perRow")}<input
                                    type="number"
                                    bind:value={widgetLayoutNumber}
                                /></label
                            >
                            <label for="widget-gap"
                                >{t(plugin, "settings.widgets.gap")}<input
                                    type="number"
                                    bind:value={widgetGap}
                                /></label
                            >
                        </div>
                        <div class="form-group quick-notes-setting">
                            <h3>
                                {t(plugin, "settings.widgets.quickNotesTitle")}
                            </h3>
                            <label for="quick-notes-open"
                                ><input
                                    id="quick-notes-open"
                                    type="checkbox"
                                    bind:checked={quickNotesEnabled}
                                />{t(
                                    plugin,
                                    "settings.widgets.quickNotesEnable",
                                )}</label
                            >

                            {#if quickNotesEnabled}
                                <label for=""
                                    >{t(
                                        plugin,
                                        "settings.widgets.quickNotesPosition",
                                    )}
                                    <input
                                        type="text"
                                        placeholder={t(
                                            plugin,
                                            "settings.widgets.quickNotesPositionPlaceholder",
                                        )}
                                        bind:value={quickNotesPosition}
                                    />
                                </label>
                                <label for="quick-notes-position"
                                    >{t(
                                        plugin,
                                        "settings.widgets.quickNotesAddPosition",
                                    )}<select
                                        name="quick-notes-position"
                                        id="quick-notes-position"
                                        bind:value={quickNotesAddPosition}
                                    >
                                        <option value="bottom"
                                            >{t(
                                                plugin,
                                                "settings.widgets.quickNotesAddBottom",
                                            )}</option
                                        >
                                        <option value="top"
                                            >{t(
                                                plugin,
                                                "settings.widgets.quickNotesAddTop",
                                            )}</option
                                        >
                                    </select></label
                                >
                                <label for="quick-notes-timestamp"
                                    ><input
                                        id="quick-notes-timestamp"
                                        type="checkbox"
                                        bind:checked={
                                            quickNotesTimestampEnabled
                                        }
                                    />
                                    {t(
                                        plugin,
                                        "settings.widgets.quickNotesTimestamp",
                                    )}
                                </label>
                            {/if}
                        </div>
                        <div class="form-group task-plus-setting">
                            <h3>
                                {t(plugin, "settings.widgets.taskPlusTitle")}
                            </h3>
                            <label for="task-editor-enabled"
                                ><input
                                    id="task-editor-enabled"
                                    type="checkbox"
                                    bind:checked={taskEditorEnabled}
                                />
                                {t(
                                    plugin,
                                    "settings.widgets.taskEditorEnable",
                                )}</label
                            >
                        </div>
                    </div>
                {/if}

                {#if settingsActiveTab === "styles"}
                    <div class="section-setting styles-setting">
                        <div class="footer-setting">
                            <h3>{t(plugin, "settings.styles.footerTitle")}</h3>
                            <label for="footer-enable"
                                ><input
                                    id="footer-enable"
                                    type="checkbox"
                                    bind:checked={footerEnabled}
                                />
                                {t(
                                    plugin,
                                    "settings.styles.footerEnable",
                                )}</label
                            >
                            {#if footerEnabled}
                                <label for="footer-content">
                                    <textarea
                                        id="footer-content"
                                        placeholder={t(
                                            plugin,
                                            "settings.styles.footerPlaceholder",
                                        )}
                                        bind:value={footerContent}
                                    ></textarea>
                                </label>
                            {/if}
                        </div>
                        <div class="mouse-setting">
                            <h3>{t(plugin, "settings.styles.mouseTitle")}</h3>
                            <label for="mouse-style">
                                {t(plugin, "settings.styles.mouseIcon")}
                                <select
                                    name="mouse-style"
                                    id="mouse-style"
                                    bind:value={mouseIcon}
                                >
                                    <option value="default"
                                        >{t(plugin, "common.default")}</option
                                    >
                                    <option value="arrow1"
                                        >{t(
                                            plugin,
                                            "settings.styles.mouseArrow1",
                                        )}</option
                                    >
                                    <option value="arrow2"
                                        >{t(
                                            plugin,
                                            "settings.styles.mouseArrow2",
                                        )}</option
                                    >
                                    <option value="arrow3"
                                        >{t(
                                            plugin,
                                            "settings.styles.mouseArrow3",
                                        )}</option
                                    >
                                    <option value="arrow4"
                                        >{t(
                                            plugin,
                                            "settings.styles.mouseArrow4",
                                        )}</option
                                    >
                                    <option value="arrow5"
                                        >{t(
                                            plugin,
                                            "settings.styles.mouseArrow5",
                                        )}</option
                                    >
                                    <option value="arrow6"
                                        >{t(
                                            plugin,
                                            "settings.styles.mouseArrow6",
                                        )}</option
                                    >
                                    <option value="arrow7"
                                        >{t(
                                            plugin,
                                            "settings.styles.mouseArrow7",
                                        )}</option
                                    >
                                    <option value="LOL1">LOL1</option>
                                    <option value="LOL2">LOL2</option>
                                    <option value="LOL3">LOL3</option>
                                    <option value="LOL4">LOL4</option>
                                    <option value="CBPK2077"
                                        >{t(
                                            plugin,
                                            "settings.styles.mouseCyberpunk",
                                        )}</option
                                    >
                                    <option value="CYWL1"
                                        >{t(
                                            plugin,
                                            "settings.styles.mouseMiku1",
                                        )}</option
                                    >
                                    <option value="CYWL2"
                                        >{t(
                                            plugin,
                                            "settings.styles.mouseMiku2",
                                        )}</option
                                    >
                                    <option value="cat1"
                                        >{t(
                                            plugin,
                                            "settings.styles.mouseCat1",
                                        )}</option
                                    >
                                    <option value="cat2"
                                        >{t(
                                            plugin,
                                            "settings.styles.mouseCat2",
                                        )}</option
                                    >
                                    <option value="cat3"
                                        >{t(
                                            plugin,
                                            "settings.styles.mouseCat3",
                                        )}</option
                                    >
                                    <option value="WDSJsword"
                                        >{t(
                                            plugin,
                                            "settings.styles.mouseDiamondSword",
                                        )}</option
                                    >
                                    <option value="WDSJpickaxe"
                                        >{t(
                                            plugin,
                                            "settings.styles.mouseDiamondPickaxe",
                                        )}</option
                                    >
                                </select>
                            </label>
                            <div class="mouse-global-setting">
                                <label for="mouse-global">
                                    <input
                                        id="mouse-global"
                                        type="checkbox"
                                        bind:checked={mouseGlobalEnabled}
                                    />{t(plugin, "settings.styles.mouseGlobal")}
                                </label>
                                <label for="mouse-trail">
                                    <input
                                        id="mouse-trail"
                                        type="checkbox"
                                        bind:checked={MouseTrailEnabled}
                                    />{t(plugin, "settings.styles.mouseTrail")}
                                </label>
                                <label for="click-effect"
                                    ><input
                                        type="checkbox"
                                        bind:checked={ClickEffectEnabled}
                                    />{t(
                                        plugin,
                                        "settings.styles.clickEffect",
                                    )}</label
                                >
                            </div>
                            {#if ClickEffectEnabled}
                                <label for="click-effect-content">
                                    <textarea
                                        id="click-effect-content"
                                        placeholder={t(
                                            plugin,
                                            "settings.styles.clickEffectPlaceholder",
                                        )}
                                        bind:value={ClickEffectContent}
                                    ></textarea>
                                </label>
                            {/if}
                        </div>
                        <div class="background-effects-setting">
                            <h3>
                                {t(plugin, "settings.styles.fallingTitle")}
                            </h3>
                            <div class="background-effects-setting-checkbox">
                                <label for=""
                                    ><input
                                        type="checkbox"
                                        bind:checked={FallEffectsEnabled}
                                    />{t(
                                        plugin,
                                        "settings.styles.fallingEnable",
                                    )}</label
                                ><label for=""
                                    ><input
                                        type="checkbox"
                                        bind:checked={
                                            GlobalFallingEffectsEnabled
                                        }
                                    />{t(
                                        plugin,
                                        "settings.styles.mouseGlobal",
                                    )}</label
                                >
                            </div>
                            <div class="form-group">
                                <label for="falling-icon">
                                    {t(plugin, "settings.styles.fallingIcon")}
                                    <select
                                        name="falling-icon"
                                        id="falling-icon"
                                        bind:value={FallingIcon}
                                    >
                                        <option value="snow"
                                            >{t(
                                                plugin,
                                                "settings.styles.fallingSnow",
                                            )}</option
                                        >
                                        <option value="heart"
                                            >{t(
                                                plugin,
                                                "settings.styles.fallingHeart",
                                            )}</option
                                        >
                                        <option value="star"
                                            >{t(
                                                plugin,
                                                "settings.styles.fallingStar",
                                            )}</option
                                        >
                                        <option value="greenery"
                                            >{t(
                                                plugin,
                                                "settings.styles.fallingGreenery",
                                            )}</option
                                        >
                                        <option value="mapleLeaf"
                                            >{t(
                                                plugin,
                                                "settings.styles.fallingMapleLeaf",
                                            )}</option
                                        >
                                        <option value="ginkgoLeaf"
                                            >{t(
                                                plugin,
                                                "settings.styles.fallingGinkgoLeaf",
                                            )}</option
                                        >
                                        <option value="bodhiLeaf"
                                            >{t(
                                                plugin,
                                                "settings.styles.fallingBodhiLeaf",
                                            )}</option
                                        >
                                        <option value="bambooLeaf"
                                            >{t(
                                                plugin,
                                                "settings.styles.fallingBambooLeaf",
                                            )}</option
                                        >
                                        <option value="cherry"
                                            >{t(
                                                plugin,
                                                "settings.styles.fallingCherry",
                                            )}</option
                                        >
                                        <option value="cherryPetal"
                                            >{t(
                                                plugin,
                                                "settings.styles.fallingCherryPetal",
                                            )}</option
                                        >
                                        <option value="Rinka"
                                            >{t(
                                                plugin,
                                                "settings.styles.fallingRinka",
                                            )}</option
                                        >
                                        <option value="rose"
                                            >{t(
                                                plugin,
                                                "settings.styles.fallingRose",
                                            )}</option
                                        >
                                        <option value="dandelion"
                                            >{t(
                                                plugin,
                                                "settings.styles.fallingDandelion",
                                            )}</option
                                        >
                                        <option value="QZHIHE"
                                            >{t(
                                                plugin,
                                                "settings.styles.fallingPaperCrane",
                                            )}</option
                                        >
                                        <option value="paperPlane"
                                            >{t(
                                                plugin,
                                                "settings.styles.fallingPaperPlane",
                                            )}</option
                                        >
                                        <option value="HMBB"
                                            >{t(
                                                plugin,
                                                "settings.styles.fallingSpongeBob",
                                            )}</option
                                        >
                                        <option value="PDX"
                                            >{t(
                                                plugin,
                                                "settings.styles.fallingPatrick",
                                            )}</option
                                        >
                                    </select>
                                </label>
                                <label for=""
                                    >{t(
                                        plugin,
                                        "settings.styles.fallingDensity",
                                    )}
                                    <select bind:value={FallingDensity}>
                                        <option value="low"
                                            >{t(plugin, "common.low")}</option
                                        >
                                        <option value="medium"
                                            >{t(
                                                plugin,
                                                "common.medium",
                                            )}</option
                                        >
                                        <option value="high"
                                            >{t(plugin, "common.high")}</option
                                        >
                                    </select>
                                </label>
                                <label for=""
                                    >{t(plugin, "settings.styles.fallingSpeed")}
                                    <select bind:value={FallingSpeed}>
                                        <option value="low"
                                            >{t(plugin, "common.low")}</option
                                        >
                                        <option value="medium"
                                            >{t(
                                                plugin,
                                                "common.medium",
                                            )}</option
                                        >
                                        <option value="high"
                                            >{t(plugin, "common.high")}</option
                                        >
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
            <!-- 操作按钮 -->
            <div class="action-buttons">
                <button class="btn primary no-link-style" on:click={confirmSave}
                    >{t(plugin, "common.confirm")}</button
                >
                <button class="btn" on:click={cancelSave}
                    >{t(plugin, "common.cancel")}</button
                >
            </div>
        {:else if activeTab === "about"}
            <div class="about-section">
                <div class="about-header">
                    <h3>{t(plugin, "settings.about.pluginTitle")}</h3>
                    <p class="moto">{t(plugin, "settings.about.motto")}</p>
                </div>

                <div class="about-grid">
                    <div class="about-card">
                        <span class="icon">🌐</span>
                        <div>
                            <p class="label">
                                {t(plugin, "settings.about.homepage")}
                            </p>
                            <a
                                href="https://github.com/darkmusic/siyuan-homepage"
                                class="link">siyuan-homepage</a
                            >
                        </div>
                        <span class="icon">&nbsp;&nbsp;&nbsp;</span>
                        <span class="icon">📜</span>
                        <div>
                            <p class="label">
                                {t(plugin, "settings.about.tutorial")}
                            </p>
                            <a
                                href={getTutorialLink("pluginTutorial").url}
                                class="link"
                                >{t(plugin, "settings.about.feishuDoc")}</a
                            >
                        </div>
                    </div>

                    <div class="about-card">
                        <span class="icon">👨</span>
                        <div>
                            <p class="label">
                                {t(plugin, "settings.about.developer")}
                            </p>
                            <a
                                href="https://github.com/darkmusic"
                                class="link"
                                >{t(plugin, "settings.about.github")}</a
                            >
                        </div>
                        <span class="icon">&nbsp;&nbsp;&nbsp;</span>
                        <span class="icon">⁉</span>
                        <div>
                            <p class="label">
                                {t(plugin, "settings.about.feedback")}
                            </p>
                            <p>
                                <a
                                    href="https://github.com/darkmusic/siyuan-homepage/issues"
                                    class="link">Github Issues</a
                                >
                            </p>
                        </div>
                    </div>
                </div>

                <div class="about-footer">
                    <p>{t(plugin, "settings.about.thanks")}</p>
                </div>
            </div>
        {/if}
    </div>
</div>
