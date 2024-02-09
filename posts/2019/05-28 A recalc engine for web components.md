---
title: A simple state-based recalc engine for web components
originalUrl: https://component.kitchen/blog/posts/a-simple-state-based-recalc-engine-for-web-components
---

We recently released [Elix 6.0](https://github.com/elix/elix/releases/tag/6.0.0). This includes a simple state-based recalc engine that lets our components know what they should update when their internal state changes.

We were inspired by Rich Harris' [Rethinking Reactivity](https://www.youtube.com/watch?v=AdNJ3fydeao) talk on version 3 of the [Svelte](https://svelte.dev/) framework, which advances the idea of building user interface components upon a spreadsheet-like recalc engine. Significantly, the recalc engine supports forward references — when one piece of data changes, the engine can efficiently determine what else must be recalculated. Svelte entails a complete toolchain that we're not ready to adopt, but we like the idea of recalc as a useful service for web components.

As it turns out, Elix already had much of what we need to build a recalc engine, and it was relatively straightforward to expand that to form a new core for our Elix components. We worked this into a core Elix mixin called [ReactiveMixin](https://component.kitchen/elix/ReactiveMixin), which can now let a component know exactly what state has actually changed since the last render. This in turn lets the component efficiently decide what it needs to update in the DOM.

## The smallest amount of framework we can get away with

As we've noted before, it's [not practical to write a production component library without any shared code](/posts/2015/10-26-nobody-writes-production-web-components-in-vanilla-js-so-using-a-framework-makes-total-sense.html). Writing web components requires enough boilerplate that most people end up using a framework, even if it's just a tiny framework they wrote themselves.

Elix has had to develop its own core library so that we can create reliable, polished, general-purpose web components. Our framework happens to be composed of JavaScript mixins. We don't particularly care to push this framework on other people, but we do discuss it from time to time in case the work we've done can help write their own framework-level code better.

We only ask a few things of our framework:

- **Support a functional-reactive programming model.** We want to represent a component's current state with a single immutable state object. When a request is made to change the state, the component should be told to render that new state to the DOM. This is handled by [ReactiveMixin](https://component.kitchen/elix/ReactiveMixin). This is the part of our framework that now contains a small recalc engine.
- **Populate a Shadow DOM tree with an HTML template.** A template is a convenient way to express a component's subelements, and copying a template into a shadow tree is handled by [ShadowTemplateMixin](https://component.kitchen/elix/ShadowTemplateMixin).
- **Let HTML authors set HTML attributes on our components.** When a `foo-bar` attribute is set, we want to invoke a corresponding `fooBar` property setter. That's the job of [AttributeMarshallingMixin](https://component.kitchen/elix/AttributeMarshallingMixin).

The second and third things are boring but necessary; the first part is the only interesting bit. For convenience, all three of these mixins are bundled together in a base class, [ReactiveElement](https://component.kitchen/elix/ReactiveElement). But each piece is usable separately.

## Example

A simple increment/decrement web component in Elix 6.0 looks like this:

```js
import { ReactiveElement, symbols, template } from "elix";

class IncrementDecrement extends ReactiveElement {
  componentDidMount() {
    super.componentDidMount();
    this.$.decrement.addEventListener("click", () => {
      this.value--;
    });
    this.$.increment.addEventListener("click", () => {
      this.value++;
    });
  }

  // This property becomes the value of this.state at constructor time.
  get defaultState() {
    return Object.assign(super.defaultState, {
      value: 0,
    });
  }

  // Render the current state to the DOM.
  [symbols.render](changed) {
    super[symbols.render](changed);
    if (changed.value) {
      this.$.valueSpan.textContent = this.state.value;
    }
  }

  // Define the initial contents of the component's Shadow DOM subtree.
  get [symbols.template]() {
    return template.html`
      <button id="decrement">-</button>
      <span id="valueSpan"></span>
      <button id="increment">+</button>
    `;
  }

  // Provide a public property that gets/sets the value state.
  // If an HTML author sets a "value" attribute, it will invoke this setter.
  get value() {
    return this.state.value;
  }
  set value(value) {
    this.setState({ value });
  }
}
```

[Live demo](https://component.kitchen/demos/reactiveElementExample.html)

The interesting new bit in Elix 6.0 shows up in the method identified by `symbols.render`. That method is invoked when the component's state changes. (Aside: We identify internal methods with `Symbol` instances to avoid name collisions with other component code.)

The render method now gets a parameter, `changed`, that has Boolean values indicating which state members have changed since the last render. If `changed.value` is true, then `this.state.value` contains a new value, so the render method knows it should display the new value in the DOM as the span's `textContent`.

## Computed state

In simple cases, a computed property can be recalculated each time it's requested. But a number of Elix components have computed state that is expensive to recalculate. In those cases, we can define a rule in our recalc engine that indicates how to recalculate a given state member when other state members change.

A toy example might look like:

```js
class TestElement extends ReactiveMixin(HTMLElement) {
  get defaultState() {
    const result = Object.assign(super.defaultState, {
      a: 0,
    });

    // When state.a changes, set state.b to be equal to state.a + 1
    result.onChange("a", (state) => ({
      b: state.a + 1,
    }));

    return result;
  }
}
```

The `onChange` handler is associated with the component's state object, and runs whenever `state.a` changes. That handler returns an object containing any computed updates that should be applied to the state. Here it returns an object with a new value for `state.b`.

A more realistic example comes up in [SingleSelectionMixin](https://component.kitchen/elix/SingleSelectionMixin), which maintains a `selectedIndex` state member used to track which item in a list of `items` is currently selected. If the `items` array changes, we want to ensure that the `selectedIndex` state still falls with the bounds of that array.

```js
function SingleSelectionMixin(Base) {
  return class SingleSelection extends Base {
    get defaultState() {
      const state = Object.assign(super.defaultState, {
        selectedIndex: -1,
      });

      // Ask to be notified when state.items changes.
      result.onChange("items", (state) => {
        // Force selectedIndex state within the bounds of -1 (no selection)
        // to the length of items - 1.
        const { items, selectedIndex } = state;
        const length = items.length;
        const boundedIndex = Math.max(Math.min(selectedIndex, length - 1), -1);
        return {
          selectedIndex: boundedIndex,
        };
      });

      return result;
    }
  };
}
```

Defining a rule like this to keep an index within bounds is an important ingredient in allowing us to factor our complex components into constituent mixins. It lets one mixin or class update an aspect of state without having to know about all the secondary effects that will have.

You can see this recalculation of state in action if you open a demo like the one for [Carousel](https://component.kitchen/demos/carousel.html) and invoke the debug console. If you use the debugger to remove one of the carousel's images from the DOM, the `Carousel` will recalculate which item should now be selected. If the last image is selected in the carousel and you remove that image, the above code will ensure that the _new_ last image becomes the selected one.

This isn't just an abstract experiment. This kind of resiliency is called for in the Gold Standard Checklist for Web Components criteria for [Content Changes](https://github.com/webcomponents/gold-standard/wiki/Content-Changes). Such resiliency is exactly the kind of quality that custom elements will need to deliver to be as reliable and flexible as the native HTML elements. The simple recalc engine in our Elix 6.0 core makes it easier for us to deliver that level of quality.
