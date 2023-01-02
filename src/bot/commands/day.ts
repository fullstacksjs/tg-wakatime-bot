import { container } from '../../config/container.js';
import { getScreenshot } from '../../core/Services/getScreenshot.js';
import type { WakatimeContext } from '../Context.js';

const cache = new Map<string, Buffer>();

export async function day(ctx: WakatimeContext) {
  if (!ctx.chat) return ctx.reply('Why are you gay?');

  const leaderboard = await container.cradle.leaderboardService.getDay();
  const screenshot = await getScreenshot();
  const title = leaderboard.dayTitle;

  if (!cache.has(title)) cache.set(title, screenshot);
  const image = cache.get(title)!;

  return ctx.sendLeaderboard(image, title);
}
