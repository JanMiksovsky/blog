---
title: "UI Control of the Week: Coding a ListInlay pattern that lets user expand list items in place"
originalUrl: https://miksovsky.blogs.com/flowstate/2012/01/listinlay.html
---

<p>
  I think the concept of a
  <a href="http://en.wikipedia.org/wiki/Pattern_language">pattern language</a>
  is a useful lens with which to consider interface design, but we don’t have to
  settle for patterns as static, textual descriptions. The first pattern
  language was grounded in the domain of physical architecture, and while the
  concept was deeply insightful, many people have applied it to the domain of
  software user interface design without, I believe, recognizing that the
  constraints of building architecture don’t apply to software design. Given a
  properly expressive UI framework, many UI techniques described as patterns can
  be implemented in code.
</p>
<p>
  I’ve been a fan of attempts to catalogue UI patterns since I first came across
  Jenifer Tidwell’s
  <a href="http://www.mit.edu/~jtidwell/common_ground.html">Common Ground</a>.
  Tidwell’s latest work is presented in her recent second edition of
  <a href="http://amzn.to/xIUjDY">Designing Interfaces</a>. Many of the patterns
  it describes contain some non-trivial element that can be given a functional
  manifestation in code. To use an analogy from programming languages, UI
  patterns are somewhat similar to abstract base classes. Such a class defines
  some, but not all, of the behavior necessary to create a useful result. In my
  mind, the more interesting a UI pattern is, the more likely it is that some
  aspect of the textual description can be identified and coded in a reusable UI
  control.
</p>
<p>
  Take, for example, the&#0160;<a
    href="http://designinginterfaces.com/patterns/list-inlay/"
    >List Inlay</a
  >&#0160;pattern, in which a list lets the user expand an item to see more
  detail in place. Tidwell points to Amazon’s mobile review UI as one example:
</p>
<p>&#0160;</p>
<p>
  <img
    alt="Amazon Mobile Reviews (Collapsed)"
    src="/images/flowstate/6a00d83451fb6769e20163003f079a970d-pi.jpeg"
  />
</p>
<p>&#0160;</p>
<p>
  Each list item shows a capsule review. Tapping a review expands the item in
  place to show the full review text and some additional details:
</p>
<p>&#0160;</p>
<p>
  <img
    alt="Amazon Mobile Reviews (Expanded)"
    src="/images/flowstate/6a00d83451fb6769e20168e635c3c6970c-pi.jpeg"
  />
</p>
<p>&#0160;</p>
<p><strong>Key attributes:</strong></p>
<ul>
  <li>All list items are typically collapsed by default.</li>
  <li>
    Clicking a list item expands it to reveal more information about that item,
    possibly including interactive controls. Clicking an item which is already
    expanded generally collapses it.
  </li>
  <li>
    The list may either allow multiple items to be expanded simultaneously, or
    may permit only a single item to be expanded at a time.
  </li>
</ul>
<p>
  A List Inlay can also be used to implement the common “Accordion” user
  interface pattern as well. As far as I can tell, there’s not much hard
  difference between these two patterns. A List Inlay is essentially an
  Accordion which shows live data, whereas the UI elements described as
  Accordions tend to have static headings that have been hand-authored to
  summarize their contents. Beyond that, to me these two patterns seem nearly
  the same.
</p>
<p><strong>ListInlay control</strong></p>
<p>
  Here, the above attributes of the List Inlay pattern are fairly
  straightforward to code.&#0160;With those requirements in mind, I’ve created a
  <a href="https://quickui.org/catalog/ListInlay">ListInlay</a> control for the
  QuickUI Catalog:
</p>
<p>&#0160;</p>
<p>
  <img
    alt="ListInlay"
    src="/images/flowstate/6a00d83451fb6769e20168e635c444970c-pi.png"
  />
</p>
<p>&#0160;</p>
<p>Usage: Tidwell suggests using a List Inlay when…</p>
<blockquote>
  <p>
    <em
      >Each item has interesting content associated with it, such as the text of
      an email message, a long article, a full-size image, or details about a
      file’s size or date. The item details don’t take up a large amount of
      space, but they’re not so small that you can fit them all in the list
      itself. </em
    ><em
      >You want the user to see the overall structure of the list and keep that
      list in view all the time, but you also want her to browse through the
      items easily and quickly.</em
    >
  </p>
</blockquote>
<p>
  In contrast, if the item details are complex, or offer substantial editing
  capabilities, it may be more appropriate to navigate to the details in a
  separate window or dialog, or show the details in a separate detail pane,
  rather than expanding them inline.
</p>
<p>
  The ListInlay class permits a single item to be expanded at a time, so
  clicking a new item to expand it will collapse any previously-selected item.
  I’ve also created a multiple-select variation called
  <a href="https://quickui.org/catalog/MultiListInlay">MultiListInlay</a> that
  permits multiple items to be expanded at once.
</p>
<p>
  Caution: Some applications use a variation of this UI for navigation, e.g., as
  an accordion pane on the left side of an app window. It’s not uncommon for
  such apps to dock the list items to the top or bottom of the navigation pane
  (with the selected item filling the remaining space in the middle). I believe
  such a UI is likely to exhibit usability problems: at large window sizes, a
  user looking at the navigation items docked to the top of the pane could
  easily overlook additional items docked to the bottom.
</p>
<p><strong>Implementation notes</strong></p>
<p>
  This control was a pleasure to code up. A ListInlay is just a subclass of the
  previously-discussed
  <a
    href="/posts/2011/11-28-ui-control-of-the-week-basic-listbox-and-how-keyboard-navigation-is-never-as-simple-as-you-think.html"
    >ListBox</a
  >
  meta-control that, by default, uses a
  <a
    href="/posts/2011/12-12-ui-control-of-the-week-standard-collapsible-panel-for-content-that-can-be-put-away.html"
    >Collapsible</a
  >
  to represent list items. Combining these two controls worked right away, and
  from there it was simply a matter of customizing how ListInlay renders a list
  item’s selected state. Instead of just adding a CSS “selected” class, the list
  also needs to invoke the Collapsible’s collapsed() property. (I.e., when an
  item is selected, it’s collapsed property should be set to false.)
</p>
<p>
  The real treat was that basing this control off of ListBox means that, with no
  additional work, ListInlay offers basic keyboard navigation. The control’s
  generic appearance doesn’t show the selected state, but once the list has
  focus, you can navigate the list with the Up and Down keys. It was a pleasant
  surprise to see that the navigation UI played well with the expand/collapse
  animation; score one for Separation of Concerns.
</p>
<p>
  It’s hard to describe, but this sort of coding reminds me a lot of coding in
  Lisp. In Lisp you can make use of higher-order functions like mapcar to
  concisely express complex calculations. In the same vein, coding in QuickUI
  often entails using a meta-control like ListBox to quickly create the
  reasonably complex behavior of something like ListInlay.
</p>
<p>
  Of course, the point of a control like ListInlay isn’t that it’s a polished,
  production-ready result in its own right. As with an abstract base class, what
  makes it useful is that it could form the <em>basis </em>of something
  interesting. As I’m going through “Designing Interfaces”, it’s possible to
  pick out those patterns whose interaction details are consistent or specific
  enough that they could similarly be translated directly to code. I’m adding
  the most interesting such patterns to the QuickUI road map for future work.
</p>
<p>&#0160;</p>
<p>
  <em
    >I&#39;ll be traveling this week to Dublin, Ireland, for the Interaction
    2012 conference. If you&#39;ll be there, please drop me a line!</em
  >
</p>
