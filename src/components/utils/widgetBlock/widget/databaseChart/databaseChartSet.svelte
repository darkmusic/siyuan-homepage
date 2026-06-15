<script lang="ts">
    import { pluginT as t } from "@/libs/i18n";
    import { getTutorialLink } from "@/data/tutorialLinks";

    export let plugin: any;
    export let advancedEnabled: boolean;
    export let databaseChartID: string = "";
    export let databaseChartTitle: string = "";
    export let databaseChartType: string = "line";
    export let databaseChartLineType: string = "XY";
    export let databaseChartLineXAxisSource: string = "";
    export let databaseChartLineXAxisTitle: string = "";
    export let databaseChartLineYAxisSource: string[] = [];
    export let databaseChartLineYAxisTitle: string = "";
    export let databaseChartLineCountColumn: string = "";
    export let databaseChartLineCountXAxisTitle: string = "";
    export let databaseChartLineCountYAxisTitle: string = "";
    export let databaseChartLineSmooth: boolean = false;
    export let databaseChartLineWidth: number = 2;
    export let databaseChartLineStyle: string = "solid";
    export let databaseChartLineMarkPoint: string = "circle";
    export let databaseChartLineMarkPointSize: number = 8;
    export let databaseChartLineCountSort: string = "none";

    let databaseChartInfo: any[] = [];
    let confirmDatabaseChartID: boolean = false;

    const tutorial = getTutorialLink("widgets.databaseChart");

    async function getDatabase() {
        if (!databaseChartID) return;
        try {
            const response = await fetch(
                "/api/av/getAttributeView",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Token ${plugin?.app?.api?.token}`,
                    },
                    body: JSON.stringify({
                        id: databaseChartID,
                    }),
                }
            );
            const data = await response.json();
            if (data.code === 0) {
                databaseChartInfo = data.data.keyValues || [];
                confirmDatabaseChartID = true;
            } else {
                confirmDatabaseChartID = false;
            }
        } catch (error) {
            confirmDatabaseChartID = false;
        }
    }

    $: if (databaseChartID) {
        getDatabase();
    }
</script>

{#if advancedEnabled}
    <div class="content-panel databaseChart">
        <div class="form-group">
            <label for="">{t(plugin, "widgets.databaseChart.id")}</label>
            <input
                type="text"
                placeholder={t(plugin, "widgets.databaseChart.idPlaceholder")}
                bind:value={databaseChartID}
            />
        </div>
        {#if confirmDatabaseChartID}
            <div class="form-group">
                <label for="">{t(plugin, "widgets.databaseChart.chartType")}</label>
                <select bind:value={databaseChartType}>
                    <option value="line">{t(plugin, "widgets.databaseChart.line")}</option>
                    <option value="bar">{t(plugin, "widgets.databaseChart.bar")}</option>
                    <option value="pie">{t(plugin, "widgets.databaseChart.pie")}</option>
                    <option value="point">{t(plugin, "widgets.databaseChart.scatter")}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="">{t(plugin, "widgets.databaseChart.chartTitle")}</label>
                <input
                    type="text"
                    placeholder={t(plugin, "widgets.databaseChart.chartTitlePlaceholder")}
                    bind:value={databaseChartTitle}
                />
            </div>
            {#if databaseChartType === "line"}
                <div class="database-chart-line-config">
                    <div class="form-group">
                        <label for="">{t(plugin, "widgets.databaseChart.dataType")}</label>
                        <select bind:value={databaseChartLineType}>
                            <option value="XY">{t(plugin, "widgets.databaseChart.xyAxis")}</option>
                            <option value="count">{t(plugin, "widgets.databaseChart.countType")}</option>
                        </select>
                    </div>
                    {#if databaseChartLineType === "XY"}
                        <div class="database-chart-line-XY">
                            <div class="database-chart-x-axis">
                                <label for="">
                                    {t(plugin, "widgets.databaseChart.xSource")}
                                    <select
                                        bind:value={
                                            databaseChartLineXAxisSource
                                        }
                                    >
                                        {#each databaseChartInfo as column}
                                            {#if column.type === "block" || column.type === "text" || column.type === "number" || column.type === "date" || column.type === "select" || column.type === "url" || column.type === "email" || column.type === "phone"}
                                                <option
                                                    value={column.id}
                                                >
                                                    {column.name}
                                                    ({column.type})
                                                </option>
                                            {/if}
                                        {/each}
                                    </select>
                                </label>
                                <label for="">{t(plugin, "widgets.databaseChart.xAxisTitle")}</label>
                                <input
                                    type="text"
                                    placeholder={t(plugin, "widgets.databaseChart.xTitlePlaceholder")}
                                    bind:value={
                                        databaseChartLineXAxisTitle
                                    }
                                />
                            </div>
                            <div class="database-chart-y-axis">
                                <label for="">
                                    {t(plugin, "widgets.databaseChart.ySourceMulti")}
                                    <div
                                        class="multi-select-wrapper"
                                    >
                                        <select
                                            multiple
                                            bind:value={
                                                databaseChartLineYAxisSource
                                            }
                                            size="2.5"
                                            class="collapsed-multiselect"
                                        >
                                            {#each databaseChartInfo as column}
                                                {#if column.type === "number"}
                                                    <option
                                                        value={column.id}
                                                    >
                                                        {column.name}
                                                        ({column.type})
                                                    </option>
                                                {/if}
                                            {/each}
                                        </select>
                                    </div>
                                </label>
                                <label for="">{t(plugin, "widgets.databaseChart.yAxisTitle")}</label>
                                <input
                                    type="text"
                                    placeholder={t(plugin, "widgets.databaseChart.yTitlePlaceholder")}
                                    bind:value={
                                        databaseChartLineYAxisTitle
                                    }
                                />
                            </div>
                        </div>
                    {:else if databaseChartLineType === "count"}
                        <div class="database-chart-count">
                            <label for=""
                                >{t(plugin, "widgets.databaseChart.countColumn")}
                                <select
                                    bind:value={
                                        databaseChartLineCountColumn
                                    }
                                >
                                    {#each databaseChartInfo as column}
                                        {#if column.type === "block" || column.type === "text" || column.type === "number" || column.type === "date" || column.type === "select" || column.type === "url" || column.type === "email" || column.type === "phone"}
                                            <option
                                                value={column.id}
                                            >
                                                {column.name}
                                                ({column.type})
                                            </option>
                                        {/if}
                                    {/each}
                                </select>
                            </label>
                            <div
                                class="database-chart-count-axis"
                            >
                                <label for="">{t(plugin, "widgets.databaseChart.xAxisTitle")} </label>
                                <input
                                    type="text"
                                    bind:value={
                                        databaseChartLineCountXAxisTitle
                                    }
                                />
                                <label for="">{t(plugin, "widgets.databaseChart.yAxisTitle")} </label>
                                <input
                                    type="text"
                                    bind:value={
                                        databaseChartLineCountYAxisTitle
                                    }
                                />
                            </div>
                        </div>
                    {/if}
                    <div class="line-chart-style">
                        <div class="line-chart-style-item">
                            <label for=""
                                >{t(plugin, "widgets.databaseChart.smooth")}<input
                                    type="checkbox"
                                    bind:checked={
                                        databaseChartLineSmooth
                                    }
                                /></label
                            >
                            <label for=""
                                >{t(plugin, "widgets.databaseChart.lineWidth")}
                                <input
                                    type="number"
                                    bind:value={
                                        databaseChartLineWidth
                                    }
                                />
                            </label>
                            <label for=""
                                >{t(plugin, "widgets.databaseChart.lineStyle")}
                                <select
                                    bind:value={
                                        databaseChartLineStyle
                                    }
                                >
                                    <option value="solid"
                                        >{t(plugin, "widgets.databaseChart.solid")}</option
                                    >
                                    <option value="dashed"
                                        >{t(plugin, "widgets.databaseChart.dashed")}</option
                                    >
                                    <option value="dotted"
                                        >{t(plugin, "widgets.databaseChart.dotted")}</option
                                    >
                                </select>
                            </label>
                        </div>

                        <div class="line-chart-style-item">
                            <label for=""
                                >{t(plugin, "widgets.databaseChart.markPoint")}
                                <select
                                    bind:value={
                                        databaseChartLineMarkPoint
                                    }
                                >
                                    <option value="circle"
                                        >{t(plugin, "widgets.databaseChart.markCircle")}</option
                                    >
                                    <option value="rect"
                                        >{t(plugin, "widgets.databaseChart.markRect")}</option
                                    >
                                    <option value="roundRect"
                                        >{t(plugin, "widgets.databaseChart.markRoundRect")}</option
                                    >
                                    <option value="triangle"
                                        >{t(plugin, "widgets.databaseChart.markTriangle")}</option
                                    >
                                    <option value="diamond"
                                        >{t(plugin, "widgets.databaseChart.markDiamond")}</option
                                    >
                                    <option value="pin"
                                        >{t(plugin, "widgets.databaseChart.markPin")}</option
                                    >
                                    <option value="arrow"
                                        >{t(plugin, "widgets.databaseChart.markArrow")}</option
                                    >
                                    <option value="none"
                                        >{t(plugin, "widgets.databaseChart.markNone")}</option
                                    >
                                </select>
                            </label>
                            <label for=""
                                >{t(plugin, "widgets.databaseChart.markPointSize")}
                                <input
                                    type="number"
                                    bind:value={
                                        databaseChartLineMarkPointSize
                                    }
                                />
                            </label>
                        </div>
                        <label for=""
                            >{t(plugin, "widgets.databaseChart.sortMode")}
                            <select
                                bind:value={
                                    databaseChartLineCountSort
                                }
                            >
                                <option value="none">{t(plugin, "common.none")}</option>
                                <option value="asc">{t(plugin, "widgets.databaseChart.asc")}</option
                                >
                                <option value="desc"
                                    >{t(plugin, "widgets.databaseChart.desc")}</option
                                >
                            </select>
                        </label>
                    </div>
                </div>
            {:else if databaseChartType === "bar"}
                <div>
                    {t(plugin, "common.inDevelopment")}
                </div>
            {:else if databaseChartType === "pie"}
                <div>
                    {t(plugin, "common.inDevelopment")}
                </div>
            {:else if databaseChartType === "point"}
                <div>{t(plugin, "common.inDevelopment")}</div>
            {/if}
        {/if}
    </div>
{:else}
    <h3>{t(plugin, "common.vipBenefitTitle")}</h3>
{/if}
<hr>
<div>{t(plugin, "common.componentDescription")}<a href={tutorial.url} target="_blank">{tutorial.label}</a></div>
<p>{t(plugin, "widgets.databaseChart.inDev")}</p>

<style lang="scss">
    .content-panel.databaseChart {
        .form-group {
            margin-bottom: 15px;
            
            label {
                display: inline-block;
                margin-bottom: 5px;
                font-weight: 500;
            }
            
            input[type="text"],
            input[type="number"],
            select {
                width: 100%;
                padding: 8px 12px;
                border: 1px solid var(--b3-border-color);
                border-radius: 4px;
                background-color: var(--b3-theme-background);
                color: var(--b3-theme-on-background);
                
                &:focus {
                    outline: none;
                    border-color: var(--b3-theme-primary);
                }
            }
            
            select[multiple] {
                height: auto;
                min-height: 80px;
            }
            
            .multi-select-wrapper {
                position: relative;
                
                select.collapsed-multiselect {
                    height: 38px;
                    overflow: hidden;
                    
                    &:focus {
                        height: auto;
                        min-height: 80px;
                        overflow: visible;
                    }
                }
            }
        }
        
        .database-chart-line-config,
        .database-chart-line-XY,
        .database-chart-count {
            margin-top: 15px;
            padding: 15px;
            border: 1px solid var(--b3-border-color);
            border-radius: 6px;
            background-color: var(--b3-theme-surface);
            
            .database-chart-x-axis,
            .database-chart-y-axis {
                margin-bottom: 15px;
                
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
        
        .line-chart-style {
            margin-top: 15px;
            padding: 15px;
            border: 1px solid var(--b3-border-color);
            border-radius: 6px;
            background-color: var(--b3-theme-surface);
            
            .line-chart-style-item {
                display: flex;
                gap: 15px;
                margin-bottom: 10px;
                
                &:last-child {
                    margin-bottom: 0;
                }
                
                label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    
                    input[type="checkbox"] {
                        margin: 0;
                    }
                    
                    input[type="number"] {
                        width: 80px;
                    }
                    
                    select {
                        width: auto;
                        min-width: 100px;
                    }
                }
            }
            
            > label {
                display: flex;
                align-items: center;
                gap: 8px;
                
                select {
                    width: auto;
                    min-width: 120px;
                }
            }
        }
    }
    
    @media (max-width: 768px) {
        .content-panel.databaseChart {
            .line-chart-style-item {
                flex-direction: column;
                gap: 10px;
            }
        }
    }
</style>