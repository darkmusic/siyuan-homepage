<script lang="ts">
    import { pluginT as t } from "@/libs/i18n";
    import {
        getSolarDay,
        getLunarDay,
        getLunarSeason,
        getSolarTerm,
        getZodiac,
        getPhase,
        getConstellation,
        getSixtyCycle,
        getJulianDay,
        getThreePhenology,
        getDogDay,
        getThreePillars,
        getSixStar,
        getMinorRen,
        getSevenStar,
        getEightChar,
        getNineStar,
        getDipper,
        getNineDay,
        getDuty,
        getPhenologyDay,
        getHideHeavenStemDay,
        getPengZu,
        getTwenty,
        getSixty,
        getTen,
        getPlumRainDay,
        getFetusMonth,
        getFetusDay,
        getKitchenGodSteed,
        getTaboo,
        getGod,
    } from "@/components/tools/calendarCalculation";

    export let plugin: any;

    const solarDay = getSolarDay();
    const lunarDay = getLunarDay();
    const lunarSeason = getLunarSeason();
    const solarTerm = getSolarTerm();
    const zodiac = getZodiac();
    const phase = getPhase();
    const constellation = getConstellation();
    const sixtyCycle = getSixtyCycle();
    const julianDay = getJulianDay();
    const threePhenology = getThreePhenology();
    const dogDay = getDogDay();
    const threePillars = getThreePillars();
    const sixStar = getSixStar();
    const sixteenStar = getMinorRen();
    const sevenStar = getSevenStar();
    const eightChar = getEightChar();
    const nineStar = getNineStar();
    const dipper = getDipper();
    const nineDay = getNineDay();
    const duty = getDuty();
    const phenologyDay = getPhenologyDay();
    const hideHeavenStemDay = getHideHeavenStemDay();
    const pengZu = getPengZu();
    const twenty = getTwenty();
    const sixty = getSixty();
    const ten = getTen();
    const plumRainDay = getPlumRainDay();
    const fetusMonth = getFetusMonth();
    const fetusDay = getFetusDay();
    const kitchenGodSteed = getKitchenGodSteed();
    const taboo = getTaboo();
    const god = getGod();

    const notYet = t(plugin, "widgets.calendar.notYet");

    function showOrNotYet(value: string): string {
        return value || notYet;
    }
</script>

