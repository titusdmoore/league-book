import { createMcpHandler } from "mcp-handler";
import { NextRequest } from "next/server";
import { z } from "zod";
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config });

const handler = createMcpHandler(
	(server) => {
		server.tool(
			"roll_dice",
			"Rolls an N-sided die",
			{
				sides: z.number().int().min(2),
			},
			async ({ sides }) => {
				const value = 1 + Math.floor(Math.random() * sides);
				return {
					content: [{ type: "text", text: `🎲 You rolled a ${value}!` }],
				};
			}
		);
		server.tool(
			"create_event",
			"Creates an event for facility",
			{
				name: z.string(),
			},
			async ({ name }) => {
				let event = payload.create({
					collection: 'events',
					data: {
						name: name,
						facility: 1
					}
				})
				return {
					content: [{ type: "text", text: 'Created an event.' }]
				}
			},
		);
	},
	{
		capabilities: {
			tools: {
				roll_dice: {
					description: "Roll a dice",
				},
				create_event: {
					description: "Creates an event for facility",
				},
			},
		},
	},
	{
		basePath: "/mcp", // this needs to match where the [transport] is located.
		maxDuration: 60,
		verboseLogs: true,
	}
);

export { handler as GET, handler as POST, handler as DELETE };

