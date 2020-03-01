import { xmlBuild } from '@tenbot/utils';

/**
 * Type of message that can be sent to wechat
 */
export type MessageType =
  | 'text'
  | 'markdown'
  | 'image'
  | 'event'
  | 'attachment'
  | 'news';

export interface MessageOptions {
  chatId?: string;
  visibleToUser?: string[];
}

export interface MessageSendObject {
  chatid?: string;
  msgtype: MessageType;
  visible_to_user?: string;
}

export interface MessageReplyObject {
  MsgType: MessageType;
  VisibleToUser?: string;
}

export abstract class Message {
  /**
   * Message Type
   *
   * 消息类型
   */
  protected readonly msgType: MessageType;

  /**
   * Chat ID
   *
   * 聊天 ID
   */
  protected readonly chatId?: string;

  /**
   * Array of visible users
   *
   * 用户数组，仅对这些用户可见
   */
  protected readonly visibleToUser?: string[];

  constructor(options: MessageOptions = {}) {
    this.chatId = options.chatId;
    this.visibleToUser = options.visibleToUser;
  }

  abstract toSendObject(): MessageSendObject;
  abstract toReplyObject(): MessageReplyObject;

  toSendString(): string {
    return JSON.stringify(this.toSendObject());
  }

  toReplyString(): string {
    return xmlBuild(this.toReplyObject());
  }
}
