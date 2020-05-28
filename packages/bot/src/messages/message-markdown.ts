import { Message } from './message';
import type {
  MessageOptions,
  MessageSendObject,
  MessageReplyObject,
} from './message';
import type {
  Attachment,
  AttachmentSendObject,
  AttachmentReplyObject,
} from './attachment';

/**
 * Options when creating a markdown message
 *
 * 创建 Markdown 信息时的选项
 */
export interface MessageMarkdownOptions extends MessageOptions {
  content: string;
  attachments?: Attachment[];
}

/**
 * Request object when sending a markdown message
 *
 * 主动发送 Markdown 信息时的结构
 */
export interface MessageMarkdownSendObject extends MessageSendObject {
  msgtype: 'markdown';
  markdown: {
    content: string;
    attachments?: AttachmentSendObject[];
  };
}

/**
 * Response object when replying a markdown message
 *
 * 被动回复 Markdown 信息时的结构
 */
export interface MessageMarkdownReplyObject extends MessageReplyObject {
  MsgType: 'markdown';
  Markdown: {
    Content: string;
    Attachment?: AttachmentReplyObject[];
  };
}

export class MessageMarkdown extends Message {
  protected readonly msgType: 'markdown';

  protected readonly content: string;

  protected readonly attachments?: Attachment[];

  constructor(options: MessageMarkdownOptions) {
    super(options);
    this.msgType = 'markdown';
    this.content = options.content;
    this.attachments = options.attachments;
  }

  toSendObject(): MessageMarkdownSendObject {
    const sendObject: MessageMarkdownSendObject = {
      ...super.toSendObject(),
      msgtype: this.msgType,
      markdown: {
        content: this.content,
      },
    };

    if (this.attachments) {
      sendObject.markdown.attachments = this.attachments.map((attachment) =>
        attachment.toSendObject()
      );
    }

    return sendObject;
  }

  toReplyObject(): MessageMarkdownReplyObject {
    const replyObject: MessageMarkdownReplyObject = {
      ...super.toReplyObject(),
      MsgType: this.msgType,
      Markdown: {
        Content: this.content,
      },
    };

    if (this.attachments) {
      replyObject.Markdown.Attachment = this.attachments.map((attachment) =>
        attachment.toReplyObject()
      );
    }

    return replyObject;
  }
}
