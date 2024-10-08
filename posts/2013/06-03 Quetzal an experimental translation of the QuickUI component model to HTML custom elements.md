---
title: "Quetzal: an experimental translation of the QuickUI component model to HTML custom elements"
originalUrl: http://blog.quickui.org/2013/06/03/quetzal-an-experimental-translation-of-quickui-component-model-to-html-custom-elements/
---

<p>
  I've started an experiment called <a
    href="http://janmiksovsky.github.io/quetzal/"
    >Quetzal</a
  > that considers translating the core concepts from QuickUI to the proposed
  web component standards currently embodied by Polymer.
</p>
<p>
  <i
    >[<b>Update</b> June 13, 2014: The Quetzal project has grown into an open
    source project called
    <a href="https://github.com/basic-web-components/components-dev/wiki"
      >Basic Web Components</a
    >. Please take a look!]</i
  >
</p>
<p>
  While continuing working on QuickUI, I've been tracking the progress of the
  Google-led efforts on web components: custom elements, Shadow DOM, and related
  advances in the web platform. Those technologies address many of the same
  issues QuickUI addresses, so I've been trying to chart a path by which QuickUI
  and web components could co-evolve.
</p>
<p>
  Until recently, those web component technologies were generally available only
  on Google Chrome, which means QuickUI can't rely on them. However, since the
  start of the year I've been watching Google's
  <a href="http://www.polymer-project.org/">Polymer project</a> which, among
  other things, offers a suite of polyfills that allows one to create and use
  components in the
  <a href="http://www.polymer-project.org/compatibility.html"
    >other "modern" browsers</a
  >, including recent versions of Safari, Firefox, and Internet Explorer 10+.
  Polymer offers a fairly compelling story for using those future browser
  technologies today.
</p>
<p>
  I've spent a bit of time looking at how to retrofit support for Shadow DOM and
  other aspects of web components into QuickUI. While that's led to some
  progress, I'm not entirely sure that that's the best approach. To ensure this
  is being done the best way, I'd like to try an alternative approach build from
  scratch directly on top of a custom element substrate. That experiment is
  Quetzal.
</p>
<p>
  There are a number of aspects of QuickUI that I believe are quite compelling,
  and which are either not easily supported in the proposed web standards, or
  appear under-represented in the current body of web components work. My goal
  in Quetzal is to explore whether those aspects of QuickUI have meaning in the
  world of web components, and what's the best way to bring those benefits
  forward. Some of those aspects of QuickUI I would very much like to see
  carried forward to the world of custom elements are:
</p>
<ul>
  <li>
    A focus on subclassing as a means to achieve well-factored code, including a
    good separation of concerns. This includes an approach to populating the DOM
    in which an element class can
    <a href="https://quickui.org/docs/rendering.html"
      >fill in properties and content slots defined by their base classes</a
    >.
  </li>
  <li>
    The ability to concisely define component appearance and behavior in script
    instead of markup. While the &lt;element&gt; syntax is part of the standard,
    and therefore a useful baseline, markup feels limiting compared to what's
    possible in script. A compact JavaScript object format can be at least as
    expressive, and possibly more expressive, than HTML.
  </li>
  <li>
    A convention for
    <a href="http://blog.quickui.org/2012/07/02/web-component-properties/"
      >multiple, named, DOM-valued properties</a
    >.
  </li>
  <li>
    The ability to
    <a
      href="http://blog.quickui.org/2012/04/27/how-quickui-controls-use-code-to-specialize-the-handling-of-their-content-in-ways-that-might-not-be-supported-by-web-components/"
      >run code when an element's contents change</a
    >.
  </li>
  <li>
    Syntactic sugar for quickly defining common types of component properties.
  </li>
  <li>
    Helper functions for tasks that come up often in UI component design. This
    includes, for example, a lightweight model by which an element can respond
    to changes in its size in order to perform custom layout.
  </li>
  <li>
    A significant library of well-designed web user interface components,
    including a large number of useful base classes that people can use directly
    as the starting point for their own work.
  </li>
</ul>
<p>
  The Quetzal experiment seeks to preserve the above features, while still
  allowing a designer or developer to create new custom elements which can
  interoperate with custom elements created by any other means (e.g., as Polymer
  elements). Some early technical decisions for Quetzal:
</p>
<ul>
  <li>
    <span style="font-style: inherit; line-height: 1.625"
      >I'm leaving jQuery out of Quetzal. I'll go into that decision in
      <a
        href="http://blog.quickui.org/2013/06/04/do-web-component-developers-still-need-jquery/"
        >more detail later</a
      >, but the bottom line is that jQuery no longer seems absolutely necessary
      for web development. When QuickUI began back in 2007, jQuery was a vital
      cross-browser abstraction layer, but browsers have become a lot more
      consistent in the intervening years. If you look at the browsers currently
      supported by Polymer, the core DOM API appears consistent enough that it's
      not overly cumbersome to use directly. And while any custom element
      library should support jQuery use, it would be nice if jQuery weren't a
      requirement.</span
    >
  </li>
  <li>
    For the time being, Quetzal is written in CoffeeScript rather than plain
    JavaScript. I find CoffeeScript much more expressive, more productive, and
    easier to think in than plain JavaScript. As with QuickUI (which is also
    written in CoffeeScript), Quetzal elements can of course be created and
    extended in plain JavaScript. Still, I recognize that using CoffeeScript
    limits one's audience. If Quetzal were to evolve to be a real open source
    project, I might feel the need to back-port it to JavaScript.
  </li>
  <li>
    Quetzal only relies on the lower-level platform.js library created by the
    Polymer project, rather than the higher-level polymer.js library or the
    (higher still) library of Polymer elements. The
    <a href="http://www.polymer-project.org/">Polymer home page</a> currently
    includes an architectural diagram illustrating the relationship between
    these two libraries. Quetzal builds on the lowest, red-colored platform.js
    level, not the higher yellow or green levels. In this regard, Quetzal is
    comparable to Polymer elements. Because both rely on web standards, the
    results should be easily interoperable. As a side effect, Quetzal should
    also help prove out the ability of someone other than Google to build a UI
    component framework on top of platform.js.
  </li>
  <li>
    I'm currently working and testing primarily in Chrome. At various points, I
    check to make sure Polymer is polyfilling everything correctly under other
    browsers, but at this early stage, it's likely stuff will appear wonky in
    other browsers.
  </li>
</ul>
<p>
  Quetzal isn't ready for real use yet: it does just a few things at this stage,
  it's not document, it's buggy, it doesn't work cross-browser (even with
  polyfilled custom elements), etc. But I wanted to announce the experiment now
  so that I can follow up here with additional posts as I go along. Work on
  Quetzal is generating questions I want to ask others, and to provide context
  for those things it's going to be helpful to be able to reference Quetzal
  posts here and source code on GitHub. After exploring some ideas, Quetzal's
  useful life may come to an end, or its lessons might get folded back into
  QuickUI, or it may evolve into a library of Polymer elements.
</p>
<p>
  If you're interested in following along, subscribe to this blog, and/or follow
  me on <a href="https://twitter.com/JanMiksovsky">Twitter</a> and
  <a href="https://plus.google.com/118102862690539596548">Google+</a>.
</p>
<p>Cheers, Jan Miksovsky</p>
