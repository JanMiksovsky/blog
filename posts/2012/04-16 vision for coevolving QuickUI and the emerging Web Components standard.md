---
title: "vision for coevolving QuickUI and the emerging Web Components standard"
originalUrl: http://blog.quickui.org/2012/04/16/a-vision-for-coevolving-quickui-and-the-emerging-web-components-standard/
---

<p>
  This post is the first in a series looking at the relationship between QuickUI
  and Web Components. This post will kick things off by laying out some basic
  points of a vision for how these two technologies might co-evolve.
</p>
<p>
  The Web Components effort spearheaded by Google is a vital effort towards
  promoting component-based user interface design for web-based apps.
  Componentized user interfaces may
  <a
    href="/posts/2012/03-14-like-snapping-together-a-skyscraper-web-components-will-catalyze-a-completely-new-ecosystem-for-creating-ui.html"
    >radically transform the web industry</a
  >. It will take some time for the spec to be finished and agreed upon, and
  then still more time for the technology to make its way into users’ hands. It
  is hoped that QuickUI can serve as a bridge to the world of Web Components,
  act as a reference point for work on the emerging spec, and provide services
  and component libraries that speed the creation of Web Component-based apps.
</p>
<h1>QuickUI and Web Components have the same goal</h1>
<p>
  Both frameworks address the same fundamental objective: let web designers and
  developers create better applications faster through the creation and use of
  modular, reusable, and extensible user interface elements. QuickUI calls such
  elements “controls” and the Web Components spec calls them “components”, but
  in this context the terms are essentially interchangeable.
</p>
<p>
  There are obviously differences in approach. QuickUI is built on JavaScript
  and jQuery, while Web Components is native code and browser- and
  library-agnostic. The Web Components framework, by virtue of being part of the
  browser, can do many things which a JavaScript library like QuickUI cannot.
  There are some obvious performance benefits to doing things in native code.
  It’s also possible for the browser to enforce a high degree of component
  isolation by preventing a Web Component’s host from knowing what’s going on
  inside the component. Such isolation is crucial for a component platform,
  because it leads to a proper
  <a href="http://en.wikipedia.org/wiki/Separation_of_concerns"
    >separation of concerns</a
  >. A component author can make many modifications to the inner workings of a
  component without fear that hosts of that component are inappropriately
  depending on a particular implementation. QuickUI can only maintain such
  separation of concerns by convention and by proffering services that make it
  easier for developers to use controls in a modular way than not.
</p>
<p>
  Despite their differences, fundamentally these two web user interface
  frameworks are more compatible than not. This opens up the possibilities which
  follow.
</p>
<h2>QuickUI and Web Components should be interoperable</h2>
<p>
  Based on the current Web Components spec, in theory it should be
  straightforward for a QuickUI control to host a Web Component, and vice versa.
  That can provide a degree of future-proof resiliency to a team that wants to
  build with QuickUI today. But it should be possible to do better than that…
</p>
<h1>
  QuickUI itself will someday be built on top of the Web Components foundation
</h1>
<p>
  Given the performance and modularity benefits of Web Components, and the
  reasonably close alignment of goals, it appears that it should be possible to
  eventually have QuickUI controls <em>be </em>Web Components.
</p>
<p>
  Currently, the lowest levels of the quickui.js runtime provides services such
  as creating control subclasses and instantiating controls. These low-level
  services would be provided by a Web Components-enabled browser instead. The
  QuickUI runtime could potentially detect whether the user’s browser supports
  Web Components and, if so, create controls as Web Components wrapped by
  jQuery. On legacy browsers (all today’s released browser versions, going back
  to IE 8), the QuickUI runtime would continue to create controls as regular DOM
  elements wrapped by jQuery.
</p>
<h1>
  QuickUI can provide useful features beyond those which have been standardized
</h1>
<p>
  Standards, by their nature, advance slowly. Even once QuickUI is built on top
  of Web Components, QuickUI can continue to evolve at a faster pace to meet the
  needs of web designers and developers. QuickUI can be the “running code” in
  the maxim that Internet standards evolve from
  <a href="http://en.wikipedia.org/wiki/Rough_consensus"
    >Rough consensus, running code</a
  >.
</p>
<p>
  QuickUI is also designed explicitly for jQuery developers, whereas the Web
  Components spec must be library-agnostic. In the same way that jQuery
  developers currently find it much easier to write an interactive UI in jQuery
  than by doing direct DOM manipulation, they will also find creating controls
  (components) easier in QuickUI than using only the low-level services offered
  by the browser. For example,
  <a href="https://quickui.org/tutorial/inherit-from-jQuery.html"
    >a QuickUI control is already a jQuery instance</a
  >, so a developer can immediately and directly manipulate a control using all
  the facilities in jQuery. As another example, QuickUI’s services for creating
  properties generate jQuery-style getter/setter functions which are
  automatically chainable, and can be applied to a collection of elements in a
  single call.
</p>
<h1>QuickUI may serve as a reference for work on Web Components</h1>
<p>
  As a 4+ year-old web user interface framework, there’s already a considerable
  degree of hard-earned knowledge baked into the QuickUI framework. These
  lessons can be considered as the various parties working on Web Components
  flesh out the details of that spec. It’s in this role of QuickUI as a
  reference point that some of the important lessons from QuickUI will be
  covered in future posts on this blog.
