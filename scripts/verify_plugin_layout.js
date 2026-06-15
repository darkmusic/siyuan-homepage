/*
 * Verify that a SiYuan plugin directory has the files the kernel expects.
 */
import fs from "fs";
import path from "path";

const pluginDir = process.argv[2] ?? process.cwd();
const required = ["plugin.json", "index.js", "index.css", "i18n/en_US.json"];
const missing = required.filter((file) => !fs.existsSync(path.join(pluginDir, file)));

if (missing.length > 0) {
    console.error(`Plugin layout invalid in ${pluginDir}`);
    for (const file of missing) {
        console.error(`  missing: ${file}`);
    }
    console.error("");
    console.error("SiYuan loads data/plugins/<name>/index.js from the plugin folder root.");
    console.error("After build, run: pnpm build (which links dist/ artifacts to the repo root)");
    console.error("Or bind-mount dist/ instead of the repo root.");
    process.exit(1);
}

console.log(`Plugin layout OK: ${pluginDir}`);
