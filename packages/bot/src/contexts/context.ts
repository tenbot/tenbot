import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
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

/**
 * Context class
 */
export class Context<
  EventTypes extends EventEmitter.ValidEventTypes = string | symbol
> extends EventEmitter<EventTypes> {
  /**
   * The Bot that current context belongs to
   *
   * 当前上下文所属的机器人
   */
  readonly bot: Bot;

  /**
   * The http client used for sending http requests to Wechat Work server
   *
   * 用于向企业微信服务器发送请求的 HTTP 客户端
   */
  readonly http: AxiosInstance;

  constructor(bot?: Bot) {
    super();
    if (bot) {
      this.bot = bot;
      this.http = bot.http;
    } else {
      this.http = axios.create();
    }
  }

  /**
   * Get chat info
   * Return `null` if not available
   *
   * 获取聊天信息
   * 如果不可获取则返回 null
   */
  async getChatInfo(url: string): Promise<WechatChatInfo | null> {
    try {
      const { data } = await this.http.get<WechatResponseChatInfo>(url);

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
    httpOptions?: AxiosRequestConfig
  ): Promise<MessageImage> {
    const { data } = await this.http.get<Buffer>(url, {
      responseType: 'arraybuffer',
      ...httpOptions,
    });

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
    options: AttachmentActionButtonOptions
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
    url = this.bot.webhook
  ): Promise<AxiosResponse> {
    const sendObject = message.toSendObject();
    this.bot.debug(`POST ${url}`);
    this.bot.debug(JSON.stringify(sendObject, null, '  '));
    return this.http.post(url, sendObject);
  }

  /**
   * Create and send a text message
   *
   * 创建并发送文字信息
   */
  async sendText(options: MessageTextOptions): Promise<AxiosResponse> {
    const message = this.createText(options);
    return this.sendMessage(message);
  }

  /**
   * Create and send a markdown message
   *
   * 创建并发送 Markdown 信息
   */
  async sendMarkdown(options: MessageMarkdownOptions): Promise<AxiosResponse> {
    const message = this.createMarkdown(options);
    return this.sendMessage(message);
  }

  /**
   * Create and send an image message
   *
   * 创建并发送图片信息
   */
  async sendImage(options: MessageImageOptions): Promise<AxiosResponse> {
    const message = this.createImage(options);
    return this.sendMessage(message);
  }

  /**
   * Create and send an image message by url
   *
   * 根据图片 URL 创建并发送图片信息
   */
  async sendImageFromUrl(
    url: string,
    options?: Omit<MessageImageOptions, 'md5' | 'base64'>,
    httpOptions?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    const message = await this.createImageFromUrl(url, options, httpOptions);
    return this.sendMessage(message);
  }

  /**
   * Create and send a news message
   *
   * 创建并发送图文信息
   */
  async sendNews(options: MessageNewsOptions): Promise<AxiosResponse> {
    const message = this.createNews(options);
    return this.sendMessage(message);
  }
}
