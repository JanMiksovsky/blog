---
title: “This minimalist static site generator pattern is only for #JavaScript developers who want something small, fast, flexible, and comprehensible”
---

The configuration of a complex tool may take more work that coding the same functionality from scratch. In the last post I described [creating a simple blog in Astro](*** link ***), a popular static site generator (SSG). I felt it was more complicated than the problem justified, so I wanted to rewrite the generation of the entire blog project from scratch in pure JavaScript with zero dependencies.

*** image goes here ***

This went very well: I coded the blog in about a day, I can completely understand every part of it, and it’s very fast.

This isn’t a product but a pattern. If you’re familiar with JavaScript, there are only two small ideas here you might not have tried before. I think you’ll find it easier than you expect.

## What is a static site generator doing?

A static site generator reads in a tree of files representing the source content you create by hand and transforms it into a new tree of files representing the static files you deploy. That’s the core of what an SSG does.

To that end, an SSG also helps you with a variety of conventions about how the content is written or what form the resulting static files should take. For a blog, those conventions include:

* Letting you write posts in markdown with hardcoded and calculated metadata
* Converting markdown to HTML
* Applying templates to data and HTML fragments to create a consistent set of final pages
* Generating feeds in formats like RSS
* Handling one-off pages like the About page
* Linking pages together

Individually, each of those transformations is straightforward.

To write this SSG from scratch, we’ll need a way to represent a site overall, a way to read and write content, and a way to specify all those small transformations.

## Plain objects and functions are all you need

A useful general principle in coding is to see how far you can get with plain objects and functions. (What JavaScript calls plain objects, Python calls dictionaries and other languages might call associative arrays.) When possible, functions should be pure, i.e., have no side effects.

So the basic strategy:

1. Read the folders of markdown posts and static assets into plain objects.
2. Use a sequence of pure functions to transform the posts object into new objects that are closer and closer to the form we want.
3. Create additional objects for paginated posts, the feeds, and the About page.
4. Put everything together into a single object representing the site’s entire tree of resources.
5. Write the site object out to the build folder.

## Idea 1: Treat a file tree as an object

Both a tree of files and a plain object are hierarchical, so we can use a plain object to represent a complete set of files in memory. The keys of the object will be the file names, and the values will be the contents of the files. For very large sites keeping everything in memory be an issue, but at the scale of a personal blog it’s generally fine.

