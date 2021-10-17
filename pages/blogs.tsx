import Link from "next/link";

import { getDatabase } from "libraries/notion/api";
import { Text } from "libraries/notion/components/Text";

export const databaseId = process.env.NOTION_DATABASE_ID

export default function Home({ posts }) {
    return (
        <ol>
            {posts.map((post) => (
                <li key={post.id}>
                    <Link href={`blogs/${post.id}`}>
                        <a>
                            <Text text={post.properties.Name.title} />
                        </a>
                    </Link>
                </li>
            ))}
        </ol>
    );
}

export const getStaticProps = async () => {
    const database = await getDatabase(databaseId);

    return {
        props: {
            posts: database,
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every second
        revalidate: 1, // In seconds
    };
};
