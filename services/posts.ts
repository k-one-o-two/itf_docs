import fs from 'fs';
import { join } from 'path';
import { marked } from 'marked';

const postsDirectory = join(process.cwd(), 'posts');

export const postsService = {
  getList: async () => {
    return fs.readdirSync(postsDirectory);
  },
  getContent: async (name: string) => {
    const fullPath = join(postsDirectory, `${name}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    return marked.parse(fileContents);
  },
  getLatest: async () => {
    const list = await postsService.getList();
    return list
      .map((filename) => {
        return {
          filename,
          mtime:
            fs
              .statSync(`${postsDirectory}/${filename}`)
              .mtime.toLocaleDateString() +
            ' ' +
            fs
              .statSync(`${postsDirectory}/${filename}`)
              .mtime.toLocaleTimeString(),
        };
      })
      .sort(
        (a, b) => new Date(a.mtime).getTime() - new Date(b.mtime).getTime(),
      );
  },
};
