<script lang="ts">
    import { pluginT as t } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let sqlTitle: string;
    export let sqlInput: string;
    export let columnOrder: string;
    export let hiddenFields: string;

    const tutorial = getTutorialLink("widgets.sql");
</script>

<div class="content-panel sql">
    <div class="form-group">
        <label for="sql-title">
            {t(plugin, "widgets.sql.title")}
            <input id="sql-title" type="text" bind:value={sqlTitle} />
        </label>
    </div>
    <div class="form-group">
        <label for="sql-input">{t(plugin, "widgets.sql.input")}</label>
        <textarea
            id="sql-input"
            bind:value={sqlInput}
            placeholder={t(plugin, "widgets.sql.inputPlaceholder")}
        ></textarea>
    </div>
    <div class="form-group">
        <label for="column-order">
            {t(plugin, "widgets.sql.columnOrder")}
            <input
                id="column-order"
                type="text"
                placeholder={t(plugin, "widgets.sql.columnOrderPlaceholder")}
                bind:value={columnOrder}
            />
        </label>
    </div>
    <div class="form-group">
        <label for="hidden-fields">
            {t(plugin, "widgets.sql.hiddenFields")}
            <input
                id="hidden-fields"
                type="text"
                placeholder={t(plugin, "widgets.sql.hiddenFieldsPlaceholder")}
                bind:value={hiddenFields}
            />
        </label>
    </div>

    <hr />
    <div>
        {t(plugin, "common.componentDescription")}<a
            href={tutorial.url}
            target="_blank">{tutorial.label}</a
        >
    </div>
</div>
