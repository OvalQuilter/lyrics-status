"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreloadedUserSettings_CustomUserThemeSettings = exports.PreloadedUserSettings_LocalizationSettings = exports.PreloadedUserSettings_StatusSettings = exports.PreloadedUserSettings_CustomStatus = exports.PreloadedUserSettings_GameLibrarySettings = exports.PreloadedUserSettings_DebugSettings = exports.PreloadedUserSettings_PrivacySettings = exports.PreloadedUserSettings_NotificationSettings = exports.PreloadedUserSettings_TextAndImagesSettings = exports.PreloadedUserSettings_SelfHarmContentSettings = exports.PreloadedUserSettings_DefaultReactionEmoji = exports.PreloadedUserSettings_GoreContentSettings = exports.PreloadedUserSettings_KeywordFilterSettings = exports.PreloadedUserSettings_ExplicitContentSettings = exports.PreloadedUserSettings_VoiceAndVideoSettings = exports.PreloadedUserSettings_SoundboardSettings = exports.PreloadedUserSettings_VideoFilterAsset = exports.PreloadedUserSettings_VideoFilterBackgroundBlur = exports.PreloadedUserSettings_UserContentSettings = exports.PreloadedUserSettings_RecurringDismissibleContentState = exports.PreloadedUserSettings_AllGuildSettings = exports.PreloadedUserSettings_GuildSettings = exports.PreloadedUserSettings_GuildDismissibleContentState = exports.PreloadedUserSettings_ChannelListSettings = exports.PreloadedUserSettings_CustomCallSound = exports.PreloadedUserSettings_ChannelSettings = exports.PreloadedUserSettings_CustomNotificationSoundConfig = exports.PreloadedUserSettings_ChannelIconEmoji = exports.PreloadedUserSettings_InboxSettings = exports.PreloadedUserSettings_Versions = exports.PreloadedUserSettings = exports.PreloadedUserSettings_SafetySettingsPresetType = exports.PreloadedUserSettings_ForLaterTab = exports.PreloadedUserSettings_FavoriteChannelType = exports.PreloadedUserSettings_SwipeRightToLeftMode = exports.PreloadedUserSettings_UIDensity = exports.PreloadedUserSettings_LaunchPadMode = exports.PreloadedUserSettings_TimestampHourCycle = exports.PreloadedUserSettings_Theme = exports.PreloadedUserSettings_ProfileVisibility = exports.PreloadedUserSettings_GuildActivityStatusRestrictionDefaultV2 = exports.PreloadedUserSettings_SlayerSDKReceiveInGameDMs = exports.PreloadedUserSettings_GuildsLeaderboardOptOutDefault = exports.PreloadedUserSettings_GuildActivityStatusRestrictionDefault = exports.PreloadedUserSettings_CustomStatusPushNotificationType = exports.PreloadedUserSettings_GameActivityNotificationType = exports.PreloadedUserSettings_ReactionNotificationType = exports.PreloadedUserSettings_ExplicitContentRedaction = exports.PreloadedUserSettings_DmSpamFilterV2 = exports.PreloadedUserSettings_InboxTab = void 0;
exports.PreloadedUserSettings_InAppFeedbackSettings = exports.PreloadedUserSettings_InAppFeedbackState = exports.PreloadedUserSettings_AdsSettings = exports.PreloadedUserSettings_AllApplicationSettings = exports.PreloadedUserSettings_ApplicationSettings = exports.PreloadedUserSettings_ApplicationSharingSettings = exports.PreloadedUserSettings_ApplicationDMSettings = exports.PreloadedUserSettings_ICYMISettings = exports.PreloadedUserSettings_SafetySettings = exports.PreloadedUserSettings_SpendingLimitSettings = exports.PreloadedUserSettings_SpendingLimit = exports.PreloadedUserSettings_ForLaterSettings = exports.PreloadedUserSettings_ClipsSettings = exports.PreloadedUserSettings_BroadcastSettings = exports.PreloadedUserSettings_CommunitiesSettings = exports.PreloadedUserSettings_AudioSettings = exports.PreloadedUserSettings_AudioContextSetting = exports.PreloadedUserSettings_Favorites = exports.PreloadedUserSettings_FavoriteChannel = exports.PreloadedUserSettings_GuildFolders = exports.PreloadedUserSettings_GuildFolder = exports.PreloadedUserSettings_AppearanceSettings = exports.PreloadedUserSettings_ClientThemeSettings = void 0;
const runtime_1 = require("@protobuf-ts/runtime");
const runtime_2 = require("@protobuf-ts/runtime");
const runtime_3 = require("@protobuf-ts/runtime");
const runtime_4 = require("@protobuf-ts/runtime");
const wrappers_1 = require("../../google/protobuf/wrappers");
const wrappers_2 = require("../../google/protobuf/wrappers");
const wrappers_3 = require("../../google/protobuf/wrappers");
const wrappers_4 = require("../../google/protobuf/wrappers");
const wrappers_5 = require("../../google/protobuf/wrappers");
const timestamp_1 = require("../../google/protobuf/timestamp");
const wrappers_6 = require("../../google/protobuf/wrappers");
const wrappers_7 = require("../../google/protobuf/wrappers");
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.InboxTab
 */
