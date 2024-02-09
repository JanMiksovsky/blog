---
title: Web diagrams look deceptively complete
---

I see so many web platform diagrams that represent HTML/CSS/JS in a tidy, complete arrangement that suggests those are everything you need to know — when in reality those only let you define what happens in individual pages. A more realistic diagram would be incomplete! You’re going to need to choose and master additional technologies to create a coherent, functional site.

![Two bubble diagrams: Left shows HTML, CSS, and JavaScript; Right adds bubbles with question marks for site structure, server, and HTML reuse](/images/2024/01/diagrams.png)

Even the simplest possible static site requires site structure (organizing the files into a folder hierarchy) and a server that can respond to web requests with those files. A non-trivial site generally also requires some way to reuse HTML across pages. Where is all that represented in the first diagram?

JavaScript developers will happily explain that their preferred language can be used for all those purposes via Node, so for them the first diagram is actually complete. That’s great for them! (I use Node too.)

But many people don’t want to learn JavaScript or find it too difficult, and for basic sites it’s massive overkill. Moreover, the diagram on the left suggests you can't build a page without JavaScript, but I think JavaScript on the front end should be used sparingly.
