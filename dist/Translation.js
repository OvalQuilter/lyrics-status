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
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateLyrics = translateLyrics;
exports.clearTranslationCache = clearTranslationCache;
const translationCache = new Map();
function translateLyrics(text, targetLanguage) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!text.trim())
            return text;
        const cacheKey = `${targetLanguage}_${text}`;
        if (translationCache.has(cacheKey))
            return translationCache.get(cacheKey);
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`;
        try {
            const response = yield fetch(url, { cache: "force-cache" });
            if (!response.ok)
                throw new Error(`HTTP ${response.status}`);
            const data = yield response.json();
            if (!Array.isArray(data) || !Array.isArray(data[0])) {
                throw new Error("Unexpected format");
            }
            let translatedText = "";
            for (const part of data[0]) {
                if (part[0])
                    translatedText += part[0];
            }
            if (!translatedText || translatedText.trim().toLowerCase() === text.trim().toLowerCase()) {
                return text;
            }
            translationCache.set(cacheKey, translatedText);
            return translatedText;
        }
        catch (error) {
            console.warn("[Translation] Error translating lyrics:", error.message);
            return text;
        }
    });
}
function clearTranslationCache() {
    translationCache.clear();
}
