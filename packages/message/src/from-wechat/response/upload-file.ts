import type { WechatResponseBase } from './base';

/**
 * Upload file response of Wechat Work
 *
 * 企业微信上传文件的响应字段
 */
export interface WechatUploadFileResponse extends WechatResponseBase {
  /**
   * 媒体文件类型
   */
  type: WechatUploadFileResponseType;

  /**
   * 媒体文件上传后获取的唯一标识，3 天内有效
   */
  media_id: string;

  /**
   * 媒体文件上传时间戳
   */
  created_at: string;
}

/**
 * Upload file type of Wechat Work
 *
 * 企业微信上传文件的类型
 */
export type WechatUploadFileResponseType =
  // 图片
  | 'image'
  // 语音
  | 'voice'
  // 视频
  | 'video'
  // 普通文件
  | 'file';
