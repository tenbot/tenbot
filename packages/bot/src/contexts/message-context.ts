import type { Response } from 'node-fetch';
import type {
  Message,
  MessageText,
  MessageTextOptions,
  MessageMarkdown,
  MessageMarkdownOptions,
  MessageImage,
  MessageImageOptions,
  MessageNews,
  MessageNewsOptions,
  WechatMessage,
  WechatChatInfo,
} from '@tenbot/message';
import type { Bot } from '../bot';
import { Context } from './context';

export class MessageContext extends Context {
  /**
   * The message corresponding to this context
   *
   * 当前上下文对应的信息
   */
  readonly message: WechatMessage;

  /**
   * Message to reply to Wechat Work directly
   *
   * 直接回复给企业微信的消息
   */
  replyMessage?: Message;

  constructor(bot: Bot, message: WechatMessage) {
    super(bot);
    this.message = message;
  }

  /**
   * Set the direct-reply message
   *
   * 设置直接回复给企业微信的消息
   */
  set directReplyMessage(message: Message) {
    if (!this.bot.directReply) {
      this.bot.debug(`directReply mode is disabled`);
    } else {
      this.replyMessage = message;
    }
  }

  /**
   * Get current chat info
   * Return `null` if not available
   *
   * 获取当前聊天信息
   * 如果不可获取则返回 null
   */
  async getChatInfo(): Promise<WechatChatInfo | null> {
    // `getChatInfoUrl` is not available if current message does not come from a group chat
    // 如果当前信息并非来自群聊，那么 getChatInfoUrl 不存在
    const url = this.message.getChatInfoUrl;
    return url ? super.getChatInfo(url) : null;
  }

  /**
   * Create a text message to reply current message
   *
   * 创建文字信息，用于回复当前信息
   */
  createText(options: MessageTextOptions): MessageText {
    return super.createText({
      chatId: this.message.chatId,
      ...options,
    });
  }

  /**
   * Create a markdown message to reply current message
   *
   * 创建 Markdown 信息，用于回复当前信息
   */
  createMarkdown(options: MessageMarkdownOptions): MessageMarkdown {
    return super.createMarkdown({
      chatId: this.message.chatId,
      ...options,
    });
  }

  /**
   * Create an image message to reply current message
   *
   * 创建图片信息，用于回复当前信息
   */
  createImage(options: MessageImageOptions): MessageImage {
    return super.createImage({
      chatId: this.message.chatId,
      ...options,
    });
  }

  /**
   * Create a news message to reply current message
   *
   * 创建图文信息，用于回复当前信息
   */
  createNews(options: MessageNewsOptions): MessageNews {
    return super.createNews({
      chatId: this.message.chatId,
      ...options,
    });
  }

  /**
   * Send a message
   *
   * 回复信息
   */
  async sendMessage(
    message: Message,
    url = this.message.webhookUrl || this.bot.webhook,
  ): Promise<Response> {
    return super.sendMessage(message, url);
  }
}
