import type { WechatMessageBase, WechatMessageMsgType } from './base';

/**
 * Message type of attachment message from Wechat Work
 *
 * 来自企业微信的附件信息的信息类型
 */
export type WechatAttachmentMessageMsgType = Extract<
  WechatMessageMsgType,
  'attachment'
>;

/**
 * Action type of attachment message from Wechat Work
 *
 * 来自企业微信的附件信息的 action 类型 (目前仅支持 button 类型)
 */
export type WechatAttachmentMessageActionType = 'button';

/**
 * Attachment message from Wechat Work
 *
 * 来自企业微信的附件信息
 */
export interface WechatAttachmentMessage extends WechatMessageBase {
  /**
   * 消息类型，此时固定是 attachment
   */
  msgType: WechatAttachmentMessageMsgType;

  /**
   * 用户点击的 attachment ，目前只支持 button
   */
  attachment: {
    /**
     * attachment 中设置的回调 id
     */
    callbackId: string;

    /**
     * 用户点击的 action 信息
     */
    actions: {
      /**
       * 用户点击按钮的名字
       */
      name: string;

      /**
       * 用户点击按钮的值
       */

      value: string;

      /**
       * 用户点击按钮的类型，
       */
      type: WechatAttachmentMessageActionType;
    };
  };
}
