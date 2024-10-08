---
title: "Polymer list box and combo box elements"
originalUrl: http://blog.quickui.org/2013/08/26/polymer-list-box-and-combo-box-elements/
---

<p>
  The updated <a href="http://janmiksovsky.github.io/quetzal/">Quetzal</a> home
  page shows off a handful of new elements ported from QuickUI:
</p>
<ul>
  <li>
    A quetzal-list-box element that presents its children as items in a list.
    This makes it easy to give any collection of DOM elements the semantics of a
    single-selection list. The actual tracking of the selection is handled with
    Polymer's own polymer-selector element. On top of this, the Quetzal list box
    adds keyboard navigation: the user can navigate the list using the Up/Down
    arrow keys, as well as Home/End and Page Up/Page Down. This keyboard
    navigation follows the Microsoft Windows model, in which navigation keys
    move the selection, which in turn forces the list's scroll position to
    update to show the selected item. This makes it faster to select an item
    with the keyboard. (In Mac OS X, paging up and down does not update the
    selection.)
  </li>
  <li>
    A quetzal-combo-box element ties together a text input element, a popup, and
    a button to invoke or dismiss the popup. See this post on
    <a
      href="/posts/2011/11-28-ui-control-of-the-week-basic-listbox-and-how-keyboard-navigation-is-never-as-simple-as-you-think.html"
      >the original QuickUI combo box</a
    >
    for details on combo box behavior. Again, a key feature here is keyboard
    support: the Down key invokes the popup (if it's not already open), and the
    Escape key dismisses it. Another feature (inherited from the popup-source
    element) is positioning the popup above or below the text area as room
    allows. This combo box element doesn't provide a specific popup UI. Rather,
    it's intended to be used as a base class for custom combo box elements.
  </li>
  <li>
    A quetzal-list-combo-box element combines the two above elements to create a
    typical combo box which presents choices as a dropdown list box. This
    includes standard auto-complete behavior. In many situations, a combo box
    like this is often a better UI solution than a plain text box with
    auto-complete: the user has a clearly visible button which can be used to
    invoke the complete list of choices. This is more discoverable than
    requiring the user to begin typing to see what the possible choices are. The
    auto-complete behavior matches against the textContent of the elements'
    children, so the list items can be any type of item that has meaningful
    textContent. The sample shown uses a custom element that shows a color
    swatch next to a color name; typing some text will auto-complete against the
    set of color names.
  </li>
</ul>
<p>
  These elements still need more work. For example, the combo box needs a stock
  mobile variant in which the element can fill the screen when making a
  selection to provide bigger hit targets and maximize the number of visible
  list choices. Also, at the moment simply tapping a list box element causes the
  Android Chrome browser to crash. This makes it somewhat hard to debug. :(
  Nevertheless, I think these element demonstrate that a good set of UI base
  classes will make it much easier to create custom UI designs as web components
  take hold.
</p>
