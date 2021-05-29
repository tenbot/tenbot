import type { WechatMessageBase, WechatMessageMsgType } from './base';

/**
 * Message type of text message from Wechat Work
 *
 * 来自企业微信的文本信息的信息类型
 */
export type WechatTextMessageMsgType = Extract<WechatMessageMsgType, 'text'>;

/**
 * Text message from Wechat Work
 *
 * 来自企业微信的文本信息
 */
export interface WechatTextMessage extends WechatMessageBase {
  /**
   * 消息类型，此时固定是 text
   */
  msgType: WechatTextMessageMsgType;

  text: {
    /**
     * 消息内容
     */
    content: string;
  };
}
