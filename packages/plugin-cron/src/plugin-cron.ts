import { Bot, BotPlugin } from '@tenbot/bot';
import { CronCommand, CronJob, CronTime } from 'cron';
import { Moment } from 'moment';

// ConstructorParameters<T> cannot get correct params of overloaded constructor, so we manually add the type
type CronJobParams =
  | ConstructorParameters<typeof CronJob>
  | [string | Date | Moment, CronCommand, ...Array<unknown>];

declare module '@tenbot/bot/lib/bot' {
  interface Bot {
    /**
     * Cron jobs of this bot
     *
     * 当前机器人的定时任务
     */
    cronJobs: CronJob[];

    /**
     * Create a cron job
     *
     * Receive same params as `cron.job()` / `new cron.CronJob()`
     *
     * You need to start and stop it manually
     *
     * 创建一个定时任务
     *
     * 参数和 `cron.job()` / `new cron.CronJob()` 一致
     *
     * 你需要手动 `start` 和 `stop` 这个任务
     *
     * @see https://github.com/kelektiv/node-cron#available-cron-patterns
     */
    createCronJob: (this: this, ...params: CronJobParams) => CronJob;

    /**
     * Create a cron time
     *
     * Receive same params as `cron.time()` / `new cron.CronTime()`
     *
     * 创建一个定时时间
     *
     * 参数和 `cron.time()` / `new cron.CronTime()` 一致
     *
     * @see https://github.com/kelektiv/node-cron#available-cron-patterns
     */
    createCronTime: (
      this: this,
      ...params: ConstructorParameters<typeof CronTime>
    ) => CronTime;

    /**
     * Create a start a cron job
     *
     * Receive same params as `cron.job()` / `new cron.CronJob()`
     *
     * 创建并启动一个定时任务
     *
     * 参数和 `cron.job()` / `new cron.CronJob()` 一致
     *
     * @see https://github.com/kelektiv/node-cron#available-cron-patterns
     */
    cron: (this: this, ...params: CronJobParams) => this;
  }
}

/**
 * Cron plugin for tenbot (cron)
 *
 * Tenbot 定时任务插件 (cron)
 *
 * @see https://github.com/kelektiv/node-cron
 */
export const pluginCron: BotPlugin<{}> = bot => {
  bot.cronJobs = [];
  bot.createCronJob = function createCronJob(
    ...params: ConstructorParameters<typeof CronJob>
  ): CronJob {
    return new CronJob(...params);
  };
  bot.createCronTime = function createCronTime(...params): CronTime {
    return new CronTime(...params);
  };
  bot.cron = function cron(...params): Bot {
    const job = this.createCronJob(...params);
    job.start();
    this.cronJobs.push(job);
    return this;
  };
};
