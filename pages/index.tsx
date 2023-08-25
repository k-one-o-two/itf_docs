import { postsService } from '../services/posts';
import Link from 'next/link';

export default function Index({
  list,
  indexHtml,
}: {
  list: { filename: string; mtime: string }[];
  indexHtml: string;
}) {
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: indexHtml || '',
        }}
      ></div>
      <h1>Last modified files</h1>
      <div className="card">
        {list.map((listItem) => (
          <div key={listItem.filename}>
            <Link href={`article/${listItem.filename.replace('.md', '')}`}>
              {listItem.filename}; last modified @{listItem.mtime}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const listWithTimes = await postsService.getLatest();
  const indexHtml = await postsService.getContent('index');

  return {
    props: {
      list: listWithTimes,
      indexHtml,
    },
  };
}
