---
title: Write a very concise static site generator with Origami expression
---

Last year I created a sample blog called [#pondlife](https://pondlife.netlify.app/) to show how to create a basic blog in [Web Origami](https://weborigami.org/). Recently I rewrote that same blog three new ways, giving me four implementations to compare:

1. Minimalist JavaScript with zero dependencies: [blog post](/posts/2025/04-17-zero-dependencies.html), [source](https://github.com/WebOrigami/pondlife-zero-deps), [site](https://pondlife-zero-deps.netlify.app/)
2. JavaScript using the async-tree library: [blog post](/posts/2025/04-23-async-tree.html), [source](https://github.com/WebOrigami/pondlife-async-tree), [site](https://pondlife-async-tree.netlify.app/)
3. Origami [original blog post](/posts/2024/05-24-pondlife.html), [source](https://github.com/WebOrigami/pondlife), [site](https://pondlife.netlify.app/)
4. Astro, a popular static site generator framework: [blog post](/posts/2025/04-14-astro.html), [source](https://github.com/JanMiksovsky/pondlife-astro), [site](https://pondlife-astro.netlify.app/)

All four approaches produce the same static blog site — but there are significant differences in how much code each approach entails and how many dependencies they require.

## JavaScript isn’t a great fit for making sites

The Origami version is functionally the same as the JavaScript version using the [async-tree library](https://weborigami.org/async-tree). The Origami is able to be more concise by using a dialect of JavaScript expressions. These cut out a fair bit of JavaScript boilerplate so the final source code can focus on the blog I’m trying to create.

The JavaScript language was originally designed for wiring up interactivity on individual pages. It was not designed to create sites, to interact with file system trees or network resources, or to parse and manipulate the contents of files.

Node.js and similar environments do make those things *possible* in JavaScript — which is great! But the fact remains that JavaScript itself is a poor fit for making sites. Even basic site tasks require you to write quite a bit of JavaScript code.

## Example: Generating the About page

As an example, let’s look at the [aboutPage.js](https://github.com/WebOrigami/pondlife-async-tree/blob/main/src/templates/aboutPage.js) code in the async-tree version of the blog that reads in a trivial [markdown file](https://github.com/WebOrigami/pondlife-async-tree/blob/main/src/about.md) and transforms it into the simple [About page](https://pondlife-async-tree.netlify.app/about.html):

```js
import { marked } from "marked";
import fs from "node:fs/promises";
import markdownDocument from "../markdownDocument.js";
import page from "./page.js";

// About page: transforms about.md to HTML and applies the page template
export default async () => {
  const buffer = await fs.readFile(
    new URL("../about.md", import.meta.url).pathname
  );
  const document = await markdownDocument(buffer);
  return page({
    ...document,
    // Transform the body to HTML
    body: marked.parse(document.body),
  });
};
```

This gets a reference to the markdown file relative to the JavaScript module, reads in the file buffer, calls a helper to parse that as markdown with front matter, transforms the resulting object to one whose `body` property is HTML, then passes that to our site’s basic `page` template to produce the final HTML page.

The above code works but feels verbose for what it’s doing.

## Origami is JavaScript expressions plus paths

Many tasks in creating a site or other digital artifact can be handled by an [expression](https://en.wikipedia.org/wiki/Expression_(computer_science)) — a bit of code that returns a value.

* Many web resources can be described as applying one or more functions to some original content or data.
* Likewise, converting data to HTML can be described as applying one or more template functions.
* The overall structure of a site can be described as a tree, which can be defined by an object literal.

These are all types of expressions.

The Origami language is essentially JavaScript expressions with paths. This is paired with a library of built-in functions to handle tasks that commonly come up when creating sites and other software artifacts. Finally, a command-line interface (CLI) can display the result of an expression or, if the expression produces a complex tree structure, write that result out as a tree of files in the file system.

## Expressions are concise

Origami expressions cut down the above code required for things like creating the About page.

- Each Origami program file implicitly exports a single expression, so we can drop the `export default`.
- Origami extends the expression’s [scope](https://weborigami.org/language/scope) to include the surrounding file system, so we can reference the `about.md` markdown file by simply writing `about.md`.
- Similarly, instead of statically importing the `page.js` template, we can refer to `page.ori` (the corresponding Origami version of the template) by just writing `page.ori`.
- Origami has a system of [file type handlers](https://weborigami.org/language/fileTypes.html) to process data in a file based on its file extension. In this case, Origami’s handler for `.md` files knows such files contain text and optionally front matter data, so we can drop the need to invoke such code ourselves.
- Origami also includes a built-in function [mdHtml](https://weborigami.org/builtins/text/mdhtml) that can handle the transformation of an object with markdown content into an object with HTML content.
- Using file references and built-in functions lets us drop all of the `import` statements.
- Origami assumes that any expression can be potentially asynchronous, so we can drop the `async` declaration and the `await` calls.
- Instead of assigning interim steps to `const` variables, the function calls are now so short that we can just collapse them to one calculation.

With all that, we can replace the 17 lines of code shown earlier with a single line:

```ori
page.ori(mdHtml(about.md))
```

This is what I think a language that’s good for making web sites should look like. This line says: “Read in about.md, turn into HTML, and pour that into the base page template.”

It’s great that you can do this in JavaScript too, but compared to the above, JavaScript seems like an awkward fit.

Critically, when you write the above line of code, you are still in control of every step of the process. You can add new operations, change the order of operations, whatever you want.

In contrast, frameworks need to make assumptions about what you want to do. If their assumptions match your needs _perfectly_, you might not even need to write any code. But as my [Astro blog post](/posts/2025/04-14-astro.html) discussed, if your needs vary even a tiny bit from the framework’s defaults, you may end up writing quite a lot of code.

## Distilling the essential site definition

We can make a similar reduction of this [site.js](https://github.com/WebOrigami/pondlife-async-tree/blob/main/src/site.js) code that defines the overall structure of the async-tree blog:

```js
import { FileTree, map, paginate } from "@weborigami/async-tree";
import jsonFeedToRss from "@weborigami/json-feed-to-rss";
import jsonFeed from "./jsonFeed.js";
import posts from "./posts.js";
import aboutPage from "./templates/aboutPage.js";
import multiPostPage from "./templates/multiPostPage.js";
import singlePostPage from "./templates/singlePostPage.js";

// Group posts into pages of 10
const pages = map(await paginate(posts, 10), {
  extension: "->.html", // Add `.html` to the numeric keys
  value: multiPostPage, // Apply template to the set of 10 posts
});

// Convert posts to a feed object in JSON Feed schema
const feed = await jsonFeed(posts);

//
// This is the primary representation of the site as an object. Some properties
// are async promises for a single result, others are async trees of promises.
//
export default {
  "about.html": aboutPage(),
  assets: new FileTree(new URL("assets", import.meta.url)),
  images: new FileTree(new URL("../images", import.meta.url)),
  "index.html": pages.get("1.html"), // same as first page in pages area
  "feed.json": JSON.stringify(feed, null, 2),
  "feed.xml": jsonFeedToRss(feed),
  pages,
  posts: map(posts, singlePostPage),
};
```

By leaning on Origami’s implicit imports, exports, and async/await support and using the language’s built-in functions, we can reduce the above code to this expression:

```ori
// Define the blog's overall structure
{
  // About page uses the basic page template
  about.html = page.ori(mdHtml(about.md))

  // Assets (fonts, styles) and images are included as is.
  assets
  images

  // Feeds render the posts in JSON Feed and RSS formats
  (feed) = feed.ori(posts.ori)
  feed.json = json(feed)
  feed.xml = rss(feed)

  index.html = pages/1.html  // same as first page in pages area

  // Group posts into pages of 10
  (paginated) = paginate(posts.ori, 10)
  pages/ = map(paginated, { extension: "→.html", value: multiPostPage.ori })

  // The posts area contains a page for each individual post
  posts/ = map(posts.ori, singlePostPage.ori)
}
```

The above code is still entirely explicit about declaring the site it produces; Origami is making no assumptions about what you want. The above code is not configuring a blog engine. _It’s defining a blog engine from scratch_.

I find the Origami version easy enough to read that I can quickly look over a site definition like this — even a definition written by someone else — and quickly apprehend the construction of the entire site.

## Assessment

Let’s see how the Origami version compares against the three blog versions discussed earlier.

The Origami source code is distinctly smaller than all other forms of the code, coming in at just 5749 bytes:

![Chart comparing source code size across three blog versions, Origami is smallest](/images/2025/05/origamiSourceCode.png)

The Origami version using Origami v0.2.12 comes with a non-trivial 33Mb of node_modules, although that’s still less than a third of the 117Mb of node_modules for the Astro version:

![Chart comparing node modules across three blog versions, zero-dependencies is smallest](/images/2025/05/origamiNodeModules.png)

The Origami build time is slightly slower than the zero-dependency and async-tree versions that use only JavaScript. This reflects the cost of the Origami parser and runtime. That said, the Origami version is still faster than Astro for this project:

![Chart comparing build times across three blog versions, zero-dependencies is fastest](/images/2025/05/origamiBuildTime.png)

## What do you actually need to learn?

Origami is a dialect of JavaScript expressions. If you don’t already know JavaScript, you’ll need to learn some basics to be productive in Origami. If you do know JavaScript, you need to be aware of the [set of JavaScript features](https://weborigami.org/language/comparison.html) supported in Origami and some syntax differences.

Learning a new language dialect does represent some real mental work for you. But Astro and most of the other popular SSG frameworks often impose new language dialects too. In Astro’s case, you need to learn a dialect of JSX, which itself is a dialect of JavaScript and a dialect of HTML.

If you don’t want to learn a new language, I think the async-tree version of the blog is quite nice. An experienced JavaScript developer can take advantage of it without needing to learn a new language at all.

## Conclusion

All these projects produce the same site and, depending on who you are and what your goals are, any of them might be appropriate for you.

I myself prefer solutions that are more explicit and less magic. It’s generally a good idea to work as close to the platform as possible; both of the JavaScript versions discussed here have their merits. That said, Origami is so concise and flexible that I can be extremely productive in it and it’s fun to use. I generally prefer it for making sites these days.

Read the other posts in this series:

1. [Static site generators like Astro are actually pretty complex for the problems they solve](/posts/2025/04-14-astro.html)
2. [This minimalist static site generator pattern is only for JavaScript developers who want something small, fast, flexible, and comprehensible](/posts/2025/04-17-zero-dependencies.html)
3. [Making a small JavaScript blog static site generator even smaller using the general async-tree library](/posts/2025/04-23-async-tree.html)
4. Write a very concise static site generator with Origami expression [this post]
