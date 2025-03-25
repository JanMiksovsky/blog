---
title: Pull your documentation site content from your own GitHub wiki
---

The open source WESL (#WebGPU Shading Language) project recently launched a new [WESL documentation site](https://wesl-lang.dev). While helping the group create their site, I realized they could pull their markdown content directly from the places they already keep it.

<a href="https://wesl-lang.dev">
  <img alt="WESL project documentation site" src="/images/2025/03/wesl.png" class="screenshot">
</a>

A key question for any documentation project: **how and where should the manually-authored content be stored?**

The WESL project maintains two collections of markdown content aimed at different audiences:

* The [WESL wiki](https://github.com/wgsl-tooling-wg/website/wiki) has how-to guidance for devs that want to use WESL in WebGPU projects.
* The [WESL spec](https://github.com/wgsl-tooling-wg/wesl-spec) is a collection of more formal documents for implementers.

These collections work well just as they already are, so I thought it’d be good to let the documentation site pull content from these sources using [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules). The spec is a regular git repository, and behind the scenes [a GitHub wiki is a git repository](https://gist.github.com/subfuzion/0d3f19c4f780a7d75ba2) too.  Submodules introduce complexities and are not for everyone, but here they let the site project access both repos locally as subfolders.

It was easy to write a [program](https://github.com/wgsl-tooling-wg/website/blob/main/src/site.ori) in [Origami](https://weborigami.org/language) that pulls content from these subfolders, transforms the markdown to HTML, and pours the HTML into a page template.

* The Origami site definition added navigation links, including a pop-up navigation menu for small window sizes.
* The wiki and spec both link to each other. A small JavaScript function fixes up those links; the Origami program can easily call that for each document.
* I was happy to discover that using a standard HTML `<details>` element with absolute positioning could do the heavy lifting for a reasonable pop-up menu with very little client-side JavaScript.
* Adding full-text search to the complete document collection was just a one-liner via the [Origami pagefind extension](https://github.com/WebOrigami/extensions/tree/main/pagefind).

Using git submodules means that wiki or spec updates don’t automatically appear on the documentation site; someone has to go into the site project and pull the latest wiki and spec changes. Having a manual step like that might count as an advantage or a disadvantage depending on your situation.

I was really happy with how small the source for this project ended up being. Setting aside the HTML templates, only ~200 lines of Origami and vanilla JavaScript are required to define the entire site and the client-side behavior.

```console
      13 src/docPage.ori
      75 src/adjustMdLinks.js
      13 src/specPage.ori
      32 src/site.ori
      75 src/assets/main.js
     208 total
```

This is *tiny*. Origami is a general-purpose system for building sites; it’s not specifically a documentation site generator. This small amount of code defines a bespoke documentation system from scratch.

Using a wiki for documentation this way is really interesting! Project contributors can freely edit wiki pages using familiar tools, then have all that content turned into a static documentation site that project users can freely browse.