var PreloadedUserSettings_InboxTab;
(function (PreloadedUserSettings_InboxTab) {
    /**
     * @generated from protobuf enum value: INBOX_TAB_UNSPECIFIED = 0;
     */
    PreloadedUserSettings_InboxTab[PreloadedUserSettings_InboxTab["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from protobuf enum value: INBOX_TAB_MENTIONS = 1;
     */
    PreloadedUserSettings_InboxTab[PreloadedUserSettings_InboxTab["MENTIONS"] = 1] = "MENTIONS";
    /**
     * @generated from protobuf enum value: INBOX_TAB_UNREADS = 2;
     */
    PreloadedUserSettings_InboxTab[PreloadedUserSettings_InboxTab["UNREADS"] = 2] = "UNREADS";
    /**
     * @generated from protobuf enum value: INBOX_TAB_TODOS = 3;
     */
    PreloadedUserSettings_InboxTab[PreloadedUserSettings_InboxTab["TODOS"] = 3] = "TODOS";
    /**
     * @generated from protobuf enum value: INBOX_TAB_FOR_YOU = 4;
     */
    PreloadedUserSettings_InboxTab[PreloadedUserSettings_InboxTab["FOR_YOU"] = 4] = "FOR_YOU";
    /**
     * @generated from protobuf enum value: INBOX_TAB_GAME_INVITES = 5;
     */
    PreloadedUserSettings_InboxTab[PreloadedUserSettings_InboxTab["GAME_INVITES"] = 5] = "GAME_INVITES";
    /**
     * @generated from protobuf enum value: INBOX_TAB_BOOKMARKS = 6;
     */
    PreloadedUserSettings_InboxTab[PreloadedUserSettings_InboxTab["BOOKMARKS"] = 6] = "BOOKMARKS";
    /**
     * @generated from protobuf enum value: INBOX_TAB_SCHEDULED = 7;
     */
    PreloadedUserSettings_InboxTab[PreloadedUserSettings_InboxTab["SCHEDULED"] = 7] = "SCHEDULED";
})(PreloadedUserSettings_InboxTab || (exports.PreloadedUserSettings_InboxTab = PreloadedUserSettings_InboxTab = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.DmSpamFilterV2
 */
var PreloadedUserSettings_DmSpamFilterV2;
(function (PreloadedUserSettings_DmSpamFilterV2) {
    /**
     * @generated from protobuf enum value: DM_SPAM_FILTER_V2_DEFAULT_UNSET = 0;
     */
    PreloadedUserSettings_DmSpamFilterV2[PreloadedUserSettings_DmSpamFilterV2["DEFAULT_UNSET"] = 0] = "DEFAULT_UNSET";
    /**
     * @generated from protobuf enum value: DM_SPAM_FILTER_V2_DISABLED = 1;
     */
    PreloadedUserSettings_DmSpamFilterV2[PreloadedUserSettings_DmSpamFilterV2["DISABLED"] = 1] = "DISABLED";
    /**
     * @generated from protobuf enum value: DM_SPAM_FILTER_V2_NON_FRIENDS = 2;
     */
    PreloadedUserSettings_DmSpamFilterV2[PreloadedUserSettings_DmSpamFilterV2["NON_FRIENDS"] = 2] = "NON_FRIENDS";
    /**
     * @generated from protobuf enum value: DM_SPAM_FILTER_V2_FRIENDS_AND_NON_FRIENDS = 3;
     */
    PreloadedUserSettings_DmSpamFilterV2[PreloadedUserSettings_DmSpamFilterV2["FRIENDS_AND_NON_FRIENDS"] = 3] = "FRIENDS_AND_NON_FRIENDS";
})(PreloadedUserSettings_DmSpamFilterV2 || (exports.PreloadedUserSettings_DmSpamFilterV2 = PreloadedUserSettings_DmSpamFilterV2 = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction
 */
var PreloadedUserSettings_ExplicitContentRedaction;
(function (PreloadedUserSettings_ExplicitContentRedaction) {
    /**
     * @generated from protobuf enum value: EXPLICIT_CONTENT_REDACTION_UNSET_EXPLICIT_CONTENT_REDACTION = 0;
     */
    PreloadedUserSettings_ExplicitContentRedaction[PreloadedUserSettings_ExplicitContentRedaction["UNSET_EXPLICIT_CONTENT_REDACTION"] = 0] = "UNSET_EXPLICIT_CONTENT_REDACTION";
    /**
     * @generated from protobuf enum value: EXPLICIT_CONTENT_REDACTION_SHOW = 1;
     */
    PreloadedUserSettings_ExplicitContentRedaction[PreloadedUserSettings_ExplicitContentRedaction["SHOW"] = 1] = "SHOW";
    /**
     * @generated from protobuf enum value: EXPLICIT_CONTENT_REDACTION_BLUR = 2;
     */
    PreloadedUserSettings_ExplicitContentRedaction[PreloadedUserSettings_ExplicitContentRedaction["BLUR"] = 2] = "BLUR";
    /**
     * @generated from protobuf enum value: EXPLICIT_CONTENT_REDACTION_BLOCK = 3;
     */
    PreloadedUserSettings_ExplicitContentRedaction[PreloadedUserSettings_ExplicitContentRedaction["BLOCK"] = 3] = "BLOCK";
})(PreloadedUserSettings_ExplicitContentRedaction || (exports.PreloadedUserSettings_ExplicitContentRedaction = PreloadedUserSettings_ExplicitContentRedaction = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.ReactionNotificationType
 */
var PreloadedUserSettings_ReactionNotificationType;
(function (PreloadedUserSettings_ReactionNotificationType) {
    /**
     * @generated from protobuf enum value: REACTION_NOTIFICATION_TYPE_NOTIFICATIONS_ENABLED = 0;
     */
    PreloadedUserSettings_ReactionNotificationType[PreloadedUserSettings_ReactionNotificationType["NOTIFICATIONS_ENABLED"] = 0] = "NOTIFICATIONS_ENABLED";
    /**
     * @generated from protobuf enum value: REACTION_NOTIFICATION_TYPE_ONLY_DMS = 1;
     */
    PreloadedUserSettings_ReactionNotificationType[PreloadedUserSettings_ReactionNotificationType["ONLY_DMS"] = 1] = "ONLY_DMS";
    /**
     * @generated from protobuf enum value: REACTION_NOTIFICATION_TYPE_NOTIFICATIONS_DISABLED = 2;
     */
    PreloadedUserSettings_ReactionNotificationType[PreloadedUserSettings_ReactionNotificationType["NOTIFICATIONS_DISABLED"] = 2] = "NOTIFICATIONS_DISABLED";
})(PreloadedUserSettings_ReactionNotificationType || (exports.PreloadedUserSettings_ReactionNotificationType = PreloadedUserSettings_ReactionNotificationType = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.GameActivityNotificationType
 */
var PreloadedUserSettings_GameActivityNotificationType;
(function (PreloadedUserSettings_GameActivityNotificationType) {
    /**
     * @generated from protobuf enum value: GAME_ACTIVITY_NOTIFICATION_TYPE_ACTIVITY_NOTIFICATIONS_UNSET = 0;
     */
    PreloadedUserSettings_GameActivityNotificationType[PreloadedUserSettings_GameActivityNotificationType["ACTIVITY_NOTIFICATIONS_UNSET"] = 0] = "ACTIVITY_NOTIFICATIONS_UNSET";
    /**
     * @generated from protobuf enum value: GAME_ACTIVITY_NOTIFICATION_TYPE_ACTIVITY_NOTIFICATIONS_DISABLED = 1;
     */
    PreloadedUserSettings_GameActivityNotificationType[PreloadedUserSettings_GameActivityNotificationType["ACTIVITY_NOTIFICATIONS_DISABLED"] = 1] = "ACTIVITY_NOTIFICATIONS_DISABLED";
    /**
     * @generated from protobuf enum value: GAME_ACTIVITY_NOTIFICATION_TYPE_ACTIVITY_NOTIFICATIONS_ENABLED = 2;
     */
    PreloadedUserSettings_GameActivityNotificationType[PreloadedUserSettings_GameActivityNotificationType["ACTIVITY_NOTIFICATIONS_ENABLED"] = 2] = "ACTIVITY_NOTIFICATIONS_ENABLED";
    /**
     * @generated from protobuf enum value: GAME_ACTIVITY_NOTIFICATION_TYPE_ONLY_GAMES_PLAYED = 3;
     */
    PreloadedUserSettings_GameActivityNotificationType[PreloadedUserSettings_GameActivityNotificationType["ONLY_GAMES_PLAYED"] = 3] = "ONLY_GAMES_PLAYED";
})(PreloadedUserSettings_GameActivityNotificationType || (exports.PreloadedUserSettings_GameActivityNotificationType = PreloadedUserSettings_GameActivityNotificationType = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.CustomStatusPushNotificationType
 */
var PreloadedUserSettings_CustomStatusPushNotificationType;
(function (PreloadedUserSettings_CustomStatusPushNotificationType) {
    /**
     * @generated from protobuf enum value: CUSTOM_STATUS_PUSH_NOTIFICATION_TYPE_STATUS_PUSH_UNSET = 0;
     */
    PreloadedUserSettings_CustomStatusPushNotificationType[PreloadedUserSettings_CustomStatusPushNotificationType["STATUS_PUSH_UNSET"] = 0] = "STATUS_PUSH_UNSET";
    /**
     * @generated from protobuf enum value: CUSTOM_STATUS_PUSH_NOTIFICATION_TYPE_STATUS_PUSH_ENABLED = 1;
     */
    PreloadedUserSettings_CustomStatusPushNotificationType[PreloadedUserSettings_CustomStatusPushNotificationType["STATUS_PUSH_ENABLED"] = 1] = "STATUS_PUSH_ENABLED";
    /**
     * @generated from protobuf enum value: CUSTOM_STATUS_PUSH_NOTIFICATION_TYPE_STATUS_PUSH_DISABLED = 2;
     */
    PreloadedUserSettings_CustomStatusPushNotificationType[PreloadedUserSettings_CustomStatusPushNotificationType["STATUS_PUSH_DISABLED"] = 2] = "STATUS_PUSH_DISABLED";
})(PreloadedUserSettings_CustomStatusPushNotificationType || (exports.PreloadedUserSettings_CustomStatusPushNotificationType = PreloadedUserSettings_CustomStatusPushNotificationType = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.GuildActivityStatusRestrictionDefault
 */
var PreloadedUserSettings_GuildActivityStatusRestrictionDefault;
(function (PreloadedUserSettings_GuildActivityStatusRestrictionDefault) {
    /**
     * @generated from protobuf enum value: GUILD_ACTIVITY_STATUS_RESTRICTION_DEFAULT_OFF = 0;
     */
    PreloadedUserSettings_GuildActivityStatusRestrictionDefault[PreloadedUserSettings_GuildActivityStatusRestrictionDefault["OFF"] = 0] = "OFF";
    /**
     * @generated from protobuf enum value: GUILD_ACTIVITY_STATUS_RESTRICTION_DEFAULT_ON_FOR_LARGE_GUILDS = 1;
     */
    PreloadedUserSettings_GuildActivityStatusRestrictionDefault[PreloadedUserSettings_GuildActivityStatusRestrictionDefault["ON_FOR_LARGE_GUILDS"] = 1] = "ON_FOR_LARGE_GUILDS";
    /**
     * @generated from protobuf enum value: GUILD_ACTIVITY_STATUS_RESTRICTION_DEFAULT_ON = 2;
     */
    PreloadedUserSettings_GuildActivityStatusRestrictionDefault[PreloadedUserSettings_GuildActivityStatusRestrictionDefault["ON"] = 2] = "ON";
})(PreloadedUserSettings_GuildActivityStatusRestrictionDefault || (exports.PreloadedUserSettings_GuildActivityStatusRestrictionDefault = PreloadedUserSettings_GuildActivityStatusRestrictionDefault = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.GuildsLeaderboardOptOutDefault
 */
var PreloadedUserSettings_GuildsLeaderboardOptOutDefault;
(function (PreloadedUserSettings_GuildsLeaderboardOptOutDefault) {
    /**
     * @generated from protobuf enum value: GUILDS_LEADERBOARD_OPT_OUT_DEFAULT_OFF_FOR_NEW_GUILDS = 0;
     */
    PreloadedUserSettings_GuildsLeaderboardOptOutDefault[PreloadedUserSettings_GuildsLeaderboardOptOutDefault["OFF_FOR_NEW_GUILDS"] = 0] = "OFF_FOR_NEW_GUILDS";
    /**
     * @generated from protobuf enum value: GUILDS_LEADERBOARD_OPT_OUT_DEFAULT_ON_FOR_NEW_GUILDS = 1;
     */
    PreloadedUserSettings_GuildsLeaderboardOptOutDefault[PreloadedUserSettings_GuildsLeaderboardOptOutDefault["ON_FOR_NEW_GUILDS"] = 1] = "ON_FOR_NEW_GUILDS";
})(PreloadedUserSettings_GuildsLeaderboardOptOutDefault || (exports.PreloadedUserSettings_GuildsLeaderboardOptOutDefault = PreloadedUserSettings_GuildsLeaderboardOptOutDefault = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.SlayerSDKReceiveInGameDMs
 */
var PreloadedUserSettings_SlayerSDKReceiveInGameDMs;
(function (PreloadedUserSettings_SlayerSDKReceiveInGameDMs) {
    /**
     * @generated from protobuf enum value: SLAYER_SDK_RECEIVE_IN_GAME_DMS_UNSET = 0;
     */
    PreloadedUserSettings_SlayerSDKReceiveInGameDMs[PreloadedUserSettings_SlayerSDKReceiveInGameDMs["SLAYER_SDK_RECEIVE_IN_GAME_DMS_UNSET"] = 0] = "SLAYER_SDK_RECEIVE_IN_GAME_DMS_UNSET";
    /**
     * @generated from protobuf enum value: SLAYER_SDK_RECEIVE_IN_GAME_DMS_ALL = 1;
     */
    PreloadedUserSettings_SlayerSDKReceiveInGameDMs[PreloadedUserSettings_SlayerSDKReceiveInGameDMs["SLAYER_SDK_RECEIVE_IN_GAME_DMS_ALL"] = 1] = "SLAYER_SDK_RECEIVE_IN_GAME_DMS_ALL";
    /**
     * @generated from protobuf enum value: SLAYER_SDK_RECEIVE_IN_GAME_DMS_USERS_WITH_GAME = 2;
     */
    PreloadedUserSettings_SlayerSDKReceiveInGameDMs[PreloadedUserSettings_SlayerSDKReceiveInGameDMs["SLAYER_SDK_RECEIVE_IN_GAME_DMS_USERS_WITH_GAME"] = 2] = "SLAYER_SDK_RECEIVE_IN_GAME_DMS_USERS_WITH_GAME";
    /**
     * @generated from protobuf enum value: SLAYER_SDK_RECEIVE_IN_GAME_DMS_NONE = 3;
     */
    PreloadedUserSettings_SlayerSDKReceiveInGameDMs[PreloadedUserSettings_SlayerSDKReceiveInGameDMs["SLAYER_SDK_RECEIVE_IN_GAME_DMS_NONE"] = 3] = "SLAYER_SDK_RECEIVE_IN_GAME_DMS_NONE";
})(PreloadedUserSettings_SlayerSDKReceiveInGameDMs || (exports.PreloadedUserSettings_SlayerSDKReceiveInGameDMs = PreloadedUserSettings_SlayerSDKReceiveInGameDMs = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.GuildActivityStatusRestrictionDefaultV2
 */
var PreloadedUserSettings_GuildActivityStatusRestrictionDefaultV2;
(function (PreloadedUserSettings_GuildActivityStatusRestrictionDefaultV2) {
    /**
     * @generated from protobuf enum value: GUILD_ACTIVITY_STATUS_RESTRICTION_DEFAULT_V2_ACTIVITY_STATUS_UNSET = 0;
     */
    PreloadedUserSettings_GuildActivityStatusRestrictionDefaultV2[PreloadedUserSettings_GuildActivityStatusRestrictionDefaultV2["ACTIVITY_STATUS_UNSET"] = 0] = "ACTIVITY_STATUS_UNSET";
    /**
     * @generated from protobuf enum value: GUILD_ACTIVITY_STATUS_RESTRICTION_DEFAULT_V2_ACTIVITY_STATUS_OFF = 1;
     */
    PreloadedUserSettings_GuildActivityStatusRestrictionDefaultV2[PreloadedUserSettings_GuildActivityStatusRestrictionDefaultV2["ACTIVITY_STATUS_OFF"] = 1] = "ACTIVITY_STATUS_OFF";
    /**
     * @generated from protobuf enum value: GUILD_ACTIVITY_STATUS_RESTRICTION_DEFAULT_V2_ACTIVITY_STATUS_ON_FOR_LARGE_GUILDS = 2;
     */
    PreloadedUserSettings_GuildActivityStatusRestrictionDefaultV2[PreloadedUserSettings_GuildActivityStatusRestrictionDefaultV2["ACTIVITY_STATUS_ON_FOR_LARGE_GUILDS"] = 2] = "ACTIVITY_STATUS_ON_FOR_LARGE_GUILDS";
    /**
     * @generated from protobuf enum value: GUILD_ACTIVITY_STATUS_RESTRICTION_DEFAULT_V2_ACTIVITY_STATUS_ON = 3;
     */
    PreloadedUserSettings_GuildActivityStatusRestrictionDefaultV2[PreloadedUserSettings_GuildActivityStatusRestrictionDefaultV2["ACTIVITY_STATUS_ON"] = 3] = "ACTIVITY_STATUS_ON";
})(PreloadedUserSettings_GuildActivityStatusRestrictionDefaultV2 || (exports.PreloadedUserSettings_GuildActivityStatusRestrictionDefaultV2 = PreloadedUserSettings_GuildActivityStatusRestrictionDefaultV2 = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.ProfileVisibility
 */
var PreloadedUserSettings_ProfileVisibility;
(function (PreloadedUserSettings_ProfileVisibility) {
    /**
     * @generated from protobuf enum value: PROFILE_VISIBILITY_UNSET = 0;
     */
    PreloadedUserSettings_ProfileVisibility[PreloadedUserSettings_ProfileVisibility["UNSET"] = 0] = "UNSET";
    /**
     * @generated from protobuf enum value: PROFILE_VISIBILITY_FRIENDS_ONLY = 1;
     */
    PreloadedUserSettings_ProfileVisibility[PreloadedUserSettings_ProfileVisibility["FRIENDS_ONLY"] = 1] = "FRIENDS_ONLY";
    /**
     * @generated from protobuf enum value: PROFILE_VISIBILITY_FRIENDS_AND_SMALL_GUILDS = 2;
     */
    PreloadedUserSettings_ProfileVisibility[PreloadedUserSettings_ProfileVisibility["FRIENDS_AND_SMALL_GUILDS"] = 2] = "FRIENDS_AND_SMALL_GUILDS";
    /**
     * @generated from protobuf enum value: PROFILE_VISIBILITY_FRIENDS_AND_ALL_GUILDS = 3;
     */
    PreloadedUserSettings_ProfileVisibility[PreloadedUserSettings_ProfileVisibility["FRIENDS_AND_ALL_GUILDS"] = 3] = "FRIENDS_AND_ALL_GUILDS";
})(PreloadedUserSettings_ProfileVisibility || (exports.PreloadedUserSettings_ProfileVisibility = PreloadedUserSettings_ProfileVisibility = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.Theme
 */
var PreloadedUserSettings_Theme;
(function (PreloadedUserSettings_Theme) {
    /**
     * @generated from protobuf enum value: THEME_UNSET = 0;
     */
    PreloadedUserSettings_Theme[PreloadedUserSettings_Theme["UNSET"] = 0] = "UNSET";
    /**
     * @generated from protobuf enum value: THEME_DARK = 1;
     */
    PreloadedUserSettings_Theme[PreloadedUserSettings_Theme["DARK"] = 1] = "DARK";
    /**
     * @generated from protobuf enum value: THEME_LIGHT = 2;
     */
    PreloadedUserSettings_Theme[PreloadedUserSettings_Theme["LIGHT"] = 2] = "LIGHT";
    /**
     * @generated from protobuf enum value: THEME_DARKER = 3;
     */
    PreloadedUserSettings_Theme[PreloadedUserSettings_Theme["DARKER"] = 3] = "DARKER";
    /**
     * @generated from protobuf enum value: THEME_MIDNIGHT = 4;
     */
    PreloadedUserSettings_Theme[PreloadedUserSettings_Theme["MIDNIGHT"] = 4] = "MIDNIGHT";
})(PreloadedUserSettings_Theme || (exports.PreloadedUserSettings_Theme = PreloadedUserSettings_Theme = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.TimestampHourCycle
 */
var PreloadedUserSettings_TimestampHourCycle;
(function (PreloadedUserSettings_TimestampHourCycle) {
    /**
     * @generated from protobuf enum value: TIMESTAMP_HOUR_CYCLE_AUTO = 0;
     */
    PreloadedUserSettings_TimestampHourCycle[PreloadedUserSettings_TimestampHourCycle["AUTO"] = 0] = "AUTO";
    /**
     * @generated from protobuf enum value: TIMESTAMP_HOUR_CYCLE_H12 = 1;
     */
    PreloadedUserSettings_TimestampHourCycle[PreloadedUserSettings_TimestampHourCycle["H12"] = 1] = "H12";
    /**
     * @generated from protobuf enum value: TIMESTAMP_HOUR_CYCLE_H23 = 2;
     */
    PreloadedUserSettings_TimestampHourCycle[PreloadedUserSettings_TimestampHourCycle["H23"] = 2] = "H23";
})(PreloadedUserSettings_TimestampHourCycle || (exports.PreloadedUserSettings_TimestampHourCycle = PreloadedUserSettings_TimestampHourCycle = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.LaunchPadMode
 */
var PreloadedUserSettings_LaunchPadMode;
(function (PreloadedUserSettings_LaunchPadMode) {
    /**
     * @generated from protobuf enum value: LAUNCH_PAD_MODE_LAUNCH_PAD_DISABLED = 0;
     */
    PreloadedUserSettings_LaunchPadMode[PreloadedUserSettings_LaunchPadMode["LAUNCH_PAD_DISABLED"] = 0] = "LAUNCH_PAD_DISABLED";
    /**
     * @generated from protobuf enum value: LAUNCH_PAD_MODE_LAUNCH_PAD_GESTURE_FULL_SCREEN = 1;
     */
    PreloadedUserSettings_LaunchPadMode[PreloadedUserSettings_LaunchPadMode["LAUNCH_PAD_GESTURE_FULL_SCREEN"] = 1] = "LAUNCH_PAD_GESTURE_FULL_SCREEN";
    /**
     * @generated from protobuf enum value: LAUNCH_PAD_MODE_LAUNCH_PAD_GESTURE_RIGHT_EDGE = 2;
     */
    PreloadedUserSettings_LaunchPadMode[PreloadedUserSettings_LaunchPadMode["LAUNCH_PAD_GESTURE_RIGHT_EDGE"] = 2] = "LAUNCH_PAD_GESTURE_RIGHT_EDGE";
    /**
     * @generated from protobuf enum value: LAUNCH_PAD_MODE_LAUNCH_PAD_PULL_TAB = 3;
     */
    PreloadedUserSettings_LaunchPadMode[PreloadedUserSettings_LaunchPadMode["LAUNCH_PAD_PULL_TAB"] = 3] = "LAUNCH_PAD_PULL_TAB";
})(PreloadedUserSettings_LaunchPadMode || (exports.PreloadedUserSettings_LaunchPadMode = PreloadedUserSettings_LaunchPadMode = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.UIDensity
 */
var PreloadedUserSettings_UIDensity;
(function (PreloadedUserSettings_UIDensity) {
    /**
     * @generated from protobuf enum value: UI_DENSITY_UNSET_UI_DENSITY = 0;
     */
    PreloadedUserSettings_UIDensity[PreloadedUserSettings_UIDensity["UI_DENSITY_UNSET_UI_DENSITY"] = 0] = "UI_DENSITY_UNSET_UI_DENSITY";
    /**
     * @generated from protobuf enum value: UI_DENSITY_COMPACT = 1;
     */
    PreloadedUserSettings_UIDensity[PreloadedUserSettings_UIDensity["UI_DENSITY_COMPACT"] = 1] = "UI_DENSITY_COMPACT";
    /**
     * @generated from protobuf enum value: UI_DENSITY_COZY = 2;
     */
    PreloadedUserSettings_UIDensity[PreloadedUserSettings_UIDensity["UI_DENSITY_COZY"] = 2] = "UI_DENSITY_COZY";
    /**
     * @generated from protobuf enum value: UI_DENSITY_RESPONSIVE = 3;
     */
    PreloadedUserSettings_UIDensity[PreloadedUserSettings_UIDensity["UI_DENSITY_RESPONSIVE"] = 3] = "UI_DENSITY_RESPONSIVE";
    /**
     * @generated from protobuf enum value: UI_DENSITY_DEFAULT = 4;
     */
    PreloadedUserSettings_UIDensity[PreloadedUserSettings_UIDensity["UI_DENSITY_DEFAULT"] = 4] = "UI_DENSITY_DEFAULT";
})(PreloadedUserSettings_UIDensity || (exports.PreloadedUserSettings_UIDensity = PreloadedUserSettings_UIDensity = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.SwipeRightToLeftMode
 */
var PreloadedUserSettings_SwipeRightToLeftMode;
(function (PreloadedUserSettings_SwipeRightToLeftMode) {
    /**
     * @generated from protobuf enum value: SWIPE_RIGHT_TO_LEFT_MODE_SWIPE_RIGHT_TO_LEFT_UNSET = 0;
     */
    PreloadedUserSettings_SwipeRightToLeftMode[PreloadedUserSettings_SwipeRightToLeftMode["SWIPE_RIGHT_TO_LEFT_UNSET"] = 0] = "SWIPE_RIGHT_TO_LEFT_UNSET";
    /**
     * @generated from protobuf enum value: SWIPE_RIGHT_TO_LEFT_MODE_SWIPE_RIGHT_TO_LEFT_CHANNEL_DETAILS = 1;
     */
    PreloadedUserSettings_SwipeRightToLeftMode[PreloadedUserSettings_SwipeRightToLeftMode["SWIPE_RIGHT_TO_LEFT_CHANNEL_DETAILS"] = 1] = "SWIPE_RIGHT_TO_LEFT_CHANNEL_DETAILS";
    /**
     * @generated from protobuf enum value: SWIPE_RIGHT_TO_LEFT_MODE_SWIPE_RIGHT_TO_LEFT_REPLY = 2;
     */
    PreloadedUserSettings_SwipeRightToLeftMode[PreloadedUserSettings_SwipeRightToLeftMode["SWIPE_RIGHT_TO_LEFT_REPLY"] = 2] = "SWIPE_RIGHT_TO_LEFT_REPLY";
})(PreloadedUserSettings_SwipeRightToLeftMode || (exports.PreloadedUserSettings_SwipeRightToLeftMode = PreloadedUserSettings_SwipeRightToLeftMode = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.FavoriteChannelType
 */
var PreloadedUserSettings_FavoriteChannelType;
(function (PreloadedUserSettings_FavoriteChannelType) {
    /**
     * @generated from protobuf enum value: FAVORITE_CHANNEL_TYPE_UNSET_FAVORITE_CHANNEL_TYPE = 0;
     */
    PreloadedUserSettings_FavoriteChannelType[PreloadedUserSettings_FavoriteChannelType["UNSET_FAVORITE_CHANNEL_TYPE"] = 0] = "UNSET_FAVORITE_CHANNEL_TYPE";
    /**
     * @generated from protobuf enum value: FAVORITE_CHANNEL_TYPE_REFERENCE_ORIGINAL = 1;
     */
    PreloadedUserSettings_FavoriteChannelType[PreloadedUserSettings_FavoriteChannelType["REFERENCE_ORIGINAL"] = 1] = "REFERENCE_ORIGINAL";
    /**
     * @generated from protobuf enum value: FAVORITE_CHANNEL_TYPE_CATEGORY = 2;
     */
    PreloadedUserSettings_FavoriteChannelType[PreloadedUserSettings_FavoriteChannelType["CATEGORY"] = 2] = "CATEGORY";
})(PreloadedUserSettings_FavoriteChannelType || (exports.PreloadedUserSettings_FavoriteChannelType = PreloadedUserSettings_FavoriteChannelType = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.ForLaterTab
 */
var PreloadedUserSettings_ForLaterTab;
(function (PreloadedUserSettings_ForLaterTab) {
    /**
     * @generated from protobuf enum value: FOR_LATER_TAB_UNSPECIFIED = 0;
     */
    PreloadedUserSettings_ForLaterTab[PreloadedUserSettings_ForLaterTab["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from protobuf enum value: FOR_LATER_TAB_ALL = 1;
     */
    PreloadedUserSettings_ForLaterTab[PreloadedUserSettings_ForLaterTab["ALL"] = 1] = "ALL";
    /**
     * @generated from protobuf enum value: FOR_LATER_TAB_BOOKMARKS = 2;
     */
    PreloadedUserSettings_ForLaterTab[PreloadedUserSettings_ForLaterTab["BOOKMARKS"] = 2] = "BOOKMARKS";
    /**
     * @generated from protobuf enum value: FOR_LATER_TAB_REMINDERS = 3;
     */
    PreloadedUserSettings_ForLaterTab[PreloadedUserSettings_ForLaterTab["REMINDERS"] = 3] = "REMINDERS";
})(PreloadedUserSettings_ForLaterTab || (exports.PreloadedUserSettings_ForLaterTab = PreloadedUserSettings_ForLaterTab = {}));
/**
 * @generated from protobuf enum discord_protos.discord_users.v1.PreloadedUserSettings.SafetySettingsPresetType
 */
var PreloadedUserSettings_SafetySettingsPresetType;
(function (PreloadedUserSettings_SafetySettingsPresetType) {
    /**
     * @generated from protobuf enum value: SAFETY_SETTINGS_PRESET_TYPE_UNSET_SAFETY_SETTINGS_PRESET = 0;
     */
    PreloadedUserSettings_SafetySettingsPresetType[PreloadedUserSettings_SafetySettingsPresetType["UNSET_SAFETY_SETTINGS_PRESET"] = 0] = "UNSET_SAFETY_SETTINGS_PRESET";
    /**
     * @generated from protobuf enum value: SAFETY_SETTINGS_PRESET_TYPE_BALANCED = 1;
     */
    PreloadedUserSettings_SafetySettingsPresetType[PreloadedUserSettings_SafetySettingsPresetType["BALANCED"] = 1] = "BALANCED";
    /**
     * @generated from protobuf enum value: SAFETY_SETTINGS_PRESET_TYPE_STRICT = 2;
     */
    PreloadedUserSettings_SafetySettingsPresetType[PreloadedUserSettings_SafetySettingsPresetType["STRICT"] = 2] = "STRICT";
    /**
     * @generated from protobuf enum value: SAFETY_SETTINGS_PRESET_TYPE_RELAXED = 3;
     */
    PreloadedUserSettings_SafetySettingsPresetType[PreloadedUserSettings_SafetySettingsPresetType["RELAXED"] = 3] = "RELAXED";
    /**
     * @generated from protobuf enum value: SAFETY_SETTINGS_PRESET_TYPE_CUSTOM = 4;
     */
    PreloadedUserSettings_SafetySettingsPresetType[PreloadedUserSettings_SafetySettingsPresetType["CUSTOM"] = 4] = "CUSTOM";
})(PreloadedUserSettings_SafetySettingsPresetType || (exports.PreloadedUserSettings_SafetySettingsPresetType = PreloadedUserSettings_SafetySettingsPresetType = {}));
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings", [
            { no: 1, name: "versions", kind: "message", T: () => exports.PreloadedUserSettings_Versions },
            { no: 2, name: "inbox", kind: "message", T: () => exports.PreloadedUserSettings_InboxSettings },
            { no: 3, name: "guilds", kind: "message", T: () => exports.PreloadedUserSettings_AllGuildSettings },
            { no: 4, name: "user_content", kind: "message", T: () => exports.PreloadedUserSettings_UserContentSettings },
            { no: 5, name: "voice_and_video", kind: "message", T: () => exports.PreloadedUserSettings_VoiceAndVideoSettings },
            { no: 6, name: "text_and_images", kind: "message", T: () => exports.PreloadedUserSettings_TextAndImagesSettings },
            { no: 7, name: "notifications", kind: "message", T: () => exports.PreloadedUserSettings_NotificationSettings },
            { no: 8, name: "privacy", kind: "message", T: () => exports.PreloadedUserSettings_PrivacySettings },
            { no: 9, name: "debug", kind: "message", T: () => exports.PreloadedUserSettings_DebugSettings },
            { no: 10, name: "game_library", kind: "message", T: () => exports.PreloadedUserSettings_GameLibrarySettings },
            { no: 11, name: "status", kind: "message", T: () => exports.PreloadedUserSettings_StatusSettings },
            { no: 12, name: "localization", kind: "message", T: () => exports.PreloadedUserSettings_LocalizationSettings },
            { no: 13, name: "appearance", kind: "message", T: () => exports.PreloadedUserSettings_AppearanceSettings },
            { no: 14, name: "guild_folders", kind: "message", T: () => exports.PreloadedUserSettings_GuildFolders },
            { no: 15, name: "favorites", kind: "message", T: () => exports.PreloadedUserSettings_Favorites },
            { no: 16, name: "audio_context_settings", kind: "message", T: () => exports.PreloadedUserSettings_AudioSettings },
            { no: 17, name: "communities", kind: "message", T: () => exports.PreloadedUserSettings_CommunitiesSettings },
            { no: 18, name: "broadcast", kind: "message", T: () => exports.PreloadedUserSettings_BroadcastSettings },
            { no: 19, name: "clips", kind: "message", T: () => exports.PreloadedUserSettings_ClipsSettings },
            { no: 20, name: "for_later", kind: "message", T: () => exports.PreloadedUserSettings_ForLaterSettings },
            { no: 21, name: "safety_settings", kind: "message", T: () => exports.PreloadedUserSettings_SafetySettings },
            { no: 22, name: "icymi_settings", kind: "message", T: () => exports.PreloadedUserSettings_ICYMISettings },
            { no: 23, name: "applications", kind: "message", T: () => exports.PreloadedUserSettings_AllApplicationSettings },
            { no: 24, name: "ads", kind: "message", T: () => exports.PreloadedUserSettings_AdsSettings },
            { no: 25, name: "in_app_feedback_settings", kind: "message", T: () => exports.PreloadedUserSettings_InAppFeedbackSettings }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.Versions versions */ 1:
                    message.versions = exports.PreloadedUserSettings_Versions.internalBinaryRead(reader, reader.uint32(), options, message.versions);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.InboxSettings inbox */ 2:
                    message.inbox = exports.PreloadedUserSettings_InboxSettings.internalBinaryRead(reader, reader.uint32(), options, message.inbox);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.AllGuildSettings guilds */ 3:
                    message.guilds = exports.PreloadedUserSettings_AllGuildSettings.internalBinaryRead(reader, reader.uint32(), options, message.guilds);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.UserContentSettings user_content */ 4:
                    message.userContent = exports.PreloadedUserSettings_UserContentSettings.internalBinaryRead(reader, reader.uint32(), options, message.userContent);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.VoiceAndVideoSettings voice_and_video */ 5:
                    message.voiceAndVideo = exports.PreloadedUserSettings_VoiceAndVideoSettings.internalBinaryRead(reader, reader.uint32(), options, message.voiceAndVideo);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.TextAndImagesSettings text_and_images */ 6:
                    message.textAndImages = exports.PreloadedUserSettings_TextAndImagesSettings.internalBinaryRead(reader, reader.uint32(), options, message.textAndImages);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.NotificationSettings notifications */ 7:
                    message.notifications = exports.PreloadedUserSettings_NotificationSettings.internalBinaryRead(reader, reader.uint32(), options, message.notifications);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PrivacySettings privacy */ 8:
                    message.privacy = exports.PreloadedUserSettings_PrivacySettings.internalBinaryRead(reader, reader.uint32(), options, message.privacy);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.DebugSettings debug */ 9:
                    message.debug = exports.PreloadedUserSettings_DebugSettings.internalBinaryRead(reader, reader.uint32(), options, message.debug);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.GameLibrarySettings game_library */ 10:
                    message.gameLibrary = exports.PreloadedUserSettings_GameLibrarySettings.internalBinaryRead(reader, reader.uint32(), options, message.gameLibrary);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.StatusSettings status */ 11:
                    message.status = exports.PreloadedUserSettings_StatusSettings.internalBinaryRead(reader, reader.uint32(), options, message.status);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.LocalizationSettings localization */ 12:
                    message.localization = exports.PreloadedUserSettings_LocalizationSettings.internalBinaryRead(reader, reader.uint32(), options, message.localization);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.AppearanceSettings appearance */ 13:
                    message.appearance = exports.PreloadedUserSettings_AppearanceSettings.internalBinaryRead(reader, reader.uint32(), options, message.appearance);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.GuildFolders guild_folders */ 14:
                    message.guildFolders = exports.PreloadedUserSettings_GuildFolders.internalBinaryRead(reader, reader.uint32(), options, message.guildFolders);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.Favorites favorites */ 15:
                    message.favorites = exports.PreloadedUserSettings_Favorites.internalBinaryRead(reader, reader.uint32(), options, message.favorites);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.AudioSettings audio_context_settings */ 16:
                    message.audioContextSettings = exports.PreloadedUserSettings_AudioSettings.internalBinaryRead(reader, reader.uint32(), options, message.audioContextSettings);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.CommunitiesSettings communities */ 17:
                    message.communities = exports.PreloadedUserSettings_CommunitiesSettings.internalBinaryRead(reader, reader.uint32(), options, message.communities);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.BroadcastSettings broadcast */ 18:
                    message.broadcast = exports.PreloadedUserSettings_BroadcastSettings.internalBinaryRead(reader, reader.uint32(), options, message.broadcast);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.ClipsSettings clips */ 19:
                    message.clips = exports.PreloadedUserSettings_ClipsSettings.internalBinaryRead(reader, reader.uint32(), options, message.clips);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.ForLaterSettings for_later */ 20:
                    message.forLater = exports.PreloadedUserSettings_ForLaterSettings.internalBinaryRead(reader, reader.uint32(), options, message.forLater);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.SafetySettings safety_settings */ 21:
                    message.safetySettings = exports.PreloadedUserSettings_SafetySettings.internalBinaryRead(reader, reader.uint32(), options, message.safetySettings);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.ICYMISettings icymi_settings */ 22:
                    message.icymiSettings = exports.PreloadedUserSettings_ICYMISettings.internalBinaryRead(reader, reader.uint32(), options, message.icymiSettings);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.AllApplicationSettings applications */ 23:
                    message.applications = exports.PreloadedUserSettings_AllApplicationSettings.internalBinaryRead(reader, reader.uint32(), options, message.applications);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.AdsSettings ads */ 24:
                    message.ads = exports.PreloadedUserSettings_AdsSettings.internalBinaryRead(reader, reader.uint32(), options, message.ads);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.InAppFeedbackSettings in_app_feedback_settings */ 25:
                    message.inAppFeedbackSettings = exports.PreloadedUserSettings_InAppFeedbackSettings.internalBinaryRead(reader, reader.uint32(), options, message.inAppFeedbackSettings);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.Versions versions = 1; */
        if (message.versions)
            exports.PreloadedUserSettings_Versions.internalBinaryWrite(message.versions, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.InboxSettings inbox = 2; */
        if (message.inbox)
            exports.PreloadedUserSettings_InboxSettings.internalBinaryWrite(message.inbox, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.AllGuildSettings guilds = 3; */
        if (message.guilds)
            exports.PreloadedUserSettings_AllGuildSettings.internalBinaryWrite(message.guilds, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.UserContentSettings user_content = 4; */
        if (message.userContent)
            exports.PreloadedUserSettings_UserContentSettings.internalBinaryWrite(message.userContent, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.VoiceAndVideoSettings voice_and_video = 5; */
        if (message.voiceAndVideo)
            exports.PreloadedUserSettings_VoiceAndVideoSettings.internalBinaryWrite(message.voiceAndVideo, writer.tag(5, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.TextAndImagesSettings text_and_images = 6; */
        if (message.textAndImages)
            exports.PreloadedUserSettings_TextAndImagesSettings.internalBinaryWrite(message.textAndImages, writer.tag(6, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.NotificationSettings notifications = 7; */
        if (message.notifications)
            exports.PreloadedUserSettings_NotificationSettings.internalBinaryWrite(message.notifications, writer.tag(7, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.PrivacySettings privacy = 8; */
        if (message.privacy)
            exports.PreloadedUserSettings_PrivacySettings.internalBinaryWrite(message.privacy, writer.tag(8, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.DebugSettings debug = 9; */
        if (message.debug)
            exports.PreloadedUserSettings_DebugSettings.internalBinaryWrite(message.debug, writer.tag(9, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.GameLibrarySettings game_library = 10; */
        if (message.gameLibrary)
            exports.PreloadedUserSettings_GameLibrarySettings.internalBinaryWrite(message.gameLibrary, writer.tag(10, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.StatusSettings status = 11; */
        if (message.status)
            exports.PreloadedUserSettings_StatusSettings.internalBinaryWrite(message.status, writer.tag(11, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.LocalizationSettings localization = 12; */
        if (message.localization)
            exports.PreloadedUserSettings_LocalizationSettings.internalBinaryWrite(message.localization, writer.tag(12, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.AppearanceSettings appearance = 13; */
        if (message.appearance)
            exports.PreloadedUserSettings_AppearanceSettings.internalBinaryWrite(message.appearance, writer.tag(13, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.GuildFolders guild_folders = 14; */
        if (message.guildFolders)
            exports.PreloadedUserSettings_GuildFolders.internalBinaryWrite(message.guildFolders, writer.tag(14, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.Favorites favorites = 15; */
        if (message.favorites)
            exports.PreloadedUserSettings_Favorites.internalBinaryWrite(message.favorites, writer.tag(15, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.AudioSettings audio_context_settings = 16; */
        if (message.audioContextSettings)
            exports.PreloadedUserSettings_AudioSettings.internalBinaryWrite(message.audioContextSettings, writer.tag(16, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.CommunitiesSettings communities = 17; */
        if (message.communities)
            exports.PreloadedUserSettings_CommunitiesSettings.internalBinaryWrite(message.communities, writer.tag(17, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.BroadcastSettings broadcast = 18; */
        if (message.broadcast)
            exports.PreloadedUserSettings_BroadcastSettings.internalBinaryWrite(message.broadcast, writer.tag(18, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.ClipsSettings clips = 19; */
        if (message.clips)
            exports.PreloadedUserSettings_ClipsSettings.internalBinaryWrite(message.clips, writer.tag(19, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.ForLaterSettings for_later = 20; */
        if (message.forLater)
            exports.PreloadedUserSettings_ForLaterSettings.internalBinaryWrite(message.forLater, writer.tag(20, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.SafetySettings safety_settings = 21; */
        if (message.safetySettings)
            exports.PreloadedUserSettings_SafetySettings.internalBinaryWrite(message.safetySettings, writer.tag(21, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.ICYMISettings icymi_settings = 22; */
        if (message.icymiSettings)
            exports.PreloadedUserSettings_ICYMISettings.internalBinaryWrite(message.icymiSettings, writer.tag(22, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.AllApplicationSettings applications = 23; */
        if (message.applications)
            exports.PreloadedUserSettings_AllApplicationSettings.internalBinaryWrite(message.applications, writer.tag(23, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.AdsSettings ads = 24; */
        if (message.ads)
            exports.PreloadedUserSettings_AdsSettings.internalBinaryWrite(message.ads, writer.tag(24, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.InAppFeedbackSettings in_app_feedback_settings = 25; */
        if (message.inAppFeedbackSettings)
            exports.PreloadedUserSettings_InAppFeedbackSettings.internalBinaryWrite(message.inAppFeedbackSettings, writer.tag(25, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings
 */
exports.PreloadedUserSettings = new PreloadedUserSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_Versions$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.Versions", [
            { no: 1, name: "client_version", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 2, name: "server_version", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 3, name: "data_version", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.clientVersion = 0;
        message.serverVersion = 0;
        message.dataVersion = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint32 client_version */ 1:
                    message.clientVersion = reader.uint32();
                    break;
                case /* uint32 server_version */ 2:
                    message.serverVersion = reader.uint32();
                    break;
                case /* uint32 data_version */ 3:
                    message.dataVersion = reader.uint32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* uint32 client_version = 1; */
        if (message.clientVersion !== 0)
            writer.tag(1, runtime_1.WireType.Varint).uint32(message.clientVersion);
        /* uint32 server_version = 2; */
        if (message.serverVersion !== 0)
            writer.tag(2, runtime_1.WireType.Varint).uint32(message.serverVersion);
        /* uint32 data_version = 3; */
        if (message.dataVersion !== 0)
            writer.tag(3, runtime_1.WireType.Varint).uint32(message.dataVersion);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.Versions
 */
exports.PreloadedUserSettings_Versions = new PreloadedUserSettings_Versions$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_InboxSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.InboxSettings", [
            { no: 1, name: "current_tab", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.InboxTab", PreloadedUserSettings_InboxTab, "INBOX_TAB_"] },
            { no: 2, name: "viewed_tutorial", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.currentTab = 0;
        message.viewedTutorial = false;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.InboxTab current_tab */ 1:
                    message.currentTab = reader.int32();
                    break;
                case /* bool viewed_tutorial */ 2:
                    message.viewedTutorial = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* discord_protos.discord_users.v1.PreloadedUserSettings.InboxTab current_tab = 1; */
        if (message.currentTab !== 0)
            writer.tag(1, runtime_1.WireType.Varint).int32(message.currentTab);
        /* bool viewed_tutorial = 2; */
        if (message.viewedTutorial !== false)
            writer.tag(2, runtime_1.WireType.Varint).bool(message.viewedTutorial);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.InboxSettings
 */
exports.PreloadedUserSettings_InboxSettings = new PreloadedUserSettings_InboxSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_ChannelIconEmoji$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.ChannelIconEmoji", [
            { no: 1, name: "id", kind: "message", T: () => wrappers_7.UInt64Value },
            { no: 2, name: "name", kind: "message", T: () => wrappers_6.StringValue },
            { no: 3, name: "color", kind: "message", T: () => wrappers_7.UInt64Value }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.UInt64Value id */ 1:
                    message.id = wrappers_7.UInt64Value.internalBinaryRead(reader, reader.uint32(), options, message.id);
                    break;
                case /* optional google.protobuf.StringValue name */ 2:
                    message.name = wrappers_6.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.name);
                    break;
                case /* optional google.protobuf.UInt64Value color */ 3:
                    message.color = wrappers_7.UInt64Value.internalBinaryRead(reader, reader.uint32(), options, message.color);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional google.protobuf.UInt64Value id = 1; */
        if (message.id)
            wrappers_7.UInt64Value.internalBinaryWrite(message.id, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.StringValue name = 2; */
        if (message.name)
            wrappers_6.StringValue.internalBinaryWrite(message.name, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.UInt64Value color = 3; */
        if (message.color)
            wrappers_7.UInt64Value.internalBinaryWrite(message.color, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.ChannelIconEmoji
 */
exports.PreloadedUserSettings_ChannelIconEmoji = new PreloadedUserSettings_ChannelIconEmoji$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_CustomNotificationSoundConfig$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.CustomNotificationSoundConfig", [
            { no: 1, name: "notification_sound_pack_id", kind: "message", T: () => wrappers_6.StringValue }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.StringValue notification_sound_pack_id */ 1:
                    message.notificationSoundPackId = wrappers_6.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.notificationSoundPackId);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional google.protobuf.StringValue notification_sound_pack_id = 1; */
        if (message.notificationSoundPackId)
            wrappers_6.StringValue.internalBinaryWrite(message.notificationSoundPackId, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.CustomNotificationSoundConfig
 */
exports.PreloadedUserSettings_CustomNotificationSoundConfig = new PreloadedUserSettings_CustomNotificationSoundConfig$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_ChannelSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.ChannelSettings", [
            { no: 1, name: "collapsed_in_inbox", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "icon_emoji", kind: "message", T: () => exports.PreloadedUserSettings_ChannelIconEmoji },
            { no: 3, name: "custom_notification_sound_config", kind: "message", T: () => exports.PreloadedUserSettings_CustomNotificationSoundConfig }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.collapsedInInbox = false;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool collapsed_in_inbox */ 1:
                    message.collapsedInInbox = reader.bool();
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.ChannelIconEmoji icon_emoji */ 2:
                    message.iconEmoji = exports.PreloadedUserSettings_ChannelIconEmoji.internalBinaryRead(reader, reader.uint32(), options, message.iconEmoji);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.CustomNotificationSoundConfig custom_notification_sound_config */ 3:
                    message.customNotificationSoundConfig = exports.PreloadedUserSettings_CustomNotificationSoundConfig.internalBinaryRead(reader, reader.uint32(), options, message.customNotificationSoundConfig);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* bool collapsed_in_inbox = 1; */
        if (message.collapsedInInbox !== false)
            writer.tag(1, runtime_1.WireType.Varint).bool(message.collapsedInInbox);
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.ChannelIconEmoji icon_emoji = 2; */
        if (message.iconEmoji)
            exports.PreloadedUserSettings_ChannelIconEmoji.internalBinaryWrite(message.iconEmoji, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.CustomNotificationSoundConfig custom_notification_sound_config = 3; */
        if (message.customNotificationSoundConfig)
            exports.PreloadedUserSettings_CustomNotificationSoundConfig.internalBinaryWrite(message.customNotificationSoundConfig, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.ChannelSettings
 */
exports.PreloadedUserSettings_ChannelSettings = new PreloadedUserSettings_ChannelSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_CustomCallSound$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.CustomCallSound", [
            { no: 1, name: "sound_id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 2, name: "guild_id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.soundId = 0n;
        message.guildId = 0n;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* fixed64 sound_id */ 1:
                    message.soundId = reader.fixed64().toBigInt();
                    break;
                case /* fixed64 guild_id */ 2:
                    message.guildId = reader.fixed64().toBigInt();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* fixed64 sound_id = 1; */
        if (message.soundId !== 0n)
            writer.tag(1, runtime_1.WireType.Bit64).fixed64(message.soundId);
        /* fixed64 guild_id = 2; */
        if (message.guildId !== 0n)
            writer.tag(2, runtime_1.WireType.Bit64).fixed64(message.guildId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.CustomCallSound
 */
exports.PreloadedUserSettings_CustomCallSound = new PreloadedUserSettings_CustomCallSound$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_ChannelListSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.ChannelListSettings", [
            { no: 1, name: "layout", kind: "message", T: () => wrappers_6.StringValue },
            { no: 2, name: "message_previews", kind: "message", T: () => wrappers_6.StringValue }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.StringValue layout */ 1:
                    message.layout = wrappers_6.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.layout);
                    break;
                case /* optional google.protobuf.StringValue message_previews */ 2:
                    message.messagePreviews = wrappers_6.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.messagePreviews);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional google.protobuf.StringValue layout = 1; */
        if (message.layout)
            wrappers_6.StringValue.internalBinaryWrite(message.layout, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.StringValue message_previews = 2; */
        if (message.messagePreviews)
            wrappers_6.StringValue.internalBinaryWrite(message.messagePreviews, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.ChannelListSettings
 */
exports.PreloadedUserSettings_ChannelListSettings = new PreloadedUserSettings_ChannelListSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_GuildDismissibleContentState$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.GuildDismissibleContentState", [
            { no: 1, name: "dismissed", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "last_dismissed_version", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 3, name: "last_dismissed_at_ms", kind: "scalar", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 4, name: "last_dismissed_object_id", kind: "scalar", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 5, name: "num_times_dismissed", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.dismissed = false;
        message.lastDismissedVersion = 0;
        message.lastDismissedAtMs = 0n;
        message.lastDismissedObjectId = 0n;
        message.numTimesDismissed = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool dismissed */ 1:
                    message.dismissed = reader.bool();
                    break;
                case /* uint32 last_dismissed_version */ 2:
                    message.lastDismissedVersion = reader.uint32();
                    break;
                case /* uint64 last_dismissed_at_ms */ 3:
                    message.lastDismissedAtMs = reader.uint64().toBigInt();
                    break;
                case /* uint64 last_dismissed_object_id */ 4:
                    message.lastDismissedObjectId = reader.uint64().toBigInt();
                    break;
                case /* uint32 num_times_dismissed */ 5:
                    message.numTimesDismissed = reader.uint32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* bool dismissed = 1; */
        if (message.dismissed !== false)
            writer.tag(1, runtime_1.WireType.Varint).bool(message.dismissed);
        /* uint32 last_dismissed_version = 2; */
        if (message.lastDismissedVersion !== 0)
            writer.tag(2, runtime_1.WireType.Varint).uint32(message.lastDismissedVersion);
        /* uint64 last_dismissed_at_ms = 3; */
        if (message.lastDismissedAtMs !== 0n)
            writer.tag(3, runtime_1.WireType.Varint).uint64(message.lastDismissedAtMs);
        /* uint64 last_dismissed_object_id = 4; */
        if (message.lastDismissedObjectId !== 0n)
            writer.tag(4, runtime_1.WireType.Varint).uint64(message.lastDismissedObjectId);
        /* uint32 num_times_dismissed = 5; */
        if (message.numTimesDismissed !== 0)
            writer.tag(5, runtime_1.WireType.Varint).uint32(message.numTimesDismissed);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.GuildDismissibleContentState
 */
exports.PreloadedUserSettings_GuildDismissibleContentState = new PreloadedUserSettings_GuildDismissibleContentState$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_GuildSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.GuildSettings", [
            { no: 1, name: "channels", kind: "map", K: 6 /*ScalarType.FIXED64*/, V: { kind: "message", T: () => exports.PreloadedUserSettings_ChannelSettings } },
            { no: 2, name: "hub_progress", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 3, name: "guild_onboarding_progress", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 4, name: "guild_recents_dismissed_at", kind: "message", T: () => timestamp_1.Timestamp },
            { no: 5, name: "dismissed_guild_content", kind: "scalar", T: 12 /*ScalarType.BYTES*/ },
            { no: 6, name: "join_sound", kind: "message", T: () => exports.PreloadedUserSettings_CustomCallSound },
            { no: 7, name: "mobile_redesign_channel_list_settings", kind: "message", T: () => exports.PreloadedUserSettings_ChannelListSettings },
            { no: 8, name: "disable_raid_alert_push", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 9, name: "disable_raid_alert_nag", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 10, name: "custom_notification_sound_config", kind: "message", T: () => exports.PreloadedUserSettings_CustomNotificationSoundConfig },
            { no: 11, name: "leaderboards_disabled", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 12, name: "guild_dismissible_content_states", kind: "map", K: 5 /*ScalarType.INT32*/, V: { kind: "message", T: () => exports.PreloadedUserSettings_GuildDismissibleContentState } }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.channels = {};
        message.hubProgress = 0;
        message.guildOnboardingProgress = 0;
        message.dismissedGuildContent = new Uint8Array(0);
        message.disableRaidAlertPush = false;
        message.disableRaidAlertNag = false;
        message.leaderboardsDisabled = false;
        message.guildDismissibleContentStates = {};
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.ChannelSettings> channels */ 1:
                    this.binaryReadMap1(message.channels, reader, options);
                    break;
                case /* uint32 hub_progress */ 2:
                    message.hubProgress = reader.uint32();
                    break;
                case /* uint32 guild_onboarding_progress */ 3:
                    message.guildOnboardingProgress = reader.uint32();
                    break;
                case /* optional google.protobuf.Timestamp guild_recents_dismissed_at */ 4:
                    message.guildRecentsDismissedAt = timestamp_1.Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.guildRecentsDismissedAt);
                    break;
                case /* bytes dismissed_guild_content */ 5:
                    message.dismissedGuildContent = reader.bytes();
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.CustomCallSound join_sound */ 6:
                    message.joinSound = exports.PreloadedUserSettings_CustomCallSound.internalBinaryRead(reader, reader.uint32(), options, message.joinSound);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.ChannelListSettings mobile_redesign_channel_list_settings */ 7:
                    message.mobileRedesignChannelListSettings = exports.PreloadedUserSettings_ChannelListSettings.internalBinaryRead(reader, reader.uint32(), options, message.mobileRedesignChannelListSettings);
                    break;
                case /* bool disable_raid_alert_push */ 8:
                    message.disableRaidAlertPush = reader.bool();
                    break;
                case /* bool disable_raid_alert_nag */ 9:
                    message.disableRaidAlertNag = reader.bool();
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.CustomNotificationSoundConfig custom_notification_sound_config */ 10:
                    message.customNotificationSoundConfig = exports.PreloadedUserSettings_CustomNotificationSoundConfig.internalBinaryRead(reader, reader.uint32(), options, message.customNotificationSoundConfig);
                    break;
                case /* bool leaderboards_disabled */ 11:
                    message.leaderboardsDisabled = reader.bool();
                    break;
                case /* map<int32, discord_protos.discord_users.v1.PreloadedUserSettings.GuildDismissibleContentState> guild_dismissible_content_states */ 12:
                    this.binaryReadMap12(message.guildDismissibleContentStates, reader, options);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    binaryReadMap1(map, reader, options) {
        let len = reader.uint32(), end = reader.pos + len, key, val;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.fixed64().toString();
                    break;
                case 2:
                    val = exports.PreloadedUserSettings_ChannelSettings.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for discord_protos.discord_users.v1.PreloadedUserSettings.GuildSettings.channels");
            }
        }
        map[key ?? "0"] = val ?? exports.PreloadedUserSettings_ChannelSettings.create();
    }
    binaryReadMap12(map, reader, options) {
        let len = reader.uint32(), end = reader.pos + len, key, val;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.int32();
                    break;
                case 2:
                    val = exports.PreloadedUserSettings_GuildDismissibleContentState.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for discord_protos.discord_users.v1.PreloadedUserSettings.GuildSettings.guild_dismissible_content_states");
            }
        }
        map[key ?? 0] = val ?? exports.PreloadedUserSettings_GuildDismissibleContentState.create();
    }
    internalBinaryWrite(message, writer, options) {
        /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.ChannelSettings> channels = 1; */
        for (let k of globalThis.Object.keys(message.channels)) {
            writer.tag(1, runtime_1.WireType.LengthDelimited).fork().tag(1, runtime_1.WireType.Bit64).fixed64(k);
            writer.tag(2, runtime_1.WireType.LengthDelimited).fork();
            exports.PreloadedUserSettings_ChannelSettings.internalBinaryWrite(message.channels[k], writer, options);
            writer.join().join();
        }
        /* uint32 hub_progress = 2; */
        if (message.hubProgress !== 0)
            writer.tag(2, runtime_1.WireType.Varint).uint32(message.hubProgress);
        /* uint32 guild_onboarding_progress = 3; */
        if (message.guildOnboardingProgress !== 0)
            writer.tag(3, runtime_1.WireType.Varint).uint32(message.guildOnboardingProgress);
        /* optional google.protobuf.Timestamp guild_recents_dismissed_at = 4; */
        if (message.guildRecentsDismissedAt)
            timestamp_1.Timestamp.internalBinaryWrite(message.guildRecentsDismissedAt, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* bytes dismissed_guild_content = 5; */
        if (message.dismissedGuildContent.length)
            writer.tag(5, runtime_1.WireType.LengthDelimited).bytes(message.dismissedGuildContent);
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.CustomCallSound join_sound = 6; */
        if (message.joinSound)
            exports.PreloadedUserSettings_CustomCallSound.internalBinaryWrite(message.joinSound, writer.tag(6, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.ChannelListSettings mobile_redesign_channel_list_settings = 7; */
        if (message.mobileRedesignChannelListSettings)
            exports.PreloadedUserSettings_ChannelListSettings.internalBinaryWrite(message.mobileRedesignChannelListSettings, writer.tag(7, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* bool disable_raid_alert_push = 8; */
        if (message.disableRaidAlertPush !== false)
            writer.tag(8, runtime_1.WireType.Varint).bool(message.disableRaidAlertPush);
        /* bool disable_raid_alert_nag = 9; */
        if (message.disableRaidAlertNag !== false)
            writer.tag(9, runtime_1.WireType.Varint).bool(message.disableRaidAlertNag);
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.CustomNotificationSoundConfig custom_notification_sound_config = 10; */
        if (message.customNotificationSoundConfig)
            exports.PreloadedUserSettings_CustomNotificationSoundConfig.internalBinaryWrite(message.customNotificationSoundConfig, writer.tag(10, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* bool leaderboards_disabled = 11; */
        if (message.leaderboardsDisabled !== false)
            writer.tag(11, runtime_1.WireType.Varint).bool(message.leaderboardsDisabled);
        /* map<int32, discord_protos.discord_users.v1.PreloadedUserSettings.GuildDismissibleContentState> guild_dismissible_content_states = 12; */
        for (let k of globalThis.Object.keys(message.guildDismissibleContentStates)) {
            writer.tag(12, runtime_1.WireType.LengthDelimited).fork().tag(1, runtime_1.WireType.Varint).int32(parseInt(k));
            writer.tag(2, runtime_1.WireType.LengthDelimited).fork();
            exports.PreloadedUserSettings_GuildDismissibleContentState.internalBinaryWrite(message.guildDismissibleContentStates[k], writer, options);
            writer.join().join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.GuildSettings
 */
exports.PreloadedUserSettings_GuildSettings = new PreloadedUserSettings_GuildSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_AllGuildSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.AllGuildSettings", [
            { no: 1, name: "guilds", kind: "map", K: 6 /*ScalarType.FIXED64*/, V: { kind: "message", T: () => exports.PreloadedUserSettings_GuildSettings } }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.guilds = {};
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.GuildSettings> guilds */ 1:
                    this.binaryReadMap1(message.guilds, reader, options);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    binaryReadMap1(map, reader, options) {
        let len = reader.uint32(), end = reader.pos + len, key, val;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.fixed64().toString();
                    break;
                case 2:
                    val = exports.PreloadedUserSettings_GuildSettings.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for discord_protos.discord_users.v1.PreloadedUserSettings.AllGuildSettings.guilds");
            }
        }
        map[key ?? "0"] = val ?? exports.PreloadedUserSettings_GuildSettings.create();
    }
    internalBinaryWrite(message, writer, options) {
        /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.GuildSettings> guilds = 1; */
        for (let k of globalThis.Object.keys(message.guilds)) {
            writer.tag(1, runtime_1.WireType.LengthDelimited).fork().tag(1, runtime_1.WireType.Bit64).fixed64(k);
            writer.tag(2, runtime_1.WireType.LengthDelimited).fork();
            exports.PreloadedUserSettings_GuildSettings.internalBinaryWrite(message.guilds[k], writer, options);
            writer.join().join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.AllGuildSettings
 */
exports.PreloadedUserSettings_AllGuildSettings = new PreloadedUserSettings_AllGuildSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_RecurringDismissibleContentState$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.RecurringDismissibleContentState", [
            { no: 1, name: "last_dismissed_version", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 2, name: "last_dismissed_at_ms", kind: "scalar", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 3, name: "last_dismissed_object_id", kind: "scalar", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 4, name: "num_times_dismissed", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.lastDismissedVersion = 0;
        message.lastDismissedAtMs = 0n;
        message.lastDismissedObjectId = 0n;
        message.numTimesDismissed = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint32 last_dismissed_version */ 1:
                    message.lastDismissedVersion = reader.uint32();
                    break;
                case /* uint64 last_dismissed_at_ms */ 2:
                    message.lastDismissedAtMs = reader.uint64().toBigInt();
                    break;
                case /* uint64 last_dismissed_object_id */ 3:
                    message.lastDismissedObjectId = reader.uint64().toBigInt();
                    break;
                case /* uint32 num_times_dismissed */ 4:
                    message.numTimesDismissed = reader.uint32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* uint32 last_dismissed_version = 1; */
        if (message.lastDismissedVersion !== 0)
            writer.tag(1, runtime_1.WireType.Varint).uint32(message.lastDismissedVersion);
        /* uint64 last_dismissed_at_ms = 2; */
        if (message.lastDismissedAtMs !== 0n)
            writer.tag(2, runtime_1.WireType.Varint).uint64(message.lastDismissedAtMs);
        /* uint64 last_dismissed_object_id = 3; */
        if (message.lastDismissedObjectId !== 0n)
            writer.tag(3, runtime_1.WireType.Varint).uint64(message.lastDismissedObjectId);
        /* uint32 num_times_dismissed = 4; */
        if (message.numTimesDismissed !== 0)
            writer.tag(4, runtime_1.WireType.Varint).uint32(message.numTimesDismissed);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.RecurringDismissibleContentState
 */
exports.PreloadedUserSettings_RecurringDismissibleContentState = new PreloadedUserSettings_RecurringDismissibleContentState$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_UserContentSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.UserContentSettings", [
            { no: 1, name: "dismissed_contents", kind: "scalar", T: 12 /*ScalarType.BYTES*/ },
            { no: 2, name: "last_dismissed_outbound_promotion_start_date", kind: "message", T: () => wrappers_6.StringValue },
            { no: 3, name: "premium_tier_0_modal_dismissed_at", kind: "message", T: () => timestamp_1.Timestamp },
            { no: 4, name: "guild_onboarding_upsell_dismissed_at", kind: "message", T: () => timestamp_1.Timestamp },
            { no: 5, name: "safety_user_sentiment_notice_dismissed_at", kind: "message", T: () => timestamp_1.Timestamp },
            { no: 6, name: "last_received_changelog_id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 7, name: "recurring_dismissible_content_states", kind: "map", K: 5 /*ScalarType.INT32*/, V: { kind: "message", T: () => exports.PreloadedUserSettings_RecurringDismissibleContentState } }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.dismissedContents = new Uint8Array(0);
        message.lastReceivedChangelogId = 0n;
        message.recurringDismissibleContentStates = {};
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bytes dismissed_contents */ 1:
                    message.dismissedContents = reader.bytes();
                    break;
                case /* optional google.protobuf.StringValue last_dismissed_outbound_promotion_start_date */ 2:
                    message.lastDismissedOutboundPromotionStartDate = wrappers_6.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.lastDismissedOutboundPromotionStartDate);
                    break;
                case /* optional google.protobuf.Timestamp premium_tier_0_modal_dismissed_at */ 3:
                    message.premiumTier0ModalDismissedAt = timestamp_1.Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.premiumTier0ModalDismissedAt);
                    break;
                case /* optional google.protobuf.Timestamp guild_onboarding_upsell_dismissed_at */ 4:
                    message.guildOnboardingUpsellDismissedAt = timestamp_1.Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.guildOnboardingUpsellDismissedAt);
                    break;
                case /* optional google.protobuf.Timestamp safety_user_sentiment_notice_dismissed_at */ 5:
                    message.safetyUserSentimentNoticeDismissedAt = timestamp_1.Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.safetyUserSentimentNoticeDismissedAt);
                    break;
                case /* fixed64 last_received_changelog_id */ 6:
                    message.lastReceivedChangelogId = reader.fixed64().toBigInt();
                    break;
                case /* map<int32, discord_protos.discord_users.v1.PreloadedUserSettings.RecurringDismissibleContentState> recurring_dismissible_content_states */ 7:
                    this.binaryReadMap7(message.recurringDismissibleContentStates, reader, options);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    binaryReadMap7(map, reader, options) {
        let len = reader.uint32(), end = reader.pos + len, key, val;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.int32();
                    break;
                case 2:
                    val = exports.PreloadedUserSettings_RecurringDismissibleContentState.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for discord_protos.discord_users.v1.PreloadedUserSettings.UserContentSettings.recurring_dismissible_content_states");
            }
        }
        map[key ?? 0] = val ?? exports.PreloadedUserSettings_RecurringDismissibleContentState.create();
    }
    internalBinaryWrite(message, writer, options) {
        /* bytes dismissed_contents = 1; */
        if (message.dismissedContents.length)
            writer.tag(1, runtime_1.WireType.LengthDelimited).bytes(message.dismissedContents);
        /* optional google.protobuf.StringValue last_dismissed_outbound_promotion_start_date = 2; */
        if (message.lastDismissedOutboundPromotionStartDate)
            wrappers_6.StringValue.internalBinaryWrite(message.lastDismissedOutboundPromotionStartDate, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.Timestamp premium_tier_0_modal_dismissed_at = 3; */
        if (message.premiumTier0ModalDismissedAt)
            timestamp_1.Timestamp.internalBinaryWrite(message.premiumTier0ModalDismissedAt, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.Timestamp guild_onboarding_upsell_dismissed_at = 4; */
        if (message.guildOnboardingUpsellDismissedAt)
            timestamp_1.Timestamp.internalBinaryWrite(message.guildOnboardingUpsellDismissedAt, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.Timestamp safety_user_sentiment_notice_dismissed_at = 5; */
        if (message.safetyUserSentimentNoticeDismissedAt)
            timestamp_1.Timestamp.internalBinaryWrite(message.safetyUserSentimentNoticeDismissedAt, writer.tag(5, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* fixed64 last_received_changelog_id = 6; */
        if (message.lastReceivedChangelogId !== 0n)
            writer.tag(6, runtime_1.WireType.Bit64).fixed64(message.lastReceivedChangelogId);
        /* map<int32, discord_protos.discord_users.v1.PreloadedUserSettings.RecurringDismissibleContentState> recurring_dismissible_content_states = 7; */
        for (let k of globalThis.Object.keys(message.recurringDismissibleContentStates)) {
            writer.tag(7, runtime_1.WireType.LengthDelimited).fork().tag(1, runtime_1.WireType.Varint).int32(parseInt(k));
            writer.tag(2, runtime_1.WireType.LengthDelimited).fork();
            exports.PreloadedUserSettings_RecurringDismissibleContentState.internalBinaryWrite(message.recurringDismissibleContentStates[k], writer, options);
            writer.join().join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.UserContentSettings
 */
exports.PreloadedUserSettings_UserContentSettings = new PreloadedUserSettings_UserContentSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_VideoFilterBackgroundBlur$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.VideoFilterBackgroundBlur", [
            { no: 1, name: "use_blur", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.useBlur = false;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool use_blur */ 1:
                    message.useBlur = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* bool use_blur = 1; */
        if (message.useBlur !== false)
            writer.tag(1, runtime_1.WireType.Varint).bool(message.useBlur);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.VideoFilterBackgroundBlur
 */
exports.PreloadedUserSettings_VideoFilterBackgroundBlur = new PreloadedUserSettings_VideoFilterBackgroundBlur$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_VideoFilterAsset$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.VideoFilterAsset", [
            { no: 1, name: "id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 2, name: "asset_hash", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.id = 0n;
        message.assetHash = "";
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* fixed64 id */ 1:
                    message.id = reader.fixed64().toBigInt();
                    break;
                case /* string asset_hash */ 2:
                    message.assetHash = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* fixed64 id = 1; */
        if (message.id !== 0n)
            writer.tag(1, runtime_1.WireType.Bit64).fixed64(message.id);
        /* string asset_hash = 2; */
        if (message.assetHash !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.assetHash);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.VideoFilterAsset
 */
exports.PreloadedUserSettings_VideoFilterAsset = new PreloadedUserSettings_VideoFilterAsset$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_SoundboardSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.SoundboardSettings", [
            { no: 1, name: "volume", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.volume = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* float volume */ 1:
                    message.volume = reader.float();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* float volume = 1; */
        if (message.volume !== 0)
            writer.tag(1, runtime_1.WireType.Bit32).float(message.volume);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.SoundboardSettings
 */
exports.PreloadedUserSettings_SoundboardSettings = new PreloadedUserSettings_SoundboardSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_VoiceAndVideoSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.VoiceAndVideoSettings", [
            { no: 1, name: "blur", kind: "message", oneof: "videoBackgroundFilterDesktop", T: () => exports.PreloadedUserSettings_VideoFilterBackgroundBlur },
            { no: 2, name: "preset_option", kind: "scalar", oneof: "videoBackgroundFilterDesktop", T: 13 /*ScalarType.UINT32*/ },
            { no: 3, name: "custom_asset", kind: "message", oneof: "videoBackgroundFilterDesktop", T: () => exports.PreloadedUserSettings_VideoFilterAsset },
            { no: 5, name: "always_preview_video", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 6, name: "afk_timeout", kind: "message", T: () => wrappers_4.UInt32Value },
            { no: 7, name: "stream_notifications_enabled", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 8, name: "native_phone_integration_enabled", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 9, name: "soundboard_settings", kind: "message", T: () => exports.PreloadedUserSettings_SoundboardSettings },
            { no: 10, name: "disable_stream_previews", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 11, name: "soundmoji_volume", kind: "message", T: () => wrappers_3.FloatValue }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.videoBackgroundFilterDesktop = { oneofKind: undefined };
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.VideoFilterBackgroundBlur blur */ 1:
                    message.videoBackgroundFilterDesktop = {
                        oneofKind: "blur",
                        blur: exports.PreloadedUserSettings_VideoFilterBackgroundBlur.internalBinaryRead(reader, reader.uint32(), options, message.videoBackgroundFilterDesktop.blur)
                    };
                    break;
                case /* uint32 preset_option */ 2:
                    message.videoBackgroundFilterDesktop = {
                        oneofKind: "presetOption",
                        presetOption: reader.uint32()
                    };
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.VideoFilterAsset custom_asset */ 3:
                    message.videoBackgroundFilterDesktop = {
                        oneofKind: "customAsset",
                        customAsset: exports.PreloadedUserSettings_VideoFilterAsset.internalBinaryRead(reader, reader.uint32(), options, message.videoBackgroundFilterDesktop.customAsset)
                    };
                    break;
                case /* optional google.protobuf.BoolValue always_preview_video */ 5:
                    message.alwaysPreviewVideo = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.alwaysPreviewVideo);
                    break;
                case /* optional google.protobuf.UInt32Value afk_timeout */ 6:
                    message.afkTimeout = wrappers_4.UInt32Value.internalBinaryRead(reader, reader.uint32(), options, message.afkTimeout);
                    break;
                case /* optional google.protobuf.BoolValue stream_notifications_enabled */ 7:
                    message.streamNotificationsEnabled = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.streamNotificationsEnabled);
                    break;
                case /* optional google.protobuf.BoolValue native_phone_integration_enabled */ 8:
                    message.nativePhoneIntegrationEnabled = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.nativePhoneIntegrationEnabled);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.SoundboardSettings soundboard_settings */ 9:
                    message.soundboardSettings = exports.PreloadedUserSettings_SoundboardSettings.internalBinaryRead(reader, reader.uint32(), options, message.soundboardSettings);
                    break;
                case /* optional google.protobuf.BoolValue disable_stream_previews */ 10:
                    message.disableStreamPreviews = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.disableStreamPreviews);
                    break;
                case /* optional google.protobuf.FloatValue soundmoji_volume */ 11:
                    message.soundmojiVolume = wrappers_3.FloatValue.internalBinaryRead(reader, reader.uint32(), options, message.soundmojiVolume);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* discord_protos.discord_users.v1.PreloadedUserSettings.VideoFilterBackgroundBlur blur = 1; */
        if (message.videoBackgroundFilterDesktop.oneofKind === "blur")
            exports.PreloadedUserSettings_VideoFilterBackgroundBlur.internalBinaryWrite(message.videoBackgroundFilterDesktop.blur, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* uint32 preset_option = 2; */
        if (message.videoBackgroundFilterDesktop.oneofKind === "presetOption")
            writer.tag(2, runtime_1.WireType.Varint).uint32(message.videoBackgroundFilterDesktop.presetOption);
        /* discord_protos.discord_users.v1.PreloadedUserSettings.VideoFilterAsset custom_asset = 3; */
        if (message.videoBackgroundFilterDesktop.oneofKind === "customAsset")
            exports.PreloadedUserSettings_VideoFilterAsset.internalBinaryWrite(message.videoBackgroundFilterDesktop.customAsset, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue always_preview_video = 5; */
        if (message.alwaysPreviewVideo)
            wrappers_5.BoolValue.internalBinaryWrite(message.alwaysPreviewVideo, writer.tag(5, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.UInt32Value afk_timeout = 6; */
        if (message.afkTimeout)
            wrappers_4.UInt32Value.internalBinaryWrite(message.afkTimeout, writer.tag(6, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue stream_notifications_enabled = 7; */
        if (message.streamNotificationsEnabled)
            wrappers_5.BoolValue.internalBinaryWrite(message.streamNotificationsEnabled, writer.tag(7, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue native_phone_integration_enabled = 8; */
        if (message.nativePhoneIntegrationEnabled)
            wrappers_5.BoolValue.internalBinaryWrite(message.nativePhoneIntegrationEnabled, writer.tag(8, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.SoundboardSettings soundboard_settings = 9; */
        if (message.soundboardSettings)
            exports.PreloadedUserSettings_SoundboardSettings.internalBinaryWrite(message.soundboardSettings, writer.tag(9, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue disable_stream_previews = 10; */
        if (message.disableStreamPreviews)
            wrappers_5.BoolValue.internalBinaryWrite(message.disableStreamPreviews, writer.tag(10, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.FloatValue soundmoji_volume = 11; */
        if (message.soundmojiVolume)
            wrappers_3.FloatValue.internalBinaryWrite(message.soundmojiVolume, writer.tag(11, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.VoiceAndVideoSettings
 */
exports.PreloadedUserSettings_VoiceAndVideoSettings = new PreloadedUserSettings_VoiceAndVideoSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_ExplicitContentSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentSettings", [
            { no: 1, name: "explicit_content_guilds", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction", PreloadedUserSettings_ExplicitContentRedaction, "EXPLICIT_CONTENT_REDACTION_"] },
            { no: 2, name: "explicit_content_friend_dm", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction", PreloadedUserSettings_ExplicitContentRedaction, "EXPLICIT_CONTENT_REDACTION_"] },
            { no: 3, name: "explicit_content_non_friend_dm", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction", PreloadedUserSettings_ExplicitContentRedaction, "EXPLICIT_CONTENT_REDACTION_"] }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.explicitContentGuilds = 0;
        message.explicitContentFriendDm = 0;
        message.explicitContentNonFriendDm = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction explicit_content_guilds */ 1:
                    message.explicitContentGuilds = reader.int32();
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction explicit_content_friend_dm */ 2:
                    message.explicitContentFriendDm = reader.int32();
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction explicit_content_non_friend_dm */ 3:
                    message.explicitContentNonFriendDm = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction explicit_content_guilds = 1; */
        if (message.explicitContentGuilds !== 0)
            writer.tag(1, runtime_1.WireType.Varint).int32(message.explicitContentGuilds);
        /* discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction explicit_content_friend_dm = 2; */
        if (message.explicitContentFriendDm !== 0)
            writer.tag(2, runtime_1.WireType.Varint).int32(message.explicitContentFriendDm);
        /* discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction explicit_content_non_friend_dm = 3; */
        if (message.explicitContentNonFriendDm !== 0)
            writer.tag(3, runtime_1.WireType.Varint).int32(message.explicitContentNonFriendDm);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentSettings
 */
exports.PreloadedUserSettings_ExplicitContentSettings = new PreloadedUserSettings_ExplicitContentSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_KeywordFilterSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.KeywordFilterSettings", [
            { no: 1, name: "profanity", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 2, name: "sexual_content", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 3, name: "slurs", kind: "message", T: () => wrappers_5.BoolValue }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.BoolValue profanity */ 1:
                    message.profanity = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.profanity);
                    break;
                case /* optional google.protobuf.BoolValue sexual_content */ 2:
                    message.sexualContent = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.sexualContent);
                    break;
                case /* optional google.protobuf.BoolValue slurs */ 3:
                    message.slurs = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.slurs);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional google.protobuf.BoolValue profanity = 1; */
        if (message.profanity)
            wrappers_5.BoolValue.internalBinaryWrite(message.profanity, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue sexual_content = 2; */
        if (message.sexualContent)
            wrappers_5.BoolValue.internalBinaryWrite(message.sexualContent, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue slurs = 3; */
        if (message.slurs)
            wrappers_5.BoolValue.internalBinaryWrite(message.slurs, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.KeywordFilterSettings
 */
exports.PreloadedUserSettings_KeywordFilterSettings = new PreloadedUserSettings_KeywordFilterSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_GoreContentSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.GoreContentSettings", [
            { no: 1, name: "gore_content_guilds", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction", PreloadedUserSettings_ExplicitContentRedaction, "EXPLICIT_CONTENT_REDACTION_"] },
            { no: 2, name: "gore_content_friend_dm", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction", PreloadedUserSettings_ExplicitContentRedaction, "EXPLICIT_CONTENT_REDACTION_"] },
            { no: 3, name: "gore_content_non_friend_dm", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction", PreloadedUserSettings_ExplicitContentRedaction, "EXPLICIT_CONTENT_REDACTION_"] }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.goreContentGuilds = 0;
        message.goreContentFriendDm = 0;
        message.goreContentNonFriendDm = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction gore_content_guilds */ 1:
                    message.goreContentGuilds = reader.int32();
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction gore_content_friend_dm */ 2:
                    message.goreContentFriendDm = reader.int32();
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction gore_content_non_friend_dm */ 3:
                    message.goreContentNonFriendDm = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction gore_content_guilds = 1; */
        if (message.goreContentGuilds !== 0)
            writer.tag(1, runtime_1.WireType.Varint).int32(message.goreContentGuilds);
        /* discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction gore_content_friend_dm = 2; */
        if (message.goreContentFriendDm !== 0)
            writer.tag(2, runtime_1.WireType.Varint).int32(message.goreContentFriendDm);
        /* discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction gore_content_non_friend_dm = 3; */
        if (message.goreContentNonFriendDm !== 0)
            writer.tag(3, runtime_1.WireType.Varint).int32(message.goreContentNonFriendDm);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.GoreContentSettings
 */
exports.PreloadedUserSettings_GoreContentSettings = new PreloadedUserSettings_GoreContentSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_DefaultReactionEmoji$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.DefaultReactionEmoji", [
            { no: 1, name: "emoji_id", kind: "message", T: () => wrappers_7.UInt64Value },
            { no: 2, name: "emoji_name", kind: "message", T: () => wrappers_6.StringValue },
            { no: 3, name: "animated", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 4, name: "disable_double_tap", kind: "message", T: () => wrappers_5.BoolValue }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.UInt64Value emoji_id */ 1:
                    message.emojiId = wrappers_7.UInt64Value.internalBinaryRead(reader, reader.uint32(), options, message.emojiId);
                    break;
                case /* optional google.protobuf.StringValue emoji_name */ 2:
                    message.emojiName = wrappers_6.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.emojiName);
                    break;
                case /* optional google.protobuf.BoolValue animated */ 3:
                    message.animated = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.animated);
                    break;
                case /* optional google.protobuf.BoolValue disable_double_tap */ 4:
                    message.disableDoubleTap = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.disableDoubleTap);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional google.protobuf.UInt64Value emoji_id = 1; */
        if (message.emojiId)
            wrappers_7.UInt64Value.internalBinaryWrite(message.emojiId, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.StringValue emoji_name = 2; */
        if (message.emojiName)
            wrappers_6.StringValue.internalBinaryWrite(message.emojiName, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue animated = 3; */
        if (message.animated)
            wrappers_5.BoolValue.internalBinaryWrite(message.animated, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue disable_double_tap = 4; */
        if (message.disableDoubleTap)
            wrappers_5.BoolValue.internalBinaryWrite(message.disableDoubleTap, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.DefaultReactionEmoji
 */
exports.PreloadedUserSettings_DefaultReactionEmoji = new PreloadedUserSettings_DefaultReactionEmoji$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_SelfHarmContentSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.SelfHarmContentSettings", [
            { no: 1, name: "self_harm_content_guilds", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction", PreloadedUserSettings_ExplicitContentRedaction, "EXPLICIT_CONTENT_REDACTION_"] },
            { no: 2, name: "self_harm_content_friend_dm", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction", PreloadedUserSettings_ExplicitContentRedaction, "EXPLICIT_CONTENT_REDACTION_"] },
            { no: 3, name: "self_harm_content_non_friend_dm", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction", PreloadedUserSettings_ExplicitContentRedaction, "EXPLICIT_CONTENT_REDACTION_"] }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.selfHarmContentGuilds = 0;
        message.selfHarmContentFriendDm = 0;
        message.selfHarmContentNonFriendDm = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction self_harm_content_guilds */ 1:
                    message.selfHarmContentGuilds = reader.int32();
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction self_harm_content_friend_dm */ 2:
                    message.selfHarmContentFriendDm = reader.int32();
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction self_harm_content_non_friend_dm */ 3:
                    message.selfHarmContentNonFriendDm = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction self_harm_content_guilds = 1; */
        if (message.selfHarmContentGuilds !== 0)
            writer.tag(1, runtime_1.WireType.Varint).int32(message.selfHarmContentGuilds);
        /* discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction self_harm_content_friend_dm = 2; */
        if (message.selfHarmContentFriendDm !== 0)
            writer.tag(2, runtime_1.WireType.Varint).int32(message.selfHarmContentFriendDm);
        /* discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentRedaction self_harm_content_non_friend_dm = 3; */
        if (message.selfHarmContentNonFriendDm !== 0)
            writer.tag(3, runtime_1.WireType.Varint).int32(message.selfHarmContentNonFriendDm);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.SelfHarmContentSettings
 */
exports.PreloadedUserSettings_SelfHarmContentSettings = new PreloadedUserSettings_SelfHarmContentSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_TextAndImagesSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.TextAndImagesSettings", [
            { no: 1, name: "diversity_surrogate", kind: "message", T: () => wrappers_6.StringValue },
            { no: 2, name: "use_rich_chat_input", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 3, name: "use_thread_sidebar", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 4, name: "render_spoilers", kind: "message", T: () => wrappers_6.StringValue },
            { no: 5, name: "emoji_picker_collapsed_sections", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "sticker_picker_collapsed_sections", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "view_image_descriptions", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 8, name: "show_command_suggestions", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 9, name: "inline_attachment_media", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 10, name: "inline_embed_media", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 11, name: "gif_auto_play", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 12, name: "render_embeds", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 13, name: "render_reactions", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 14, name: "animate_emoji", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 15, name: "animate_stickers", kind: "message", T: () => wrappers_4.UInt32Value },
            { no: 16, name: "enable_tts_command", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 17, name: "message_display_compact", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 19, name: "explicit_content_filter", kind: "message", T: () => wrappers_4.UInt32Value },
            { no: 20, name: "view_nsfw_guilds", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 21, name: "convert_emoticons", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 22, name: "expression_suggestions_enabled", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 23, name: "view_nsfw_commands", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 24, name: "use_legacy_chat_input", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 25, name: "soundboard_picker_collapsed_sections", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ },
            { no: 26, name: "dm_spam_filter", kind: "message", T: () => wrappers_4.UInt32Value },
            { no: 27, name: "dm_spam_filter_v2", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.DmSpamFilterV2", PreloadedUserSettings_DmSpamFilterV2, "DM_SPAM_FILTER_V2_"] },
            { no: 28, name: "include_stickers_in_autocomplete", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 29, name: "explicit_content_settings", kind: "message", T: () => exports.PreloadedUserSettings_ExplicitContentSettings },
            { no: 30, name: "keyword_filter_settings", kind: "message", T: () => exports.PreloadedUserSettings_KeywordFilterSettings },
            { no: 31, name: "include_soundmoji_in_autocomplete", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 32, name: "gore_content_settings", kind: "message", T: () => exports.PreloadedUserSettings_GoreContentSettings },
            { no: 33, name: "default_reaction_emoji", kind: "message", T: () => exports.PreloadedUserSettings_DefaultReactionEmoji },
            { no: 34, name: "show_mention_suggestions", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 35, name: "self_harm_content_settings", kind: "message", T: () => exports.PreloadedUserSettings_SelfHarmContentSettings },
            { no: 36, name: "is_cross_dm_search_enabled", kind: "message", T: () => wrappers_5.BoolValue }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.emojiPickerCollapsedSections = [];
        message.stickerPickerCollapsedSections = [];
        message.soundboardPickerCollapsedSections = [];
        message.dmSpamFilterV2 = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.StringValue diversity_surrogate */ 1:
                    message.diversitySurrogate = wrappers_6.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.diversitySurrogate);
                    break;
                case /* optional google.protobuf.BoolValue use_rich_chat_input */ 2:
                    message.useRichChatInput = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.useRichChatInput);
                    break;
                case /* optional google.protobuf.BoolValue use_thread_sidebar */ 3:
                    message.useThreadSidebar = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.useThreadSidebar);
                    break;
                case /* optional google.protobuf.StringValue render_spoilers */ 4:
                    message.renderSpoilers = wrappers_6.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.renderSpoilers);
                    break;
                case /* repeated string emoji_picker_collapsed_sections = 5 [packed = false] */ 5:
                    message.emojiPickerCollapsedSections.push(reader.string());
                    break;
                case /* repeated string sticker_picker_collapsed_sections = 6 [packed = false] */ 6:
                    message.stickerPickerCollapsedSections.push(reader.string());
                    break;
                case /* optional google.protobuf.BoolValue view_image_descriptions */ 7:
                    message.viewImageDescriptions = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.viewImageDescriptions);
                    break;
                case /* optional google.protobuf.BoolValue show_command_suggestions */ 8:
                    message.showCommandSuggestions = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.showCommandSuggestions);
                    break;
                case /* optional google.protobuf.BoolValue inline_attachment_media */ 9:
                    message.inlineAttachmentMedia = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.inlineAttachmentMedia);
                    break;
                case /* optional google.protobuf.BoolValue inline_embed_media */ 10:
                    message.inlineEmbedMedia = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.inlineEmbedMedia);
                    break;
                case /* optional google.protobuf.BoolValue gif_auto_play */ 11:
                    message.gifAutoPlay = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.gifAutoPlay);
                    break;
                case /* optional google.protobuf.BoolValue render_embeds */ 12:
                    message.renderEmbeds = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.renderEmbeds);
                    break;
                case /* optional google.protobuf.BoolValue render_reactions */ 13:
                    message.renderReactions = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.renderReactions);
                    break;
                case /* optional google.protobuf.BoolValue animate_emoji */ 14:
                    message.animateEmoji = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.animateEmoji);
                    break;
                case /* optional google.protobuf.UInt32Value animate_stickers */ 15:
                    message.animateStickers = wrappers_4.UInt32Value.internalBinaryRead(reader, reader.uint32(), options, message.animateStickers);
                    break;
                case /* optional google.protobuf.BoolValue enable_tts_command */ 16:
                    message.enableTtsCommand = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.enableTtsCommand);
                    break;
                case /* optional google.protobuf.BoolValue message_display_compact */ 17:
                    message.messageDisplayCompact = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.messageDisplayCompact);
                    break;
                case /* optional google.protobuf.UInt32Value explicit_content_filter */ 19:
                    message.explicitContentFilter = wrappers_4.UInt32Value.internalBinaryRead(reader, reader.uint32(), options, message.explicitContentFilter);
                    break;
                case /* optional google.protobuf.BoolValue view_nsfw_guilds */ 20:
                    message.viewNsfwGuilds = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.viewNsfwGuilds);
                    break;
                case /* optional google.protobuf.BoolValue convert_emoticons */ 21:
                    message.convertEmoticons = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.convertEmoticons);
                    break;
                case /* optional google.protobuf.BoolValue expression_suggestions_enabled */ 22:
                    message.expressionSuggestionsEnabled = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.expressionSuggestionsEnabled);
                    break;
                case /* optional google.protobuf.BoolValue view_nsfw_commands */ 23:
                    message.viewNsfwCommands = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.viewNsfwCommands);
                    break;
                case /* optional google.protobuf.BoolValue use_legacy_chat_input */ 24:
                    message.useLegacyChatInput = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.useLegacyChatInput);
                    break;
                case /* repeated string soundboard_picker_collapsed_sections = 25 [packed = false] */ 25:
                    message.soundboardPickerCollapsedSections.push(reader.string());
                    break;
                case /* optional google.protobuf.UInt32Value dm_spam_filter */ 26:
                    message.dmSpamFilter = wrappers_4.UInt32Value.internalBinaryRead(reader, reader.uint32(), options, message.dmSpamFilter);
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.DmSpamFilterV2 dm_spam_filter_v2 */ 27:
                    message.dmSpamFilterV2 = reader.int32();
                    break;
                case /* optional google.protobuf.BoolValue include_stickers_in_autocomplete */ 28:
                    message.includeStickersInAutocomplete = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.includeStickersInAutocomplete);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentSettings explicit_content_settings */ 29:
                    message.explicitContentSettings = exports.PreloadedUserSettings_ExplicitContentSettings.internalBinaryRead(reader, reader.uint32(), options, message.explicitContentSettings);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.KeywordFilterSettings keyword_filter_settings */ 30:
                    message.keywordFilterSettings = exports.PreloadedUserSettings_KeywordFilterSettings.internalBinaryRead(reader, reader.uint32(), options, message.keywordFilterSettings);
                    break;
                case /* optional google.protobuf.BoolValue include_soundmoji_in_autocomplete */ 31:
                    message.includeSoundmojiInAutocomplete = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.includeSoundmojiInAutocomplete);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.GoreContentSettings gore_content_settings */ 32:
                    message.goreContentSettings = exports.PreloadedUserSettings_GoreContentSettings.internalBinaryRead(reader, reader.uint32(), options, message.goreContentSettings);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.DefaultReactionEmoji default_reaction_emoji */ 33:
                    message.defaultReactionEmoji = exports.PreloadedUserSettings_DefaultReactionEmoji.internalBinaryRead(reader, reader.uint32(), options, message.defaultReactionEmoji);
                    break;
                case /* optional google.protobuf.BoolValue show_mention_suggestions */ 34:
                    message.showMentionSuggestions = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.showMentionSuggestions);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.SelfHarmContentSettings self_harm_content_settings */ 35:
                    message.selfHarmContentSettings = exports.PreloadedUserSettings_SelfHarmContentSettings.internalBinaryRead(reader, reader.uint32(), options, message.selfHarmContentSettings);
                    break;
                case /* optional google.protobuf.BoolValue is_cross_dm_search_enabled */ 36:
                    message.isCrossDmSearchEnabled = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.isCrossDmSearchEnabled);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional google.protobuf.StringValue diversity_surrogate = 1; */
        if (message.diversitySurrogate)
            wrappers_6.StringValue.internalBinaryWrite(message.diversitySurrogate, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue use_rich_chat_input = 2; */
        if (message.useRichChatInput)
            wrappers_5.BoolValue.internalBinaryWrite(message.useRichChatInput, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue use_thread_sidebar = 3; */
        if (message.useThreadSidebar)
            wrappers_5.BoolValue.internalBinaryWrite(message.useThreadSidebar, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.StringValue render_spoilers = 4; */
        if (message.renderSpoilers)
            wrappers_6.StringValue.internalBinaryWrite(message.renderSpoilers, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* repeated string emoji_picker_collapsed_sections = 5 [packed = false]; */
        for (let i = 0; i < message.emojiPickerCollapsedSections.length; i++)
            writer.tag(5, runtime_1.WireType.LengthDelimited).string(message.emojiPickerCollapsedSections[i]);
        /* repeated string sticker_picker_collapsed_sections = 6 [packed = false]; */
        for (let i = 0; i < message.stickerPickerCollapsedSections.length; i++)
            writer.tag(6, runtime_1.WireType.LengthDelimited).string(message.stickerPickerCollapsedSections[i]);
        /* optional google.protobuf.BoolValue view_image_descriptions = 7; */
        if (message.viewImageDescriptions)
            wrappers_5.BoolValue.internalBinaryWrite(message.viewImageDescriptions, writer.tag(7, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue show_command_suggestions = 8; */
        if (message.showCommandSuggestions)
            wrappers_5.BoolValue.internalBinaryWrite(message.showCommandSuggestions, writer.tag(8, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue inline_attachment_media = 9; */
        if (message.inlineAttachmentMedia)
            wrappers_5.BoolValue.internalBinaryWrite(message.inlineAttachmentMedia, writer.tag(9, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue inline_embed_media = 10; */
        if (message.inlineEmbedMedia)
            wrappers_5.BoolValue.internalBinaryWrite(message.inlineEmbedMedia, writer.tag(10, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue gif_auto_play = 11; */
        if (message.gifAutoPlay)
            wrappers_5.BoolValue.internalBinaryWrite(message.gifAutoPlay, writer.tag(11, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue render_embeds = 12; */
        if (message.renderEmbeds)
            wrappers_5.BoolValue.internalBinaryWrite(message.renderEmbeds, writer.tag(12, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue render_reactions = 13; */
        if (message.renderReactions)
            wrappers_5.BoolValue.internalBinaryWrite(message.renderReactions, writer.tag(13, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue animate_emoji = 14; */
        if (message.animateEmoji)
            wrappers_5.BoolValue.internalBinaryWrite(message.animateEmoji, writer.tag(14, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.UInt32Value animate_stickers = 15; */
        if (message.animateStickers)
            wrappers_4.UInt32Value.internalBinaryWrite(message.animateStickers, writer.tag(15, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue enable_tts_command = 16; */
        if (message.enableTtsCommand)
            wrappers_5.BoolValue.internalBinaryWrite(message.enableTtsCommand, writer.tag(16, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue message_display_compact = 17; */
        if (message.messageDisplayCompact)
            wrappers_5.BoolValue.internalBinaryWrite(message.messageDisplayCompact, writer.tag(17, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.UInt32Value explicit_content_filter = 19; */
        if (message.explicitContentFilter)
            wrappers_4.UInt32Value.internalBinaryWrite(message.explicitContentFilter, writer.tag(19, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue view_nsfw_guilds = 20; */
        if (message.viewNsfwGuilds)
            wrappers_5.BoolValue.internalBinaryWrite(message.viewNsfwGuilds, writer.tag(20, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue convert_emoticons = 21; */
        if (message.convertEmoticons)
            wrappers_5.BoolValue.internalBinaryWrite(message.convertEmoticons, writer.tag(21, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue expression_suggestions_enabled = 22; */
        if (message.expressionSuggestionsEnabled)
            wrappers_5.BoolValue.internalBinaryWrite(message.expressionSuggestionsEnabled, writer.tag(22, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue view_nsfw_commands = 23; */
        if (message.viewNsfwCommands)
            wrappers_5.BoolValue.internalBinaryWrite(message.viewNsfwCommands, writer.tag(23, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue use_legacy_chat_input = 24; */
        if (message.useLegacyChatInput)
            wrappers_5.BoolValue.internalBinaryWrite(message.useLegacyChatInput, writer.tag(24, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* repeated string soundboard_picker_collapsed_sections = 25 [packed = false]; */
        for (let i = 0; i < message.soundboardPickerCollapsedSections.length; i++)
            writer.tag(25, runtime_1.WireType.LengthDelimited).string(message.soundboardPickerCollapsedSections[i]);
        /* optional google.protobuf.UInt32Value dm_spam_filter = 26; */
        if (message.dmSpamFilter)
            wrappers_4.UInt32Value.internalBinaryWrite(message.dmSpamFilter, writer.tag(26, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_users.v1.PreloadedUserSettings.DmSpamFilterV2 dm_spam_filter_v2 = 27; */
        if (message.dmSpamFilterV2 !== 0)
            writer.tag(27, runtime_1.WireType.Varint).int32(message.dmSpamFilterV2);
        /* optional google.protobuf.BoolValue include_stickers_in_autocomplete = 28; */
        if (message.includeStickersInAutocomplete)
            wrappers_5.BoolValue.internalBinaryWrite(message.includeStickersInAutocomplete, writer.tag(28, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.ExplicitContentSettings explicit_content_settings = 29; */
        if (message.explicitContentSettings)
            exports.PreloadedUserSettings_ExplicitContentSettings.internalBinaryWrite(message.explicitContentSettings, writer.tag(29, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.KeywordFilterSettings keyword_filter_settings = 30; */
        if (message.keywordFilterSettings)
            exports.PreloadedUserSettings_KeywordFilterSettings.internalBinaryWrite(message.keywordFilterSettings, writer.tag(30, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue include_soundmoji_in_autocomplete = 31; */
        if (message.includeSoundmojiInAutocomplete)
            wrappers_5.BoolValue.internalBinaryWrite(message.includeSoundmojiInAutocomplete, writer.tag(31, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.GoreContentSettings gore_content_settings = 32; */
        if (message.goreContentSettings)
            exports.PreloadedUserSettings_GoreContentSettings.internalBinaryWrite(message.goreContentSettings, writer.tag(32, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.DefaultReactionEmoji default_reaction_emoji = 33; */
        if (message.defaultReactionEmoji)
            exports.PreloadedUserSettings_DefaultReactionEmoji.internalBinaryWrite(message.defaultReactionEmoji, writer.tag(33, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue show_mention_suggestions = 34; */
        if (message.showMentionSuggestions)
            wrappers_5.BoolValue.internalBinaryWrite(message.showMentionSuggestions, writer.tag(34, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.SelfHarmContentSettings self_harm_content_settings = 35; */
        if (message.selfHarmContentSettings)
            exports.PreloadedUserSettings_SelfHarmContentSettings.internalBinaryWrite(message.selfHarmContentSettings, writer.tag(35, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue is_cross_dm_search_enabled = 36; */
        if (message.isCrossDmSearchEnabled)
            wrappers_5.BoolValue.internalBinaryWrite(message.isCrossDmSearchEnabled, writer.tag(36, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.TextAndImagesSettings
 */
exports.PreloadedUserSettings_TextAndImagesSettings = new PreloadedUserSettings_TextAndImagesSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_NotificationSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.NotificationSettings", [
            { no: 1, name: "show_in_app_notifications", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 2, name: "notify_friends_on_go_live", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 3, name: "notification_center_acked_before_id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 4, name: "enable_burst_reaction_notifications", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 5, name: "quiet_mode", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 6, name: "focus_mode_expires_at_ms", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 7, name: "reaction_notifications", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.ReactionNotificationType", PreloadedUserSettings_ReactionNotificationType, "REACTION_NOTIFICATION_TYPE_"] },
            { no: 8, name: "game_activity_notifications", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.GameActivityNotificationType", PreloadedUserSettings_GameActivityNotificationType, "GAME_ACTIVITY_NOTIFICATION_TYPE_"] },
            { no: 9, name: "custom_status_push_notifications", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.CustomStatusPushNotificationType", PreloadedUserSettings_CustomStatusPushNotificationType, "CUSTOM_STATUS_PUSH_NOTIFICATION_TYPE_"] },
            { no: 10, name: "game_activity_exclude_steam_notifications", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 11, name: "enable_voice_activity_notifications", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 12, name: "enable_friend_online_notifications", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 13, name: "enable_user_resurrection_notifications", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 14, name: "enable_friend_anniversary_notifications", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 15, name: "enable_game_update_notifications", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 16, name: "enable_profile_updates_notifications", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 17, name: "enable_server_trending_notifications", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 18, name: "enable_dm_reply_nudge_reminders", kind: "message", T: () => wrappers_5.BoolValue }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.notificationCenterAckedBeforeId = 0n;
        message.focusModeExpiresAtMs = 0n;
        message.reactionNotifications = 0;
        message.gameActivityNotifications = 0;
        message.customStatusPushNotifications = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.BoolValue show_in_app_notifications */ 1:
                    message.showInAppNotifications = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.showInAppNotifications);
                    break;
                case /* optional google.protobuf.BoolValue notify_friends_on_go_live */ 2:
                    message.notifyFriendsOnGoLive = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.notifyFriendsOnGoLive);
                    break;
                case /* fixed64 notification_center_acked_before_id */ 3:
                    message.notificationCenterAckedBeforeId = reader.fixed64().toBigInt();
                    break;
                case /* optional google.protobuf.BoolValue enable_burst_reaction_notifications */ 4:
                    message.enableBurstReactionNotifications = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.enableBurstReactionNotifications);
                    break;
                case /* optional google.protobuf.BoolValue quiet_mode */ 5:
                    message.quietMode = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.quietMode);
                    break;
                case /* fixed64 focus_mode_expires_at_ms */ 6:
                    message.focusModeExpiresAtMs = reader.fixed64().toBigInt();
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.ReactionNotificationType reaction_notifications */ 7:
                    message.reactionNotifications = reader.int32();
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.GameActivityNotificationType game_activity_notifications */ 8:
                    message.gameActivityNotifications = reader.int32();
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.CustomStatusPushNotificationType custom_status_push_notifications */ 9:
                    message.customStatusPushNotifications = reader.int32();
                    break;
                case /* optional google.protobuf.BoolValue game_activity_exclude_steam_notifications */ 10:
                    message.gameActivityExcludeSteamNotifications = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.gameActivityExcludeSteamNotifications);
                    break;
                case /* optional google.protobuf.BoolValue enable_voice_activity_notifications */ 11:
                    message.enableVoiceActivityNotifications = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.enableVoiceActivityNotifications);
                    break;
                case /* optional google.protobuf.BoolValue enable_friend_online_notifications */ 12:
                    message.enableFriendOnlineNotifications = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.enableFriendOnlineNotifications);
                    break;
                case /* optional google.protobuf.BoolValue enable_user_resurrection_notifications */ 13:
                    message.enableUserResurrectionNotifications = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.enableUserResurrectionNotifications);
                    break;
                case /* optional google.protobuf.BoolValue enable_friend_anniversary_notifications */ 14:
                    message.enableFriendAnniversaryNotifications = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.enableFriendAnniversaryNotifications);
                    break;
                case /* optional google.protobuf.BoolValue enable_game_update_notifications */ 15:
                    message.enableGameUpdateNotifications = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.enableGameUpdateNotifications);
                    break;
                case /* optional google.protobuf.BoolValue enable_profile_updates_notifications */ 16:
                    message.enableProfileUpdatesNotifications = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.enableProfileUpdatesNotifications);
                    break;
                case /* optional google.protobuf.BoolValue enable_server_trending_notifications */ 17:
                    message.enableServerTrendingNotifications = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.enableServerTrendingNotifications);
                    break;
                case /* optional google.protobuf.BoolValue enable_dm_reply_nudge_reminders */ 18:
                    message.enableDmReplyNudgeReminders = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.enableDmReplyNudgeReminders);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional google.protobuf.BoolValue show_in_app_notifications = 1; */
        if (message.showInAppNotifications)
            wrappers_5.BoolValue.internalBinaryWrite(message.showInAppNotifications, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue notify_friends_on_go_live = 2; */
        if (message.notifyFriendsOnGoLive)
            wrappers_5.BoolValue.internalBinaryWrite(message.notifyFriendsOnGoLive, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* fixed64 notification_center_acked_before_id = 3; */
        if (message.notificationCenterAckedBeforeId !== 0n)
            writer.tag(3, runtime_1.WireType.Bit64).fixed64(message.notificationCenterAckedBeforeId);
        /* optional google.protobuf.BoolValue enable_burst_reaction_notifications = 4; */
        if (message.enableBurstReactionNotifications)
            wrappers_5.BoolValue.internalBinaryWrite(message.enableBurstReactionNotifications, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue quiet_mode = 5; */
        if (message.quietMode)
            wrappers_5.BoolValue.internalBinaryWrite(message.quietMode, writer.tag(5, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* fixed64 focus_mode_expires_at_ms = 6; */
        if (message.focusModeExpiresAtMs !== 0n)
            writer.tag(6, runtime_1.WireType.Bit64).fixed64(message.focusModeExpiresAtMs);
        /* discord_protos.discord_users.v1.PreloadedUserSettings.ReactionNotificationType reaction_notifications = 7; */
        if (message.reactionNotifications !== 0)
            writer.tag(7, runtime_1.WireType.Varint).int32(message.reactionNotifications);
        /* discord_protos.discord_users.v1.PreloadedUserSettings.GameActivityNotificationType game_activity_notifications = 8; */
        if (message.gameActivityNotifications !== 0)
            writer.tag(8, runtime_1.WireType.Varint).int32(message.gameActivityNotifications);
        /* discord_protos.discord_users.v1.PreloadedUserSettings.CustomStatusPushNotificationType custom_status_push_notifications = 9; */
        if (message.customStatusPushNotifications !== 0)
            writer.tag(9, runtime_1.WireType.Varint).int32(message.customStatusPushNotifications);
        /* optional google.protobuf.BoolValue game_activity_exclude_steam_notifications = 10; */
        if (message.gameActivityExcludeSteamNotifications)
            wrappers_5.BoolValue.internalBinaryWrite(message.gameActivityExcludeSteamNotifications, writer.tag(10, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue enable_voice_activity_notifications = 11; */
        if (message.enableVoiceActivityNotifications)
            wrappers_5.BoolValue.internalBinaryWrite(message.enableVoiceActivityNotifications, writer.tag(11, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue enable_friend_online_notifications = 12; */
        if (message.enableFriendOnlineNotifications)
            wrappers_5.BoolValue.internalBinaryWrite(message.enableFriendOnlineNotifications, writer.tag(12, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue enable_user_resurrection_notifications = 13; */
        if (message.enableUserResurrectionNotifications)
            wrappers_5.BoolValue.internalBinaryWrite(message.enableUserResurrectionNotifications, writer.tag(13, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue enable_friend_anniversary_notifications = 14; */
        if (message.enableFriendAnniversaryNotifications)
            wrappers_5.BoolValue.internalBinaryWrite(message.enableFriendAnniversaryNotifications, writer.tag(14, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue enable_game_update_notifications = 15; */
        if (message.enableGameUpdateNotifications)
            wrappers_5.BoolValue.internalBinaryWrite(message.enableGameUpdateNotifications, writer.tag(15, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue enable_profile_updates_notifications = 16; */
        if (message.enableProfileUpdatesNotifications)
            wrappers_5.BoolValue.internalBinaryWrite(message.enableProfileUpdatesNotifications, writer.tag(16, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue enable_server_trending_notifications = 17; */
        if (message.enableServerTrendingNotifications)
            wrappers_5.BoolValue.internalBinaryWrite(message.enableServerTrendingNotifications, writer.tag(17, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue enable_dm_reply_nudge_reminders = 18; */
        if (message.enableDmReplyNudgeReminders)
            wrappers_5.BoolValue.internalBinaryWrite(message.enableDmReplyNudgeReminders, writer.tag(18, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.NotificationSettings
 */
exports.PreloadedUserSettings_NotificationSettings = new PreloadedUserSettings_NotificationSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_PrivacySettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.PrivacySettings", [
            { no: 1, name: "allow_activity_party_privacy_friends", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 2, name: "allow_activity_party_privacy_voice_channel", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 3, name: "restricted_guild_ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 4, name: "default_guilds_restricted", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 7, name: "allow_accessibility_detection", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 8, name: "detect_platform_accounts", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 9, name: "passwordless", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 10, name: "contact_sync_enabled", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 11, name: "friend_source_flags", kind: "message", T: () => wrappers_4.UInt32Value },
            { no: 12, name: "friend_discovery_flags", kind: "message", T: () => wrappers_4.UInt32Value },
            { no: 13, name: "activity_restricted_guild_ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 14, name: "default_guilds_activity_restricted", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.GuildActivityStatusRestrictionDefault", PreloadedUserSettings_GuildActivityStatusRestrictionDefault, "GUILD_ACTIVITY_STATUS_RESTRICTION_DEFAULT_"] },
            { no: 15, name: "activity_joining_restricted_guild_ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 16, name: "message_request_restricted_guild_ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 17, name: "default_message_request_restricted", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 18, name: "drops_opted_out", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 19, name: "non_spam_retraining_opt_in", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 20, name: "family_center_enabled", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 21, name: "family_center_enabled_v2", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 22, name: "hide_legacy_username", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 23, name: "inappropriate_conversation_warnings", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 24, name: "recent_games_enabled", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 25, name: "guilds_leaderboard_opt_out_default", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.GuildsLeaderboardOptOutDefault", PreloadedUserSettings_GuildsLeaderboardOptOutDefault, "GUILDS_LEADERBOARD_OPT_OUT_DEFAULT_"] },
            { no: 26, name: "allow_game_friend_dms_in_discord", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 27, name: "default_guilds_restricted_v2", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 28, name: "slayer_sdk_receive_dms_in_game", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.SlayerSDKReceiveInGameDMs", PreloadedUserSettings_SlayerSDKReceiveInGameDMs] },
            { no: 29, name: "default_guilds_activity_restricted_v2", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.GuildActivityStatusRestrictionDefaultV2", PreloadedUserSettings_GuildActivityStatusRestrictionDefaultV2, "GUILD_ACTIVITY_STATUS_RESTRICTION_DEFAULT_V2_"] },
            { no: 30, name: "quests_3p_data_opted_out", kind: "message", jsonName: "quests3pDataOptedOut", T: () => wrappers_5.BoolValue },
            { no: 31, name: "show_local_time", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 32, name: "profile_visibility", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.ProfileVisibility", PreloadedUserSettings_ProfileVisibility, "PROFILE_VISIBILITY_"] }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.restrictedGuildIds = [];
        message.defaultGuildsRestricted = false;
        message.allowAccessibilityDetection = false;
        message.activityRestrictedGuildIds = [];
        message.defaultGuildsActivityRestricted = 0;
        message.activityJoiningRestrictedGuildIds = [];
        message.messageRequestRestrictedGuildIds = [];
        message.guildsLeaderboardOptOutDefault = 0;
        message.slayerSdkReceiveDmsInGame = 0;
        message.defaultGuildsActivityRestrictedV2 = 0;
        message.profileVisibility = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.BoolValue allow_activity_party_privacy_friends */ 1:
                    message.allowActivityPartyPrivacyFriends = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.allowActivityPartyPrivacyFriends);
                    break;
                case /* optional google.protobuf.BoolValue allow_activity_party_privacy_voice_channel */ 2:
                    message.allowActivityPartyPrivacyVoiceChannel = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.allowActivityPartyPrivacyVoiceChannel);
                    break;
                case /* repeated fixed64 restricted_guild_ids */ 3:
                    if (wireType === runtime_1.WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.restrictedGuildIds.push(reader.fixed64().toBigInt());
                    else
                        message.restrictedGuildIds.push(reader.fixed64().toBigInt());
                    break;
                case /* bool default_guilds_restricted */ 4:
                    message.defaultGuildsRestricted = reader.bool();
                    break;
                case /* bool allow_accessibility_detection */ 7:
                    message.allowAccessibilityDetection = reader.bool();
                    break;
                case /* optional google.protobuf.BoolValue detect_platform_accounts */ 8:
                    message.detectPlatformAccounts = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.detectPlatformAccounts);
                    break;
                case /* optional google.protobuf.BoolValue passwordless */ 9:
                    message.passwordless = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.passwordless);
                    break;
                case /* optional google.protobuf.BoolValue contact_sync_enabled */ 10:
                    message.contactSyncEnabled = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.contactSyncEnabled);
                    break;
                case /* optional google.protobuf.UInt32Value friend_source_flags */ 11:
                    message.friendSourceFlags = wrappers_4.UInt32Value.internalBinaryRead(reader, reader.uint32(), options, message.friendSourceFlags);
                    break;
                case /* optional google.protobuf.UInt32Value friend_discovery_flags */ 12:
                    message.friendDiscoveryFlags = wrappers_4.UInt32Value.internalBinaryRead(reader, reader.uint32(), options, message.friendDiscoveryFlags);
                    break;
                case /* repeated fixed64 activity_restricted_guild_ids */ 13:
                    if (wireType === runtime_1.WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.activityRestrictedGuildIds.push(reader.fixed64().toBigInt());
                    else
                        message.activityRestrictedGuildIds.push(reader.fixed64().toBigInt());
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.GuildActivityStatusRestrictionDefault default_guilds_activity_restricted */ 14:
                    message.defaultGuildsActivityRestricted = reader.int32();
                    break;
                case /* repeated fixed64 activity_joining_restricted_guild_ids */ 15:
                    if (wireType === runtime_1.WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.activityJoiningRestrictedGuildIds.push(reader.fixed64().toBigInt());
                    else
                        message.activityJoiningRestrictedGuildIds.push(reader.fixed64().toBigInt());
                    break;
                case /* repeated fixed64 message_request_restricted_guild_ids */ 16:
                    if (wireType === runtime_1.WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.messageRequestRestrictedGuildIds.push(reader.fixed64().toBigInt());
                    else
                        message.messageRequestRestrictedGuildIds.push(reader.fixed64().toBigInt());
                    break;
                case /* optional google.protobuf.BoolValue default_message_request_restricted */ 17:
                    message.defaultMessageRequestRestricted = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.defaultMessageRequestRestricted);
                    break;
                case /* optional google.protobuf.BoolValue drops_opted_out */ 18:
                    message.dropsOptedOut = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.dropsOptedOut);
                    break;
                case /* optional google.protobuf.BoolValue non_spam_retraining_opt_in */ 19:
                    message.nonSpamRetrainingOptIn = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.nonSpamRetrainingOptIn);
                    break;
                case /* optional google.protobuf.BoolValue family_center_enabled */ 20:
                    message.familyCenterEnabled = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.familyCenterEnabled);
                    break;
                case /* optional google.protobuf.BoolValue family_center_enabled_v2 */ 21:
                    message.familyCenterEnabledV2 = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.familyCenterEnabledV2);
                    break;
                case /* optional google.protobuf.BoolValue hide_legacy_username */ 22:
                    message.hideLegacyUsername = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.hideLegacyUsername);
                    break;
                case /* optional google.protobuf.BoolValue inappropriate_conversation_warnings */ 23:
                    message.inappropriateConversationWarnings = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.inappropriateConversationWarnings);
                    break;
                case /* optional google.protobuf.BoolValue recent_games_enabled */ 24:
                    message.recentGamesEnabled = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.recentGamesEnabled);
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.GuildsLeaderboardOptOutDefault guilds_leaderboard_opt_out_default */ 25:
                    message.guildsLeaderboardOptOutDefault = reader.int32();
                    break;
                case /* optional google.protobuf.BoolValue allow_game_friend_dms_in_discord */ 26:
                    message.allowGameFriendDmsInDiscord = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.allowGameFriendDmsInDiscord);
                    break;
                case /* optional google.protobuf.BoolValue default_guilds_restricted_v2 */ 27:
                    message.defaultGuildsRestrictedV2 = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.defaultGuildsRestrictedV2);
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.SlayerSDKReceiveInGameDMs slayer_sdk_receive_dms_in_game */ 28:
                    message.slayerSdkReceiveDmsInGame = reader.int32();
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.GuildActivityStatusRestrictionDefaultV2 default_guilds_activity_restricted_v2 */ 29:
                    message.defaultGuildsActivityRestrictedV2 = reader.int32();
                    break;
                case /* optional google.protobuf.BoolValue quests_3p_data_opted_out */ 30:
                    message.quests3PDataOptedOut = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.quests3PDataOptedOut);
                    break;
                case /* optional google.protobuf.BoolValue show_local_time */ 31:
                    message.showLocalTime = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.showLocalTime);
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.ProfileVisibility profile_visibility */ 32:
                    message.profileVisibility = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional google.protobuf.BoolValue allow_activity_party_privacy_friends = 1; */
        if (message.allowActivityPartyPrivacyFriends)
            wrappers_5.BoolValue.internalBinaryWrite(message.allowActivityPartyPrivacyFriends, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue allow_activity_party_privacy_voice_channel = 2; */
        if (message.allowActivityPartyPrivacyVoiceChannel)
            wrappers_5.BoolValue.internalBinaryWrite(message.allowActivityPartyPrivacyVoiceChannel, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* repeated fixed64 restricted_guild_ids = 3; */
        if (message.restrictedGuildIds.length) {
            writer.tag(3, runtime_1.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.restrictedGuildIds.length; i++)
                writer.fixed64(message.restrictedGuildIds[i]);
            writer.join();
        }
        /* bool default_guilds_restricted = 4; */
        if (message.defaultGuildsRestricted !== false)
            writer.tag(4, runtime_1.WireType.Varint).bool(message.defaultGuildsRestricted);
        /* bool allow_accessibility_detection = 7; */
        if (message.allowAccessibilityDetection !== false)
            writer.tag(7, runtime_1.WireType.Varint).bool(message.allowAccessibilityDetection);
        /* optional google.protobuf.BoolValue detect_platform_accounts = 8; */
        if (message.detectPlatformAccounts)
            wrappers_5.BoolValue.internalBinaryWrite(message.detectPlatformAccounts, writer.tag(8, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue passwordless = 9; */
        if (message.passwordless)
            wrappers_5.BoolValue.internalBinaryWrite(message.passwordless, writer.tag(9, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue contact_sync_enabled = 10; */
        if (message.contactSyncEnabled)
            wrappers_5.BoolValue.internalBinaryWrite(message.contactSyncEnabled, writer.tag(10, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.UInt32Value friend_source_flags = 11; */
        if (message.friendSourceFlags)
            wrappers_4.UInt32Value.internalBinaryWrite(message.friendSourceFlags, writer.tag(11, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.UInt32Value friend_discovery_flags = 12; */
        if (message.friendDiscoveryFlags)
            wrappers_4.UInt32Value.internalBinaryWrite(message.friendDiscoveryFlags, writer.tag(12, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* repeated fixed64 activity_restricted_guild_ids = 13; */
        if (message.activityRestrictedGuildIds.length) {
            writer.tag(13, runtime_1.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.activityRestrictedGuildIds.length; i++)
                writer.fixed64(message.activityRestrictedGuildIds[i]);
            writer.join();
        }
        /* discord_protos.discord_users.v1.PreloadedUserSettings.GuildActivityStatusRestrictionDefault default_guilds_activity_restricted = 14; */
        if (message.defaultGuildsActivityRestricted !== 0)
            writer.tag(14, runtime_1.WireType.Varint).int32(message.defaultGuildsActivityRestricted);
        /* repeated fixed64 activity_joining_restricted_guild_ids = 15; */
        if (message.activityJoiningRestrictedGuildIds.length) {
            writer.tag(15, runtime_1.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.activityJoiningRestrictedGuildIds.length; i++)
                writer.fixed64(message.activityJoiningRestrictedGuildIds[i]);
            writer.join();
        }
        /* repeated fixed64 message_request_restricted_guild_ids = 16; */
        if (message.messageRequestRestrictedGuildIds.length) {
            writer.tag(16, runtime_1.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.messageRequestRestrictedGuildIds.length; i++)
                writer.fixed64(message.messageRequestRestrictedGuildIds[i]);
            writer.join();
        }
        /* optional google.protobuf.BoolValue default_message_request_restricted = 17; */
        if (message.defaultMessageRequestRestricted)
            wrappers_5.BoolValue.internalBinaryWrite(message.defaultMessageRequestRestricted, writer.tag(17, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue drops_opted_out = 18; */
        if (message.dropsOptedOut)
            wrappers_5.BoolValue.internalBinaryWrite(message.dropsOptedOut, writer.tag(18, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue non_spam_retraining_opt_in = 19; */
        if (message.nonSpamRetrainingOptIn)
            wrappers_5.BoolValue.internalBinaryWrite(message.nonSpamRetrainingOptIn, writer.tag(19, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue family_center_enabled = 20; */
        if (message.familyCenterEnabled)
            wrappers_5.BoolValue.internalBinaryWrite(message.familyCenterEnabled, writer.tag(20, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue family_center_enabled_v2 = 21; */
        if (message.familyCenterEnabledV2)
            wrappers_5.BoolValue.internalBinaryWrite(message.familyCenterEnabledV2, writer.tag(21, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue hide_legacy_username = 22; */
        if (message.hideLegacyUsername)
            wrappers_5.BoolValue.internalBinaryWrite(message.hideLegacyUsername, writer.tag(22, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue inappropriate_conversation_warnings = 23; */
        if (message.inappropriateConversationWarnings)
            wrappers_5.BoolValue.internalBinaryWrite(message.inappropriateConversationWarnings, writer.tag(23, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue recent_games_enabled = 24; */
        if (message.recentGamesEnabled)
            wrappers_5.BoolValue.internalBinaryWrite(message.recentGamesEnabled, writer.tag(24, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_users.v1.PreloadedUserSettings.GuildsLeaderboardOptOutDefault guilds_leaderboard_opt_out_default = 25; */
        if (message.guildsLeaderboardOptOutDefault !== 0)
            writer.tag(25, runtime_1.WireType.Varint).int32(message.guildsLeaderboardOptOutDefault);
        /* optional google.protobuf.BoolValue allow_game_friend_dms_in_discord = 26; */
        if (message.allowGameFriendDmsInDiscord)
            wrappers_5.BoolValue.internalBinaryWrite(message.allowGameFriendDmsInDiscord, writer.tag(26, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue default_guilds_restricted_v2 = 27; */
        if (message.defaultGuildsRestrictedV2)
            wrappers_5.BoolValue.internalBinaryWrite(message.defaultGuildsRestrictedV2, writer.tag(27, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_users.v1.PreloadedUserSettings.SlayerSDKReceiveInGameDMs slayer_sdk_receive_dms_in_game = 28; */
        if (message.slayerSdkReceiveDmsInGame !== 0)
            writer.tag(28, runtime_1.WireType.Varint).int32(message.slayerSdkReceiveDmsInGame);
        /* discord_protos.discord_users.v1.PreloadedUserSettings.GuildActivityStatusRestrictionDefaultV2 default_guilds_activity_restricted_v2 = 29; */
        if (message.defaultGuildsActivityRestrictedV2 !== 0)
            writer.tag(29, runtime_1.WireType.Varint).int32(message.defaultGuildsActivityRestrictedV2);
        /* optional google.protobuf.BoolValue quests_3p_data_opted_out = 30; */
        if (message.quests3PDataOptedOut)
            wrappers_5.BoolValue.internalBinaryWrite(message.quests3PDataOptedOut, writer.tag(30, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue show_local_time = 31; */
        if (message.showLocalTime)
            wrappers_5.BoolValue.internalBinaryWrite(message.showLocalTime, writer.tag(31, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_users.v1.PreloadedUserSettings.ProfileVisibility profile_visibility = 32; */
        if (message.profileVisibility !== 0)
            writer.tag(32, runtime_1.WireType.Varint).int32(message.profileVisibility);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.PrivacySettings
 */
exports.PreloadedUserSettings_PrivacySettings = new PreloadedUserSettings_PrivacySettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_DebugSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.DebugSettings", [
            { no: 1, name: "rtc_panel_show_voice_states", kind: "message", T: () => wrappers_5.BoolValue }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.BoolValue rtc_panel_show_voice_states */ 1:
                    message.rtcPanelShowVoiceStates = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.rtcPanelShowVoiceStates);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional google.protobuf.BoolValue rtc_panel_show_voice_states = 1; */
        if (message.rtcPanelShowVoiceStates)
            wrappers_5.BoolValue.internalBinaryWrite(message.rtcPanelShowVoiceStates, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.DebugSettings
 */
exports.PreloadedUserSettings_DebugSettings = new PreloadedUserSettings_DebugSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_GameLibrarySettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.GameLibrarySettings", [
            { no: 1, name: "install_shortcut_desktop", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 2, name: "install_shortcut_start_menu", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 3, name: "disable_games_tab", kind: "message", T: () => wrappers_5.BoolValue }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.BoolValue install_shortcut_desktop */ 1:
                    message.installShortcutDesktop = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.installShortcutDesktop);
                    break;
                case /* optional google.protobuf.BoolValue install_shortcut_start_menu */ 2:
                    message.installShortcutStartMenu = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.installShortcutStartMenu);
                    break;
                case /* optional google.protobuf.BoolValue disable_games_tab */ 3:
                    message.disableGamesTab = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.disableGamesTab);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional google.protobuf.BoolValue install_shortcut_desktop = 1; */
        if (message.installShortcutDesktop)
            wrappers_5.BoolValue.internalBinaryWrite(message.installShortcutDesktop, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue install_shortcut_start_menu = 2; */
        if (message.installShortcutStartMenu)
            wrappers_5.BoolValue.internalBinaryWrite(message.installShortcutStartMenu, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue disable_games_tab = 3; */
        if (message.disableGamesTab)
            wrappers_5.BoolValue.internalBinaryWrite(message.disableGamesTab, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.GameLibrarySettings
 */
exports.PreloadedUserSettings_GameLibrarySettings = new PreloadedUserSettings_GameLibrarySettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_CustomStatus$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.CustomStatus", [
            { no: 1, name: "text", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "emoji_id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 3, name: "emoji_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "expires_at_ms", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 5, name: "created_at_ms", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 6, name: "label", kind: "message", T: () => wrappers_6.StringValue }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.text = "";
        message.emojiId = 0n;
        message.emojiName = "";
        message.expiresAtMs = 0n;
        message.createdAtMs = 0n;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string text */ 1:
                    message.text = reader.string();
                    break;
                case /* fixed64 emoji_id */ 2:
                    message.emojiId = reader.fixed64().toBigInt();
                    break;
                case /* string emoji_name */ 3:
                    message.emojiName = reader.string();
                    break;
                case /* fixed64 expires_at_ms */ 4:
                    message.expiresAtMs = reader.fixed64().toBigInt();
                    break;
                case /* fixed64 created_at_ms */ 5:
                    message.createdAtMs = reader.fixed64().toBigInt();
                    break;
                case /* optional google.protobuf.StringValue label */ 6:
                    message.label = wrappers_6.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.label);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* string text = 1; */
        if (message.text !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.text);
        /* fixed64 emoji_id = 2; */
        if (message.emojiId !== 0n)
            writer.tag(2, runtime_1.WireType.Bit64).fixed64(message.emojiId);
        /* string emoji_name = 3; */
        if (message.emojiName !== "")
            writer.tag(3, runtime_1.WireType.LengthDelimited).string(message.emojiName);
        /* fixed64 expires_at_ms = 4; */
        if (message.expiresAtMs !== 0n)
            writer.tag(4, runtime_1.WireType.Bit64).fixed64(message.expiresAtMs);
        /* fixed64 created_at_ms = 5; */
        if (message.createdAtMs !== 0n)
            writer.tag(5, runtime_1.WireType.Bit64).fixed64(message.createdAtMs);
        /* optional google.protobuf.StringValue label = 6; */
        if (message.label)
            wrappers_6.StringValue.internalBinaryWrite(message.label, writer.tag(6, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.CustomStatus
 */
exports.PreloadedUserSettings_CustomStatus = new PreloadedUserSettings_CustomStatus$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_StatusSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.StatusSettings", [
            { no: 1, name: "status", kind: "message", T: () => wrappers_6.StringValue },
            { no: 2, name: "custom_status", kind: "message", T: () => exports.PreloadedUserSettings_CustomStatus },
            { no: 3, name: "show_current_game", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 4, name: "status_expires_at_ms", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 5, name: "status_created_at_ms", kind: "message", T: () => wrappers_7.UInt64Value }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.statusExpiresAtMs = 0n;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.StringValue status */ 1:
                    message.status = wrappers_6.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.status);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.CustomStatus custom_status */ 2:
                    message.customStatus = exports.PreloadedUserSettings_CustomStatus.internalBinaryRead(reader, reader.uint32(), options, message.customStatus);
                    break;
                case /* optional google.protobuf.BoolValue show_current_game */ 3:
                    message.showCurrentGame = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.showCurrentGame);
                    break;
                case /* fixed64 status_expires_at_ms */ 4:
                    message.statusExpiresAtMs = reader.fixed64().toBigInt();
                    break;
                case /* optional google.protobuf.UInt64Value status_created_at_ms */ 5:
                    message.statusCreatedAtMs = wrappers_7.UInt64Value.internalBinaryRead(reader, reader.uint32(), options, message.statusCreatedAtMs);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional google.protobuf.StringValue status = 1; */
        if (message.status)
            wrappers_6.StringValue.internalBinaryWrite(message.status, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.CustomStatus custom_status = 2; */
        if (message.customStatus)
            exports.PreloadedUserSettings_CustomStatus.internalBinaryWrite(message.customStatus, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue show_current_game = 3; */
        if (message.showCurrentGame)
            wrappers_5.BoolValue.internalBinaryWrite(message.showCurrentGame, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* fixed64 status_expires_at_ms = 4; */
        if (message.statusExpiresAtMs !== 0n)
            writer.tag(4, runtime_1.WireType.Bit64).fixed64(message.statusExpiresAtMs);
        /* optional google.protobuf.UInt64Value status_created_at_ms = 5; */
        if (message.statusCreatedAtMs)
            wrappers_7.UInt64Value.internalBinaryWrite(message.statusCreatedAtMs, writer.tag(5, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.StatusSettings
 */
exports.PreloadedUserSettings_StatusSettings = new PreloadedUserSettings_StatusSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_LocalizationSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.LocalizationSettings", [
            { no: 1, name: "locale", kind: "message", T: () => wrappers_6.StringValue },
            { no: 2, name: "timezone_offset", kind: "message", T: () => wrappers_2.Int32Value },
            { no: 3, name: "timezone_name", kind: "message", T: () => wrappers_6.StringValue }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.StringValue locale */ 1:
                    message.locale = wrappers_6.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.locale);
                    break;
                case /* optional google.protobuf.Int32Value timezone_offset */ 2:
                    message.timezoneOffset = wrappers_2.Int32Value.internalBinaryRead(reader, reader.uint32(), options, message.timezoneOffset);
                    break;
                case /* optional google.protobuf.StringValue timezone_name */ 3:
                    message.timezoneName = wrappers_6.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.timezoneName);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional google.protobuf.StringValue locale = 1; */
        if (message.locale)
            wrappers_6.StringValue.internalBinaryWrite(message.locale, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.Int32Value timezone_offset = 2; */
        if (message.timezoneOffset)
            wrappers_2.Int32Value.internalBinaryWrite(message.timezoneOffset, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.StringValue timezone_name = 3; */
        if (message.timezoneName)
            wrappers_6.StringValue.internalBinaryWrite(message.timezoneName, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.LocalizationSettings
 */
exports.PreloadedUserSettings_LocalizationSettings = new PreloadedUserSettings_LocalizationSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_CustomUserThemeSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.CustomUserThemeSettings", [
            { no: 1, name: "colors", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "gradient_color_stops", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 2 /*ScalarType.FLOAT*/ },
            { no: 3, name: "gradient_angle", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 4, name: "base_mix", kind: "scalar", T: 5 /*ScalarType.INT32*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.colors = [];
        message.gradientColorStops = [];
        message.gradientAngle = 0;
        message.baseMix = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated string colors = 1 [packed = false] */ 1:
                    message.colors.push(reader.string());
                    break;
                case /* repeated float gradient_color_stops */ 2:
                    if (wireType === runtime_1.WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.gradientColorStops.push(reader.float());
                    else
                        message.gradientColorStops.push(reader.float());
                    break;
                case /* int32 gradient_angle */ 3:
                    message.gradientAngle = reader.int32();
                    break;
                case /* int32 base_mix */ 4:
                    message.baseMix = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* repeated string colors = 1 [packed = false]; */
        for (let i = 0; i < message.colors.length; i++)
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.colors[i]);
        /* repeated float gradient_color_stops = 2; */
        if (message.gradientColorStops.length) {
            writer.tag(2, runtime_1.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.gradientColorStops.length; i++)
                writer.float(message.gradientColorStops[i]);
            writer.join();
        }
        /* int32 gradient_angle = 3; */
        if (message.gradientAngle !== 0)
            writer.tag(3, runtime_1.WireType.Varint).int32(message.gradientAngle);
        /* int32 base_mix = 4; */
        if (message.baseMix !== 0)
            writer.tag(4, runtime_1.WireType.Varint).int32(message.baseMix);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.CustomUserThemeSettings
 */
exports.PreloadedUserSettings_CustomUserThemeSettings = new PreloadedUserSettings_CustomUserThemeSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_ClientThemeSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.ClientThemeSettings", [
            { no: 2, name: "background_gradient_preset_id", kind: "message", T: () => wrappers_4.UInt32Value },
            { no: 4, name: "custom_user_theme_settings", kind: "message", T: () => exports.PreloadedUserSettings_CustomUserThemeSettings }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.UInt32Value background_gradient_preset_id */ 2:
                    message.backgroundGradientPresetId = wrappers_4.UInt32Value.internalBinaryRead(reader, reader.uint32(), options, message.backgroundGradientPresetId);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.CustomUserThemeSettings custom_user_theme_settings */ 4:
                    message.customUserThemeSettings = exports.PreloadedUserSettings_CustomUserThemeSettings.internalBinaryRead(reader, reader.uint32(), options, message.customUserThemeSettings);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional google.protobuf.UInt32Value background_gradient_preset_id = 2; */
        if (message.backgroundGradientPresetId)
            wrappers_4.UInt32Value.internalBinaryWrite(message.backgroundGradientPresetId, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.CustomUserThemeSettings custom_user_theme_settings = 4; */
        if (message.customUserThemeSettings)
            exports.PreloadedUserSettings_CustomUserThemeSettings.internalBinaryWrite(message.customUserThemeSettings, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.ClientThemeSettings
 */
exports.PreloadedUserSettings_ClientThemeSettings = new PreloadedUserSettings_ClientThemeSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_AppearanceSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.AppearanceSettings", [
            { no: 1, name: "theme", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.Theme", PreloadedUserSettings_Theme, "THEME_"] },
            { no: 2, name: "developer_mode", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 3, name: "client_theme_settings", kind: "message", T: () => exports.PreloadedUserSettings_ClientThemeSettings },
            { no: 4, name: "mobile_redesign_disabled", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 6, name: "channel_list_layout", kind: "message", T: () => wrappers_6.StringValue },
            { no: 7, name: "message_previews", kind: "message", T: () => wrappers_6.StringValue },
            { no: 8, name: "search_result_exact_count_enabled", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 9, name: "timestamp_hour_cycle", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.TimestampHourCycle", PreloadedUserSettings_TimestampHourCycle, "TIMESTAMP_HOUR_CYCLE_"] },
            { no: 10, name: "happening_now_cards_disabled", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 11, name: "launch_pad_mode", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.LaunchPadMode", PreloadedUserSettings_LaunchPadMode, "LAUNCH_PAD_MODE_"] },
            { no: 12, name: "ui_density", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.UIDensity", PreloadedUserSettings_UIDensity] },
            { no: 13, name: "swipe_right_to_left_mode", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.SwipeRightToLeftMode", PreloadedUserSettings_SwipeRightToLeftMode, "SWIPE_RIGHT_TO_LEFT_MODE_"] }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.theme = 0;
        message.developerMode = false;
        message.mobileRedesignDisabled = false;
        message.timestampHourCycle = 0;
        message.launchPadMode = 0;
        message.uiDensity = 0;
        message.swipeRightToLeftMode = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.Theme theme */ 1:
                    message.theme = reader.int32();
                    break;
                case /* bool developer_mode */ 2:
                    message.developerMode = reader.bool();
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.ClientThemeSettings client_theme_settings */ 3:
                    message.clientThemeSettings = exports.PreloadedUserSettings_ClientThemeSettings.internalBinaryRead(reader, reader.uint32(), options, message.clientThemeSettings);
                    break;
                case /* bool mobile_redesign_disabled */ 4:
                    message.mobileRedesignDisabled = reader.bool();
                    break;
                case /* optional google.protobuf.StringValue channel_list_layout */ 6:
                    message.channelListLayout = wrappers_6.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.channelListLayout);
                    break;
                case /* optional google.protobuf.StringValue message_previews */ 7:
                    message.messagePreviews = wrappers_6.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.messagePreviews);
                    break;
                case /* optional google.protobuf.BoolValue search_result_exact_count_enabled */ 8:
                    message.searchResultExactCountEnabled = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.searchResultExactCountEnabled);
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.TimestampHourCycle timestamp_hour_cycle */ 9:
                    message.timestampHourCycle = reader.int32();
                    break;
                case /* optional google.protobuf.BoolValue happening_now_cards_disabled */ 10:
                    message.happeningNowCardsDisabled = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.happeningNowCardsDisabled);
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.LaunchPadMode launch_pad_mode */ 11:
                    message.launchPadMode = reader.int32();
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.UIDensity ui_density */ 12:
                    message.uiDensity = reader.int32();
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.SwipeRightToLeftMode swipe_right_to_left_mode */ 13:
                    message.swipeRightToLeftMode = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* discord_protos.discord_users.v1.PreloadedUserSettings.Theme theme = 1; */
        if (message.theme !== 0)
            writer.tag(1, runtime_1.WireType.Varint).int32(message.theme);
        /* bool developer_mode = 2; */
        if (message.developerMode !== false)
            writer.tag(2, runtime_1.WireType.Varint).bool(message.developerMode);
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.ClientThemeSettings client_theme_settings = 3; */
        if (message.clientThemeSettings)
            exports.PreloadedUserSettings_ClientThemeSettings.internalBinaryWrite(message.clientThemeSettings, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* bool mobile_redesign_disabled = 4; */
        if (message.mobileRedesignDisabled !== false)
            writer.tag(4, runtime_1.WireType.Varint).bool(message.mobileRedesignDisabled);
        /* optional google.protobuf.StringValue channel_list_layout = 6; */
        if (message.channelListLayout)
            wrappers_6.StringValue.internalBinaryWrite(message.channelListLayout, writer.tag(6, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.StringValue message_previews = 7; */
        if (message.messagePreviews)
            wrappers_6.StringValue.internalBinaryWrite(message.messagePreviews, writer.tag(7, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue search_result_exact_count_enabled = 8; */
        if (message.searchResultExactCountEnabled)
            wrappers_5.BoolValue.internalBinaryWrite(message.searchResultExactCountEnabled, writer.tag(8, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_users.v1.PreloadedUserSettings.TimestampHourCycle timestamp_hour_cycle = 9; */
        if (message.timestampHourCycle !== 0)
            writer.tag(9, runtime_1.WireType.Varint).int32(message.timestampHourCycle);
        /* optional google.protobuf.BoolValue happening_now_cards_disabled = 10; */
        if (message.happeningNowCardsDisabled)
            wrappers_5.BoolValue.internalBinaryWrite(message.happeningNowCardsDisabled, writer.tag(10, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_users.v1.PreloadedUserSettings.LaunchPadMode launch_pad_mode = 11; */
        if (message.launchPadMode !== 0)
            writer.tag(11, runtime_1.WireType.Varint).int32(message.launchPadMode);
        /* discord_protos.discord_users.v1.PreloadedUserSettings.UIDensity ui_density = 12; */
        if (message.uiDensity !== 0)
            writer.tag(12, runtime_1.WireType.Varint).int32(message.uiDensity);
        /* discord_protos.discord_users.v1.PreloadedUserSettings.SwipeRightToLeftMode swipe_right_to_left_mode = 13; */
        if (message.swipeRightToLeftMode !== 0)
            writer.tag(13, runtime_1.WireType.Varint).int32(message.swipeRightToLeftMode);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.AppearanceSettings
 */
exports.PreloadedUserSettings_AppearanceSettings = new PreloadedUserSettings_AppearanceSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_GuildFolder$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.GuildFolder", [
            { no: 1, name: "guild_ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 2, name: "id", kind: "message", T: () => wrappers_1.Int64Value },
            { no: 3, name: "name", kind: "message", T: () => wrappers_6.StringValue },
            { no: 4, name: "color", kind: "message", T: () => wrappers_7.UInt64Value }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.guildIds = [];
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated fixed64 guild_ids */ 1:
                    if (wireType === runtime_1.WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.guildIds.push(reader.fixed64().toBigInt());
                    else
                        message.guildIds.push(reader.fixed64().toBigInt());
                    break;
                case /* optional google.protobuf.Int64Value id */ 2:
                    message.id = wrappers_1.Int64Value.internalBinaryRead(reader, reader.uint32(), options, message.id);
                    break;
                case /* optional google.protobuf.StringValue name */ 3:
                    message.name = wrappers_6.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.name);
                    break;
                case /* optional google.protobuf.UInt64Value color */ 4:
                    message.color = wrappers_7.UInt64Value.internalBinaryRead(reader, reader.uint32(), options, message.color);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* repeated fixed64 guild_ids = 1; */
        if (message.guildIds.length) {
            writer.tag(1, runtime_1.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.guildIds.length; i++)
                writer.fixed64(message.guildIds[i]);
            writer.join();
        }
        /* optional google.protobuf.Int64Value id = 2; */
        if (message.id)
            wrappers_1.Int64Value.internalBinaryWrite(message.id, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.StringValue name = 3; */
        if (message.name)
            wrappers_6.StringValue.internalBinaryWrite(message.name, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.UInt64Value color = 4; */
        if (message.color)
            wrappers_7.UInt64Value.internalBinaryWrite(message.color, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.GuildFolder
 */
exports.PreloadedUserSettings_GuildFolder = new PreloadedUserSettings_GuildFolder$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_GuildFolders$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.GuildFolders", [
            { no: 1, name: "folders", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => exports.PreloadedUserSettings_GuildFolder },
            { no: 2, name: "guild_positions", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.folders = [];
        message.guildPositions = [];
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated discord_protos.discord_users.v1.PreloadedUserSettings.GuildFolder folders */ 1:
                    message.folders.push(exports.PreloadedUserSettings_GuildFolder.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated fixed64 guild_positions */ 2:
                    if (wireType === runtime_1.WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.guildPositions.push(reader.fixed64().toBigInt());
                    else
                        message.guildPositions.push(reader.fixed64().toBigInt());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* repeated discord_protos.discord_users.v1.PreloadedUserSettings.GuildFolder folders = 1; */
        for (let i = 0; i < message.folders.length; i++)
            exports.PreloadedUserSettings_GuildFolder.internalBinaryWrite(message.folders[i], writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* repeated fixed64 guild_positions = 2; */
        if (message.guildPositions.length) {
            writer.tag(2, runtime_1.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.guildPositions.length; i++)
                writer.fixed64(message.guildPositions[i]);
            writer.join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.GuildFolders
 */
exports.PreloadedUserSettings_GuildFolders = new PreloadedUserSettings_GuildFolders$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_FavoriteChannel$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.FavoriteChannel", [
            { no: 1, name: "nickname", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "type", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.FavoriteChannelType", PreloadedUserSettings_FavoriteChannelType, "FAVORITE_CHANNEL_TYPE_"] },
            { no: 3, name: "position", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 4, name: "parent_id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.nickname = "";
        message.type = 0;
        message.position = 0;
        message.parentId = 0n;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string nickname */ 1:
                    message.nickname = reader.string();
                    break;
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.FavoriteChannelType type */ 2:
                    message.type = reader.int32();
                    break;
                case /* uint32 position */ 3:
                    message.position = reader.uint32();
                    break;
                case /* fixed64 parent_id */ 4:
                    message.parentId = reader.fixed64().toBigInt();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* string nickname = 1; */
        if (message.nickname !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.nickname);
        /* discord_protos.discord_users.v1.PreloadedUserSettings.FavoriteChannelType type = 2; */
        if (message.type !== 0)
            writer.tag(2, runtime_1.WireType.Varint).int32(message.type);
        /* uint32 position = 3; */
        if (message.position !== 0)
            writer.tag(3, runtime_1.WireType.Varint).uint32(message.position);
        /* fixed64 parent_id = 4; */
        if (message.parentId !== 0n)
            writer.tag(4, runtime_1.WireType.Bit64).fixed64(message.parentId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.FavoriteChannel
 */
exports.PreloadedUserSettings_FavoriteChannel = new PreloadedUserSettings_FavoriteChannel$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_Favorites$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.Favorites", [
            { no: 1, name: "favorite_channels", kind: "map", K: 6 /*ScalarType.FIXED64*/, V: { kind: "message", T: () => exports.PreloadedUserSettings_FavoriteChannel } },
            { no: 2, name: "muted", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.favoriteChannels = {};
        message.muted = false;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.FavoriteChannel> favorite_channels */ 1:
                    this.binaryReadMap1(message.favoriteChannels, reader, options);
                    break;
                case /* bool muted */ 2:
                    message.muted = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    binaryReadMap1(map, reader, options) {
        let len = reader.uint32(), end = reader.pos + len, key, val;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.fixed64().toString();
                    break;
                case 2:
                    val = exports.PreloadedUserSettings_FavoriteChannel.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for discord_protos.discord_users.v1.PreloadedUserSettings.Favorites.favorite_channels");
            }
        }
        map[key ?? "0"] = val ?? exports.PreloadedUserSettings_FavoriteChannel.create();
    }
    internalBinaryWrite(message, writer, options) {
        /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.FavoriteChannel> favorite_channels = 1; */
        for (let k of globalThis.Object.keys(message.favoriteChannels)) {
            writer.tag(1, runtime_1.WireType.LengthDelimited).fork().tag(1, runtime_1.WireType.Bit64).fixed64(k);
            writer.tag(2, runtime_1.WireType.LengthDelimited).fork();
            exports.PreloadedUserSettings_FavoriteChannel.internalBinaryWrite(message.favoriteChannels[k], writer, options);
            writer.join().join();
        }
        /* bool muted = 2; */
        if (message.muted !== false)
            writer.tag(2, runtime_1.WireType.Varint).bool(message.muted);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.Favorites
 */
exports.PreloadedUserSettings_Favorites = new PreloadedUserSettings_Favorites$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_AudioContextSetting$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.AudioContextSetting", [
            { no: 1, name: "muted", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "volume", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ },
            { no: 3, name: "modified_at", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 4, name: "soundboard_muted", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.muted = false;
        message.volume = 0;
        message.modifiedAt = 0n;
        message.soundboardMuted = false;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool muted */ 1:
                    message.muted = reader.bool();
                    break;
                case /* float volume */ 2:
                    message.volume = reader.float();
                    break;
                case /* fixed64 modified_at */ 3:
                    message.modifiedAt = reader.fixed64().toBigInt();
                    break;
                case /* bool soundboard_muted */ 4:
                    message.soundboardMuted = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* bool muted = 1; */
        if (message.muted !== false)
            writer.tag(1, runtime_1.WireType.Varint).bool(message.muted);
        /* float volume = 2; */
        if (message.volume !== 0)
            writer.tag(2, runtime_1.WireType.Bit32).float(message.volume);
        /* fixed64 modified_at = 3; */
        if (message.modifiedAt !== 0n)
            writer.tag(3, runtime_1.WireType.Bit64).fixed64(message.modifiedAt);
        /* bool soundboard_muted = 4; */
        if (message.soundboardMuted !== false)
            writer.tag(4, runtime_1.WireType.Varint).bool(message.soundboardMuted);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.AudioContextSetting
 */
exports.PreloadedUserSettings_AudioContextSetting = new PreloadedUserSettings_AudioContextSetting$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_AudioSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.AudioSettings", [
            { no: 1, name: "user", kind: "map", K: 6 /*ScalarType.FIXED64*/, V: { kind: "message", T: () => exports.PreloadedUserSettings_AudioContextSetting } },
            { no: 2, name: "stream", kind: "map", K: 6 /*ScalarType.FIXED64*/, V: { kind: "message", T: () => exports.PreloadedUserSettings_AudioContextSetting } }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.user = {};
        message.stream = {};
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.AudioContextSetting> user */ 1:
                    this.binaryReadMap1(message.user, reader, options);
                    break;
                case /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.AudioContextSetting> stream */ 2:
                    this.binaryReadMap2(message.stream, reader, options);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    binaryReadMap1(map, reader, options) {
        let len = reader.uint32(), end = reader.pos + len, key, val;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.fixed64().toString();
                    break;
                case 2:
                    val = exports.PreloadedUserSettings_AudioContextSetting.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for discord_protos.discord_users.v1.PreloadedUserSettings.AudioSettings.user");
            }
        }
        map[key ?? "0"] = val ?? exports.PreloadedUserSettings_AudioContextSetting.create();
    }
    binaryReadMap2(map, reader, options) {
        let len = reader.uint32(), end = reader.pos + len, key, val;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.fixed64().toString();
                    break;
                case 2:
                    val = exports.PreloadedUserSettings_AudioContextSetting.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for discord_protos.discord_users.v1.PreloadedUserSettings.AudioSettings.stream");
            }
        }
        map[key ?? "0"] = val ?? exports.PreloadedUserSettings_AudioContextSetting.create();
    }
    internalBinaryWrite(message, writer, options) {
        /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.AudioContextSetting> user = 1; */
        for (let k of globalThis.Object.keys(message.user)) {
            writer.tag(1, runtime_1.WireType.LengthDelimited).fork().tag(1, runtime_1.WireType.Bit64).fixed64(k);
            writer.tag(2, runtime_1.WireType.LengthDelimited).fork();
            exports.PreloadedUserSettings_AudioContextSetting.internalBinaryWrite(message.user[k], writer, options);
            writer.join().join();
        }
        /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.AudioContextSetting> stream = 2; */
        for (let k of globalThis.Object.keys(message.stream)) {
            writer.tag(2, runtime_1.WireType.LengthDelimited).fork().tag(1, runtime_1.WireType.Bit64).fixed64(k);
            writer.tag(2, runtime_1.WireType.LengthDelimited).fork();
            exports.PreloadedUserSettings_AudioContextSetting.internalBinaryWrite(message.stream[k], writer, options);
            writer.join().join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.AudioSettings
 */
exports.PreloadedUserSettings_AudioSettings = new PreloadedUserSettings_AudioSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_CommunitiesSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.CommunitiesSettings", [
            { no: 1, name: "disable_home_auto_nav", kind: "message", T: () => wrappers_5.BoolValue }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.BoolValue disable_home_auto_nav */ 1:
                    message.disableHomeAutoNav = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.disableHomeAutoNav);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional google.protobuf.BoolValue disable_home_auto_nav = 1; */
        if (message.disableHomeAutoNav)
            wrappers_5.BoolValue.internalBinaryWrite(message.disableHomeAutoNav, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.CommunitiesSettings
 */
exports.PreloadedUserSettings_CommunitiesSettings = new PreloadedUserSettings_CommunitiesSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_BroadcastSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.BroadcastSettings", [
            { no: 1, name: "allow_friends", kind: "message", T: () => wrappers_5.BoolValue },
            { no: 2, name: "allowed_guild_ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 3, name: "allowed_user_ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 4, name: "auto_broadcast", kind: "message", T: () => wrappers_5.BoolValue }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.allowedGuildIds = [];
        message.allowedUserIds = [];
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.BoolValue allow_friends */ 1:
                    message.allowFriends = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.allowFriends);
                    break;
                case /* repeated fixed64 allowed_guild_ids */ 2:
                    if (wireType === runtime_1.WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.allowedGuildIds.push(reader.fixed64().toBigInt());
                    else
                        message.allowedGuildIds.push(reader.fixed64().toBigInt());
                    break;
                case /* repeated fixed64 allowed_user_ids */ 3:
                    if (wireType === runtime_1.WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.allowedUserIds.push(reader.fixed64().toBigInt());
                    else
                        message.allowedUserIds.push(reader.fixed64().toBigInt());
                    break;
                case /* optional google.protobuf.BoolValue auto_broadcast */ 4:
                    message.autoBroadcast = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.autoBroadcast);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional google.protobuf.BoolValue allow_friends = 1; */
        if (message.allowFriends)
            wrappers_5.BoolValue.internalBinaryWrite(message.allowFriends, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* repeated fixed64 allowed_guild_ids = 2; */
        if (message.allowedGuildIds.length) {
            writer.tag(2, runtime_1.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.allowedGuildIds.length; i++)
                writer.fixed64(message.allowedGuildIds[i]);
            writer.join();
        }
        /* repeated fixed64 allowed_user_ids = 3; */
        if (message.allowedUserIds.length) {
            writer.tag(3, runtime_1.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.allowedUserIds.length; i++)
                writer.fixed64(message.allowedUserIds[i]);
            writer.join();
        }
        /* optional google.protobuf.BoolValue auto_broadcast = 4; */
        if (message.autoBroadcast)
            wrappers_5.BoolValue.internalBinaryWrite(message.autoBroadcast, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.BroadcastSettings
 */
exports.PreloadedUserSettings_BroadcastSettings = new PreloadedUserSettings_BroadcastSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_ClipsSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.ClipsSettings", [
            { no: 1, name: "allow_voice_recording", kind: "message", T: () => wrappers_5.BoolValue }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.BoolValue allow_voice_recording */ 1:
                    message.allowVoiceRecording = wrappers_5.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.allowVoiceRecording);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional google.protobuf.BoolValue allow_voice_recording = 1; */
        if (message.allowVoiceRecording)
            wrappers_5.BoolValue.internalBinaryWrite(message.allowVoiceRecording, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.ClipsSettings
 */
exports.PreloadedUserSettings_ClipsSettings = new PreloadedUserSettings_ClipsSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_ForLaterSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.ForLaterSettings", [
            { no: 1, name: "current_tab", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.ForLaterTab", PreloadedUserSettings_ForLaterTab, "FOR_LATER_TAB_"] }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.currentTab = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.ForLaterTab current_tab */ 1:
                    message.currentTab = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* discord_protos.discord_users.v1.PreloadedUserSettings.ForLaterTab current_tab = 1; */
        if (message.currentTab !== 0)
            writer.tag(1, runtime_1.WireType.Varint).int32(message.currentTab);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.ForLaterSettings
 */
exports.PreloadedUserSettings_ForLaterSettings = new PreloadedUserSettings_ForLaterSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_SpendingLimit$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.SpendingLimit", [
            { no: 1, name: "amount", kind: "scalar", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 2, name: "currency", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.amount = 0n;
        message.currency = "";
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint64 amount */ 1:
                    message.amount = reader.uint64().toBigInt();
                    break;
                case /* string currency */ 2:
                    message.currency = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* uint64 amount = 1; */
        if (message.amount !== 0n)
            writer.tag(1, runtime_1.WireType.Varint).uint64(message.amount);
        /* string currency = 2; */
        if (message.currency !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.currency);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.SpendingLimit
 */
exports.PreloadedUserSettings_SpendingLimit = new PreloadedUserSettings_SpendingLimit$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_SpendingLimitSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.SpendingLimitSettings", [
            { no: 1, name: "one_time_purchase_limit", kind: "message", T: () => exports.PreloadedUserSettings_SpendingLimit }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.SpendingLimit one_time_purchase_limit */ 1:
                    message.oneTimePurchaseLimit = exports.PreloadedUserSettings_SpendingLimit.internalBinaryRead(reader, reader.uint32(), options, message.oneTimePurchaseLimit);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.SpendingLimit one_time_purchase_limit = 1; */
        if (message.oneTimePurchaseLimit)
            exports.PreloadedUserSettings_SpendingLimit.internalBinaryWrite(message.oneTimePurchaseLimit, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.SpendingLimitSettings
 */
exports.PreloadedUserSettings_SpendingLimitSettings = new PreloadedUserSettings_SpendingLimitSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_SafetySettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.SafetySettings", [
            { no: 1, name: "safety_settings_preset", kind: "enum", T: () => ["discord_protos.discord_users.v1.PreloadedUserSettings.SafetySettingsPresetType", PreloadedUserSettings_SafetySettingsPresetType, "SAFETY_SETTINGS_PRESET_TYPE_"] },
            { no: 2, name: "ignore_profile_speedbump_disabled", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 3, name: "spending_limit_settings", kind: "message", T: () => exports.PreloadedUserSettings_SpendingLimitSettings }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.safetySettingsPreset = 0;
        message.ignoreProfileSpeedbumpDisabled = false;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* discord_protos.discord_users.v1.PreloadedUserSettings.SafetySettingsPresetType safety_settings_preset */ 1:
                    message.safetySettingsPreset = reader.int32();
                    break;
                case /* bool ignore_profile_speedbump_disabled */ 2:
                    message.ignoreProfileSpeedbumpDisabled = reader.bool();
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.SpendingLimitSettings spending_limit_settings */ 3:
                    message.spendingLimitSettings = exports.PreloadedUserSettings_SpendingLimitSettings.internalBinaryRead(reader, reader.uint32(), options, message.spendingLimitSettings);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* discord_protos.discord_users.v1.PreloadedUserSettings.SafetySettingsPresetType safety_settings_preset = 1; */
        if (message.safetySettingsPreset !== 0)
            writer.tag(1, runtime_1.WireType.Varint).int32(message.safetySettingsPreset);
        /* bool ignore_profile_speedbump_disabled = 2; */
        if (message.ignoreProfileSpeedbumpDisabled !== false)
            writer.tag(2, runtime_1.WireType.Varint).bool(message.ignoreProfileSpeedbumpDisabled);
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.SpendingLimitSettings spending_limit_settings = 3; */
        if (message.spendingLimitSettings)
            exports.PreloadedUserSettings_SpendingLimitSettings.internalBinaryWrite(message.spendingLimitSettings, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.SafetySettings
 */
exports.PreloadedUserSettings_SafetySettings = new PreloadedUserSettings_SafetySettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_ICYMISettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.ICYMISettings", [
            { no: 1, name: "feed_generated_at", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.feedGeneratedAt = 0n;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* fixed64 feed_generated_at */ 1:
                    message.feedGeneratedAt = reader.fixed64().toBigInt();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* fixed64 feed_generated_at = 1; */
        if (message.feedGeneratedAt !== 0n)
            writer.tag(1, runtime_1.WireType.Bit64).fixed64(message.feedGeneratedAt);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.ICYMISettings
 */
exports.PreloadedUserSettings_ICYMISettings = new PreloadedUserSettings_ICYMISettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_ApplicationDMSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.ApplicationDMSettings", [
            { no: 2, name: "allow_mobile_push", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.allowMobilePush = false;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool allow_mobile_push */ 2:
                    message.allowMobilePush = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* bool allow_mobile_push = 2; */
        if (message.allowMobilePush !== false)
            writer.tag(2, runtime_1.WireType.Varint).bool(message.allowMobilePush);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.ApplicationDMSettings
 */
exports.PreloadedUserSettings_ApplicationDMSettings = new PreloadedUserSettings_ApplicationDMSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_ApplicationSharingSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.ApplicationSharingSettings", [
            { no: 1, name: "disable_application_activity_sharing", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.disableApplicationActivitySharing = false;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool disable_application_activity_sharing */ 1:
                    message.disableApplicationActivitySharing = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* bool disable_application_activity_sharing = 1; */
        if (message.disableApplicationActivitySharing !== false)
            writer.tag(1, runtime_1.WireType.Varint).bool(message.disableApplicationActivitySharing);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.ApplicationSharingSettings
 */
exports.PreloadedUserSettings_ApplicationSharingSettings = new PreloadedUserSettings_ApplicationSharingSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_ApplicationSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.ApplicationSettings", [
            { no: 1, name: "app_dm_settings", kind: "message", T: () => exports.PreloadedUserSettings_ApplicationDMSettings },
            { no: 2, name: "app_sharing_settings", kind: "message", T: () => exports.PreloadedUserSettings_ApplicationSharingSettings }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.ApplicationDMSettings app_dm_settings */ 1:
                    message.appDmSettings = exports.PreloadedUserSettings_ApplicationDMSettings.internalBinaryRead(reader, reader.uint32(), options, message.appDmSettings);
                    break;
                case /* optional discord_protos.discord_users.v1.PreloadedUserSettings.ApplicationSharingSettings app_sharing_settings */ 2:
                    message.appSharingSettings = exports.PreloadedUserSettings_ApplicationSharingSettings.internalBinaryRead(reader, reader.uint32(), options, message.appSharingSettings);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.ApplicationDMSettings app_dm_settings = 1; */
        if (message.appDmSettings)
            exports.PreloadedUserSettings_ApplicationDMSettings.internalBinaryWrite(message.appDmSettings, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_users.v1.PreloadedUserSettings.ApplicationSharingSettings app_sharing_settings = 2; */
        if (message.appSharingSettings)
            exports.PreloadedUserSettings_ApplicationSharingSettings.internalBinaryWrite(message.appSharingSettings, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.ApplicationSettings
 */
exports.PreloadedUserSettings_ApplicationSettings = new PreloadedUserSettings_ApplicationSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_AllApplicationSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.AllApplicationSettings", [
            { no: 1, name: "app_settings", kind: "map", K: 6 /*ScalarType.FIXED64*/, V: { kind: "message", T: () => exports.PreloadedUserSettings_ApplicationSettings } }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.appSettings = {};
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.ApplicationSettings> app_settings */ 1:
                    this.binaryReadMap1(message.appSettings, reader, options);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    binaryReadMap1(map, reader, options) {
        let len = reader.uint32(), end = reader.pos + len, key, val;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.fixed64().toString();
                    break;
                case 2:
                    val = exports.PreloadedUserSettings_ApplicationSettings.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for discord_protos.discord_users.v1.PreloadedUserSettings.AllApplicationSettings.app_settings");
            }
        }
        map[key ?? "0"] = val ?? exports.PreloadedUserSettings_ApplicationSettings.create();
    }
    internalBinaryWrite(message, writer, options) {
        /* map<fixed64, discord_protos.discord_users.v1.PreloadedUserSettings.ApplicationSettings> app_settings = 1; */
        for (let k of globalThis.Object.keys(message.appSettings)) {
            writer.tag(1, runtime_1.WireType.LengthDelimited).fork().tag(1, runtime_1.WireType.Bit64).fixed64(k);
            writer.tag(2, runtime_1.WireType.LengthDelimited).fork();
            exports.PreloadedUserSettings_ApplicationSettings.internalBinaryWrite(message.appSettings[k], writer, options);
            writer.join().join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.AllApplicationSettings
 */
exports.PreloadedUserSettings_AllApplicationSettings = new PreloadedUserSettings_AllApplicationSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_AdsSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.AdsSettings", [
            { no: 1, name: "always_deliver", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.alwaysDeliver = false;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool always_deliver */ 1:
                    message.alwaysDeliver = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* bool always_deliver = 1; */
        if (message.alwaysDeliver !== false)
            writer.tag(1, runtime_1.WireType.Varint).bool(message.alwaysDeliver);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.AdsSettings
 */
exports.PreloadedUserSettings_AdsSettings = new PreloadedUserSettings_AdsSettings$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_InAppFeedbackState$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.InAppFeedbackState", [
            { no: 1, name: "last_impression_time", kind: "message", T: () => wrappers_7.UInt64Value },
            { no: 2, name: "opt_out_expiry_time", kind: "message", T: () => wrappers_7.UInt64Value }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.UInt64Value last_impression_time */ 1:
                    message.lastImpressionTime = wrappers_7.UInt64Value.internalBinaryRead(reader, reader.uint32(), options, message.lastImpressionTime);
                    break;
                case /* optional google.protobuf.UInt64Value opt_out_expiry_time */ 2:
                    message.optOutExpiryTime = wrappers_7.UInt64Value.internalBinaryRead(reader, reader.uint32(), options, message.optOutExpiryTime);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional google.protobuf.UInt64Value last_impression_time = 1; */
        if (message.lastImpressionTime)
            wrappers_7.UInt64Value.internalBinaryWrite(message.lastImpressionTime, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.UInt64Value opt_out_expiry_time = 2; */
        if (message.optOutExpiryTime)
            wrappers_7.UInt64Value.internalBinaryWrite(message.optOutExpiryTime, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.InAppFeedbackState
 */
exports.PreloadedUserSettings_InAppFeedbackState = new PreloadedUserSettings_InAppFeedbackState$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PreloadedUserSettings_InAppFeedbackSettings$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_users.v1.PreloadedUserSettings.InAppFeedbackSettings", [
            { no: 1, name: "in_app_feedback_states", kind: "map", K: 5 /*ScalarType.INT32*/, V: { kind: "message", T: () => exports.PreloadedUserSettings_InAppFeedbackState } }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.inAppFeedbackStates = {};
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<int32, discord_protos.discord_users.v1.PreloadedUserSettings.InAppFeedbackState> in_app_feedback_states */ 1:
                    this.binaryReadMap1(message.inAppFeedbackStates, reader, options);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_2.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    binaryReadMap1(map, reader, options) {
        let len = reader.uint32(), end = reader.pos + len, key, val;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.int32();
                    break;
                case 2:
                    val = exports.PreloadedUserSettings_InAppFeedbackState.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for discord_protos.discord_users.v1.PreloadedUserSettings.InAppFeedbackSettings.in_app_feedback_states");
            }
        }
        map[key ?? 0] = val ?? exports.PreloadedUserSettings_InAppFeedbackState.create();
    }
    internalBinaryWrite(message, writer, options) {
        /* map<int32, discord_protos.discord_users.v1.PreloadedUserSettings.InAppFeedbackState> in_app_feedback_states = 1; */
        for (let k of globalThis.Object.keys(message.inAppFeedbackStates)) {
            writer.tag(1, runtime_1.WireType.LengthDelimited).fork().tag(1, runtime_1.WireType.Varint).int32(parseInt(k));
            writer.tag(2, runtime_1.WireType.LengthDelimited).fork();
            exports.PreloadedUserSettings_InAppFeedbackState.internalBinaryWrite(message.inAppFeedbackStates[k], writer, options);
            writer.join().join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_users.v1.PreloadedUserSettings.InAppFeedbackSettings
 */
exports.PreloadedUserSettings_InAppFeedbackSettings = new PreloadedUserSettings_InAppFeedbackSettings$Type();
