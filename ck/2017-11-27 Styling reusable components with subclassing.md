---
title: "Our current best answer for styling reusable components: subclassing"
date: 2017-11-27 16:00 UTC
slug: our-current-best-answer-for-styling-reusable-components-subclassing
originalUrl: https://component.kitchen/blog/posts/our-current-best-answer-for-styling-reusable-components-subclassing
---

Even though [styling reusable components is a hard problem](https://component.kitchen/blog/posts/styling-is-critical-to-web-component-reuse-but-may-prove-difficult-in-practice), the [Elix](/elix) project needs a solution if it's to keep moving forward. The library's goal is to provide general-purpose components that can be styled/themed to meet customers' needs. As far as we're aware, neither the web platform nor component frameworks give us the styling primitives we need. For now, Elix is tackling this styling challenge with subclassing.

## Asking a component what it wants to update

To begin, our solution relies on the previously-discussed
[ReactiveMixin](https://component.kitchen/blog/posts/a-compact-javascript-mixin-for-creating-native-web-components-in-frpreact-style), to define components in a React-ish, functional-reactive style. That post includes a [live demo](https://codepen.io/JanMiksovsky/pen/WLwjwL?editors=1010) of a canonical increment/decrement component created with `ReactiveMixin`. The source shows a `render` function that updates DOM whenever state changes.

Let's add custom styling and behavior to that increment/decrement component. We'll start by using an Elix mixin called `ShadowTemplateMixin` to populate the shadow with the same template we used before:

```
  <template id="template">
    <button id="decrement">-</button>
    <span id="visibleValue"></span>
    <button id="increment">+</button>
  </template>
```

Now we'll make use of a new Elix mixin called [RenderUpdatesMixin](/elix/RenderUpdatesMixin) that asks the component for a set of _updates_ to apply during rendering. The mixin will then update the DOM as requested. The component supplies this `updates` object as a property, indicating the attributes, classes, styles, and other properties to update:

```
  get updates() {
    return {
      style: {
        color: this.state.value < 0 ? 'red' : null
      },
      $: {
        visibleValue: {
          textContent: this.state.value
        }
      }
    };
  }
```

The top level keys of the `updates` object will be applied to the component's host element. Here, the `style` key says that the host element's `style.color` should be updated to `'red'` when the value is negative, and left unspecified otherwise. It's not shown above, but a component can also specify keys for `attributes` and `classes` to modify those aspects of the host element. Any keys that aren't special are treated as custom properties and set directly.

The `$` section contains updates that should be applied to elements in the component's shadow. When `ShadowTemplateMixin` sees a template element with an `id` like `<span id="visibleValue"></span>`, it defines a reference `this.$.visibleValue` to point to that span. Here, the `updates` object is asking to update that span's `textContent` to the current number in `this.state.value`.

This `updates` getter is equivalent to the imperative:

```
  [symbols.render]() {
    this.style.color = this.state.value < 0 ? 'red' : null;
    this.$.visibleValue.textContent = this.state.value;
  }
```

## A component interaction pipeline

The use of `RenderUpdatesMixin` and other Elix mixins lets us construct a pipeline of sorts inside the component:

```
  events → methods/properties → setState → render → updates → updated DOM
```

When the user clicks the "+" or "-" buttons:

1. A `click` event fires, which…
2. sets the `value` property via a public API, which…
3. invokes `setState` to update `this.state.value`, which…
4. invokes an internal `symbols.render()` method that…
5. asks the component for the state-dependent `updates` it wants to make which…
6. get applied to the DOM.

And, as a result, the user sees the visible value number go up or down.

The `updates` are applied via helper functions that make the underlying DOM API calls. There's no virtual DOM diff'ing going on here, but the number of `updates` is generally small and targeted to the elements that are actually changing. For the time being, performance seems reasonable.

## Declarative formats as a last resort

As an aside, I've come to generally shy away from declarative formats like the `updates` object above. People like the concise nature of a declarative format for UI structure or behavior, and such a format can have a place in systems devs are willing to learn.

I think that learning cost is steep, so in code I want other people to use or contribute to, I try to avoid introducing declarative formats. Doing so is tantamount to shouting, _Whee! I've invented a new domain-specific language for you to learn!_ The syntax may be JavaScript, but the semantics are opaque — it's really a tiny interpreted language. Though my concise declarative language may be easy for _me_ to understand, it's impossible for _you_ to know what effect it will have unless and until you're willing to learn my new language.

So I currently avoid declarative code unless it has some concrete advantages.

## Styling and specializing via subclasses

That said, in this case defining `updates` as an object _does_ offer a real advantage: the updates can be augmented by mixins and subclasses.

When we say we want to let customers style a reusable component, that's another way of saying we want to let people take existing code and specialize it. A component is just a class, and a traditional means to specialize a class is to create a subclass. So let's see how subclassing can work here.

Since the `updates` property sits on the prototype chain, it can be overridden by a mixin or subclass that wants to add or adjust `updates` for the current state. A mixin/subclass can invoke `super` to get the base `updates`, then modify as that base value as it sees fit. E.g., someone could create a custom version of the generic increment/decrement component above:

```
  class CustomIncrementDecrement extends IncrementDecrement {

    get updates() {

      const base = super.updates;
      const baseColor = base.style && base.style.color;
      // Pick a color if the base class didn't specify one.
      const color =  baseColor || (this.state.value > 0 ? 'dodgerblue' : null);

      // Merge updates on top of those defined by the base class. This lets us
      // preserve some of the base rendering, while adding our own styling and
      // some unique behavior.
      return merge(base, {
        style: {
          background: 'lightgray',
          color,
          'font-family': 'Helvetica, Arial, sans-serif',
          'font-weight': 'bold'
        }
      });
    }

  }
```

Here the component indicates that its host element `style` should be updated with custom colors and fonts. Rather than focusing on CSS rule precedence, the prototype chain determines what `updates` apply — last writer wins. If you customize my class by subclassing it, your subclass has the last say.

This code relies on a `merge` helper that generally does a shallow merge, but goes deeper when merging the special keys `attributes`, `classes`, `style`, or `$`. The merging allows the updates cooperatively constructed by the base class, any mixins, and any subclasses to be efficiently computed and applied.

Applying such state-dependent styling is tricky in CSS: all state would first need to get rendered to the DOM as attributes, then CSS rules would have to be conditional on the presence of those attributes. Overriding such CSS rules requires carefully matching their precedence, otherwise customizations might be overly general or overly specific.

It's worth noting that mixins/subclasses can inspect the `updates` requested by the base class, and incorporate those values into their own calculations. In the sample above, the subclass provides a blue `color` for positive values, but leaves alone the red color the base class provides for negative values.

## Updating shadow parts

The above code only customizes the host element, which we could do via CSS directly. What we're really after is a way to customize shadow parts: elements inside the shadow tree. Our customized increment/decrement component can do that through the `$` key described earlier:

```
  get updates() {

    const base = super.updates;
    const baseColor = base.style && base.style.color;
    const color =  baseColor || (this.state.value > 0 ? 'dodgerblue' : null);

    const buttonStyle = {
      background: '#444',
      border: 'none',
      'border-radius': 0
    };
    const decrementDisabled = this.state.value <= -5;
    const incrementDisabled = this.state.value >= 5;

    return merge(super.updates, {
      style: {
        background: 'lightgray',
        color,
        'font-family': 'Helvetica, Arial, sans-serif',
        'font-weight': 'bold'
      },
      $: {
        decrement: {
          attributes: {
            disabled: decrementDisabled
          },
          style: merge(buttonStyle, {
            color: decrementDisabled ? 'gray' : 'white'
          })
        },
        increment: {
          attributes: {
            disabled: incrementDisabled
          },
          style: merge(buttonStyle, {
            color: incrementDisabled ? 'gray' : 'white'
          })
        }
      }
    });
  }
```

[Live demo](http://jsbin.com/ginijus/edit?html,output)

Above we style the buttons with some base styling. We can also modify attributes or other properties. Here we arrange for the buttons to only allow input values between -5 and 5. (For completeness, we can also impose the same input bounds on the `value` property exposed in the public API.) We apply conditional styling to show the buttons differently when they're enabled or disabled.

## Mixins that update light and shadow DOM

If you're reluctant to create a class hierarchy, you can do what Elix does and factor most of your code into [functional mixins](/elix/mixins). Mixins allow your code to be reused across classes, and permit a great deal of flexibility.

For example, I've previously described how components often need to [update light DOM](https://component.kitchen/blog/posts/your-web-components-with-shadow-dom-may-need-to-update-light-dom-too) to support ARIA attributes. To address that scenario, we've factored out ARIA attribute handling for list-like components into a mixin called [AriaListMixin](https://github.com/elix/elix/blob/master/src/AriaListMixin.js). That mixin augments the component's `updates` getter to apply attributes like `role`, `aria-orientation`, and `aria-activedescendant`.

## Results

We've successfully applied this architecture to the current Elix component set. Using a declarative `updates` object makes the code very concise, which is good — but also makes the code opaque to outsiders, which is bad. The main win is that we now have a workable method for creating custom-themed versions of these general-purpose components. Significantly, the themed components are just custom elements that can be used by clients like any other web components.

If others come up with other ways to style general-purpose web components, we'd be very interested. In the meantime, we at least have a way to keep moving forward.
