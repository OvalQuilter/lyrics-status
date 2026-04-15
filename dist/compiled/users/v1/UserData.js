"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserData_RestrictedSchedule = exports.UserData_ScheduleRule = exports.UserData_TimeOfDay = exports.UserData_StoreCountry = exports.UserData_DisplayNameStyles = exports.UserData_PremiumState = exports.UserData_SafetyState = exports.UserData_BannedState = exports.UserData_TempBannedState = exports.UserData_DeferredActionState = exports.UserData_RestrictedState = exports.UserData_NormalState = exports.UserData_UserCollectibles = exports.UserData_UserNameplate = exports.UserData_CrossPlatformRestriction = exports.UserData_UserPrimaryGuild = exports.UserData_QuestMetadata = exports.UserData_SafetyFlag = exports.UserData_FeatureLimits = exports.UserData_RateLimitData = exports.UserData_LinkedUser = exports.UserData = exports.UserData_DayOfWeek = exports.UserData_DisplayNameEffect = exports.UserData_DisplayNameFont = exports.UserData_PremiumSubscriptionGroupRole = exports.UserData_PremiumSubscriptionType = exports.UserData_PremiumSource = exports.UserData_SafetyAnnotations = exports.UserData_SafetyStateReason = exports.UserData_UserLinkStatus = exports.UserData_UserLinkType = void 0;
const runtime_1 = require("@protobuf-ts/runtime");
const runtime_2 = require("@protobuf-ts/runtime");
const runtime_3 = require("@protobuf-ts/runtime");
const runtime_4 = require("@protobuf-ts/runtime");
const wrappers_1 = require("../../google/protobuf/wrappers");
const wrappers_2 = require("../../google/protobuf/wrappers");
const wrappers_3 = require("../../google/protobuf/wrappers");
const timestamp_1 = require("../../google/protobuf/timestamp");
/**
 * @generated from protobuf enum discord_protos.users.v1.UserData.UserLinkType
 */
