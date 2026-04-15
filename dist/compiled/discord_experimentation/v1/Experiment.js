"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Experiment_DebugConfig = exports.Experiment_Rule = exports.Experiment_Override = exports.Experiment_Filter = exports.Experiment_GuildHasFeature = exports.Experiment_GuildMemberCountRange = exports.Experiment_GuildIds = exports.Experiment_UnitIdMatchesFilterSnapshot = exports.Experiment_UserPremiumType = exports.Experiment_UnitIdInExperiment = exports.Experiment_ClientSystemLocale = exports.Experiment_Always = exports.Experiment_ClientReleaseChannel = exports.Experiment_UnitIdInRangeByHash = exports.Experiment_UserHasFlag = exports.Experiment_UserIDRange = exports.Experiment_Fixed64Value = exports.Experiment_UserAgeRange = exports.Experiment_UserIsBot = exports.Experiment_UserLocale = exports.Experiment_ClientIP = exports.Experiment_ClientLocation = exports.Experiment_Location = exports.Experiment_Place = exports.Experiment_ISORegion = exports.Experiment_ClientLocale = exports.Experiment_UserIds = exports.Experiment_UserInGuild = exports.Experiment_StaffUsers = exports.Experiment_ClientOperatingSystem = exports.Experiment_SDKVersion = exports.Experiment_SDKVersionRange = exports.Experiment_SDKVersionRangeBound = exports.Experiment_SDKVersionSpecifier = exports.Experiment_ClientPlatform = exports.Experiment_ClientRequiredChanges = exports.Experiment_PlatformVersion = exports.Experiment_PlatformVersionRange = exports.Experiment_PlatformVersionRangeBound = exports.Experiment_PlatformVersionSpecifier = exports.Experiment_Variation = exports.Experiment_Bucket = exports.Experiment = exports.Experiment_AssignmentMode = exports.Experiment_ExposureTracking = exports.Experiment_Surface = exports.Experiment_Phase = exports.Experiment_Subtype = exports.Experiment_Type = exports.Experiment_UnitType = void 0;
const runtime_1 = require("@protobuf-ts/runtime");
const runtime_2 = require("@protobuf-ts/runtime");
const runtime_3 = require("@protobuf-ts/runtime");
const runtime_4 = require("@protobuf-ts/runtime");
const wrappers_1 = require("../../google/protobuf/wrappers");
const wrappers_2 = require("../../google/protobuf/wrappers");
const wrappers_3 = require("../../google/protobuf/wrappers");
const timestamp_1 = require("../../google/protobuf/timestamp");
/**
 * @generated from protobuf enum discord_protos.discord_experimentation.v1.Experiment.UnitType
 */
