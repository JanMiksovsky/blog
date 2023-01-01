import { extractFrontMatter } from "@graphorigami/origami";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export default async function thread(markdownBuffer) {
  const markdown = String(markdownBuffer);
  const frontMatter = extractFrontMatter(markdown);
  const body = frontMatter?.bodyText ?? markdown;

  const ast = await unified().use(remarkParse).parse(body);
  const posts = [];
  let currentPost = null;
  for (const node of ast.children) {
    switch (node.type) {
      case "paragraph":
        if (currentPost) {
          posts.push(currentPost);
        }
        const status = node.children[0].value;
        currentPost = {
          status,
        };
        break;

      case "code":
        if (!currentPost) {
          currentPost = {
            status: "",
          };
        }
        const codeHast = await unified().use(remarkRehype).run(node);
        const codeHtml = await unified()
          .use(rehypeStringify)
          .stringify(codeHast);
        if (!currentPost.render) {
          currentPost.render = [];
        }
        currentPost.render.push(codeHtml);
        break;
    }
  }

  if (currentPost) {
    posts.push(currentPost);
  }

  return posts;
}
