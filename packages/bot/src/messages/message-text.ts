import {
  Message,
  MessageOptions,
  MessageSendObject,
  MessageReplyObject,
} from './message';

/**
 * Options when creating a text message
 *
 * 创建文字信息时的选项
 */
export interface MessageTextOptions extends MessageOptions {
  content: string;
  mentionedList?: string[];
  mentionedMobileList?: string[];
}

/**
 * Request object when sending a text message
 *
 * 主动发送文字信息时的结构
 */
export interface MessageTextSendObject extends MessageSendObject {
  msgtype: 'text';
  text: {
    content: string;
  };
  mentioned_list?: string[];
  mentioned_mobile_list?: string[];
}

/**
 * Response object when replying a text message
 *
 * 被动回复文字信息时的结构
 */
export interface MessageTextReplyObject extends MessageReplyObject {
  MsgType: 'text';
  Text: {
    Content: string;
    MentionedList?: {
      Item: string[];
    };
    MentionedMobileList?: {
      Item: string[];
    };
  };
}

export class MessageText extends Message {
  protected readonly msgType: 'text';

  protected readonly mentionedList?: string[];

  protected readonly mentionedMobileList?: string[];

  protected readonly content: string;

  constructor(options: MessageTextOptions) {
    super(options);
    this.msgType = 'text';
    this.content = options.content;
    this.mentionedList = options.mentionedList;
    this.mentionedMobileList = options.mentionedMobileList;
  }

  toSendObject(): MessageTextSendObject {
    const sendObject: MessageTextSendObject = {
      msgtype: this.msgType,
      text: {
        content: this.content,
      },
    };

    if (this.chatId) {
      sendObject.chatid = this.chatId;
    }

    if (this.visibleToUser) {
      // eslint-disable-next-line @typescript-eslint/camelcase
      sendObject.visible_to_user = this.visibleToUser.join('|');
    }

    if (this.mentionedList) {
      // eslint-disable-next-line @typescript-eslint/camelcase
      sendObject.mentioned_list = this.mentionedList;
    }

    if (this.mentionedMobileList) {
      // eslint-disable-next-line @typescript-eslint/camelcase
      sendObject.mentioned_mobile_list = this.mentionedMobileList;
    }

    return sendObject;
  }

  toReplyObject(): MessageTextReplyObject {
    const replyObject: MessageTextReplyObject = {
      MsgType: this.msgType,
      Text: {
        Content: this.content,
      },
    };

    if (this.visibleToUser) {
      replyObject.VisibleToUser = this.visibleToUser.join('|');
    }

    if (this.mentionedList) {
      replyObject.Text.MentionedList = {
        Item: this.mentionedList,
      };
    }

    if (this.mentionedMobileList) {
      replyObject.Text.MentionedMobileList = {
        Item: this.mentionedMobileList,
      };
    }

    return replyObject;
  }
}
