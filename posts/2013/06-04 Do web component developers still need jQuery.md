---
title: "Do web component developers still need jQuery"
originalUrl: http://blog.quickui.org/2013/06/04/do-web-component-developers-still-need-jquery/
---

<p>
  <em
    >I love you, jQuery. But maybe it's time we started spending some time
    apart.</em
  >
</p>
<p>
  Improvements in cross-browser feature set and compatibility are reducing the
  need for jQuery, but more importantly, it turns out that a component-based app
  needs very little jQuery to begin with. These insights led to one of the first
  decisions I hit in
  <a
    href="http://blog.quickui.org/2013/06/03/quetzal-an-experimental-translation-of-quickui-component-model-to-html-custom-elements/"
    >starting Quetzal</a
  >: should it require jQuery? The answer, so far, is no.
</p>
<p>
  Since its inception in 2007, <a href="https://quickui.org">QuickUI</a> has
  relied on jQuery as a crucial browser abstraction layer. Without jQuery,
  QuickUI would have never have come to exist. However, the QuickUI runtime
  itself only uses a fairly small set of core jQuery functions, and modern
  browsers now deliver standards-based solutions for those situations. Moreover,
  I've noticed that, when building QuickUI component-based apps, component code
  tends to rarely require sophisticated jQuery.
</p>
<p>
  Meanwhile, the web has moved forward. The modern browsers — the latest Chrome,
  Safari, Mozilla, and Internet Explorer 10+ — are all much, much more
  consistent to develop for than browsers were six years ago. Glancing at pages
  on
  <a href="http://www.quirksmode.org/dom/w3c_core.html">QuirksMode</a>, one
  generally sees a see of green compliance, with most of the red markers of
  non-compliance for older versions of IE. And according to
  <a href="http://gs.statcounter.com/">StatCounter</a>, market shares for
  both IE 8 and 9 have now dropped below 10% (each), so it's plausible for
  mainstream organizations to justify ignoring them.
</p>
<p>
  Let's break down the things jQuery is good at, and consider how necessary are
  in a <em>web component-based</em> application (specifically) targeting the
  modern browsers:
</p>
<ul>
  <li>
    <strong>Handling an array of DOM objects.</strong> It's convenient to be
    able to apply a jQuery function or plugin to a jQuery object containing a
    collection of DOM elements. However, modern web languages (CoffeeScript,
    ES6, etc.) provide syntax for iterating over a collection, substantially
    reducing the need for a special library for this purpose. And, while
    jQuery's array model is easy to consume, it also makes writing components
    harder. QuickUI control classes inherit from jQuery, which means every
    QuickUI class method has to consider the possibility it's being applied to
    multiple objects at a time, not just one. In practice, that's been a
    consistent source of complexity and bugs.
  </li>
  <li>
    <strong>Selectors.</strong> The standard querySelector and querySelectorAll
    functions provide a reasonable way to find matching elements. (I believe
    those functions were at least partially inspired by jQuery.) I've heard that
    jQuery's Sizzle engine provides more power than querySelector, but again, in
    a component-based app, you're rarely doing sophisticated searching of the
    DOM. In practice, when I'm writing an app with QuickUI components, I do
    very, very little searching of the DOM. Every QuickUI component already has
    its own reference to exactly the sub-elements it cares about. Polymer does
    something similar with <a
      href="http://www.polymer-project.org/polymer.html#automatic-node-finding"
      >automatic node finding</a
    >. With such facilities in place, there's no need to grovel around in the
    DOM to find something you're looking for. In fact, with Shadow DOM, the
    things you're probably looking for <em>aren't even findable</em>. This is a
    good thing; encapsulation is preventing you from writing brittle code. Every
    time you do a $("#foo"), you're running the risk of picking up the wrong
    #foo — maybe not today, but tomorrow, when someone else adds a #foo element
    somewhere on the page. In Quetzal or Polymer, you never search for something
    like that; a component already has a direct reference (this.$.foo) to the
    element you want to manipulate. Unlike a DOM search, dereferencing is
    instantaneous and 100% reliable.
  </li>
  <li>
    <strong>Traversing. </strong>Ditto. In practice, component subtrees  — that
    is, the set of elements managed <em>directly</em> by a component — just
    aren't that deep. A deep subtree is, in fact, often an indicator that
    component refactoring is in order. It's exactly analogous to the way a
    deeply-nested set of code blocks (conditionals, loops) within a single
    function usually indicates the function should be refactored. Nearly all the
    time a QuickUI component needs to traverse the DOM, it wants to iterate over
    its own set of children — which, as noted above, can now be easily done in a
    modern language with decent syntax.
  </li>
  <li>
    <strong>DOM manipulation.</strong> As browsers have become more consistent
    in the semantics of DOM operations, jQuery feels less necessary here. And
    much of the jQuery DOM manipulations one sees are a means to set up all or
    part of the DOM. in jQuery, one often sees code like: "Find all the divs of
    class '.menuItem', and wrap them, stuff them, and wire them up so that they
    turn into menu items." The existence of web components provides a
    <em>much</em> better way to accomplish the same result. All the population
    can be done through custom elements that provide a template for their DOM.
    That said, jQuery does provide a useful collection of helper functions. For
    example, to me it feels easier to use jQuery's css() method, which can take
    a JavaScript object as a parameter, than use the raw DOM "style" property
    directly. Generally speaking, the DOM API feels more like an old school C
    API, while jQuery feels like a JavaScript API.
  </li>
  <li>
    <strong>Function chaining.</strong> jQuery chaining lets you concisely apply
    a set of selector, traversal, and manipulation operations. In practice, all
    three of those types of operations come up less often in a web
    component-based app. In particular, one often sees long chains of jQuery
    function calls when populating the DOM, but a &lt;template&gt; is a cleaner
    way to do that declaratively. Over the years, in QuickUI apps, I've noticed
    that I use jQuery chaining less and less often, to the point where I only
    rarely take advantage of it today.
  </li>
  <li>
    <strong>Events.</strong> Microsoft IE 9 finally added support for
    addEventListener, so that it's possible to wire up event handlers in a
    consistent way. I expect there are still many discrepancies lurking in the
    details — when each browser decides to fire an event, for example — that
    might prove tricky to work around without an abstraction layer like jQuery
    that can normalize behavior.
  </li>
  <li>
    <strong>Effects.</strong> CSS transitions and transition events now provide
    an easy, cross-browser way to do many of the same effects jQuery was first
    noted for. For years, the jQuery home page used to have a simple demo which,
    when you clicked a button, made a new DOM element appear with a transition
    effect. Such effects are now easily achievable without jQuery.
  </li>
  <li>
    <strong>Data.</strong> jQuery provided a useful $.data service to associate
    data with DOM elements, because a browser's garbage collector can get
    confused when DOM elements and JavaScript objects reference each other. The
    various browsers also had myriad bugs and inconsistencies with regard to
    extending DOM elements. So UI framework developers like those on Prototype
    <a href="http://perfectionkills.com/whats-wrong-with-extending-the-dom/"
      >gave up on extending the DOM</a
    >. However, as far as I can tell from the way Polymer is tackling things,
    extending the DOM now appears to work (generally) as expected. So perhaps
    $.data is no longer necessary.
  </li>
  <li>
    <strong>Ajax.</strong> I don't write a ton of Ajax code myself, so for
    argument's sake, let's stipulate that jQuery's Ajax wrappers are handier
    than directly working with XMLHttpRequest. In particular, jQuery's use of
    promises as a data type simplify the task of writing async code. Perhaps for
    the time being, this particular aspect of jQuery is worth using on its own.
    A proposed browser standard for
    <a href="http://dom.spec.whatwg.org/#futures">futures</a> may reduce that
    benefit, however.
  </li>
  <li>
    <strong>Plugins.</strong> Many, many of the jQuery plugins that exist today
    essentially create component-like things. These plugins effectively
    constitute a DOM template with some packaged behavior. I'd argue that a web
    component is a clearer, more maintainable way to achieve the same result.
    Encapsulation, in particular, is a huge advance to providing robust
    components. Moreover, many other uses for plugins could now be achieved by
    extending DOM elements directly.
  </li>
