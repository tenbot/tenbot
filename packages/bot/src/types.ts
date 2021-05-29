import type { ParameterizedContext as Ctx } from 'koa';
import type {
  Message,
  WechatMessage,
  WechatMessageBase,
  WechatTextMessage,
  WechatImageMessage,
  WechatEventMessage,
  WechatAttachmentMessage,
  WechatMixedMessage,
} from '@tenbot/message';
import type { Bot } from './bot';
import type { MessageContext } from './contexts';

/**
 * Basic type of context events
 *
 * 上下文事件的基础类型
 */
export type ContextEventTypes = Record<string | number | symbol, unknown[]>;

/**
 * Koa state inside a bot
 *
 * 机器人内部的 koa state
 */
export interface BotState {
  encryptedMessage: string;
  decryptedMessage: string;
  message: WechatMessage;
  replyMessage?: Message;
}

/**
 * Bot message handler
 *
 * 机器人信息处理器
 */
export type BotMessageHandler<T extends WechatMessageBase = WechatMessage> = (
  message: T,
  context: MessageContext,
) => Promise<void>;

/**
 * Event types of a bot
 *
 * 机器人的事件类型
 */
export interface BotEventTypes extends ContextEventTypes {
  'message': [WechatMessage, MessageContext];
  'message/text': [WechatTextMessage, MessageContext];
  'message/image': [WechatImageMessage, MessageContext];
  'message/event': [WechatEventMessage, MessageContext];
  'message/attachment': [WechatAttachmentMessage, MessageContext];
  'message/mixed': [WechatMixedMessage, MessageContext];
  'error': [Error];
  'error/middleware': [Error, Ctx<BotState>];
  'error/message-handler': [Error, WechatMessage, MessageContext];
  'error/message-handler/text': [Error, WechatTextMessage, MessageContext];
  'error/message-handler/image': [Error, WechatImageMessage, MessageContext];
  'error/message-handler/event': [Error, WechatEventMessage, MessageContext];
  'error/message-handler/attachment': [
    Error,
    WechatAttachmentMessage,
    MessageContext,
  ];
  'error/message-handler/mixed': [Error, WechatMixedMessage, MessageContext];
}

/**
 * Bot plugin
 *
 * 机器人插件
 */
export type BotPlugin<
  Options extends Record<string, unknown> = Record<never, never>
> = (bot: Bot, options: Partial<Options>) => void;
