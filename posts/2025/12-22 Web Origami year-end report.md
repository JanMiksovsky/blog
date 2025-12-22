---
title: 2025 Web Origami year end report
draft: true
---

## Goals for 2025

My top-line goals for 2025 were:

😐 **Nurture a small, healthy, respectful user community.** I'm happy that the small circle of existing Origami users seem happy with the system and continue using it. A number of new people tried Origami as well, although most of them fell into the "lurker" category; I have no idea whether they are still using it or, if not, why it didn't meet their needs. So pragmatically speaking, I didn't do as well on this goal as I'd hoped. One new Origami site, the [documentation for the open-source WESL project](https://wesl-lang.dev/), was interesting to me because it uses a GitHub wiki as the content management system.

😃 **Make it easier for users to make sites they’re happy with** through docs, bug fixes, and features. Most of the work I did this year was driven by user feedback. Some existing users moved additional projects of theirs from other systems to Origami, a good indication of user satisfaction.

The big feature investments I aimed to make in 2025 were:

😃 **Language Server Protocol implementation**. I wanted to implement an [LSP](https://en.wikipedia.org/wiki/Language_Server_Protocol) server so that development tools like Microsoft VS Code (and others) could provide code completion and inline error feedback. An LSP is a complex beast, and tackling this goal was a significant undertaking. The LSP is now part of the [Origami VS Code extension](https://github.com/WebOrigami/origami-vscode-extension) and [published in the VS Code marketplace](https://marketplace.visualstudio.com/items?itemName=WebOrigami.origami-vscode-extension).

😃 **Screencast engine.** I wanted a way of introducing new users to Origami through a media somewhere between a video and traditional documentation. A video is insanely time-consuming to produce and can't be kept up to date; traditional docs are easier to maintain but less interesting to newcomers. I developed a [system for creating comics](https://jan.miksovsky.com/posts/2025/01-22-motion-comic-origami-introduction) and published an initial [introductory comic](https://origami-comics.netlify.app/). I've always loved comics and am delighted with how this turned out. I have more plans for the comics system in 2026.

😐 **Feature complete for JavaScript expressions.** I mostly accomplished what I wanted, which was feature parity with JavaScript expressions, but during the year I moved the goal posts. I ended up investing far more in this area than I'd expected; see below. There are still a few remaining [unsupported JavaScript features in Origami](https://weborigami.org/language/expressions#unsupported-javascript-features) that I'm looking forward to implementing.

☹️ **Inspector/debugger.** My plan was to create a browser-hosted tool that lets a user interactively inspect the call tree of an Origami file so they can more easily diagnose errors and better understand how their code works. I spent a month on this, but it proved to be a bigger job than I'd expected and I ultimately set it aside to pursue other priorities. I plan on trying this again in 2026.

## JavaScript with paths

The Origami language has evolved in stages, growing closer and closer to JavaScript, but at the beginning of 2025 there were still distinct differences.

Chief among them was that Origami required the `/` slash operator as a way of extracting a property from an object. Instead of writing `post.title` like in JavaScript, you had to write `post/title`. Origami used a slash to preserve the use of the `.` period as a valid character in file names like `data.json`.

Feedback from Origami users indicated that this difference in syntax presented a persistent stumbling block, and I eventually developed a [file name heuristic](https://weborigami.org/language/expressions#file-name-heuristic) that lets the Origami parser determine whether a `.` period represents part of a file name or a property access. The parser can handle expressions like `data.yaml[0].name` and generally do what users expect.

This change was a small but important step forward towards turning Origami into a dialect of JavaScript: "JavaScript with paths". To that end, other important changes included:

- Redefining all builtins as global objects, just like JavaScript, so the old syntax `tree:map` became the JS-style call `Tree.map()`.
- Supporting JavaScript keywords like `new`. Old syntax: `new:@js/Date("2025-12-31")` is now `new Date("2025-12-31")`, just like JavaScript.

## Map-based trees

Another significant foundational change this year was in the way Origami represents hierarchical tree-like structures. The higher levels of the Web Origami project rest on a foundational notion of a tree of nodes that may require asynchronous calls to traverse. For the past few years, these trees have been defined by a small proprietary interface, essentially a stripped-down version of the standard JavaScript `Map` class. Origami didn't use the `Map` class itself because it was some quirks.

However, experiments suggested ways to work around those quirks, so I rewrote the foundations of Origami to use `Map` [as a general interface](https://weborigami.org/async-tree/interface).

Now most of the tree structures you work with in Origami, including those based on in-memory objects, the file system, and local data like JSON/YAML files, are represented with standard `Map` instances. Because `Map` doesn't support async calls, Origami uses an async variation called `AsyncMap` to represent network resources.

These architectural changes also necessitated extensive revision of Origami's documentation, including a [completely rewritten pattern walkthrough](https://weborigami.org/pattern/) discussing the use of `Map`-based trees to represent a wide variety of data sources and operations.

## Other additions

Along the way there were many other additions to Origami:

- [`Tree.filter`](https://weborigami.org/builtins/tree/filter) builtin for filtering a tree based on a condition
- [`Tree.mask`](https://weborigami.org/builtins/tree/mask) builtin for filtering a tree based on conditions defined in a second tree
- [`Tree.globKeys`](https://weborigami.org/builtins/tree/globkeys) builtin to support filtering based on Unix-style [glob](<https://en.wikipedia.org/wiki/Glob_(programming)>) patterns like `*.jpeg`
- [`Tree.regExpKeys`](https://weborigami.org/builtins/tree/regexpkeys) builtin to support filtering based on JavaScript regular expressions
- [`Origami.mdOutline`](https://weborigami.org/builtins/origami/mdoutline) builtin to extract the tree structure of markdown content, e.g., to generate navigation elements
- [non-enumerable property](https://weborigami.org/language/expressions#non-enumerable-properties) syntax
- More forms of [Origami template documents](https://weborigami.org/language/templatedocuments)
- [CSV](https://weborigami.org/language/filetypes#comma-separated-values-files) file support for comma-separated values
- [TSV](https://weborigami.org/language/filetypes#tab-separated-values-files) file support for tab-separated values
- [Shell script](https://weborigami.org/language/filetypes#shell-script-files) file support for calling shell scripts
- Substantially improved web crawler for [`Dev.audit`](https://weborigami.org/builtins/dev/audit) and [`Dev.crawl`](https://weborigami.org/builtins/dev/crawl)
- [Angle bracket paths](https://weborigami.org/language/expressions#angle-brackets) like `<path/to/file.txt>` for unambiguous file references
- JavaScript expression operators: `await`, `in`, `instanceof`, `new`, `typeof`, `void`
- [esbuild extension](https://github.com/WebOrigami/extensions/tree/main/esbuild) for bundling resources
- [json-schema extension](https://github.com/WebOrigami/extensions/tree/main/json-schema) for data validation