</ul>
<p>
  Generally speaking, in a component-based app, you want to give each component
  the responsibility for managing its own appearance and behavior. You don't
  want code walking all over the DOM tree and mucking around with things that
  aren't its direct responsibility. Instead, you talk to the component managing
  the part of the DOM you care about, and ask that <em>component</em> to
  manipulate the elements it directly owns. In classic object-oriented
  programming terms, this is an application of the <a
    href="http://en.wikipedia.org/wiki/Law_of_Demeter"
    >Law of Demeter</a
  >.
</p>
<p>
  In practice, compartmentalizing things that way leaves each component doing
  very simple manipulations on a comparatively small set of elements:
  instantiating a new element; iterating over its own children; applying or
  removing a style; etc. If a component wants to do something more sophisticated
  to its internals, more likely than not the component should delegate that
  operation to one of its own sub-components. The component's own need to search
  is limited, reducing the need for a powerful selector/traversal engine. And,
  given a reasonably good programming language, simple DOM manipulations can be
  performed effectively — and with better performance — by directly accessing
  the DOM API.
</p>
<p>
  I'm no cross-browser DOM API expert, and I've only just started to try to do
  things without jQuery. I could easily hit a landmine tomorrow, tripping
  upon some cross-browser nastiness I've been blithely unaware of, which
  jQuery for years has been invisibly and reliably been protecting me from. That
  said, work on Quetzal is progressing fairly smoothly without jQuery, and a
  week or two into this project, I'm not missing most of jQuery. It
  <em>would</em> be nice to have a much smaller library of helper functions
  which present a more JavaScript-flavored approach to the DOM API, as in
  jQuery's css(), mentioned above.
</p>
<p>
  From one standpoint, you could say I've just traded one browser abstraction
  layer (jQuery) for another (Polymer's platform.js). However, platform.js feels
  like a pretty different animal than jQuery:
</p>
<ul>
  <li>
    The beauty of Polymer's approach of polyfilling forthcoming web standards in
    older browsers is that you can write code against the abstraction layer
    today that should invisibly start working against native implementations
    where and when those exist. It's still early, and that promise remains to be
    proven — but that's a very compelling promise.
  </li>
  <li>
    Those future standards mean you're working with facilities that someday
    every other developer will have (whether they want them or not). You're
    writing code on top of a library that could get smaller over time, not
    larger.
  </li>
  <li>
    The other difference with platform.js, as far as today's web component
    developers are concerned, is that it's really the only game in town. Unless
    you have the luxury of targeting the latest release of Chrome, you'll need
    to use platform.js (or the complete polymer.js) to run on other browsers.
  </li>
  <li>
    If one's goal is to write components that many people will use, it makes
    sense to reduce the number of additional dependencies. If jQuery's not
    required, then the lack of that dependency to some degree facilitates
    sharing.
  </li>
</ul>
<p>
  We'll see how the Quetzal experiment evolves, but so far, writing directly to
  the DOM API is working out okay.
</p>
<p>
  <em
    >So, jQuery, maybe we should spend some time apart.<em
      > <em>Maybe we should see some other people. </em>It's not you — it's
      me!</em
    > Don't worry; I might miss you terribly and come running back. Or maybe
    we'll just be friends.</em
  >
</p>
<p>
  <em>It's okay. We'll always have IE6.</em>
</p>
