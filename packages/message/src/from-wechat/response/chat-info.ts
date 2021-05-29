import type { WechatResponseBase } from './base';

/**
 * Chat info fields of response of Wechat Work
 *
 * 企业微信群聊资料的响应字段
 */
export interface WechatChatInfoResponse extends WechatResponseBase {
  chatid: string;
  name: string;
  members: WechatChatInfoResponseUser[];
}

/**
 * User info in chat info fields of response of Wechat Work
 *
 * 企业微信响应的群聊资料中，用户资料的字段
 */
export interface WechatChatInfoResponseUser {
  userid: string;
  alias: string;
  name: string;
}

/**
 * Chat info of Wechat Work
 *
 * 企业微信群聊资料
 */
export interface WechatChatInfo {
  chatId: string;
  name: string;
  members: WechatChatInfoUser[];
}

/**
 * User info of Wechat Work
 *
 * 企业微信群聊中的用户资料
 */
export interface WechatChatInfoUser {
  userId: string;
  alias: string;
  name: string;
}
