"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Updater = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const stream_1 = require("stream");
const node_stream_zip_1 = __importDefault(require("node-stream-zip"));
class Updater {
    static tryUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Checking for updates...");
            if (yield Updater.checkUpdate()) {
                console.log("Found an update. Starting download...");
                yield Updater.forceUpdate();
                console.log("LyricsStatus updated successfully! Please restart to apply changes.");
                process.exit(0);
            }
        });
    }
    static forceUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            const downloadPath = (0, path_1.join)(__dirname, "./v3");
            const exclude = [
                "dist/index.js",
                "dist/Update",
                "settings.json",
                "cache"
            ];
            yield Updater.downloadRepo("OvalQuilter", "lyrics-status", "v3", downloadPath);
            Updater.replaceFiles(downloadPath, (0, path_1.join)(__dirname, "../../"), exclude);
        });
    }
    static checkUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            const version = yield (yield fetch("https://github.com/OvalQuilter/lyrics-status/raw/refs/heads/v3/VERSION")).text();
            return (0, fs_1.readFileSync)((0, path_1.join)(__dirname, "../VERSION"), { encoding: "utf-8" }) !== version;
        });
    }
    static downloadRepo(userName, repoName, branch, outputDir) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://github.com/${userName}/${repoName}/archive/refs/heads/${branch}.zip`;
            const downloadPath = (0, path_1.join)(outputDir, `${repoName}-${branch}.zip`);
            if (!(0, fs_1.existsSync)(outputDir)) {
                (0, fs_1.mkdirSync)(outputDir);
            }
            const response = yield fetch(url);
            const downloadStream = (0, fs_1.createWriteStream)(downloadPath);
            yield new Promise((res, rej) => {
                stream_1.Readable.fromWeb(response.body)
                    .pipe(downloadStream)
                    .on("finish", res);
            });
            const file = new node_stream_zip_1.default.async({ file: downloadPath });
            yield file.extract(null, outputDir);
        });
    }
    static replaceFiles(srcPath, dstPath, exclude) {
        const resolvedSrcPath = (0, path_1.resolve)(srcPath);
        const resolvedDstPath = (0, path_1.resolve)(dstPath);
        const srcFiles = (0, fs_1.readdirSync)(resolvedSrcPath, { withFileTypes: true });
        const dstFiles = (0, fs_1.readdirSync)(resolvedDstPath, { withFileTypes: true });
        for (let i = 0; i < srcFiles.length; i++) {
            const srcFile = srcFiles[i];
            const srcFilePath = (0, path_1.join)(srcPath, srcFile.name);
            const resolvedSrcFilePath = (0, path_1.join)(resolvedSrcPath, srcFile.name);
            const srcIsDirectory = srcFile.isDirectory();
            const needsDelete = new Set();
            const needsIgnore = new Set();
            // For deleting files that doesn't exist in src dir
            for (let j = 0; j < dstFiles.length; j++) {
                const dstFile = dstFiles[j];
                const dstFilePath = (0, path_1.join)(dstPath, dstFile.name);
                const resolvedDstFilePath = (0, path_1.join)(resolvedDstPath, dstFile.name);
                const dstIsDirectory = dstFile.isDirectory();
                if (exclude.includes(dstFilePath))
                    continue;
                if (srcFile.name !== dstFile.name) {
                    needsDelete.add(resolvedDstFilePath);
                    continue;
                }
                needsIgnore.add(resolvedDstFilePath);
                if (srcIsDirectory) {
                    if (dstIsDirectory) {
                        Updater.replaceFiles(srcFilePath, dstFilePath, exclude);
                    }
                    else {
                        (0, fs_1.unlinkSync)(resolvedDstFilePath);
                        (0, fs_1.copyFileSync)(resolvedSrcFilePath, resolvedDstPath);
                    }
                }
                else {
                    (0, fs_1.unlinkSync)(resolvedDstFilePath);
                    (0, fs_1.copyFileSync)(resolvedSrcFilePath, resolvedDstPath);
                }
            }
            for (const file of needsDelete) {
                if (needsIgnore.has(file))
                    continue;
                (0, fs_1.unlinkSync)(file);
            }
        }
    }
}
exports.Updater = Updater;
