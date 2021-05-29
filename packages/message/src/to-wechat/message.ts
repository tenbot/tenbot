import { xmlBuild } from '@tenbot/utils';

/**
 * Type of message to be sent to Wechat Work
 *
 * 发送给企业微信的信息的类型
 */
export type MessageMsgType =
  // 文本
  | 'text'
  // markdown
  | 'markdown'
  // 图片
  | 'image'
  // 图文
  | 'news'
  // 小程序
  | 'miniprogram'
  // 文件
  | 'file';

/**
 * Chat ID of message to be sent to Wechat Work
 *
 * 发送给企业微信的信息的会话 ID
 */
export type MessageChatId = string | '@all_group' | '@all_subscriber' | '@all';

export interface MessageOptions {
  chatId?: MessageChatId | MessageChatId[];
  visibleToUser?: string | string[];
}

export interface MessageSendObject {
  chatid?: string;
  msgtype: MessageMsgType;
  visible_to_user?: string;
}

export interface MessageReplyObject {
  MsgType: MessageMsgType;
  VisibleToUser?: string;
}

export abstract class Message {
  /**
   * Message Type
   *
   * 消息类型
   */
  protected readonly msgType: MessageMsgType;

  /**
   * Chat ID
   *
   * 聊天 ID
   */
  protected readonly chatId?: MessageChatId;

  /**
   * Array of visible users
   *
   * 用户数组，仅对这些用户可见
   */
  protected readonly visibleToUser?: string;

  constructor({ chatId, visibleToUser }: MessageOptions) {
    this.chatId = Array.isArray(chatId) ? chatId.join('|') : chatId;
    this.visibleToUser = Array.isArray(visibleToUser)
      ? visibleToUser.join('|')
      : visibleToUser;
  }

  toSendObject(): MessageSendObject {
    const sendObject: MessageSendObject = {
      msgtype: this.msgType,
    };

    if (this.chatId) {
      sendObject.chatid = this.chatId;
    }

    if (this.visibleToUser) {
      sendObject.visible_to_user = this.visibleToUser;
    }

    return sendObject;
  }

  toReplyObject(): MessageReplyObject {
    const replyObject: MessageReplyObject = {
      MsgType: this.msgType,
    };

    if (this.visibleToUser) {
      replyObject.VisibleToUser = this.visibleToUser;
    }

    return replyObject;
  }

  toSendString(): string {
    return JSON.stringify(this.toSendObject());
  }

  toReplyString(): string {
    return xmlBuild(this.toReplyObject());
  }
}
