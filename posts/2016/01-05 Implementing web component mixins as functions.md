---
title: Implementing web component mixins as functions
originalUrl: https://component.kitchen/blog/posts/implementing-web-component-mixins-as-functions
---

<p>
  In response to our last post on
  <a href="/blog/posts/building-web-components-from-a-loose-framework-of-mixins"
    >building components from a loose collection of mixins</a
  >, a helpful commenter
  <a href="https://plus.google.com/+JanMiksovsky/posts/bFBBGB8kEs8"
    >referred us to another mixin library</a
  >
  he had released called
  <a href="https://github.com/justinfagnani/mixwith.js">mixwith.js</a>. That
  library treats mixins more as a pattern than a thing. In that pattern, a mixin
  is simply a function that takes a base class and returns a subclass of that
  base class with the desired new features.
</p>
<p>
  We were intrigued by this approach. As we've blogged about before, we're
  really only interested in coding approaches that can be shared with other
  people. This functional approach would allow us to lower the barrier to
  adopting a given mixin. As much as we like the Composable class discussed in
  that earlier post, using mixins that way requires adoption of that class. It's
  not quite a framework — it's more of a kernel for a framework — but it's still
  a bit of shared library code that must be included to use that style of mixin.
</p>
<p>
  Here's an example of a mixin class using that Composable approach. This
  creates a subclass of HTMLElement that incorporates a TemplateStamping mixin.
  That mixin will take care of stamping a `template` property into a Shadow DOM
  shadow tree in the element's `createdCallback`.
</p>
<pre>
<code>
import Composable from 'Composable'
import TemplateStamping from 'TemplateStamping';

class MyElement extends Composable.compose(HTMLElement, TemplateStamping) {
  get template() {
    return `Hello, world.`;
  }
}
</code>
</pre>
<p>
  That's pretty clean — but notice that we had to `import` two things: the
  Composable helper class, and the TemplateStamping mixin class.
</p>
<p>
  The functional approach implements the mixin as a function that applies the
  desired functionality. The mixin is self-applying, so we don't need a helper
  like Composable above. The example becomes:
</p>
<pre>
<code>
import TemplateStamping from 'TemplateStamping';

class MyElement extends TemplateStamping(HTMLElement) {
  get template() {
    return `Hello, world.`;
  }
}
</code>
</pre>
<p>
  That's even cleaner. At this point, we don't even really have a framework per
  se. Instead we have a convention for building components from mixin functions.
  The nice thing about that is that such a mixin could conceivably be used with
  custom elements created by other frameworks. Interoperability isn't
  guaranteed, but the possibility exists.
</p>
<p>
  We like this so much that we've changed out nascent
  <a href="https://github.com/ComponentKitchen/core-component-mixins"
    >core-component-mixins</a
  >
  project to use mixin functions. Because there's so little involved in adopting
  this sort of mixin, there's a greater chance it will find use, even among
  projects that write (or claim to write)
  <a
    href="/posts/2015/10-26-nobody-writes-production-web-components-in-vanilla-js-so-using-a-framework-makes-total-sense.html"
    >web components in plain javascript</a
  >. Again, that should accelerate adoption.
</p>
<p>
  The most significant cost we
  <a href="https://github.com/ComponentKitchen/core-component-mixins/issues/1"
    >discussed in making this change</a
  >
  is that a mixin author needs to write their mixin methods and properties to
  allow for composition with a base class. The Composable class had provided
  automatic composition of methods and properties along the prototype chain
  according to a set of rules. In a mixin function, that work needs to be done
  manually by the mixin author.
</p>
<p>
  We've identified a series of
  <a
    href="https://github.com/ComponentKitchen/core-component-mixins/blob/master/Composition%20Rules.md"
    >composition rules</a
  >
  that capture our thinking on how best to write a mixin function that can
  safely applied to arbitrary base classes. The rules are straightforward, but
  do need to be learned and applied. That said, only the <em>authors</em> of a
  mixin need to understand those, and that's a relatively small set of people.
</p>
<p>
  Most people will just need to know how to <em>use</em> a mixin — something
  that's now as easy as calling a function.
</p>
