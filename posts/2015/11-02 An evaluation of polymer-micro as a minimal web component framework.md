---
title: An evaluation of polymer-micro as a minimal web component framework
date: 2015-11-02 17:00 UTC
originalUrl: https://component.kitchen/blog/posts/an-evaluation-of-polymer-micro-as-a-minimal-web-component-framework
---

<p>
  Our
  <a href="https://github.com/basic-web-components/basic-web-components"
    >Basic Web Components</a
  >
  project currently creates its components using Google&#39;s
  <a href="https://www.polymer-project.org">Polymer</a> framework, but we&#39;ve
  been evaluating the use of the smaller polymer-micro core as a replacement for
  full Polymer. The polymer-micro core appears to be a useful web component
  framework in its own right, and may provide nearly everything a component
  library like ours needs.
</p>
<h2>Is Polymer the best choice for our open project?</h2>
<p>
  We believe that
  <a
    href="/posts/2015/10-26-nobody-writes-production-web-components-in-vanilla-js-so-using-a-framework-makes-total-sense.html"
    >some amount of framework is necessary to create web components</a
  >. For a very long time, Polymer has been the primary web component framework.
  We love Polymer! However, we feel that Polymer has grown to the point where
  writing a Polymer app feels distinctly different from writing a typical HTML
  app.
</p>
<p>
  Polymer provides numerous helpers that reduce the amount of copy-and-paste
  boilerplate code required to invoke standard DOM features. In current
  parlance, it wants to make component code as
  <a href="https://en.wikipedia.org/wiki/Don%27t_repeat_yourself">DRY</a> as
  possible. For example, Polymer provides a &quot;listeners&quot; key for wiring
  up event handlers with less code than a direct invocation of the underlying
  addEventListener(). Polymer&#39;s &quot;properties&quot; key similarly
  simplifies definition of component properties instead of directly defining
  property getter/setters on the component prototype and marshalling attributes
  to properties with attributeChanged().
</p>
<p>
  We think Polymer&#39;s goal is commendable. If you can afford to train up a
  team of developers on Polymer&#39;s specific way of doing things, your team
  should be able to crank out web UI code very efficiently.
</p>
<p>
  But as with any higher-level abstraction, these helpers trade off clarity and
  simplicity for a certain degree of magic and complexity. Each reduction in the
  amount of component code a developer must write forces an increase in the
  arcane Polymer-specific knowledge a developer must acquire to write
  <em>or even read</em> component code. It also hides details that may
  complicate debugging and maintenance.
</p>
<p>
  For our open source project, those second-order effects reduce the potential
  pool of project contributors. Our priority is not time-to-market, but rather
  creating code which is self-evident to our open source users and potential
  contributors. Although 1 line of Polymer code might do the work of 3 lines of
  standard web code, if those 3 lines are more understandable to a wider base of
  developers, we might prefer the longer, clearer version.
</p>
<h2>Carrying forward the burden of backward compatibility</h2>
<p>
  Another issue we&#39;re grappling with is Polymer is very much designed for
  this era immediately before web components emerge with native support across
  all mainstream browsers. Polymer wants, quite reasonably, to accommodate
  browsers that don&#39;t yet support web components. At the same time, Polymer
  also wants to deliver decent performance, notably on Mobile Safari, which
  <em>at this time</em> does not support native Shadow DOM. Rather than use the
  full Shadow DOM polyfill, Polymer introduced its own
  <a href="https://www.polymer-project.org/1.0/docs/devguide/local-dom.html"
    >Shady DOM</a
  >
  approach for approximating Shadow DOM behavior on older browsers.
