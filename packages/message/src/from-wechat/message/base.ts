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
export type WechatMessageMsgType =
  // 文本
  | 'text'
  // 图片
  | 'image'
  // 事件
  | 'event'
  // 附件
  | 'attachment'
  // 图文混排
  | 'mixed'
  // 命令
  | 'command';

/**
 * Type of chat from Wechat Work
 *
 * 来自企业微信的会话类型
 */
export type WechatMessageChatType =
  // 单聊
  | 'single'
  // 群聊
  | 'group'
  // 小黑板帖子
  | 'blackboard'
  // 小黑板帖子回复
  | 'blackboard_reply';

/**
 * Info of the user who sent the message
 *
 * 发送消息的用户信息
 */
export interface WechatMessageFrom {
  /**
   * 发送者的 user id
   */
  userId: string;

  /**
   * 发送者姓名
   */
  name: string;

  /**
   * 发送者别名
   */
  alias: string;
}

/**
 * Base interface of message from Wechat Work
 *
 * 来自企业微信的信息的基础 interface
 */
export interface WechatMessageBase {
  /**
   * 机器人主动推送消息的 url
   */
  webhookUrl: string;

  /**
   * 会话 id，可能是群聊，也可能是单聊，也可能是小黑板
   */
  chatId: string;

  /**
   * 会话类型
   */
  chatType: WechatMessageChatType;

  /**
   * 获取群信息的 url ，有效时间5分钟，且仅能调用一次，当 ChatType 是 single 时不提供该字段。
   */
  getChatInfoUrl?: string;

  /**
   * 该消息发送者的信息
   */
  from: WechatMessageFrom;

  /**
   * 消息类型
   */
  msgType: WechatMessageMsgType;

  /**
   * 消息 id ，可用于去重
   */
  msgId: string;
}
