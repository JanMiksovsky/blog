---
title: 2024 was a good year — Web Origami year end project report
---

It’s always useful for me at the end of the year to reflect back on the past year’s work. I think this has been a great year for the Web Origami project and the Origami language.

## Goals for 2024

At the start of the year I set some specific goals for the project, all in service of building awareness of the project. These were all in addition to the regular investments in the Origami language, runtime, builtins, etc.

### Goal 1: Create a small but realistic sample application every month

I kept this up for six months, producing the set of apps on the [Examples](https://weborigami.org/language/examples.html) page:

- [All City Someday](https://all-city-someday.netlify.app/) — using Google Drive, reading photo metadata
- [Aventour Expeditions](https://aventour-expeditions.netlify.app/) — using Handlebars as a third-party template language
- [Cat Prints Store](https://cat-prints-store.weborigami.org/) — integrate a third-party shopping cart
- [Cherokee Myths](https://cherokee-myths.netlify.app/) — generate a table of contents, incorporate full-text search
- [Japan hike ebook](https://github.com/WebOrigami/japan-hike-ebook) — using ZIP/EPUB tree driver to create an ebook
- [pondlife](https://pondlife.netlify.app/) — sample blog, made available as origami-blog-start starter project

I’m quite happy with this set, and I think they’ve been helpful in illustrating some of what Origami can do.

Halfway through the year I felt like I’d reached the point of diminishing returns; adding one more to the set isn’t going to be the thing that tips the balance for a newcomer. And going forward actual user sites will also be good examples for others to follow.

### Goal 2: Daily efforts to promote Web Origami

Marketing doesn’t come naturally to me, so I tried to make myself spend substantial time doing it. I wanted reach out to at least one person each work day with an email, social media post, blog post, etc.

I was only able to keep this up for a few months before getting exhausted. As it turned out, that might have been enough anyway.

### Goal 3: Pitch Web Origami presentations to three conferences

I did this — but none of the conference accepted my talk proposals.

Submitting a conference proposal is real work, and I’ve come to believe that it’s a waste of my time.

- As a matter of policy, conference organizers give you zero feedback on your submissions so it’s hard to improve them.
- When I looked at talks that were ultimately accepted by these conferences, I was disappointed: many talks promoted technologies that already have a lot of awareness, so the conference just fanned the flames of something that’s already popular.
- The world of conferences is supported by payola: companies pay conference organizers a “sponsorship fee” to get a talk accepted. I can’t afford that, and in any event find the practice appalling. I sat through a one-day conference this year that felt like binging 10 hours of informercials.

The one conference I particularly wanted to speak at was the [StrangeLoop conference](https://thestrangeloop.com/). Sadly, in January 2024 I looked for their CFP and was crushed to learn that 2023 had been the final year of the conference.

I would love to present Origami at a conference at some point but can’t afford to waste more time on talk proposals that will just get rejected. I'll only invest the time to prepare a talk if invited to do so.

## Feature work

I am incredibly fortunate to be able to work on the Origami language full time. I was able to invest in a long list of new or improved features for the language. Most of the investments I made in the second half of the year were based on user feedback.

- [Alignment with JavaScript](https://weborigami.org/language/comparison): Origami is _JavaScript expressions plus paths_
  - Changed comment syntax to match JS
  - Changed template literal syntax and function signature to match JS
  - Added JS operators: math, logic, bit manipulation, comma
  - And eliminated some miscellaneous discrepancies
- New language features
  - [Template documents](https://weborigami.org/language/templatedocuments)
  - [Pipe operator](https://weborigami.org/language/syntax#pipe-operator)
  - [Spread operator](https://weborigami.org/language/syntax#spread-operator)
  - Unified [object literals](https://weborigami.org/language/syntax#object-literals) that support both eager and lazy property definitions
  - [Namespaces](https://weborigami.org/language/syntax)
- Fundamental concepts more rigorously defined
  - [Scope](https://weborigami.org/language/scope) now always depends on where an expression is located
  - [Unpacking files based on file extensions](https://weborigami.org/language/filetypes#unpacking-files) and allowing the definition of custom file extension handlers
  - [Trailing slash convention](https://weborigami.org/async-tree/interface#trailing-slash-convention) lets a tree indicate whether a given key represents a subtree
- New builtins
  - [`dev:breakpoint`](https://weborigami.org/builtins/dev/breakpoint)
  - [`dev:changes`](https://weborigami.org/builtins/dev/changes)
  - [`dev:log`](https://weborigami.org/builtins/dev/log)
  - [`package:`](https://weborigami.org/builtins/package) protocol
  - [`origami:basename`](https://weborigami.org/builtins/origami/basename)
  - [`origami:once`](https://weborigami.org/builtins/origami/once)
  - [`origami:post`](https://weborigami.org/builtins/origami/post)
  - [`origami:slash`](https://weborigami.org/builtins/origami/slash)
  - [`origami:version`](https://weborigami.org/builtins/origami/version)
  - [`site:audit`](https://weborigami.org/builtins/site/audit)
  - [`site:redirect`](https://weborigami.org/builtins/site/redirect)
  - [`site:slug`](https://weborigami.org/builtins/site/slug)
  - [`text:indent`](https://weborigami.org/builtins/text/indent)
  - [`tree:addNextPrevious`](https://weborigami.org/builtins/tree/addnextprevious)
  - [`tree:clear`](https://weborigami.org/builtins/tree/clear)
  - [`tree:paginate`](https://weborigami.org/builtins/tree/paginate)
- Substantially overhauled builtins
  - [`site:crawl`](https://weborigami.org/builtins/site/crawl)
  - [`site:rss`](https://weborigami.org/builtins/site/rss)
- File handlers
  - [JPEG image files](https://weborigami.org/language/filetypes#jpeg-image-files)
  - [WebAssembly files](https://weborigami.org/language/filetypes#webassembly-files)
- New extensions
  - [Dropbox extension](https://github.com/WebOrigami/extensions/tree/main/dropbox)
  - [EPUB extension](https://github.com/WebOrigami/extensions/tree/main/epub)
  - [Google Drive extension](https://github.com/WebOrigami/extensions/tree/main/gdrive)
  - [Handlebars extension](https://github.com/WebOrigami/extensions/tree/main/handlebars)
  - [Pagefind extension](https://github.com/WebOrigami/extensions/tree/main/pagefind) for full-text search
  - [ZIP extension](https://github.com/WebOrigami/extensions/tree/main/zip)
- Performance improvements
- Improved error messages
- All builtins documented on site
- [Microsoft VS Code language support](https://marketplace.visualstudio.com/items?itemName=WebOrigami.origami-vscode-extension) for Origami syntax highlighting

## User sites and community

By far the most exciting news this year was that people began using Origami to make sites with it. At the beginning of the year I was the only one with Origami sites in production; now there are a couple of user sites and a few more are in development.

These early adopters provide invaluable feedback on what kinds of sites real people want to make, and whether Origami makes it easy for them to make those kinds of sites.

I’m looking forward in 2025 to fostering the community of Origami users and directing substantial investments in the project based on their feedback.
