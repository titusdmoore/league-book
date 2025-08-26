import { Client } from "@modelcontextprotocol/sdk/client";
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const transport = new StreamableHTTPClientTransport(new URL("http://localhost:3000/mcp/mcp"))
const client = new Client({
	name: 'league-book-client',
	version: '0.0.1'
});

export default async function Page() {
	await client.connect(transport);
	const tools = await client.listTools();
	console.log(tools)

	return (
		<h1>Hello, World</h1>
	);
}
