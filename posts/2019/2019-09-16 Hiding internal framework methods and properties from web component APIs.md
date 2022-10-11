---
title: Hiding internal framework methods and properties from web component APIs
date: 2019-09-16 16:00 UTC
slug: hiding-internal-framework-methods-and-properties-from-web-component-apis
originalUrl: https://component.kitchen/blog/posts/hiding-internal-framework-methods-and-properties-from-web-component-apis
---

We've made breaking changes in the new [Elix 7.0.0](https://component.kitchen/elix) to solidify our component APIs. Specifically, our components no longer expose internal methods or properties with string names.

As usual, we're much less concerned with promoting our own library as a general-purpose component framework than we are in delivering great web components. We're documenting the thinking behind this change in this post for the benefit of anyone creating components with an eye towards reusability outside their organization.

## A component's framework should be an invisible implementation detail

We try to write all our components so that they conform to a high quality bar. We use the native HTML elements as a reference point to measure how robust and flexible our components should be. We call that approach the [Gold Standard checklist for web components](https://github.com/webcomponents/gold-standard/wiki).

To meet that standard, we've concluded that it's important for a web component to expose only its officially supported public API. That's what the native HTML elements do! So that's what we want to do too.

But like most web component frameworks today, Elix components previously exposed a number of internal methods like `render` and internal properties like `state`. Virtually all component libraries today do the same thing, exposing a substantial number of methods and properties which are only ever intended to be invoked internally.

In hindsight, exposing framework internals that way (even prefixed with an underscore, etc.) seems like a bad idea:

1. Component users might decide to hack around component limitations by directly invoking internal methods or properties. The framework implicitly becomes part of the component's public API, whether or not that's what the component authors intended.
2. The framework used to create a component should be an invisible implementation detail. If a component author decides to someday change the framework in which they create a given component, they should be able to do so without any fear that they're going to break someone who — rightly or wrongly — decided to depend on inadvertently-exposed component internals.
3. Exposing framework details makes a custom element feel kludgey compared to native HTML elements. This is a softer issue, but might nevertheless contribute to a lack of confidence in the quality of a component. If native elements don't expose their details, we don't want our components to do that either.

Deliberately exposing only those members that belong in the public API is good practice for any library. To date, the fact that component authors haven't worried about exposing framework internals most likely indicates that authors have been primarily focused on using their own components than on sharing them. But if web components are to find general reuse in a wide audience, authors should carefully review exactly what is visible in a component's public API.

## Hardening our component APIs

With the above in mind, we've made breaking changes in Elix to better hide all internal methods and properties.

Elix has long used `Symbol` keys instead of strings to identify various internal members that one mixin or class may need to invoke in another mixin or class. Using symbols that way hides those methods and properties from the debug console's auto-complete list. Those symbols are still accessible via `Object.getOwnPropertySymbols`, but someone has to work harder to do that. Symbols also avoid potential name conflicts if a component user wants to extend a custom element with their own data or methods.

We're expanding this use of `Symbol` keys to better hide all methods and properties which are meant for internal use only.

- All internal operations, like the `setState` or `render` methods, and the `state` property, are now behind symbols.
- We've renamed our collection of `Symbol` keys from `symbols.js` (which focused on the data type) to `internal.js` (which focuses on the intended purpose). So an element accesses its `state` via `this[internal.state]`.
- We've renamed our shorthand function that looks up shadow elements by ID. Previously, you could write `this.$.foo` to get a reference to a shadow element with the ID "foo". The equivalent new code is `this[internal.ids].foo`.

A simple example component in Elix 6.0 and earlier exposed some component internals with string names:

```js
import * as symbols from "elix/src/symbols.js";
import * as template from "elix/src/template.js";
import ReactiveElement from "elix/src/ReactiveElement.js";

// Create a native web component with reactive behavior.
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
      this.$.value.textContent = this.state.value;
    }
  }

  // This template is cloned to create the shadow tree for a new element.
  get [symbols.template]() {
    return template.html`
      <button id="decrement">-</button>
      <span id="value"></span>
      <button id="increment">+</button>
    `;
  }

  // Provide a public property that gets/sets state.
  get value() {
    return this.state.value;
  }
  set value(value) {
    this.setState({ value });
  }
}
```

In Elix 7.0, all internals are now identified with `Symbol` keys obtained from `internal.js`, so the above example now looks like:

```js
import * as internal from "elix/src/internal.js";
import * as template from "elix/src/template.js";
import ReactiveElement from "elix/src/ReactiveElement.js";

// Create a native web component with reactive behavior.
class IncrementDecrement extends ReactiveElement {
  [internal.componentDidMount]() {
    super[internal.componentDidMount]();
    this[internal.ids].decrement.addEventListener("click", () => {
      this.value--;
    });
    this[internal.ids].increment.addEventListener("click", () => {
      this.value++;
    });
  }

  // This sets the component's initial state at constructor time.
  get [internal.defaultState]() {
    return Object.assign(super[internal.defaultState], {
      value: 0,
    });
  }

  // Render the current state to the DOM.
  [internal.render](changed) {
    super[internal.render](changed);
    if (changed.value) {
      this[internal.ids].value.textContent = this[internal.state].value;
    }
  }

  // This template is cloned to create the shadow tree for a new element.
  get [internal.template]() {
    return template.html`
      <button id="decrement">-</button>
      <span id="value"></span>
      <button id="increment">+</button>
    `;
  }

  // Provide a public property that gets/sets state.
  get value() {
    return this[internal.state].value;
  }
  set value(value) {
    this[internal.setState]({ value });
  }
}
```

In addition to better hiding component implementation details, we really like that the above class definition makes clear that the component has only _one_ public member: the `value` property. Everything else is an implementation detail of interest to the component author only.

Even though JavaScript engines are gaining support for private methods and properties, we can't use those for our purposes, because private members are only accessible within the class that defines them. We need a mixin or class somewhere along the class hierarchy to be able to invoke a member defined elsewhere along the hierarchy. In other words, what we really want are `protected` members, but those aren't coming to JavaScript soon, if ever.

## Debugging

Since state is an internal matter, a component's state is now hidden behind a `Symbol`. By design, that makes it much harder to access! But when debugging, it's really helpful to be able to inspect component state easily.

To facilitate debugging, Elix now looks to see if the current page has a URL parameter, `elixdebug=true`. If found, then Elix components will expose a string-valued `state` property as before. If the page is opened without that parameter, the `state` property disappears again.