</p>
<p>
  Shady DOM is an impressive technical accomplishment. But having written a
  great deal of Shady DOM code this year, it&#39;s our subjective opinion that
  Shady DOM code feels clunky. Even after months of writing Shady DOM code,
  wrapping DOM calls with Polymer.dom() still doesn&#39;t feel natural. And
  it&#39;s hard to explain to someone why they can&#39;t just call
  appendChild(), but have to call Polymer.dom().appendChild() instead. And while
  Polymer.dom() is somewhat future-proof, it doesn&#39;t feel future-facing. It
  erodes the original, extremely elegant vision for Polymer and the web
  components polyfills: to let people to write web components for future web
  browsers today.
</p>
<p>
  The alternative to Shady DOM today is to use the
  <a href="https://github.com/WebComponents/webcomponentsjs"
    >full Shadow DOM polyfill</a
  >. That entails slower performance and — given inevitable leaks in the
  abstraction — a greater potential for mysterious bugs. On the plus side, the
  full Shadow DOM polyfill lets one write clearer, future-facing code. With all
  the major browser vendors on board with Shadow DOM v1, the need to download
  and use the Shadow DOM polyfill on most devices should fade over the course of
  2016.
</p>
<p>
  We&#39;re also excited about the advent of ES6, with features like arrow
  functions that let code be more concise. Writing an addEventListener() call is
  no longer a substantial burden in ES6, or at least not enough to warrant a
  parallel system for event listener wiring. And using built-in ES6 classes
  feels better than calling a purpose-focused class factory like Polymer().
</p>
<h2>Considering polymer-micro instead of full Polymer</h2>
<p>
  It turns out that, underneath all of Polymer&#39;s DRY magic, there&#39;s a
  very clean, simple core called polymer-micro. Polymer is helpfully constructed
  in three layers: full Polymer on top, a smaller polymer-mini below that, then
  a tiny polymer-micro at the bottom. The
  <a
    href="https://www.polymer-project.org/1.0/docs/devguide/experimental.html#polymer-micro"
    >documentation</a
  >
  describes polymer-micro as &quot;bare-minimum Custom Element sugaring&quot;.
</p>
<p>
  Rather than use the full Polymer framework, we&#39;ve been investigating
  whether polymer-micro on its own could meet our needs. Building on top of
  polymer-micro confers a number of advantages over writing our own web
  component framework:
</p>
<ul>
  <li>
    Google has already invested an enormous amount of money and resources
    developing Polymer, including polymer-micro, and will probably continue to
    do so for the foreseeable future.
  </li>
  <li>
    The thousands of people using full Polymer today are <em>also</em> using
    polymer-micro. That means lots of testing of the polymer-micro core.
  </li>
  <li>
    From its commit history, polymer-micro looks fairly stable. A substantial
    amount of future Polymer work will likely happen in the upper levels.
  </li>
  <li>
    In terms of file size, polymer-micro is significantly smaller than full
    Polymer, although we don&#39;t see that as a huge advantage.
  </li>
  <li>
    Relying on a small core like polymer-micro makes it easier to migrate to
    another framework when a better framework comes along.
  </li>
</ul>
<p>
  The polymer-micro layer happens to provide most of the features upon which
  Basic Web Components depend:
</p>
<ul>
  <li>Custom element registration.</li>
  <li>Lifecycle support.</li>
  <li>Declared properties.</li>
  <li>Attribute deserialization to properties.</li>
  <li>Behaviors.</li>
</ul>
<p>
  On the flip side, Basic Web Components use a number of Polymer features which
  polymer-micro does <em>not</em> provide:
