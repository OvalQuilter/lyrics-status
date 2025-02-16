export interface ISettingsData {
    credentials: {
        token: string
        cookies: string
    }

    view: {
        timestamp: boolean
        label: boolean
        advanced: {
            enabled: boolean
            customEmoji: string
            customStatus: string
        }
    }

    timings: {
        sendTimeOffset: number
        enableAutooffset: boolean
        autooffset: number
    }

    update: {
        enableAutoupdate: boolean
    }
}
