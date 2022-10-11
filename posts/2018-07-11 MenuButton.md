---
title: Building a great menu component is so much trickier than you'd think
date: 2018-07-11 16:00 UTC
slug: building-a-great-menu-component-is-so-much-trickier-than-youd-think
originalUrl: https://component.kitchen/blog/posts/building-a-great-menu-component-is-so-much-trickier-than-youd-think
---

We've released v2.2 of the [Elix](/elix) web components library, which includes some new components for menus:

- [PopupSource](/elix/PopupSource) for buttons that invoke any kind of popup
- [MenuButton](/elix/MenuButton) for the common case of a button that invokes a menu
- [Menu](/elix/Menu) which contains the collection of menu items
- [DropdownList](/elix/DropdownList) for a `MenuButton` variation that's effectively a completely customizable `<select>` element.

We want all these menu components to feel as polished and natural as native OS menus. Native menus have a number of subtle details, and getting the UI details right turns out to be outrageously complex. Menus are a good example of [the fractal nature of UI design](http://www.miksovsky.blogs.com/flowstate/2005/10/the_fractal_nat.html).

## Menu positioning

Just to get started, we need to be able to position a menu with respect to a source button.

- On desktop, a menu should open on mouse _down_, not mouse up. This feels faster. It also, as described in more detail below, allows the user to possibly select a menu item in a single drag operation.
- Only primary mousedown events should be considered. The menu should not appear on a right-click, since we want the user to still have access to the browser's own context menu.
- The menu should appear in the desired direction if there's room in that direction. If there isn't _and_ there's room in the opposite direction, it should appear in that opposite direction. But if there isn't room in that direction either, it's preferable to show the menu in the original direction and constrain its height. (This can force scrolling.) Note that OS menus can extend outside a source window's boundaries but web components, like all HTML elements, are not allowed to extend outside the document viewport.
- The calculation of whether the menu will fit can't happen until the menu has actually rendered (many factors can influence the layout of the menu), but we don't want to let the menu be visible until we know which direction we want to use. So we layout the menu once while its invisible, see if it fits, move it to the desired position, then render it again to make it visible.
- Calculations of whether the menu fits in a particular direction are affected by the scroll position of the document.
- To complicate things, we'll want to put the keyboard focus in the menu — but moving the keyboard focus can cause scrolling as a side effect. (This is especially true in Safari, whose [focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) method doesn't yet support the `focusOptions` parameter.) So we'll have to complete all our menu layout and rendering before we try to move the focus into the menu.

Because these positioning rules generally apply to all popups invoked from buttons — not just menus, but also things like combo boxes — we've enshrined responsibility for position popups relative to a source button in a general-purpose [PopupSource](/elix/PopupSource) class.

## Two ways of selecting a menu command with a mouse

Most people have probably never noticed there are two different ways of using a mouse to select an item from an OS menu:

<figure>
  <img src="/images/ck/Menu Selection.png">
</figure>

Nearly every web menu handles only the first method: selecting a menu item in two clicks. But both macOS and Windows support selecting menu items in a drag operation, which can feel faster and more responsive. If you're reading this on a laptop, try using your mouse/trackpad now to select a browser menu command using both approaches. Observe the different feel of the two approaches. Which do you normally use?

(I seem to recall that the original Mac OS supported only menu selection with a drag, while Windows supported both methods. Windows generally had better keyboard support for menu navigation, and once Windows engineers allowed the user to pop up a menu with the keyboard and keep it open, it was probably easy for them to support the two-click method.)

The two-click method is trivial to implement, but if we want to achieve the same usability of an OS menu, we'll want to also support the drag method. That's hard to do, which is probably why most web apps don't support it. (The various Google Suite apps are a notable exception.) A few of the more interesting problems:

- If the user mouses down, then moves the mouse away from the menu button and its associated menu, and then releases the mouse over the page background, the menu should be dismissed.
- Once the user drags into the menu with the mouse down, we want to automatically select the menu item underneath the mouse. However, those item can't get mouse events yet — the user still has the mouse down, so all mouse events are still targeted at the button that invoked the menu. We'll need to listen to `mousemove` on the menu button and do our own hit-testing to figure out whether the user is currently dragging the mouse over a menu item — and, if so, select that item.
- If the user mouses down and then moves the mouse completely off the page, our menu button component will never receive a `mouseup` event. So we'll need to listen to `mouseup` events on the `document` too.
- If the user mouses down, then releases the mouse over interior menu padding or a disabled item like a menu separator, the menu should also be dismissed.
- However, if the user opens the menu with a click (in the two-click approach), a subsequent click on interior menu padding or a menu separator should be _absorbed_ and not close the menu.

