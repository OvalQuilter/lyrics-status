"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationUserRoleConnection = void 0;
const runtime_1 = require("@protobuf-ts/runtime");
const runtime_2 = require("@protobuf-ts/runtime");
const runtime_3 = require("@protobuf-ts/runtime");
const runtime_4 = require("@protobuf-ts/runtime");
// @generated message type with reflection information, may provide speed optimized methods
class ApplicationUserRoleConnection$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.discord_kkv_store_value_models.v1.ApplicationUserRoleConnection", [
            { no: 1, name: "metadata", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "scalar", T: 9 /*ScalarType.STRING*/ } },
            { no: 2, name: "platform_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "platform_username", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "version", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.metadata = {};
        message.platformName = "";
        message.platformUsername = "";
        message.version = 0n;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<string, string> metadata */ 1:
                    this.binaryReadMap1(message.metadata, reader, options);
                    break;
                case /* string platform_name */ 2:
                    message.platformName = reader.string();
                    break;
                case /* string platform_username */ 3:
                    message.platformUsername = reader.string();
                    break;
                case /* fixed64 version */ 4:
                    message.version = reader.fixed64().toBigInt();
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
                    key = reader.string();
                    break;
                case 2:
                    val = reader.string();
                    break;
                default: throw new globalThis.Error("unknown map entry field for discord_protos.discord_kkv_store_value_models.v1.ApplicationUserRoleConnection.metadata");
            }
        }
        map[key ?? ""] = val ?? "";
    }
    internalBinaryWrite(message, writer, options) {
        /* map<string, string> metadata = 1; */
        for (let k of globalThis.Object.keys(message.metadata))
            writer.tag(1, runtime_1.WireType.LengthDelimited).fork().tag(1, runtime_1.WireType.LengthDelimited).string(k).tag(2, runtime_1.WireType.LengthDelimited).string(message.metadata[k]).join();
        /* string platform_name = 2; */
        if (message.platformName !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.platformName);
        /* string platform_username = 3; */
        if (message.platformUsername !== "")
            writer.tag(3, runtime_1.WireType.LengthDelimited).string(message.platformUsername);
        /* fixed64 version = 4; */
        if (message.version !== 0n)
            writer.tag(4, runtime_1.WireType.Bit64).fixed64(message.version);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.discord_kkv_store_value_models.v1.ApplicationUserRoleConnection
 */
exports.ApplicationUserRoleConnection = new ApplicationUserRoleConnection$Type();
