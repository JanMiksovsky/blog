---
title: Styling is critical to web component reuse, but may prove difficult in practice
date: 2017-11-20 16:00 UTC
slug: styling-is-critical-to-web-component-reuse-but-may-prove-difficult-in-practice
originalUrl: https://component.kitchen/blog/posts/styling-is-critical-to-web-component-reuse-but-may-prove-difficult-in-practice
---

The easiest way to create web components with a distinctive visual style is to bake that style directly into the components' code. Most user interface components are designed to be used solely within the company creating them, in which case baking in styles may be acceptable. But anyone aspiring to create or consume reusable general-purpose web components will have to grapple with the fact that styling components is currently an unsolved problem.

That's worrisome. Most web components we've seen have a built-in visual style so distinctive that, without modification, it would look out of place in an app with someone else's brand. Not being able to easily theme such a component limits its utility.

Suppose you're writing a hypothetical custom element called `reusable-component` and want to let other people style that element. Let's consider your options for doing so.

## Use CSS Custom Properties

If you think someone wants to change the background color of your `reusable-component`, you can define its `background-color` style with a CSS Custom Property:

```
  :host {
    background-color: var(--reusable-component-background-color);
  }
```

and your users can then style your component by defining that custom property:

```
  :root {
    --reusable-component-background-color: blue;
  }
```

With the recent release of Edge 16, the above would now work in all modern browsers.

Unfortunately, this just doesn't scale well. It's a pain for you, who must define a new custom property for every CSS attribute someone might conceivably want to override. If your component has internal shadow parts — buttons, etc. — that your users might want to style, you have to define new custom properties for all the interesting CSS attibutes on all those parts. And this will be painful for your users, who have to learn a long new list of custom properties for every component they might want to style.

## Wait for CSS parts and themes

To solve the above problem, there's a proposal for [CSS Shadow Parts](https://tabatkins.github.io/specs/css-shadow-parts/) which would make it possible to expose designated internal parts as pseudo-elements that can be styled from the outside. This is similar to the way you can style certain native HTML elements in a non-standard way with certain pseudo-elements. For example, WebKit exposes the thumb (handle) of a scroll bar as a pseudo-element `::-webkit-scrollbar-thumb`, so you can write

```
  ::-webkit-scrollbar-thumb {
    background: pink;
  }
```

to make scroll bar thumbs pink.

The CSS Shadow Parts spec would let you expose your component's internal parts for styling. If you had a commit button in the shadow of your `reusable-component`, you could expose it as a part:

```
  <button part="commit-button">...</button>
```

And someone can then write:

```
  reusable-component::part(commit-button) {
    background: pink;
    border: 1px solid red;
    border-radius: 5px;
  }
```

to style the button. That's a more convenient way to achieve the same thing as CSS Custom Properties. There's less to document for your users and more flexibility. Your users can apply whatever styling they want without you needing to anticipate everything they might want to do.

There are some downsides, though, when it comes to reusing such a styled custom element.

## Wrapping reusable custom elements + styling

One key advantage to giving your customer a custom element is that they end up with a single thing that produces a consistent result. But if your customer tries to style your `reusable-component`, they'll end up creating a new reuse problem for themselves. People at that company now have to deal with _two_ separate things: 1) your original `reusable-component` definition, and 2) a stylesheeet with the company's styling for `reusable-component` and its parts. On their own, those two entities are independent, with no explicit relationship. Having to track and apply them correctly creates maintenance headaches.

Your customer could define a new `component-wrapper` element that wraps your original `reusable-component` and applies the desired styling:

```
  <template>
    <style>
      reusable-component::part(commit-button) {
        background: pink;
        border: 1px solid red;
        border-radius: 5px;
      }
    </style>
    <reusable-component>
      <slot></slot>
    </reusable-component>
  </template>
```

Then your customer can distribute this `component-wrapper` component internally, and everyone gets both your internal `reusable-component` and the correct styling in a nice package. (Even if `reusable-component` is actually defined elsewhere, `component-wrapper` can express that dependency, so the pieces are linked together.)

But this introduces new challenges:

