<script lang="ts">
    import { pluginT as t } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let customWeatherCityName: string = "";
    export let customWeatherCityCode: string = "";
    export let weatherStyle: string = "default";

    const tutorial = getTutorialLink("widgets.weather");
</script>

<div class="weather-settings">
    <div class="setting-item">
        <div class="form-group">
            <label for="weather-city">{t(plugin, "common.style")}</label>
            <select id="weather-style" bind:value={weatherStyle}>
                <option value="default">{t(plugin, "common.default")}</option>
                <option value="simple1">{t(plugin, "widgets.weather.simple1")}</option>
                <option value="simple2">{t(plugin, "widgets.weather.simple2")}</option>
            </select>
        </div>
    </div>
    {#if weatherStyle === "default" || weatherStyle === "simple1" || weatherStyle === "simple2"}
        <div class="setting-item">
            <div class="form-group">
                <label for="weather-city">{t(plugin, "widgets.weather.cityName")}</label>
                <input
                    id="weather-city"
                    type="text"
                    bind:value={customWeatherCityName}
                    placeholder={t(plugin, "widgets.weather.cityNamePlaceholder")}
                />
            </div>
        </div>
        <div class="setting-item">
            <div class="form-group">
                <label for="weather-city">{t(plugin, "widgets.weather.cityCode")}</label>
                <input
                    id="weather-city"
                    type="text"
                    bind:value={customWeatherCityCode}
                    placeholder={t(plugin, "widgets.weather.cityCodePlaceholder")}
                />
            </div>
        </div>
        <div class="setting-item">
            {t(plugin, "widgets.weather.cityCodeHint")}
        </div>
    {/if}

    <div class="component-help">
        <hr />
        <div>
            {t(plugin, "common.componentDescription")}<a
                href={tutorial.url}
                target="_blank">{tutorial.label}</a
            >
        </div>
    </div>
</div>

<style lang="scss">
</style>
