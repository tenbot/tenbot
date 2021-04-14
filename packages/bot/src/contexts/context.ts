import fetch from 'node-fetch';
import type { RequestInit, Response } from 'node-fetch';
import * as EventEmitter from 'eventemitter3';
import { hashMd5 } from '@tenbot/utils';
import {
  MessageText,
  MessageMarkdown,
  MessageImage,
  MessageNews,
  Article,
  Attachment,
  AttachmentActionButton,
} from '@tenbot/message';
import type {
  Message,
  MessageTextOptions,
  MessageMarkdownOptions,
  MessageImageOptions,
  MessageNewsOptions,
  ArticleOptions,
  AttachmentOptions,
  AttachmentActionButtonOptions,
  WechatChatInfo,
  WechatResponseChatInfo,
} from '@tenbot/message';
import type { Bot } from '../bot';
import type { ContextEventTypes } from '../types';

/**
 * Context class
 */
export class Context<
  EventTypes extends ContextEventTypes = ContextEventTypes
> extends EventEmitter<EventTypes> {
  /**
   * The Bot that current context belongs to
   *
   * 当前上下文所属的机器人
   */
  readonly bot: Bot;

  constructor(bot?: Bot) {
    super();
    if (bot) {
      this.bot = bot;
    }
  }

  /**
   * Get chat info
   * Return `null` if not available
   *
   * 获取聊天信息
   * 如果不可获取则返回 null
   */
  async getChatInfo(
    url: string,
    init?: RequestInit,
  ): Promise<WechatChatInfo | null> {
    try {
      const data: WechatResponseChatInfo = await fetch(url, init).then((res) =>
        res.json(),
      );

      if (data.errcode !== 0) {
        throw new Error(data.errmsg);
      }

      const { chatid: chatId, name, members } = data;

      return {
        chatId,
        name,
        members: members.map(({ userid: userId, alias, name: userName }) => ({
          userId,
          alias,
          name: userName,
        })),
      };
    } catch (err) {
      this.bot.debug(err);
      this.bot.emit('error', err);
      return null;
    }
  }

  /**
   * Create a text message
   *
   * 创建文字信息
   */
  createText(options: MessageTextOptions): MessageText {
    return new MessageText(options);
  }

  /**
   * Create a markdown message
   *
   * 创建 Markdown 信息
   */
  createMarkdown(options: MessageMarkdownOptions): MessageMarkdown {
    return new MessageMarkdown(options);
  }

  /**
   * Create an image message
   *
   * 创建图片信息
   */
  createImage(options: MessageImageOptions): MessageImage {
    return new MessageImage(options);
  }

  /**
   * Create an image message from url
   *
   * 根据 URL 创建图片信息
   */
  async createImageFromUrl(
    url: string,
    options?: Omit<MessageImageOptions, 'md5' | 'base64'>,
    init?: RequestInit,
  ): Promise<MessageImage> {
    const data: Buffer = await fetch(url, init)
      .then((res) => res.arrayBuffer())
      .then((res) => Buffer.from(res));

    const md5 = hashMd5(data);
    const base64 = data.toString('base64');

    return this.createImage({
      md5,
      base64,
      ...options,
    });
  }

  /**
   * Create a news message
   *
   * 创建图文信息
   */
  createNews(options: MessageNewsOptions): MessageNews {
    return new MessageNews(options);
  }

  /**
   * Create an article of a news message
   *
   * 创建图文信息的文章
   */
  createArticle(options: ArticleOptions): Article {
    return new Article(options);
  }

  /**
   * Create an attachment
   *
   * 创建附件
   */
  createAttachment(options: AttachmentOptions): Attachment {
    return new Attachment(options);
  }

  /**
   * Create an attachment action button
   *
   * 创建附件按钮
   */
  createAttachmentActionButton(
    options: AttachmentActionButtonOptions,
  ): AttachmentActionButton {
    return new AttachmentActionButton(options);
  }

  /**
   * Send a message
   *
   * 向指定 URL 发送信息
   */
  async sendMessage(
    message: Message,
    toUrl = this.bot.webhook,
    init?: RequestInit,
  ): Promise<Response> {
    const sendObject = message.toSendObject();
    this.bot.debug(`POST ${toUrl}`);
    this.bot.debug(JSON.stringify(sendObject, null, '  '));

    return fetch(toUrl, {
      ...init,
      method: 'POST',
      headers: {
        ...init?.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendObject),
    });
  }

  /**
   * Create and send a text message
   *
   * 创建并发送文字信息
   */
  async sendText(
    options: MessageTextOptions,
    toUrl = this.bot.webhook,
    init?: RequestInit,
  ): Promise<Response> {
    const message = this.createText(options);
    return this.sendMessage(message, toUrl, init);
  }

  /**
   * Create and send a markdown message
   *
   * 创建并发送 Markdown 信息
   */
  async sendMarkdown(
    options: MessageMarkdownOptions,
    toUrl = this.bot.webhook,
    init?: RequestInit,
  ): Promise<Response> {
    const message = this.createMarkdown(options);
    return this.sendMessage(message, toUrl, init);
  }

  /**
   * Create and send an image message
   *
   * 创建并发送图片信息
   */
  async sendImage(
    options: MessageImageOptions,
    toUrl = this.bot.webhook,
    init?: RequestInit,
  ): Promise<Response> {
    const message = this.createImage(options);
    return this.sendMessage(message, toUrl, init);
  }

  /**
   * Create and send an image message by url
   *
   * 根据图片 URL 创建并发送图片信息
   */
  async sendImageFromUrl(
    imageUrl: string,
    options?: Omit<MessageImageOptions, 'md5' | 'base64'>,
    imageInit?: RequestInit,
    toUrl = this.bot.webhook,
    toInit?: RequestInit,
  ): Promise<Response> {
    const message = await this.createImageFromUrl(imageUrl, options, imageInit);
    return this.sendMessage(message, toUrl, toInit);
  }

  /**
   * Create and send a news message
   *
   * 创建并发送图文信息
   */
  async sendNews(
    options: MessageNewsOptions,
    toUrl = this.bot.webhook,
    init?: RequestInit,
  ): Promise<Response> {
    const message = this.createNews(options);
    return this.sendMessage(message, toUrl, init);
  }
}