- The wrapped component won't expose the same programmatic API as your original. Your customer will need to carefully reflect the inner component's API, which may be non-trivial.
- Your `reusable-component` may have styling that's contingent upon CSS classes or attributes applied to the host element. Unfortunately, that host element is now sitting inside the shadow of the customer's `component-wrapper`. Again, the customer writing `component-wrapper` may have to carefully reflect any classes or attributes to the inner `reusable-component`. Even if they do that correctly, that may still end up with unexpected behavior.
- The inner `reusable-component` needs to be styled to fill the host `component-wrapper`, so that if the latter is stretched, the former will be stretched to fit. That's not hard, but could easily be forgotten.
- Certain layout differences will arise. If someone applies `padding` to the `component-wrapper`, that will apply to the wrapper, not within the inner `reusable-component` as they may intend. The customer could expose the inner `reusable-component` as a new `part` to address that, but that introduces complexity and conceptual overhead.
- Both the element's tag and class identity will change. A `querySelector` that looks for `reusable-component` won't match `component-wrapper`. And an `instanceof ReusableComponent` check will fail when applied to an instance of `WrappedComponent`. The customer could potentially implement `Symbol.hasInstance` on their class, but that's getting complex. In general, it'll be real work for your customer to create `component-wrapper` as a drop-in replacement for your `reusable-component`.
- Accessibility may be affected, as the wrapper may show up in the accessiblity tree unless measures are taken to avoid that. This can confuse things. My instinct would be to apply `role="none"` to the wrapper to keep it out of the accessibility tree. But if `component-wrapper` is given a `tabindex`, a screen reader might get confused when keyboard focus moves to the component.

Overall, without an easy repackaging mechanism for themed components, organizations may have difficulty adopting and styling components they acquire from elsewhere.

## Overriding styles can be complex

It's been our experience that even general-purpose components can end up with complex styling. People tend to approach component styling/theming as if the components were completely static, but components have dynamic _state_. State is often implicated in styling. As an example, a native button that's `disabled` shows different styling than an enabled button. If someone isn't carefully considering the `:disabled` pseudo-class in their button styling, they may end up applying an enabled button appearance to a disabled button.

Web components can have complex internal states, resulting in correspondingly complex internal stylesheets. Overriding such styles will be a delicate matter. To look at some concrete examples, I looked through some internal stylesheets in web components we've previously written. Here are some of the CSS selectors I found:

```
  // From a carousel component
  :host(.overlayArrows) .navigationButton:hover:not(:disabled) { ... }

  // From a tabs component
  :host([generic=""][tab-position="right"]) .tab:not(:last-child) { ... }

  // From a toast component
  :host([from-edge="bottom-right"].opened:not(.effect)) #overlayContent,
  :host([from-edge="bottom-right"].effect.opening) #overlayContent { ... }
```

Each complex CSS selector in your component may create a challenge for your customer. If the tabs component above exposes an individual `tab` as a `part`, what about that `:not(:last-child)` bit? If your customer writes styles that target the tab part, what styling should apply to the last tab?

In general, even if you can expose an interesting internal part of the component for outside styling, your customer will need to be aware of a large number of conditions that may apply. They could easily end up writing rules that don't apply (because more specific conditions exist that take precedence) or apply when they shouldn't (they write rules that are too general).

This is not to say that the CSS Shadow Parts spec won't be a step forward — it will be — but rather to say that styling components with of normal complexity might turn out to be extremely challenging in practice.

(Aside: It goes without saying that, even if the browser vendors are excited about CSS Shadow Parts and the spec speeds through the standards process, it could still be a very long time until you can take advantage of them in all the browsers and devices you care about. And for what it's worth, polyfilling new CSS syntax is notoriously difficult to do well.)

## Inline styling

Your customer trying to use your `reusable-component` might accomplish a certain degree of styling by applying inline styles to the component's host element (the top-level `<reusable-component>` instance sitting in the light DOM). Users of React and other FRP frameworks have found inline styling a powerful way to have a component apply styles to subelements. And more generally, inline styling is usually the easiest way to programmatically adjust an element's appearance regardless of framework.

However, there are serious challenges using inline styles with web components. Inline styles can't be used to style internal component parts. That will remain true even if and when the CSS Shadow Parts proposal is adopted, as that only addresses styling with stylesheets. And as noted above, components can have complex state. Writing inline styles for the host element that apply in all conditions is likely too blunt an instrument.

React and similar frameworks already struggle somewhat to deal with styling, but an increase in the presence of complex general-purpose components will make the issue more pressing.

## Other options?

Given the above, we're not sure that either CSS Custom Properties, CSS Shadow Parts, or inline styling will be sufficent. We think those platform features are really interesting — it's just that they may not be enough for what we want to do. We want to create reusable web components that companies can easily brand for their applications, and we're unsure how to deliver that.

We're exploring alternative ideas for letting people style our web components, but are very interested in hearing how other people are tackling this problem. If you have ideas, please share.