</p>
<h1>QuickUI lets teams create componentized web user interfaces today</h1>
<p>
  Many of the benefits of building a user interface with components can be
  achieved by a team using QuickUI today. As summarized on the
  <a href="https://quickui.org">QuickUI home page</a>, those benefits include
  the abilities to:
</p>
<ul>
  <li>Better organize and maintain UI code.</li>
  <li>
    Use custom controls to provide optimized user interactions or a particular
    visual aesthetic.
  </li>
  <li>
    To begin developing, in the course of one project, a library of reusable UI
    that can accelerate a team’s future projects.
  </li>
  <li>
    Share common UI solutions across teams and organizations so those solutions
    don’t need to be created from scratch each time.
  </li>
</ul>
<h1>
  Investment in QuickUI apps today can be preserved when Web Components arrive
</h1>
<p>
  This is a <em>vision</em>, not a legal commitment. The Web Components spec is
  still in flux and evolving entirely outside the control of anyone working on
  QuickUI, so it’s impossible to promise how things will work in the future.
  Still, it’s plausible that a team could begin creating a web user interface in
  QuickUI today, and as Web Component-enabled browsers arrive and gain use, the
  team could automatically (or, at least, easily) transition to that better
  foundation to improve the performance and reliability of their apps.
</p>
<h1>
  The QuickUI Catalog will evolve into the web’s best open library of reusable
  user interface components
</h1>
<p>
  To an extent, the <a href="https://quickui.org/catalog">QuickUI Catalog</a> of
  common, ready-to-use controls is somewhat independent of the underlying
  QuickUI foundation. At the most abstract level, these are user interface
  patterns that can be found in many applications on many platforms. Even if
  obstacles prevent QuickUI controls from being built as Web Components, the
  existing JavaScript code base for the Catalog would give one a huge headstart
  in creating an equivalent library of Web Components. And if the vision
  outlined here comes to pass, the Catalog’s collection of components — and user
  interfaces built with them — should be able to transition smoothly to a Web
  Components foundation.
</p>
<h2></h2>
<h1>Next steps: investigation of framework differences</h1>
<p>
  While the above points lay out a vision for the coevolution of QuickUI and Web
  Components, many details remain which must be investigated before such a
  vision can come to pass. While the goals of the two frameworks are generally
  aligned, the design principles underlying the two have significant
  differences. For example, QuickUI’s
  <a href="https://quickui.org/docs/principles.html">core design principles</a>
  seem to place greater emphasis on extensibility — creating a new control class
  by extending an existing class — than does the current Web Components spec.
  Such differences could lead to irreconcilable incompatibilities, which would
  represent lost opportunity.
</p>
<p>
  The hope is that any issues can be teased out of the Web Components spec early
  enough and either worked around or submitted for consideration so that they
  may hopefully be addressed. Some key issues warranting further investigation
  are:
</p>
<ol>
  <li>
    A significant fraction of QuickUI controls override their base class’
    content() property setter function in order to perform work when a host sets
    a control’s content. This is done for a variety of reasons: to partially
    fill in a component’s DOM tree (a sort of user interface
    <a href="http://en.wikipedia.org/wiki/Currying">currying</a>); to transform
    content before displaying it; to recalculate layout; or to perform other
    operations dependent upon the content. This is not currently supported in
    the Web Components spec. An analysis of the QuickUI Catalog controls on this
    topic is underway to produce a set of common use cases.
  </li>
  <li>
    A QuickUI subclass maintains an is-a relationship with its base class. The
    &lt;shadow&gt; element in the Web Components spec may lead to subclasses
    that effectively maintain more of a has-a relationship with their parent
    class. It’s not immediately clear, for example, how one could define a base
    class and a subclass that meet all these conditions: a) both use the same
    root element (e.g., &lt;button&gt;), b) both are independently instantiable,
    c) the subclass can host base class elements (e.g., via &lt;shadow&gt;), and
    d) the subclass is a JavaScript instanceof (is-a) of the base class. These
    conditions often arise when extending an existing control class, and QuickUI
    control classes can meet all of them.
  </li>
  <li>
    The Web Components proposal minimizes the impact on the HTML language
    itself, but one repercussion of this appears to be that component classes
    can’t define custom properties that can be set through markup. As currently
    understood, the spec calls for hosts to pass values to components
    exclusively through a single content tree. The component class must then
    prise apart this content through a “select=” attribute so that it can
    incorporate content subelements into different parts of the component.This
    is roughly analogous to the way command-line apps must parse their text
    arguments, with both the flexibility and the potential for great
    inconsistency that go with that. In this context, such flexibility may
    create significant complications for the creation and maintenance of
    subclasses, as varying levels of the class hierarchy impose different
    demands on the content. Overall, this doesn’t feel as specific or clean as
    the compound property syntax in a language like XAML (or
    <a href="https://quickui.org/markup/">QuickUI Markup</a>), in which a
    control class can define custom properties that may be set as string
    attributes, through nested subelements, or through property setter
    functions.
  </li>
</ol>
<p>
  As these issues are investigated more deeply, the results of those
  investigations will be posted here.
</p>
