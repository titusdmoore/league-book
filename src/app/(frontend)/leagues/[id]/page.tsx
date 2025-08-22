import { getPayload } from "payload";
import config from '@payload-config';
import { RichText } from "@payloadcms/richtext-lexical/react";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const payload = await getPayload({ config });
	const league = await payload.findByID({ collection: 'leagues', id });

	// console.log(league)

	return (
		<section>
			<h1>{league.name}</h1>
			<div>
				<h2>Teams</h2>
				<ul>
					{league.teams && league.teams.map((team, idx) => {
						if (typeof team == 'number') return null;

						return (
							<li key={idx}>{team.name}</li>
						);
					})}
				</ul>
			</div>
			<div>
				{league.leagueContent && league.leagueContent.map((content) => {
					switch (content.blockType) {
						case 'Columns':
							return (
								<div style={{ display: 'grid', gridTemplateColumns: `repeat(${content.columnCount}, 1fr)` }}>
									{content.columnContent && content.columnContent.map((columnContent) => {
										// I think I goofed with too many nested
										return columnContent.content && columnContent.content!.map((richContent, kdx) => <RichText key={kdx} data={richContent.content as any} />)
									})}
								</div>
							);
						default:
							return (
								<p>Unsupported content type</p>
							);
					}
				})}
			</div>
		</section>
	);
}
