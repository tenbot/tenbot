import { Server } from 'http';
import { Bot } from '@tenbot/bot';
import { App } from './app';

declare module '@tenbot/bot/lib/types' {
  interface BotEventTypes {
    'app/register': [App, string];
  }
}

/**
 * Event types of an app
 *
 * App 的事件类型
 */
export interface AppEventTypes {
  'bot/register': [Bot, string];
  'start': [];
  'close': [];
  'server/start': [Server];
  'server/close': [Server];
  'error': [Error];
  'error/server': [Error, Server];
  [key: string]: unknown[];
}
