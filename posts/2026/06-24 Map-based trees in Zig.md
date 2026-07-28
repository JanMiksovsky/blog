---
title: Map-based trees in Zig
---

For a while now I've used a reference blog called [#pondlife](https://pondlife.netlify.app) to explore various tools and ideas for constructing sites. All the #pondlife implementations build the exact same blog, and trying to enforce a consistent set of [user-defined requirements for the source content](https://github.com/WebOrigami/pondlife#requirements) makes it much easier to make apples-to-apples comparisons.

Origami uses a foundational [map-based tree](https://weborigami.org/async-tree/mapbasedtree) pattern to model the construction of sites like #pondlife. I recently became interested in the question of how hard it would be to implement that pattern in a compiled, strongly-typed language with explicit memory allocation. I haven't written C or C++ in decades, but [Zig](https://ziglang.org) seemed interesting to me. Among other things, Zig seems highly aligned with the Web Origami philosophy of building software artifacts directly on top of a platform using explicit code.

My intention was to explore map-based trees in Zig, not become a Zig developer, so I relied heavily on an LLM as a counterpart. This turned into a week-long argument with the LLM, with me trying to express an idea and the LLM explaining why the idea could or couldn't work. Often the LLM would generate code that worked, but which didn't capture my intent; I'd ask to rewrite the code until the code both worked and roughly expressed what I wanted.

The result of the extended argument is a [Zig implementation of the #pondlife blog](https://github.com/JanMiksovsky/pondlife-zig). This includes a `Map` type to represent an associations of keys and values; maps get composed to form a `Tree`. A tree can be used to represent both the source content and the resulting site's tree of resources.

Comparing the Zig implementation with other #pondlife implementations, the Zig version is by far the most verbose:

![](/images/2026/07/size.svg)

The three implementations on the left include substantial portions that are completely general in nature and could be factored out into a reusable library. If we subtract that out and focus just on the code unique to building the #pondlife blog, we get:

![](/images/2026/07/sizeProject.svg)

Verbosity aside, I think Zig might be a plausible site construction language for someone who either: a) just loves Zig, b) wants to incorporate site construction into a larger Zig project, or c) wants to use the map-based tree pattern to process other kinds of content, e.g., game assets for a game.

I'd recommend that, for a typical site, build time should generally _not_ be your primary criteria when evaluating static site generators; most of them are already quite fast. But, as expected, the Zig implementation is the fastest one I've made yet:

![](/images/2026/07/buildTime.svg)

I'm kind of surprised the JavaScript implementation comes out so well in this comparison.

This little Zig experiment was illuminating for me. In particular, it was interesting how much more complex it is to work with lazy maps in Zig. Eager maps are much more straightforward to work with, and in a few cases I used an eager map for simplicity. Lazy maps can be an important factor in constructing a site tree that can be quickly served — you only need to do the work for a requested resource — but if you're going to always build the complete set of static files, concentrating on eager maps would make a Zig implementation simpler.

If you're interested in exploring some of the other #pondlife implementations:

- [Astro](https://github.com/JanMiksovsky/pondlife-astro)
- [Eleventy](https://github.com/JanMiksovsky/pondlife-eleventy)
- [JavaScript](https://github.com/JanMiksovsky/pondlife-js). (A [variation](https://github.com/WebOrigami/pondlife-async-tree) uses the Web Origami project's [async-tree](https://weborigami.org/async-tree/) library.)
- [Origami](https://github.com/WebOrigami/pondlife)
- [Python](https://github.com/JanMiksovsky/pondlife-python)
- [Zig](https://github.com/JanMiksovsky/pondlife-zig)

[Update July 28, 2026: I've posted a [video](https://www.youtube.com/watch?v=6t3BN3Z-TkE) that uses these different blog implementations to illustrate the map-based tree pattern for building sites.]
