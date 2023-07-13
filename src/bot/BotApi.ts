/* eslint-disable @typescript-eslint/no-misused-promises */
import type { Express } from 'express';
import express from 'express';

import type { Container } from '../config/initContainer.js';
import type { Bot } from './Bot.js';

export class BotApi {
  private config: Config;
  private app: Express;
  private bot: Bot;

  constructor(opts: Container) {
    this.config = opts.config;
    this.bot = opts.bot;

    this.app = express();
    this.app.use(express.json());
    this.app.get('/bail', (_, res) => res.status(200).end(''));
    this.app.post('/webhook', this.bot.createExpressWebhookCallback());
    void this.bot.start();
  }

  public start() {
    return new Promise(resolve => {
      this.app.listen(this.config.botPort, () => {
        console.log(`listening on port ${this.config.botPort}`);
        resolve(this.config);
      });
    });
  }
}
