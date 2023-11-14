---
title: Appreciations
date: 2023-11-14
---

In a humane world, people would _start_ interacting with an open source project by saying “I ❤️ your work” and “Here’s what I’m using it for.”

In our world, the first time a maintainer learns of a customer’s existence is usually when the customer files a bug. That’s like walking up to an author you’ve never met and opening with “Here’s what I hate about your book…"

That’s shitty behavior in real life, and just because we’ve somehow tolerated it in the industry doesn’t mean it can never be fixed. Repos could, say, have a means by which customers can introduce themselves, say what they like, and describe how they’re using the project.

![](/images/2023/11/Appreciations.png)

Since we don’t have that world yet, I’m making an effort to proactively and publicly praise projects I like. I’ll start by acknowledging the great work of [Joe Hildebrand](https://hachyderm.io/@hildjj) and the other contributors on the [Peggy parser generator for JavaScript](https://peggyjs.org). It’s a nice project, and just what I needed!

I’d handwritten a parser combinator for [Graph Origami](https://graphorigami.org), a good way to start but had poor performance. I decided to try writing a parsing expression grammar (PEG) using the Peggy parser generator. The docs and sample grammars were helpful, and the long life of Peggy and its predecessor peg.js meant ChatGPT could help answer questions for me. Porting to a new Peggy-based parser only took a day. The new parser is faster, doing the same work in 10–15% of the time.
