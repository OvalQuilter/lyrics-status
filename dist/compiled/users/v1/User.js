"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User_DisplayNameStyles = exports.User_SafetyState = exports.User_BannedState = exports.User_TempBannedState = exports.User_DeferredActionState = exports.User_RestrictedState = exports.User_NormalState = exports.User_UserCollectibles = exports.User_UserNameplate = exports.User_UserPrimaryGuild = exports.User_UserAvatarDecoration = exports.User = exports.User_DisplayNameEffect = exports.User_DisplayNameFont = exports.User_SafetyAnnotations = exports.User_SafetyStateReason = void 0;
const runtime_1 = require("@protobuf-ts/runtime");
const runtime_2 = require("@protobuf-ts/runtime");
const runtime_3 = require("@protobuf-ts/runtime");
const runtime_4 = require("@protobuf-ts/runtime");
const timestamp_1 = require("../../google/protobuf/timestamp");
const wrappers_1 = require("../../google/protobuf/wrappers");
const wrappers_2 = require("../../google/protobuf/wrappers");
const wrappers_3 = require("../../google/protobuf/wrappers");
const wrappers_4 = require("../../google/protobuf/wrappers");
/**
 * @generated from protobuf enum discord_protos.users.v1.User.SafetyStateReason
 */
var User_SafetyStateReason;
(function (User_SafetyStateReason) {
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_REASON_UNSPECIFIED = 0;
     */
    User_SafetyStateReason[User_SafetyStateReason["REASON_UNSPECIFIED"] = 0] = "REASON_UNSPECIFIED";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_DISABLED_SUSPICIOUS_ACTIVITY = 1;
     */
    User_SafetyStateReason[User_SafetyStateReason["DISABLED_SUSPICIOUS_ACTIVITY"] = 1] = "DISABLED_SUSPICIOUS_ACTIVITY";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_SMITE_REMOVE_EMAIL_VERIFICATION = 2;
     */
    User_SafetyStateReason[User_SafetyStateReason["SMITE_REMOVE_EMAIL_VERIFICATION"] = 2] = "SMITE_REMOVE_EMAIL_VERIFICATION";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_USER_REQUIRED_VERIFICATION_INTERVENTIONS_CLIENT = 3;
     */
    User_SafetyStateReason[User_SafetyStateReason["USER_REQUIRED_VERIFICATION_INTERVENTIONS_CLIENT"] = 3] = "USER_REQUIRED_VERIFICATION_INTERVENTIONS_CLIENT";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_ACTIVE_ASSIGNMENT_COMPLETED = 4;
     */
    User_SafetyStateReason[User_SafetyStateReason["ACTIVE_ASSIGNMENT_COMPLETED"] = 4] = "ACTIVE_ASSIGNMENT_COMPLETED";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_ACTIVE_ASSIGNMENT_CREATED = 5;
     */
    User_SafetyStateReason[User_SafetyStateReason["ACTIVE_ASSIGNMENT_CREATED"] = 5] = "ACTIVE_ASSIGNMENT_CREATED";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_DEFERRED_ASSIGNMENT_CREATED = 6;
     */
    User_SafetyStateReason[User_SafetyStateReason["DEFERRED_ASSIGNMENT_CREATED"] = 6] = "DEFERRED_ASSIGNMENT_CREATED";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_DEFERRED_ASSIGNMENT_UPGRADED_TO_ACTIVE = 7;
     */
    User_SafetyStateReason[User_SafetyStateReason["DEFERRED_ASSIGNMENT_UPGRADED_TO_ACTIVE"] = 7] = "DEFERRED_ASSIGNMENT_UPGRADED_TO_ACTIVE";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_DEFERRED_ASSIGNMENT_CANCELLED = 8;
     */
    User_SafetyStateReason[User_SafetyStateReason["DEFERRED_ASSIGNMENT_CANCELLED"] = 8] = "DEFERRED_ASSIGNMENT_CANCELLED";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_ASSIGNMENT_STATE_REPAIRED = 9;
     */
    User_SafetyStateReason[User_SafetyStateReason["ASSIGNMENT_STATE_REPAIRED"] = 9] = "ASSIGNMENT_STATE_REPAIRED";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_MANUAL_PERMANENT_BAN = 10;
     */
    User_SafetyStateReason[User_SafetyStateReason["MANUAL_PERMANENT_BAN"] = 10] = "MANUAL_PERMANENT_BAN";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_SAFETY_SYSTEM_UNBAN = 11;
     */
    User_SafetyStateReason[User_SafetyStateReason["SAFETY_SYSTEM_UNBAN"] = 11] = "SAFETY_SYSTEM_UNBAN";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_GENERIC_AUTOMATED_SAFETY_ACTION = 12;
     */
    User_SafetyStateReason[User_SafetyStateReason["GENERIC_AUTOMATED_SAFETY_ACTION"] = 12] = "GENERIC_AUTOMATED_SAFETY_ACTION";
    /**
     * @generated from protobuf enum value: SAFETY_STATE_REASON_GENERIC_MANUAL_SAFETY_ACTION = 13;
     */
    User_SafetyStateReason[User_SafetyStateReason["GENERIC_MANUAL_SAFETY_ACTION"] = 13] = "GENERIC_MANUAL_SAFETY_ACTION";
})(User_SafetyStateReason || (exports.User_SafetyStateReason = User_SafetyStateReason = {}));
/**
 * @generated from protobuf enum discord_protos.users.v1.User.SafetyAnnotations
 */
