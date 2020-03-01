/**
 * Encrypted message from Wechat Work
 *
 * 来自企业微信的加密信息
 */
export interface EncryptedWechatMessage {
  encrypt: string;
}

/**
 * Type of message from Wechat Work
 *
 * 来自企业微信的消息类型
 */
export type WechatMessageType = 'text' | 'image' | 'event' | 'attachment';

/**
 * Base interface of message from Wechat Work
 *
 * 来自企业微信的信息的基础 interface
 */
export interface WechatMessageBase {
  webhookUrl: string;
  chatId: string;
  chatType: 'single' | 'group';
  getChatInfoUrl?: string;
  from: {
    userId: string;
    name: string;
    alias: string;
  };
  msgType: WechatMessageType;
  msgId: string;
}

/**
 * Text message from Wechat Work
 *
 * 来自企业微信的文本信息
 */
export interface WechatMessageText extends WechatMessageBase {
  msgType: 'text';
  text: {
    content: string;
  };
}

/**
 * Image message from Wechat Work
 *
 * 来自企业微信的图片信息
 */
export interface WechatMessageImage extends WechatMessageBase {
  msgType: 'image';
  Image: {
    imageUrl: string;
  };
}

/**
 * Event message from Wechat Work
 *
 * 来自企业微信的事件信息
 */
export interface WechatMessageEvent extends WechatMessageBase {
  msgType: 'event';
  event: {
    eventType: 'add_to_chat' | 'delete_from_chat' | 'enter_chat';
  };
  appVersion: string;
}

/**
 * Attachment message from Wechat Work
 *
 * 来自企业微信的附件信息
 */
export interface WechatMessageAttachment extends WechatMessageBase {
  msgType: 'attachment';
  attachment: {
    callbackId: string;
    actions: {
      name: string;
      value: string;
    };
  };
}

/**
 * Message from Wechat Work
 *
 * 来自企业微信的信息
 */
export type WechatMessage =
  | WechatMessageText
  | WechatMessageImage
  | WechatMessageEvent
  | WechatMessageAttachment;
