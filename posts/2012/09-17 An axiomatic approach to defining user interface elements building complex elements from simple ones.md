---
title: "An axiomatic approach to defining user interface elements: building complex elements from simple ones"
originalUrl: https://miksovsky.blogs.com/flowstate/2012/09/axiomatic-user-interface-framework.html
---

<p>
  Just as geometry builds up complex results from simple axioms, and programming
  languages build up complex constructs from simple primitives, it should be
  possible to create complex user interface elements from simple elements. But
  the lack of great building blocks for web user interface components causes
  people to waste a colossal amount of time reproducing common behaviors or,
  worse, forces them to settle for something quick but suboptimal.
</p>
<p>
  Take something as basic as tabs. Every web UI package includes a widget or
  component that produces a set of tabs, such as the typical example from
  <a href="http://jqueryui.com">jQuery UI</a>:
</p>
<p>&#0160;</p>
<p>
  <img src="/images/flowstate/6a00d83451fb6769e2017d3bf49d7d970c-pi.png" />
</p>
<p>&#0160;</p>
<p>
  While a tab set may seem to be an irreducible unit of user interface
  complexity, we can actually decompose its behavior into smaller, simpler
  chunks:
</p>
<ol>
  <li>
    <strong
      >Ensuring a single element within a set is “active” at any given
      time.</strong
    >&#0160;Here, only one of the tab buttons is in the active state. There are
    many other manifestations of this behavior. Single-selection list boxes, for
    example, also have a notion that a single item in the list is active.
  </li>
  <li>
    <strong>Showing a single element a time. </strong>The main region of the tab
    set shows a single page which corresponds to the active tab button. The
    active page is the only one that’s shown; the non-active pages are hidden.
    This behavior comes up in situations other than tabs. For example, photo
    “carousel” controls let a user page through photos one at a time, generally
    with previous/next buttons instead of a tab strip.
  </li>
  <li>
    <strong
      >Showing a set of identical elements that correspond to items in a list. </strong
    >The strip of tab buttons across the top has an internal consistency: every
    tab button is represented with the same type of button.
  </li>
  <li>
    <strong
      >Positioning one collection of elements directly above another.</strong
    >
    Here, the strip of tab buttons is stacked on top of the tabbed pages. This
    kind of layout seems so simple as to not deserve consideration. However, in
    current web browsers, this can be frustratingly difficult to achieve in the
    common cases where the size of the tab set is flexible. Suppose you want the
    tab set to fill the viewport, or a region of the viewport. The tab strip
    should consume a given height (which for a variety of reasons should not be
    fixed beforehand in, say, pixels), and the remainder of the space given over
    to the tabbed pages. This type of layout can be achieved with a
    <a href="http://www.w3.org/TR/css3-flexbox/">CSS flexbox</a>, but at least
    for a little while longer, many app developers will need to support older
    browsers (i.e., IE).
  </li>
  <li>
    <strong>Giving UI elements a description which can shown elsewhere.</strong>
    The pages shown within the tab set are rectangular regions, but the
    <em>name</em> of the tab is shown outside. It’s fairly common to want to
    give a UI element a user-friendly name like this.
  </li>
  <li>
    <strong>Letting a user tap or click a button to achieve a result.</strong>
    That is, the elements in the tab strip behave like buttons.
  </li>
</ol>
<p>
  It should be possible to create UI classes that implement each of these more
  fundamental behaviors or aspects. It should then be possible to exploit these
  behaviors on their own, or recombine them with other behaviors to produce
  other recognizable user interface controls. In effect, we should be able to
  arrive at fundamental behaviors that behave like the axioms in a mathematical
  domain or, alternatively, like atoms in a physical system of elements.
</p>
<p>
  The domain of computer science has much to say on the topic of axiomatic
  design. Programming languages are often predicated on the notion that you can
  boil down everything you’d want to do in the language to a tiny set of
  primitive functions. It’s only this small set of primitives which
  <em>must </em>be written in a lower-level language (e.g., a machine language).
  Everything else can be built up in the language itself. This not only keeps
  things clean, it ensures the language’s popularity and survival by
  facilitating the porting of the language to new platforms — only the
  primitives must be rewritten, and all the remaining code built on top of the
  primitives can be used as is. The original example of this axiomatic principle
  in language design was Lisp, whose story Paul Graham recounts in his article
  <a href="http://www.paulgraham.com/rootsoflisp.html">The Roots of Lisp</a>.
  (The full article is available on his site in the
  <a href="http://lib.store.yahoo.net/lib/paulgraham/jmc.ps"
    >original Postscript version</a
  >, or in various
  <a href="http://www.scribd.com/doc/45120227/jmc">converted PDF versions</a>.)
  From his article:
