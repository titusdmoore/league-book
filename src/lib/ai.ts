import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export type ScheduleLeagueArgs = {
  league: any;
};

export const scheduleLeague = async ({ league }: ScheduleLeagueArgs) => {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-0',
    max_tokens: 1024,
    messages: []
  });

  while (response.content.some(c => c.type === 'tool_use')) {

  }
};
