---
title: Customizing custom elements with... custom elements
date: 2018-02-20 16:00 UTC
originalUrl: https://component.kitchen/blog/posts/customizing-custom-elements-with-custom-elements
---

We’ve recently been trying a new way to let devs customize complex web components: _let a component accept parameters for the custom elements that should be used inside the component’s template_.

A while back we indicated that we noted that it’s hard to [style web components](https://component.kitchen/blog/posts/styling-is-critical-to-web-component-reuse-but-may-prove-difficult-in-practice), and that we’ve been using [subclassing](https://component.kitchen/blog/posts/our-current-best-answer-for-styling-reusable-components-subclassing) as a partial solution. Using custom elements themselves as parameters to more complex components opens up new possibilities for styling, as well as interesting new possibilities for customizing behavior.

## Example

Suppose we have a simple spin box:

<img src="/images/ck/Spin Box.png">

This component has two `<button>` elements inside its shadow. Suppose we construct this shadow from a template defined by a string:

```
const template = `
  <span id="value"></span>
  <button id="upButton">▲</button>
  <button id="downButton">▼</button>
`;
```

How do we let a developer customize those buttons? As noted in the first post linked above, the whole point of Shadow DOM is to encapsulate styles, so we can’t directly style those buttons from the outside. And while there eventually be a standard way to style across a Shadow DOM boundary, that won’t be available any time soon.

But if we’re constructing the shadow from a string, we can simply let a dev insert whatever element they’d like as the “button” element in the above template.

## Exposing a component parameter to accept another custom element

That’s easy to arrange. We define a `buttonTag` property that can be set on a spin box at any point before the component’s `connectedCallback` runs:

```
const buttonTagKey = Symbol();

class SpinBox extends HTMLElement {

  constructor() {
    super();
    this.defaultButtonTag = 'button';
  }

  get buttonTag() {
    return this[buttonTagKey] || this.defaultButtonTag;
  }
  set buttonTag(buttonTag) {
    this[buttonTagKey] = buttonTag;
  }

  /* Plus rendering code, etc... */
}
```

The spin box component can then use this property as a parameter in its template, instead of hard-coding `<button>`:

```
const template = `
  <span id="value"></span>
  <${this.buttonTag} id="upButton">▲</${this.buttonTag}>
  <${this.buttonTag} id="downButton">▼</${this.buttonTag}>
`;
```

So by default the template looks like the original one above, and shows `button` elements for the arrows. But now you can pass a custom element tag to a spin box instance and ask that it be used instead.

A developer who wants to use custom buttons in this spin box starts by creating a standalone custom button by any means:

<img src="/images/ck/Custom Button.png">

They register this as a custom element, then supply the name of the custom element to a spin box instance:

```
<spin-box button-tag="custom-button"></spin-box>
```

and the spin box will use that to construct a template that includes `custom-button`:

```
<span id="value"></span>
<custom-button id="upButton">▲</custom-button>
<custom-button id="downButton">▼</custom-button>
```

So the final spin box uses the developer’s custom button for the up and down arrow buttons:

<img src="/images/ck/Spin Box Custom.png">

[Live demo](http://jsbin.com/dikile/edit?html,output)

If the developer always wants to do this, they can create a spin box subclass that sets the default button element to `custom-button`:

```
class CustomSpinBox extends HTMLElement {
  constructor() {
    super();
    this.defaultButtonTag = 'custom-button';
  }
}
```

## Advantages of making components customizable this way

A developer who customizes a spin box component this way doesn't need to know everything about the internals of the spin box; they just make a button. (To create a good button, they can use the Elix [WrappedStandardElement](https://component.kitchen/elix/WrappedStandardElement) utility class.) Because the spin box will use the button in the right place, the button will get the right positioning and have all the right event handlers to ensure interaction with the rest of the spin box.

This kind of indirection is roughly analogous to a function that accepts another function as a parameter. In this case, we’re creating a custom element that accepts another custom element as a parameter. Complex components can expose as many element parameters as necessary.

This approach works with any web component system that can cope with a tag name that’s specified at runtime. Elix components generally use string templates (as shown above), in which case parameterizing the template is a simple matter. While React components are not (generally) web components, React has long supported similar dynamic construction of a component tree, since a JSX tag name can be a JavaScript class, and that class can be supplied as a component parameter.

Because the core unit of customization is an element, it can do anything! For example, we can create a custom button element that generates `mousedown` events repeatedly when the user holds down the button. This lets someone customize the spin box in ways that go far beyond what the spin box’s creator can anticipate. (See the [demo page](http://jsbin.com/dikile/edit?html,output) for an example.)

Summary:

- A dev doesn’t have to learn a new styling/theming system. They create their custom elements however they want: in plain JS, using Elix, Stencil, Polymer, whatever.
- All the styling they want gets baked into their custom element, and will show up at the right point in the Shadow DOM. So this slips past all the challenges of styling components from the outside. At the same time, just as the Shadow DOM boundary prevents accidental style interference between the outer page and a component, it can likewise prevent accidental style interference between a complex component and any custom elements passed into it as parameters.
- We don’t have to invent a new way of naming or registering these customizations: they’re just custom elements registered with `customElements.define()`.
- Customization can go far beyond what’s possible with CSS Custom Properties, and even beyond what would be possible with the proposed `::part` and `::theme` syntax for CSS.
- Customization can be done on a per-instance basis or by creating new classes.
- All of this works in Shadow DOM v1 and Custom Elements v1. You can do this right now.