</p>
<blockquote>
  <p>
    In 1960, John McCarthy… showed how, given a handful of simple operators and
    a notation for functions, you can build a whole programming language.
  </p>
  <p>
    [McCarthy’s] ideas are still the semantic core of Lisp today. It’s not
    something that McCarthy designed so much as something he discovered. It’s
    not intrinsically a language for AI [artificial intelligence] or for rapid
    prototyping, or for any other task at that level. It’s what you get (or one
    thing you get) when you try to axiomatize computation. … By understanding
    [Lisp] you’re understand what will probably the main model of computation
    well into the future.
  </p>
</blockquote>
<p>
  Can we determine a similar axiomatic deconstruction of user interface
  elements? That’s a topic I’m acutely interested in, and I believe the answer
  is yes. Even through graphical user interfaces span a range of devices,
  platforms, and frameworks, the underlying collection of distinct user
  interface behaviors is quite consistent: clicking one thing something makes
  something else appear; items in lists are given consistent representations and
  behavior; modes (for both better and worse) constrain the user’s attention and
  powers; and so on. It should be possible to boil those consistent behaviors
  into reusable code.
</p>
<p>
  The result of this decomposition is a set of UI primitives which is
  significantly bigger than the canonical tiny set of user interface controls: a
  push button, a radio button, a check box, a text box. Of all the aspects
  numbered above, only #6 (push buttons) are available as a native browser
  control. Web developers are generally forced to recreate all the other aspects
  through combinations of CSS and JavaScript. That&#39;s inefficient and
  error-prone. As noted above, even something as seemingly straightforward as
  stacking two regions on top of one another can prove unexpectedly complex.
</p>
<p>
  The actual set of web UI primitives is probably an order of magnitude larger
  than what browsers expose as interactive UI controls. At the same time, the
  set of really general purpose contemporary UI (see this article for
  <a
    href="/posts/2012/06-19-evidence-suggesting-more-than-half-of-web-app-ui-code-is-reinventing-results-already-achieved-many-times-before.html"
    >a breakdown of UI elements by context-specificity</a
  >) is not so large it can&#39;t be enumerated or understood. For today’s
  typical mobile or web application, I believe a reasonably comprehensive
  collection of UI primitives would number in the 100 – 200 range.
</p>
<p>
  What would those primitives be? My work on the
  <a href="http://quickui/catalog">QuickUI Catalog</a> is an attempt this
  question. It’s a work in progress, and is by no means complete. It currently
  includes controls which shouldn’t be there (they’re really just sample uses of
  an underlying component), and on the other hand doesn’t (yet) include enough
  controls for common situations like mobile. Nor is the set of controls
  completely stable yet. I occasionally realize two controls exhibit similar
  behavior whose implementation should (or shouldn’t) be shared, which results
  in both minor and major refactorings. Nevertheless, the Catalog already
  represents a highly useful starting point for creating application UIs.
</p>
<p>
  Let’s return to the tab set example above. The QuickUI Catalog includes a
  <a href="https://quickui.org/catalog/Tabs">Tabs</a> control for this purpose,
  which can be used as is. But that Tabs control is simply a combination of
  lower-level components corresponding to the attributes listed above:
</p>
<ol>
  <li>
    A <a href="https://quickui.org/catalog/Sequence">Sequence</a> base class. A
    Sequence control keeps track of which one (and only one) of its children is
    currently active.
  </li>
  <li>
    A <a href="https://quickui.org/catalog/Modes">Modes</a> control. Extends the
    Sequence class to hide everything but the active child.
  </li>
  <li>
    A <a href="https://quickui.org/catalog/List">List</a> control. Maps an array
    of internal data items to an array of user-visible controls.
  </li>
  <li>
    A
    <a href="https://quickui.org/catalog/VerticalPanels">VerticalPanels</a>
    control. Stacks things vertically. This inherits from
    <a href="https://quickui.org/catalog/SimpleFlexBox">SimpleFlexBox</a>, a
    user interface
    <a href="http://en.wikipedia.org/wiki/Polyfill">polyfill</a> which uses a
    CSS flexbox for layout on modern browsers, and a manual engine for layout on
    older browsers.
  </li>
  <li>
    A <a href="https://quickui.org/catalog/Tab">Tab</a> control. Associates a
    description property with an arbitrary block of content. It&#39;s this
    description the Tabs control displays in a List of buttons across the top.
  </li>
  <li>
    A <a href="https://quickui.org/catalog/BasicButton">BasicButton</a> control.
    This wraps the browser’s native &lt;button&gt; as a component. Among other
    things, this allows a BasicButton to be used to render items in the List
    (above) to create the strip of tab buttons.
  </li>
