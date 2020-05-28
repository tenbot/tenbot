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
  content?: string;
  mentionedList?: (string | '@all')[];
  mentionedMobileList?: (string | '@all')[];
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
    mentioned_list?: string[];
    mentioned_mobile_list?: string[];
  };
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

  protected readonly content: string;

  protected readonly mentionedList?: string[];

  protected readonly mentionedMobileList?: string[];

  constructor(options: MessageTextOptions) {
    super(options);
    this.msgType = 'text';
    this.content = options.content || '';
    this.mentionedList = options.mentionedList;
    this.mentionedMobileList = options.mentionedMobileList;
  }

  toSendObject(): MessageTextSendObject {
    const sendObject: MessageTextSendObject = {
      ...super.toSendObject(),
      msgtype: this.msgType,
      text: {
        content: this.content,
      },
    };

    if (this.mentionedList) {
      sendObject.text.mentioned_list = this.mentionedList;
    }

    if (this.mentionedMobileList) {
      sendObject.text.mentioned_mobile_list = this.mentionedMobileList;
    }

    return sendObject;
  }

  toReplyObject(): MessageTextReplyObject {
    const replyObject: MessageTextReplyObject = {
      ...super.toReplyObject(),
      MsgType: this.msgType,
      Text: {
        Content: this.content,
      },
    };

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