This is all hard, but still doable, so we're giving it our best shot. If you're on a laptop, try opening our [MenuButton demo](https://component.kitchen/demos/menuButton.html) and confirming that the menu component feels like an OS menu.

For completeness, I should point out that many web menus also handle an additional means of selecting a menu item with a mouse: the menu opens on _hover_, after which the user only needs to click once on the desired menu item. I hesitate to mention that approach, however. It's my personal belief that hover menus are a usability disaster: they invariably appear when they're not wanted, and disappear when they _are_ wanted. The hover approach does have a distinct advantage, in that it lets the top-level menu heading itself serve as a clickable link. But I think that advantage comes at a steep usability cost.

## Menus on mobile

Our two-click approach for menus should generally work on mobile devices, with some minor changes. Generally speaking, mobile menus appear when a tap _ends_ and force use of the two-click method described above. To ensure the menu responds instantaneously, we must [enable fast-tap behavior](https://webkit.org/blog/5610/more-responsive-tapping-on-ios/) by applying the CSS `touch-action: manipulation` to the relevant elements.

If reading this on your phone, try opening our [MenuButton demo](https://component.kitchen/demos/menuButton.html) and tap around. The menu should both appear and disappear as soon as you complete a tap.

## Keyboard support and accessibility

As with all Elix components, we strive for excellent keyboard support. This benefits all users that want to use a keyboard and improves universal accessibility.

We allow users to invoke a menu button by pressing Space. The user can navigate the items in the resulting `Menu` with the full set of keyboard navigation keys supported by [KeyboardDirectionMixin](/elix/KeyboardDirectionMixin), [KeyboardPagedSelectionMixin](/elix/KeyboardPagedSelectionMixin), and [KeyboardPrefixSelectionMixin](/elix/KeyboardPrefixSelectionMixin). Without writing any new code, those mixins give `Menu` support for Up/Down keys, Page Up/Page Down keys, Home/End keys, and prefix selection (e.g., type "Z" to select "Zoom").

In making our menu components accessible via ARIA, we were helped by this excellent Inclusive Components article on [Menus & Menu Buttons](https://inclusive-components.design/menus-menu-buttons/). The whole Inclusive Components series is worth a read.

While our `Menu` component generally behaves like our [ListBox](/elix/ListBox), the accessibility rules for menus are different than lists. The `role` attributes involved are different, for one thing. Another way in which menu accessibility is different than that for lists is that the overall list element can take the keyboard focus, whereas the browser expects a menu to put the keyboard focus on an individual menu item.

Happily, our [mixin-based approach to components](https://component.kitchen/elix/mixins) was hugely helpful in letting us create a `Menu` component that worked _mostly_ like our `ListBox` component, but with some differences. Rather than subclassing `ListBox` or creating a common base class (as we might have in a traditional class hierarchy), we simply copied over the set of mixins `ListBox` was using, dropped the ones we didn't need, and then created an [AriaMenuMixin](/elix/AriaMenuMixin) for menus to replace the [AriaListMixin](/elix/AriaListMixin) which `ListBox` needs. We end up with a `Menu` that cleanly shares 90% of the code from `ListBox` without any class hierarchy entanglements.

## Customizability

For styling and general customizability, all these menus components have replaceable parts. So you can use a `MenuButton`, but swap out the elements it uses by default with our own custom elements. You could:

- Have your menus show a semi-opaque backdrop over the page that's themed with your brand color.
- Change the popup (menu) portion so that the menu animates in with a sliding effect.
- Replace the `Menu` that contains the menu items with an element that lays out items as pie slices instead of the usual vertical orientation.

## Bonus: a customizable select element

With our `MenuButton` component in hand, it was easy to create a [DropdownList](/elix/DropdownList) variation that shows the selected value as the menu button's label. When the user makes a selection from the menu, the button label updates to match.

This effectively lets you use `DropdownList` as a customizable version of the built-in HTML `<select>` element. The native `<select>` can only cope with text choices, but `DropdownList` can handle arbitrary content — including custom elements, of course — as content in both the menu button and the menu items. See this [customized dropdown list demo](/demos/colorDropdownList.html) for an example.

Interestingly, the native `<select>` is a place where some users may use the drag-to-select method to make a selection — even if they're the type of user that normally selects from an app's menu bar using the two-click method. In other words, all the work we did to build a menu button with great mouse support _also_ makes it possible for us to deliver a dropdown list (`<select>`) with great mouse support.

## These details are a pain!

Getting all these details correct takes far too much time. Which is precisely why no app team should try to build a menu component from scratch! The only sane way to achieve OS-quality menu components for web apps is to share code — to pour the attention of an open component library community into menu components that everyone can use. _That_ is why Elix exists.
