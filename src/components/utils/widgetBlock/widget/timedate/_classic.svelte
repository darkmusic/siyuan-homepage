<script lang="ts">
    import { onMount } from "svelte";
    import { getImage } from "@/components/tools/getImage";
    import { SolarDay, LunarDay, EarthBranch } from "tyme4ts";
    import { pluginT as t, getIntlLocale } from "@/libs/i18n";

    export let contentTypeJson: string = "{}";
    export let plugin: any;

    // 时间相关状态
    let currentTime = new Date();
    let timeOfDay = "afternoon";

    // 初始化时间段
    const initTimeOfDay = () => {
        const hour = currentTime.getHours();
        if (hour >= 6 && hour < 12) {
            timeOfDay = "morning";
        } else if (hour >= 12 && hour < 18) {
            timeOfDay = "afternoon";
        } else {
            timeOfDay = "night";
        }
    };
    let timedateFontSize = 2;

    // 设置项默认值
    let showSeconds: boolean = true;
    let dateFormat: string = "YYYY-MM-DD";
    let showLunar: boolean = true;
    let showZodiac: boolean = true;
    let showSolarTerm: boolean = true;
    let showWeek: boolean = true;
    let showDate: boolean = true;

    // 更新时间段（早/中/晚）
    const updateTimeOfDay = () => {
        const hour = currentTime.getHours();
        let newTimeOfDay = "afternoon";

        if (hour >= 6 && hour < 12) {
            newTimeOfDay = "morning";
        } else if (hour >= 12 && hour < 18) {
            newTimeOfDay = "afternoon";
        } else {
            newTimeOfDay = "night";
        }

        timeOfDay = newTimeOfDay;
    };

    // 根据当前时间更新显示内容
    const updateTime = () => {
        currentTime = new Date();
        updateTimeOfDay();
        currentDateStr = formatDateString(currentTime);
    };

    let year = "";
    let month = "";
    let day = "";
    let weekDisplay = "";

    function formatWithSeparator(date: Date, separator: string): string {
        const parts = new Intl.DateTimeFormat(getIntlLocale(), {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).formatToParts(date);
        const y = parts.find((p) => p.type === "year")?.value ?? "";
        const m = parts.find((p) => p.type === "month")?.value ?? "";
        const d = parts.find((p) => p.type === "day")?.value ?? "";
        return `${y}${separator}${m}${separator}${d}`;
    }

    // 日期格式化函数
    const formatDateString = (date: Date): string => {
        year = date.getFullYear().toString();
        month = String(date.getMonth() + 1).padStart(2, "0");
        day = String(date.getDate()).padStart(2, "0");

        switch (dateFormat) {
            case "YYYY年MM月DD日":
                return t(plugin, "common.dateFormatDisplay", { year, month, day });
            case "YYYY-MM-DD":
                return formatWithSeparator(date, "-");
            case "YYYY/MM/DD":
                return formatWithSeparator(date, "/");
            case "YYYY.MM.DD":
                return formatWithSeparator(date, ".");
            default:
                return new Intl.DateTimeFormat(getIntlLocale()).format(date);
        }
    };

    let lunarDayStr = "";
    let zodiac = ""; // 生肖
    let lunarZodiacIcon = ""; // 生肖图标
    let solarTerm = ""; // 节气
    // 获取农历等信息
    const updateDateAndLunar = () => {
        try {
            // 使用当前时间创建公历日期
            const solarDay: SolarDay = SolarDay.fromYmd(
                Number(year),
                Number(month),
                Number(day),
            );
            const lunarDay: LunarDay = solarDay.getLunarDay(); // 获取农历日期

            lunarDayStr = lunarDay.toString().replace("农历", ""); // 转换为中文格式

            const weekDays = t(plugin, "common.weekdays").split(",");
            weekDisplay = t(plugin, "widgets.timedate.weekDisplay", {
                day: weekDays[currentTime.getDay()],
            });

            // 获取生肖（从lunarDayStr中提取地支）
            const earthBranchName = lunarDayStr.charAt(1);
            const earthBranch = EarthBranch.fromName(earthBranchName);
            zodiac = earthBranch.getZodiac().getName();
            // 生肖图标映射
            const zodiacIcons: Record<string, string> = {
                鼠: "🐭",
                牛: "🐮",
                虎: "🐯",
                兔: "🐰",
                龙: "🐉",
                蛇: "🐍",
                马: "🐴",
                羊: "🐑",
                猴: "🐵",
                鸡: "🐔",
                狗: "🐶",
                猪: "🐷",
            };
            // 获取生肖图标
            lunarZodiacIcon = zodiacIcons[zodiac] || "";

            // 获取节气
            solarTerm = solarDay.getTerm().getName() || "";
        } catch (error) {
            console.error("获取农历失败:", error);
            lunarDayStr = "";
            weekDisplay = "";
            zodiac = "";
            lunarZodiacIcon = "";
            solarTerm = "";
        }
    };

    // 当前日期字符串（根据格式变化）
    let currentDateStr = formatDateString(currentTime);

    // 获取今天零点的时间戳
    const getMidnightTimestamp = (): number => {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0); // 设置为明天零点
        return midnight.getTime();
    };

    let morningImageType = "remote";
    let afternoonImageType = "remote";
    let nightImageType = "remote";

    let morningBgUrl: string =
        "https://haowallpaper.com/link/common/file/previewFileImg/16637944029171072";
    let afternoonBgUrl: string =
        "https://haowallpaper.com/link/common/file/previewFileImg/16989237330693504";
    let nightBgUrl: string =
        "https://haowallpaper.com/link/common/file/previewFileImg/15477811848581440";

    let morningBgImage: string = "";
    let afternoonBgImage: string = "";
    let nightBgImage: string = "";

    onMount(() => {
        if (contentTypeJson) {
            try {
                const config = JSON.parse(contentTypeJson);
                if (config.type === "timedate" && config.data) {
                    // 时钟组件经典样式相关变量
                    showSeconds = config.data.showSeconds ?? true;
                    dateFormat = config.data.dateFormat ?? "YYYY-MM-DD";
                    showLunar = config.data.showLunar ?? true;
                    showZodiac = config.data.showZodiac ?? true;
                    showSolarTerm = config.data.showSolarTerm ?? true;
                    showWeek = config.data.showWeek ?? true;
                    showDate = config.data.showDate ?? true;

                    morningImageType =
                        config.data.morningImageType || morningImageType;
                    afternoonImageType =
                        config.data.afternoonImageType || afternoonImageType;
                    nightImageType =
                        config.data.nightImageType || nightImageType;

                    morningBgUrl = config.data.morningBgUrl || morningBgUrl;
                    afternoonBgUrl =
                        config.data.afternoonBgUrl || afternoonBgUrl;
                    nightBgUrl = config.data.nightBgUrl || nightBgUrl;

                    // 保留本地图片设置
                    morningBgImage =
                        config.data.morningBgImage || morningBgImage;
                    afternoonBgImage =
                        config.data.afternoonBgImage || afternoonBgImage;
                    nightBgImage = config.data.nightBgImage || nightBgImage;

                    timedateFontSize =
                        config.data.timedateFontSize || timedateFontSize;
                }
            } catch (e) {
                console.warn("无法解析 contentTypeJson", e);
            }
        }
        initTimeOfDay(); // 初始化时间段
        loadImageForTimeOfDay();
        updateTime();
        updateDateAndLunar();

        const intervalId = setInterval(updateTime, 50);
        const timeUntilMidnight = getMidnightTimestamp() - Date.now();
        const tomorrowUpdateTimeout = setTimeout(() => {
            updateDateAndLunar();
            setInterval(updateDateAndLunar, 24 * 60 * 60 * 1000);
        }, timeUntilMidnight);

        return () => {
            clearInterval(intervalId);
            clearTimeout(tomorrowUpdateTimeout);
        };
    });

    async function loadImageForTimeOfDay() {
        if (
            !window.navigator.userAgent.includes("Electron") ||
            typeof window.require !== "function"
        ) {
            if (morningImageType === "remote") {
                morningBgUrl = await getImage(morningBgUrl);
            }

            if (afternoonImageType === "remote") {
                afternoonBgUrl = await getImage(afternoonBgUrl);
            }

            if (nightImageType === "remote") {
                nightBgUrl = await getImage(nightBgUrl);
            }
        }
    }