var User_SafetyAnnotations;
(function (User_SafetyAnnotations) {
    /**
     * @generated from protobuf enum value: SAFETY_ANNOTATIONS_ANNOTATION_UNSPECIFIED = 0;
     */
    User_SafetyAnnotations[User_SafetyAnnotations["ANNOTATION_UNSPECIFIED"] = 0] = "ANNOTATION_UNSPECIFIED";
    /**
     * @generated from protobuf enum value: SAFETY_ANNOTATIONS_SPAMMER = 1;
     */
    User_SafetyAnnotations[User_SafetyAnnotations["SPAMMER"] = 1] = "SPAMMER";
    /**
     * @generated from protobuf enum value: SAFETY_ANNOTATIONS_SELF_DELETED = 2;
     */
    User_SafetyAnnotations[User_SafetyAnnotations["SELF_DELETED"] = 2] = "SELF_DELETED";
    /**
     * @generated from protobuf enum value: SAFETY_ANNOTATIONS_SELF_DISABLED = 3;
     */
    User_SafetyAnnotations[User_SafetyAnnotations["SELF_DISABLED"] = 3] = "SELF_DISABLED";
    /**
     * @generated from protobuf enum value: SAFETY_ANNOTATIONS_UNDERAGE_DELETED = 4;
     */
    User_SafetyAnnotations[User_SafetyAnnotations["UNDERAGE_DELETED"] = 4] = "UNDERAGE_DELETED";
    /**
     * @generated from protobuf enum value: SAFETY_ANNOTATIONS_SAFETY_POLICY_VIOLATION = 5;
     */
    User_SafetyAnnotations[User_SafetyAnnotations["SAFETY_POLICY_VIOLATION"] = 5] = "SAFETY_POLICY_VIOLATION";
    /**
     * @generated from protobuf enum value: SAFETY_ANNOTATIONS_INACTIVITY_DELETED = 6;
     */
    User_SafetyAnnotations[User_SafetyAnnotations["INACTIVITY_DELETED"] = 6] = "INACTIVITY_DELETED";
    /**
     * @generated from protobuf enum value: SAFETY_ANNOTATIONS_GENERIC_DELETED = 7;
     */
    User_SafetyAnnotations[User_SafetyAnnotations["GENERIC_DELETED"] = 7] = "GENERIC_DELETED";
})(User_SafetyAnnotations || (exports.User_SafetyAnnotations = User_SafetyAnnotations = {}));
/**
 * @generated from protobuf enum discord_protos.users.v1.User.DisplayNameFont
 */
