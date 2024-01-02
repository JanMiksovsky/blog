---
title: Web authoring tasks you’d think should be easy but are surprisingly hard
date: 2024-01-01
---

I wish it were possible to create more complex sites just with HTML and CSS — but any aspiring web author learning to create a site that way quickly finds some very common task that’s impossible in plain HTML and CSS.

**Author:** How do I make my nav bars do that thing all nav bars do: where it shows the link to the current page differently so my user knows where they are?<br>
**Web:** Ah, yes, you want to do that! But you cannot. The browser certainly has all that information necessary to do that for you — you might have even been intrigued by the [:local-link](https://developer.mozilla.org/en-US/docs/Web/CSS/:local-link) CSS property. That does just what you want! But no browser supports it.

**Author:** I want an Articles index page that links to all the articles I wrote in the /articles folder, and I want my Gallery page to show all the photos I have in the /photos folder.<br>
**Web:** Sorry, HTML just deals with what goes on a page. We have heard about these “folders” you’re talking about. They sound very popular! Not our thing, though.

**Author:** I want my blog post pages to have links to the next post and the previous post.<br>
**Web:** HTML defines what goes in a single page; there’s no way to represent a set of pages or interrelationships like ordering, much less reflect those relationships in a page. Think of HTML as an exciting “Build your own adventure”: you can do whatever you want — by hand!

**Author:** I want all the pages in my Products area to have the same layout, with a product name, photo, and description. I don’t want to have to repeat all the HTML required to do that.<br>
**Web:** That sounds very useful! Again, though, that’s not really HTML’s thing.

**Author:** I want to create my navigation bar in one place, then reuse it on every page.<br>
**Web:** Sorry, everything needs to be directly in the HTML! Well, yes, the browser can load CSS from other files… and JavaScript from other files… and SVG images from other files… just not HTML. Have you tried changing careers and learning JavaScript?

I understand at a technical level why these limitations exist. Working in web standards gave me an appreciation of the political difficulty of solving such problems even where solutions are possible. But none of that makes a new web author feel any better. Watching someone struggle to create a simple site makes clear that some very common authoring tasks are still disappointingly hard.