</p>
<ol>
  <li>
    <p>
      Shadow root Instantiation. If you use polymer-micro, you&#39;re expected
      to create a shadow root yourself.
    </p>
  </li>
  <li>
    <p>
      Templates. If you want to use the <code>&lt;template&gt;</code> element to
      define initial content of a component&#39;s Shadow DOM, you need to manage
      that yourself.
    </p>
  </li>
  <li>
    <p>
      Shimming for CSS styles. The full Shadow DOM polyfill requires that CSS be
      transformed to minimize styles leaking across a custom element boundaries.
      Full Polymer takes care of that for you, but using polymer-micro directly
      means that style shimming becomes your concern.
    </p>
  </li>
  <li>
    <p>
      Automatic node finding. This lets your component code refer to a
      sub-element <code>&lt;button id=&quot;foo&quot;&gt;</code> with
      <code>this.$.foo</code>. Complex components need a consistent and easy way
      to refer to subelements within the local Shadow DOM. Polymer&#39;s
      <code>this.$</code> syntax satisfies those criteria, although we&#39;re
      really torn as to whether that sugar is worth it. It saves keystrokes, but
      isn&#39;t a web-wide convention. It may give an unfamiliar flavor to web
      component code.
    </p>
  </li>
  <li>
    <p>
      ready() callback. Many of the Basic Web Components use Polymer&#39;s
      <a
        href="https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html#ready-method"
        >ready callback</a
      >
      to initialize themselves. Polymer takes pains to ensure that any Polymer
      elements inside a component&#39;s local Shadow DOM have their own ready
      callback fired <em>before</em> the outer component&#39;s ready callback is
      fired.
    </p>
  </li>
  <li>
    <p>
      CSS mixins. This is Polymer&#39;s current answer for visual themes for
      components. It&#39;s based on a not-yet-standard proposal for extensions
      to CSS. Without full Polymer, you have to invent your own theming
      architecture.
    </p>
  </li>
</ol>
<p>
  All the above features are provided at the levels above polymer-micro: either
  polymer-mini or full Polymer. However, those upper levels bring along a number
  of features we don&#39;t use, or would be happy to drop. Those features
  include:
</p>
<ul>
  <li>Data binding</li>
  <li>Event listener setup (&quot;listeners&quot; key)</li>
  <li>Annotated event listener setup (in markup)</li>
  <li>Property change callbacks</li>
  <li>Computed properties</li>
  <li>reflectToAttribute</li>
</ul>
<p>
  These features all have some appeal, but in our estimation may add more
  complexity than they&#39;re worth to an open source project aiming for a
  general developer audience.
</p>
<p>
  Lastly, there are a few higher-level Polymer features we have to use, but wish
  we didn&#39;t have to:
</p>
<ul>
  <li>
    <p>
      <code>&lt;dom-module&gt;</code>. This is used as a wrapper around a
      <code>&lt;template&gt;</code> element, but it&#39;s hard to fathom why
      <code>&lt;dom-module&gt;</code> is necessary. It seems designed to support
      a use case we don&#39;t care about: defining a template in one file, then
      using it in a component defined in a separate file. Yet by far the most
      common way to define a Polymer component is to put its template and script
      definition in the same file. It&#39;s unfortunate full Polymer doesn&#39;t
      offer a better way to use a real <code>&lt;template&gt;</code>directly.
      (Although a trick does let you accomplish that in an unofficial way; see
      below.)
    </p>
  </li>
  <li>
    <p>
      Polymer.dom(). As noted above, this feels awkward, like you&#39;re not
      using the web. It&#39;s also confusing to experienced web developers
      looking at Polymer code for the first time.
    </p>
  </li>
</ul>
<h2>Prototyping a minimal component framework on top of polymer-micro</h2>
<p>
  With the above motivation, we considered the question:
  <em
    >What is the smallest amount of code that must be added to polymer-micro to
    create a web component framework that meets our project&#39;s needs?</em
  >
</p>
<p>
  This experiment entailed a fair amount of spelunking in the Polymer codebase.
  That exploration informed the creation of a little prototype web component
  framework called
  <a href="https://github.com/ComponentKitchen/polymer-micro-test"
    >polymer-micro-test</a
  >
  that uses only polymer-micro as its base. In this prototype framework, we
  wrote a small amount of code (<a
    href="https://github.com/ComponentKitchen/polymer-micro-test/blob/master/minimalComponent.js"
    >minimalComponent.js</a
  >) to implement the 5 numbered features above which we want but are missing in
  polymer-micro.
