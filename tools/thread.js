import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export default async function thread(buffer) {
  const document = await buffer.unpack();
  const markdown = document["@text"];
  const ast = await unified().use(remarkParse).parse(markdown);
  const posts = [];
  let currentPost = null;
  for (const node of ast.children) {
    switch (node.type) {
      case "paragraph":
        if (currentPost?.status) {
          posts.push(currentPost);
        }
        const status = nodeText(node);
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

  if (currentPost?.status) {
    posts.push(currentPost);
  }

  return posts;
}

function lastLinkToEnd(nodes) {
  const linkTotal = nodes.filter((node) => node.type === "link").length;
  const adjusted = [];
  let linkCount = 0;
  let lastUrl;
  for (const node of nodes) {
    if (node.type === "link") {
      linkCount++;
      if (linkCount === linkTotal) {
        const linkText = nodeText(node.children);
        adjusted.push({
          type: "text",
          value: linkText,
        });
        lastUrl = node.url;
      } else {
        adjusted.push(node);
      }
    } else {
      adjusted.push(node);
    }
  }
  if (lastUrl) {
    adjusted.push({
      type: "text",
      value: ` ${lastUrl}`,
    });
  }
  return adjusted;
}

function nodeText(node) {
  if (node instanceof Array) {
    return node.map((node) => nodeText(node)).join("");
  }
  switch (node.type) {
    case "text":
      return node.value;

    case "link":
      return `${nodeText(node.children)} (${node.url})`;

    case "paragraph":
      const adjusted = lastLinkToEnd(node.children);
      return nodeText(adjusted);

    default:
      if (node.children) {
        return nodeText(node.children);
      }
      return "";
  }
}
