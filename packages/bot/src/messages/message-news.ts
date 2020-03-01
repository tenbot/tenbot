import {
  Message,
  MessageOptions,
  MessageSendObject,
  MessageReplyObject,
} from './message';
import { Article, ArticleSendObject, ArticleReplyObject } from './article';

/**
 * Options when creating a news message
 *
 * 创建图文信息时的选项
 */
export interface MessageNewsOptions extends MessageOptions {
  articles: Article[];
}

/**
 * Request object when sending a news message
 *
 * 主动发送图文信息时的结构
 */
export interface MessageNewsSendObject extends MessageSendObject {
  msgtype: 'news';
  news: {
    articles: ArticleSendObject[];
  };
}

/**
 * Response object when replying a news message
 *
 * 被动回复图文信息时的结构
 */
export interface MessageNewsReplyObject extends MessageReplyObject {
  MsgType: 'news';
  News: {
    Article: ArticleReplyObject[];
  };
}

export class MessageNews extends Message {
  protected readonly msgType: 'news';

  protected readonly articles: Article[];

  constructor(options: MessageNewsOptions) {
    super(options);
    this.msgType = 'news';
    this.articles = options.articles;
  }

  toSendObject(): MessageNewsSendObject {
    const sendObject: MessageNewsSendObject = {
      msgtype: this.msgType,
      news: {
        articles: this.articles.map(article => article.toSendObject()),
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

  toReplyObject(): MessageNewsReplyObject {
    const replyObject: MessageNewsReplyObject = {
      MsgType: this.msgType,
      News: {
        Article: this.articles.map(article => article.toReplyObject()),
      },
    };

    if (this.visibleToUser) {
      replyObject.VisibleToUser = this.visibleToUser.join('|');
    }

    return replyObject;
  }
}
