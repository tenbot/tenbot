import { Middleware } from 'koa';
import { Bot } from '../bot';
import { BotState } from '../types';

/**
 * Options for create bot middleware
 *
 * 创建机器人中间件所需的选项
 */
export interface BotMiddlewareOptions {
  /**
   * The method to apply the middleware
   * Currently, Wechat Work will only send GET or POST requests
   *
   * 应用该中间件的方法
   * 目前企业微信只会发送 GET 和 POST 两种请求
   */
  method?: 'get' | 'post' | Array<'get' | 'post'>;

  /**
   * A function that returns a koa middleware
   *
   * 函数，返回一个 Koa 中间件
   */
  factory: (bot: Bot) => Middleware<BotState>;
}

/**
 * Bot middleware
 *
 * 机器人中间件
 */
export class BotMiddleware {
  path = '/';

  methods: Array<'get' | 'post'>;

  factory: (bot: Bot) => Middleware<BotState>;

  constructor({ method = 'post', factory }: BotMiddlewareOptions) {
    this.methods = Array.isArray(method) ? method : [method];
    this.factory = factory;
  }
}
