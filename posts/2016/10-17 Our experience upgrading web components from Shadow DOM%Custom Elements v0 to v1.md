---
title: Our experience upgrading web components from Shadow DOM/Custom Elements v0 to v1
originalUrl: https://component.kitchen/blog/posts/our-experience-upgrading-web-components-from-shadow-domcustom-elements-v0-to-v1
---

<p>
  With Google now shipping both Shadow DOM v1 and Custom Elements v1 in Chrome,
  and Apple shipping Shadow DOM v1 in Safari, we’ve been upgrading the
  <a href="https://github.com/basic-web-components/basic-web-components"
    >Basic Web Components</a
  >
  library from the original v0 specs to v1. Here’s what we learned, in case
  you’re facing a similar upgrade of your own components, or just want to
  understand some ramifications of the v1 changes.
</p>

<h2>Upgrading components to Shadow DOM v1: Easy!</h2>
<p>
  Google developer Hayato Ito has a great summary of
  <a href="http://hayato.io/2016/shadowdomv1/">What’s New in Shadow DOM v1</a>.
  Adapting our components to accommodate most of the changes on that list was
  trivial, often just a matter of Find and Replace. The v0 features that were
  dropped were ones we had never used (multiple shadow roots, shadow-piercing
  CSS combinators) or had avoided (<code>&lt;content select=”...”></code>), so
  their absence in v1 did not present a problem.
</p>
<p>
  One v1 feature that we had heavily lobbied for was the addition of the
  slotchange event. The ability of an element to detect changes in its own
  distributed content is a critical addition to the spec. We are happy to
  replace our old, hacky method of detecting content changes with the new,
  official slotchange event. This allows us to easily write components that meet
  the
  <a href="https://github.com/webcomponents/gold-standard/wiki/Content-Changes"
    >Content Changes</a
  >
  requirement on the Gold Standard checklist for web components.
</p>

<h2>Upgrading components to Custom Elements v1: Some challenges</h2>
<p>
  The changes from Custom Elements v0 to v1 were more challenging, although some
  were easy:
</p>
<ul>
  <li>
    Replacing <code>document.registerElement()</code> with
    <code>customElements.define()</code>. No issues.
  </li>
  <li>
    Drop support for <code>is=""</code> syntax. Ever since Apple announced that
    they would not support the syntax, we’ve avoided it. As a workaround, a
    while back we created a general wrapper component called
    <a
      href="https://github.com/basic-web-components/basic-web-components/tree/master/packages/basic-wrapped-standard-element"
      >WrappedStandardElement</a
    >.
  </li>
  <li>
    Tweaks in lifecycle callback timing. There were spirited spec debates over
    the exact points in time when a component’s lifecycle callbacks should be
    invoked, but we didn’t notice any practical differences between v0 and v1.
  </li>
  <li>
    <code>attributeChangedCallback</code> automatically invoked at constructor
    time. This was a welcome change that allowed us to simplify our
    <a
      href="https://github.com/basic-web-components/basic-web-components/blob/master/packages/basic-component-mixins/docs/AttributeMarshalling.md"
      >AttributeMarshalling</a
    >
    mixin, which automatically translates attribute changes into property
    updates.
  </li>
</ul>

<p>
  One small obstacle we hit is that a v1 component now needs to declare which
  attributes it wants to monitor for changes. This performance optimization in
  Custom Elements v1 requires that your component declare an
  <code>observedAttributes</code> array to avoid getting
  <code>attributeChangedCallback</code> invocations for attributes you don’t
  care about. That sounds simple, but in our mixin-based approach to writing
  components, it was actually a bit of a pain. Each mixin had to not only
  declare the attributes it cared about, but it had to cooperatively construct
  the final <code>observedAttributes</code> array. We eventually hit on the idea
  of having the aforementioned AttributeMarshalling mixin programmatically
  inspect the component class for all custom properties, and automatically
  generate an appropriate array of attributes for
  <code>observedAttributes</code>. That seems to be working fine.
</p>
<p>
  A more problematic change in v1 is that component initialization is now done
  in a class constructor instead of a <code>createdCallback</code>. The change
  itself is a desirable one, but we expected it would be tricky, and it was. The
  biggest problem we’ve encountered is that the list of
  <a
    href="http://w3c.github.io/webcomponents/spec/custom/#custom-element-conformance"
    >Requirements for custom element constructors</a
  >
  prohibits a new component from setting attributes in its constructor. The
  intention, as we understand it, is to mirror standard element behavior.
  Calling <code>createElement('div')</code> returns a clean div with no
  attributes, so calling <code>createElement('my-custom-element')</code> should
  return a clean element too, right?
</p>
<p>
  That sounds good but turns out to be limiting. Custom elements can’t do
  everything that native elements can, and sometimes the only way to achieve a
  desired result is for a custom element to add an attibute to itself:
