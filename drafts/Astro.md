---
title: Static site generators like #Astro are way too complex for the problem they solve #smallweb #indieweb
---

Part 1 of N

I took my best shot at recreating a small blog in [Astro](https://astro.build/) so I could provide developers with a more informed comparison of [Web Origami](https://weborigami.org) with contemporary static site generators (SSGs) for building sites. Summary:

* I was able to rebuild the blog and develop some sense of why people like Astro — but I also came away from the experience feeling that most SSGs are ridiculous overpowered for the problem they’re trying to solve.
* SSGs impose subtle constraints that, depending on your situation, might force you to deviate from making your site they way you want.
* SSGs tend to cover up many parts of the web platform, sometimes managing to make it both more complex and more limited. You are better off learning the underlying technologies, which you can then apply to other projects for the rest of your life.

** image of Astro home page **

Note that **I love that people love Astro!** Anything that makes people more likely to create their own site is *fantastic*. If you’re an Astro fan, you’re all set; no part of my personal experience takes anything away from you. But if you’re shopping for a way to make a simple site, and are hearing that Astro (or any other popular site generator) is the new hotness, maybe my notes can help you make an informed decision.

It’s worth noting that Astro can be used for a variety of purposes, including dynamic sites. For this project, I’m focused exclusively on Astro as a static site generator.

## Stating the goal

My goal was to completely recreate the [#pondlife](https://pondlife.netlify.app/) sample blog, which playfully reimagines Henry David Thoreau as a modern off-the-grid lifestyle influencer. [Source](https://github.com/WebOrigami/pondlife)

** pondlife image  **

Using the existing blog as a reference, here are some requirements for the Astro rewrite.

Requirements for source repository structure (things that only matter to me as the author):

1. The blog posts are in a `/markdown` folder. Each markdown post has a name containing a date like `2025-07-04.md`; this date should be used as the date for the post. Each post has YAML front matter containing a `title` property. The body of the post is markdown that should be converted to HTML.
2. The images for the posts are in a `/images` folder
3. The site’s static assets are in `/src/assets`
3. The project is built with `npm run build`
4. The project output goes in the `/build` folder
5. A standard page template is used for all posts to provide consistent headers, footers, etc.

Requirements for the resulting site (things end users can see):

6. Posts are sorted in reverse chronological order
7. The site’s `/posts` area offers direct links to all individual posts, with a URL like `/posts/2025-07-04.html`
8. The site’s `/pages` area offers the posts in sets of 10, with pages like `/pages/1.html` that contain the first 10 posts, and with links to older/newer posts
9. The site’s `/index.html` home page shows the same content as `/pages/1.html`
10. The blog supports feeds in RSS and JSON Feed formats
11. An additional `/about.html` page offers information about the site using content drawn from a page at `/src/about.md`

## Getting started

100MB of node_modules

Need 20+ lines of JS boilerplate in front matter to define a collection
Not sure how I would know how to write that unless I copied it
Uses import.meta.glob, which looks standard but isn’t; it’s provided by Vite

Uses HTML which looks standard but isn’t; it’s Astro’s own JSX-inspired template language

Changing extension feels clunkier than in Origami map

Accessing metadata via post.frontmatter.title is nice, wordier than Origami but clear

Didn’t want URLs like /pages/slug/index.html, wanted /pages/slug.html

Possible with a config

trailingSlash: “never”

Later had to also set `trailingSlash: false` for RSS https://docs.astro.build/en/recipes/rss/#removing-trailing-slashes

This seems to only affect dynamic routes at runtime, static routes still aren’t what I want

I think of [slug].astro as a page for an individual post — but it’s also where a getStaticPaths() function is required to provide the set of pages for that route

## Astro is several languages

.astro body is its own JSX-ish template language, which itself is an HTML-ish markup language

.astro front matter is mostly JavaScript, with an odd import.meta.glob thing that looks like it’s standard — import.meta is — but is actually some feature injected by Vite. 

Why not just make that a package import?

[slug].astro is a micro-language in a file name

Really strange statement:
“We encourage Astro users to avoid Node.js builtins (fs, path, etc.) whenever possible.”

Integrations: add functionality, never really clear how

Astro wants all static resources in /public

But I don’t want that

## Defining the collection of posts

Didn’t like import.meta.glob, Astro content collections https://docs.astro.build/en/guides/content-collections/ look cleaner and less magic

Really tried to make them work, couldn’t

Seems like they want you to put content collections in /src/content folder

but I’m already unhappy about having to not have the blog images at the top level

Gave up

## Configuration feels a little weird

astro.config.js feels weird

Requires the astro/config package

Has a special defineConfig method

This lets you pass in a JavaScript config object

Can’t see how to reference this elsewhere, although it does get magically passed around

Tried to import the config, that doesn’t work

Why not just let someone export an object?

## Couldn’t get RSS helper to work

There’s an RSS helper package

Wants data in a reasonable format

But if you’re creating an object anyway, why not use JSON Feed format and end up with the data that can be served directly in a useful form?

It kept trying to decode HTML entities like `<` in tag names
Despite following their pattern as closely as possible, calling sanitize-html, etc.

After wasting over an hour on this, I gave up and just reused my own rss function

I could not find the answer in an hour of searching, ChatGPT, reading docs, reading issues

I’m willing to assume I was missing something simple here

## The silly Astro toolbar

When running, I noticed an odd little thing at the bottom of the page

This proved to be an Astro toolbar

Most of the features in the toolbar were links

Isn’t that what docs are for? Do I really need help finding the docs?

I’m not sure why they thought I’d want to be opted into that

I’m writing a static site!

This makes me trust Astro less

The toolbar made me thought to check whether the page is loading JS

1.75MB of JS

whyyyyyy?

This is a static site

## Result

** link to source **
** link to demo **

## Impressions

Hot module replacement is nice
Docs are good
Having a model provided to you is good
Contributors are clearly committed to quality
Having a large community is good

## What I couldn’t do