var User_DisplayNameFont;
(function (User_DisplayNameFont) {
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_UNSPECIFIED = 0;
     */
    User_DisplayNameFont[User_DisplayNameFont["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_DEFAULT = 11;
     */
    User_DisplayNameFont[User_DisplayNameFont["DEFAULT"] = 11] = "DEFAULT";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_BANGERS = 1;
     */
    User_DisplayNameFont[User_DisplayNameFont["BANGERS"] = 1] = "BANGERS";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_BIO_RHYME = 2;
     */
    User_DisplayNameFont[User_DisplayNameFont["BIO_RHYME"] = 2] = "BIO_RHYME";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_CHERRY_BOMB = 3;
     */
    User_DisplayNameFont[User_DisplayNameFont["CHERRY_BOMB"] = 3] = "CHERRY_BOMB";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_CHICLE = 4;
     */
    User_DisplayNameFont[User_DisplayNameFont["CHICLE"] = 4] = "CHICLE";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_COMPAGNON = 5;
     */
    User_DisplayNameFont[User_DisplayNameFont["COMPAGNON"] = 5] = "COMPAGNON";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_MUSEO_MODERNO = 6;
     */
    User_DisplayNameFont[User_DisplayNameFont["MUSEO_MODERNO"] = 6] = "MUSEO_MODERNO";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_NEO_CASTEL = 7;
     */
    User_DisplayNameFont[User_DisplayNameFont["NEO_CASTEL"] = 7] = "NEO_CASTEL";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_PIXELIFY = 8;
     */
    User_DisplayNameFont[User_DisplayNameFont["PIXELIFY"] = 8] = "PIXELIFY";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_RIBES = 9;
     */
    User_DisplayNameFont[User_DisplayNameFont["RIBES"] = 9] = "RIBES";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_SINISTRE = 10;
     */
    User_DisplayNameFont[User_DisplayNameFont["SINISTRE"] = 10] = "SINISTRE";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_FONT_ZILLA_SLAB = 12;
     */
    User_DisplayNameFont[User_DisplayNameFont["ZILLA_SLAB"] = 12] = "ZILLA_SLAB";
})(User_DisplayNameFont || (exports.User_DisplayNameFont = User_DisplayNameFont = {}));
/**
 * @generated from protobuf enum discord_protos.users.v1.User.DisplayNameEffect
 */
var User_DisplayNameEffect;
(function (User_DisplayNameEffect) {
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_EFFECT_UNSPECIFIED = 0;
     */
    User_DisplayNameEffect[User_DisplayNameEffect["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_EFFECT_SOLID = 1;
     */
    User_DisplayNameEffect[User_DisplayNameEffect["SOLID"] = 1] = "SOLID";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_EFFECT_GRADIENT = 2;
     */
    User_DisplayNameEffect[User_DisplayNameEffect["GRADIENT"] = 2] = "GRADIENT";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_EFFECT_NEON = 3;
     */
    User_DisplayNameEffect[User_DisplayNameEffect["NEON"] = 3] = "NEON";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_EFFECT_TOON = 4;
     */
    User_DisplayNameEffect[User_DisplayNameEffect["TOON"] = 4] = "TOON";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_EFFECT_POP = 5;
     */
    User_DisplayNameEffect[User_DisplayNameEffect["POP"] = 5] = "POP";
    /**
     * @generated from protobuf enum value: DISPLAY_NAME_EFFECT_GLOW = 6;
     */
    User_DisplayNameEffect[User_DisplayNameEffect["GLOW"] = 6] = "GLOW";
})(User_DisplayNameEffect || (exports.User_DisplayNameEffect = User_DisplayNameEffect = {}));
// @generated message type with reflection information, may provide speed optimized methods
class User$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.User", [
            { no: 1, name: "id", kind: "scalar", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 2, name: "username", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "discriminator", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "avatar", kind: "message", T: () => wrappers_4.StringValue },
            { no: 5, name: "bot", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 6, name: "public_flags", kind: "scalar", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 8, name: "global_name", kind: "message", T: () => wrappers_4.StringValue },
            { no: 9, name: "avatar_decoration_data", kind: "message", T: () => exports.User_UserAvatarDecoration },
            { no: 10, name: "primary_guild", kind: "message", T: () => exports.User_UserPrimaryGuild },
            { no: 11, name: "collectibles", kind: "message", T: () => exports.User_UserCollectibles },
            { no: 12, name: "safety_state", kind: "message", T: () => exports.User_SafetyState },
            { no: 13, name: "display_name_styles", kind: "message", T: () => exports.User_DisplayNameStyles }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.id = 0n;
        message.username = "";
        message.discriminator = "";
        message.bot = false;
        message.publicFlags = 0n;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint64 id */ 1:
                    message.id = reader.uint64().toBigInt();
                    break;
                case /* string username */ 2:
                    message.username = reader.string();
                    break;
                case /* string discriminator */ 3:
                    message.discriminator = reader.string();
                    break;
                case /* optional google.protobuf.StringValue avatar */ 4:
                    message.avatar = wrappers_4.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.avatar);
                    break;
                case /* bool bot */ 5:
                    message.bot = reader.bool();
                    break;
                case /* uint64 public_flags */ 6:
                    message.publicFlags = reader.uint64().toBigInt();
                    break;
                case /* optional google.protobuf.StringValue global_name */ 8:
                    message.globalName = wrappers_4.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.globalName);
                    break;
                case /* optional discord_protos.users.v1.User.UserAvatarDecoration avatar_decoration_data */ 9:
                    message.avatarDecorationData = exports.User_UserAvatarDecoration.internalBinaryRead(reader, reader.uint32(), options, message.avatarDecorationData);
                    break;
                case /* optional discord_protos.users.v1.User.UserPrimaryGuild primary_guild */ 10:
                    message.primaryGuild = exports.User_UserPrimaryGuild.internalBinaryRead(reader, reader.uint32(), options, message.primaryGuild);
                    break;
                case /* optional discord_protos.users.v1.User.UserCollectibles collectibles */ 11:
                    message.collectibles = exports.User_UserCollectibles.internalBinaryRead(reader, reader.uint32(), options, message.collectibles);
                    break;
                case /* optional discord_protos.users.v1.User.SafetyState safety_state */ 12:
                    message.safetyState = exports.User_SafetyState.internalBinaryRead(reader, reader.uint32(), options, message.safetyState);
                    break;
                case /* optional discord_protos.users.v1.User.DisplayNameStyles display_name_styles */ 13:
                    message.displayNameStyles = exports.User_DisplayNameStyles.internalBinaryRead(reader, reader.uint32(), options, message.displayNameStyles);
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
        /* uint64 id = 1; */
        if (message.id !== 0n)
            writer.tag(1, runtime_1.WireType.Varint).uint64(message.id);
        /* string username = 2; */
        if (message.username !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.username);
        /* string discriminator = 3; */
        if (message.discriminator !== "")
            writer.tag(3, runtime_1.WireType.LengthDelimited).string(message.discriminator);
        /* optional google.protobuf.StringValue avatar = 4; */
        if (message.avatar)
            wrappers_4.StringValue.internalBinaryWrite(message.avatar, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* bool bot = 5; */
        if (message.bot !== false)
            writer.tag(5, runtime_1.WireType.Varint).bool(message.bot);
        /* uint64 public_flags = 6; */
        if (message.publicFlags !== 0n)
            writer.tag(6, runtime_1.WireType.Varint).uint64(message.publicFlags);
        /* optional google.protobuf.StringValue global_name = 8; */
        if (message.globalName)
            wrappers_4.StringValue.internalBinaryWrite(message.globalName, writer.tag(8, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.users.v1.User.UserAvatarDecoration avatar_decoration_data = 9; */
        if (message.avatarDecorationData)
            exports.User_UserAvatarDecoration.internalBinaryWrite(message.avatarDecorationData, writer.tag(9, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.users.v1.User.UserPrimaryGuild primary_guild = 10; */
        if (message.primaryGuild)
            exports.User_UserPrimaryGuild.internalBinaryWrite(message.primaryGuild, writer.tag(10, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.users.v1.User.UserCollectibles collectibles = 11; */
        if (message.collectibles)
            exports.User_UserCollectibles.internalBinaryWrite(message.collectibles, writer.tag(11, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.users.v1.User.SafetyState safety_state = 12; */
        if (message.safetyState)
            exports.User_SafetyState.internalBinaryWrite(message.safetyState, writer.tag(12, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.users.v1.User.DisplayNameStyles display_name_styles = 13; */
        if (message.displayNameStyles)
            exports.User_DisplayNameStyles.internalBinaryWrite(message.displayNameStyles, writer.tag(13, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.User
 */
exports.User = new User$Type();
// @generated message type with reflection information, may provide speed optimized methods
class User_UserAvatarDecoration$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.User.UserAvatarDecoration", [
            { no: 1, name: "asset", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "sku_id", kind: "message", T: () => wrappers_3.UInt64Value },
            { no: 3, name: "expires_at", kind: "message", T: () => wrappers_2.UInt32Value }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.asset = "";
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
                case /* optional google.protobuf.UInt64Value sku_id */ 2:
                    message.skuId = wrappers_3.UInt64Value.internalBinaryRead(reader, reader.uint32(), options, message.skuId);
                    break;
                case /* optional google.protobuf.UInt32Value expires_at */ 3:
                    message.expiresAt = wrappers_2.UInt32Value.internalBinaryRead(reader, reader.uint32(), options, message.expiresAt);
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
        /* optional google.protobuf.UInt64Value sku_id = 2; */
        if (message.skuId)
            wrappers_3.UInt64Value.internalBinaryWrite(message.skuId, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.UInt32Value expires_at = 3; */
        if (message.expiresAt)
            wrappers_2.UInt32Value.internalBinaryWrite(message.expiresAt, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.User.UserAvatarDecoration
 */
exports.User_UserAvatarDecoration = new User_UserAvatarDecoration$Type();
// @generated message type with reflection information, may provide speed optimized methods
class User_UserPrimaryGuild$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.User.UserPrimaryGuild", [
            { no: 1, name: "identity_guild_id", kind: "message", T: () => wrappers_3.UInt64Value },
            { no: 2, name: "identity_enabled", kind: "message", T: () => wrappers_1.BoolValue },
            { no: 3, name: "tag", kind: "message", T: () => wrappers_4.StringValue },
            { no: 4, name: "badge", kind: "message", T: () => wrappers_4.StringValue }
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
                    message.identityEnabled = wrappers_1.BoolValue.internalBinaryRead(reader, reader.uint32(), options, message.identityEnabled);
                    break;
                case /* optional google.protobuf.StringValue tag */ 3:
                    message.tag = wrappers_4.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.tag);
                    break;
                case /* optional google.protobuf.StringValue badge */ 4:
                    message.badge = wrappers_4.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.badge);
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
            wrappers_1.BoolValue.internalBinaryWrite(message.identityEnabled, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.StringValue tag = 3; */
        if (message.tag)
            wrappers_4.StringValue.internalBinaryWrite(message.tag, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.StringValue badge = 4; */
        if (message.badge)
            wrappers_4.StringValue.internalBinaryWrite(message.badge, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.User.UserPrimaryGuild
 */
exports.User_UserPrimaryGuild = new User_UserPrimaryGuild$Type();
// @generated message type with reflection information, may provide speed optimized methods
class User_UserNameplate$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.User.UserNameplate", [
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
 * @generated MessageType for protobuf message discord_protos.users.v1.User.UserNameplate
 */
exports.User_UserNameplate = new User_UserNameplate$Type();
// @generated message type with reflection information, may provide speed optimized methods
class User_UserCollectibles$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.User.UserCollectibles", [
            { no: 1, name: "nameplate", kind: "message", T: () => exports.User_UserNameplate }
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
                case /* optional discord_protos.users.v1.User.UserNameplate nameplate */ 1:
                    message.nameplate = exports.User_UserNameplate.internalBinaryRead(reader, reader.uint32(), options, message.nameplate);
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
        /* optional discord_protos.users.v1.User.UserNameplate nameplate = 1; */
        if (message.nameplate)
            exports.User_UserNameplate.internalBinaryWrite(message.nameplate, writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.User.UserCollectibles
 */
exports.User_UserCollectibles = new User_UserCollectibles$Type();
// @generated message type with reflection information, may provide speed optimized methods
class User_NormalState$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.User.NormalState", []);
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
 * @generated MessageType for protobuf message discord_protos.users.v1.User.NormalState
 */
exports.User_NormalState = new User_NormalState$Type();
// @generated message type with reflection information, may provide speed optimized methods
class User_RestrictedState$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.User.RestrictedState", [
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
 * @generated MessageType for protobuf message discord_protos.users.v1.User.RestrictedState
 */
exports.User_RestrictedState = new User_RestrictedState$Type();
// @generated message type with reflection information, may provide speed optimized methods
class User_DeferredActionState$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.User.DeferredActionState", [
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
 * @generated MessageType for protobuf message discord_protos.users.v1.User.DeferredActionState
 */
exports.User_DeferredActionState = new User_DeferredActionState$Type();
// @generated message type with reflection information, may provide speed optimized methods
class User_TempBannedState$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.User.TempBannedState", [
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
 * @generated MessageType for protobuf message discord_protos.users.v1.User.TempBannedState
 */
exports.User_TempBannedState = new User_TempBannedState$Type();
// @generated message type with reflection information, may provide speed optimized methods
class User_BannedState$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.User.BannedState", []);
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
 * @generated MessageType for protobuf message discord_protos.users.v1.User.BannedState
 */
exports.User_BannedState = new User_BannedState$Type();
// @generated message type with reflection information, may provide speed optimized methods
class User_SafetyState$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.User.SafetyState", [
            { no: 101, name: "normal", kind: "message", oneof: "state", T: () => exports.User_NormalState },
            { no: 102, name: "restricted", kind: "message", oneof: "state", T: () => exports.User_RestrictedState },
            { no: 103, name: "deferred_action", kind: "message", oneof: "state", T: () => exports.User_DeferredActionState },
            { no: 104, name: "temp_banned", kind: "message", oneof: "state", T: () => exports.User_TempBannedState },
            { no: 105, name: "banned", kind: "message", oneof: "state", T: () => exports.User_BannedState },
            { no: 1, name: "reason", kind: "enum", T: () => ["discord_protos.users.v1.User.SafetyStateReason", User_SafetyStateReason, "SAFETY_STATE_REASON_"] },
            { no: 2, name: "annotations", kind: "enum", repeat: 1 /*RepeatType.PACKED*/, T: () => ["discord_protos.users.v1.User.SafetyAnnotations", User_SafetyAnnotations, "SAFETY_ANNOTATIONS_"] },
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
                case /* discord_protos.users.v1.User.NormalState normal */ 101:
                    message.state = {
                        oneofKind: "normal",
                        normal: exports.User_NormalState.internalBinaryRead(reader, reader.uint32(), options, message.state.normal)
                    };
                    break;
                case /* discord_protos.users.v1.User.RestrictedState restricted */ 102:
                    message.state = {
                        oneofKind: "restricted",
                        restricted: exports.User_RestrictedState.internalBinaryRead(reader, reader.uint32(), options, message.state.restricted)
                    };
                    break;
                case /* discord_protos.users.v1.User.DeferredActionState deferred_action */ 103:
                    message.state = {
                        oneofKind: "deferredAction",
                        deferredAction: exports.User_DeferredActionState.internalBinaryRead(reader, reader.uint32(), options, message.state.deferredAction)
                    };
                    break;
                case /* discord_protos.users.v1.User.TempBannedState temp_banned */ 104:
                    message.state = {
                        oneofKind: "tempBanned",
                        tempBanned: exports.User_TempBannedState.internalBinaryRead(reader, reader.uint32(), options, message.state.tempBanned)
                    };
                    break;
                case /* discord_protos.users.v1.User.BannedState banned */ 105:
                    message.state = {
                        oneofKind: "banned",
                        banned: exports.User_BannedState.internalBinaryRead(reader, reader.uint32(), options, message.state.banned)
                    };
                    break;
                case /* discord_protos.users.v1.User.SafetyStateReason reason */ 1:
                    message.reason = reader.int32();
                    break;
                case /* repeated discord_protos.users.v1.User.SafetyAnnotations annotations */ 2:
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
        /* discord_protos.users.v1.User.SafetyStateReason reason = 1; */
        if (message.reason !== 0)
            writer.tag(1, runtime_1.WireType.Varint).int32(message.reason);
        /* repeated discord_protos.users.v1.User.SafetyAnnotations annotations = 2; */
        if (message.annotations.length) {
            writer.tag(2, runtime_1.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.annotations.length; i++)
                writer.int32(message.annotations[i]);
            writer.join();
        }
        /* optional google.protobuf.UInt64Value last_mutation_id = 3; */
        if (message.lastMutationId)
            wrappers_3.UInt64Value.internalBinaryWrite(message.lastMutationId, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.users.v1.User.NormalState normal = 101; */
        if (message.state.oneofKind === "normal")
            exports.User_NormalState.internalBinaryWrite(message.state.normal, writer.tag(101, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.users.v1.User.RestrictedState restricted = 102; */
        if (message.state.oneofKind === "restricted")
            exports.User_RestrictedState.internalBinaryWrite(message.state.restricted, writer.tag(102, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.users.v1.User.DeferredActionState deferred_action = 103; */
        if (message.state.oneofKind === "deferredAction")
            exports.User_DeferredActionState.internalBinaryWrite(message.state.deferredAction, writer.tag(103, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.users.v1.User.TempBannedState temp_banned = 104; */
        if (message.state.oneofKind === "tempBanned")
            exports.User_TempBannedState.internalBinaryWrite(message.state.tempBanned, writer.tag(104, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.users.v1.User.BannedState banned = 105; */
        if (message.state.oneofKind === "banned")
            exports.User_BannedState.internalBinaryWrite(message.state.banned, writer.tag(105, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.User.SafetyState
 */
exports.User_SafetyState = new User_SafetyState$Type();
// @generated message type with reflection information, may provide speed optimized methods
class User_DisplayNameStyles$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.User.DisplayNameStyles", [
            { no: 1, name: "font_id", kind: "enum", T: () => ["discord_protos.users.v1.User.DisplayNameFont", User_DisplayNameFont, "DISPLAY_NAME_FONT_"] },
            { no: 2, name: "effect_id", kind: "enum", T: () => ["discord_protos.users.v1.User.DisplayNameEffect", User_DisplayNameEffect, "DISPLAY_NAME_EFFECT_"] },
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
                case /* discord_protos.users.v1.User.DisplayNameFont font_id */ 1:
                    message.fontId = reader.int32();
                    break;
                case /* discord_protos.users.v1.User.DisplayNameEffect effect_id */ 2:
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
        /* discord_protos.users.v1.User.DisplayNameFont font_id = 1; */
        if (message.fontId !== 0)
            writer.tag(1, runtime_1.WireType.Varint).int32(message.fontId);
        /* discord_protos.users.v1.User.DisplayNameEffect effect_id = 2; */
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
 * @generated MessageType for protobuf message discord_protos.users.v1.User.DisplayNameStyles
 */
exports.User_DisplayNameStyles = new User_DisplayNameStyles$Type();
