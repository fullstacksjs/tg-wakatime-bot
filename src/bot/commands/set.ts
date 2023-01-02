import { isNull } from '@fullstacksjs/toolbox';

import { container } from '../../config/container.js';
import type { WakatimeContext } from '../Context.js';

const isValidId = (id: string | undefined): id is string =>
  Boolean(id?.length === 36 && id?.split('-').length === 5);

export const setCommand = (ctx: WakatimeContext) => {
  const repo = container.cradle.repo;
  const [id, rawUsername] = ctx.message?.text?.split(' ').slice(1) ?? [];
  const username = rawUsername?.replace('@', '');

  if (!isValidId(id)) return ctx.replyToMessage('<b>Wrong Input</b>\nInvalid id');
  if (isNull(username)) return ctx.replyToMessage('<b>Wrong Input</b>\nUsername is required');

  repo.setTelegramUsername(id, username);

  return ctx.replyToMessage(ctx.messages.usernameSet);
};