</script>

<div
    class="content-display-classic"
    class:morning={timeOfDay === "morning"}
    class:afternoon={timeOfDay === "afternoon"}
    class:night={timeOfDay === "night"}
    style="
        background-image: url({timeOfDay === 'morning'
            ? morningImageType === 'remote'
                ? morningBgUrl
                : morningBgImage
            : timeOfDay === 'afternoon'
              ? afternoonImageType === 'remote'
                  ? afternoonBgUrl
                  : afternoonBgImage
              : nightImageType === 'remote'
                ? nightBgUrl
                : nightBgImage});
    "
>
    <!-- 时间 -->
    <div class="time-line">
        <span
            class="time text-overlay"
            style="font-size: {timedateFontSize}rem;"
        >
            {new Intl.DateTimeFormat(getIntlLocale(), {
                hour: "2-digit",
                minute: "2-digit",
                second: showSeconds ? "2-digit" : undefined,
                hour12: false,
            }).format(currentTime)}
        </span>
    </div>

    <!-- 日期 -->
    {#if showDate}
        <div class="date-line">
            <span
                class="date text-overlay"
                style="font-size: {timedateFontSize / 2}rem;"
                >{currentDateStr}</span
            >
        </div>
    {/if}

    <!-- 星期 + 工作日状态 -->
    {#if showWeek}
        <div class="week-day-line">
            <span
                class="day-status text-overlay"
                style="font-size: {timedateFontSize / 2}rem;"
            >
                {weekDisplay}
            </span>
        </div>
    {/if}

    <!-- 农历 -->
    {#if showLunar}
        <div class="lunar-line">
            <span
                class="lunar text-overlay"
                style="font-size: {timedateFontSize / 2}rem;"
                >{lunarDayStr}</span
            >
        </div>
    {/if}

    <!-- 生肖 -->
    {#if showZodiac}
        <div class="zodiac-line">
            <span
                class="zodiac text-overlay"
                style="font-size: {timedateFontSize / 2}rem;"
                >{zodiac}{lunarZodiacIcon}</span
            >
        </div>
    {/if}

    <!-- 节气 -->
    {#if showSolarTerm}
        <div class="solar-term-line">
            <span
                class="text-overlay"
                style="font-size: {timedateFontSize / 2}rem;"
                >{solarTerm}</span
            >
        </div>
    {/if}
</div>

<style lang="scss">
    .content-display-classic {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 16px;
        padding: 0.5rem;
        box-sizing: border-box;
        text-align: center;
        word-wrap: break-word;
        word-break: break-all;
        white-space: normal;
        position: relative;
        max-width: 100%;
        max-height: 100%;

        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-blend-mode: overlay;

        .text-overlay {
            background-color: color-mix(
                in srgb,
                var(--b3-theme-surface) 70%,
                transparent
            );
            padding: 0 0.5rem;
            border-radius: 8px;
            display: inline-block;
            margin: 0.3rem 0;
        }

        .content-display .time,
        .content-display .date,
        .content-display .day-status,
        .content-display .lunar,
        .content-display .zodiac,
        .content-display .solar-term-line span {
            transition: color 0.5s ease-in-out;
        }

        .time-line,
        .date-line,
        .week-day-line,
        .lunar-line,
        .zodiac-line,
        .solar-term-line {
            display: flex;
            align-items: center;
            opacity: 0.95;
            transition:
                transform 0.2s ease,
                opacity 0.3s ease;
            flex-wrap: wrap;
            justify-content: center;
            text-align: center;
            width: 100%;
            padding: 0 0.5rem;
            box-sizing: border-box;
        }

        @keyframes pulse {
            0% {
                opacity: 0.6;
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0.6;
            }
        }

        .time {
            font-weight: bold;
            letter-spacing: 1px;
            word-wrap: break-word;
            word-break: break-all;
            white-space: normal;
            max-width: 100%;
        }

        .date,
        .day-status,
        .lunar,
        .zodiac,
        .solar-term-line span {
            word-wrap: break-word;
            word-break: break-all;
            white-space: normal;
            max-width: 100%;
        }
    }
</style>