<div class="content-display-classic">
    <table>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.solarDate")}</td>
            <td colspan="2"
                >{solarDay.yearCN}年{solarDay.monthCN}月{solarDay.dayCN}日</td
            >
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.lunarDate")}</td>
            <td colspan="2">{lunarDay.lunarDateStr}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.ganzhiDate")}</td>
            <td colspan="2">
                {sixtyCycle.sixtyCycleYearStr}
                {sixtyCycle.sixtyCycleMonthStr}
                {sixtyCycle.sixtyCycleDayStr}
                {sixtyCycle.sixtyCycleTimeStr}
            </td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.solarTerm")}</td>
            <td>{solarTerm.termStr}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.lunarSeason")}</td>
            <td>{lunarSeason.lunarSeasonStr}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.zodiac")}</td>
            <td>{zodiac.zodiac}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.constellation")}</td>
            <td>{constellation.constellationStr}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.moonPhase")}</td>
            <td>{phase.lunarPhaseStr}</td></tr
        >
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.dogDays")}</td>
            <td>{showOrNotYet(dogDay.dogDayStr)}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.plumRain")}</td>
            <td>{showOrNotYet(plumRainDay.plumRainDayStr)}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.nineColdDays")}</td>
            <td>{showOrNotYet(nineDay.nineDayStr)}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.julianDay")}</td>
            <td>{julianDay.julianDayStr}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.threePhenology")}</td>
            <td>{threePhenology.threePhenologyStr}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.threePillars")}</td>
            <td>{threePillars.threePillarsStr}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.sixYao")}</td>
            <td>{sixStar.sixStarStr}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.sevenLuminaries")}</td>
            <td>{sevenStar.sevenStarStr}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.smallLiuRen")}</td>
            <td>{sixteenStar.sixteenStarStr}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.eightCharacters")}</td>
            <td>{eightChar.eightCharStr}</td>
        </tr>
        <tr>
            <td rowspan="4">{t(plugin, "widgets.almanac.labels.nineStars")}</td>
            <td style="color: black;">{t(plugin, "widgets.almanac.labels.year")}</td>
            <td>{nineStar.nineStarYearStr} </td>
        </tr>
        <tr>
            <td>{t(plugin, "widgets.almanac.labels.month")}</td>
            <td> {nineStar.nineStarMonthStr}</td>
        </tr>
        <tr>
            <td>{t(plugin, "widgets.almanac.labels.day")}</td>
            <td> {nineStar.nineStarDayStr}</td>
        </tr>
        <tr>
            <td>{t(plugin, "widgets.almanac.labels.hour")}</td>
            <td> {nineStar.nineStarHourStr}</td>
        </tr>
        <tr>
            <td rowspan="4">{t(plugin, "widgets.almanac.labels.beidouNineStars")}</td>
            <td style="color: black;">{t(plugin, "widgets.almanac.labels.year")}</td>
            <td>{dipper.dipperYearStr}</td>
        </tr>
        <tr>
            <td>{t(plugin, "widgets.almanac.labels.month")}</td>
            <td> {dipper.dipperMonthStr}</td>
        </tr>
        <tr>
            <td>{t(plugin, "widgets.almanac.labels.day")}</td>
            <td> {dipper.dipperDayStr}</td>
        </tr>
        <tr>
            <td>{t(plugin, "widgets.almanac.labels.hour")}</td>
            <td> {dipper.dipperHourStr}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.monthlyFetalGod")}</td>
            <td>{fetusMonth.fetusMonthStr}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.dailyFetalGod")}</td>
            <td colspan="2">{fetusDay.fetusDayStr}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.twelveDutyGods")}</td>
            <td>{duty.dutyStr}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.seventyTwoPhenology")}</td>
            <td>{phenologyDay.phenologyDayStr}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.humanElementCommander")}</td>
            <td>{hideHeavenStemDay.hideHeavenStemDayStr}</td>
        </tr>
        <tr>
            <td rowspan="2">{t(plugin, "widgets.almanac.labels.pengZuTaboo")}</td>
            <td style="color: black;">{t(plugin, "widgets.almanac.labels.dailyTaboo")}</td>
            <td>{pengZu.pengZuDayStr}</td>
        </tr>
        <tr>
            <td>{t(plugin, "widgets.almanac.labels.hourlyTaboo")}</td>
            <td>{pengZu.pengZuTimeStr}</td>
        </tr>
        <tr>
            <td rowspan="14" colspan="2">{t(plugin, "widgets.almanac.labels.stoveHorseHead")}</td>
            <td>{kitchenGodSteed.mouse}</td>
        </tr>
        <tr>
            <td>{kitchenGodSteed.grass}</td>
        </tr>
        <tr>
            <td>{kitchenGodSteed.cattle}</td>
        </tr>
        <tr>
            <td>{kitchenGodSteed.flower}</td>
        </tr>
        <tr>
            <td>{kitchenGodSteed.dragon}</td>
        </tr>
        <tr>
            <td>{kitchenGodSteed.horse}</td>
        </tr>
        <tr>
            <td>{kitchenGodSteed.chicken}</td>
        </tr>
        <tr>
            <td>{kitchenGodSteed.silkworm}</td>
        </tr>
        <tr>
            <td>{kitchenGodSteed.pig}</td>
        </tr>
        <tr>
            <td>{kitchenGodSteed.field}</td>
        </tr>
        <tr>
            <td>{kitchenGodSteed.cake}</td>
        </tr>
        <tr>
            <td>{kitchenGodSteed.gold}</td>
        </tr>
        <tr>
            <td>{kitchenGodSteed.peopleCakes}</td>
        </tr>
        <tr>
            <td>{kitchenGodSteed.peopleHoes}</td>
        </tr>
        <tr>
            <td rowspan="4">{t(plugin, "widgets.almanac.labels.yiJi")}</td>
            <td style="color: black;">{t(plugin, "widgets.almanac.labels.dailyYi")}</td>
            <td colspan="2">{taboo.taboosDayStr}</td>
        </tr>
        <tr>
            <td>{t(plugin, "widgets.almanac.labels.dailyJi")}</td>
            <td colspan="2">{taboo.taboosDay2Str}</td>
        </tr>
        <tr>
            <td>{t(plugin, "widgets.almanac.labels.hourlyYi")}</td>
            <td colspan="2">{taboo.taboosHourStr}</td>
        </tr>
        <tr>
            <td>{t(plugin, "widgets.almanac.labels.hourlyJi")}</td>
            <td colspan="2">{taboo.taboosHour2Str}</td>
        </tr>
        <tr>
            <td rowspan="2">{t(plugin, "widgets.almanac.labels.spirits")}</td>
            <td style="color: black;">{t(plugin, "widgets.almanac.labels.auspiciousSpirits")}</td>
            <td colspan="2">{god.goodGodsStr}</td>
        </tr>
        <tr>
            <td>{t(plugin, "widgets.almanac.labels.inauspiciousSpirits")}</td>
            <td colspan="2">{god.badGodsStr}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.fortune")}</td>
            <td>{twenty.twentyStr}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.yuan")}</td>
            <td>{sixty.sixtyStr}</td>
        </tr>
        <tr>
            <td colspan="2">{t(plugin, "widgets.almanac.labels.xun")}</td>
            <td>{ten.tenStr}</td>
        </tr>
    </table>
</div>

<style lang="scss">
    .content-display-classic {
        width: calc(100% - 1rem);
        height: 100%;
        padding: 1rem;
        overflow: auto;

        table {
            width: 100%;
            border-collapse: collapse;
        }

        td {
            font-weight: 600;
            border: 1.5px solid #000;
            padding: 0.5rem;
            text-align: center;
        }

        td:nth-child(2),
        td:nth-child(3) {
            color: var(--b3-theme-primary);
        }
    }
</style>
