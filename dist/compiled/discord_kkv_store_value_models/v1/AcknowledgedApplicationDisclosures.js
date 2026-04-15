"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcknowledgedApplicationDisclosures_AcknowledgedApplicationDisclosure = exports.AcknowledgedApplicationDisclosures = exports.AcknowledgedApplicationDisclosures_ApplicationDisclosureType = void 0;
const runtime_1 = require("@protobuf-ts/runtime");
const runtime_2 = require("@protobuf-ts/runtime");
const runtime_3 = require("@protobuf-ts/runtime");
const runtime_4 = require("@protobuf-ts/runtime");
const timestamp_1 = require("../../google/protobuf/timestamp");
/**
 * @generated from protobuf enum discord_protos.discord_kkv_store_value_models.v1.AcknowledgedApplicationDisclosures.ApplicationDisclosureType
 */
var AcknowledgedApplicationDisclosures_ApplicationDisclosureType;
(function (AcknowledgedApplicationDisclosures_ApplicationDisclosureType) {
    /**
     * @generated from protobuf enum value: APPLICATION_DISCLOSURE_TYPE_UNSPECIFIED_DISCLOSURE = 0;
     */
    AcknowledgedApplicationDisclosures_ApplicationDisclosureType[AcknowledgedApplicationDisclosures_ApplicationDisclosureType["UNSPECIFIED_DISCLOSURE"] = 0] = "UNSPECIFIED_DISCLOSURE";
    /**
     * @generated from protobuf enum value: APPLICATION_DISCLOSURE_TYPE_IP_LOCATION = 1;
     */
    AcknowledgedApplicationDisclosures_ApplicationDisclosureType[AcknowledgedApplicationDisclosures_ApplicationDisclosureType["IP_LOCATION"] = 1] = "IP_LOCATION";
    /**
     * @generated from protobuf enum value: APPLICATION_DISCLOSURE_TYPE_DISPLAYS_ADVERTISEMENTS = 2;
     */
    AcknowledgedApplicationDisclosures_ApplicationDisclosureType[AcknowledgedApplicationDisclosures_ApplicationDisclosureType["DISPLAYS_ADVERTISEMENTS"] = 2] = "DISPLAYS_ADVERTISEMENTS";
    /**
     * @generated from protobuf enum value: APPLICATION_DISCLOSURE_TYPE_PARTNER_SDK_DATA_SHARING_MESSAGE = 3;
     */
    AcknowledgedApplicationDisclosures_ApplicationDisclosureType[AcknowledgedApplicationDisclosures_ApplicationDisclosureType["PARTNER_SDK_DATA_SHARING_MESSAGE"] = 3] = "PARTNER_SDK_DATA_SHARING_MESSAGE";
})(AcknowledgedApplicationDisclosures_ApplicationDisclosureType || (exports.AcknowledgedApplicationDisclosures_ApplicationDisclosureType = AcknowledgedApplicationDisclosures_ApplicationDisclosureType = {}));
// @generated message type with reflection information, may provide speed optimized methods
class AcknowledgedApplicationDisclosures$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_kkv_store_value_models.v1.AcknowledgedApplicationDisclosures", [
            { no: 1, name: "acked_disclosures", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => exports.AcknowledgedApplicationDisclosures_AcknowledgedApplicationDisclosure }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.ackedDisclosures = [];
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated discord_protos.discord_kkv_store_value_models.v1.AcknowledgedApplicationDisclosures.AcknowledgedApplicationDisclosure acked_disclosures */ 1:
                    message.ackedDisclosures.push(exports.AcknowledgedApplicationDisclosures_AcknowledgedApplicationDisclosure.internalBinaryRead(reader, reader.uint32(), options));
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
        /* repeated discord_protos.discord_kkv_store_value_models.v1.AcknowledgedApplicationDisclosures.AcknowledgedApplicationDisclosure acked_disclosures = 1; */
        for (let i = 0; i < message.ackedDisclosures.length; i++)
            exports.AcknowledgedApplicationDisclosures_AcknowledgedApplicationDisclosure.internalBinaryWrite(message.ackedDisclosures[i], writer.tag(1, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_kkv_store_value_models.v1.AcknowledgedApplicationDisclosures
 */
exports.AcknowledgedApplicationDisclosures = new AcknowledgedApplicationDisclosures$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AcknowledgedApplicationDisclosures_AcknowledgedApplicationDisclosure$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_kkv_store_value_models.v1.AcknowledgedApplicationDisclosures.AcknowledgedApplicationDisclosure", [
            { no: 1, name: "disclosure_type", kind: "enum", T: () => ["discord_protos.discord_kkv_store_value_models.v1.AcknowledgedApplicationDisclosures.ApplicationDisclosureType", AcknowledgedApplicationDisclosures_ApplicationDisclosureType, "APPLICATION_DISCLOSURE_TYPE_"] },
            { no: 2, name: "acked_at", kind: "message", T: () => timestamp_1.Timestamp }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.disclosureType = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* discord_protos.discord_kkv_store_value_models.v1.AcknowledgedApplicationDisclosures.ApplicationDisclosureType disclosure_type */ 1:
                    message.disclosureType = reader.int32();
                    break;
                case /* optional google.protobuf.Timestamp acked_at */ 2:
                    message.ackedAt = timestamp_1.Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.ackedAt);
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
        /* discord_protos.discord_kkv_store_value_models.v1.AcknowledgedApplicationDisclosures.ApplicationDisclosureType disclosure_type = 1; */
        if (message.disclosureType !== 0)
            writer.tag(1, runtime_1.WireType.Varint).int32(message.disclosureType);
        /* optional google.protobuf.Timestamp acked_at = 2; */
        if (message.ackedAt)
            timestamp_1.Timestamp.internalBinaryWrite(message.ackedAt, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_kkv_store_value_models.v1.AcknowledgedApplicationDisclosures.AcknowledgedApplicationDisclosure
 */
exports.AcknowledgedApplicationDisclosures_AcknowledgedApplicationDisclosure = new AcknowledgedApplicationDisclosures_AcknowledgedApplicationDisclosure$Type();
