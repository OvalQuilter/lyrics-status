"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PremiumMarketingComponentProperties_PremiumTabTooltip = exports.PremiumMarketingComponentProperties_GiftReminderCoachmark = exports.PremiumMarketingComponentProperties_GiftReminderNagbar = exports.PremiumMarketingComponentProperties_BillingSettingsNitroGiftBanner = exports.PremiumMarketingComponentProperties_GiftCustomizationBanner = exports.PremiumMarketingComponentProperties_GiftPlanSelectionCardBanner = exports.PremiumMarketingComponentProperties_GiftIconCoachmark = exports.PremiumMarketingComponentProperties_ThemeAwareAsset = exports.PremiumMarketingComponentProperties_GiftIcon = exports.PremiumMarketingComponentProperties_Gradient = exports.PremiumMarketingComponentProperties_MobileBottomSheet = exports.PremiumMarketingComponentProperties_CTAButton = exports.PremiumMarketingComponentProperties_PaymentModalBanner = exports.PremiumMarketingComponentProperties_MarketingPageBanner = exports.PremiumMarketingComponentProperties_MarketingPageBannerButton = exports.PremiumMarketingComponentProperties_PremiumTab = exports.PremiumMarketingComponentProperties_AnnouncementModalVariant1Properties = exports.PremiumMarketingComponentProperties_Variant1Storage = exports.PremiumMarketingComponentProperties_Subtitle = exports.PremiumMarketingComponentProperties_SubscriptionButton = exports.PremiumMarketingComponentProperties_FeatureCard = exports.PremiumMarketingComponentProperties = exports.PremiumMarketingComponentProperties_ButtonAction = void 0;
const runtime_1 = require("@protobuf-ts/runtime");
const runtime_2 = require("@protobuf-ts/runtime");
const runtime_3 = require("@protobuf-ts/runtime");
const runtime_4 = require("@protobuf-ts/runtime");
/**
 * @generated from protobuf enum discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ButtonAction
 */
