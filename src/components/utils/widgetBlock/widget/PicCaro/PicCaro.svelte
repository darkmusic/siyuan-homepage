<script lang="ts">
    import { onMount } from "svelte";
    import { register } from "swiper/element/bundle";
    import { pluginT as t } from "@/libs/i18n";

    export let plugin: any;
    export let contentTypeJson: string = "{}";

    const parsedContent = JSON.parse(contentTypeJson);
    const PicFolderPath = parsedContent.data.PicFolderPath || "";
    const PicAutoPlay = parsedContent.data.PicAutoPlay ?? false;
    const PicInterval = parsedContent.data.PicInterval || 3;
    const PicNavigation = parsedContent.data.PicNavigation ?? false;
    const PicPagination = parsedContent.data.PicPagination ?? false;
    const PicPaginationType = parsedContent.data.PicPaginationType || "bullets";
    const PicPaginationDyBu = parsedContent.data.PicPaginationDyBu ?? false;
    const PicPaginationPrOp = parsedContent.data.PicPaginationPrOp ?? false;
    const PicEffect = parsedContent.data.PicEffect || "slide";
    const PicSlidesPerView = parsedContent.data.PicSlidesPerView || "1";
    const PicRandomSwitch = parsedContent.data.PicRandomSwitch ?? false;

    let advancedEnabled = false;
    let images: Array<{ name: string; path: string }> = [];
    let loading = true;
    let error = "";

    // 读取文件夹中的图片
    async function loadImages() {
        try {
            if (!PicFolderPath) {
                error = t(plugin, "widgets.picCaro.configureFolderPath");
                return;
            }

            const fs = window.require("fs");
            const pathLib = window.require("path");

            const imageExtensions = [
                ".jpg",
                ".jpeg",
                ".png",
                ".gif",
                ".webp",
                ".svg",
                ".bmp",
                ".ico",
                ".tiff",
                ".tif",
                ".raw",
                ".cr2",
                ".nef",
                ".arw",
                ".heic",
                ".heif",
                ".avif",
                ".jxl",
                ".psd",
                ".ai",
                ".eps",
            ];
            const files = fs.readdirSync(PicFolderPath);

            images = files
                .filter((file) => {
                    const ext = pathLib.extname(file).toLowerCase();
                    return imageExtensions.includes(ext);
                })
                .map((file) => ({
                    name: file,
                    path: `file://${pathLib.join(PicFolderPath, file)}`,
                }));
            
            // 如果启用了随机切换，打乱图片顺序
            if (PicRandomSwitch && images.length > 1) {
                for (let i = images.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [images[i], images[j]] = [images[j], images[i]];
                }
            }

            if (images.length === 0) {
                error = t(plugin, "widgets.picCaro.notFound");
            }
        } catch (err) {
            console.error("加载图片失败:", err);
            error = t(plugin, "widgets.picCaro.loadImagesFailed");
        } finally {
            loading = false;
        }
    }

    onMount(async () => {
        advancedEnabled = plugin.ADVANCED;

        if (advancedEnabled) {
            register();
            await loadImages();
        }
    });
</script>

<div class="content-display">
    {#if advancedEnabled}
        {#if loading}
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p>{t(plugin, "widgets.picCaro.loading")}</p>
            </div>
        {:else if error}
            <div class="error-container">
                <p class="error-message">{error}</p>
            </div>
        {:else if images.length > 0}
            <div class="carousel-container">
                <swiper-container
                    class="piccaro-swiper"
                    slides-per-view={PicEffect === "slide" ? PicSlidesPerView : "1"}
                    speed="800"
                    loop="true"
                    autoplay={PicAutoPlay}
                    autoplay-delay={PicAutoPlay ? PicInterval * 1000 : 0}
                    autoplay-disable-on-interaction="false"
                    pagination={PicPagination}
                    pagination-clickable={PicPagination}
                    pagination-type={PicPaginationType}
                    pagination-dynamic-bullets={PicPaginationDyBu ? "true" : "false"}
                    pagination-progressbar-opposite={PicPaginationPrOp ? "true" : "false"}
                    navigation={PicNavigation}
                    space-between="20"
                    effect={PicEffect}
                    fade-effect-cross-fade={PicEffect === "fade" ? "true" : "false"}
                >
                    {#each images as image}
                        <swiper-slide>
                            <div class="slide-wrapper">
                                <img
                                    src={image.path}
                                    alt={image.name}
                                    class="carousel-image"
                                    draggable="false"
                                />
                            </div>
                        </swiper-slide>
                    {/each}
                </swiper-container>
            </div>
        {:else}
            <div class="empty-container">
                <p>{t(plugin, "widgets.picCaro.notFound")}</p>
            </div>
        {/if}
    {:else}
        <div class="content-not-advanced">
            <h2>{t(plugin, "common.vipFeatureTitle")}</h2>
            <h3>{t(plugin, "common.vipFeatureHint")}</h3>
        </div>
    {/if}
</div>

<style lang="scss">
    .content-display {
        width: 100%;
        height: calc(100%);
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        border-radius: 12px;
    }

    .content-not-advanced {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        text-align: center;
        color: #666;
    }

    .loading-container,
    .error-container,
    .empty-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .error-message {
        color: #e74c3c;
        font-size: 14px;
        text-align: center;
        padding: 0 20px;
    }

    .carousel-container {
        width: 100%;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
    }

    .piccaro-swiper {
        width: 100%;
        height: 100%;
        border-radius: 12px;
        overflow: hidden;
    }

    .slide-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .carousel-image {
        max-width: 100%;
        max-height: 100%;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: transform 0.3s ease;
        user-select: none;
    }

    .carousel-image:hover {
        transform: scale(1.02);
    }

    // 自定义Swiper样式
    :global(.piccaro-swiper .swiper-pagination-bullet) {
        background: #fff;
        opacity: 0.7;
        width: 8px;
        height: 8px;
    }

    :global(.piccaro-swiper .swiper-pagination-bullet-active) {
        opacity: 1;
        background: #3498db;
    }

    :global(.piccaro-swiper .swiper-button-next),
    :global(.piccaro-swiper .swiper-button-prev) {
        color: #fff;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        backdrop-filter: blur(10px);
    }

    :global(.piccaro-swiper .swiper-button-next:hover),
    :global(.piccaro-swiper .swiper-button-prev:hover) {
        background: rgba(0, 0, 0, 0.5);
    }

    :global(.piccaro-swiper .swiper-button-next::after),
    :global(.piccaro-swiper .swiper-button-prev::after) {
        font-size: 16px;
        font-weight: bold;
    }
</style>