</ol>
<p>
  All these derive from a common
  <a href="https://quickui.org/catalog/Control">Control</a> base class.
</p>
<p>
  We can show the relationships between all these classes in a graph, where a
  solid line represents an “is a” relationship (one class derives from another)
  and a dotted line shows a “has a” relationship (one class makes use of
  instances of another class):
</p>
<p>
  <img
    alt="Tabs"
    src="/images/flowstate/6a00d83451fb6769e2017744a4ea90970d-800wi.png"
  />
</p>
<p>
  This arrangement entails a lot more pieces than a typical web user interface
  platform.&#0160;The browser itself only provides a native button. Most
  existing web user interface frameworks provide some button class wrapper (such
  as BasicButton here) and a tab set class (Tabs). They may or may not expose a
  general purpose UI component base class (here, Control). The tab set class is
  typically fixed in a monolithic implementation, and can only be modified via
  parameters the framework designers have anticipated beforehand.
</p>
<p>
  Traditional client-side UI frameworks (e.g., Windows Presentation Foundation)
  do have rich class hierarchies, although even their UI primitives tend to be
  too course-grained. And&#0160;contemporary web UI frameworks rarely have good
  building blocks. (Some people claim the
  <a href="http://www.sencha.com">Sencha</a> framework does, but it&#39;s
  unfortunately encumbered with developer licensing fees, and requires you to
  build your app on top of a proprietary substrate. To me, that&#39;s moving in
  the exact opposite direction of web development trends.)
</p>
<p>
  The main obstacles to UI like this on the web may have multiple causes,
  including the fact that the web&#39;s primary client-side programming language
  JavaScript, still has no native support for traditional object-oriented
  classes. Moreover, the browser doesn&#39;t yet expose a model for modular
  component composition, which creates a lot of work for a UI framework&#39;s
  creators.
</p>
<p>
  In the above implementation of a tab set, all the lower-level pieces are
  directly available to the user interface designer and developer. These can be
  used on their own, or combined with other types of elements to create other
  user interface elements. And, significantly, new elements constructed with
  this approach are, by default, extensible and recombinable in their own
  right.&#0160;In a subsequent post, I plan to show some of the other sorts of
  UI controls which can be created by combining some of the pieces above in
  different ways.
</p>
<p>
  As noted above, this Catalog implementation isn’t perfect. Among other things,
  there are inherent limitations on what you can achieve with a classic single
  inheritance hierarchy. But, overall, this feels like a promising direction,
  and in practice is a highly efficient way to create web apps. Above all, this
  axiomatic approach feels like the right <em>paradigm</em> for building UI.
</p>
<p>
  McCarthy&#39;s big advance with Lisp wasn&#39;t to create programming language
  primitives — all programming langauges have primitives. His insight was that
  the primitives in programming languages of the time&#0160;<em
    >weren&#39;t primitive enough</em
  >. Instead, you should break a language into irreducible axioms, and let
  people combine those axioms to create any new language functions they need.
  The functions you create with those Lisp primitives are just as powerful as
  any pre-packaged functions created with those same primitives by the
  language&#39;s designers. That is, there&#39;s nothing special the language
  designer can do you which you cannot also do.
</p>
<p>
  Similarly, a UI platform should give you a powerful set of axiomatic
  appearances and behaviors and a means to combine them to create new elements
  which are every bit as powerful as those elements that come bundled with the
  platform. This is why attempts to build a tiny handful of new controls into
  web browsers &#0160;is almost completely uninteresting to me. A new date
  picker in the browser, to take just one example, is just&#0160;<a
    href="/posts/2011/11-07-ui-control-of-the-week-straight-up-datecombobox-and-why-your-browser-wont-solve-your-date-picker-needs.html"
    target="_self"
    >never going to solve your date picker needs</a
  >. It&#39;s like the FORTRAN committee adding yet another hard-baked statement
  to the language. What&#39;s infinitely more interesting is a UI platform that
  gives you the building blocks you need to build a date picker of your own
  that&#39;s as powerful as anything in the browser itself.
</p>
