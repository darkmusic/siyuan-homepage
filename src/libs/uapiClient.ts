const BASE_URL = "https://uapis.cn/api/v1";

async function uapiGet<T>(
    path: string,
    params: Record<string, string | undefined>,
): Promise<T> {
    const url = new URL(`${BASE_URL}${path}`);
    for (const [key, value] of Object.entries(params)) {
        if (value != null && value !== "") {
            url.searchParams.set(key, value);
        }
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error(`UAPI request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
}

export interface UapiWeatherResponse {
    province?: string;
    city?: string;
    adcode?: string;
    weather?: string;
    temperature?: number;
    wind_direction?: string;
    wind_power?: string;
    humidity?: number;
    report_time?: string;
}

export interface UapiHotboardResponse {
    list?: Array<{
        title: string;
        hot_value?: string;
        url: string;
    }>;
}

export function getMiscWeather(payload: {
    city?: string;
    adcode?: string;
}): Promise<UapiWeatherResponse> {
    return uapiGet("/misc/weather", payload);
}

export function getMiscHotboard(payload: {
    type: string;
}): Promise<UapiHotboardResponse> {
    return uapiGet("/misc/hotboard", payload);
}
