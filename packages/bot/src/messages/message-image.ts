import {
  Message,
  MessageOptions,
  MessageSendObject,
  MessageReplyObject,
} from './message';

/**
 * Options when creating an image message
 *
 * 创建图片信息时的选项
 */
export interface MessageImageOptions extends MessageOptions {
  base64: string;
  md5: string;
}

/**
 * Request object when sending an image message
 *
 * 主动发送图片信息时的结构
 */
export interface MessageImageSendObject extends MessageSendObject {
  msgtype: 'image';
  image: {
    base64: string;
    md5: string;
  };
}

/**
 * Response object when replying an image message
 *
 * 被动回复图片信息时的结构
 */
export interface MessageImageReplyObject extends MessageReplyObject {
  MsgType: 'image';
  Image: {
    Base64: string;
    Md5: string;
  };
}

export class MessageImage extends Message {
  protected readonly msgType: 'image';

  protected readonly base64: string;

  protected readonly md5: string;

  constructor(options: MessageImageOptions) {
    super(options);
    this.msgType = 'image';
    this.base64 = options.base64;
    this.md5 = options.md5;
  }

  toSendObject(): MessageImageSendObject {
    const sendObject: MessageImageSendObject = {
      msgtype: this.msgType,
      image: {
        base64: this.base64,
        md5: this.md5,
      },
    };

    if (this.chatId) {
      sendObject.chatid = this.chatId;
    }

    if (this.visibleToUser) {
      // eslint-disable-next-line @typescript-eslint/camelcase
      sendObject.visible_to_user = this.visibleToUser.join('|');
    }

    return sendObject;
  }

  toReplyObject(): MessageImageReplyObject {
    const replyObject: MessageImageReplyObject = {
      MsgType: this.msgType,
      Image: {
        Base64: this.base64,
        Md5: this.md5,
      },
    };

    if (this.visibleToUser) {
      replyObject.VisibleToUser = this.visibleToUser.join('|');
    }

    return replyObject;
  }
}
