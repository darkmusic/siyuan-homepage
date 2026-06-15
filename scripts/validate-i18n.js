#!/usr/bin/env node
/**
 * Compare key trees between zh_CN.json and en_US.json locale files.
 * Exits with code 1 if structures differ.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const zhPath = path.join(root, "public/i18n/zh_CN.json");
const enPath = path.join(root, "public/i18n/en_US.json");

function collectLeafKeys(obj, prefix = "") {
    /** @type {string[]} */
    const keys = [];
    for (const [key, value] of Object.entries(obj)) {
        const full = prefix ? `${prefix}.${key}` : key;
        if (value !== null && typeof value === "object" && !Array.isArray(value)) {
            keys.push(...collectLeafKeys(value, full));
        } else {
            keys.push(full);
        }
    }
    return keys;
}

function loadJson(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error(`Missing locale file: ${filePath}`);
        process.exit(1);
    }
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

const zh = loadJson(zhPath);
const en = loadJson(enPath);

const zhKeys = new Set(collectLeafKeys(zh));
const enKeys = new Set(collectLeafKeys(en));

const onlyZh = [...zhKeys].filter((k) => !enKeys.has(k)).sort();
const onlyEn = [...enKeys].filter((k) => !zhKeys.has(k)).sort();

if (onlyZh.length || onlyEn.length) {
    console.error("Locale key tree mismatch:");
    if (onlyZh.length) {
        console.error(`\nOnly in zh_CN (${onlyZh.length}):`);
        for (const k of onlyZh) console.error(`  + ${k}`);
    }
    if (onlyEn.length) {
        console.error(`\nOnly in en_US (${onlyEn.length}):`);
        for (const k of onlyEn) console.error(`  - ${k}`);
    }
    process.exit(1);
}

console.log(`OK: ${zhKeys.size} leaf keys match in zh_CN.json and en_US.json`);
