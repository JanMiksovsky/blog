---
title: "Quetzal, take 2: creating general-purpose UI components as Polymer elements"
date: 2013-07-17
originalUrl: http://blog.quickui.org/2013/07/17/quetzal-take-2-creating-general-purpose-ui-components-as-polymer-elements/
---

<p>
  Just an update to the experimental
  <a href="http://janmiksovsky.github.io/quetzal/">Quetzal project</a> I posted
  about last month. I've learned quite a bit, and have changed course on two
  significant points, and thought I'd share a bit about my experiences with
  others who might be contemplating the creation of a framework or UI component
  library on top of web components.
</p>
<p>
  <strong>A limitation of the current web component architecture</strong>
</p>
<p>
  So far, the greatest challenge in replicating the range of expression in
  QuickUI's UI components has been the inability to easily <a
    href="http://blog.quickui.org/2013/06/11/puzzle-define-html-custom-element-subclasses-that-can-fill-in-base-class-insertion-points/"
    >define HTML custom element subclasses that can fill in base class insertion
    points</a
  >. To their credit, Google's Blink (rendering engine) and Polymer (web
  component framework) teams have been responsive on that point. In response to
  a Polymer discussion board thread related to that post, a bug has been filed
  to allow one to <a href="https://www.w3.org/Bugs/Public/show_bug.cgi?id=22344"
    >distribute content nodes into a &lt;shadow&gt; insertion point</a
  >. Unless you're already experimenting with Shadow DOM, this entire issue
  undoubtedly seems quite arcane, but rest assured, fixing this one problem
  would open up a lot of important new territory. I'm sincerely hoping this
  proposal is adopted. In the meantime, I've been using a workaround to simulate
  the effects of that proposal. That unfortunately <a
    href="https://github.com/Polymer/polymer/issues/203"
    >broke in a recent Polymer update</a
  >, but such setbacks are to be expected when building on shifting sand.
</p>
<p>
  <strong>Trying Polymer elements</strong>
</p>
<p>
  I've spent some time experimenting with Polymer's own element layer, and last
  month decided to try adopting it. My first cut at creating custom elements for
  Quetzal was based directly on Polymer's lower levels, which take care of
  polyfilling (emulating) various web component standards. I'm now trying to use
  the higher-level Polymer elements layer, which provides a richer framework for
  creating custom elements, and adds a number of features to simplify common
  component tasks. These features are not part of any web component standard,
  but by virtue of being done by Google, will nevertheless probably become a
  common feature of the web component landscape. There are still a number
  of QuickUI features that have no parallel in standard web components or
  Polymer elements, but most of those missing features appear to be things which
  I could implement on top of Polymer elements. For example, a
  &lt;quetzal-element&gt; base class could provide those missing features,
  making it easy for new element classes to obtain them. Aside from the critical
  limitation mentioned above, it now appears to me that most (hopefully, all) of
  QuickUI could likely be implemented as Polymer elements. With that change, the
  latest Quetzal iteration recreates a handful of <a
    href="https://quickui.org/catalog/"
    >QuickUI Catalog</a
  >
  elements as Polymer elements. So far, this approach feels acceptable, and it
  would obviously be a big advantage to leave most of the heavy lifting to the
  Polymer team, and focus on actually creating new custom elements. Some notes
  on switching to Polymer elements:
</p>

<ul>
  <li>
    Using HTML to declare an element template feels quite verbose and cumbersome
    compared to QuickUI's use of CoffeeScript's concise JavaScript object
    format. If you haven't tried CoffeeScript, it improves over plain JavaScript
    object syntax by using indentation instead of requiring tons of curly braces
    and commas. Using HTML feels comparatively ponderous and noisy, and to me
    all that noise makes custom element source files somewhat less
    legible. Still, HTML <em>is</em> the lingua franca of the web, and using a
    standard confers a huge advantage over a proprietary format, however
    efficient it might be. At some point, the Polymer team says they'll support
    an imperative JavaScript means to define custom elements, but for now I'm
    guessing the vast majority of custom elements will use HTML, so that's what
    I want to try.
  </li>
  <li>
    Speaking of standard formats, one aspect of Polymer that's recently changed
    is that the top-level tag used to define a new element is now
    &lt;polymer-element&gt;, instead of the standard &lt;element&gt;. While
    Polymer elements are now just as locked into the Polymer framework as
    before, this change makes it feel like I'm no longer using a web standard —
    it feels like just another proprietary UI framework that happens to use
    XML/HTML as its format. It's surprising what a difference this small change
    makes. Using &lt;element&gt; simply <em>felt</em> better.
  </li>
</ul>
<p>
  <strong>Going back to plain JavaScript</strong>
</p>
<p>
  Switching the top-level component container to HTML instead of script has also
  prompted me to give up CoffeeScript, at least for now. I actually tried using
  a combination of CoffeeScript and HTML, but it felt like I was working against
  the grain, and I ended up giving up on that approach. Going from CoffeeScript
  back to plain JavaScript is an excruciating experience. Oliver Wendell Holmes
  said, "Man's mind, once stretched by a new idea, never regains its original
  dimensions." I think the programming language analogue here is: once your
  brain has been expanded by a language that lets you more clearly express your
  intensions, trying to cram your brain back into the tiny box of a less
  expressive language is unbelievably painful. Every single time I have to write
  a JavaScript loop instead of a CoffeeScript list comprehension, or type
  "function() {}.bind(this)" instead of just "=&gt;", I physically wince a bit.
  JavaScript just feels gross, it looks gross, it <em>is</em> gross. That said,
  JavaScript is the standard. One thing I've learned from QuickUI is that if
  you're trying to build a community around a common library, creating that
  library in a programming language with a narrow audience dramatically limits
  the rate at which you can grow. One commenter named "jokester" offered on my
  original Quetzal post: "I’ll unfortunately not contribute to a project coded
  in CoffeeScript." Regardless of the advantages I believe CoffeeScript offers
  to developers, I'd rather allow orders of magnitude more people to contribute
  in the standard JavaScript language they're already proficient in. Anyway,
  that's about the state of things. This Quetzal project is still just an
  experiment, and doesn't do much useful yet, but it's proving a good way to
  learn.
</p>
