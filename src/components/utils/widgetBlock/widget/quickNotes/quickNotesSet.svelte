<script lang="ts">
    import { pluginT } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let quickNotesTitle: string;
    export let quickNotesSort: string;

    const tutorialLink = getTutorialLink("widgets.quickNotes");

    function t(key: string, vars?: Record<string, string | number>) {
        return pluginT(plugin, key, vars);
    }
</script>

<div class="content-panel quick-notes">
    <div class="form-group quick-notes-title">
        <label for="quick-notes-title">
            {t("common.widgetTitle")}
            <input
                id="quick-notes-title"
                type="text"
                bind:value={quickNotesTitle}
                placeholder={t("common.widgetTitleInput")}
            />
        </label>
    </div>
    <label for="quick-notes-sort">
        {t("widgets.quickNotes.sort")}
        <select id="quick-notes-sort" bind:value={quickNotesSort}>
            <option value="DOC_ASC"
                >{t("widgets.quickNotes.sortDocAsc")}</option
            >
            <option value="DOC_INV"
                >{t("widgets.quickNotes.sortDocInv")}</option
            >
            <option value="UPD">{t("widgets.quickNotes.sortUpdated")}</option>
            <option value="CRE">{t("widgets.quickNotes.sortCreated")}</option>
        </select>
    </label>
    <hr />
    <div>
        {t("common.componentDescription")}<a
            href={tutorialLink.url}
            target="_blank">{tutorialLink.label}</a
        >
    </div>
</div>
