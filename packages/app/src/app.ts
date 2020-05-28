import { Server } from 'http';
import * as debug from 'debug';
import * as EventEmitter from 'eventemitter3';
import * as Koa from 'koa';
import * as Router from '@koa/router';
import { formatPath } from '@tenbot/utils';
import { Bot } from '@tenbot/bot';
import { AppEventTypes } from './types';

export interface AppOptions {
  host: string;
  port: number;
}

export class App extends EventEmitter<AppEventTypes> {
  protected readonly options: AppOptions;

  protected readonly server: Koa;

  protected readonly bots: Map<string, Bot>;

  protected readonly debug: debug.Debugger;

  constructor(options: AppOptions) {
    super();
    this.options = options;
    this.server = new Koa();
    this.bots = new Map();
    this.debug = debug('tenbot:app');
  }

  /**
   * Register a bot on particular path
   *
   * 在指定路径上注册一个机器人
   */
  register(bot: Bot, path = '/'): App {
    const botPath = formatPath(path);
    const currentBot = this.bots.get(botPath);
    if (currentBot) {
      throw new Error(
        `bot [${currentBot.name}] has already registered on path '${botPath}'`
      );
    }

    this.bots.set(botPath, bot);

    this.debug(`register bot [${bot.name}] on '${path}'`);
    bot.emit('app/register', this, path);
    this.emit('bot/register', bot, path);

    return this;
  }

  /**
   * Run this app on particular port and host
   *
   * 在指定 host 和 port 上启动 App
   */
  run(): Promise<Server> {
    return new Promise((resolve, reject) => {
      // get the count of registered bots
      // 获取已注册的机器人数量
      const botsCount = this.bots.size;

      this.debug(`registered ${botsCount} bot(s) in total`);

      if (botsCount < 1) {
        reject(new Error('No bots registered'));
        return;
      }

      // use routers of bots
      // 引入机器人的 routers
      const router = new Router();
      this.bots.forEach((bot, path) => {
        const botRouter = bot.createRouter();
        router.use(path, botRouter.routes(), botRouter.allowedMethods());
      });

      // server listening
      // 服务器监听
      const { port, host } = this.options;
      const server = this.server
        .use(router.routes())
        .use(router.allowedMethods())
        .listen(port, host, () => {
          this.debug('server start');
          this.emit('start');
          this.emit('server/start', server);
          console.log(`tenbot app is listening at http://${host}:${port}`);
          resolve(server);
        });

      server.on('close', () => {
        this.debug('server close');
        this.emit('close');
        this.emit('server/close', server);
      });

      server.on('error', (err) => {
        this.debug(`server.on('error'):`, err);
        this.emit('error', err);
        this.emit('error/server', err, server);
        server.close();
        reject(err);
      });
    });
  }
}
