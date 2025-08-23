import { getPayload } from "payload";
import config from '@payload-config';
import { User } from "@/payload-types";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const payload = await getPayload({ config });
	const team = await payload.findByID({ collection: 'teams', id });

	return (
		<>
			<section>
				<h1>{team.name}</h1>
			</section>
			<section>
				<h2>Upcoming Games</h2>
			</section>
			<section>
				<h2>Roster</h2>
				<ul>
					{team.roster && team.roster.map((teamMember, index) => {
						return (
							<li>{teamMember.firstName} {teamMember.lastName}</li>
						);
					})}
				</ul>
			</section>
		</>
	);
}
