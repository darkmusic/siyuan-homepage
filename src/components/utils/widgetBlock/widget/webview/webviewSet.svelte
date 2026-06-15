<script lang="ts">
    import { pluginT } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let customWebUrl: string = "";

    const tutorial = getTutorialLink("widgets.webview");

    function t(key: string, vars?: Record<string, string | number>) {
        return pluginT(plugin, key, vars);
    }
</script>

<div class="content-panel custom-web">
    <div class="form-group">
        <label for="custom-web-url">{t("widgets.webview.url")}</label>
        <input
            id="custom-web-url"
            type="text"
            bind:value={customWebUrl}
            placeholder={t("widgets.webview.urlPlaceholder")}
        />
    </div>

    <hr />
    <div>
        {t("common.componentDescription")}<a
            href={tutorial.url}
            target="_blank">{tutorial.label}</a
        >
    </div>
</div>