</p>
<ol>
  <li>
    A component wants to define default ARIA attributes for accessibility
    purposes. For example, our
    <a
      href="https://github.com/basic-web-components/basic-web-components/tree/master/packages/basic-list-box"
      >ListBox</a
    >
    component needs to add <code>role=”listbox”</code> to itself. That helps a
    screen reader interpret the component correctly, without the person using
    the component having to know about or understand ARIA. That
    <code>role</code> attribute is a critical part of a ListBox element, and
    needs to be there by default.
  </li>
  <li>
    A component wants to reflect its state as CSS classes so that component
    users can provide state-dependent styling. For example, our
    <a
      href="https://github.com/basic-web-components/basic-web-components/tree/master/packages/basic-collapsible-panel"
      >CollapsiblePanel</a
    >
    component wants to let designers style its open and closed appearances by
    adding CSS classes that reflect the open/closed state. This component
    reflects the current state of its <code>closed</code> property via CSS
    classes. It’s reasonable that a component would want to set the initial
    state of that <code>closed</code> property in a constructor. But setting
    that default value of that property in the constructor will trigger the
    update to the CSS class, which is not permitted in Custom Elements v1.
  </li>
</ol>

<p>
  In these cases, it doesn’t seem like it would be hard to just set the
  attributes in the connectedCallback instead. In practice, it introduces
  complications because a web app author that instantiates a component would
  like to be able to immediately make changes to it before adding it to the
  document. In the first scenario above, the author might want to adjust the
  <code>role</code> attribute:
</p>

<pre>
class ListBox extends HTMLElement {
  connectedCallback() {
    this.setAttribute('role', 'listbox');
  }
}

let listBox = document.createElement('basic-list-box');
listBox.setAttribute('role', 'tabs'); // Set custom role
document.body.appendChild(listBox); // connectedCallback will overwrite role!
</pre>

<p>
  Because ListBox can’t apply a default <code>role</code> attribute at
  constructor time, its connectedCallback will have to take care to see if a
  <code>role</code> has already been set on the component before applying a
  default value of <code>role=”listbox”</code>. It’s easy for a developer to
  forget such a check. The result will likely be components that belatedly apply
  default attributes, stomping on top of attributes that were applied after the
  constructor and before the component is added to the document.
</p>
<p>
  Another problem comes up in the second scenario above. The creator of the
  component would like to be able to write a property getter/setter that
  reflects its state as CSS classes:
</p>

<pre>
let closedSymbol = Symbol('closed');

class CollapsiblePanel extends HTMLElement {

  constructor() {
    // Set defaults
    this.closed = true; // Sets the “class” attribute, so will throw!
  }

  get closed() {
    return this[closedSymbol];
  }
  set closed(value) {
    this[closedSymbol] = value;
    this.toggleClass('closed', value);
    this.toggleClass('opened', !value);
  }

}
</pre>

<p>
  Since the above code won’t work, the developer has to take care to defer all
  attribute writes (including manipulations of the classList, which updates the
  <code>class</code> attribute) to the <code>connectedCallback</code>. To make
  that tolerable, we ended up creating
  <a
    href="https://github.com/basic-web-components/basic-web-components/blob/master/packages/basic-component-mixins/src/safeAttributes.js"
    >safeAttributes</a
  >, a set of helper functions that can defer premature calls to
  <code>setAttribute()</code> and <code>toggleClass()</code> to the
  <code>connectedCallback</code>.
</p>
<p>
  That’s working for now, but it feels like the v1 restrictions on the
  constructor are overly limiting. The intention is to ensure that the component
  user gets a clean element from <code>createElement()</code> — but if the
  resulting element is just going to add attributes to itself in the
  <code>connectedCallback</code>, is that element really clean? As soon as the
  attribute-less element is added to the document, it will suddenly grow new
  attributes. In our opinion, that feels even more surprising than having
  <code>createElement()</code> return an element with default attributes.
</p>

<h2>The current state of Shadow DOM and Custom Elements v1</h2>
<p>
  Overall, we’re excited that we’ve got our components and mixins working in
  production Chrome 54, which just shipped last week with support for both
  Shadow DOM v1 and Custom Elements v1. The Chrome implementation of the specs
  feels solid, and we haven’t hit any bugs.
</p>
<p>
  Shadow DOM v1 is also coming together in Safari, including in Mobile Safari.
  At the moment, it feels more like a beta than a production feature — we’ve hit
  a number of critical bugs in WebKit that prevent most of our components from
  working. Apple’s working through those bugs, and we hope to see WebKit’s
  support for Shadow DOM improve soon.
</p>
<p>
  In the meantime, Google has been doing the thankless, herculean task of
  upgrading the Shadow DOM and Custom Elements polyfills to the v1 specs. That’s
  great to see, because without an answer for older browsers, web components
  won’t see wide adoption. At the moment, the v1 polyfills also feel like a
  beta, but they’re coming along quickly. As soon as the polyfills are stable
  enough, we’re looking forward to making a full release of Basic Web Components
  based on the v1 specs.
</p>
