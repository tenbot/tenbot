import * as debug from 'debug';
import * as Router from '@koa/router';
import { Cipher, CipherOptions } from '@tenbot/cipher';
import { Context, MessageContext } from './contexts';
import {
  middlewareDecryption,
  middlewareEncryption,
  middlewareErrorHandler,
  middlewareMessageHandler,
  middlewareParse,
  middlewareVerification,
  middlewareVerifyUrl,
} from './middleware';
import { BotState, BotEventTypes, BotMessageHandler, BotPlugin } from './types';
import {
  WechatMessageType,
  WechatMessageText,
  WechatMessageImage,
  WechatMessageEvent,
  WechatMessageAttachment,
  WechatMessage,
} from './wechat';

/**
 * Options required for creating a bot
 *
 * 创建机器人需要配置的选项
 */
export interface BotOptions extends CipherOptions {
  name: string;
  webhook: string;
  directReply?: boolean;
}

/**
 * Bot class
 */
export class Bot extends Context<BotEventTypes> {
  readonly bot = this;

  /**
   * Name of this bot
   *
   * 机器人的名称
   */
  readonly name: string;

  /**
   * Webhook url of this bot
   *
   * 机器人的 Webhook URL
   */
  readonly webhook: string;

  /**
   * Enable direct reply or not
   *
   * 是否开启直接回复
   */
  readonly directReply: boolean;

  /**
   * Cipher that used to verify / encrypt / decrypt messages
   *
   * 用于验证签名 / 加密 / 解密信息的 Cipher
   */
  readonly cipher: Cipher;

  /**
   * Message handlers of this bot
   *
   * 当前机器人的信息处理器
   */
  readonly messageHandlers: Map<
    WechatMessageType | 'default',
    BotMessageHandler
  >;

  /**
   * Debug logger of this bot
   *
   * 当前机器人的 debug logger
   */
  readonly debug: debug.Debugger;

  constructor({
    name,
    webhook,
    directReply = false,
    token,
    encodingAesKey,
  }: BotOptions) {
    super();
    this.name = name;
    this.webhook = webhook;
    this.directReply = directReply;
    this.cipher = new Cipher({ token, encodingAesKey });
    this.messageHandlers = new Map();
    this.debug = debug(`tenbot:bot[${name}]`);
  }

  /**
   * Create message context belonging to this bot
   *
   * 创建当前机器人的 Message Context
   */
  createContext(message: WechatMessage): MessageContext {
    return new MessageContext(this, message);
  }

  /**
   * Create the router of this bot
   *
   * 创建当前机器人的 router
   */
  createRouter(): Router {
    const router = new Router<BotState>();
    [
      middlewareVerification,
      middlewareErrorHandler,
      middlewareDecryption,
      middlewareVerifyUrl,
      middlewareParse,
      middlewareMessageHandler,
      middlewareEncryption,
    ].forEach(middleware =>
      router.register(
        middleware.path,
        middleware.methods,
        middleware.factory(this)
      )
    );
    return router;
  }

  /**
   * Use a plugin on this bot
   *
   * 为当前机器人使用插件
   */
  plugin<T extends object>(
    plugin: BotPlugin<T>,
    options: T | boolean = true
  ): this {
    // plugin is disabled
    // 插件已禁用
    if (options === false) {
      return this;
    }

    // plugin is enabled without options
    // 插件已启用，但是没有传入选项
    if (options === true) {
      plugin(this, {});
      return this;
    }

    // plugin is enabled with options
    // 插件已启用，并传入选项
    plugin(this, options);
    return this;
  }

  /**
   * Default message handler
   * If the message type does not have a handler, fallback to this handler
   *
   * 默认消息处理器
   * 如果对应消息类型没有处理器，则使用该处理器
   */
  onMessage(handler: BotMessageHandler): this {
    this.messageHandlers.set('default', handler);
    return this;
  }

  /**
   * Text message handler
   *
   * 文字消息处理器
   */
  onText(handler: BotMessageHandler<WechatMessageText>): this {
    this.messageHandlers.set('text', handler);
    return this;
  }

  /**
   * Image message handler
   *
   * 图片消息处理器
   */
  onImage(handler: BotMessageHandler<WechatMessageImage>): this {
    this.messageHandlers.set('image', handler);
    return this;
  }

  /**
   * Event message handler
   *
   * 事件消息处理器
   */
  onEvent(handler: BotMessageHandler<WechatMessageEvent>): this {
    this.messageHandlers.set('event', handler);
    return this;
  }

  /**
   * Attachment message handler
   *
   * 附件消息处理器
   */
  onAttachment(handler: BotMessageHandler<WechatMessageAttachment>): this {
    this.messageHandlers.set('attachment', handler);
    return this;
  }
}
