import type { WechatAttachmentMessage } from './attachment';
import type { WechatEventMessage } from './event';
import type { WechatImageMessage } from './image';
import type { WechatMixedMessage } from './mixed';
import type { WechatTextMessage } from './text';

export * from './base';
export * from './attachment';
export * from './event';
export * from './image';
export * from './mixed';
export * from './text';

/**
 * Message from Wechat Work
 *
 * 来自企业微信的信息
 */
export type WechatMessage =
  | WechatTextMessage
  | WechatImageMessage
  | WechatEventMessage
  | WechatAttachmentMessage
  | WechatMixedMessage;
