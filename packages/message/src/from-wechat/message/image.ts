import type {
  WechatMessageBase,
  WechatMessageChatType,
  WechatMessageMsgType,
} from './base';

/**
 * Message type of image message from Wechat Work
 *
 * 来自企业微信的图片信息的信息类型
 */
export type WechatImageMessageMsgType = Extract<WechatMessageMsgType, 'image'>;

/**
 * Chat type of image message from Wechat Work
 *
 * 来自企业微信的图片信息的会话类型 (图片回调目前仅支持 single 类型)
 */
export type WechatImageMessageChatType = Extract<
  WechatMessageChatType,
  'single'
>;

/**
 * Image message from Wechat Work
 *
 * 来自企业微信的图片信息
 */
export interface WechatImageMessage extends WechatMessageBase {
  /**
   * 消息类型，此时固定是 image
   */
  msgType: WechatImageMessageMsgType;

  /**
   * 会话类型
   */
  chatType: WechatImageMessageChatType;

  image: {
    /**
     * 图片的 url ，注意不可在网页引用该图片
     */
    imageUrl: string;
  };
}