If you’ve ever worked with Node’s [`fs`](https://nodejs.org/api/fs.html) file system API, then recursively reading a tree of files into an object is not an overly difficult task. The same goes for writing a plain object out to the file system. If you aren’t familiar with `fs` but are comfortable using AI, this is the sort of code that AI is generally very good at writing.

You can read my handwritten solution at [files.js](https://github.com/WebOrigami/pondlife-zero-deps/blob/main/src/files.js). You could just copy that.

## Idea 2: Map objects

The JavaScript `Array` class has a workhorse [`map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) function that lets you concisely apply a function to every item an array. Sadly the JavaScript [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) class is missing a corresponding function to map the keys and values of an object — but we can create such an object-mapping function ourselves:

```js
// Create a new object by applying a function to each [key, value] pair
export function mapObject(object, fn) {
  // Get the object's [key, value] pairs
  const entries = Object.entries(object);
  // Map each entry to a new [key, value] pair
  const mappedEntries = entries.map(([key, value]) => fn(value, key, object));
  // Create a new object from the mapped entries
  return Object.fromEntries(mappedEntries);
}
```

We can use this helper like this:

```js
import { mapObject } from "./utilities.js";

const object = { a: 1, b: 2, c: 3 };
const mapped = mapObject(object, (value, key) => [
  key.toUpperCase(),  // Convert key to uppercase
  value * 2,          // Multiply value by 2
]);
console.log(mapped);  // { A: 2, B: 4, C: 6 }
```

This little helper forms the core of our transformation work. Since we’re treating a set of files as an object, we can use this helper to transform a set of one kind of file to a set of different files, renaming the files as necessary.

We will also often want to just map the values of an object while keeping the keys the same, so a related `mapValues` helper handles that common case.

## Preparing the data for rendering

I find it useful to consolidate the work required to read in a site’s source content and prepare it in a single module. This does all the calculations and transformations necessary to get the content in a form that can be easily rendered to HTML, feeds, and other forms.

This project does that work in [posts.js](https://github.com/WebOrigami/pondlife-zero-deps/blob/main/src/posts.js), which exports an object with all the posts data ready for render. We can call that a data “pipeline”; it’s just a series of function calls.

The pipeline starts by using our `files` help to read in all the posts in the `/markdown` folder.




The pipeline starts with a reference to `markdown`. In this project, that ends up referring to the `markdown` folder at the top level of the project. Origami treats folder/file trees and objects the same, so if we were to render the post data at this point in YAML it would look like:

```
2025-07-04.md:
  title: Hello from the pond!
  @text: **Hey everyone!** Welcome to my very first blog post…
2025-07-07.md:
  title: Tiny home
  @text: When I first decided to move off-grid…
… more posts …
```

The next line, `→ =map(_, mdHtml)` sends the above to a built-in mapping function called [map](https://weborigami.org/builtins/tree/map.html). Here that will apply the built-in [mdHtml](https://weborigami.org/builtins/text/mdHtml.html) to each of the keys and values in the set. That will change the `.md` extension in the keys to `.html`, and change the markdown text to HTML. After this step, the post data is:

```
2025-07-04.html:
  title: Hello from the pond!
  @text: <strong>Hey everyone!</strong> Welcome to my very first blog post…
2025-07-07.html:
  title: Tiny home
  @text: When I first decided to move off-grid…
… more posts …
```

The next step in the pipeline is another `map`. This one calls a helper function `parseDate.ori` written in Origami that extracts the date from a post's key and returns it as a JavaScript Date object. The resulting date is added to the post as a `date` field so that templates will be able to use it as a date. The data now look like:

```
2025-07-04.html:
  title: Hello from the pond!
  @text: <strong>Hey everyone!</strong> Welcome to my very first blog post…
  date: Fri Jul 04 2025 12:00:00 GMT-05:00
2025-07-07.html:
  title: Tiny home
  @text: When I first decided to move off-grid…
  date: Fri Jul 07 2025 12:00:00 GMT-05:00
… more posts …
```

We'd like the page for an individual post to have links to the pages for the next and previous posts, so the next step in the pipeline calls [addNextPrevious](https://weborigami.org/builtins/tree/addNextPrevious.html) to add `nextKey` and `previousKey` properties to the post data:

```
2025-07-04.html:
  title: Hello from the pond!
  @text: <strong>Hey everyone!</strong> Welcome to my very first blog post…
  date: Fri Jul 04 2025 12:00:00 GMT-05:00
  nextKey: 2025-07-07.html
2025-07-07.html:
  title: Tiny home
  @text: When I first decided to move off-grid…
  date: Fri Jul 07 2025 12:00:00 GMT-05:00
  nextKey: 2025-07-10.html
  previousKey: 2025-07-04.html
… more posts …
```

Because the original markdown files have names that start with a date in YYYY-MM-DD format, by default the posts will be in chronological order. We'd like to display the posts in _reverse_ chronological order, so the final step of the pipeline calls [reverse](https://weborigami.org/builtins/tree/reverse.html) to reverse the order of the posts. The posts that were at the beginning will now be at the _end_ of the data:

```
… more posts …
2025-07-07.html:
  title: Tiny home
  @text: When I first decided to move off-grid…
  date: Fri Jul 07 2025 12:00:00 GMT-05:00
  nextKey: 2025-07-10.html
  previousKey: 2025-07-04.html
2025-07-04.html:
  title: Hello from the pond!
  @text: <strong>Hey everyone!</strong> Welcome to my very first blog post…
  date: Fri Jul 04 2025 12:00:00 GMT-05:00
  nextKey: 2025-07-07.html
```

This is assigned to the `data` variable so that it can be rendered into HTML by the other formulas in `site.ori`.


These steps could all be merged into a single pass but, to me, doing the transformations in separate steps makes this easier to reason about, inspect, and debug. It also means that transformations like pagination or adding next/previous links are independent and can be repurposed for other projects.

## Just use template literals

Most static site generators come with one or more template languages. For example, here’s the [PostFragment.astro](https://github.com/JanMiksovsky/pondlife-astro/blob/main/src/layouts/PostFragment.astro) template from the Astro version of this blog. It converts a blog post to an HTML fragment:

```
---
// A single blog post, on its own or in a list
const { post } = Astro.props;
---

<section>
  <a href={`/posts/${post.slug}`}>
    <h2>{post.frontmatter.title}</h2>
  </a>
  {
    post.date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
  <post.Content />
</section>
```

This isn’t that bad — although if you’re a JavaScript programmer, you can just use JavaScript template literals to do the exact same thing. Here’s the [postFragment.js](https://github.com/WebOrigami/pondlife-zero-deps/blob/main/src/templates/postFragment.js) function from the zero dependency version:

```js
// A single blog post, on its own or in a list
export default (post, key) => `
  <section>
    <a href="/posts/${key}">
      <h2>${post.title}</h2>
    </a>
    ${post.date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
    ${post.body}
  </section>
`;
```

It’s a matter of taste, but I think the plain JS version is basically as easy to read, 100% standard, and requires no build step. Best of all, any intermediate JavaScript programmer can read and understand it — including future me!

## Zero dependencies

I challenged myself to create this site with zero dependencies. That was mostly fine, but there were two places where I really wanted help:

1. Converting markdown to HTML. I’d always taken for granted that one needed to use a markdown processor so I wasn’t sure what I’d do here. Most processors have a ton of options, a plugin model, etc., so they certainly feel like big tools. But at its core, the markdown format is straightforward _by design_. Some searching turned up the minimalist drawdown processor that does [the markdown-to-HTML transformation in a single file](https://github.com/adamvleggett/drawdown/blob/master/drawdown.js) through repeated regular expression and string replacements. I copied that and [ported it to modern ES modules and syntax](https://github.com/WebOrigami/pondlife-zero-deps/blob/main/src/drawdown.js).
2. Rendering a JSON Feed object as RSS. This is mostly just string concatenation but I didn’t want to rewrite it by hand. I copied in an existing [JSON Feed to RSS](https://github.com/WebOrigami/json-feed-to-rss) module I’d written previously.

If I weren’t pushing myself to hit zero dependencies, I would just depend on those projects. But both of them are small; using local copies of them doesn’t feel crazy to me.

## Assembling the complete site as an object

[site.js](https://github.com/WebOrigami/pondlife-zero-deps/blob/main/src/site.js)

## A trick to inspect data from the command line

```console
$ ori src/posts.js/
```



```console
$ ori src/site.js/feed.json
```

## Building the static files

With all the groundwork laid above, the build process defined in [build.js](https://github.com/WebOrigami/pondlife-zero-deps/blob/main/src/build.js) is trivial:

1. Erase the existing contents of the `/build` folder.
2. Get the big object that represents the entire site.
3. Write the big object to the `/build` folder.

That’s it.

Note that, although this project has a “build”, that’s building the site — the project does _not_ have a traditional “build” step that compiles the code (using TypeScript, JSX, etc.) to generate the site.

## Impressions

This was pretty fun.

* It was easy to keep the entire process in my head, so I made steady progress the whole time. I don’t think I hit a single real roadblock or had to backtrack.
* Because I was working with plain objects and functions, there was literally no point at which I was confused about what was happening. Of course there were bugs, but they were easy to find and fix.
* There were a very few cases where I had to look up something, like the details of some Node `fs` API calls. I learned about the `fs.rm()` function, a call I’d somehow overlooked before that removes both files and folders. Everything I learned is something I’ll be able to apply in future projects.
* Since I was in complete control over the program, there was no point where I had to struggle with someone else’s opinion.

This took a day’s worth of work. That was distinctly less the time (half?) of what it took me to write the same blog in Astro. (I’m not knocking Astro; using any other SSG might have taken just as long.)

The bottom line is that it took me less time to write my own SSG for this blog from scratch than it did to try to configure and convince someone else’s SSG to make the same blog.

I think more people who assume they need an SSG should give at least a little thought to just writing it themselves along these lines.

## Why not build every site this way?

Sharing
Can be more concise