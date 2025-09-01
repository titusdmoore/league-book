import { sseManager } from "@/lib/sse"
import { NextRequest } from "next/server"
import { getPayload } from "payload";
import config from '@payload-config';

export async function GET(request: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
	const payload = await getPayload({ config });
	const eventId = (await params).eventId;

	let attendances = await payload.find({
		collection: 'userEventAttendances',
		where: {
			event: { equals: eventId },
		},
	});

	// Set up SSE headers
	const responseHeaders = {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive',
		'Access-Control-Allow-Origin': '*',
	}

	const stream = new ReadableStream({
		start(controller) {
			// Send initial connection message
			controller.enqueue(`data: ${JSON.stringify({ type: 'connected' })}\n\n`)


			controller.enqueue(`data: ${JSON.stringify({
				type: 'initial_attendances',
				attendances
			})}\n\n`);

			// Store the controller so we can send updates
			// You'll need a way to manage active connections
			if (eventId) {
				let eventInt = parseInt(eventId);
				sseManager.addConnection(eventInt, controller);

				// Handle client disconnect
				request.signal.addEventListener('abort', () => {
					sseManager.removeConnection(eventInt);
				});
			}
		},
		cancel(controller) {
			// Clean up when client disconnects
			if (controller && eventId) {
				sseManager.removeConnection(parseInt(eventId));
			}
		}
	})

	return new Response(stream, { headers: responseHeaders })
}