var Experiment_UnitType;
(function (Experiment_UnitType) {
    /**
     * @generated from protobuf enum value: UNIT_TYPE_UNSPECIFIED = 0;
     */
    Experiment_UnitType[Experiment_UnitType["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from protobuf enum value: UNIT_TYPE_USER = 1;
     */
    Experiment_UnitType[Experiment_UnitType["USER"] = 1] = "USER";
    /**
     * @generated from protobuf enum value: UNIT_TYPE_INSTALLATION = 2;
     */
    Experiment_UnitType[Experiment_UnitType["INSTALLATION"] = 2] = "INSTALLATION";
    /**
     * @generated from protobuf enum value: UNIT_TYPE_GUILD = 3;
     */
    Experiment_UnitType[Experiment_UnitType["GUILD"] = 3] = "GUILD";
})(Experiment_UnitType || (exports.Experiment_UnitType = Experiment_UnitType = {}));
/**
 * @generated from protobuf enum discord_protos.discord_experimentation.v1.Experiment.Type
 */
var Experiment_Type;
(function (Experiment_Type) {
    /**
     * @generated from protobuf enum value: TYPE_UNSPECIFIED = 0;
     */
    Experiment_Type[Experiment_Type["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from protobuf enum value: TYPE_ACTIVE = 1;
     */
    Experiment_Type[Experiment_Type["ACTIVE"] = 1] = "ACTIVE";
    /**
     * @generated from protobuf enum value: TYPE_UNUSED = 2;
     */
    Experiment_Type[Experiment_Type["UNUSED"] = 2] = "UNUSED";
    /**
     * @generated from protobuf enum value: TYPE_BURNED = 3;
     */
    Experiment_Type[Experiment_Type["BURNED"] = 3] = "BURNED";
    /**
     * @generated from protobuf enum value: TYPE_PRESERVED = 4;
     */
    Experiment_Type[Experiment_Type["PRESERVED"] = 4] = "PRESERVED";
})(Experiment_Type || (exports.Experiment_Type = Experiment_Type = {}));
/**
 * @generated from protobuf enum discord_protos.discord_experimentation.v1.Experiment.Subtype
 */
var Experiment_Subtype;
(function (Experiment_Subtype) {
    /**
     * @generated from protobuf enum value: SUBTYPE_REGULAR = 0;
     */
    Experiment_Subtype[Experiment_Subtype["REGULAR"] = 0] = "REGULAR";
    /**
     * @generated from protobuf enum value: SUBTYPE_HOLDOUT = 1;
     */
    Experiment_Subtype[Experiment_Subtype["HOLDOUT"] = 1] = "HOLDOUT";
})(Experiment_Subtype || (exports.Experiment_Subtype = Experiment_Subtype = {}));
/**
 * @generated from protobuf enum discord_protos.discord_experimentation.v1.Experiment.Phase
 */
var Experiment_Phase;
(function (Experiment_Phase) {
    /**
     * @generated from protobuf enum value: PHASE_UNSPECIFIED = 0;
     */
    Experiment_Phase[Experiment_Phase["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from protobuf enum value: PHASE_DRAFT = 1;
     */
    Experiment_Phase[Experiment_Phase["DRAFT"] = 1] = "DRAFT";
    /**
     * @generated from protobuf enum value: PHASE_MEASUREMENT = 2;
     */
    Experiment_Phase[Experiment_Phase["MEASUREMENT"] = 2] = "MEASUREMENT";
    /**
     * @generated from protobuf enum value: PHASE_ROLLING_OUT = 4;
     */
    Experiment_Phase[Experiment_Phase["ROLLING_OUT"] = 4] = "ROLLING_OUT";
    /**
     * @generated from protobuf enum value: PHASE_ARCHIVED = 6;
     */
    Experiment_Phase[Experiment_Phase["ARCHIVED"] = 6] = "ARCHIVED";
    /**
     * @generated from protobuf enum value: PHASE_AA_MODE = 7;
     */
    Experiment_Phase[Experiment_Phase["AA_MODE"] = 7] = "AA_MODE";
})(Experiment_Phase || (exports.Experiment_Phase = Experiment_Phase = {}));
/**
 * @generated from protobuf enum discord_protos.discord_experimentation.v1.Experiment.Surface
 */
var Experiment_Surface;
(function (Experiment_Surface) {
    /**
     * @generated from protobuf enum value: SURFACE_UNSPECIFIED = 0;
     */
    Experiment_Surface[Experiment_Surface["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from protobuf enum value: SURFACE_API = 1;
     */
    Experiment_Surface[Experiment_Surface["API"] = 1] = "API";
    /**
     * @generated from protobuf enum value: SURFACE_APP = 2;
     */
    Experiment_Surface[Experiment_Surface["APP"] = 2] = "APP";
    /**
     * @generated from protobuf enum value: SURFACE_DEVELOPER_PORTAL = 3;
     */
    Experiment_Surface[Experiment_Surface["DEVELOPER_PORTAL"] = 3] = "DEVELOPER_PORTAL";
    /**
     * @generated from protobuf enum value: SURFACE_ADMIN_PANEL = 4;
     */
    Experiment_Surface[Experiment_Surface["ADMIN_PANEL"] = 4] = "ADMIN_PANEL";
    /**
     * @generated from protobuf enum value: SURFACE_ADS_BUDGET_AB = 5;
     */
    Experiment_Surface[Experiment_Surface["ADS_BUDGET_AB"] = 5] = "ADS_BUDGET_AB";
})(Experiment_Surface || (exports.Experiment_Surface = Experiment_Surface = {}));
/**
 * @generated from protobuf enum discord_protos.discord_experimentation.v1.Experiment.ExposureTracking
 */
var Experiment_ExposureTracking;
(function (Experiment_ExposureTracking) {
    /**
     * @generated from protobuf enum value: EXPOSURE_TRACKING_ENABLED = 0;
     */
    Experiment_ExposureTracking[Experiment_ExposureTracking["ENABLED"] = 0] = "ENABLED";
    /**
     * @generated from protobuf enum value: EXPOSURE_TRACKING_DISABLED = 1;
     */
    Experiment_ExposureTracking[Experiment_ExposureTracking["DISABLED"] = 1] = "DISABLED";
})(Experiment_ExposureTracking || (exports.Experiment_ExposureTracking = Experiment_ExposureTracking = {}));
/**
 * @generated from protobuf enum discord_protos.discord_experimentation.v1.Experiment.AssignmentMode
 */
var Experiment_AssignmentMode;
(function (Experiment_AssignmentMode) {
    /**
     * @generated from protobuf enum value: ASSIGNMENT_MODE_FULL = 0;
     */
    Experiment_AssignmentMode[Experiment_AssignmentMode["FULL"] = 0] = "FULL";
    /**
     * @generated from protobuf enum value: ASSIGNMENT_MODE_FORCE_CONTROL = 3;
     */
    Experiment_AssignmentMode[Experiment_AssignmentMode["FORCE_CONTROL"] = 3] = "FORCE_CONTROL";
    /**
     * @generated from protobuf enum value: ASSIGNMENT_MODE_OVERRIDES_ONLY = 4;
     */
    Experiment_AssignmentMode[Experiment_AssignmentMode["OVERRIDES_ONLY"] = 4] = "OVERRIDES_ONLY";
    /**
     * @generated from protobuf enum value: ASSIGNMENT_MODE_OFF = 5;
     */
    Experiment_AssignmentMode[Experiment_AssignmentMode["OFF"] = 5] = "OFF";
})(Experiment_AssignmentMode || (exports.Experiment_AssignmentMode = Experiment_AssignmentMode = {}));
// @generated message type with reflection information, may provide speed optimized methods
class Experiment$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment", [
            { no: 1, name: "id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "created_at", kind: "message", T: () => timestamp_1.Timestamp },
            { no: 4, name: "creator_id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 5, name: "version", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 6, name: "edited_at", kind: "message", T: () => timestamp_1.Timestamp },
            { no: 7, name: "editor_id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 8, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 9, name: "description", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 10, name: "hypothesis", kind: "message", T: () => wrappers_3.StringValue },
            { no: 11, name: "tech_spec_link", kind: "message", T: () => wrappers_3.StringValue },
            { no: 12, name: "revision", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 13, name: "hash_key", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 14, name: "unit_type", kind: "enum", T: () => ["discord_protos.discord_experimentation.v1.Experiment.UnitType", Experiment_UnitType, "UNIT_TYPE_"] },
            { no: 15, name: "variations", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => exports.Experiment_Variation },
            { no: 16, name: "rules", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => exports.Experiment_Rule },
            { no: 18, name: "phase", kind: "enum", T: () => ["discord_protos.discord_experimentation.v1.Experiment.Phase", Experiment_Phase, "PHASE_"] },
            { no: 19, name: "surfaces", kind: "enum", repeat: 1 /*RepeatType.PACKED*/, T: () => ["discord_protos.discord_experimentation.v1.Experiment.Surface", Experiment_Surface, "SURFACE_"] },
            { no: 20, name: "owning_team_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 21, name: "cached_notification_channel_id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 22, name: "exposure_tracking", kind: "enum", T: () => ["discord_protos.discord_experimentation.v1.Experiment.ExposureTracking", Experiment_ExposureTracking, "EXPOSURE_TRACKING_"] },
            { no: 25, name: "assignment_mode", kind: "enum", T: () => ["discord_protos.discord_experimentation.v1.Experiment.AssignmentMode", Experiment_AssignmentMode, "ASSIGNMENT_MODE_"] },
            { no: 23, name: "enable_edit_raw_json_ui", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 24, name: "winning_variation_id", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 34, name: "extra_outcome_context", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 26, name: "type", kind: "enum", T: () => ["discord_protos.discord_experimentation.v1.Experiment.Type", Experiment_Type, "TYPE_"] },
            { no: 27, name: "is_template", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 28, name: "field_numbers_to_copy", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 5 /*ScalarType.INT32*/ },
            { no: 29, name: "engine_feature_flags", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ },
            { no: 30, name: "debug_config", kind: "message", T: () => exports.Experiment_DebugConfig },
            { no: 31, name: "expected_end_date", kind: "message", T: () => timestamp_1.Timestamp },
            { no: 32, name: "is_automated_change", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 33, name: "archive_at", kind: "message", T: () => timestamp_1.Timestamp }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.id = 0n;
        message.name = "";
        message.creatorId = 0n;
        message.version = 0;
        message.editorId = 0n;
        message.title = "";
        message.description = "";
        message.revision = 0;
        message.hashKey = "";
        message.unitType = 0;
        message.variations = [];
        message.rules = [];
        message.phase = 0;
        message.surfaces = [];
        message.owningTeamId = "";
        message.cachedNotificationChannelId = 0n;
        message.exposureTracking = 0;
        message.assignmentMode = 0;
        message.enableEditRawJsonUi = false;
        message.winningVariationId = 0;
        message.extraOutcomeContext = "";
        message.type = 0;
        message.isTemplate = false;
        message.fieldNumbersToCopy = [];
        message.engineFeatureFlags = [];
        message.isAutomatedChange = false;
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
                case /* string name */ 2:
                    message.name = reader.string();
                    break;
                case /* optional google.protobuf.Timestamp created_at */ 3:
                    message.createdAt = timestamp_1.Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.createdAt);
                    break;
                case /* fixed64 creator_id */ 4:
                    message.creatorId = reader.fixed64().toBigInt();
                    break;
                case /* int32 version */ 5:
                    message.version = reader.int32();
                    break;
                case /* optional google.protobuf.Timestamp edited_at */ 6:
                    message.editedAt = timestamp_1.Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.editedAt);
                    break;
                case /* fixed64 editor_id */ 7:
                    message.editorId = reader.fixed64().toBigInt();
                    break;
                case /* string title */ 8:
                    message.title = reader.string();
                    break;
                case /* string description */ 9:
                    message.description = reader.string();
                    break;
                case /* optional google.protobuf.StringValue hypothesis */ 10:
                    message.hypothesis = wrappers_3.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.hypothesis);
                    break;
                case /* optional google.protobuf.StringValue tech_spec_link */ 11:
                    message.techSpecLink = wrappers_3.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.techSpecLink);
                    break;
                case /* int32 revision */ 12:
                    message.revision = reader.int32();
                    break;
                case /* string hash_key */ 13:
                    message.hashKey = reader.string();
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.UnitType unit_type */ 14:
                    message.unitType = reader.int32();
                    break;
                case /* repeated discord_protos.discord_experimentation.v1.Experiment.Variation variations */ 15:
                    message.variations.push(exports.Experiment_Variation.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* repeated discord_protos.discord_experimentation.v1.Experiment.Rule rules */ 16:
                    message.rules.push(exports.Experiment_Rule.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.Phase phase */ 18:
                    message.phase = reader.int32();
                    break;
                case /* repeated discord_protos.discord_experimentation.v1.Experiment.Surface surfaces */ 19:
                    if (wireType === runtime_2.WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.surfaces.push(reader.int32());
                    else
                        message.surfaces.push(reader.int32());
                    break;
                case /* string owning_team_id */ 20:
                    message.owningTeamId = reader.string();
                    break;
                case /* fixed64 cached_notification_channel_id */ 21:
                    message.cachedNotificationChannelId = reader.fixed64().toBigInt();
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.ExposureTracking exposure_tracking */ 22:
                    message.exposureTracking = reader.int32();
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.AssignmentMode assignment_mode */ 25:
                    message.assignmentMode = reader.int32();
                    break;
                case /* bool enable_edit_raw_json_ui */ 23:
                    message.enableEditRawJsonUi = reader.bool();
                    break;
                case /* int32 winning_variation_id */ 24:
                    message.winningVariationId = reader.int32();
                    break;
                case /* string extra_outcome_context */ 34:
                    message.extraOutcomeContext = reader.string();
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.Type type */ 26:
                    message.type = reader.int32();
                    break;
                case /* bool is_template */ 27:
                    message.isTemplate = reader.bool();
                    break;
                case /* repeated int32 field_numbers_to_copy */ 28:
                    if (wireType === runtime_2.WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.fieldNumbersToCopy.push(reader.int32());
                    else
                        message.fieldNumbersToCopy.push(reader.int32());
                    break;
                case /* repeated string engine_feature_flags = 29 [packed = false] */ 29:
                    message.engineFeatureFlags.push(reader.string());
                    break;
                case /* optional discord_protos.discord_experimentation.v1.Experiment.DebugConfig debug_config */ 30:
                    message.debugConfig = exports.Experiment_DebugConfig.internalBinaryRead(reader, reader.uint32(), options, message.debugConfig);
                    break;
                case /* optional google.protobuf.Timestamp expected_end_date */ 31:
                    message.expectedEndDate = timestamp_1.Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.expectedEndDate);
                    break;
                case /* bool is_automated_change */ 32:
                    message.isAutomatedChange = reader.bool();
                    break;
                case /* optional google.protobuf.Timestamp archive_at */ 33:
                    message.archiveAt = timestamp_1.Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.archiveAt);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* fixed64 id = 1; */
        if (message.id !== 0n)
            writer.tag(1, runtime_2.WireType.Bit64).fixed64(message.id);
        /* string name = 2; */
        if (message.name !== "")
            writer.tag(2, runtime_2.WireType.LengthDelimited).string(message.name);
        /* optional google.protobuf.Timestamp created_at = 3; */
        if (message.createdAt)
            timestamp_1.Timestamp.internalBinaryWrite(message.createdAt, writer.tag(3, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* fixed64 creator_id = 4; */
        if (message.creatorId !== 0n)
            writer.tag(4, runtime_2.WireType.Bit64).fixed64(message.creatorId);
        /* int32 version = 5; */
        if (message.version !== 0)
            writer.tag(5, runtime_2.WireType.Varint).int32(message.version);
        /* optional google.protobuf.Timestamp edited_at = 6; */
        if (message.editedAt)
            timestamp_1.Timestamp.internalBinaryWrite(message.editedAt, writer.tag(6, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* fixed64 editor_id = 7; */
        if (message.editorId !== 0n)
            writer.tag(7, runtime_2.WireType.Bit64).fixed64(message.editorId);
        /* string title = 8; */
        if (message.title !== "")
            writer.tag(8, runtime_2.WireType.LengthDelimited).string(message.title);
        /* string description = 9; */
        if (message.description !== "")
            writer.tag(9, runtime_2.WireType.LengthDelimited).string(message.description);
        /* optional google.protobuf.StringValue hypothesis = 10; */
        if (message.hypothesis)
            wrappers_3.StringValue.internalBinaryWrite(message.hypothesis, writer.tag(10, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.StringValue tech_spec_link = 11; */
        if (message.techSpecLink)
            wrappers_3.StringValue.internalBinaryWrite(message.techSpecLink, writer.tag(11, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* int32 revision = 12; */
        if (message.revision !== 0)
            writer.tag(12, runtime_2.WireType.Varint).int32(message.revision);
        /* string hash_key = 13; */
        if (message.hashKey !== "")
            writer.tag(13, runtime_2.WireType.LengthDelimited).string(message.hashKey);
        /* discord_protos.discord_experimentation.v1.Experiment.UnitType unit_type = 14; */
        if (message.unitType !== 0)
            writer.tag(14, runtime_2.WireType.Varint).int32(message.unitType);
        /* repeated discord_protos.discord_experimentation.v1.Experiment.Variation variations = 15; */
        for (let i = 0; i < message.variations.length; i++)
            exports.Experiment_Variation.internalBinaryWrite(message.variations[i], writer.tag(15, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* repeated discord_protos.discord_experimentation.v1.Experiment.Rule rules = 16; */
        for (let i = 0; i < message.rules.length; i++)
            exports.Experiment_Rule.internalBinaryWrite(message.rules[i], writer.tag(16, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.Phase phase = 18; */
        if (message.phase !== 0)
            writer.tag(18, runtime_2.WireType.Varint).int32(message.phase);
        /* repeated discord_protos.discord_experimentation.v1.Experiment.Surface surfaces = 19; */
        if (message.surfaces.length) {
            writer.tag(19, runtime_2.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.surfaces.length; i++)
                writer.int32(message.surfaces[i]);
            writer.join();
        }
        /* string owning_team_id = 20; */
        if (message.owningTeamId !== "")
            writer.tag(20, runtime_2.WireType.LengthDelimited).string(message.owningTeamId);
        /* fixed64 cached_notification_channel_id = 21; */
        if (message.cachedNotificationChannelId !== 0n)
            writer.tag(21, runtime_2.WireType.Bit64).fixed64(message.cachedNotificationChannelId);
        /* discord_protos.discord_experimentation.v1.Experiment.ExposureTracking exposure_tracking = 22; */
        if (message.exposureTracking !== 0)
            writer.tag(22, runtime_2.WireType.Varint).int32(message.exposureTracking);
        /* bool enable_edit_raw_json_ui = 23; */
        if (message.enableEditRawJsonUi !== false)
            writer.tag(23, runtime_2.WireType.Varint).bool(message.enableEditRawJsonUi);
        /* int32 winning_variation_id = 24; */
        if (message.winningVariationId !== 0)
            writer.tag(24, runtime_2.WireType.Varint).int32(message.winningVariationId);
        /* discord_protos.discord_experimentation.v1.Experiment.AssignmentMode assignment_mode = 25; */
        if (message.assignmentMode !== 0)
            writer.tag(25, runtime_2.WireType.Varint).int32(message.assignmentMode);
        /* discord_protos.discord_experimentation.v1.Experiment.Type type = 26; */
        if (message.type !== 0)
            writer.tag(26, runtime_2.WireType.Varint).int32(message.type);
        /* bool is_template = 27; */
        if (message.isTemplate !== false)
            writer.tag(27, runtime_2.WireType.Varint).bool(message.isTemplate);
        /* repeated int32 field_numbers_to_copy = 28; */
        if (message.fieldNumbersToCopy.length) {
            writer.tag(28, runtime_2.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.fieldNumbersToCopy.length; i++)
                writer.int32(message.fieldNumbersToCopy[i]);
            writer.join();
        }
        /* repeated string engine_feature_flags = 29 [packed = false]; */
        for (let i = 0; i < message.engineFeatureFlags.length; i++)
            writer.tag(29, runtime_2.WireType.LengthDelimited).string(message.engineFeatureFlags[i]);
        /* optional discord_protos.discord_experimentation.v1.Experiment.DebugConfig debug_config = 30; */
        if (message.debugConfig)
            exports.Experiment_DebugConfig.internalBinaryWrite(message.debugConfig, writer.tag(30, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.Timestamp expected_end_date = 31; */
        if (message.expectedEndDate)
            timestamp_1.Timestamp.internalBinaryWrite(message.expectedEndDate, writer.tag(31, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* bool is_automated_change = 32; */
        if (message.isAutomatedChange !== false)
            writer.tag(32, runtime_2.WireType.Varint).bool(message.isAutomatedChange);
        /* optional google.protobuf.Timestamp archive_at = 33; */
        if (message.archiveAt)
            timestamp_1.Timestamp.internalBinaryWrite(message.archiveAt, writer.tag(33, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* string extra_outcome_context = 34; */
        if (message.extraOutcomeContext !== "")
            writer.tag(34, runtime_2.WireType.LengthDelimited).string(message.extraOutcomeContext);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment
 */
exports.Experiment = new Experiment$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_Bucket$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.Bucket", [
            { no: 1, name: "start", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "stop", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 3, name: "type", kind: "enum", T: () => ["discord_protos.discord_experimentation.v1.Experiment.Type", Experiment_Type, "TYPE_"] }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.start = 0;
        message.stop = 0;
        message.type = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int32 start */ 1:
                    message.start = reader.int32();
                    break;
                case /* int32 stop */ 2:
                    message.stop = reader.int32();
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.Type type */ 3:
                    message.type = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* int32 start = 1; */
        if (message.start !== 0)
            writer.tag(1, runtime_2.WireType.Varint).int32(message.start);
        /* int32 stop = 2; */
        if (message.stop !== 0)
            writer.tag(2, runtime_2.WireType.Varint).int32(message.stop);
        /* discord_protos.discord_experimentation.v1.Experiment.Type type = 3; */
        if (message.type !== 0)
            writer.tag(3, runtime_2.WireType.Varint).int32(message.type);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.Bucket
 */
exports.Experiment_Bucket = new Experiment_Bucket$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_Variation$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.Variation", [
            { no: 1, name: "id", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "label", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "target_allocation", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 4, name: "buckets", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => exports.Experiment_Bucket },
            { no: 5, name: "type", kind: "enum", T: () => ["discord_protos.discord_experimentation.v1.Experiment.Type", Experiment_Type, "TYPE_"] },
            { no: 6, name: "configuration", kind: "message", T: () => wrappers_3.StringValue }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.id = 0;
        message.label = "";
        message.targetAllocation = 0;
        message.buckets = [];
        message.type = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int32 id */ 1:
                    message.id = reader.int32();
                    break;
                case /* string label */ 2:
                    message.label = reader.string();
                    break;
                case /* int32 target_allocation */ 3:
                    message.targetAllocation = reader.int32();
                    break;
                case /* repeated discord_protos.discord_experimentation.v1.Experiment.Bucket buckets */ 4:
                    message.buckets.push(exports.Experiment_Bucket.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.Type type */ 5:
                    message.type = reader.int32();
                    break;
                case /* optional google.protobuf.StringValue configuration */ 6:
                    message.configuration = wrappers_3.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.configuration);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* int32 id = 1; */
        if (message.id !== 0)
            writer.tag(1, runtime_2.WireType.Varint).int32(message.id);
        /* string label = 2; */
        if (message.label !== "")
            writer.tag(2, runtime_2.WireType.LengthDelimited).string(message.label);
        /* int32 target_allocation = 3; */
        if (message.targetAllocation !== 0)
            writer.tag(3, runtime_2.WireType.Varint).int32(message.targetAllocation);
        /* repeated discord_protos.discord_experimentation.v1.Experiment.Bucket buckets = 4; */
        for (let i = 0; i < message.buckets.length; i++)
            exports.Experiment_Bucket.internalBinaryWrite(message.buckets[i], writer.tag(4, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.Type type = 5; */
        if (message.type !== 0)
            writer.tag(5, runtime_2.WireType.Varint).int32(message.type);
        /* optional google.protobuf.StringValue configuration = 6; */
        if (message.configuration)
            wrappers_3.StringValue.internalBinaryWrite(message.configuration, writer.tag(6, runtime_2.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.Variation
 */
exports.Experiment_Variation = new Experiment_Variation$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_PlatformVersionSpecifier$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.PlatformVersionSpecifier", [
            { no: 1, name: "major", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 2, name: "minor", kind: "message", T: () => wrappers_2.UInt32Value },
            { no: 3, name: "build", kind: "message", T: () => wrappers_1.UInt64Value }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.major = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint32 major */ 1:
                    message.major = reader.uint32();
                    break;
                case /* optional google.protobuf.UInt32Value minor */ 2:
                    message.minor = wrappers_2.UInt32Value.internalBinaryRead(reader, reader.uint32(), options, message.minor);
                    break;
                case /* optional google.protobuf.UInt64Value build */ 3:
                    message.build = wrappers_1.UInt64Value.internalBinaryRead(reader, reader.uint32(), options, message.build);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* uint32 major = 1; */
        if (message.major !== 0)
            writer.tag(1, runtime_2.WireType.Varint).uint32(message.major);
        /* optional google.protobuf.UInt32Value minor = 2; */
        if (message.minor)
            wrappers_2.UInt32Value.internalBinaryWrite(message.minor, writer.tag(2, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.UInt64Value build = 3; */
        if (message.build)
            wrappers_1.UInt64Value.internalBinaryWrite(message.build, writer.tag(3, runtime_2.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.PlatformVersionSpecifier
 */
exports.Experiment_PlatformVersionSpecifier = new Experiment_PlatformVersionSpecifier$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_PlatformVersionRangeBound$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.PlatformVersionRangeBound", [
            { no: 1, name: "version", kind: "message", T: () => exports.Experiment_PlatformVersionSpecifier },
            { no: 2, name: "inclusive", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.inclusive = false;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional discord_protos.discord_experimentation.v1.Experiment.PlatformVersionSpecifier version */ 1:
                    message.version = exports.Experiment_PlatformVersionSpecifier.internalBinaryRead(reader, reader.uint32(), options, message.version);
                    break;
                case /* bool inclusive */ 2:
                    message.inclusive = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional discord_protos.discord_experimentation.v1.Experiment.PlatformVersionSpecifier version = 1; */
        if (message.version)
            exports.Experiment_PlatformVersionSpecifier.internalBinaryWrite(message.version, writer.tag(1, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* bool inclusive = 2; */
        if (message.inclusive !== false)
            writer.tag(2, runtime_2.WireType.Varint).bool(message.inclusive);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.PlatformVersionRangeBound
 */
exports.Experiment_PlatformVersionRangeBound = new Experiment_PlatformVersionRangeBound$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_PlatformVersionRange$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.PlatformVersionRange", [
            { no: 1, name: "lower_bound", kind: "message", T: () => exports.Experiment_PlatformVersionRangeBound },
            { no: 2, name: "upper_bound", kind: "message", T: () => exports.Experiment_PlatformVersionRangeBound }
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
                case /* optional discord_protos.discord_experimentation.v1.Experiment.PlatformVersionRangeBound lower_bound */ 1:
                    message.lowerBound = exports.Experiment_PlatformVersionRangeBound.internalBinaryRead(reader, reader.uint32(), options, message.lowerBound);
                    break;
                case /* optional discord_protos.discord_experimentation.v1.Experiment.PlatformVersionRangeBound upper_bound */ 2:
                    message.upperBound = exports.Experiment_PlatformVersionRangeBound.internalBinaryRead(reader, reader.uint32(), options, message.upperBound);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional discord_protos.discord_experimentation.v1.Experiment.PlatformVersionRangeBound lower_bound = 1; */
        if (message.lowerBound)
            exports.Experiment_PlatformVersionRangeBound.internalBinaryWrite(message.lowerBound, writer.tag(1, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_experimentation.v1.Experiment.PlatformVersionRangeBound upper_bound = 2; */
        if (message.upperBound)
            exports.Experiment_PlatformVersionRangeBound.internalBinaryWrite(message.upperBound, writer.tag(2, runtime_2.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.PlatformVersionRange
 */
exports.Experiment_PlatformVersionRange = new Experiment_PlatformVersionRange$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_PlatformVersion$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.PlatformVersion", [
            { no: 1, name: "ranges", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => exports.Experiment_PlatformVersionRange },
            { no: 2, name: "work_around_pyoto_bug", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.ranges = [];
        message.workAroundPyotoBug = false;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated discord_protos.discord_experimentation.v1.Experiment.PlatformVersionRange ranges */ 1:
                    message.ranges.push(exports.Experiment_PlatformVersionRange.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* bool work_around_pyoto_bug */ 2:
                    message.workAroundPyotoBug = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* repeated discord_protos.discord_experimentation.v1.Experiment.PlatformVersionRange ranges = 1; */
        for (let i = 0; i < message.ranges.length; i++)
            exports.Experiment_PlatformVersionRange.internalBinaryWrite(message.ranges[i], writer.tag(1, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* bool work_around_pyoto_bug = 2; */
        if (message.workAroundPyotoBug !== false)
            writer.tag(2, runtime_2.WireType.Varint).bool(message.workAroundPyotoBug);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.PlatformVersion
 */
exports.Experiment_PlatformVersion = new Experiment_PlatformVersion$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_ClientRequiredChanges$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.ClientRequiredChanges", [
            { no: 1, name: "commit_hashes", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "pr_numbers", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 5 /*ScalarType.INT32*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.commitHashes = [];
        message.prNumbers = [];
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated string commit_hashes = 1 [packed = false] */ 1:
                    message.commitHashes.push(reader.string());
                    break;
                case /* repeated int32 pr_numbers */ 2:
                    if (wireType === runtime_2.WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.prNumbers.push(reader.int32());
                    else
                        message.prNumbers.push(reader.int32());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* repeated string commit_hashes = 1 [packed = false]; */
        for (let i = 0; i < message.commitHashes.length; i++)
            writer.tag(1, runtime_2.WireType.LengthDelimited).string(message.commitHashes[i]);
        /* repeated int32 pr_numbers = 2; */
        if (message.prNumbers.length) {
            writer.tag(2, runtime_2.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.prNumbers.length; i++)
                writer.int32(message.prNumbers[i]);
            writer.join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.ClientRequiredChanges
 */
exports.Experiment_ClientRequiredChanges = new Experiment_ClientRequiredChanges$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_ClientPlatform$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.ClientPlatform", [
            { no: 1, name: "ios_version", kind: "message", T: () => exports.Experiment_PlatformVersion },
            { no: 2, name: "android_version", kind: "message", T: () => exports.Experiment_PlatformVersion },
            { no: 3, name: "web_version", kind: "message", T: () => exports.Experiment_PlatformVersion },
            { no: 4, name: "native_version", kind: "message", T: () => exports.Experiment_PlatformVersion },
            { no: 6, name: "allow_non_native_web", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 5, name: "client_required_changes", kind: "message", T: () => exports.Experiment_ClientRequiredChanges }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.allowNonNativeWeb = false;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional discord_protos.discord_experimentation.v1.Experiment.PlatformVersion ios_version */ 1:
                    message.iosVersion = exports.Experiment_PlatformVersion.internalBinaryRead(reader, reader.uint32(), options, message.iosVersion);
                    break;
                case /* optional discord_protos.discord_experimentation.v1.Experiment.PlatformVersion android_version */ 2:
                    message.androidVersion = exports.Experiment_PlatformVersion.internalBinaryRead(reader, reader.uint32(), options, message.androidVersion);
                    break;
                case /* optional discord_protos.discord_experimentation.v1.Experiment.PlatformVersion web_version */ 3:
                    message.webVersion = exports.Experiment_PlatformVersion.internalBinaryRead(reader, reader.uint32(), options, message.webVersion);
                    break;
                case /* optional discord_protos.discord_experimentation.v1.Experiment.PlatformVersion native_version */ 4:
                    message.nativeVersion = exports.Experiment_PlatformVersion.internalBinaryRead(reader, reader.uint32(), options, message.nativeVersion);
                    break;
                case /* bool allow_non_native_web */ 6:
                    message.allowNonNativeWeb = reader.bool();
                    break;
                case /* optional discord_protos.discord_experimentation.v1.Experiment.ClientRequiredChanges client_required_changes */ 5:
                    message.clientRequiredChanges = exports.Experiment_ClientRequiredChanges.internalBinaryRead(reader, reader.uint32(), options, message.clientRequiredChanges);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional discord_protos.discord_experimentation.v1.Experiment.PlatformVersion ios_version = 1; */
        if (message.iosVersion)
            exports.Experiment_PlatformVersion.internalBinaryWrite(message.iosVersion, writer.tag(1, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_experimentation.v1.Experiment.PlatformVersion android_version = 2; */
        if (message.androidVersion)
            exports.Experiment_PlatformVersion.internalBinaryWrite(message.androidVersion, writer.tag(2, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_experimentation.v1.Experiment.PlatformVersion web_version = 3; */
        if (message.webVersion)
            exports.Experiment_PlatformVersion.internalBinaryWrite(message.webVersion, writer.tag(3, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_experimentation.v1.Experiment.PlatformVersion native_version = 4; */
        if (message.nativeVersion)
            exports.Experiment_PlatformVersion.internalBinaryWrite(message.nativeVersion, writer.tag(4, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_experimentation.v1.Experiment.ClientRequiredChanges client_required_changes = 5; */
        if (message.clientRequiredChanges)
            exports.Experiment_ClientRequiredChanges.internalBinaryWrite(message.clientRequiredChanges, writer.tag(5, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* bool allow_non_native_web = 6; */
        if (message.allowNonNativeWeb !== false)
            writer.tag(6, runtime_2.WireType.Varint).bool(message.allowNonNativeWeb);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.ClientPlatform
 */
exports.Experiment_ClientPlatform = new Experiment_ClientPlatform$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_SDKVersionSpecifier$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.SDKVersionSpecifier", [
            { no: 1, name: "version", kind: "scalar", T: 5 /*ScalarType.INT32*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.version = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int32 version */ 1:
                    message.version = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* int32 version = 1; */
        if (message.version !== 0)
            writer.tag(1, runtime_2.WireType.Varint).int32(message.version);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.SDKVersionSpecifier
 */
exports.Experiment_SDKVersionSpecifier = new Experiment_SDKVersionSpecifier$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_SDKVersionRangeBound$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.SDKVersionRangeBound", [
            { no: 1, name: "version", kind: "message", T: () => exports.Experiment_SDKVersionSpecifier },
            { no: 2, name: "inclusive", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.inclusive = false;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional discord_protos.discord_experimentation.v1.Experiment.SDKVersionSpecifier version */ 1:
                    message.version = exports.Experiment_SDKVersionSpecifier.internalBinaryRead(reader, reader.uint32(), options, message.version);
                    break;
                case /* bool inclusive */ 2:
                    message.inclusive = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional discord_protos.discord_experimentation.v1.Experiment.SDKVersionSpecifier version = 1; */
        if (message.version)
            exports.Experiment_SDKVersionSpecifier.internalBinaryWrite(message.version, writer.tag(1, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* bool inclusive = 2; */
        if (message.inclusive !== false)
            writer.tag(2, runtime_2.WireType.Varint).bool(message.inclusive);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.SDKVersionRangeBound
 */
exports.Experiment_SDKVersionRangeBound = new Experiment_SDKVersionRangeBound$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_SDKVersionRange$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.SDKVersionRange", [
            { no: 1, name: "lower_bound", kind: "message", T: () => exports.Experiment_SDKVersionRangeBound },
            { no: 2, name: "upper_bound", kind: "message", T: () => exports.Experiment_SDKVersionRangeBound }
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
                case /* optional discord_protos.discord_experimentation.v1.Experiment.SDKVersionRangeBound lower_bound */ 1:
                    message.lowerBound = exports.Experiment_SDKVersionRangeBound.internalBinaryRead(reader, reader.uint32(), options, message.lowerBound);
                    break;
                case /* optional discord_protos.discord_experimentation.v1.Experiment.SDKVersionRangeBound upper_bound */ 2:
                    message.upperBound = exports.Experiment_SDKVersionRangeBound.internalBinaryRead(reader, reader.uint32(), options, message.upperBound);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional discord_protos.discord_experimentation.v1.Experiment.SDKVersionRangeBound lower_bound = 1; */
        if (message.lowerBound)
            exports.Experiment_SDKVersionRangeBound.internalBinaryWrite(message.lowerBound, writer.tag(1, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_experimentation.v1.Experiment.SDKVersionRangeBound upper_bound = 2; */
        if (message.upperBound)
            exports.Experiment_SDKVersionRangeBound.internalBinaryWrite(message.upperBound, writer.tag(2, runtime_2.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.SDKVersionRange
 */
exports.Experiment_SDKVersionRange = new Experiment_SDKVersionRange$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_SDKVersion$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.SDKVersion", [
            { no: 1, name: "ranges", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => exports.Experiment_SDKVersionRange },
            { no: 2, name: "work_around_pyoto_bug", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.ranges = [];
        message.workAroundPyotoBug = false;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated discord_protos.discord_experimentation.v1.Experiment.SDKVersionRange ranges */ 1:
                    message.ranges.push(exports.Experiment_SDKVersionRange.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* bool work_around_pyoto_bug */ 2:
                    message.workAroundPyotoBug = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* repeated discord_protos.discord_experimentation.v1.Experiment.SDKVersionRange ranges = 1; */
        for (let i = 0; i < message.ranges.length; i++)
            exports.Experiment_SDKVersionRange.internalBinaryWrite(message.ranges[i], writer.tag(1, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* bool work_around_pyoto_bug = 2; */
        if (message.workAroundPyotoBug !== false)
            writer.tag(2, runtime_2.WireType.Varint).bool(message.workAroundPyotoBug);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.SDKVersion
 */
exports.Experiment_SDKVersion = new Experiment_SDKVersion$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_ClientOperatingSystem$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.ClientOperatingSystem", [
            { no: 1, name: "ios_version", kind: "message", T: () => exports.Experiment_SDKVersion },
            { no: 2, name: "android_version", kind: "message", T: () => exports.Experiment_SDKVersion },
            { no: 3, name: "macos_version", kind: "message", T: () => exports.Experiment_SDKVersion },
            { no: 4, name: "windows_version", kind: "message", T: () => exports.Experiment_SDKVersion },
            { no: 5, name: "playstation_version", kind: "message", T: () => exports.Experiment_SDKVersion },
            { no: 6, name: "xbox_version", kind: "message", T: () => exports.Experiment_SDKVersion },
            { no: 7, name: "linux_version", kind: "message", T: () => exports.Experiment_SDKVersion }
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
                case /* optional discord_protos.discord_experimentation.v1.Experiment.SDKVersion ios_version */ 1:
                    message.iosVersion = exports.Experiment_SDKVersion.internalBinaryRead(reader, reader.uint32(), options, message.iosVersion);
                    break;
                case /* optional discord_protos.discord_experimentation.v1.Experiment.SDKVersion android_version */ 2:
                    message.androidVersion = exports.Experiment_SDKVersion.internalBinaryRead(reader, reader.uint32(), options, message.androidVersion);
                    break;
                case /* optional discord_protos.discord_experimentation.v1.Experiment.SDKVersion macos_version */ 3:
                    message.macosVersion = exports.Experiment_SDKVersion.internalBinaryRead(reader, reader.uint32(), options, message.macosVersion);
                    break;
                case /* optional discord_protos.discord_experimentation.v1.Experiment.SDKVersion windows_version */ 4:
                    message.windowsVersion = exports.Experiment_SDKVersion.internalBinaryRead(reader, reader.uint32(), options, message.windowsVersion);
                    break;
                case /* optional discord_protos.discord_experimentation.v1.Experiment.SDKVersion playstation_version */ 5:
                    message.playstationVersion = exports.Experiment_SDKVersion.internalBinaryRead(reader, reader.uint32(), options, message.playstationVersion);
                    break;
                case /* optional discord_protos.discord_experimentation.v1.Experiment.SDKVersion xbox_version */ 6:
                    message.xboxVersion = exports.Experiment_SDKVersion.internalBinaryRead(reader, reader.uint32(), options, message.xboxVersion);
                    break;
                case /* optional discord_protos.discord_experimentation.v1.Experiment.SDKVersion linux_version */ 7:
                    message.linuxVersion = exports.Experiment_SDKVersion.internalBinaryRead(reader, reader.uint32(), options, message.linuxVersion);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional discord_protos.discord_experimentation.v1.Experiment.SDKVersion ios_version = 1; */
        if (message.iosVersion)
            exports.Experiment_SDKVersion.internalBinaryWrite(message.iosVersion, writer.tag(1, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_experimentation.v1.Experiment.SDKVersion android_version = 2; */
        if (message.androidVersion)
            exports.Experiment_SDKVersion.internalBinaryWrite(message.androidVersion, writer.tag(2, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_experimentation.v1.Experiment.SDKVersion macos_version = 3; */
        if (message.macosVersion)
            exports.Experiment_SDKVersion.internalBinaryWrite(message.macosVersion, writer.tag(3, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_experimentation.v1.Experiment.SDKVersion windows_version = 4; */
        if (message.windowsVersion)
            exports.Experiment_SDKVersion.internalBinaryWrite(message.windowsVersion, writer.tag(4, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_experimentation.v1.Experiment.SDKVersion playstation_version = 5; */
        if (message.playstationVersion)
            exports.Experiment_SDKVersion.internalBinaryWrite(message.playstationVersion, writer.tag(5, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_experimentation.v1.Experiment.SDKVersion xbox_version = 6; */
        if (message.xboxVersion)
            exports.Experiment_SDKVersion.internalBinaryWrite(message.xboxVersion, writer.tag(6, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_experimentation.v1.Experiment.SDKVersion linux_version = 7; */
        if (message.linuxVersion)
            exports.Experiment_SDKVersion.internalBinaryWrite(message.linuxVersion, writer.tag(7, runtime_2.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.ClientOperatingSystem
 */
exports.Experiment_ClientOperatingSystem = new Experiment_ClientOperatingSystem$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_StaffUsers$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.StaffUsers", [
            { no: 1, name: "work_accounts", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "personal_accounts", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.workAccounts = false;
        message.personalAccounts = false;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool work_accounts */ 1:
                    message.workAccounts = reader.bool();
                    break;
                case /* bool personal_accounts */ 2:
                    message.personalAccounts = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* bool work_accounts = 1; */
        if (message.workAccounts !== false)
            writer.tag(1, runtime_2.WireType.Varint).bool(message.workAccounts);
        /* bool personal_accounts = 2; */
        if (message.personalAccounts !== false)
            writer.tag(2, runtime_2.WireType.Varint).bool(message.personalAccounts);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.StaffUsers
 */
exports.Experiment_StaffUsers = new Experiment_StaffUsers$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_UserInGuild$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.UserInGuild", [
            { no: 1, name: "guild_ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ }
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
                    if (wireType === runtime_2.WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.guildIds.push(reader.fixed64().toBigInt());
                    else
                        message.guildIds.push(reader.fixed64().toBigInt());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* repeated fixed64 guild_ids = 1; */
        if (message.guildIds.length) {
            writer.tag(1, runtime_2.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.guildIds.length; i++)
                writer.fixed64(message.guildIds[i]);
            writer.join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.UserInGuild
 */
exports.Experiment_UserInGuild = new Experiment_UserInGuild$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_UserIds$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.UserIds", [
            { no: 1, name: "user_ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.userIds = [];
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated fixed64 user_ids */ 1:
                    if (wireType === runtime_2.WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.userIds.push(reader.fixed64().toBigInt());
                    else
                        message.userIds.push(reader.fixed64().toBigInt());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* repeated fixed64 user_ids = 1; */
        if (message.userIds.length) {
            writer.tag(1, runtime_2.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.userIds.length; i++)
                writer.fixed64(message.userIds[i]);
            writer.join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.UserIds
 */
exports.Experiment_UserIds = new Experiment_UserIds$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_ClientLocale$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.ClientLocale", [
            { no: 1, name: "locales", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.locales = [];
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated string locales = 1 [packed = false] */ 1:
                    message.locales.push(reader.string());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* repeated string locales = 1 [packed = false]; */
        for (let i = 0; i < message.locales.length; i++)
            writer.tag(1, runtime_2.WireType.LengthDelimited).string(message.locales[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.ClientLocale
 */
exports.Experiment_ClientLocale = new Experiment_ClientLocale$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_ISORegion$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.ISORegion", [
            { no: 1, name: "iso_country", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "iso_subdivision", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.isoCountry = "";
        message.isoSubdivision = "";
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string iso_country */ 1:
                    message.isoCountry = reader.string();
                    break;
                case /* string iso_subdivision */ 2:
                    message.isoSubdivision = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* string iso_country = 1; */
        if (message.isoCountry !== "")
            writer.tag(1, runtime_2.WireType.LengthDelimited).string(message.isoCountry);
        /* string iso_subdivision = 2; */
        if (message.isoSubdivision !== "")
            writer.tag(2, runtime_2.WireType.LengthDelimited).string(message.isoSubdivision);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.ISORegion
 */
exports.Experiment_ISORegion = new Experiment_ISORegion$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_Place$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.Place", [
            { no: 1, name: "city", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "subdivision", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "country", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.city = "";
        message.subdivision = "";
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
                case /* string city */ 1:
                    message.city = reader.string();
                    break;
                case /* string subdivision */ 2:
                    message.subdivision = reader.string();
                    break;
                case /* string country */ 3:
                    message.country = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* string city = 1; */
        if (message.city !== "")
            writer.tag(1, runtime_2.WireType.LengthDelimited).string(message.city);
        /* string subdivision = 2; */
        if (message.subdivision !== "")
            writer.tag(2, runtime_2.WireType.LengthDelimited).string(message.subdivision);
        /* string country = 3; */
        if (message.country !== "")
            writer.tag(3, runtime_2.WireType.LengthDelimited).string(message.country);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.Place
 */
exports.Experiment_Place = new Experiment_Place$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_Location$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.Location", [
            { no: 1, name: "iso_region", kind: "message", oneof: "location", T: () => exports.Experiment_ISORegion },
            { no: 2, name: "is_eu", kind: "scalar", oneof: "location", T: 8 /*ScalarType.BOOL*/ },
            { no: 3, name: "place", kind: "message", oneof: "location", T: () => exports.Experiment_Place }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.location = { oneofKind: undefined };
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* discord_protos.discord_experimentation.v1.Experiment.ISORegion iso_region */ 1:
                    message.location = {
                        oneofKind: "isoRegion",
                        isoRegion: exports.Experiment_ISORegion.internalBinaryRead(reader, reader.uint32(), options, message.location.isoRegion)
                    };
                    break;
                case /* bool is_eu */ 2:
                    message.location = {
                        oneofKind: "isEu",
                        isEu: reader.bool()
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.Place place */ 3:
                    message.location = {
                        oneofKind: "place",
                        place: exports.Experiment_Place.internalBinaryRead(reader, reader.uint32(), options, message.location.place)
                    };
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* discord_protos.discord_experimentation.v1.Experiment.ISORegion iso_region = 1; */
        if (message.location.oneofKind === "isoRegion")
            exports.Experiment_ISORegion.internalBinaryWrite(message.location.isoRegion, writer.tag(1, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* bool is_eu = 2; */
        if (message.location.oneofKind === "isEu")
            writer.tag(2, runtime_2.WireType.Varint).bool(message.location.isEu);
        /* discord_protos.discord_experimentation.v1.Experiment.Place place = 3; */
        if (message.location.oneofKind === "place")
            exports.Experiment_Place.internalBinaryWrite(message.location.place, writer.tag(3, runtime_2.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.Location
 */
exports.Experiment_Location = new Experiment_Location$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_ClientLocation$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.ClientLocation", [
            { no: 1, name: "locations", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => exports.Experiment_Location }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.locations = [];
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated discord_protos.discord_experimentation.v1.Experiment.Location locations */ 1:
                    message.locations.push(exports.Experiment_Location.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* repeated discord_protos.discord_experimentation.v1.Experiment.Location locations = 1; */
        for (let i = 0; i < message.locations.length; i++)
            exports.Experiment_Location.internalBinaryWrite(message.locations[i], writer.tag(1, runtime_2.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.ClientLocation
 */
exports.Experiment_ClientLocation = new Experiment_ClientLocation$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_ClientIP$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.ClientIP", [
            { no: 1, name: "blocks", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.blocks = [];
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated string blocks = 1 [packed = false] */ 1:
                    message.blocks.push(reader.string());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* repeated string blocks = 1 [packed = false]; */
        for (let i = 0; i < message.blocks.length; i++)
            writer.tag(1, runtime_2.WireType.LengthDelimited).string(message.blocks[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.ClientIP
 */
exports.Experiment_ClientIP = new Experiment_ClientIP$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_UserLocale$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.UserLocale", [
            { no: 1, name: "locales", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.locales = [];
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated string locales = 1 [packed = false] */ 1:
                    message.locales.push(reader.string());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* repeated string locales = 1 [packed = false]; */
        for (let i = 0; i < message.locales.length; i++)
            writer.tag(1, runtime_2.WireType.LengthDelimited).string(message.locales[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.UserLocale
 */
exports.Experiment_UserLocale = new Experiment_UserLocale$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_UserIsBot$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.UserIsBot", [
            { no: 1, name: "is_bot", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.isBot = false;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool is_bot */ 1:
                    message.isBot = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* bool is_bot = 1; */
        if (message.isBot !== false)
            writer.tag(1, runtime_2.WireType.Varint).bool(message.isBot);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.UserIsBot
 */
exports.Experiment_UserIsBot = new Experiment_UserIsBot$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_UserAgeRange$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.UserAgeRange", [
            { no: 1, name: "min_age_years", kind: "message", T: () => wrappers_2.UInt32Value },
            { no: 2, name: "max_age_years", kind: "message", T: () => wrappers_2.UInt32Value }
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
                case /* optional google.protobuf.UInt32Value min_age_years */ 1:
                    message.minAgeYears = wrappers_2.UInt32Value.internalBinaryRead(reader, reader.uint32(), options, message.minAgeYears);
                    break;
                case /* optional google.protobuf.UInt32Value max_age_years */ 2:
                    message.maxAgeYears = wrappers_2.UInt32Value.internalBinaryRead(reader, reader.uint32(), options, message.maxAgeYears);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional google.protobuf.UInt32Value min_age_years = 1; */
        if (message.minAgeYears)
            wrappers_2.UInt32Value.internalBinaryWrite(message.minAgeYears, writer.tag(1, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.UInt32Value max_age_years = 2; */
        if (message.maxAgeYears)
            wrappers_2.UInt32Value.internalBinaryWrite(message.maxAgeYears, writer.tag(2, runtime_2.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.UserAgeRange
 */
exports.Experiment_UserAgeRange = new Experiment_UserAgeRange$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_Fixed64Value$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.Fixed64Value", [
            { no: 1, name: "value", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.value = 0n;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* fixed64 value */ 1:
                    message.value = reader.fixed64().toBigInt();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* fixed64 value = 1; */
        if (message.value !== 0n)
            writer.tag(1, runtime_2.WireType.Bit64).fixed64(message.value);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.Fixed64Value
 */
exports.Experiment_Fixed64Value = new Experiment_Fixed64Value$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_UserIDRange$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.UserIDRange", [
            { no: 1, name: "min_id", kind: "message", T: () => exports.Experiment_Fixed64Value },
            { no: 2, name: "max_id", kind: "message", T: () => exports.Experiment_Fixed64Value }
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
                case /* optional discord_protos.discord_experimentation.v1.Experiment.Fixed64Value min_id */ 1:
                    message.minId = exports.Experiment_Fixed64Value.internalBinaryRead(reader, reader.uint32(), options, message.minId);
                    break;
                case /* optional discord_protos.discord_experimentation.v1.Experiment.Fixed64Value max_id */ 2:
                    message.maxId = exports.Experiment_Fixed64Value.internalBinaryRead(reader, reader.uint32(), options, message.maxId);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional discord_protos.discord_experimentation.v1.Experiment.Fixed64Value min_id = 1; */
        if (message.minId)
            exports.Experiment_Fixed64Value.internalBinaryWrite(message.minId, writer.tag(1, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_experimentation.v1.Experiment.Fixed64Value max_id = 2; */
        if (message.maxId)
            exports.Experiment_Fixed64Value.internalBinaryWrite(message.maxId, writer.tag(2, runtime_2.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.UserIDRange
 */
exports.Experiment_UserIDRange = new Experiment_UserIDRange$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_UserHasFlag$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.UserHasFlag", [
            { no: 1, name: "mask", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.mask = 0n;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* fixed64 mask */ 1:
                    message.mask = reader.fixed64().toBigInt();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* fixed64 mask = 1; */
        if (message.mask !== 0n)
            writer.tag(1, runtime_2.WireType.Bit64).fixed64(message.mask);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.UserHasFlag
 */
exports.Experiment_UserHasFlag = new Experiment_UserHasFlag$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_UnitIdInRangeByHash$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.UnitIdInRangeByHash", [
            { no: 1, name: "hash_key", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "stop_ring_position", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 3, name: "start_ring_position", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.hashKey = "";
        message.stopRingPosition = 0;
        message.startRingPosition = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string hash_key */ 1:
                    message.hashKey = reader.string();
                    break;
                case /* uint32 stop_ring_position */ 2:
                    message.stopRingPosition = reader.uint32();
                    break;
                case /* uint32 start_ring_position */ 3:
                    message.startRingPosition = reader.uint32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* string hash_key = 1; */
        if (message.hashKey !== "")
            writer.tag(1, runtime_2.WireType.LengthDelimited).string(message.hashKey);
        /* uint32 stop_ring_position = 2; */
        if (message.stopRingPosition !== 0)
            writer.tag(2, runtime_2.WireType.Varint).uint32(message.stopRingPosition);
        /* uint32 start_ring_position = 3; */
        if (message.startRingPosition !== 0)
            writer.tag(3, runtime_2.WireType.Varint).uint32(message.startRingPosition);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.UnitIdInRangeByHash
 */
exports.Experiment_UnitIdInRangeByHash = new Experiment_UnitIdInRangeByHash$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_ClientReleaseChannel$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.ClientReleaseChannel", [
            { no: 1, name: "release_channels", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.releaseChannels = [];
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated string release_channels = 1 [packed = false] */ 1:
                    message.releaseChannels.push(reader.string());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* repeated string release_channels = 1 [packed = false]; */
        for (let i = 0; i < message.releaseChannels.length; i++)
            writer.tag(1, runtime_2.WireType.LengthDelimited).string(message.releaseChannels[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.ClientReleaseChannel
 */
exports.Experiment_ClientReleaseChannel = new Experiment_ClientReleaseChannel$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_Always$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.Always", [
            { no: 1, name: "value", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.value = false;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool value */ 1:
                    message.value = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* bool value = 1; */
        if (message.value !== false)
            writer.tag(1, runtime_2.WireType.Varint).bool(message.value);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.Always
 */
exports.Experiment_Always = new Experiment_Always$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_ClientSystemLocale$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.ClientSystemLocale", [
            { no: 1, name: "locales", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.locales = [];
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated string locales = 1 [packed = false] */ 1:
                    message.locales.push(reader.string());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* repeated string locales = 1 [packed = false]; */
        for (let i = 0; i < message.locales.length; i++)
            writer.tag(1, runtime_2.WireType.LengthDelimited).string(message.locales[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.ClientSystemLocale
 */
exports.Experiment_ClientSystemLocale = new Experiment_ClientSystemLocale$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_UnitIdInExperiment$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.UnitIdInExperiment", [
            { no: 1, name: "experiment_id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 2, name: "variation_ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 5 /*ScalarType.INT32*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.experimentId = 0n;
        message.variationIds = [];
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* fixed64 experiment_id */ 1:
                    message.experimentId = reader.fixed64().toBigInt();
                    break;
                case /* repeated int32 variation_ids */ 2:
                    if (wireType === runtime_2.WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.variationIds.push(reader.int32());
                    else
                        message.variationIds.push(reader.int32());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* fixed64 experiment_id = 1; */
        if (message.experimentId !== 0n)
            writer.tag(1, runtime_2.WireType.Bit64).fixed64(message.experimentId);
        /* repeated int32 variation_ids = 2; */
        if (message.variationIds.length) {
            writer.tag(2, runtime_2.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.variationIds.length; i++)
                writer.int32(message.variationIds[i]);
            writer.join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.UnitIdInExperiment
 */
exports.Experiment_UnitIdInExperiment = new Experiment_UnitIdInExperiment$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_UserPremiumType$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.UserPremiumType", [
            { no: 1, name: "premium_types", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 5 /*ScalarType.INT32*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.premiumTypes = [];
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated int32 premium_types */ 1:
                    if (wireType === runtime_2.WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.premiumTypes.push(reader.int32());
                    else
                        message.premiumTypes.push(reader.int32());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* repeated int32 premium_types = 1; */
        if (message.premiumTypes.length) {
            writer.tag(1, runtime_2.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.premiumTypes.length; i++)
                writer.int32(message.premiumTypes[i]);
            writer.join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.UserPremiumType
 */
exports.Experiment_UserPremiumType = new Experiment_UserPremiumType$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_UnitIdMatchesFilterSnapshot$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.UnitIdMatchesFilterSnapshot", [
            { no: 1, name: "filter_snapshot_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "target_filter_values", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.filterSnapshotName = "";
        message.targetFilterValues = [];
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string filter_snapshot_name */ 1:
                    message.filterSnapshotName = reader.string();
                    break;
                case /* repeated fixed64 target_filter_values */ 2:
                    if (wireType === runtime_2.WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.targetFilterValues.push(reader.fixed64().toBigInt());
                    else
                        message.targetFilterValues.push(reader.fixed64().toBigInt());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* string filter_snapshot_name = 1; */
        if (message.filterSnapshotName !== "")
            writer.tag(1, runtime_2.WireType.LengthDelimited).string(message.filterSnapshotName);
        /* repeated fixed64 target_filter_values = 2; */
        if (message.targetFilterValues.length) {
            writer.tag(2, runtime_2.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.targetFilterValues.length; i++)
                writer.fixed64(message.targetFilterValues[i]);
            writer.join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.UnitIdMatchesFilterSnapshot
 */
exports.Experiment_UnitIdMatchesFilterSnapshot = new Experiment_UnitIdMatchesFilterSnapshot$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_GuildIds$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.GuildIds", [
            { no: 1, name: "guild_ids", kind: "scalar", repeat: 1 /*RepeatType.PACKED*/, T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ }
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
                    if (wireType === runtime_2.WireType.LengthDelimited)
                        for (let e = reader.int32() + reader.pos; reader.pos < e;)
                            message.guildIds.push(reader.fixed64().toBigInt());
                    else
                        message.guildIds.push(reader.fixed64().toBigInt());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* repeated fixed64 guild_ids = 1; */
        if (message.guildIds.length) {
            writer.tag(1, runtime_2.WireType.LengthDelimited).fork();
            for (let i = 0; i < message.guildIds.length; i++)
                writer.fixed64(message.guildIds[i]);
            writer.join();
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.GuildIds
 */
exports.Experiment_GuildIds = new Experiment_GuildIds$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_GuildMemberCountRange$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.GuildMemberCountRange", [
            { no: 1, name: "min_count", kind: "message", T: () => wrappers_2.UInt32Value },
            { no: 2, name: "max_count", kind: "message", T: () => wrappers_2.UInt32Value }
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
                case /* optional google.protobuf.UInt32Value min_count */ 1:
                    message.minCount = wrappers_2.UInt32Value.internalBinaryRead(reader, reader.uint32(), options, message.minCount);
                    break;
                case /* optional google.protobuf.UInt32Value max_count */ 2:
                    message.maxCount = wrappers_2.UInt32Value.internalBinaryRead(reader, reader.uint32(), options, message.maxCount);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* optional google.protobuf.UInt32Value min_count = 1; */
        if (message.minCount)
            wrappers_2.UInt32Value.internalBinaryWrite(message.minCount, writer.tag(1, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.UInt32Value max_count = 2; */
        if (message.maxCount)
            wrappers_2.UInt32Value.internalBinaryWrite(message.maxCount, writer.tag(2, runtime_2.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.GuildMemberCountRange
 */
exports.Experiment_GuildMemberCountRange = new Experiment_GuildMemberCountRange$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_GuildHasFeature$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.GuildHasFeature", [
            { no: 1, name: "features", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.features = [];
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated string features = 1 [packed = false] */ 1:
                    message.features.push(reader.string());
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* repeated string features = 1 [packed = false]; */
        for (let i = 0; i < message.features.length; i++)
            writer.tag(1, runtime_2.WireType.LengthDelimited).string(message.features[i]);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.GuildHasFeature
 */
exports.Experiment_GuildHasFeature = new Experiment_GuildHasFeature$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_Filter$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.Filter", [
            { no: 2, name: "client_version", kind: "message", oneof: "filter", T: () => exports.Experiment_ClientPlatform },
            { no: 3, name: "client_os", kind: "message", oneof: "filter", T: () => exports.Experiment_ClientOperatingSystem },
            { no: 4, name: "staff", kind: "message", oneof: "filter", T: () => exports.Experiment_StaffUsers },
            { no: 5, name: "user_in_guild", kind: "message", oneof: "filter", T: () => exports.Experiment_UserInGuild },
            { no: 6, name: "user_ids", kind: "message", oneof: "filter", T: () => exports.Experiment_UserIds },
            { no: 7, name: "client_locale", kind: "message", oneof: "filter", T: () => exports.Experiment_ClientLocale },
            { no: 8, name: "client_location", kind: "message", oneof: "filter", T: () => exports.Experiment_ClientLocation },
            { no: 9, name: "client_ip", kind: "message", oneof: "filter", T: () => exports.Experiment_ClientIP },
            { no: 10, name: "user_locale", kind: "message", oneof: "filter", T: () => exports.Experiment_UserLocale },
            { no: 11, name: "bot", kind: "message", oneof: "filter", T: () => exports.Experiment_UserIsBot },
            { no: 12, name: "user_age_range", kind: "message", oneof: "filter", T: () => exports.Experiment_UserAgeRange },
            { no: 13, name: "user_id_range", kind: "message", oneof: "filter", T: () => exports.Experiment_UserIDRange },
            { no: 14, name: "user_has_flag", kind: "message", oneof: "filter", T: () => exports.Experiment_UserHasFlag },
            { no: 15, name: "unit_id_in_range_by_hash", kind: "message", oneof: "filter", T: () => exports.Experiment_UnitIdInRangeByHash },
            { no: 16, name: "client_release_channel", kind: "message", oneof: "filter", T: () => exports.Experiment_ClientReleaseChannel },
            { no: 17, name: "always", kind: "message", oneof: "filter", T: () => exports.Experiment_Always },
            { no: 18, name: "client_system_locale", kind: "message", oneof: "filter", T: () => exports.Experiment_ClientSystemLocale },
            { no: 19, name: "unit_id_in_experiment", kind: "message", oneof: "filter", T: () => exports.Experiment_UnitIdInExperiment },
            { no: 20, name: "user_premium_type", kind: "message", oneof: "filter", T: () => exports.Experiment_UserPremiumType },
            { no: 21, name: "unit_id_matches_filter_snapshot", kind: "message", oneof: "filter", T: () => exports.Experiment_UnitIdMatchesFilterSnapshot },
            { no: 22, name: "guild_ids", kind: "message", oneof: "filter", T: () => exports.Experiment_GuildIds },
            { no: 25, name: "guild_member_count_range", kind: "message", oneof: "filter", T: () => exports.Experiment_GuildMemberCountRange },
            { no: 26, name: "guild_has_feature", kind: "message", oneof: "filter", T: () => exports.Experiment_GuildHasFeature }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.filter = { oneofKind: undefined };
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* discord_protos.discord_experimentation.v1.Experiment.ClientPlatform client_version */ 2:
                    message.filter = {
                        oneofKind: "clientVersion",
                        clientVersion: exports.Experiment_ClientPlatform.internalBinaryRead(reader, reader.uint32(), options, message.filter.clientVersion)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.ClientOperatingSystem client_os */ 3:
                    message.filter = {
                        oneofKind: "clientOs",
                        clientOs: exports.Experiment_ClientOperatingSystem.internalBinaryRead(reader, reader.uint32(), options, message.filter.clientOs)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.StaffUsers staff */ 4:
                    message.filter = {
                        oneofKind: "staff",
                        staff: exports.Experiment_StaffUsers.internalBinaryRead(reader, reader.uint32(), options, message.filter.staff)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.UserInGuild user_in_guild */ 5:
                    message.filter = {
                        oneofKind: "userInGuild",
                        userInGuild: exports.Experiment_UserInGuild.internalBinaryRead(reader, reader.uint32(), options, message.filter.userInGuild)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.UserIds user_ids */ 6:
                    message.filter = {
                        oneofKind: "userIds",
                        userIds: exports.Experiment_UserIds.internalBinaryRead(reader, reader.uint32(), options, message.filter.userIds)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.ClientLocale client_locale */ 7:
                    message.filter = {
                        oneofKind: "clientLocale",
                        clientLocale: exports.Experiment_ClientLocale.internalBinaryRead(reader, reader.uint32(), options, message.filter.clientLocale)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.ClientLocation client_location */ 8:
                    message.filter = {
                        oneofKind: "clientLocation",
                        clientLocation: exports.Experiment_ClientLocation.internalBinaryRead(reader, reader.uint32(), options, message.filter.clientLocation)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.ClientIP client_ip */ 9:
                    message.filter = {
                        oneofKind: "clientIp",
                        clientIp: exports.Experiment_ClientIP.internalBinaryRead(reader, reader.uint32(), options, message.filter.clientIp)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.UserLocale user_locale */ 10:
                    message.filter = {
                        oneofKind: "userLocale",
                        userLocale: exports.Experiment_UserLocale.internalBinaryRead(reader, reader.uint32(), options, message.filter.userLocale)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.UserIsBot bot */ 11:
                    message.filter = {
                        oneofKind: "bot",
                        bot: exports.Experiment_UserIsBot.internalBinaryRead(reader, reader.uint32(), options, message.filter.bot)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.UserAgeRange user_age_range */ 12:
                    message.filter = {
                        oneofKind: "userAgeRange",
                        userAgeRange: exports.Experiment_UserAgeRange.internalBinaryRead(reader, reader.uint32(), options, message.filter.userAgeRange)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.UserIDRange user_id_range */ 13:
                    message.filter = {
                        oneofKind: "userIdRange",
                        userIdRange: exports.Experiment_UserIDRange.internalBinaryRead(reader, reader.uint32(), options, message.filter.userIdRange)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.UserHasFlag user_has_flag */ 14:
                    message.filter = {
                        oneofKind: "userHasFlag",
                        userHasFlag: exports.Experiment_UserHasFlag.internalBinaryRead(reader, reader.uint32(), options, message.filter.userHasFlag)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.UnitIdInRangeByHash unit_id_in_range_by_hash */ 15:
                    message.filter = {
                        oneofKind: "unitIdInRangeByHash",
                        unitIdInRangeByHash: exports.Experiment_UnitIdInRangeByHash.internalBinaryRead(reader, reader.uint32(), options, message.filter.unitIdInRangeByHash)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.ClientReleaseChannel client_release_channel */ 16:
                    message.filter = {
                        oneofKind: "clientReleaseChannel",
                        clientReleaseChannel: exports.Experiment_ClientReleaseChannel.internalBinaryRead(reader, reader.uint32(), options, message.filter.clientReleaseChannel)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.Always always */ 17:
                    message.filter = {
                        oneofKind: "always",
                        always: exports.Experiment_Always.internalBinaryRead(reader, reader.uint32(), options, message.filter.always)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.ClientSystemLocale client_system_locale */ 18:
                    message.filter = {
                        oneofKind: "clientSystemLocale",
                        clientSystemLocale: exports.Experiment_ClientSystemLocale.internalBinaryRead(reader, reader.uint32(), options, message.filter.clientSystemLocale)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.UnitIdInExperiment unit_id_in_experiment */ 19:
                    message.filter = {
                        oneofKind: "unitIdInExperiment",
                        unitIdInExperiment: exports.Experiment_UnitIdInExperiment.internalBinaryRead(reader, reader.uint32(), options, message.filter.unitIdInExperiment)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.UserPremiumType user_premium_type */ 20:
                    message.filter = {
                        oneofKind: "userPremiumType",
                        userPremiumType: exports.Experiment_UserPremiumType.internalBinaryRead(reader, reader.uint32(), options, message.filter.userPremiumType)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.UnitIdMatchesFilterSnapshot unit_id_matches_filter_snapshot */ 21:
                    message.filter = {
                        oneofKind: "unitIdMatchesFilterSnapshot",
                        unitIdMatchesFilterSnapshot: exports.Experiment_UnitIdMatchesFilterSnapshot.internalBinaryRead(reader, reader.uint32(), options, message.filter.unitIdMatchesFilterSnapshot)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.GuildIds guild_ids */ 22:
                    message.filter = {
                        oneofKind: "guildIds",
                        guildIds: exports.Experiment_GuildIds.internalBinaryRead(reader, reader.uint32(), options, message.filter.guildIds)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.GuildMemberCountRange guild_member_count_range */ 25:
                    message.filter = {
                        oneofKind: "guildMemberCountRange",
                        guildMemberCountRange: exports.Experiment_GuildMemberCountRange.internalBinaryRead(reader, reader.uint32(), options, message.filter.guildMemberCountRange)
                    };
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.GuildHasFeature guild_has_feature */ 26:
                    message.filter = {
                        oneofKind: "guildHasFeature",
                        guildHasFeature: exports.Experiment_GuildHasFeature.internalBinaryRead(reader, reader.uint32(), options, message.filter.guildHasFeature)
                    };
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* discord_protos.discord_experimentation.v1.Experiment.ClientPlatform client_version = 2; */
        if (message.filter.oneofKind === "clientVersion")
            exports.Experiment_ClientPlatform.internalBinaryWrite(message.filter.clientVersion, writer.tag(2, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.ClientOperatingSystem client_os = 3; */
        if (message.filter.oneofKind === "clientOs")
            exports.Experiment_ClientOperatingSystem.internalBinaryWrite(message.filter.clientOs, writer.tag(3, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.StaffUsers staff = 4; */
        if (message.filter.oneofKind === "staff")
            exports.Experiment_StaffUsers.internalBinaryWrite(message.filter.staff, writer.tag(4, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.UserInGuild user_in_guild = 5; */
        if (message.filter.oneofKind === "userInGuild")
            exports.Experiment_UserInGuild.internalBinaryWrite(message.filter.userInGuild, writer.tag(5, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.UserIds user_ids = 6; */
        if (message.filter.oneofKind === "userIds")
            exports.Experiment_UserIds.internalBinaryWrite(message.filter.userIds, writer.tag(6, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.ClientLocale client_locale = 7; */
        if (message.filter.oneofKind === "clientLocale")
            exports.Experiment_ClientLocale.internalBinaryWrite(message.filter.clientLocale, writer.tag(7, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.ClientLocation client_location = 8; */
        if (message.filter.oneofKind === "clientLocation")
            exports.Experiment_ClientLocation.internalBinaryWrite(message.filter.clientLocation, writer.tag(8, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.ClientIP client_ip = 9; */
        if (message.filter.oneofKind === "clientIp")
            exports.Experiment_ClientIP.internalBinaryWrite(message.filter.clientIp, writer.tag(9, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.UserLocale user_locale = 10; */
        if (message.filter.oneofKind === "userLocale")
            exports.Experiment_UserLocale.internalBinaryWrite(message.filter.userLocale, writer.tag(10, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.UserIsBot bot = 11; */
        if (message.filter.oneofKind === "bot")
            exports.Experiment_UserIsBot.internalBinaryWrite(message.filter.bot, writer.tag(11, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.UserAgeRange user_age_range = 12; */
        if (message.filter.oneofKind === "userAgeRange")
            exports.Experiment_UserAgeRange.internalBinaryWrite(message.filter.userAgeRange, writer.tag(12, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.UserIDRange user_id_range = 13; */
        if (message.filter.oneofKind === "userIdRange")
            exports.Experiment_UserIDRange.internalBinaryWrite(message.filter.userIdRange, writer.tag(13, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.UserHasFlag user_has_flag = 14; */
        if (message.filter.oneofKind === "userHasFlag")
            exports.Experiment_UserHasFlag.internalBinaryWrite(message.filter.userHasFlag, writer.tag(14, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.UnitIdInRangeByHash unit_id_in_range_by_hash = 15; */
        if (message.filter.oneofKind === "unitIdInRangeByHash")
            exports.Experiment_UnitIdInRangeByHash.internalBinaryWrite(message.filter.unitIdInRangeByHash, writer.tag(15, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.ClientReleaseChannel client_release_channel = 16; */
        if (message.filter.oneofKind === "clientReleaseChannel")
            exports.Experiment_ClientReleaseChannel.internalBinaryWrite(message.filter.clientReleaseChannel, writer.tag(16, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.Always always = 17; */
        if (message.filter.oneofKind === "always")
            exports.Experiment_Always.internalBinaryWrite(message.filter.always, writer.tag(17, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.ClientSystemLocale client_system_locale = 18; */
        if (message.filter.oneofKind === "clientSystemLocale")
            exports.Experiment_ClientSystemLocale.internalBinaryWrite(message.filter.clientSystemLocale, writer.tag(18, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.UnitIdInExperiment unit_id_in_experiment = 19; */
        if (message.filter.oneofKind === "unitIdInExperiment")
            exports.Experiment_UnitIdInExperiment.internalBinaryWrite(message.filter.unitIdInExperiment, writer.tag(19, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.UserPremiumType user_premium_type = 20; */
        if (message.filter.oneofKind === "userPremiumType")
            exports.Experiment_UserPremiumType.internalBinaryWrite(message.filter.userPremiumType, writer.tag(20, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.UnitIdMatchesFilterSnapshot unit_id_matches_filter_snapshot = 21; */
        if (message.filter.oneofKind === "unitIdMatchesFilterSnapshot")
            exports.Experiment_UnitIdMatchesFilterSnapshot.internalBinaryWrite(message.filter.unitIdMatchesFilterSnapshot, writer.tag(21, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.GuildIds guild_ids = 22; */
        if (message.filter.oneofKind === "guildIds")
            exports.Experiment_GuildIds.internalBinaryWrite(message.filter.guildIds, writer.tag(22, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.GuildMemberCountRange guild_member_count_range = 25; */
        if (message.filter.oneofKind === "guildMemberCountRange")
            exports.Experiment_GuildMemberCountRange.internalBinaryWrite(message.filter.guildMemberCountRange, writer.tag(25, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.discord_experimentation.v1.Experiment.GuildHasFeature guild_has_feature = 26; */
        if (message.filter.oneofKind === "guildHasFeature")
            exports.Experiment_GuildHasFeature.internalBinaryWrite(message.filter.guildHasFeature, writer.tag(26, runtime_2.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.Filter
 */
exports.Experiment_Filter = new Experiment_Filter$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_Override$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.Override", [
            { no: 1, name: "variation_id", kind: "scalar", T: 5 /*ScalarType.INT32*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.variationId = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int32 variation_id */ 1:
                    message.variationId = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* int32 variation_id = 1; */
        if (message.variationId !== 0)
            writer.tag(1, runtime_2.WireType.Varint).int32(message.variationId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.Override
 */
exports.Experiment_Override = new Experiment_Override$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_Rule$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.Rule", [
            { no: 1, name: "type", kind: "enum", T: () => ["discord_protos.discord_experimentation.v1.Experiment.Type", Experiment_Type, "TYPE_"] },
            { no: 2, name: "filters", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => exports.Experiment_Filter },
            { no: 3, name: "override", kind: "message", T: () => exports.Experiment_Override },
            { no: 4, name: "is_sunset_rule", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 5, name: "subtype", kind: "enum", T: () => ["discord_protos.discord_experimentation.v1.Experiment.Subtype", Experiment_Subtype, "SUBTYPE_"] }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.type = 0;
        message.filters = [];
        message.isSunsetRule = false;
        message.subtype = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* discord_protos.discord_experimentation.v1.Experiment.Type type */ 1:
                    message.type = reader.int32();
                    break;
                case /* repeated discord_protos.discord_experimentation.v1.Experiment.Filter filters */ 2:
                    message.filters.push(exports.Experiment_Filter.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* optional discord_protos.discord_experimentation.v1.Experiment.Override override */ 3:
                    message.override = exports.Experiment_Override.internalBinaryRead(reader, reader.uint32(), options, message.override);
                    break;
                case /* bool is_sunset_rule */ 4:
                    message.isSunsetRule = reader.bool();
                    break;
                case /* discord_protos.discord_experimentation.v1.Experiment.Subtype subtype */ 5:
                    message.subtype = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* discord_protos.discord_experimentation.v1.Experiment.Type type = 1; */
        if (message.type !== 0)
            writer.tag(1, runtime_2.WireType.Varint).int32(message.type);
        /* repeated discord_protos.discord_experimentation.v1.Experiment.Filter filters = 2; */
        for (let i = 0; i < message.filters.length; i++)
            exports.Experiment_Filter.internalBinaryWrite(message.filters[i], writer.tag(2, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.discord_experimentation.v1.Experiment.Override override = 3; */
        if (message.override)
            exports.Experiment_Override.internalBinaryWrite(message.override, writer.tag(3, runtime_2.WireType.LengthDelimited).fork(), options).join();
        /* bool is_sunset_rule = 4; */
        if (message.isSunsetRule !== false)
            writer.tag(4, runtime_2.WireType.Varint).bool(message.isSunsetRule);
        /* discord_protos.discord_experimentation.v1.Experiment.Subtype subtype = 5; */
        if (message.subtype !== 0)
            writer.tag(5, runtime_2.WireType.Varint).int32(message.subtype);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.Rule
 */
exports.Experiment_Rule = new Experiment_Rule$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Experiment_DebugConfig$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_experimentation.v1.Experiment.DebugConfig", [
            { no: 1, name: "enable_decision_logging", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "metrics_sample_rate", kind: "scalar", T: 1 /*ScalarType.DOUBLE*/ },
            { no: 3, name: "log_context_on_failure", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 4, name: "log_raw_headers", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 5, name: "tag_filter_metrics", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 6, name: "decision_log_sample_rate", kind: "scalar", T: 1 /*ScalarType.DOUBLE*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.enableDecisionLogging = false;
        message.metricsSampleRate = 0;
        message.logContextOnFailure = false;
        message.logRawHeaders = false;
        message.tagFilterMetrics = false;
        message.decisionLogSampleRate = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool enable_decision_logging */ 1:
                    message.enableDecisionLogging = reader.bool();
                    break;
                case /* double metrics_sample_rate */ 2:
                    message.metricsSampleRate = reader.double();
                    break;
                case /* bool log_context_on_failure */ 3:
                    message.logContextOnFailure = reader.bool();
                    break;
                case /* bool log_raw_headers */ 4:
                    message.logRawHeaders = reader.bool();
                    break;
                case /* bool tag_filter_metrics */ 5:
                    message.tagFilterMetrics = reader.bool();
                    break;
                case /* double decision_log_sample_rate */ 6:
                    message.decisionLogSampleRate = reader.double();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? runtime_1.UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message, writer, options) {
        /* bool enable_decision_logging = 1; */
        if (message.enableDecisionLogging !== false)
            writer.tag(1, runtime_2.WireType.Varint).bool(message.enableDecisionLogging);
        /* double metrics_sample_rate = 2; */
        if (message.metricsSampleRate !== 0)
            writer.tag(2, runtime_2.WireType.Bit64).double(message.metricsSampleRate);
        /* bool log_context_on_failure = 3; */
        if (message.logContextOnFailure !== false)
            writer.tag(3, runtime_2.WireType.Varint).bool(message.logContextOnFailure);
        /* bool log_raw_headers = 4; */
        if (message.logRawHeaders !== false)
            writer.tag(4, runtime_2.WireType.Varint).bool(message.logRawHeaders);
        /* bool tag_filter_metrics = 5; */
        if (message.tagFilterMetrics !== false)
            writer.tag(5, runtime_2.WireType.Varint).bool(message.tagFilterMetrics);
        /* double decision_log_sample_rate = 6; */
        if (message.decisionLogSampleRate !== 0)
            writer.tag(6, runtime_2.WireType.Bit64).double(message.decisionLogSampleRate);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_1.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_experimentation.v1.Experiment.DebugConfig
 */
exports.Experiment_DebugConfig = new Experiment_DebugConfig$Type();