var UserData_UserLinkType;
(function (UserData_UserLinkType) {
    /**
     * @generated from protobuf enum value: USER_LINK_TYPE_UNSPECIFIED = 0;
     */
    UserData_UserLinkType[UserData_UserLinkType["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from protobuf enum value: USER_LINK_TYPE_PARENT = 1;
     */
    UserData_UserLinkType[UserData_UserLinkType["PARENT"] = 1] = "PARENT";
    /**
     * @generated from protobuf enum value: USER_LINK_TYPE_CHILD = 2;
     */
    UserData_UserLinkType[UserData_UserLinkType["CHILD"] = 2] = "CHILD";
})(UserData_UserLinkType || (exports.UserData_UserLinkType = UserData_UserLinkType = {}));
/**
 * @generated from protobuf enum discord_protos.users.v1.UserData.UserLinkStatus
 */
var UserData_UserLinkStatus;
(function (UserData_UserLinkStatus) {
    /**
     * @generated from protobuf enum value: USER_LINK_STATUS_UNSPECIFIED = 0;
     */
    UserData_UserLinkStatus[UserData_UserLinkStatus["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from protobuf enum value: USER_LINK_STATUS_PENDING = 1;
     */
    UserData_UserLinkStatus[UserData_UserLinkStatus["PENDING"] = 1] = "PENDING";
    /**
     * @generated from protobuf enum value: USER_LINK_STATUS_ACTIVE = 2;
     */
    UserData_UserLinkStatus[UserData_UserLinkStatus["ACTIVE"] = 2] = "ACTIVE";
    /**
     * @generated from protobuf enum value: USER_LINK_STATUS_INACTIVE = 3;
     */
    UserData_UserLinkStatus[UserData_UserLinkStatus["INACTIVE"] = 3] = "INACTIVE";
    /**
     * @generated from protobuf enum value: USER_LINK_STATUS_DECLINED = 4;
     */
    UserData_UserLinkStatus[UserData_UserLinkStatus["DECLINED"] = 4] = "DECLINED";
})(UserData_UserLinkStatus || (exports.UserData_UserLinkStatus = UserData_UserLinkStatus = {}));
/**
 * @generated from protobuf enum discord_protos.users.v1.UserData.SafetyStateReason
 */
var UserData_SafetyStateReason;
(function (UserData_SafetyStateReason) {
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_REASON_UNSPECIFIED = 0;
     */
    UserData_SafetyStateReason[UserData_SafetyStateReason["REASON_UNSPECIFIED"] = 0] = "REASON_UNSPECIFIED";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_DISABLED_SUSPICIOUS_ACTIVITY = 1;
     */
    UserData_SafetyStateReason[UserData_SafetyStateReason["DISABLED_SUSPICIOUS_ACTIVITY"] = 1] = "DISABLED_SUSPICIOUS_ACTIVITY";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_SMITE_REMOVE_EMAIL_VERIFICATION = 2;
     */
    UserData_SafetyStateReason[UserData_SafetyStateReason["SMITE_REMOVE_EMAIL_VERIFICATION"] = 2] = "SMITE_REMOVE_EMAIL_VERIFICATION";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_USER_REQUIRED_VERIFICATION_INTERVENTIONS_CLIENT = 3;
     */
    UserData_SafetyStateReason[UserData_SafetyStateReason["USER_REQUIRED_VERIFICATION_INTERVENTIONS_CLIENT"] = 3] = "USER_REQUIRED_VERIFICATION_INTERVENTIONS_CLIENT";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_ACTIVE_ASSIGNMENT_COMPLETED = 4;
     */
    UserData_SafetyStateReason[UserData_SafetyStateReason["ACTIVE_ASSIGNMENT_COMPLETED"] = 4] = "ACTIVE_ASSIGNMENT_COMPLETED";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_ACTIVE_ASSIGNMENT_CREATED = 5;
     */
    UserData_SafetyStateReason[UserData_SafetyStateReason["ACTIVE_ASSIGNMENT_CREATED"] = 5] = "ACTIVE_ASSIGNMENT_CREATED";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_DEFERRED_ASSIGNMENT_CREATED = 6;
     */
    UserData_SafetyStateReason[UserData_SafetyStateReason["DEFERRED_ASSIGNMENT_CREATED"] = 6] = "DEFERRED_ASSIGNMENT_CREATED";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_DEFERRED_ASSIGNMENT_UPGRADED_TO_ACTIVE = 7;
     */
    UserData_SafetyStateReason[UserData_SafetyStateReason["DEFERRED_ASSIGNMENT_UPGRADED_TO_ACTIVE"] = 7] = "DEFERRED_ASSIGNMENT_UPGRADED_TO_ACTIVE";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_DEFERRED_ASSIGNMENT_CANCELLED = 8;
     */
    UserData_SafetyStateReason[UserData_SafetyStateReason["DEFERRED_ASSIGNMENT_CANCELLED"] = 8] = "DEFERRED_ASSIGNMENT_CANCELLED";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_ASSIGNMENT_STATE_REPAIRED = 9;
     */
    UserData_SafetyStateReason[UserData_SafetyStateReason["ASSIGNMENT_STATE_REPAIRED"] = 9] = "ASSIGNMENT_STATE_REPAIRED";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_MANUAL_PERMANENT_BAN = 10;
     */
    UserData_SafetyStateReason[UserData_SafetyStateReason["MANUAL_PERMANENT_BAN"] = 10] = "MANUAL_PERMANENT_BAN";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_SAFETY_SYSTEM_UNBAN = 11;
     */
    UserData_SafetyStateReason[UserData_SafetyStateReason["SAFETY_SYSTEM_UNBAN"] = 11] = "SAFETY_SYSTEM_UNBAN";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_GENERIC_AUTOMATED_SAFETY_ACTION = 12;
     */
    UserData_SafetyStateReason[UserData_SafetyStateReason["GENERIC_AUTOMATED_SAFETY_ACTION"] = 12] = "GENERIC_AUTOMATED_SAFETY_ACTION";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_GENERIC_MANUAL_SAFETY_ACTION = 13;
     */
    UserData_SafetyStateReason[UserData_SafetyStateReason["GENERIC_MANUAL_SAFETY_ACTION"] = 13] = "GENERIC_MANUAL_SAFETY_ACTION";
})(UserData_SafetyStateReason || (exports.UserData_SafetyStateReason = UserData_SafetyStateReason = {}));
/**
 * @generated from protobuf enum discord_protos.users.v1.UserData.SafetyAnnotations
 */
var UserData_SafetyAnnotations;
(function (UserData_SafetyAnnotations) {
    /**
     * @generated from protobuf enum value: SAFETY_ANNOTATIONS_ANNOTATION_UNSPECIFIED = 0;
     */
    UserData_SafetyAnnotations[UserData_SafetyAnnotations["ANNOTATION_UNSPECIFIED"] = 0] = "ANNOTATION_UNSPECIFIED";
    /**
     * @generated from protobuf enum value: SAFETY_ANNOTATIONS_SPAMMER = 1;
     */
    UserData_SafetyAnnotations[UserData_SafetyAnnotations["SPAMMER"] = 1] = "SPAMMER";
    /**
     * @generated from protobuf enum value: SAFETY_ANNOTATIONS_SELF_DELETED = 2;
     */
    UserData_SafetyAnnotations[UserData_SafetyAnnotations["SELF_DELETED"] = 2] = "SELF_DELETED";
    /**
     * @generated from protobuf enum value: SAFETY_ANNOTATIONS_SELF_DISABLED = 3;
     */
    UserData_SafetyAnnotations[UserData_SafetyAnnotations["SELF_DISABLED"] = 3] = "SELF_DISABLED";
    /**
     * @generated from protobuf enum value: SAFETY_ANNOTATIONS_UNDERAGE_DELETED = 4;
     */
    UserData_SafetyAnnotations[UserData_SafetyAnnotations["UNDERAGE_DELETED"] = 4] = "UNDERAGE_DELETED";
    /**
     * @generated from protobuf enum value: SAFETY_ANNOTATIONS_SAFETY_POLICY_VIOLATION = 5;
     */
    UserData_SafetyAnnotations[UserData_SafetyAnnotations["SAFETY_POLICY_VIOLATION"] = 5] = "SAFETY_POLICY_VIOLATION";
    /**
     * @generated from protobuf enum value: SAFETY_ANNOTATIONS_INACTIVITY_DELETED = 6;
     */
    UserData_SafetyAnnotations[UserData_SafetyAnnotations["INACTIVITY_DELETED"] = 6] = "INACTIVITY_DELETED";
    /**
     * @generated from protobuf enum value: SAFETY_ANNOTATIONS_GENERIC_DELETED = 7;
     */
    UserData_SafetyAnnotations[UserData_SafetyAnnotations["GENERIC_DELETED"] = 7] = "GENERIC_DELETED";
})(UserData_SafetyAnnotations || (exports.UserData_SafetyAnnotations = UserData_SafetyAnnotations = {}));
/**
 * @generated from protobuf enum discord_protos.users.v1.UserData.PremiumSource
 */
var UserData_PremiumSource;
(function (UserData_PremiumSource) {
    /**
     * @generated from protobuf enum value: PREMIUM_SOURCE_NONE_UNSPECIFIED = 0;
     */
    UserData_PremiumSource[UserData_PremiumSource["NONE_UNSPECIFIED"] = 0] = "NONE_UNSPECIFIED";
    /**
     * @generated from protobuf enum value: PREMIUM_SOURCE_SUBSCRIPTION = 1;
     */
    UserData_PremiumSource[UserData_PremiumSource["SUBSCRIPTION"] = 1] = "SUBSCRIPTION";
    /**
     * @generated from protobuf enum value: PREMIUM_SOURCE_FRACTIONAL_NITRO = 2;
     */
    UserData_PremiumSource[UserData_PremiumSource["FRACTIONAL_NITRO"] = 2] = "FRACTIONAL_NITRO";
    /**
     * @generated from protobuf enum value: PREMIUM_SOURCE_REVERSE_TRIAL = 3;
     */
    UserData_PremiumSource[UserData_PremiumSource["REVERSE_TRIAL"] = 3] = "REVERSE_TRIAL";
    /**
     * @generated from protobuf enum value: PREMIUM_SOURCE_SUBSCRIPTION_GROUP = 4;
     */
    UserData_PremiumSource[UserData_PremiumSource["SUBSCRIPTION_GROUP"] = 4] = "SUBSCRIPTION_GROUP";
})(UserData_PremiumSource || (exports.UserData_PremiumSource = UserData_PremiumSource = {}));
/**
 * @generated from protobuf enum discord_protos.users.v1.UserData.PremiumSubscriptionType
 */
var UserData_PremiumSubscriptionType;
(function (UserData_PremiumSubscriptionType) {
    /**
     * @generated from protobuf enum value: PREMIUM_SUBSCRIPTION_TYPE_NONE_UNSPECIFIED = 0;
     */
    UserData_PremiumSubscriptionType[UserData_PremiumSubscriptionType["NONE_UNSPECIFIED"] = 0] = "NONE_UNSPECIFIED";
    /**
     * @generated from protobuf enum value: PREMIUM_SUBSCRIPTION_TYPE_BOOST_ONLY = 1;
     */
    UserData_PremiumSubscriptionType[UserData_PremiumSubscriptionType["BOOST_ONLY"] = 1] = "BOOST_ONLY";
    /**
     * @generated from protobuf enum value: PREMIUM_SUBSCRIPTION_TYPE_TIER_0 = 2;
     */
    UserData_PremiumSubscriptionType[UserData_PremiumSubscriptionType["TIER_0"] = 2] = "TIER_0";
    /**
     * @generated from protobuf enum value: PREMIUM_SUBSCRIPTION_TYPE_TIER_1 = 3;
     */
    UserData_PremiumSubscriptionType[UserData_PremiumSubscriptionType["TIER_1"] = 3] = "TIER_1";
    /**
     * @generated from protobuf enum value: PREMIUM_SUBSCRIPTION_TYPE_TIER_2 = 4;
     */
    UserData_PremiumSubscriptionType[UserData_PremiumSubscriptionType["TIER_2"] = 4] = "TIER_2";
})(UserData_PremiumSubscriptionType || (exports.UserData_PremiumSubscriptionType = UserData_PremiumSubscriptionType = {}));
/**
 * @generated from protobuf enum discord_protos.users.v1.UserData.PremiumSubscriptionGroupRole
 */
var UserData_PremiumSubscriptionGroupRole;
(function (UserData_PremiumSubscriptionGroupRole) {
    /**
     * @generated from protobuf enum value: PREMIUM_SUBSCRIPTION_GROUP_ROLE_UNSPECIFIED = 0;
     */
    UserData_PremiumSubscriptionGroupRole[UserData_PremiumSubscriptionGroupRole["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from protobuf enum value: PREMIUM_SUBSCRIPTION_GROUP_ROLE_PRIMARY = 1;
     */
    UserData_PremiumSubscriptionGroupRole[UserData_PremiumSubscriptionGroupRole["PRIMARY"] = 1] = "PRIMARY";
    /**
     * @generated from protobuf enum value: PREMIUM_SUBSCRIPTION_GROUP_ROLE_MEMBER = 2;
     */
    UserData_PremiumSubscriptionGroupRole[UserData_PremiumSubscriptionGroupRole["MEMBER"] = 2] = "MEMBER";
})(UserData_PremiumSubscriptionGroupRole || (exports.UserData_PremiumSubscriptionGroupRole = UserData_PremiumSubscriptionGroupRole = {}));
/**
 * @generated from protobuf enum discord_protos.users.v1.UserData.DisplayNameFont
 */
var UserData_DisplayNameFont;
(function (UserData_DisplayNameFont) {
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_UNSPECIFIED = 0;
     */
    UserData_DisplayNameFont[UserData_DisplayNameFont["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_DEFAULT = 11;
     */
    UserData_DisplayNameFont[UserData_DisplayNameFont["DEFAULT"] = 11] = "DEFAULT";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_BANGERS = 1;
     */
    UserData_DisplayNameFont[UserData_DisplayNameFont["BANGERS"] = 1] = "BANGERS";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_BIO_RHYME = 2;
     */
    UserData_DisplayNameFont[UserData_DisplayNameFont["BIO_RHYME"] = 2] = "BIO_RHYME";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_CHERRY_BOMB = 3;
     */
    UserData_DisplayNameFont[UserData_DisplayNameFont["CHERRY_BOMB"] = 3] = "CHERRY_BOMB";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_CHICLE = 4;
     */
    UserData_DisplayNameFont[UserData_DisplayNameFont["CHICLE"] = 4] = "CHICLE";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_COMPAGNON = 5;
     */
    UserData_DisplayNameFont[UserData_DisplayNameFont["COMPAGNON"] = 5] = "COMPAGNON";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_MUSEO_MODERNO = 6;
     */
    UserData_DisplayNameFont[UserData_DisplayNameFont["MUSEO_MODERNO"] = 6] = "MUSEO_MODERNO";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_NEO_CASTEL = 7;
     */
    UserData_DisplayNameFont[UserData_DisplayNameFont["NEO_CASTEL"] = 7] = "NEO_CASTEL";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_PIXELIFY = 8;
     */
    UserData_DisplayNameFont[UserData_DisplayNameFont["PIXELIFY"] = 8] = "PIXELIFY";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_RIBES = 9;
     */
    UserData_DisplayNameFont[UserData_DisplayNameFont["RIBES"] = 9] = "RIBES";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_SINISTRE = 10;
     */
    UserData_DisplayNameFont[UserData_DisplayNameFont["SINISTRE"] = 10] = "SINISTRE";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_ZILLA_SLAB = 12;
     */
    UserData_DisplayNameFont[UserData_DisplayNameFont["ZILLA_SLAB"] = 12] = "ZILLA_SLAB";
})(UserData_DisplayNameFont || (exports.UserData_DisplayNameFont = UserData_DisplayNameFont = {}));
/**
 * @generated from protobuf enum discord_protos.users.v1.UserData.DisplayNameEffect
 */
var UserData_DisplayNameEffect;
(function (UserData_DisplayNameEffect) {
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_EFFECT_UNSPECIFIED = 0;
     */
    UserData_DisplayNameEffect[UserData_DisplayNameEffect["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_EFFECT_SOLID = 1;
     */
    UserData_DisplayNameEffect[UserData_DisplayNameEffect["SOLID"] = 1] = "SOLID";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_EFFECT_GRADIENT = 2;
     */
    UserData_DisplayNameEffect[UserData_DisplayNameEffect["GRADIENT"] = 2] = "GRADIENT";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_EFFECT_NEON = 3;
     */
    UserData_DisplayNameEffect[UserData_DisplayNameEffect["NEON"] = 3] = "NEON";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_EFFECT_TOON = 4;
     */
    UserData_DisplayNameEffect[UserData_DisplayNameEffect["TOON"] = 4] = "TOON";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_EFFECT_POP = 5;
     */
    UserData_DisplayNameEffect[UserData_DisplayNameEffect["POP"] = 5] = "POP";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_EFFECT_GLOW = 6;
     */
    UserData_DisplayNameEffect[UserData_DisplayNameEffect["GLOW"] = 6] = "GLOW";
})(UserData_DisplayNameEffect || (exports.UserData_DisplayNameEffect = UserData_DisplayNameEffect = {}));
/**
 * @generated from protobuf enum discord_protos.users.v1.UserData.DayOfWeek
 */
var UserData_DayOfWeek;
(function (UserData_DayOfWeek) {
    /**
     * @generated from protobuf enum value: DAY_OF_WEEK_UNSPECIFIED = 0;
     */
    UserData_DayOfWeek[UserData_DayOfWeek["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from protobuf enum value: DAY_OF_WEEK_MONDAY = 1;
     */
    UserData_DayOfWeek[UserData_DayOfWeek["MONDAY"] = 1] = "MONDAY";
    /**
     * @generated from protobuf enum value: DAY_OF_WEEK_TUESDAY = 2;
     */
    UserData_DayOfWeek[UserData_DayOfWeek["TUESDAY"] = 2] = "TUESDAY";
    /**
     * @generated from protobuf enum value: DAY_OF_WEEK_WEDNESDAY = 3;
     */
    UserData_DayOfWeek[UserData_DayOfWeek["WEDNESDAY"] = 3] = "WEDNESDAY";
    /**
     * @generated from protobuf enum value: DAY_OF_WEEK_THURSDAY = 4;
     */
    UserData_DayOfWeek[UserData_DayOfWeek["THURSDAY"] = 4] = "THURSDAY";
    /**
     * @generated from protobuf enum value: DAY_OF_WEEK_FRIDAY = 5;
     */
    UserData_DayOfWeek[UserData_DayOfWeek["FRIDAY"] = 5] = "FRIDAY";
    /**
     * @generated from protobuf enum value: DAY_OF_WEEK_SATURDAY = 6;
     */
    UserData_DayOfWeek[UserData_DayOfWeek["SATURDAY"] = 6] = "SATURDAY";
    /**
     * @generated from protobuf enum value: DAY_OF_WEEK_SUNDAY = 7;
     */
    UserData_DayOfWeek[UserData_DayOfWeek["SUNDAY"] = 7] = "SUNDAY";
})(UserData_DayOfWeek || (exports.UserData_DayOfWeek = UserData_DayOfWeek = {}));
// @generated message type with reflection information, may provide speed optimized methods
class UserData$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData", [
            { no: 1, name: "linked_users", kind: "map", K: 6 /*ScalarType.FIXED64*/, V: { kind: "message", T: () => exports.UserData_LinkedUser } },
            { no: 2, name: "safety_feature_limits", kind: "map", K: 13 /*ScalarType.UINT32*/, V: { kind: "message", T: () => exports.UserData_FeatureLimits } },
            { no: 3, name: "safety_flags", kind: "map", K: 13 /*ScalarType.UINT32*/, V: { kind: "message", T: () => exports.UserData_SafetyFlag } },
            { no: 4, name: "quest", kind: "message", T: () => exports.UserData_QuestMetadata },
            { no: 5, name: "primary_guild", kind: "message", T: () => exports.UserData_UserPrimaryGuild },
            { no: 6, name: "cross_platform_restriction", kind: "message", T: () => exports.UserData_CrossPlatformRestriction },
            { no: 7, name: "collectibles", kind: "message", T: () => exports.UserData_UserCollectibles },
            { no: 8, name: "safety_state", kind: "message", T: () => exports.UserData_SafetyState },
            { no: 9, name: "premium_state", kind: "message", T: () => exports.UserData_PremiumState },
            { no: 10, name: "display_name_styles", kind: "message", T: () => exports.UserData_DisplayNameStyles },
            { no: 11, name: "store_country", kind: "message", T: () => exports.UserData_StoreCountry },
            { no: 12, name: "restricted_schedule", kind: "message", T: () => exports.UserData_RestrictedSchedule }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.linkedUsers = {};
        message.safetyFeatureLimits = {};
        message.safetyFlags = {};
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<fixed64, discord_protos.users.v1.UserData.LinkedUser> linked_users */ 1:
                    this.binaryReadMap1(message.linkedUsers, reader, options);
                    break;
                case /* map<uint32, discord_protos.users.v1.UserData.FeatureLimits> safety_feature_limits */ 2:
                    this.binaryReadMap2(message.safetyFeatureLimits, reader, options);
                    break;
                case /* map<uint32, discord_protos.users.v1.UserData.SafetyFlag> safety_flags */ 3:
                    this.binaryReadMap3(message.safetyFlags, reader, options);
                    break;
                case /* optional discord_protos.users.v1.UserData.QuestMetadata quest */ 4:
                    message.quest = exports.UserData_QuestMetadata.internalBinaryRead(reader, reader.uint32(), options, message.quest);
                    break;
                case /* optional discord_protos.users.v1.UserData.UserPrimaryGuild primary_guild */ 5:
                    message.primaryGuild = exports.UserData_UserPrimaryGuild.internalBinaryRead(reader, reader.uint32(), options, message.primaryGuild);
                    break;
                case /* optional discord_protos.users.v1.UserData.CrossPlatformRestriction cross_platform_restriction */ 6:
                    message.crossPlatformRestriction = exports.UserData_CrossPlatformRestriction.internalBinaryRead(reader, reader.uint32(), options, message.crossPlatformRestriction);
                    break;
                case /* optional discord_protos.users.v1.UserData.UserCollectibles collectibles */ 7:
                    message.collectibles = exports.UserData_UserCollectibles.internalBinaryRead(reader, reader.uint32(), options, message.collectibles);
                    break;
                case /* optional discord_protos.users.v1.UserData.SafetyState safety_state */ 8:
                    message.safetyState = exports.UserData_SafetyState.internalBinaryRead(reader, reader.uint32(), options, message.safetyState);
                    break;
                case /* optional discord_protos.users.v1.UserData.PremiumState premium_state */ 9:
                    message.premiumState = exports.UserData_PremiumState.internalBinaryRead(reader, reader.uint32(), options, message.premiumState);
                    break;
                case /* optional discord_protos.users.v1.UserData.DisplayNameStyles display_name_styles */ 10:
                    message.displayNameStyles = exports.UserData_DisplayNameStyles.internalBinaryRead(reader, reader.uint32(), options, message.displayNameStyles);
                    break;
                case /* optional discord_protos.users.v1.UserData.StoreCountry store_country */ 11:
                    message.storeCountry = exports.UserData_StoreCountry.internalBinaryRead(reader, reader.uint32(), options, message.storeCountry);
                    break;
                case /* optional discord_protos.users.v1.UserData.RestrictedSchedule restricted_schedule */ 12:
                    message.restrictedSchedule = exports.UserData_RestrictedSchedule.internalBinaryRead(reader, reader.uint32(), options, message.restrictedSchedule);
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
                    val = exports.UserData_LinkedUser.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for discord_protos.users.v1.UserData.linked_users");
            }
        }
        map[key ?? "0"] = val ?? exports.UserData_LinkedUser.create();
    }
    binaryReadMap2(map, reader, options) {
        let len = reader.uint32(), end = reader.pos + len, key, val;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.uint32();
                    break;
                case 2:
                    val = exports.UserData_FeatureLimits.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for discord_protos.users.v1.UserData.safety_feature_limits");
            }
        }
        map[key ?? 0] = val ?? exports.UserData_FeatureLimits.create();
    }
    binaryReadMap3(map, reader, options) {
        let len = reader.uint32(), end = reader.pos + len, key, val;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.uint32();
                    break;
                case 2:
                    val = exports.UserData_SafetyFlag.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for discord_protos.users.v1.UserData.safety_flags");
            }
        }
        map[key ?? 0] = val ?? exports.UserData_SafetyFlag.create();
    }
    internalBinaryWrite(message, writer, options) {
        /* map<fixed64, discord_protos.users.v1.UserData.LinkedUser> linked_users = 1; */
        for (let k of globalThis.Object.keys(message.linkedUsers)) {
            writer.tag(1, runtime_1.WireType.LengthDelimited).fork().tag(1, runtime_1.WireType.Bit64).fixed64(k);
            writer.tag(2, runtime_1.WireType.LengthDelimited).fork();
            exports.UserData_LinkedUser.internalBinaryWrite(message.linkedUsers[k], writer, options);
            writer.join().join();
        }
        /* map<uint32, discord_protos.users.v1.UserData.FeatureLimits> safety_feature_limits = 2; */
        for (let k of globalThis.Object.keys(message.safetyFeatureLimits)) {
            writer.tag(2, runtime_1.WireType.LengthDelimited).fork().tag(1, runtime_1.WireType.Varint).uint32(parseInt(k));
            writer.tag(2, runtime_1.WireType.LengthDelimited).fork();
            exports.UserData_FeatureLimits.internalBinaryWrite(message.safetyFeatureLimits[k], writer, options);
            writer.join().join();
        }
        /* map<uint32, discord_protos.users.v1.UserData.SafetyFlag> safety_flags = 3; */
        for (let k of globalThis.Object.keys(message.safetyFlags)) {
            writer.tag(3, runtime_1.WireType.LengthDelimited).fork().tag(1, runtime_1.WireType.Varint).uint32(parseInt(k));
            writer.tag(2, runtime_1.WireType.LengthDelimited).fork();
            exports.UserData_SafetyFlag.internalBinaryWrite(message.safetyFlags[k], writer, options);
            writer.join().join();
        }
        /* optional discord_protos.users.v1.UserData.QuestMetadata quest = 4; */
        if (message.quest)
            exports.UserData_QuestMetadata.internalBinaryWrite(message.quest, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.users.v1.UserData.UserPrimaryGuild primary_guild = 5; */
        if (message.primaryGuild)
            exports.UserData_UserPrimaryGuild.internalBinaryWrite(message.primaryGuild, writer.tag(5, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.users.v1.UserData.CrossPlatformRestriction cross_platform_restriction = 6; */
        if (message.crossPlatformRestriction)
            exports.UserData_CrossPlatformRestriction.internalBinaryWrite(message.crossPlatformRestriction, writer.tag(6, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.users.v1.UserData.UserCollectibles collectibles = 7; */
        if (message.collectibles)
            exports.UserData_UserCollectibles.internalBinaryWrite(message.collectibles, writer.tag(7, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.users.v1.UserData.SafetyState safety_state = 8; */
        if (message.safetyState)
            exports.UserData_SafetyState.internalBinaryWrite(message.safetyState, writer.tag(8, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.users.v1.UserData.PremiumState premium_state = 9; */
        if (message.premiumState)
            exports.UserData_PremiumState.internalBinaryWrite(message.premiumState, writer.tag(9, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.users.v1.UserData.DisplayNameStyles display_name_styles = 10; */
        if (message.displayNameStyles)
            exports.UserData_DisplayNameStyles.internalBinaryWrite(message.displayNameStyles, writer.tag(10, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.users.v1.UserData.StoreCountry store_country = 11; */
        if (message.storeCountry)
            exports.UserData_StoreCountry.internalBinaryWrite(message.storeCountry, writer.tag(11, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.users.v1.UserData.RestrictedSchedule restricted_schedule = 12; */
        if (message.restrictedSchedule)
            exports.UserData_RestrictedSchedule.internalBinaryWrite(message.restrictedSchedule, writer.tag(12, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData
 */
exports.UserData = new UserData$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserData_LinkedUser$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData.LinkedUser", [
            { no: 1, name: "user_id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 2, name: "link_type", kind: "enum", T: () => ["discord_protos.users.v1.UserData.UserLinkType", UserData_UserLinkType, "USER_LINK_TYPE_"] },
            { no: 3, name: "link_status", kind: "enum", T: () => ["discord_protos.users.v1.UserData.UserLinkStatus", UserData_UserLinkStatus, "USER_LINK_STATUS_"] },
            { no: 4, name: "requestor_id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 5, name: "created_at", kind: "message", T: () => timestamp_1.Timestamp },
            { no: 6, name: "updated_at", kind: "message", T: () => timestamp_1.Timestamp }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.userId = 0n;
        message.linkType = 0;
        message.linkStatus = 0;
        message.requestorId = 0n;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* fixed64 user_id */ 1:
                    message.userId = reader.fixed64().toBigInt();
                    break;
                case /* discord_protos.users.v1.UserData.UserLinkType link_type */ 2:
                    message.linkType = reader.int32();
                    break;
                case /* discord_protos.users.v1.UserData.UserLinkStatus link_status */ 3:
                    message.linkStatus = reader.int32();
                    break;
                case /* fixed64 requestor_id */ 4:
                    message.requestorId = reader.fixed64().toBigInt();
                    break;
                case /* optional google.protobuf.Timestamp created_at */ 5:
                    message.createdAt = timestamp_1.Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.createdAt);
                    break;
                case /* optional google.protobuf.Timestamp updated_at */ 6:
                    message.updatedAt = timestamp_1.Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.updatedAt);
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
        /* fixed64 user_id = 1; */
        if (message.userId !== 0n)
            writer.tag(1, runtime_1.WireType.Bit64).fixed64(message.userId);
        /* discord_protos.users.v1.UserData.UserLinkType link_type = 2; */
        if (message.linkType !== 0)
            writer.tag(2, runtime_1.WireType.Varint).int32(message.linkType);
        /* discord_protos.users.v1.UserData.UserLinkStatus link_status = 3; */
        if (message.linkStatus !== 0)
            writer.tag(3, runtime_1.WireType.Varint).int32(message.linkStatus);
        /* fixed64 requestor_id = 4; */
        if (message.requestorId !== 0n)
            writer.tag(4, runtime_1.WireType.Bit64).fixed64(message.requestorId);
        /* optional google.protobuf.Timestamp created_at = 5; */
        if (message.createdAt)
            timestamp_1.Timestamp.internalBinaryWrite(message.createdAt, writer.tag(5, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.Timestamp updated_at = 6; */
        if (message.updatedAt)
            timestamp_1.Timestamp.internalBinaryWrite(message.updatedAt, writer.tag(6, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData.LinkedUser
 */
exports.UserData_LinkedUser = new UserData_LinkedUser$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserData_RateLimitData$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData.RateLimitData", [
            { no: 1, name: "limit_expiry", kind: "message", T: () => timestamp_1.Timestamp }
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
                case /* optional google.protobuf.Timestamp limit_expiry */ 1:
                    message.limitExpiry = timestamp_1.Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.limitExpiry);
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
        /* optional google.protobuf.Timestamp limit_expiry = 1; */
        if (message.limitExpiry)
            timestamp_1.Timestamp.internalBinaryWrite(message.limitExpiry, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData.RateLimitData
 */
exports.UserData_RateLimitData = new UserData_RateLimitData$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserData_FeatureLimits$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData.FeatureLimits", [
            { no: 1, name: "map", kind: "map", K: 13 /*ScalarType.UINT32*/, V: { kind: "message", T: () => exports.UserData_RateLimitData } }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.map = {};
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<uint32, discord_protos.users.v1.UserData.RateLimitData> map */ 1:
                    this.binaryReadMap1(message.map, reader, options);
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
                    key = reader.uint32();
                    break;
                case 2:
                    val = exports.UserData_RateLimitData.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for discord_protos.users.v1.UserData.FeatureLimits.map");
            }
        }
        map[key ?? 0] = val ?? exports.UserData_RateLimitData.create();
    }
    internalBinaryWrite(message, writer, options) {
        /* map<uint32, discord_protos.users.v1.UserData.RateLimitData> map = 1; */
        for (let k of globalThis.Object.keys(message.map)) {
            writer.tag(1, runtime_1.WireType.LengthDelimited).fork().tag(1, runtime_1.WireType.Varint).uint32(parseInt(k));
            writer.tag(2, runtime_1.WireType.LengthDelimited).fork();
            exports.UserData_RateLimitData.internalBinaryWrite(message.map[k], writer, options);
            writer.join().join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData.FeatureLimits
 */
exports.UserData_FeatureLimits = new UserData_FeatureLimits$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserData_SafetyFlag$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData.SafetyFlag", [
            { no: 1, name: "flag_expiry", kind: "message", T: () => timestamp_1.Timestamp }
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
                case /* optional google.protobuf.Timestamp flag_expiry */ 1:
                    message.flagExpiry = timestamp_1.Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.flagExpiry);
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
        /* optional google.protobuf.Timestamp flag_expiry = 1; */
        if (message.flagExpiry)
            timestamp_1.Timestamp.internalBinaryWrite(message.flagExpiry, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData.SafetyFlag
 */
exports.UserData_SafetyFlag = new UserData_SafetyFlag$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserData_QuestMetadata$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData.QuestMetadata", [
            { no: 1, name: "quests_completed", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.questsCompleted = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint32 quests_completed */ 1:
                    message.questsCompleted = reader.uint32();
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
        /* uint32 quests_completed = 1; */
        if (message.questsCompleted !== 0)
            writer.tag(1, runtime_1.WireType.Varint).uint32(message.questsCompleted);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData.QuestMetadata
 */
exports.UserData_QuestMetadata = new UserData_QuestMetadata$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserData_UserPrimaryGuild$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData.UserPrimaryGuild", [
            { no: 1, name: "identity_guild_id", kind: "message", T: () => wrappers_3.UInt64Value },
            { no: 2, name: "identity_enabled", kind: "message", T: () => wrappers_2.BoolValue },
            { no: 3, name: "tag", kind: "message", T: () => wrappers_1.StringValue },
            { no: 4, name: "badge", kind: "message", T: () => wrappers_1.StringValue }
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
                case /* optional google.protobuf.UInt64Value identity_guild_id */ 1:
                    message.identityGuildId = wrappers_3.UInt64Value.internalBinaryRead(reader, reader.uint32(), options, message.identityGuildId);
                    break;
                case /* optional google.protobuf.BoolValue identity_enabled */ 2:
                    message.identityEnabled = wrappers_2.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.identityEnabled);
                    break;
                case /* optional google.protobuf.StringValue tag */ 3:
                    message.tag = wrappers_1.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.tag);
                    break;
                case /* optional google.protobuf.StringValue badge */ 4:
                    message.badge = wrappers_1.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.badge);
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
        /* optional google.protobuf.UInt64Value identity_guild_id = 1; */
        if (message.identityGuildId)
            wrappers_3.UInt64Value.internalBinaryWrite(message.identityGuildId, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.BoolValue identity_enabled = 2; */
        if (message.identityEnabled)
            wrappers_2.BoolValue.internalBinaryWrite(message.identityEnabled, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.StringValue tag = 3; */
        if (message.tag)
            wrappers_1.StringValue.internalBinaryWrite(message.tag, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.StringValue badge = 4; */
        if (message.badge)
            wrappers_1.StringValue.internalBinaryWrite(message.badge, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData.UserPrimaryGuild
 */
exports.UserData_UserPrimaryGuild = new UserData_UserPrimaryGuild$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserData_CrossPlatformRestriction$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData.CrossPlatformRestriction", [
            { no: 1, name: "restriction_expiry", kind: "message", T: () => timestamp_1.Timestamp },
            { no: 2, name: "application_id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.applicationId = 0n;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional google.protobuf.Timestamp restriction_expiry */ 1:
                    message.restrictionExpiry = timestamp_1.Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.restrictionExpiry);
                    break;
                case /* fixed64 application_id */ 2:
                    message.applicationId = reader.fixed64().toBigInt();
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
        /* optional google.protobuf.Timestamp restriction_expiry = 1; */
        if (message.restrictionExpiry)
            timestamp_1.Timestamp.internalBinaryWrite(message.restrictionExpiry, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* fixed64 application_id = 2; */
        if (message.applicationId !== 0n)
            writer.tag(2, runtime_1.WireType.Bit64).fixed64(message.applicationId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData.CrossPlatformRestriction
 */
exports.UserData_CrossPlatformRestriction = new UserData_CrossPlatformRestriction$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserData_UserNameplate$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData.UserNameplate", [
            { no: 1, name: "asset", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "palette", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "sku_id", kind: "message", T: () => wrappers_3.UInt64Value },
            { no: 4, name: "expires_at", kind: "message", T: () => timestamp_1.Timestamp },
            { no: 5, name: "label", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.asset = "";
        message.palette = "";
        message.label = "";
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string asset */ 1:
                    message.asset = reader.string();
                    break;
                case /* string palette */ 2:
                    message.palette = reader.string();
                    break;
                case /* optional google.protobuf.UInt64Value sku_id */ 3:
                    message.skuId = wrappers_3.UInt64Value.internalBinaryRead(reader, reader.uint32(), options, message.skuId);
                    break;
                case /* optional google.protobuf.Timestamp expires_at */ 4:
                    message.expiresAt = timestamp_1.Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.expiresAt);
                    break;
                case /* string label */ 5:
                    message.label = reader.string();
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
        /* string asset = 1; */
        if (message.asset !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.asset);
        /* string palette = 2; */
        if (message.palette !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.palette);
        /* optional google.protobuf.UInt64Value sku_id = 3; */
        if (message.skuId)
            wrappers_3.UInt64Value.internalBinaryWrite(message.skuId, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.Timestamp expires_at = 4; */
        if (message.expiresAt)
            timestamp_1.Timestamp.internalBinaryWrite(message.expiresAt, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* string label = 5; */
        if (message.label !== "")
            writer.tag(5, runtime_1.WireType.LengthDelimited).string(message.label);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData.UserNameplate
 */
exports.UserData_UserNameplate = new UserData_UserNameplate$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserData_UserCollectibles$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData.UserCollectibles", [
            { no: 1, name: "nameplate", kind: "message", T: () => exports.UserData_UserNameplate }
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
                case /* optional discord_protos.users.v1.UserData.UserNameplate nameplate */ 1:
                    message.nameplate = exports.UserData_UserNameplate.internalBinaryRead(reader, reader.uint32(), options, message.nameplate);
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
        /* optional discord_protos.users.v1.UserData.UserNameplate nameplate = 1; */
        if (message.nameplate)
            exports.UserData_UserNameplate.internalBinaryWrite(message.nameplate, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData.UserCollectibles
 */
exports.UserData_UserCollectibles = new UserData_UserCollectibles$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserData_NormalState$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData.NormalState", []);
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
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData.NormalState
 */
exports.UserData_NormalState = new UserData_NormalState$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserData_RestrictedState$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData.RestrictedState", [
            { no: 1, name: "restricted_until", kind: "message", T: () => timestamp_1.Timestamp }
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
                case /* optional google.protobuf.Timestamp restricted_until */ 1:
                    message.restrictedUntil = timestamp_1.Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.restrictedUntil);
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
        /* optional google.protobuf.Timestamp restricted_until = 1; */
        if (message.restrictedUntil)
            timestamp_1.Timestamp.internalBinaryWrite(message.restrictedUntil, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData.RestrictedState
 */
exports.UserData_RestrictedState = new UserData_RestrictedState$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserData_DeferredActionState$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData.DeferredActionState", [
            { no: 1, name: "action_deferred_until", kind: "message", T: () => timestamp_1.Timestamp }
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
                case /* optional google.protobuf.Timestamp action_deferred_until */ 1:
                    message.actionDeferredUntil = timestamp_1.Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.actionDeferredUntil);
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
        /* optional google.protobuf.Timestamp action_deferred_until = 1; */
        if (message.actionDeferredUntil)
            timestamp_1.Timestamp.internalBinaryWrite(message.actionDeferredUntil, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData.DeferredActionState
 */
exports.UserData_DeferredActionState = new UserData_DeferredActionState$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserData_TempBannedState$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData.TempBannedState", [
            { no: 1, name: "banned_until", kind: "message", T: () => timestamp_1.Timestamp }
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
                case /* optional google.protobuf.Timestamp banned_until */ 1:
                    message.bannedUntil = timestamp_1.Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.bannedUntil);
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
        /* optional google.protobuf.Timestamp banned_until = 1; */
        if (message.bannedUntil)
            timestamp_1.Timestamp.internalBinaryWrite(message.bannedUntil, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData.TempBannedState
 */
exports.UserData_TempBannedState = new UserData_TempBannedState$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserData_BannedState$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData.BannedState", []);
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
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData.BannedState
 */
exports.UserData_BannedState = new UserData_BannedState$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserData_SafetyState$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData.SafetyState", [
            { no: 101, name: "normal", kind: "message", oneof: "state", T: () => exports.UserData_NormalState },
            { no: 102, name: "restricted", kind: "message", oneof: "state", T: () => exports.UserData_RestrictedState },
            { no: 103, name: "deferred_action", kind: "message", oneof: "state", T: () => exports.UserData_DeferredActionState },
            { no: 104, name: "temp_banned", kind: "message", oneof: "state", T: () => exports.UserData_TempBannedState },
            { no: 105, name: "banned", kind: "message", oneof: "state", T: () => exports.UserData_BannedState },
            { no: 1, name: "reason", kind: "enum", T: () => ["discord_protos.users.v1.UserData.SafetyStateReason", UserData_SafetyStateReason, "SAFETY_STATE_REASON_"] },
            { no: 2, name: "annotations", kind: "enum", repeat: 1 /*RepeatType.PACKED*/, T: () => ["discord_protos.users.v1.UserData.SafetyAnnotations", UserData_SafetyAnnotations, "SAFETY_ANNOTATIONS_"] },
            { no: 3, name: "last_mutation_id", kind: "message", T: () => wrappers_3.UInt64Value }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.state = { oneofKind: undefined };
        message.reason = 0;
        message.annotations = [];
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* discord_protos.users.v1.UserData.NormalState normal */ 101:
                    message.state = {
                        oneofKind: "normal",
                        normal: exports.UserData_NormalState.internalBinaryRead(reader, reader.uint32(), options, message.state.normal)
                    };
                    break;
                case /* discord_protos.users.v1.UserData.RestrictedState restricted */ 102:
                    message.state = {
                        oneofKind: "restricted",
                        restricted: exports.UserData_RestrictedState.internalBinaryRead(reader, reader.uint32(), options, message.state.restricted)
                    };
                    break;
                case /* discord_protos.users.v1.UserData.DeferredActionState deferred_action */ 103:
                    message.state = {
                        oneofKind: "deferredAction",
                        deferredAction: exports.UserData_DeferredActionState.internalBinaryRead(reader, reader.uint32(), options, message.state.deferredAction)
                    };
                    break;
                case /* discord_protos.users.v1.UserData.TempBannedState temp_banned */ 104:
                    message.state = {
                        oneofKind: "tempBanned",
                        tempBanned: exports.UserData_TempBannedState.internalBinaryRead(reader, reader.uint32(), options, message.state.tempBanned)
                    };
                    break;
                case /* discord_protos.users.v1.UserData.BannedState banned */ 105:
                    message.state = {
                        oneofKind: "banned",
                        banned: exports.UserData_BannedState.internalBinaryRead(reader, reader.uint32(), options, message.state.banned)
                    };
                    break;
                case /* discord_protos.users.v1.UserData.SafetyStateReason reason */ 1:
                    message.reason = reader.int32();
                    break;
                case /* repeated discord_protos.users.v1.UserData.SafetyAnnotations annotations */ 2:
                    if (wireType === runtime_1.WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.annotations.push(reader.int32());
                    else
                        message.annotations.push(reader.int32());
                    break;
                case /* optional google.protobuf.UInt64Value last_mutation_id */ 3:
                    message.lastMutationId = wrappers_3.UInt64Value.internalBinaryRead(reader, reader.uint32(), options, message.lastMutationId);
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
        /* discord_protos.users.v1.UserData.SafetyStateReason reason = 1; */
        if (message.reason !== 0)
            writer.tag(1, runtime_1.WireType.Varint).int32(message.reason);
        /* repeated discord_protos.users.v1.UserData.SafetyAnnotations annotations = 2; */
        if (message.annotations.length) {
            writer.tag(2, runtime_1.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.annotations.length; i++)
                writer.int32(message.annotations[i]);
            writer.join();
        }
        /* optional google.protobuf.UInt64Value last_mutation_id = 3; */
        if (message.lastMutationId)
            wrappers_3.UInt64Value.internalBinaryWrite(message.lastMutationId, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.users.v1.UserData.NormalState normal = 101; */
        if (message.state.oneofKind === "normal")
            exports.UserData_NormalState.internalBinaryWrite(message.state.normal, writer.tag(101, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.users.v1.UserData.RestrictedState restricted = 102; */
        if (message.state.oneofKind === "restricted")
            exports.UserData_RestrictedState.internalBinaryWrite(message.state.restricted, writer.tag(102, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.users.v1.UserData.DeferredActionState deferred_action = 103; */
        if (message.state.oneofKind === "deferredAction")
            exports.UserData_DeferredActionState.internalBinaryWrite(message.state.deferredAction, writer.tag(103, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.users.v1.UserData.TempBannedState temp_banned = 104; */
        if (message.state.oneofKind === "tempBanned")
            exports.UserData_TempBannedState.internalBinaryWrite(message.state.tempBanned, writer.tag(104, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.users.v1.UserData.BannedState banned = 105; */
        if (message.state.oneofKind === "banned")
            exports.UserData_BannedState.internalBinaryWrite(message.state.banned, writer.tag(105, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData.SafetyState
 */
exports.UserData_SafetyState = new UserData_SafetyState$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserData_PremiumState$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData.PremiumState", [
            { no: 1, name: "premium_source", kind: "enum", T: () => ["discord_protos.users.v1.UserData.PremiumSource", UserData_PremiumSource, "PREMIUM_SOURCE_"] },
            { no: 2, name: "premium_subscription_type", kind: "enum", T: () => ["discord_protos.users.v1.UserData.PremiumSubscriptionType", UserData_PremiumSubscriptionType, "PREMIUM_SUBSCRIPTION_TYPE_"] },
            { no: 3, name: "premium_subscription_group_role", kind: "enum", T: () => ["discord_protos.users.v1.UserData.PremiumSubscriptionGroupRole", UserData_PremiumSubscriptionGroupRole, "PREMIUM_SUBSCRIPTION_GROUP_ROLE_"] }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.premiumSource = 0;
        message.premiumSubscriptionType = 0;
        message.premiumSubscriptionGroupRole = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* discord_protos.users.v1.UserData.PremiumSource premium_source */ 1:
                    message.premiumSource = reader.int32();
                    break;
                case /* discord_protos.users.v1.UserData.PremiumSubscriptionType premium_subscription_type */ 2:
                    message.premiumSubscriptionType = reader.int32();
                    break;
                case /* discord_protos.users.v1.UserData.PremiumSubscriptionGroupRole premium_subscription_group_role */ 3:
                    message.premiumSubscriptionGroupRole = reader.int32();
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
        /* discord_protos.users.v1.UserData.PremiumSource premium_source = 1; */
        if (message.premiumSource !== 0)
            writer.tag(1, runtime_1.WireType.Varint).int32(message.premiumSource);
        /* discord_protos.users.v1.UserData.PremiumSubscriptionType premium_subscription_type = 2; */
        if (message.premiumSubscriptionType !== 0)
            writer.tag(2, runtime_1.WireType.Varint).int32(message.premiumSubscriptionType);
        /* discord_protos.users.v1.UserData.PremiumSubscriptionGroupRole premium_subscription_group_role = 3; */
        if (message.premiumSubscriptionGroupRole !== 0)
            writer.tag(3, runtime_1.WireType.Varint).int32(message.premiumSubscriptionGroupRole);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData.PremiumState
 */
exports.UserData_PremiumState = new UserData_PremiumState$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserData_DisplayNameStyles$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData.DisplayNameStyles", [
            { no: 1, name: "font_id", kind: "enum", T: () => ["discord_protos.users.v1.UserData.DisplayNameFont", UserData_DisplayNameFont, "DISPLAY_NAME_FONT_"] },
            { no: 2, name: "effect_id", kind: "enum", T: () => ["discord_protos.users.v1.UserData.DisplayNameEffect", UserData_DisplayNameEffect, "DISPLAY_NAME_EFFECT_"] },
            { no: 3, name: "colors", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.fontId = 0;
        message.effectId = 0;
        message.colors = [];
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* discord_protos.users.v1.UserData.DisplayNameFont font_id */ 1:
                    message.fontId = reader.int32();
                    break;
                case /* discord_protos.users.v1.UserData.DisplayNameEffect effect_id */ 2:
                    message.effectId = reader.int32();
                    break;
                case /* repeated uint32 colors */ 3:
                    if (wireType === runtime_1.WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.colors.push(reader.uint32());
                    else
                        message.colors.push(reader.uint32());
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
        /* discord_protos.users.v1.UserData.DisplayNameFont font_id = 1; */
        if (message.fontId !== 0)
            writer.tag(1, runtime_1.WireType.Varint).int32(message.fontId);
        /* discord_protos.users.v1.UserData.DisplayNameEffect effect_id = 2; */
        if (message.effectId !== 0)
            writer.tag(2, runtime_1.WireType.Varint).int32(message.effectId);
        /* repeated uint32 colors = 3; */
        if (message.colors.length) {
            writer.tag(3, runtime_1.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.colors.length; i++)
                writer.uint32(message.colors[i]);
            writer.join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData.DisplayNameStyles
 */
exports.UserData_DisplayNameStyles = new UserData_DisplayNameStyles$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserData_StoreCountry$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData.StoreCountry", [
            { no: 1, name: "country", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "set_at", kind: "message", T: () => timestamp_1.Timestamp }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.country = "";
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string country */ 1:
                    message.country = reader.string();
                    break;
                case /* optional google.protobuf.Timestamp set_at */ 2:
                    message.setAt = timestamp_1.Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.setAt);
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
        /* string country = 1; */
        if (message.country !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.country);
        /* optional google.protobuf.Timestamp set_at = 2; */
        if (message.setAt)
            timestamp_1.Timestamp.internalBinaryWrite(message.setAt, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData.StoreCountry
 */
exports.UserData_StoreCountry = new UserData_StoreCountry$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserData_TimeOfDay$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData.TimeOfDay", [
            { no: 1, name: "hours", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "minutes", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "seconds", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 4, name: "nanos", kind: "scalar", T: 5 /*ScalarType.INT32*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.hours = 0;
        message.minutes = 0;
        message.seconds = 0;
        message.nanos = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int32 hours */ 1:
                    message.hours = reader.int32();
                    break;
                case /* int32 minutes */ 2:
                    message.minutes = reader.int32();
                    break;
                case /* int32 seconds */ 3:
                    message.seconds = reader.int32();
                    break;
                case /* int32 nanos */ 4:
                    message.nanos = reader.int32();
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
        /* int32 hours = 1; */
        if (message.hours !== 0)
            writer.tag(1, runtime_1.WireType.Varint).int32(message.hours);
        /* int32 minutes = 2; */
        if (message.minutes !== 0)
            writer.tag(2, runtime_1.WireType.Varint).int32(message.minutes);
        /* int32 seconds = 3; */
        if (message.seconds !== 0)
            writer.tag(3, runtime_1.WireType.Varint).int32(message.seconds);
        /* int32 nanos = 4; */
        if (message.nanos !== 0)
            writer.tag(4, runtime_1.WireType.Varint).int32(message.nanos);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData.TimeOfDay
 */
exports.UserData_TimeOfDay = new UserData_TimeOfDay$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserData_ScheduleRule$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData.ScheduleRule", [
            { no: 1, name: "rule_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "label", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "start_time", kind: "message", T: () => exports.UserData_TimeOfDay },
            { no: 4, name: "end_time", kind: "message", T: () => exports.UserData_TimeOfDay },
            { no: 5, name: "days", kind: "enum", repeat: 1 /*RepeatType.PACKED*/, T: () => ["discord_protos.users.v1.UserData.DayOfWeek", UserData_DayOfWeek, "DAY_OF_WEEK_"] }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.ruleId = "";
        message.label = "";
        message.days = [];
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string rule_id */ 1:
                    message.ruleId = reader.string();
                    break;
                case /* string label */ 2:
                    message.label = reader.string();
                    break;
                case /* optional discord_protos.users.v1.UserData.TimeOfDay start_time */ 3:
                    message.startTime = exports.UserData_TimeOfDay.internalBinaryRead(reader, reader.uint32(), options, message.startTime);
                    break;
                case /* optional discord_protos.users.v1.UserData.TimeOfDay end_time */ 4:
                    message.endTime = exports.UserData_TimeOfDay.internalBinaryRead(reader, reader.uint32(), options, message.endTime);
                    break;
                case /* repeated discord_protos.users.v1.UserData.DayOfWeek days */ 5:
                    if (wireType === runtime_1.WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.days.push(reader.int32());
                    else
                        message.days.push(reader.int32());
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
        /* string rule_id = 1; */
        if (message.ruleId !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.ruleId);
        /* string label = 2; */
        if (message.label !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.label);
        /* optional discord_protos.users.v1.UserData.TimeOfDay start_time = 3; */
        if (message.startTime)
            exports.UserData_TimeOfDay.internalBinaryWrite(message.startTime, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.users.v1.UserData.TimeOfDay end_time = 4; */
        if (message.endTime)
            exports.UserData_TimeOfDay.internalBinaryWrite(message.endTime, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* repeated discord_protos.users.v1.UserData.DayOfWeek days = 5; */
        if (message.days.length) {
            writer.tag(5, runtime_1.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.days.length; i++)
                writer.int32(message.days[i]);
            writer.join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData.ScheduleRule
 */
exports.UserData_ScheduleRule = new UserData_ScheduleRule$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserData_RestrictedSchedule$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.UserData.RestrictedSchedule", [
            { no: 1, name: "rules", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => exports.UserData_ScheduleRule }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.rules = [];
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated discord_protos.users.v1.UserData.ScheduleRule rules */ 1:
                    message.rules.push(exports.UserData_ScheduleRule.internalBinaryRead(reader, reader.uint32(), options));
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
        /* repeated discord_protos.users.v1.UserData.ScheduleRule rules = 1; */
        for (let i = 0; i < message.rules.length; i++)
            exports.UserData_ScheduleRule.internalBinaryWrite(message.rules[i], writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.UserData.RestrictedSchedule
 */
exports.UserData_RestrictedSchedule = new UserData_RestrictedSchedule$Type();
