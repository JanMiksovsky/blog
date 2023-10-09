---
title: Web components let you preserve the backward compatibility of your own old code
date: 2016-02-15 16:00 UTC
originalUrl: https://component.kitchen/blog/posts/web-components-let-you-preserve-the-backward-compatibility-of-your-own-old-code
---

<p>
  An interesting point of backward compatibility came up as we were recently
  porting our own <a href="https://component.kitchen">Component Kitchen</a>
  site to
  <a
    href="/posts/2016/02-01-a-new-release-of-basic-web-components-based-on-plain-javascript-component-mixins.html"
    >plain JavaScript web components</a
  >. The main goal of the port was to be able to write our own site in plain
  ES6, with less abstraction between us and the platform. We've also reaped some
  other benefits: our site is now simpler to build, and much faster to load on
  older polyfilled browsers like Apple Safari and Internet Explorer.
</p>
<p>
  But the interesting bit was that we could use web components as a transitional
  strategy for our old code. The new components and the old components were
  written in a completely different way, but could nevertheless coexist on the
  page during the transition. All web components connect to the outside page
  through the same means: DOM attributes, DOM children, DOM events, as well as
  JavaScript properties and methods. So we could leave an old component in place
  while we changed the outer page, or vice versa, without having to rewrite
  everything at once.
</p>
<p>
  When we recently spoke on an
  <a href="https://www.youtube.com/watch?v=nli24SoWejY"
    >Web Platform Podcast episode</a
  >, we spoke with panelist
  <a href="https://twitter.com/revillweb">Leon Revill</a>, who has raised this
  point of web components as a backward compatibility strategy. We think this is
  as a seriously underappreciated benefit of writing and using web components.
</p>
<p class="pullQuote">
  Which framework from three years ago would you prefer to use today if you were
  starting a new project?
</p>
<p>
  The web development industry is a highly chaotic, substantially fractured, and
  quickly evolving marketplace of competing approaches to writing apps. Even if
  you have the luxury of developing in an approach you think is absolutely
  perfect for 2016, the chances are probably very low that you will still want
  to write your app that way in 2019. If you don't believe that, ask yourself:
  which framework from three years ago would you <em>prefer</em> to use today if
  you were starting a new project?
</p>
<p>
  If you're working on something of lasting value, in three years time, you'll
  still be forced to reckon with some of your old code from 2016. Unless you're
  lavishly funded or insulated from the market, you probably won't be able to
  afford to always move all your old code to whatever you decide is the latest
  and greatest way to write software. You'll be forced to maintain code written
  in different eras, and that can be very tricky.
</p>
<p>
  A web component provides a useful encapsulation boundary that can help keep
  old front-end user interface code usefully running directly alongside new
  code. While a variety of contemporary web frameworks offer proprietary
  component models, they can only offer backward compatibility to the extent
  that you're willing to keep writing your whole app in that framework
  indefinitely. By virtue of being a web standard, the value of web components
  you write today should be able to be preserved for a very long time.
</p>
<p>
  <strong>Bonus:</strong> During our port, we were able to bring our popular
  <a href="https://component.kitchen/tutorial">Web Components Tutorial</a>
  up to date. If you know people who would be interested in learning about web
  components, just point them at the newly-updated tutorial.
</p>
