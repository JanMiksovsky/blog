---
title: "Static site generators like #Astro are really complex for the problems they solve #smallweb #indieweb"
---

I took my best shot at recreating a small blog in [Astro](https://astro.build/) so I could compare [Web Origami](https://weborigami.org) with a popular static site generator (SSG) like Astro for building sites.

* I was able to port the blog to Astro, although the port took the better part of two days — more work than I’d expected.
* Astro imposed some constraints that forced me to deviate from how I wanted to make my site.
* Like many SSGs, Astro covers up parts of the web and Node.js with proprietary languages and abstractions. I find Astro’s replacements more complex than the foundation it’s built on.
* I came away from the experience with a sense of why people like Astro — but also a feeling that most SSGs are overpowered for the problems most bloggers are trying to solve.

** image of Astro home page **

First, though: **I love that people love Astro!** Anything that makes people more likely to create a site is *fantastic*. If you’re an Astro fan, you’re all set.

But if you’re shopping for a way to make a simple site and have heard that Astro (or any other popular site generator) is “simple”, here’s a different opinion.

Astro can be used for a variety of purposes, including dynamic sites, but for this project I used Astro exclusively as a static site generator.

You can look at the final Astro blog [source code](https://github.com/JanMiksovsky/pondlife-astro) and the [live site](https://pondlife-astro.netlify.app/).

## Requirements

My goal was to port my existing sample [#pondlife](https://pondlife.netlify.app/) blog to Astro. This blog reimagines Henry David Thoreau as a modern off-the-grid lifestyle influencer. The site is simple but representative of how a small personal blog might start.

** pondlife image  **

Taking the existing blog as a reference for how I want to set up the Astro blog, here are my requirements for the ported source code (things that only matter to me as the author):

1. The blog posts go in a top-level `/markdown` folder.
2. Each markdown post has a name containing a date like `2025-07-04.md`; this date should be used as the date for the post. Each post has YAML front matter containing a `title` property. The body of the post is markdown that should be converted to HTML.
3. The images for the posts go in an `/images` folder.
4. The site’s static assets go in `/src/assets`.
5. A standard page template is used for all posts to provide consistent headers, footers, etc.
6. The project output goes in the `/build` folder.

And here are my requirements for the final site (things end users can see):

7. Posts appear in reverse chronological order.
8. The site’s `/posts` area offers direct links to all individual posts, with a URL like `/posts/2025-07-04.html`.
9. Posts have links to older/newer posts.
10. The site’s `/pages` area offers the posts grouped in sets of 10, e.g., `/pages/1.html` contains the first 10 posts.
11. Those grouped pages have links to older/newer pages.
12. The site’s `/index.html` home page shows the same content as `/pages/1.html`.
13. The blog supports feeds in RSS and JSON Feed formats.
14. An additional `/about.html` page offers information about the site using content drawn from a page at `/src/about.md`.

I was ultimately able to get the project to meet all of the second set of requirements but not all of the first.

## Getting started

Given that people had described Astro as simple, I was surprised how heavy it felt.

I started with an empty project, rather than cloning a template project, so that I could understand every step. A clean install of Astro includes 100MB of `node_modules`.

To define the core `/posts` area, I created a folder structure following Astro guidelines, including a `/src/posts/[slug].astro` file that would do the work of rendering pages in that area. Using the file system in this way to sketch out the site seems reasonable and works fine.

That `[slug]` file name hints at magic that will turn a request for a page route into a runtime parameter that can be referenced by your code. That’s okay, I guess, although I generally prefer explicit control over magic.

## Neither HTML nor JSX

The body of the `[slug].astro` page defined the markup for a post.

*** [slug.astro]

This markup looks roughly like HTML but it’s not — it’s JSX. Oh, wait, no it’s not JSX; it’s Astro’s own JSX-inspired template language.

Many SSGs supply a template language — but I didn’t want to have to learn a new one. Any time you use an SSG, what are the odds you’re going to use the same SSG on your next project — 80%?
It’s annoying to learn something proprietary when a standard (or common) solution would suffice.

In any event, porting the blog’s original templates to Astro template language wasn’t too much work. As with JSX, I kept getting tripped up by things in Astro that don’t feel like HTML. Example: JSX and Astro don’t want you to put quotes around an attribute value in something like this:

```
<a href={post.slug}>
```

My HTML brain *really* wants to put quotes around that attribute value. I keep thinking of this as a JavaScript template literal, where data is inserted inside `${ }` as is. Astro’s `{ }` placeholder here feel more tricksy, with some knowledge of what data is being rendered and when quotes are required.

That’s just me. Perhaps you completely get JSX and will completely get Astro markup.

## Not standard JavaScript

I’d thought of `[slug].astro` as a page for an individual post — but it’s also where you must write a `getStaticPaths()` function to tell Astro about your *collection* of posts. It took some trial and error for me to write that function so Astro could process all the posts in the `/markdown` folder.

Astro promotes a way of reading in a bunch of files via a method called `import.meta.glob`. That _looks_ like a part of the web platform but it’s not — I think Astro’s underlying Vite server is hacking that in?

That hackery feels like the JavaScript global-hacking common in the late 2000s and early 2010s that the world eventually realized was a terrible idea and abandoned.

* You might think you can go to the [`import.meta` documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta) to understand what `.glob` does. Nope.
* Imagine this `.glob` idea became wildly successful and someday someone wanted to make it part of the actual web. History shows the standard version of the proprietary idea will be different and not backward-compatible — so the standard thing will definitely _not_ be called `import.meta.glob`! Doing that would break all the existing Astro sites. So in trying to make something _look_ standard, Astro/Vite has prevented it from ever becoming the actual standard.
* Even if you like this API, you can’t use it anywhere else but an Astro (or Vite?) project.

The function of `import.meta.glob` could just have been a regular JavaScript import. This would not only be simpler to understand, it would have allowed the solution to be used in other places. I assume this weird fake-standard solution was adopted to save something like a line and a half of plain JavaScript code, which doesn’t seem worth it to me.

## Content collections

Having gone through the trouble of defining the collection of posts, I was a little surprised I couldn’t find some easy way to refer to that collection elsewhere. For example, I needed to included all those posts in the RSS feed (below), but as originally written, my posts collection was only defined for the `/posts` route.

I eventually discovered Astro’s newer [content collections](https://docs.astro.build/en/guides/content-collections/) feature, which appears less magic and so conceptually cleaner.

That said, content collections are more complex, and I struggled to get them to work. I eventually gave up and factored my functioning `import.meta.glob` solution into its own file so I could `import` that wherever I needed it.

## When you say “never”, do you mean…

In the original blog, the posts live at URLs with this format: `/posts/slug.html`. I could not get Astro to support that.

Instead, Astro really, really wants me to publish posts at `/posts/slug/index.html`. That URL format is a common and reasonable one — but it’s not the only format, and it’s limiting to enforce that.

I eventually discovered a configuration option `trailingSlash: "never"` that appeared to give me what I want. While trying Astro’s preferred RSS solution, I also had to set a separate configuration option with a confusingly different syntax, `trailingSlash: false`.

This was all annoying but par for the course. What was genuinely frustrating is that the `trailingSlash: "never"` option appears to only affect dynamic routes at runtime. The option is ignored at build time, so I still ended up with post pages like `/posts/slug/index.html`.

Aside: I’ve deployed this Astro blog on Netlify, which happens to have a [pretty URLs](https://docs.netlify.com/configure-builds/file-based-configuration/#pretty-urls) feature that treats `/posts/slug.html` and `/posts/slug/index.html` as equivalent. So with this particularly host, I get what I want — but I don’t like depending on host URL magic, and I don’t like the lack of control.

Complex tools like Astro make decisions for you, which can make it easier to get started but harder to get what you want. Sometimes there are configuration options; sometimes even those won’t do what you want.

## Configuration oddity

Speaking of configuration, you configure Astro in an `astro.config.js` file like this:

```js
// astro.config.js

import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://pondlife-astro.netlify.app",
  trailingSlash: "never",
});
```

What caught my attention here was the special `defineConfig()` method — why isn’t this file just exporting a JavaScript object like many other tools?

The [Astro Configuration Overview](https://docs.astro.build/en/guides/configuring-astro/) answers: “The `defineConfig()` helper provides automatic IntelliSense in your IDE and is where you will add all your configuration options to tell Astro how to build and render your project to HTML.”

So Astro is encouraging me to do something in a proprietary way in order that, for the few minutes I’m typing in the configuration file, I have some extra help there. I’m already looking at the config file docs — how else am I going to really understand what these options do? — so this whole `defineConfig()` feature feels like it’s solving a problem I don’t have.

I tried dropping the `defineConfig()` call and just exporting the object, and that actually worked! I wish the docs just promoted that instead.

## Complying with their opinion

Astro’s [Project Structure](https://docs.astro.build/en/basics/project-structure/) documentation does say: “Astro leverages an opinionated folder layout for your project.” That opinion is part of their value proposition — they’ve worked out a good project structure so that you don’t have to spend time thinking about it.

That said, when you’re setting up a blog, you have your own reasons for wanting to put files in specific places. For example: if you’re working in an image editor and need to keep specifying an export folder, it’s nice to have the target folder of images be as close to a project’s top level as possible.

In my case, I wanted to be able to keep the post text in a top-level `/markdown` folder and the corresponding images in a top-level `/images` folder.

So when Astro said it had opinions about folder layout, I’d assumed I could override that opinion through configuration. Indeed, I was able to write code to load the posts from `/markdown`.

But Astro forced me to put all the static resources like images inside a `/public` subfolder like `/public/images`. I couldn’t find any way to configure around that, which was disappointing.

## Couldn’t get RSS helper to work

Astro’s documentation recommends [using a helper package to generate an RSS feed](https://docs.astro.build/en/recipes/rss/) from a data object containing the desired posts and metadata.

That’s a great approach! That object schema is proprietary; I’d prefer to see the data object constructed following the [JSON Feed](https://www.jsonfeed.org/). That supports the same information while also being a useful feed format itself.

I couldn’t actually get that `@astrojs/rss` package to work as advertised — it kept trying to decode HTML entities like `<` in tag names to `&lt;`. I tried to follow the documentation pattern as closely as possible but was unable to figure out how to resolve the problem after searching, reading docs, and reading issues.

After wasting over an hour on it, I gave up and just reused a function I’d written elsewhere for generating RSS.

I assume I was just missing something simple here, so I won’t count this as an Astro issue. That said, I was surprised I couldn’t find a solution to a problem pertaining to RSS feeds, a fundamental blog feature.

## Covering up Node.js

Because I was using Astro with Node.js, I was stunned by this statement in the Astro [Imports reference](https://docs.astro.build/en/guides/imports/) documentation:

> We encourage Astro users to avoid Node.js builtins (fs, path, etc.) whenever possible. Astro is compatible with multiple runtimes using adapters. This includes Deno and Cloudflare Workers which do not support Node builtin modules such as fs.

I don’t use Cloudflare Workers so I’ll take Astro’s assertion at face value. But I’d always thought that Deno had a compatibility layer for Node.js. Indeed, Deno indicates that [you can use Node’s built-in modules in Deno](https://docs.deno.com/runtime/fundamentals/node/#using-node's-built-in-modules). Maybe there are some subtleties to Deno compatibility?

I’m sure there are some Astro customers who care a lot about those other runtimes — but surely that’s a minority of their users? Perhaps I’m confused about their core audience.

If I’m using Astro as an SSG to make a basic blog, I don’t care about those other runtimes. And if you are looking at Astro to make a basic blog, then very likely you don’t care about those other runtimes either.

Astro’s vision of abstracting itself on top of multiple platforms imposes a real cost in complexity. It’s also clear that they want you to _only_ use their APIs — which will make it hard for you to migrate away from Astro. And when you eventually create a site in a different system, knowledge of Astro’s proprietary API won’t help you.

## The silly Astro toolbar

When testing my blog, I noticed an odd visual glitch at the bottom of the page:

![Blog page with an unlabeled black bar at the bottom](/images/2025/04/mysteryGlitch.png)

I thought this was a bug. When I went to inspect it, this appeared:

![Astro popup advertisement](/images/2025/04/astroToolbar.png)

So this is an Astro toolbar. Most of the “features” in the toolbar are links to Astro documentation.

I’m really baffled by this.

* I already had to find the Astro documentation to get started. Why did Astro think I need more ways to get to the docs from inside my running site?
* I’m trying to make a _static site_ with HTML and CSS only. I don’t want _any_ JavaScript anywhere near my site. Get that stuff away from me.
* The toolbar made me think: Gosh, what other JavaScript is being loaded by this page? Answer: 1.75MB of JS. I was expecting a tiny bit of code to support hot reloading, but that’s huge. If I were writing client-side JavaScript for these pages, that’s 1.75MB of unknown code that can potentially conflict with code I’m writing.
* Ironically, the current [Why Astro?](https://docs.astro.build/en/concepts/why-astro/) page specifically says: “Zero JS, by default: Less client-side JavaScript to slow your site down.”
* This just looks like an ad — an ad Astro has placed without permission _in my own site_. It makes it feel like I don’t control my own site. Ick.

Yes, the silly toolbar won’t appear in production. Yes, there’s a configuration option that can turn off this silly toolbar in development.

But the damage is done: all this silly toolbar accomplished was to make me deeply suspicious of Astro’s intentions.

## Impressions

It took me the better part of two days to port this blog, which felt long. Your mileage may vary.

The things I liked about Astro:

* Having Astro give you the confidence to make a site is good
* Using the file system for routing is reasonable
* Hot module replacement is nice
* Astro’s documentation is quite good
* Astro’s contributors are clearly committed to quality
* Having a large user community is great

The things I didn’t like:

* So many things felt unnecessarily complicated
* I couldn’t put my static assets where I wanted
* I couldn’t use the URL scheme I wanted
* I struggled to define my content collection
* I struggled to define an RSS feed
* Silly toolbar ad thing

Although people had told me Astro is “simple”, I thought it was fairly complex. My largest issue with Astro and SSGs like it is that I couldn’t easily construct a mental model of how it worked. I was looking for some overall picture that said: “Here’s the step-by-step process of what Astro does when it builds your site…” but could not find that.

That’s a big request! Going through this with Astro made me appreciate the difficulty of going through a similar process with my own project.

## Is all this complexity necessary?

Stepping back, what work is actually required to statically generate a blog site?

* Represent the complete site in a coherent way
* Read in a folder of markdown posts with hardcoded and calculated metadata
* Convert the markdown to HTML
* Apply a template to turn those posts into final pages
* Generate feeds like RSS
* Handle one-off pages like the About page
* Link everything together
* Write all the pages out to the file system

Here’s the thing: *none of those individual tasks is that much work*.

To prove that, I want to rewrite this sample blog again, this time in vanilla JavaScript with no dependencies. I predict this will take *slightly* more code but will be just as functional, more standard, and more comprehensible.