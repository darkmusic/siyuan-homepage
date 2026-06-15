<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { pluginT as t } from "@/libs/i18n";

    export let plugin: any;
    export let hours: number = 0;
    export let minutes: number = 0;
    export let seconds: number = 0;
    export let beforeCountdown: boolean;

    let advancedEnabled = false;
    let timeRemaining: number; // 剩余时间（秒）
    let isRunning: boolean = false;
    let isPaused: boolean = false;
    let interval: number | null = null;

    // 计算总秒数
    $: totalSeconds = hours * 3600 + minutes * 60 + seconds;
    $: timeRemaining = totalSeconds;

    // 格式化显示时间
    $: displayHours = Math.floor(timeRemaining / 3600);
    $: displayMinutes = Math.floor((timeRemaining % 3600) / 60);
    $: displaySeconds = timeRemaining % 60;

    // 开始倒计时
    function startCountdown() {
        if (timeRemaining <= 0) return;

        isRunning = true;
        isPaused = false;

        interval = window.setInterval(() => {
            if (timeRemaining > 0 && !isPaused) {
                timeRemaining--;
            } else if (timeRemaining <= 0) {
                // 倒计时结束
                stopCountdown();
                // 可以添加提示音或其他结束提示
            }
        }, 1000);
    }

    // 暂停/继续
    function togglePause() {
        isPaused = !isPaused;
    }

    // 停止倒计时并返回起始页面
    function stopCountdown() {
        isRunning = false;
        isPaused = false;
        beforeCountdown = false;
        timeRemaining = totalSeconds;

        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    onMount(() => {
        advancedEnabled = plugin.ADVANCED;
        startCountdown(); // 组件挂载时自动开始倒计时
    });

    onDestroy(() => {
        if (interval) {
            clearInterval(interval);
        }
    });
</script>

<div class="content-display-default">
    {#if advancedEnabled}
        <div class="countdown-header">
            <div class="countdown-item">
                <span class="time-number"
                    >{displayHours.toString().padStart(2, "0")}</span
                >
                <span class="time-label">{t(plugin, "widgets.countdownTimer.hourUnit")}</span>
            </div>
            <div class="countdown-separator">:</div>
            <div class="countdown-item">
                <span class="time-number"
                    >{displayMinutes.toString().padStart(2, "0")}</span
                >
                <span class="time-label">{t(plugin, "widgets.countdownTimer.minuteUnit")}</span>
            </div>
            <div class="countdown-separator">:</div>
            <div class="countdown-item">
                <span class="time-number"
                    >{displaySeconds.toString().padStart(2, "0")}</span
                >
                <span class="time-label">{t(plugin, "widgets.countdownTimer.secondUnit")}</span>
            </div>
        </div>

        <div class="countdown-controls">
            <button
                class="control-button pause-button"
                on:click={togglePause}
                disabled={!isRunning}
            >
                <i class="fas {isPaused ? 'fa-play' : 'fa-pause'}"></i>
            </button>
            <button class="control-button stop-button" on:click={stopCountdown}>
                <i class="fas fa-stop"></i>
            </button>
        </div>
    {:else}
        <div class="content-not-advanced">
            <h2>{t(plugin, "common.vipFeatureTitle")}</h2>
            <h3>{t(plugin, "common.vipFeatureHint")}</h3>
        </div>
    {/if}
</div>

<style lang="scss">
    .content-display-default {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;

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

        .countdown-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-family: "Courier New", monospace;

            .countdown-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.25rem;

                .time-number {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: var(--b3-theme-primary);
                    line-height: 1;
                }

                .time-label {
                    font-size: 0.75rem;
                    color: var(--b3-theme-on-surface-light);
                    font-weight: 500;
                }
            }

            .countdown-separator {
                font-size: 2rem;
                font-weight: 600;
                color: var(--b3-theme-primary);
                margin: 0 0.25rem;
                align-self: flex-start;
                padding-top: 0.5rem;
            }
        }

        .countdown-controls {
            display: flex;
            gap: 1rem;

            .control-button {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.6rem 1rem;
                border: none;
                border-radius: 6px;
                font-size: 0.875rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;

                i {
                    font-size: 0.75rem;
                }

                &.pause-button {
                    background: var(--b3-theme-secondary);
                    color: white;
                    box-shadow: 0 2px 8px
                        rgba(var(--b3-theme-secondary-rgb), 0.3);

                    &:hover:not(:disabled) {
                        transform: translateY(-1px);
                        box-shadow: 0 4px 12px
                            rgba(var(--b3-theme-secondary-rgb), 0.4);
                    }

                    &:disabled {
                        background: var(--b3-theme-on-surface-light);
                        cursor: not-allowed;
                        box-shadow: none;
                    }
                }

                &.stop-button {
                    background: var(--b3-theme-error);
                    color: white;
                    box-shadow: 0 2px 8px rgba(var(--b3-theme-error-rgb), 0.3);

                    &:hover {
                        transform: translateY(-1px);
                        box-shadow: 0 4px 12px
                            rgba(var(--b3-theme-error-rgb), 0.4);
                    }
                }

                &:active {
                    transform: translateY(0);
                }
            }
        }
    }
</style>
