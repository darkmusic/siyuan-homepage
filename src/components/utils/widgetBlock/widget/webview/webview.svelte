<script lang="ts">
    import { onMount } from "svelte";
    import { pluginT as t } from "@/libs/i18n";

    export let plugin: any;
    export let contentTypeJson: string = "{}";

    let webviewUrl: string = "";
    let isElectron: boolean = false;

    onMount(() => {
        isElectron =
            typeof process !== "undefined" && !!process.versions?.electron;

        try {
            const config = JSON.parse(contentTypeJson);
            if (config.type === "custom-web" && config.data?.[0]?.url) {
                webviewUrl = config.data[0].url;
            } else {
                webviewUrl = "about:blank";
            }
        } catch (e) {
            console.error("无法解析 contentTypeJson", e);
            webviewUrl = "about:blank";
        }

        if (!isElectron && webviewUrl !== "about:blank") {
            setupIframeLinkInterceptor();
        }
    });

    function setupIframeLinkInterceptor() {
        const iframeElement = document.querySelector("iframe.custom-web");
        if (!iframeElement) return;

        const iframe = iframeElement as HTMLIFrameElement;

        iframe.addEventListener("load", () => {
            try {
                const doc =
                    iframe.contentDocument || iframe.contentWindow?.document;
                if (!doc) return;

                const links = doc.querySelectorAll("a");
                links.forEach((link) => {
                    link.setAttribute("target", "_self");
                });
            } catch (e) {
                console.warn("无法访问 iframe 内容，可能是跨域", e);
            }
        });
    }
</script>

<div class="content-display">
    {#if isElectron}
        <webview class="custom-web" src={webviewUrl}></webview>
    {:else if webviewUrl !== "about:blank"}
        <div>
            <p>
                {t(plugin, "widgets.webview.limitedEnv")}
            </p>
            <p>{t(plugin, "widgets.webview.useDesktop")}</p>
            <div>
                {t(plugin, "widgets.webview.openInNewTab")}
                <a href={webviewUrl} target="_blank">{t(plugin, "widgets.webview.openLink")}</a>
            </div>
        </div>
        <iframe
            class="custom-web"
            src={webviewUrl}
            title={t(plugin, "widgets.webview.iframeTitle")}
        ></iframe>
    {/if}
</div>

<style>
    .content-display {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        box-sizing: border-box;
        border-radius: 12px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }

    .custom-web {
        flex: 1;
        width: 100%;
        height: 100%;
        border: none;
        margin: 0;
        padding: 0;
    }
</style>
