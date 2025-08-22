import { getPayload } from "payload";
import config from '@payload-config';
import Link from "next/link";

export default async function Page() {
  const payload = await getPayload({ config });
  const leagues = await payload.find({ collection: 'leagues', pagination: false });

  return (
    <section>
      <h1>Hello, World</h1>
      <ul>
        {leagues.docs.map((league, idx) => (
          <li key={idx}>
            <article>
              <h2>{league.name}</h2>
              <Link href={'/leagues/' + league.id.toString()}>View League</Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
