import { postsService } from '../../services/posts';

export default function Article({ content }: { content: string }) {
  console.info('on page', { content });
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: content || '',
      }}
    ></div>
  );
}

export async function getStaticProps({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { slug } = params;

  const content = await postsService.getContent(slug);

  return {
    props: { content },
  };
}

export async function getStaticPaths() {
  const posts = await postsService.getList();

  console.info({ posts });

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.replace('.md', ''),
        },
      };
    }),
    fallback: false,
  };
}
