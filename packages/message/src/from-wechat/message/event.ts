import type {
  WechatMessageBase,
  WechatMessageChatType,
  WechatMessageMsgType,
} from './base';

/**
 * Message type of event message from Wechat Work
 *
 * 来自企业微信的事件信息的信息类型
 */
export type WechatEventMessageMsgType = Extract<WechatMessageMsgType, 'event'>;

/**
 * Chat type of event message from Wechat Work
 *
 * 来自企业微信的事件信息的会话类型
 */
export type WechatEventMessageChatType = Extract<
  WechatMessageChatType,
  'single' | 'group' | 'blackboard'
>;

/**
 * Event type of event message from Wechat Work
 *
 * 来自企业微信的事件信息的事件类型
 */
export type WechatEventMessageEventType =
  // 被添加进会话
  | 'add_to_chat'
  // 被移出会话
  | 'delete_from_chat'
  // 用户进入机器人单聊
  | 'enter_chat';

/**
 * Event message from Wechat Work
 *
 * 来自企业微信的事件信息
 */
export interface WechatEventMessage extends WechatMessageBase {
  /**
   * 消息类型，此时固定是 event
   */
  msgType: WechatEventMessageMsgType;

  /**
   * 会话类型
   */
  chatType: WechatEventMessageChatType;

  event: {
    /**
     * 事件类型
     */
    eventType: WechatEventMessageEventType;
  };

  /**
   * 客户端版本号，当 ChatType 为 blackboard 时不提供该字段
   */
  appVersion?: string;
}
