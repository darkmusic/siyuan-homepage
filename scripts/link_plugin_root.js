/*
 * Symlink built plugin artifacts into the repo root for SiYuan bind-mount dev.
 *
 * SiYuan loads plugins from data/plugins/<name>/index.js (not dist/index.js).
 * When the plugin folder is bind-mounted to this repo root, index.js must exist
 * at the mount root after build.
 */
import fs from "fs";
import path from "path";

const root = process.cwd();
const distDir = path.join(root, "dist");

function ensureCopyDir(name, sourceRel) {
    const destPath = path.join(root, name);
    const sourcePath = path.join(root, sourceRel);

    if (!fs.existsSync(sourcePath)) {
        console.warn(`Skip copy ${name}: ${sourcePath} not found (run build first)`);
        return false;
    }

    if (fs.existsSync(destPath)) {
        const stat = fs.lstatSync(destPath);
        if (stat.isSymbolicLink()) {
            fs.unlinkSync(destPath);
        } else if (stat.isDirectory()) {
            fs.rmSync(destPath, { recursive: true, force: true });
        } else {
            fs.unlinkSync(destPath);
        }
    }

    fs.cpSync(sourcePath, destPath, { recursive: true });
    console.log(`Copied ${sourceRel} -> ${name}/`);
    return true;
}

/** @type {{ name: string; target: string; isDir?: boolean }[]} */
const links = [
    { name: "index.js", target: "dist/index.js" },
    { name: "index.css", target: "dist/index.css" },
];

/** @type {{ name: string; source: string }[]} */
const copies = [
    { name: "i18n", source: "dist/i18n" },
];

function ensureSymlink(name, targetRel, isDir) {
    const linkPath = path.join(root, name);
    const targetPath = path.join(root, targetRel);

    if (!fs.existsSync(targetPath)) {
        console.warn(`Skip link ${name}: ${targetPath} not found (run build first)`);
        return false;
    }

    if (fs.existsSync(linkPath)) {
        const stat = fs.lstatSync(linkPath);
        if (stat.isSymbolicLink()) {
            const current = fs.readlinkSync(linkPath);
            const resolvedCurrent = path.resolve(path.dirname(linkPath), current);
            if (resolvedCurrent === path.resolve(targetPath)) {
                return true;
            }
            fs.unlinkSync(linkPath);
        } else {
            console.error(`Cannot link ${name}: already exists and is not a symlink`);
            return false;
        }
    }

    fs.symlinkSync(targetRel, linkPath, isDir ? "dir" : "file");
    console.log(`Linked ${name} -> ${targetRel}`);
    return true;
}

if (!fs.existsSync(distDir)) {
    console.warn("dist/ not found, skipping plugin root links");
    process.exit(0);
}

let ok = true;
for (const { name, target, isDir } of links) {
    if (!ensureSymlink(name, target, isDir ?? false)) {
        ok = false;
    }
}
for (const { name, source } of copies) {
    if (!ensureCopyDir(name, source)) {
        ok = false;
    }
}

if (!ok) {
    process.exit(1);
}
