---
title: Small Web Build of a little Cat Prints online store
---

For this month's #SmallWebBuild, I made a little sample [store for selling art prints](https://cat-prints-store.weborigami.org). <!-- #smallweb #indieweb -->

<iframe class="video4x3" src="https://www.youtube.com/embed/tfojhW5frgk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

The site's structure is defined in a [single file](https://github.com/WebOrigami/cat-prints-store/blob/main/src/site.ori) in the [Origami site design language](https://weborigami.org/language) that turns the sample artwork images and data into a gallery home page and a separate page for each print.

![](/images/2024/02/catPrints.svg)

I built this to try out [Snipcart](https://snipcart.com), a web service for adding a shopping cart to a static site. They seem to charge lower fees for this service than the larger site hosting platforms, and it was trivial to add the shopping cart with a few HTML attributes. I **love** that their approach leaves you in control of the rest of your site. That said, I haven't signed up to use Snipcart to actually complete financial transactions; if you're interested in Snipcart, investigate it carefully.

![](/images/2024/02/catPrintsGallery.png)

I also used this store site to experiment with the new web [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API). I was able to create a zoom effect that works _across page navigations (!)_ which is completely nuts. Caveats: currently in Chrome/Edge/Opera only; it was hard to figure out how to do what I wanted; Chrome sometimes shows a white flash before the zoom-out animation. Still, I'm excited to see these effects coming to simple multi-page sites.
