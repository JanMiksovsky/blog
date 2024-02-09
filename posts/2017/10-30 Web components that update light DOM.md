---
title: Your web components with Shadow DOM may need to update light DOM too
originalUrl: https://component.kitchen/blog/posts/your-web-components-with-shadow-dom-may-need-to-update-light-dom-too
---

Web components and Shadow DOM are practically synonymous, but even web components with a shadow subtree often need to render information into the light DOM. A component might need to:

- Trigger conditional styling by applying CSS classes or attributes to itself.
- Pass information to its light DOM children through CSS classes or attributes.
- Set ARIA attributes on itself and its children.

## Example: ARIA support

Suppose you're creating a single-selection list component, and want to follow the
[ARIA best practices for list boxes](https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox). Perhaps you use your favorite web component library to create a shadow root for your component and clone a template into it. Your component's shadow might include, among other things, styling for your list container and its light DOM items:

```
  <template>
    <style>
      :host {
        /* Host element styling goes here */
      }

      ::slotted(*) {
        /* General list item styling goes here */
      }

      ::slotted([aria-selected="true"]) {
        /* Styling for the selected list item goes here */
      }
    </style>
    <slot></slot>
  </template>
```

Maybe that's all that's happening on the Shadow DOM side of things. Your component will _also_ need to do the following work in the light DOM:

1. Set `role="listbox"` on the host element.
2. If the list is horizontal, set `aria-orientation="horizontal"`.
3. Set `role="option"` on all items in the list. Be careful not to mark any
   [auxiliary content](https://github.com/webcomponents/gold-standard/wiki/Auxiliary-Content) like `style` as items in the list!
4. Set `aria-selected="true"` on the selected item. (For what it's worth: I've encountered at least one web component
   [bug](https://github.com/PolymerElements/iron-menu-behavior/issues/75)
   where the [NDVA](https://www.nvaccess.org/)
   screen reader required `aria-selected="false"` to be set on all other elements, even for a single selection list.)
5. Set the host's `aria-activedescendant` attribute to be the `id` of the currently-selected item. If the page author hasn't supplied `id` attributes for every item, you will need to generate and assign an `id` for those items.

That's a lot of work going on in the light DOM! These updates to the light DOM may surprise a page author if they include your list component in markup:

```
  <accessible-list aria-label="Fruits" tabindex="0">
    <div>Apple</div>
    <div>Banana</div>
    <div>Cherry</div>
  </accessible-list>
```

At runtime, when this component updates the light DOM, the result might be:

```
  <accessible-list aria-label="Fruits" tabindex="0" role="listbox"
      aria-activedescendant="_option0">
    <div role="option" id="_option0" aria-selected="true">
      Apple
    </div>
    <div role="option" id="_option1" aria-selected="false">
      Banana
    </div>
    <div role="option" id="_option2" aria-selected="false">
      Cherry
    </div>
  </accessible-list>
```

All this ARIA work is happening in the light DOM, not the Shadow DOM. Work is underway on a better accessibility API, but ARIA attributes are the only solution for the foreseeable future. And as outlined above, your component might have other reasons to update the light DOM.

Generally speaking, you'll need to write the code to update the light DOM yourself. Most web component frameworks to date have focused on updating Shadow DOM, not light DOM.

## Conclusion

What goes on in a component's shadow may only be half the picture — a substantial amount of work may be going on in the light DOM. That's an important point to consider when you're deciding how you want to write your component. Most component frameworks are focused on rendering Shadow DOM, so you'll need to understand what light DOM updates are appropriate and make them yourself.

Code to handle such cases can be complex. For that reason, the Elix project tries to identify common scenarios for updating light DOM and address those with mixins like [AriaListMixin](https://component.kitchen/elix/AriaListMixin).
