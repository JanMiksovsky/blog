---
title: Cherokee Myths sample Origami site with a table of contents and full-text search
date: 2024-01-16
---

I built a sample [Cherokee Myths](https://cherokee-myths.netlify.app) site to explore how easy it is to create a static site in [Origami](https://weborigami.org/language) that includes a generated table of contents and full-text search. I'm happy with how the site turned out. <!-- #smallweb #indieweb -->

![Cherokee Myths site home page with a table of contents listing myths grouped by topic](/images/2024/01/mythsHome.png)

As described in the [site source](https://github.com/WebOrigami/cherokee-myths), the site's overall structure is defined in a single concise Origami file that orchestrates the creation of the table of contents on the home page, the generation of search indexes, and the processing of the tree of markdown content into HTML.

![Diagram of navigational structure of the Cherokee Myths site](/images/2024/01/myths.svg)

The tree of stories is flattened by a template to create the table of contents, and that same tree is also fed to a great tool called [Pagefind](https://pagefind.app) to generate search indexes to allow full-text search on the static site.

![Search page showing that "hummingbird" produces two hits](/images/2024/01/mythsSearch.png)

Using public domain content for this sample was way more interesting than lorem ipsum text, and the Cherokee myths have a distinctly different mood than Greek myths or Aesop's fables. The tale of the [The Race Between the Crane and the Hummingbird](https://cherokee-myths.netlify.app/stories/birds/the%20race%20between%20the%20crane%20and%20the%20hummingbird) did not end the way I'd expected.

![Cherokee Myth of the Race Between the Crane and the Hummingbird](/images/2024/01/mythsRace.png)

This sample also gave me a chance to place with two recent CSS additions: `text-wrap: balance` so that long headings end up with lines roughly equal in length (instead of a long line followed by an orphaned word), and `initial-letter` to add a drop cap at the start of the story text.
