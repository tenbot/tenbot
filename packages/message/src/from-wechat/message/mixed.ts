import type {
  WechatMessageBase,
  WechatMessageChatType,
  WechatMessageMsgType,
} from './base';
import type { WechatImageMessage } from './image';
import type { WechatTextMessage } from './text';

/**
 * Message type of mixed message from Wechat Work
 *
 * 来自企业微信的图文混排信息的信息类型
 */
export type WechatMixedMessageMsgType = Extract<WechatMessageMsgType, 'mixed'>;

/**
 * Chat type of mixed message from Wechat Work
 *
 * 来自企业微信的图文混排信息的会话类型 (图片回调目前仅支持 single 类型)
 */
export type WechatMixedMessageChatType = Extract<
  WechatMessageChatType,
  'single' | 'group'
>;

/**
 * Mixed message from Wechat Work
 *
 * 来自企业微信的图文混排信息
 */
export interface WechatMixedMessage extends WechatMessageBase {
  /**
   * 消息类型，此时固定是 mixed
   */
  msgType: WechatMixedMessageMsgType;

  /**
   * 会话类型
   */
  chatType: WechatMixedMessageChatType;

  /**
   * 图文混排消息，可由多个 MsgItem 组成
   */
  mixedMessage: {
    /**
     * 图文混排消息中的某一张图片或者一段文字消息
     */
    msgItem: (WechatMessageMixedMsgItemText | WechatMessageMixedMsgItemImage)[];
  };
}

/**
 * Text item of mixed message from Wechat Work
 *
 * 来自企业微信的图文混排信息的文本内容
 */
export type WechatMessageMixedMsgItemText = Pick<
  WechatTextMessage,
  'msgType' | 'text'
>;

/**
 * Image item of mixed message from Wechat Work
 *
 * 来自企业微信的图文混排信息的图片内容
 */
export type WechatMessageMixedMsgItemImage = Pick<
  WechatImageMessage,
  'msgType' | 'image'
>;
