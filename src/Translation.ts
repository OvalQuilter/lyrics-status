const translationCache = new Map<string, string>()

export async function translateLyrics(text: string, targetLanguage: string): Promise<string> {
    if (!text.trim()) return text
        const cacheKey = `${targetLanguage}_${text}`
        if (translationCache.has(cacheKey)) return translationCache.get(cacheKey)!

            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`

            try {
                const response = await fetch(url, { cache: "force-cache" })
                if (!response.ok) throw new Error(`HTTP ${response.status}`)

                    const data: unknown = await response.json()

                    if (!Array.isArray(data) || !Array.isArray(data[0])) {
                        throw new Error("Unexpected format")
                    }

                    let translatedText = ""
                    for (const part of data[0] as any[]) {
                        if (part[0]) translatedText += part[0]
                    }

                    if (!translatedText || translatedText.trim().toLowerCase() === text.trim().toLowerCase()) {
                        return text
                    }

                    translationCache.set(cacheKey, translatedText)
                    return translatedText
            } catch (error) {
                console.warn("[Translation] Error translating lyrics:", (error as Error).message)
                return text
            }
}

export function clearTranslationCache(): void {
    translationCache.clear()
}
