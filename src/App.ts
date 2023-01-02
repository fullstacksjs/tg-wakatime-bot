import type { Express } from 'express';
import express from 'express';

import { renderLeaderboard } from './api/renderLeaderboard.js';
import type { Bot } from './bot/Bot.js';
import type { Container } from './config/initContainer.js';
import { toAbsolutePath } from './utils/path.js';

export class App {
  private config: Config;
  private app: Express;
  private bot: Bot;

  constructor(opts: Container) {
    this.config = opts.config;
    this.bot = opts.bot;

    this.app = express();
    const viewPath = toAbsolutePath('/api/web');
    this.app.set('view engine', 'ejs');
    this.app.set('views', viewPath);

    this.app.use(express.json());
    this.app.use(express.static(viewPath));

    this.app.get('/', renderLeaderboard);
    this.app.get('/bail', (_, res) => res.status(200).end(''));
    this.app.post('/webhook', this.bot.createExpressWebhookCallback());
  }

  public start() {
    return new Promise(resolve => {
      this.app.listen(this.config.port, () => {
        console.log(`listening on port ${this.config.port}`);
        resolve(this.config);
      });
    });
  }
}
