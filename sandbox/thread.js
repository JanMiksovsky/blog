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
  let currentPost = {
    text: "",
    render: [],
  };
  let handlingAttachments = false;
  for (const node of ast.children) {
    switch (node.type) {
      case "paragraph":
        if (handlingAttachments) {
          posts.push(currentPost);
          currentPost = {
            text: "",
            render: [],
          };
          handlingAttachments = false;
        }
        if (currentPost.text.length > 0) {
          currentPost.text += "\n";
        }
        currentPost.text += node.children[0].value;
        break;

      case "code":
        handlingAttachments = true;
        const codeHast = await unified().use(remarkRehype).run(node);
        const codeHtml = await unified()
          .use(rehypeStringify)
          .stringify(codeHast);
        currentPost.render.push(codeHtml);
        break;
    }
  }

  if (currentPost.text.length > 0) {
    posts.push(currentPost);
  }

  return posts;
}
