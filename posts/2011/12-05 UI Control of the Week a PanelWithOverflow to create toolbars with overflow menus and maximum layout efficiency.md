---
title: "UI Control of the Week: a PanelWithOverflow to create toolbars with overflow menus and maximum layout efficiency"
date: 2011-12-05
originalUrl: https://miksovsky.blogs.com/flowstate/2011/12/panelwithoverflow.html
---

<p>
  Applications with toolbars should generally give the user access to all
  toolbar commands, even when the window isn&#39;t large enough to show all of
  them. Wrapping a toolbar&#39;s contents is one possibility, but this is
  usually avoided because it begins to steal too much space away from the
  application&#39;s main content area. The standard technique is to have the
  commands which can&#39;t fit horizontally <em>overflow</em> into a dropdown
  menu.
</p>
<p>
  This technique is used, for example, in the Bookmark (or Favorite) toolbar in
  every mainstream web browser. Here&#39;s Safari:
</p>
<p>
  <img
    src="/images/flowstate/6a00d83451fb6769e2015393d1510b970b-pi.png"
    alt="Safari Bookmark Bar"
  />
</p>
<p>
  When the user makes the window too small to see all the bookmark buttons, the
  buttons which don’t fit overflow into a dropdown menu:
</p>
<p>
  <img
    src="/images/flowstate/6a00d83451fb6769e20162fd26ba3c970d-pi.png"
    alt="Safari Bookmark Bar with Overflow"
  />
</p>
<p><strong>Key attributes</strong></p>
<ul>
  <li>The toolbar contents (usually buttons) are arranged horizontally.</li>
  <li>
    Items which don&#39;t fit are clipped entirely; no item (e.g., Bookmark 5 in
    the toolbar of the second image) is ever shown partially visible.
  </li>
  <li>
    If there are any items which don&#39;t fit, an overflow menu button appears.
    The standard is for the button to show a pair of right-pointing chevrons
    (»).
  </li>
  <li>
    Clicking the menu button produces a dropdown menu containing the items which
    don’t fit in the toolbar.
  </li>
  <li>
    Items may appear slightly differently in the menu than they appear in the
    toolbar. In the Safari example above, plain-looking toolbar buttons become
    vertically-oriented menu items with icons. Beyond the change in appearance,
    the items generally behave the same in the menu as they do in the toolbar.
  </li>
  <li>
    As the user resizes the window, the control recalculates whether an overflow
    menu (and therefore a menu button) is necessary.
  </li>
</ul>
<p>
  This overflow pattern is apparently so successful that the
  <em>exact same user interface</em> — down to the use of right-pointing
  chevrons to indicate overflow — is used by Chrome, Firefox, and Internet
  Explorer. The funny thing is, each of these other browsers fumble one small
  aspect of the behavior: determining whether or not to allocate room for the
  menu button.
</p>
<ul>
  <li>
    Google Chrome always allocates room for the menu button, even when the
    button isn’t visible. This means there are cases where the toolbar button
    would have fit, but the invisible menu button is still taking up room, which
    forces overflow to be triggered a bit earlier than strictly necessary. For
    comparison, in the top screen shot, Safari can fit the button for “Bookmark
    6”, but in the same situation, Chrome will force that button to overflow.
    Effectively the user has something like 10-20 pixels or so
    <em>less</em> room in Chrome for their browser bookmarks.
  </li>
  <li>
    Mozilla Firefox is a bit smarter, but inconsistent. It doesn&#39;t allocate
    room for the menu button if the menu button&#39;s not currently visible, so
    Firefox can squeeze in an extra bookmark in cases where Chrome drops it.
    However, once the menu button is visible, the menu button takes up room —
    even when hiding the menu button would now leave enough room to show the
    last bookmark!
  </li>
  <li>
    Internet Explorer 10 gets things right — but get points off for incessantly
    flickering the menu button during a window resize. Presumably on any window
    resize, IE is <em>always </em>hiding the menu button, then re-showing it if
    it’s needed. This doesn&#39;t feel nearly as solid as Safari’s treatment,
    which smoothly moves the menu button left and right as the window resizes.
  </li>
</ul>
<p>
  These are all small points, and I doubt most users of these browsers have ever
  noticed them. Still, this is not ideal. I think this is what happens when
  designers and developers, even those on huge software teams, are forced to
  roll their own solution to a common problem. Either they don&#39;t notice the
  issue or, if they do, don&#39;t feel like it&#39;s worth taking the time to
  fix.
</p>
<p>
  And here we&#39;re talking about large, production web browsers built upon
  rich client-side UI frameworks. Many web sites aren’t building on a rich UI
  framework, so they’re forced to code everything by hand. The result is that
  web application toolbars are typically far clunkier. They often blithely
  assume the user’s window will be wide enough to show all the commands, and
  clip or wrap the buttons when the window is narrow.
</p>
<p>
  A correct, solid implementation (like Safari’s) should be available to any
  site that wants it — by coding the correct solution in a reusable component.
  By treating something as basic as overflow as a component in its own right, it
  suddenly becomes worth lavishing the attention and effort to achieve maximum
  layout efficiency, including properly handling those last 10-20 pixels,
  because lots of users across multiple apps will benefit.
</p>
<p><strong>PanelWithOverflow</strong></p>
<p>
  I&#39;ve posted a basic
  <a href="https://quickui.org/catalog/PanelWithOverflow">PanelWithOverflow</a>
  control to the QuickUI catalog.
</p>
<p>
  <img
    alt="PanelWithOverflow"
    src="/images/flowstate/6a00d83451fb6769e20162fd26dcbe970d-800wi.png"
  />
</p>
<p>
  As discussed above, use PanelWithOverflow in situations like toolbars where
  you want to constrain the height of a toolbar while simultaneously
  guaranteeing access to all the toolbar&#39;s commands at a wide range of
  window sizes. For a toolbar that docks to the top of the page, nest the
  PanelWithOverflow inside a
  <a href="https://quickui.org/catalog/PersistentPanel">PersistentPanel</a>.
</p>
<p><strong>Implementation notes</strong></p>
<p>
  The simplest way to implement this behavior in a web control seems to be to
  force the control’s contents to appear on the same line (white-space: nowrap),
  then calculate which items completely fit. The ones that don&#39;t are
  explicitly made invisible (using visibility: hidden) to avoid a
  partially-clipped item.
</p>
<p>
  In coding this, it became obvious why Chrome and Firefox browsers display the
  layout oddities they do. To decide whether the <em>nth</em> item can fit, you
  need to know how much room is available for it, which depends on whether or
  not the menu button is going to be needed — which in turn may depend on
  whether the next item to the right (item <em>n</em>+1) will fit. The layout
  logic gets much simpler, however, by applying the expedient of looping over
  the control&#39;s contents <em>from right to left</em>. If item <em>n</em>+1
  is going to overflow, you know for sure that you need to allocate room for the
  menu button when considering item <em>n</em>.
</p>
<p>
  Just because this QuickUI control avoids a small layout bug in the various
  browser toolbar implementations above doesn&#39;t mean it’s necessarily better
  than those implementations. Those toolbars have many more features (e.g.,
  customization), and surely have received much more testing overall. Still, I’d
  argue that the QuickUI implementation is a reasonably solid start on an open,
  component-based solution.
</p>