</p>
<p>
  We then used the prototype framework to create a couple of sample components,
  such as a sample t<a
    href="https://github.com/ComponentKitchen/polymer-micro-test/blob/master/test-element.html"
    >est-element</a
  >
  component. A
  <a href="https://componentkitchen.github.io/polymer-micro-test/index.html"
    >live demo</a
  >
  of a simple
  <a
    href="https://github.com/ComponentKitchen/polymer-micro-test/blob/master/index.html"
    >page</a
  >
  shows the test-element component in use. By virtue of using the full
  polyfills, components created in this prototype framework can run in all
  mainstream browsers.
</p>
<p>
  Overall, the results of this experiment were fairly positive. Looking at each
  feature in turn:
</p>
<ol>
  <li>
    <p>
      Creating a shadow root yourself is easy. This is only necessary for
      components with templates (next point).
    </p>
  </li>
  <li>
    <p>
      Stamping out a template is easy. The smallest amount of code we could
      envision for this is for a component to declare a &quot;template&quot;
      property. This can be used in conjunction with HTML Imports for a fairly
      clean connection between the script and the template:
    </p>
    <pre><code>&lt;template id=&quot;test-element&quot;&gt;
  ... template goes here ...
&lt;/template&gt;

&lt;script&gt;
Polymer({
  is: &#39;test-element&#39;,
  template: currentImport.querySelector(&#39;#test-element&#39;)
});
&lt;/script&gt;
</code></pre>
    <p>
      Aside: we <em>really</em> like being able to use a plain
      <code>template</code> to define component content. It turns out that you
      can actually do this in full Polymer today, although it&#39;s something of
      a trick that depends upon your component defining an undocumented
      <code>_template</code> variable. See this
      <a href="https://gist.github.com/JanMiksovsky/ef59c30222b5d5fc06b5"
        >gist</a
      >, which works in full Polymer.
    </p>
  </li>
  <li>
    <p>
      Shimming CSS styles took a little investigation, but it turns out the full
      Shadow DOM polyfill exposes its CSS-shimming code as ShadowCSS. The first
      time this test framework is going to stamp a template, it just invokes
      ShadowCSS to shim any <code>&lt;style&gt;</code> elements found in the
      template. It then saves the shimmed result for subsequent stamping into
      the shadow root.
    </p>
  </li>
  <li>
    <p>
      Automatic node finding. If we conclude we really need this feature,
      it&#39;s not that hard to implement ourselves. Right after the test
      framework stamps a template, it queries for all the elements in the shadow
      tree that have an <code>id</code> attribute, then adds those elements to
      <code>this.$</code>. This gives us a type of automatic node finding that
      meets our needs. Polymer&#39;s own implementation of the same feature is
      much more complex. It appears to do a lot of tree-parsing so in
      preparation for data binding, but since we don&#39;t need data binding, we
      don&#39;t need to do that work.
    </p>
  </li>
  <li>
    <p>
      The ready() method is a bit of a puzzle to us. The Shadow DOM spec already
      defines two callbacks, createdCallback() and attachedCallback(), that can
      cover most of what we&#39;re currently doing in ready(). One issue is that
      createdCallback() and attachedCallback() are synchronous, while the
      Polymer ready() code takes enormous pains to handle asynchronous calls.
      That is likely necessary to support their asynchronous data binding model.
      That is, if your component has a sub-component with data bindings, you
      want all those asynchronous data bindings to settle down first before your
      top-level component does its own initialization. Since we&#39;re not
      interested in data binding, however, it&#39;s not clear whether we need
      ready(). Our sample element just uses the standard callbacks.
    </p>
  </li>
  <li>
    <p>
      CSS mixins. This remains an open question for us. It&#39;s hard to imagine
      what we could do to allow component users to theme our components. At the
      same time, we&#39;re not convinced that the not-yet-standard CSS mixins
      are going to actually become a standard. The troubled history of
      vendor-prefixed CSS feature experiments suggests that one company&#39;s
      early interpretation of a hypothetical, future CSS mixin
      &quot;standard&quot; might significantly complicate things down the road
      when a real standard is finally established.
    </p>
  </li>
</ol>
<p>
  This small prototype framework delivers most of the features required by Basic
  Web Components. The main exception is that it offers no facility for component
  theming (point #6 above).
</p>
<p>Some other notes:</p>
<ul>
  <li>
    <p>
      Because polymer-micro supports Polymer
      <a href="https://www.polymer-project.org/1.0/docs/devguide/behaviors.html"
        >behaviors</a
      >
      (mixins), we were able to implement all of the prototype&#39;s features in
      a behavior. That&#39;s quite elegant. It means our sample components can
      use those features simply by calling the standard Polymer() class factory
      and listing this prototype behavior in the &quot;behaviors&quot; key. It
      was a nice surprise that we didn&#39;t have to create our own component
      class factory for that.
    </p>
  </li>
  <li>
    <p>
      To take advantage of Polymer&#39;s own attribute-to-property marshalling
      feature, we had to invoke an undocumented internal method in
      polymer-micro. If more people were building directly on top of
      polymer-micro, such facilities could probably be promoted to supported
      features.
    </p>
  </li>
  <li>
    <p>
      Taking advantage of existing Polymers facilities (both official and
      undocumented) and polyfill features like ShadowCSS means that our little
      prototype framework can be tiny, less than 1K in size. That gets added to
      the size of polymer-micro, which is currently about 15K uncompressed.
      Combined, that 16K is a lot smaller than the full Polymer, about 105K
      uncompressed.
    </p>
  </li>
  <li>
    <p>
      Any decrease in framework file size is more than offset by the need to use
      the full web component polyfills, which are much larger than the
      &quot;lite&quot; version used with Shady DOM. Still, since we think the
      need for the full polyfills will drop over the course of 2016, we&#39;re
      not particularly concerned about that.
    </p>
  </li>
</ul>
<h2>Conclusions</h2>
<p>
  While this is just an experiment, it&#39;s intriguing to consider using
  polymer-micro as the basis for a minimalist web component framework.
</p>
<ul>
  <li>
    <p>
      A minimalist framework leads to component code which we believe is easier
      for a general web developer to read.
    </p>
  </li>
  <li>
    <p>
      Letting a component developer work at a lower level of abstraction —
      &quot;closer to the metal&quot; — means they have a greater capacity to
      diagnose problems when things inevitably go wrong. There&#39;s less
      mystery to clear away, so problems can be understood and fixed, rather
      than worked around.
    </p>
  </li>
</ul>
<p>
  Despite these advantages, we&#39;re not yet ready to say that we&#39;re
  actually going to <em>use</em> this prototype to create components. As noted
  above, our goal is to foster a codebase that can be readily comprehensible to
  a wide audience of web developers. Using a proprietary framework, even a tiny
  one, impedes that goal. (Basic Web Components traces its ancestry to an
  earlier component library called QuickUI which
  <a
    href="http://blog.quickui.org/2013/12/01/some-lessons-from-an-open-source-project-that-never-gained-critical-mass/"
    >never gained critical mass</a
  >, in part because it was built on a proprietary framework.)
</p>
<p>
  Using polymer-micro as the basis for a proprietary framework would be better
  than writing a framework from scratch, but every bit of code added on top of
  polymer-micro runs the risk of producing a framework in its own right — one
  distinct and unfamiliar to our developer audience.
</p>
<p>
  A minimalist strategy like this would only have meaning to us if it&#39;s
  shared by other people. To that end, we&#39;ve begun talking with other web
  component organizations to explore this idea a bit further. We&#39;re not sure
  where that discussion will go, but it&#39;s interesting, and might bear fruit
  in the form of a new, minimalist web component framework. If you&#39;d be
  interested in participating in that discussion, please ping us at
  <a href="https://twitter.com/ComponentK">@ComponentK</a>.
</p>