var PremiumMarketingComponentProperties_ButtonAction;
(function (PremiumMarketingComponentProperties_ButtonAction) {
    /**
     * @generated from protobuf enum value: BUTTON_ACTION_UNSPECIFIED = 0;
     */
    PremiumMarketingComponentProperties_ButtonAction[PremiumMarketingComponentProperties_ButtonAction["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * @generated from protobuf enum value: BUTTON_ACTION_OPEN_MARKETING_PAGE = 1;
     */
    PremiumMarketingComponentProperties_ButtonAction[PremiumMarketingComponentProperties_ButtonAction["OPEN_MARKETING_PAGE"] = 1] = "OPEN_MARKETING_PAGE";
    /**
     * @generated from protobuf enum value: BUTTON_ACTION_OPEN_TIER_2_PAYMENT_MODAL = 2;
     */
    PremiumMarketingComponentProperties_ButtonAction[PremiumMarketingComponentProperties_ButtonAction["OPEN_TIER_2_PAYMENT_MODAL"] = 2] = "OPEN_TIER_2_PAYMENT_MODAL";
    /**
     * @generated from protobuf enum value: BUTTON_ACTION_OPEN_TIER_1_PAYMENT_MODAL = 3;
     */
    PremiumMarketingComponentProperties_ButtonAction[PremiumMarketingComponentProperties_ButtonAction["OPEN_TIER_1_PAYMENT_MODAL"] = 3] = "OPEN_TIER_1_PAYMENT_MODAL";
    /**
     * @generated from protobuf enum value: BUTTON_ACTION_OPEN_TIER_2_PAYMENT_MODAL_CUSTOM_CONFIRMATION_FOOTER = 4;
     */
    PremiumMarketingComponentProperties_ButtonAction[PremiumMarketingComponentProperties_ButtonAction["OPEN_TIER_2_PAYMENT_MODAL_CUSTOM_CONFIRMATION_FOOTER"] = 4] = "OPEN_TIER_2_PAYMENT_MODAL_CUSTOM_CONFIRMATION_FOOTER";
    /**
     * @generated from protobuf enum value: BUTTON_ACTION_OPEN_PLAN_SELECTION_MODAL = 5;
     */
    PremiumMarketingComponentProperties_ButtonAction[PremiumMarketingComponentProperties_ButtonAction["OPEN_PLAN_SELECTION_MODAL"] = 5] = "OPEN_PLAN_SELECTION_MODAL";
})(PremiumMarketingComponentProperties_ButtonAction || (exports.PremiumMarketingComponentProperties_ButtonAction = PremiumMarketingComponentProperties_ButtonAction = {}));
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties", [
            { no: 3, name: "content_identifier", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 1, name: "placeholder", kind: "scalar", oneof: "properties", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "announcement_modal_variant_1", kind: "message", oneof: "properties", T: () => exports.PremiumMarketingComponentProperties_AnnouncementModalVariant1Properties },
            { no: 4, name: "premium_tab", kind: "message", oneof: "properties", T: () => exports.PremiumMarketingComponentProperties_PremiumTab },
            { no: 5, name: "marketing_page_banner", kind: "message", oneof: "properties", T: () => exports.PremiumMarketingComponentProperties_MarketingPageBanner },
            { no: 6, name: "payment_modal_banner", kind: "message", oneof: "properties", T: () => exports.PremiumMarketingComponentProperties_PaymentModalBanner },
            { no: 7, name: "mobile_bottom_sheet", kind: "message", oneof: "properties", T: () => exports.PremiumMarketingComponentProperties_MobileBottomSheet },
            { no: 8, name: "gift_icon", kind: "message", oneof: "properties", T: () => exports.PremiumMarketingComponentProperties_GiftIcon },
            { no: 9, name: "gift_icon_coachmark", kind: "message", oneof: "properties", T: () => exports.PremiumMarketingComponentProperties_GiftIconCoachmark },
            { no: 10, name: "gift_plan_selection_card_banner", kind: "message", oneof: "properties", T: () => exports.PremiumMarketingComponentProperties_GiftPlanSelectionCardBanner },
            { no: 11, name: "gift_customization_banner", kind: "message", oneof: "properties", T: () => exports.PremiumMarketingComponentProperties_GiftCustomizationBanner },
            { no: 12, name: "billing_settings_nitro_gift_banner", kind: "message", oneof: "properties", T: () => exports.PremiumMarketingComponentProperties_BillingSettingsNitroGiftBanner },
            { no: 13, name: "gift_reminder_nagbar", kind: "message", oneof: "properties", T: () => exports.PremiumMarketingComponentProperties_GiftReminderNagbar },
            { no: 14, name: "gift_reminder_coachmark", kind: "message", oneof: "properties", T: () => exports.PremiumMarketingComponentProperties_GiftReminderCoachmark },
            { no: 15, name: "premium_tab_tooltip", kind: "message", oneof: "properties", T: () => exports.PremiumMarketingComponentProperties_PremiumTabTooltip }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.contentIdentifier = "";
        message.properties = { oneofKind: undefined };
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string content_identifier */ 3:
                    message.contentIdentifier = reader.string();
                    break;
                case /* string placeholder */ 1:
                    message.properties = {
                        oneofKind: "placeholder",
                        placeholder: reader.string()
                    };
                    break;
                case /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.AnnouncementModalVariant1Properties announcement_modal_variant_1 */ 2:
                    message.properties = {
                        oneofKind: "announcementModalVariant1",
                        announcementModalVariant1: exports.PremiumMarketingComponentProperties_AnnouncementModalVariant1Properties.internalBinaryRead(reader, reader.uint32(), options, message.properties.announcementModalVariant1)
                    };
                    break;
                case /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.PremiumTab premium_tab */ 4:
                    message.properties = {
                        oneofKind: "premiumTab",
                        premiumTab: exports.PremiumMarketingComponentProperties_PremiumTab.internalBinaryRead(reader, reader.uint32(), options, message.properties.premiumTab)
                    };
                    break;
                case /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.MarketingPageBanner marketing_page_banner */ 5:
                    message.properties = {
                        oneofKind: "marketingPageBanner",
                        marketingPageBanner: exports.PremiumMarketingComponentProperties_MarketingPageBanner.internalBinaryRead(reader, reader.uint32(), options, message.properties.marketingPageBanner)
                    };
                    break;
                case /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.PaymentModalBanner payment_modal_banner */ 6:
                    message.properties = {
                        oneofKind: "paymentModalBanner",
                        paymentModalBanner: exports.PremiumMarketingComponentProperties_PaymentModalBanner.internalBinaryRead(reader, reader.uint32(), options, message.properties.paymentModalBanner)
                    };
                    break;
                case /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.MobileBottomSheet mobile_bottom_sheet */ 7:
                    message.properties = {
                        oneofKind: "mobileBottomSheet",
                        mobileBottomSheet: exports.PremiumMarketingComponentProperties_MobileBottomSheet.internalBinaryRead(reader, reader.uint32(), options, message.properties.mobileBottomSheet)
                    };
                    break;
                case /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftIcon gift_icon */ 8:
                    message.properties = {
                        oneofKind: "giftIcon",
                        giftIcon: exports.PremiumMarketingComponentProperties_GiftIcon.internalBinaryRead(reader, reader.uint32(), options, message.properties.giftIcon)
                    };
                    break;
                case /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftIconCoachmark gift_icon_coachmark */ 9:
                    message.properties = {
                        oneofKind: "giftIconCoachmark",
                        giftIconCoachmark: exports.PremiumMarketingComponentProperties_GiftIconCoachmark.internalBinaryRead(reader, reader.uint32(), options, message.properties.giftIconCoachmark)
                    };
                    break;
                case /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftPlanSelectionCardBanner gift_plan_selection_card_banner */ 10:
                    message.properties = {
                        oneofKind: "giftPlanSelectionCardBanner",
                        giftPlanSelectionCardBanner: exports.PremiumMarketingComponentProperties_GiftPlanSelectionCardBanner.internalBinaryRead(reader, reader.uint32(), options, message.properties.giftPlanSelectionCardBanner)
                    };
                    break;
                case /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftCustomizationBanner gift_customization_banner */ 11:
                    message.properties = {
                        oneofKind: "giftCustomizationBanner",
                        giftCustomizationBanner: exports.PremiumMarketingComponentProperties_GiftCustomizationBanner.internalBinaryRead(reader, reader.uint32(), options, message.properties.giftCustomizationBanner)
                    };
                    break;
                case /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.BillingSettingsNitroGiftBanner billing_settings_nitro_gift_banner */ 12:
                    message.properties = {
                        oneofKind: "billingSettingsNitroGiftBanner",
                        billingSettingsNitroGiftBanner: exports.PremiumMarketingComponentProperties_BillingSettingsNitroGiftBanner.internalBinaryRead(reader, reader.uint32(), options, message.properties.billingSettingsNitroGiftBanner)
                    };
                    break;
                case /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftReminderNagbar gift_reminder_nagbar */ 13:
                    message.properties = {
                        oneofKind: "giftReminderNagbar",
                        giftReminderNagbar: exports.PremiumMarketingComponentProperties_GiftReminderNagbar.internalBinaryRead(reader, reader.uint32(), options, message.properties.giftReminderNagbar)
                    };
                    break;
                case /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftReminderCoachmark gift_reminder_coachmark */ 14:
                    message.properties = {
                        oneofKind: "giftReminderCoachmark",
                        giftReminderCoachmark: exports.PremiumMarketingComponentProperties_GiftReminderCoachmark.internalBinaryRead(reader, reader.uint32(), options, message.properties.giftReminderCoachmark)
                    };
                    break;
                case /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.PremiumTabTooltip premium_tab_tooltip */ 15:
                    message.properties = {
                        oneofKind: "premiumTabTooltip",
                        premiumTabTooltip: exports.PremiumMarketingComponentProperties_PremiumTabTooltip.internalBinaryRead(reader, reader.uint32(), options, message.properties.premiumTabTooltip)
                    };
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
        /* string placeholder = 1; */
        if (message.properties.oneofKind === "placeholder")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.properties.placeholder);
        /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.AnnouncementModalVariant1Properties announcement_modal_variant_1 = 2; */
        if (message.properties.oneofKind === "announcementModalVariant1")
            exports.PremiumMarketingComponentProperties_AnnouncementModalVariant1Properties.internalBinaryWrite(message.properties.announcementModalVariant1, writer.tag(2, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* string content_identifier = 3; */
        if (message.contentIdentifier !== "")
            writer.tag(3, runtime_1.WireType.LengthDelimited).string(message.contentIdentifier);
        /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.PremiumTab premium_tab = 4; */
        if (message.properties.oneofKind === "premiumTab")
            exports.PremiumMarketingComponentProperties_PremiumTab.internalBinaryWrite(message.properties.premiumTab, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.MarketingPageBanner marketing_page_banner = 5; */
        if (message.properties.oneofKind === "marketingPageBanner")
            exports.PremiumMarketingComponentProperties_MarketingPageBanner.internalBinaryWrite(message.properties.marketingPageBanner, writer.tag(5, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.PaymentModalBanner payment_modal_banner = 6; */
        if (message.properties.oneofKind === "paymentModalBanner")
            exports.PremiumMarketingComponentProperties_PaymentModalBanner.internalBinaryWrite(message.properties.paymentModalBanner, writer.tag(6, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.MobileBottomSheet mobile_bottom_sheet = 7; */
        if (message.properties.oneofKind === "mobileBottomSheet")
            exports.PremiumMarketingComponentProperties_MobileBottomSheet.internalBinaryWrite(message.properties.mobileBottomSheet, writer.tag(7, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftIcon gift_icon = 8; */
        if (message.properties.oneofKind === "giftIcon")
            exports.PremiumMarketingComponentProperties_GiftIcon.internalBinaryWrite(message.properties.giftIcon, writer.tag(8, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftIconCoachmark gift_icon_coachmark = 9; */
        if (message.properties.oneofKind === "giftIconCoachmark")
            exports.PremiumMarketingComponentProperties_GiftIconCoachmark.internalBinaryWrite(message.properties.giftIconCoachmark, writer.tag(9, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftPlanSelectionCardBanner gift_plan_selection_card_banner = 10; */
        if (message.properties.oneofKind === "giftPlanSelectionCardBanner")
            exports.PremiumMarketingComponentProperties_GiftPlanSelectionCardBanner.internalBinaryWrite(message.properties.giftPlanSelectionCardBanner, writer.tag(10, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftCustomizationBanner gift_customization_banner = 11; */
        if (message.properties.oneofKind === "giftCustomizationBanner")
            exports.PremiumMarketingComponentProperties_GiftCustomizationBanner.internalBinaryWrite(message.properties.giftCustomizationBanner, writer.tag(11, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.BillingSettingsNitroGiftBanner billing_settings_nitro_gift_banner = 12; */
        if (message.properties.oneofKind === "billingSettingsNitroGiftBanner")
            exports.PremiumMarketingComponentProperties_BillingSettingsNitroGiftBanner.internalBinaryWrite(message.properties.billingSettingsNitroGiftBanner, writer.tag(12, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftReminderNagbar gift_reminder_nagbar = 13; */
        if (message.properties.oneofKind === "giftReminderNagbar")
            exports.PremiumMarketingComponentProperties_GiftReminderNagbar.internalBinaryWrite(message.properties.giftReminderNagbar, writer.tag(13, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftReminderCoachmark gift_reminder_coachmark = 14; */
        if (message.properties.oneofKind === "giftReminderCoachmark")
            exports.PremiumMarketingComponentProperties_GiftReminderCoachmark.internalBinaryWrite(message.properties.giftReminderCoachmark, writer.tag(14, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.PremiumTabTooltip premium_tab_tooltip = 15; */
        if (message.properties.oneofKind === "premiumTabTooltip")
            exports.PremiumMarketingComponentProperties_PremiumTabTooltip.internalBinaryWrite(message.properties.premiumTabTooltip, writer.tag(15, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties
 */
exports.PremiumMarketingComponentProperties = new PremiumMarketingComponentProperties$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties_FeatureCard$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.FeatureCard", [
            { no: 1, name: "header", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "pill", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "body", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "image_link", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "image_link_light_theme", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.header = "";
        message.pill = "";
        message.body = "";
        message.imageLink = "";
        message.imageLinkLightTheme = "";
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string header */ 1:
                    message.header = reader.string();
                    break;
                case /* string pill */ 2:
                    message.pill = reader.string();
                    break;
                case /* string body */ 3:
                    message.body = reader.string();
                    break;
                case /* string image_link */ 4:
                    message.imageLink = reader.string();
                    break;
                case /* string image_link_light_theme */ 5:
                    message.imageLinkLightTheme = reader.string();
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
        /* string header = 1; */
        if (message.header !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.header);
        /* string pill = 2; */
        if (message.pill !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.pill);
        /* string body = 3; */
        if (message.body !== "")
            writer.tag(3, runtime_1.WireType.LengthDelimited).string(message.body);
        /* string image_link = 4; */
        if (message.imageLink !== "")
            writer.tag(4, runtime_1.WireType.LengthDelimited).string(message.imageLink);
        /* string image_link_light_theme = 5; */
        if (message.imageLinkLightTheme !== "")
            writer.tag(5, runtime_1.WireType.LengthDelimited).string(message.imageLinkLightTheme);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.FeatureCard
 */
exports.PremiumMarketingComponentProperties_FeatureCard = new PremiumMarketingComponentProperties_FeatureCard$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties_SubscriptionButton$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.SubscriptionButton", [
            { no: 1, name: "copy", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "button_action", kind: "enum", T: () => ["discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ButtonAction", PremiumMarketingComponentProperties_ButtonAction, "BUTTON_ACTION_"] }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.copy = "";
        message.buttonAction = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string copy */ 1:
                    message.copy = reader.string();
                    break;
                case /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ButtonAction button_action */ 2:
                    message.buttonAction = reader.int32();
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
        /* string copy = 1; */
        if (message.copy !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.copy);
        /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ButtonAction button_action = 2; */
        if (message.buttonAction !== 0)
            writer.tag(2, runtime_1.WireType.Varint).int32(message.buttonAction);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.SubscriptionButton
 */
exports.PremiumMarketingComponentProperties_SubscriptionButton = new PremiumMarketingComponentProperties_SubscriptionButton$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties_Subtitle$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.Subtitle", [
            { no: 1, name: "link", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "locale", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "is_default", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.link = "";
        message.locale = "";
        message.isDefault = false;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string link */ 1:
                    message.link = reader.string();
                    break;
                case /* string locale */ 2:
                    message.locale = reader.string();
                    break;
                case /* bool is_default */ 3:
                    message.isDefault = reader.bool();
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
        /* string link = 1; */
        if (message.link !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.link);
        /* string locale = 2; */
        if (message.locale !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.locale);
        /* bool is_default = 3; */
        if (message.isDefault !== false)
            writer.tag(3, runtime_1.WireType.Varint).bool(message.isDefault);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.Subtitle
 */
exports.PremiumMarketingComponentProperties_Subtitle = new PremiumMarketingComponentProperties_Subtitle$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties_Variant1Storage$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.Variant1Storage", [
            { no: 1, name: "hero_art_localized_video_links_dark_theme", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "scalar", T: 9 /*ScalarType.STRING*/ } },
            { no: 2, name: "hero_art_localized_video_links_light_theme", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "scalar", T: 9 /*ScalarType.STRING*/ } },
            { no: 3, name: "hero_art_video_subtitle_links", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "scalar", T: 9 /*ScalarType.STRING*/ } }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.heroArtLocalizedVideoLinksDarkTheme = {};
        message.heroArtLocalizedVideoLinksLightTheme = {};
        message.heroArtVideoSubtitleLinks = {};
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<string, string> hero_art_localized_video_links_dark_theme */ 1:
                    this.binaryReadMap1(message.heroArtLocalizedVideoLinksDarkTheme, reader, options);
                    break;
                case /* map<string, string> hero_art_localized_video_links_light_theme */ 2:
                    this.binaryReadMap2(message.heroArtLocalizedVideoLinksLightTheme, reader, options);
                    break;
                case /* map<string, string> hero_art_video_subtitle_links */ 3:
                    this.binaryReadMap3(message.heroArtVideoSubtitleLinks, reader, options);
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
                default: throw new globalThis.Error("unknown map entry field for discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.Variant1Storage.hero_art_localized_video_links_dark_theme");
            }
        }
        map[key ?? ""] = val ?? "";
    }
    binaryReadMap2(map, reader, options) {
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
                default: throw new globalThis.Error("unknown map entry field for discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.Variant1Storage.hero_art_localized_video_links_light_theme");
            }
        }
        map[key ?? ""] = val ?? "";
    }
    binaryReadMap3(map, reader, options) {
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
                default: throw new globalThis.Error("unknown map entry field for discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.Variant1Storage.hero_art_video_subtitle_links");
            }
        }
        map[key ?? ""] = val ?? "";
    }
    internalBinaryWrite(message, writer, options) {
        /* map<string, string> hero_art_localized_video_links_dark_theme = 1; */
        for (let k of globalThis.Object.keys(message.heroArtLocalizedVideoLinksDarkTheme))
            writer.tag(1, runtime_1.WireType.LengthDelimited).fork().tag(1, runtime_1.WireType.LengthDelimited).string(k).tag(2, runtime_1.WireType.LengthDelimited).string(message.heroArtLocalizedVideoLinksDarkTheme[k]).join();
        /* map<string, string> hero_art_localized_video_links_light_theme = 2; */
        for (let k of globalThis.Object.keys(message.heroArtLocalizedVideoLinksLightTheme))
            writer.tag(2, runtime_1.WireType.LengthDelimited).fork().tag(1, runtime_1.WireType.LengthDelimited).string(k).tag(2, runtime_1.WireType.LengthDelimited).string(message.heroArtLocalizedVideoLinksLightTheme[k]).join();
        /* map<string, string> hero_art_video_subtitle_links = 3; */
        for (let k of globalThis.Object.keys(message.heroArtVideoSubtitleLinks))
            writer.tag(3, runtime_1.WireType.LengthDelimited).fork().tag(1, runtime_1.WireType.LengthDelimited).string(k).tag(2, runtime_1.WireType.LengthDelimited).string(message.heroArtVideoSubtitleLinks[k]).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.Variant1Storage
 */
exports.PremiumMarketingComponentProperties_Variant1Storage = new PremiumMarketingComponentProperties_Variant1Storage$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties_AnnouncementModalVariant1Properties$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.AnnouncementModalVariant1Properties", [
            { no: 1, name: "header", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "subheader", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "video_link", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "help_article_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "feature_cards", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => exports.PremiumMarketingComponentProperties_FeatureCard },
            { no: 6, name: "button", kind: "message", T: () => exports.PremiumMarketingComponentProperties_SubscriptionButton },
            { no: 7, name: "dismiss_key", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 8, name: "hero_art_video_link_light_theme", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 9, name: "hero_art_image_link_dark_theme", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 10, name: "hero_art_image_link_light_theme", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 11, name: "modal_top_pill", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 12, name: "body", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 13, name: "hero_art_video_subtitles", kind: "message", repeat: 2 /*RepeatType.UNPACKED*/, T: () => exports.PremiumMarketingComponentProperties_Subtitle },
            { no: 14, name: "storage", kind: "message", T: () => exports.PremiumMarketingComponentProperties_Variant1Storage }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.header = "";
        message.subheader = "";
        message.videoLink = "";
        message.helpArticleId = "";
        message.featureCards = [];
        message.dismissKey = "";
        message.heroArtVideoLinkLightTheme = "";
        message.heroArtImageLinkDarkTheme = "";
        message.heroArtImageLinkLightTheme = "";
        message.modalTopPill = "";
        message.body = "";
        message.heroArtVideoSubtitles = [];
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string header */ 1:
                    message.header = reader.string();
                    break;
                case /* string subheader */ 2:
                    message.subheader = reader.string();
                    break;
                case /* string video_link */ 3:
                    message.videoLink = reader.string();
                    break;
                case /* string help_article_id */ 4:
                    message.helpArticleId = reader.string();
                    break;
                case /* repeated discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.FeatureCard feature_cards */ 5:
                    message.featureCards.push(exports.PremiumMarketingComponentProperties_FeatureCard.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.SubscriptionButton button */ 6:
                    message.button = exports.PremiumMarketingComponentProperties_SubscriptionButton.internalBinaryRead(reader, reader.uint32(), options, message.button);
                    break;
                case /* string dismiss_key */ 7:
                    message.dismissKey = reader.string();
                    break;
                case /* string hero_art_video_link_light_theme */ 8:
                    message.heroArtVideoLinkLightTheme = reader.string();
                    break;
                case /* string hero_art_image_link_dark_theme */ 9:
                    message.heroArtImageLinkDarkTheme = reader.string();
                    break;
                case /* string hero_art_image_link_light_theme */ 10:
                    message.heroArtImageLinkLightTheme = reader.string();
                    break;
                case /* string modal_top_pill */ 11:
                    message.modalTopPill = reader.string();
                    break;
                case /* string body */ 12:
                    message.body = reader.string();
                    break;
                case /* repeated discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.Subtitle hero_art_video_subtitles */ 13:
                    message.heroArtVideoSubtitles.push(exports.PremiumMarketingComponentProperties_Subtitle.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.Variant1Storage storage */ 14:
                    message.storage = exports.PremiumMarketingComponentProperties_Variant1Storage.internalBinaryRead(reader, reader.uint32(), options, message.storage);
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
        /* string header = 1; */
        if (message.header !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.header);
        /* string subheader = 2; */
        if (message.subheader !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.subheader);
        /* string video_link = 3; */
        if (message.videoLink !== "")
            writer.tag(3, runtime_1.WireType.LengthDelimited).string(message.videoLink);
        /* string help_article_id = 4; */
        if (message.helpArticleId !== "")
            writer.tag(4, runtime_1.WireType.LengthDelimited).string(message.helpArticleId);
        /* repeated discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.FeatureCard feature_cards = 5; */
        for (let i = 0; i < message.featureCards.length; i++)
            exports.PremiumMarketingComponentProperties_FeatureCard.internalBinaryWrite(message.featureCards[i], writer.tag(5, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.SubscriptionButton button = 6; */
        if (message.button)
            exports.PremiumMarketingComponentProperties_SubscriptionButton.internalBinaryWrite(message.button, writer.tag(6, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* string dismiss_key = 7; */
        if (message.dismissKey !== "")
            writer.tag(7, runtime_1.WireType.LengthDelimited).string(message.dismissKey);
        /* string hero_art_video_link_light_theme = 8; */
        if (message.heroArtVideoLinkLightTheme !== "")
            writer.tag(8, runtime_1.WireType.LengthDelimited).string(message.heroArtVideoLinkLightTheme);
        /* string hero_art_image_link_dark_theme = 9; */
        if (message.heroArtImageLinkDarkTheme !== "")
            writer.tag(9, runtime_1.WireType.LengthDelimited).string(message.heroArtImageLinkDarkTheme);
        /* string hero_art_image_link_light_theme = 10; */
        if (message.heroArtImageLinkLightTheme !== "")
            writer.tag(10, runtime_1.WireType.LengthDelimited).string(message.heroArtImageLinkLightTheme);
        /* string modal_top_pill = 11; */
        if (message.modalTopPill !== "")
            writer.tag(11, runtime_1.WireType.LengthDelimited).string(message.modalTopPill);
        /* string body = 12; */
        if (message.body !== "")
            writer.tag(12, runtime_1.WireType.LengthDelimited).string(message.body);
        /* repeated discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.Subtitle hero_art_video_subtitles = 13; */
        for (let i = 0; i < message.heroArtVideoSubtitles.length; i++)
            exports.PremiumMarketingComponentProperties_Subtitle.internalBinaryWrite(message.heroArtVideoSubtitles[i], writer.tag(13, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.Variant1Storage storage = 14; */
        if (message.storage)
            exports.PremiumMarketingComponentProperties_Variant1Storage.internalBinaryWrite(message.storage, writer.tag(14, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.AnnouncementModalVariant1Properties
 */
exports.PremiumMarketingComponentProperties_AnnouncementModalVariant1Properties = new PremiumMarketingComponentProperties_AnnouncementModalVariant1Properties$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties_PremiumTab$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.PremiumTab", [
            { no: 1, name: "badge_label", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "acknowledged_badge_label", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.badgeLabel = "";
        message.acknowledgedBadgeLabel = "";
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string badge_label */ 1:
                    message.badgeLabel = reader.string();
                    break;
                case /* string acknowledged_badge_label */ 2:
                    message.acknowledgedBadgeLabel = reader.string();
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
        /* string badge_label = 1; */
        if (message.badgeLabel !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.badgeLabel);
        /* string acknowledged_badge_label = 2; */
        if (message.acknowledgedBadgeLabel !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.acknowledgedBadgeLabel);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.PremiumTab
 */
exports.PremiumMarketingComponentProperties_PremiumTab = new PremiumMarketingComponentProperties_PremiumTab$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties_MarketingPageBannerButton$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.MarketingPageBannerButton", [
            { no: 1, name: "copy", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "button_action", kind: "enum", T: () => ["discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ButtonAction", PremiumMarketingComponentProperties_ButtonAction, "BUTTON_ACTION_"] }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.copy = "";
        message.buttonAction = 0;
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string copy */ 1:
                    message.copy = reader.string();
                    break;
                case /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ButtonAction button_action */ 2:
                    message.buttonAction = reader.int32();
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
        /* string copy = 1; */
        if (message.copy !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.copy);
        /* discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ButtonAction button_action = 2; */
        if (message.buttonAction !== 0)
            writer.tag(2, runtime_1.WireType.Varint).int32(message.buttonAction);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.MarketingPageBannerButton
 */
exports.PremiumMarketingComponentProperties_MarketingPageBannerButton = new PremiumMarketingComponentProperties_MarketingPageBannerButton$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties_MarketingPageBanner$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.MarketingPageBanner", [
            { no: 1, name: "asset_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "header", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "body", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "help_article_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "button", kind: "message", T: () => exports.PremiumMarketingComponentProperties_MarketingPageBannerButton }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.assetUrl = "";
        message.header = "";
        message.body = "";
        message.helpArticleId = "";
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string asset_url */ 1:
                    message.assetUrl = reader.string();
                    break;
                case /* string header */ 2:
                    message.header = reader.string();
                    break;
                case /* string body */ 3:
                    message.body = reader.string();
                    break;
                case /* string help_article_id */ 4:
                    message.helpArticleId = reader.string();
                    break;
                case /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.MarketingPageBannerButton button */ 5:
                    message.button = exports.PremiumMarketingComponentProperties_MarketingPageBannerButton.internalBinaryRead(reader, reader.uint32(), options, message.button);
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
        /* string asset_url = 1; */
        if (message.assetUrl !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.assetUrl);
        /* string header = 2; */
        if (message.header !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.header);
        /* string body = 3; */
        if (message.body !== "")
            writer.tag(3, runtime_1.WireType.LengthDelimited).string(message.body);
        /* string help_article_id = 4; */
        if (message.helpArticleId !== "")
            writer.tag(4, runtime_1.WireType.LengthDelimited).string(message.helpArticleId);
        /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.MarketingPageBannerButton button = 5; */
        if (message.button)
            exports.PremiumMarketingComponentProperties_MarketingPageBannerButton.internalBinaryWrite(message.button, writer.tag(5, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.MarketingPageBanner
 */
exports.PremiumMarketingComponentProperties_MarketingPageBanner = new PremiumMarketingComponentProperties_MarketingPageBanner$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties_PaymentModalBanner$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.PaymentModalBanner", [
            { no: 1, name: "asset_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "header", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "body", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.assetUrl = "";
        message.header = "";
        message.body = "";
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string asset_url */ 1:
                    message.assetUrl = reader.string();
                    break;
                case /* string header */ 2:
                    message.header = reader.string();
                    break;
                case /* string body */ 3:
                    message.body = reader.string();
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
        /* string asset_url = 1; */
        if (message.assetUrl !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.assetUrl);
        /* string header = 2; */
        if (message.header !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.header);
        /* string body = 3; */
        if (message.body !== "")
            writer.tag(3, runtime_1.WireType.LengthDelimited).string(message.body);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.PaymentModalBanner
 */
exports.PremiumMarketingComponentProperties_PaymentModalBanner = new PremiumMarketingComponentProperties_PaymentModalBanner$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties_CTAButton$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.CTAButton", [
            { no: 1, name: "copy", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.copy = "";
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string copy */ 1:
                    message.copy = reader.string();
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
        /* string copy = 1; */
        if (message.copy !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.copy);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.CTAButton
 */
exports.PremiumMarketingComponentProperties_CTAButton = new PremiumMarketingComponentProperties_CTAButton$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties_MobileBottomSheet$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.MobileBottomSheet", [
            { no: 1, name: "asset_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "header", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "body", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "help_article_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "button", kind: "message", T: () => exports.PremiumMarketingComponentProperties_CTAButton }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.assetUrl = "";
        message.header = "";
        message.body = "";
        message.helpArticleId = "";
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string asset_url */ 1:
                    message.assetUrl = reader.string();
                    break;
                case /* string header */ 2:
                    message.header = reader.string();
                    break;
                case /* string body */ 3:
                    message.body = reader.string();
                    break;
                case /* string help_article_id */ 4:
                    message.helpArticleId = reader.string();
                    break;
                case /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.CTAButton button */ 5:
                    message.button = exports.PremiumMarketingComponentProperties_CTAButton.internalBinaryRead(reader, reader.uint32(), options, message.button);
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
        /* string asset_url = 1; */
        if (message.assetUrl !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.assetUrl);
        /* string header = 2; */
        if (message.header !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.header);
        /* string body = 3; */
        if (message.body !== "")
            writer.tag(3, runtime_1.WireType.LengthDelimited).string(message.body);
        /* string help_article_id = 4; */
        if (message.helpArticleId !== "")
            writer.tag(4, runtime_1.WireType.LengthDelimited).string(message.helpArticleId);
        /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.CTAButton button = 5; */
        if (message.button)
            exports.PremiumMarketingComponentProperties_CTAButton.internalBinaryWrite(message.button, writer.tag(5, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.MobileBottomSheet
 */
exports.PremiumMarketingComponentProperties_MobileBottomSheet = new PremiumMarketingComponentProperties_MobileBottomSheet$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties_Gradient$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.Gradient", [
            { no: 1, name: "colors", kind: "scalar", repeat: 2 /*RepeatType.UNPACKED*/, T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "angle", kind: "scalar", T: 2 /*ScalarType.FLOAT*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.colors = [];
        message.angle = 0;
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
                case /* float angle */ 2:
                    message.angle = reader.float();
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
        /* float angle = 2; */
        if (message.angle !== 0)
            writer.tag(2, runtime_1.WireType.Bit32).float(message.angle);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.Gradient
 */
exports.PremiumMarketingComponentProperties_Gradient = new PremiumMarketingComponentProperties_Gradient$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties_GiftIcon$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftIcon", [
            { no: 1, name: "box_animation_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "trinket_animation_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "trinket_glow_animation_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "gradient", kind: "message", T: () => exports.PremiumMarketingComponentProperties_Gradient }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.boxAnimationUrl = "";
        message.trinketAnimationUrl = "";
        message.trinketGlowAnimationUrl = "";
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string box_animation_url */ 1:
                    message.boxAnimationUrl = reader.string();
                    break;
                case /* string trinket_animation_url */ 2:
                    message.trinketAnimationUrl = reader.string();
                    break;
                case /* string trinket_glow_animation_url */ 3:
                    message.trinketGlowAnimationUrl = reader.string();
                    break;
                case /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.Gradient gradient */ 4:
                    message.gradient = exports.PremiumMarketingComponentProperties_Gradient.internalBinaryRead(reader, reader.uint32(), options, message.gradient);
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
        /* string box_animation_url = 1; */
        if (message.boxAnimationUrl !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.boxAnimationUrl);
        /* string trinket_animation_url = 2; */
        if (message.trinketAnimationUrl !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.trinketAnimationUrl);
        /* string trinket_glow_animation_url = 3; */
        if (message.trinketGlowAnimationUrl !== "")
            writer.tag(3, runtime_1.WireType.LengthDelimited).string(message.trinketGlowAnimationUrl);
        /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.Gradient gradient = 4; */
        if (message.gradient)
            exports.PremiumMarketingComponentProperties_Gradient.internalBinaryWrite(message.gradient, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftIcon
 */
exports.PremiumMarketingComponentProperties_GiftIcon = new PremiumMarketingComponentProperties_GiftIcon$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties_ThemeAwareAsset$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset", [
            { no: 1, name: "light_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "dark_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "light_static_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "dark_static_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.lightUrl = "";
        message.darkUrl = "";
        message.lightStaticUrl = "";
        message.darkStaticUrl = "";
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string light_url */ 1:
                    message.lightUrl = reader.string();
                    break;
                case /* string dark_url */ 2:
                    message.darkUrl = reader.string();
                    break;
                case /* string light_static_url */ 3:
                    message.lightStaticUrl = reader.string();
                    break;
                case /* string dark_static_url */ 4:
                    message.darkStaticUrl = reader.string();
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
        /* string light_url = 1; */
        if (message.lightUrl !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.lightUrl);
        /* string dark_url = 2; */
        if (message.darkUrl !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.darkUrl);
        /* string light_static_url = 3; */
        if (message.lightStaticUrl !== "")
            writer.tag(3, runtime_1.WireType.LengthDelimited).string(message.lightStaticUrl);
        /* string dark_static_url = 4; */
        if (message.darkStaticUrl !== "")
            writer.tag(4, runtime_1.WireType.LengthDelimited).string(message.darkStaticUrl);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset
 */
exports.PremiumMarketingComponentProperties_ThemeAwareAsset = new PremiumMarketingComponentProperties_ThemeAwareAsset$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties_GiftIconCoachmark$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftIconCoachmark", [
            { no: 1, name: "header", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "body", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "asset_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "asset", kind: "message", T: () => exports.PremiumMarketingComponentProperties_ThemeAwareAsset }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.header = "";
        message.body = "";
        message.assetUrl = "";
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string header */ 1:
                    message.header = reader.string();
                    break;
                case /* string body */ 2:
                    message.body = reader.string();
                    break;
                case /* string asset_url */ 3:
                    message.assetUrl = reader.string();
                    break;
                case /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset asset */ 4:
                    message.asset = exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryRead(reader, reader.uint32(), options, message.asset);
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
        /* string header = 1; */
        if (message.header !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.header);
        /* string body = 2; */
        if (message.body !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.body);
        /* string asset_url = 3; */
        if (message.assetUrl !== "")
            writer.tag(3, runtime_1.WireType.LengthDelimited).string(message.assetUrl);
        /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset asset = 4; */
        if (message.asset)
            exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryWrite(message.asset, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftIconCoachmark
 */
exports.PremiumMarketingComponentProperties_GiftIconCoachmark = new PremiumMarketingComponentProperties_GiftIconCoachmark$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties_GiftPlanSelectionCardBanner$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftPlanSelectionCardBanner", [
            { no: 1, name: "header", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "desktop_body", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "mobile_body", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "avatar_asset", kind: "message", T: () => exports.PremiumMarketingComponentProperties_ThemeAwareAsset },
            { no: 5, name: "banner_asset_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "background_asset_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "card_asset_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 8, name: "gradient", kind: "message", T: () => exports.PremiumMarketingComponentProperties_Gradient },
            { no: 9, name: "banner_asset", kind: "message", T: () => exports.PremiumMarketingComponentProperties_ThemeAwareAsset },
            { no: 10, name: "background_asset", kind: "message", T: () => exports.PremiumMarketingComponentProperties_ThemeAwareAsset },
            { no: 11, name: "card_asset", kind: "message", T: () => exports.PremiumMarketingComponentProperties_ThemeAwareAsset },
            { no: 12, name: "mobile_banner_asset", kind: "message", T: () => exports.PremiumMarketingComponentProperties_ThemeAwareAsset }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.header = "";
        message.desktopBody = "";
        message.mobileBody = "";
        message.bannerAssetUrl = "";
        message.backgroundAssetUrl = "";
        message.cardAssetUrl = "";
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string header */ 1:
                    message.header = reader.string();
                    break;
                case /* string desktop_body */ 2:
                    message.desktopBody = reader.string();
                    break;
                case /* string mobile_body */ 3:
                    message.mobileBody = reader.string();
                    break;
                case /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset avatar_asset */ 4:
                    message.avatarAsset = exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryRead(reader, reader.uint32(), options, message.avatarAsset);
                    break;
                case /* string banner_asset_url */ 5:
                    message.bannerAssetUrl = reader.string();
                    break;
                case /* string background_asset_url */ 6:
                    message.backgroundAssetUrl = reader.string();
                    break;
                case /* string card_asset_url */ 7:
                    message.cardAssetUrl = reader.string();
                    break;
                case /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.Gradient gradient */ 8:
                    message.gradient = exports.PremiumMarketingComponentProperties_Gradient.internalBinaryRead(reader, reader.uint32(), options, message.gradient);
                    break;
                case /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset banner_asset */ 9:
                    message.bannerAsset = exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryRead(reader, reader.uint32(), options, message.bannerAsset);
                    break;
                case /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset background_asset */ 10:
                    message.backgroundAsset = exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryRead(reader, reader.uint32(), options, message.backgroundAsset);
                    break;
                case /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset card_asset */ 11:
                    message.cardAsset = exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryRead(reader, reader.uint32(), options, message.cardAsset);
                    break;
                case /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset mobile_banner_asset */ 12:
                    message.mobileBannerAsset = exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryRead(reader, reader.uint32(), options, message.mobileBannerAsset);
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
        /* string header = 1; */
        if (message.header !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.header);
        /* string desktop_body = 2; */
        if (message.desktopBody !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.desktopBody);
        /* string mobile_body = 3; */
        if (message.mobileBody !== "")
            writer.tag(3, runtime_1.WireType.LengthDelimited).string(message.mobileBody);
        /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset avatar_asset = 4; */
        if (message.avatarAsset)
            exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryWrite(message.avatarAsset, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* string banner_asset_url = 5; */
        if (message.bannerAssetUrl !== "")
            writer.tag(5, runtime_1.WireType.LengthDelimited).string(message.bannerAssetUrl);
        /* string background_asset_url = 6; */
        if (message.backgroundAssetUrl !== "")
            writer.tag(6, runtime_1.WireType.LengthDelimited).string(message.backgroundAssetUrl);
        /* string card_asset_url = 7; */
        if (message.cardAssetUrl !== "")
            writer.tag(7, runtime_1.WireType.LengthDelimited).string(message.cardAssetUrl);
        /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.Gradient gradient = 8; */
        if (message.gradient)
            exports.PremiumMarketingComponentProperties_Gradient.internalBinaryWrite(message.gradient, writer.tag(8, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset banner_asset = 9; */
        if (message.bannerAsset)
            exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryWrite(message.bannerAsset, writer.tag(9, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset background_asset = 10; */
        if (message.backgroundAsset)
            exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryWrite(message.backgroundAsset, writer.tag(10, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset card_asset = 11; */
        if (message.cardAsset)
            exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryWrite(message.cardAsset, writer.tag(11, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset mobile_banner_asset = 12; */
        if (message.mobileBannerAsset)
            exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryWrite(message.mobileBannerAsset, writer.tag(12, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftPlanSelectionCardBanner
 */
exports.PremiumMarketingComponentProperties_GiftPlanSelectionCardBanner = new PremiumMarketingComponentProperties_GiftPlanSelectionCardBanner$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties_GiftCustomizationBanner$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftCustomizationBanner", [
            { no: 1, name: "asset_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "desktop_body", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "mobile_body", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "gradient", kind: "message", T: () => exports.PremiumMarketingComponentProperties_Gradient },
            { no: 5, name: "background_asset_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "asset", kind: "message", T: () => exports.PremiumMarketingComponentProperties_ThemeAwareAsset },
            { no: 7, name: "background_asset", kind: "message", T: () => exports.PremiumMarketingComponentProperties_ThemeAwareAsset },
            { no: 8, name: "mobile_background_asset", kind: "message", T: () => exports.PremiumMarketingComponentProperties_ThemeAwareAsset }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.assetUrl = "";
        message.desktopBody = "";
        message.mobileBody = "";
        message.backgroundAssetUrl = "";
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string asset_url */ 1:
                    message.assetUrl = reader.string();
                    break;
                case /* string desktop_body */ 2:
                    message.desktopBody = reader.string();
                    break;
                case /* string mobile_body */ 3:
                    message.mobileBody = reader.string();
                    break;
                case /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.Gradient gradient */ 4:
                    message.gradient = exports.PremiumMarketingComponentProperties_Gradient.internalBinaryRead(reader, reader.uint32(), options, message.gradient);
                    break;
                case /* string background_asset_url */ 5:
                    message.backgroundAssetUrl = reader.string();
                    break;
                case /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset asset */ 6:
                    message.asset = exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryRead(reader, reader.uint32(), options, message.asset);
                    break;
                case /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset background_asset */ 7:
                    message.backgroundAsset = exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryRead(reader, reader.uint32(), options, message.backgroundAsset);
                    break;
                case /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset mobile_background_asset */ 8:
                    message.mobileBackgroundAsset = exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryRead(reader, reader.uint32(), options, message.mobileBackgroundAsset);
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
        /* string asset_url = 1; */
        if (message.assetUrl !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.assetUrl);
        /* string desktop_body = 2; */
        if (message.desktopBody !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.desktopBody);
        /* string mobile_body = 3; */
        if (message.mobileBody !== "")
            writer.tag(3, runtime_1.WireType.LengthDelimited).string(message.mobileBody);
        /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.Gradient gradient = 4; */
        if (message.gradient)
            exports.PremiumMarketingComponentProperties_Gradient.internalBinaryWrite(message.gradient, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* string background_asset_url = 5; */
        if (message.backgroundAssetUrl !== "")
            writer.tag(5, runtime_1.WireType.LengthDelimited).string(message.backgroundAssetUrl);
        /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset asset = 6; */
        if (message.asset)
            exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryWrite(message.asset, writer.tag(6, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset background_asset = 7; */
        if (message.backgroundAsset)
            exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryWrite(message.backgroundAsset, writer.tag(7, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset mobile_background_asset = 8; */
        if (message.mobileBackgroundAsset)
            exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryWrite(message.mobileBackgroundAsset, writer.tag(8, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftCustomizationBanner
 */
exports.PremiumMarketingComponentProperties_GiftCustomizationBanner = new PremiumMarketingComponentProperties_GiftCustomizationBanner$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties_BillingSettingsNitroGiftBanner$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.BillingSettingsNitroGiftBanner", [
            { no: 1, name: "asset_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "header", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "body", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "background_asset_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "gradient", kind: "message", T: () => exports.PremiumMarketingComponentProperties_Gradient },
            { no: 6, name: "text_color", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "additional_terms", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 8, name: "asset", kind: "message", T: () => exports.PremiumMarketingComponentProperties_ThemeAwareAsset },
            { no: 9, name: "background_asset", kind: "message", T: () => exports.PremiumMarketingComponentProperties_ThemeAwareAsset }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.assetUrl = "";
        message.header = "";
        message.body = "";
        message.backgroundAssetUrl = "";
        message.textColor = "";
        message.additionalTerms = "";
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string asset_url */ 1:
                    message.assetUrl = reader.string();
                    break;
                case /* string header */ 2:
                    message.header = reader.string();
                    break;
                case /* string body */ 3:
                    message.body = reader.string();
                    break;
                case /* string background_asset_url */ 4:
                    message.backgroundAssetUrl = reader.string();
                    break;
                case /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.Gradient gradient */ 5:
                    message.gradient = exports.PremiumMarketingComponentProperties_Gradient.internalBinaryRead(reader, reader.uint32(), options, message.gradient);
                    break;
                case /* string text_color */ 6:
                    message.textColor = reader.string();
                    break;
                case /* string additional_terms */ 7:
                    message.additionalTerms = reader.string();
                    break;
                case /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset asset */ 8:
                    message.asset = exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryRead(reader, reader.uint32(), options, message.asset);
                    break;
                case /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset background_asset */ 9:
                    message.backgroundAsset = exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryRead(reader, reader.uint32(), options, message.backgroundAsset);
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
        /* string asset_url = 1; */
        if (message.assetUrl !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.assetUrl);
        /* string header = 2; */
        if (message.header !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.header);
        /* string body = 3; */
        if (message.body !== "")
            writer.tag(3, runtime_1.WireType.LengthDelimited).string(message.body);
        /* string background_asset_url = 4; */
        if (message.backgroundAssetUrl !== "")
            writer.tag(4, runtime_1.WireType.LengthDelimited).string(message.backgroundAssetUrl);
        /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.Gradient gradient = 5; */
        if (message.gradient)
            exports.PremiumMarketingComponentProperties_Gradient.internalBinaryWrite(message.gradient, writer.tag(5, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* string text_color = 6; */
        if (message.textColor !== "")
            writer.tag(6, runtime_1.WireType.LengthDelimited).string(message.textColor);
        /* string additional_terms = 7; */
        if (message.additionalTerms !== "")
            writer.tag(7, runtime_1.WireType.LengthDelimited).string(message.additionalTerms);
        /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset asset = 8; */
        if (message.asset)
            exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryWrite(message.asset, writer.tag(8, runtime_1.WireType.LengthDelimited).fork(), options).join();
        /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset background_asset = 9; */
        if (message.backgroundAsset)
            exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryWrite(message.backgroundAsset, writer.tag(9, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.BillingSettingsNitroGiftBanner
 */
exports.PremiumMarketingComponentProperties_BillingSettingsNitroGiftBanner = new PremiumMarketingComponentProperties_BillingSettingsNitroGiftBanner$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties_GiftReminderNagbar$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftReminderNagbar", [
            { no: 1, name: "body", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.body = "";
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string body */ 1:
                    message.body = reader.string();
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
        /* string body = 1; */
        if (message.body !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.body);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftReminderNagbar
 */
exports.PremiumMarketingComponentProperties_GiftReminderNagbar = new PremiumMarketingComponentProperties_GiftReminderNagbar$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties_GiftReminderCoachmark$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftReminderCoachmark", [
            { no: 1, name: "header", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "body", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "asset_url", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "asset", kind: "message", T: () => exports.PremiumMarketingComponentProperties_ThemeAwareAsset }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.header = "";
        message.body = "";
        message.assetUrl = "";
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string header */ 1:
                    message.header = reader.string();
                    break;
                case /* string body */ 2:
                    message.body = reader.string();
                    break;
                case /* string asset_url */ 3:
                    message.assetUrl = reader.string();
                    break;
                case /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset asset */ 4:
                    message.asset = exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryRead(reader, reader.uint32(), options, message.asset);
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
        /* string header = 1; */
        if (message.header !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.header);
        /* string body = 2; */
        if (message.body !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.body);
        /* string asset_url = 3; */
        if (message.assetUrl !== "")
            writer.tag(3, runtime_1.WireType.LengthDelimited).string(message.assetUrl);
        /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset asset = 4; */
        if (message.asset)
            exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryWrite(message.asset, writer.tag(4, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.GiftReminderCoachmark
 */
exports.PremiumMarketingComponentProperties_GiftReminderCoachmark = new PremiumMarketingComponentProperties_GiftReminderCoachmark$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PremiumMarketingComponentProperties_PremiumTabTooltip$Type extends runtime_4.MessageType {
    constructor() {
        super("discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.PremiumTabTooltip", [
            { no: 1, name: "header", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "body", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "asset", kind: "message", T: () => exports.PremiumMarketingComponentProperties_ThemeAwareAsset }
        ]);
    }
    create(value) {
        const message = globalThis.Object.create((this.messagePrototype));
        message.header = "";
        message.body = "";
        if (value !== undefined)
            (0, runtime_3.reflectionMergePartial)(this, message, value);
        return message;
    }
    internalBinaryRead(reader, length, options, target) {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string header */ 1:
                    message.header = reader.string();
                    break;
                case /* string body */ 2:
                    message.body = reader.string();
                    break;
                case /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset asset */ 3:
                    message.asset = exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryRead(reader, reader.uint32(), options, message.asset);
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
        /* string header = 1; */
        if (message.header !== "")
            writer.tag(1, runtime_1.WireType.LengthDelimited).string(message.header);
        /* string body = 2; */
        if (message.body !== "")
            writer.tag(2, runtime_1.WireType.LengthDelimited).string(message.body);
        /* optional discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.ThemeAwareAsset asset = 3; */
        if (message.asset)
            exports.PremiumMarketingComponentProperties_ThemeAwareAsset.internalBinaryWrite(message.asset, writer.tag(3, runtime_1.WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? runtime_2.UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message discord_protos.premium_marketing.v1.PremiumMarketingComponentProperties.PremiumTabTooltip
 */
exports.PremiumMarketingComponentProperties_PremiumTabTooltip = new PremiumMarketingComponentProperties_PremiumTabTooltip$Type();
