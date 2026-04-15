"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediumUser = void 0;
const runtime_1 = require("@protobuf-ts/runtime");
const runtime_2 = require("@protobuf-ts/runtime");
const runtime_3 = require("@protobuf-ts/runtime");
const runtime_4 = require("@protobuf-ts/runtime");
const wrappers_1 = require("../../google/protobuf/wrappers");
// @generated message type with reflection information, may provide speed optimized methods
class MediumUser$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.users.v1.MediumUser", [
            { no: 1, name: "id", kind: "scalar", T: 6 /*ScalarType.FIXED64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 2, name: "username", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "discriminator", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 4, name: "avatar_hash", kind: "message", T: () => wrappers_1.StringValue },
            { no: 5, name: "bot", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 6, name: "flags", kind: "scalar", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 7, name: "email", kind: "message", T: () => wrappers_1.StringValue },
            { no: 8, name: "phone", kind: "message", T: () => wrappers_1.StringValue }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.id = 0n;
        message.username = "";
        message.discriminator = 0;
        message.bot = false;
        message.flags = 0n;
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
                case /* string username */ 2:
                    message.username = reader.string();
                    break;
                case /* uint32 discriminator */ 3:
                    message.discriminator = reader.uint32();
                    break;
                case /* optional google.protobuf.StringValue avatar_hash */ 4:
                    message.avatarHash = wrappers_1.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.avatarHash);
                    break;
                case /* bool bot */ 5:
                    message.bot = reader.bool();
                    break;
                case /* uint64 flags */ 6:
                    message.flags = reader.uint64().toBigInt();
                    break;
                case /* optional google.protobuf.StringValue email */ 7:
                    message.email = wrappers_1.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.email);
                    break;
                case /* optional google.protobuf.StringValue phone */ 8:
                    message.phone = wrappers_1.StringValue.internalBinaryRead(reader, reader.uint32(), options, message.phone);
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
        /* string username = 2; */
        if (message.username !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.username);
        /* uint32 discriminator = 3; */
        if (message.discriminator !== 0)
            writer.tag(3, runtime_1.WireType.Varint).uint32(message.discriminator);
        /* optional google.protobuf.StringValue avatar_hash = 4; */
        if (message.avatarHash)
            wrappers_1.StringValue.internalBinaryWrite(message.avatarHash, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* bool bot = 5; */
        if (message.bot !== false)
            writer.tag(5, runtime_1.WireType.Varint).bool(message.bot);
        /* uint64 flags = 6; */
        if (message.flags !== 0n)
            writer.tag(6, runtime_1.WireType.Varint).uint64(message.flags);
        /* optional google.protobuf.StringValue email = 7; */
        if (message.email)
            wrappers_1.StringValue.internalBinaryWrite(message.email, writer.tag(7, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional google.protobuf.StringValue phone = 8; */
        if (message.phone)
            wrappers_1.StringValue.internalBinaryWrite(message.phone, writer.tag(8, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.users.v1.MediumUser
 */
exports.MediumUser = new MediumUser$Type();
