---
title: Composing mixins to make a solid foundation for web components
date: 2015-11-30 16:00 UTC
originalUrl: https://component.kitchen/blog/posts/composing-mixins-to-make-a-solid-foundation-for-web-components
---

<p>
  We've been searching for a way to quickly create web components by composing
  together pre-defined user interface behaviors, and we have some progress to
  share on that front.
</p>
<p>
  Web components are a great way to package user interface behavior, but they
  may not be the most interesting <em>fundamental</em> unit of behavior. There
  are certain aspects of behavior which you'd like to be able to share across
  components: accessibility, touch gestures, selection effects, and so on. Those
  things aren't top-level components in their own right; they're abstract
  aspects of behavior.
</p>
<p>
  This is something like saying that a chemical molecule is not the fundamental
  unit of physical behavior — the atoms that make up the molecule are. But you
  can't generally handle solitary atoms; atoms react and organize themselves
  into molecules. Likewise, a browser can only handle web components, not
  abstract behaviors. If we imagine a web component as a molecule, what's the
  equivalent of an atom? That is, can we decompose a web component into a more
  fundamental coding unit?
</p>
<p>
  One way to answer this question is to consider a web component as a custom
  element class. Is there a way we can decompose a class into its fundamental
  abstract behavioral aspects? The usual way to compose class behavior in
  JavaScript is with
  <a href="https://en.wikipedia.org/wiki/Mixin">mixins</a>, so perhaps mixins
  can form the fundamental unit of user interface behavior. That is, we'd like
  to be able to compose mixins together to create web component classes.
</p>
<p>For that purpose, mixins present some challenges:</p>
<ul>
  <li>
    The simplest approach to JavaScript mixins will overwrite existing on a
    class, but that's not always desirable. Many web component behaviors want to
    augment an existing method like <code>createdCallback</code>. That is, the
    base class' method <em>and</em> the mixin's method should run.
  </li>
  <li>
    There's no standard JavaScript implementation of mixins. While many user
    interface frameworks (React, Polymer, etc.) include a mixin strategy, those
    are intimately tied to the framework itself. You can very quickly write a
    simple function to copy a mixin onto a class prototype, but that won't
    accommodate the range of complexity needed to define interesting web
    component behaviors.
  </li>
</ul>
<p>
  We thought it would be interesting to create a general-purpose mixin
  architecture that's flexible enough to serve as a foundation for creating web
  components in plain JavaScript. The initial result of that work is a facility
  we call
  <a href="https://github.com/ComponentKitchen/Composable">Composable</a>.
</p>
<p>
  Composable takes the form of a general-purpose factory for composing classes
  and objects from mixins. The most interesting part about it is its use of
  <em>composition rules</em> that let you decide how a mixin's properties and
  methods should be combined with those of the class you're adding the mixin to.
</p>
<p>
  Composable itself is entirely independent of web components, but we've
  designed it to serve as a micro-kernel for web component library or framework.
  An example in the Composable
  <a href="https://github.com/ComponentKitchen/Composable/blob/master/README.md"
    >ReadMe</a
  >
  illustrates how it could be used to construct web components:
</p>

<pre>
// Create a general-purpose element base class that supports composition.
let ComposableElement = Composable.compose.call(HTMLElement, Composable);

// A mixin that sets an element's text content.
class HelloMixin {
  createdCallback() {
    this.textContent = "Hello, world!";
  }
}

// A sample element class that uses the above mixin.
let HelloElement = ComposableElement.compose(HelloMixin);

// Register the sample element class with the browser.
document.registerElement('hello-element', HelloElement);

// Create an instance of our new element class.
let element = document.createElement('hello-element');
document.body.appendChild(element); // "Hello, world!"
</pre>

<p>
  We'll share more on this direction as we go, but for now we wanted to share
  this as a fundamental building block. Even if you're not creating web
  components, you could use Composable to give your application or framework a
  flexible mixin architecture.
</p>
