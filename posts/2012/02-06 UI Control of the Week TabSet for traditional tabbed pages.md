---
title: "UI Control of the Week: TabSet for traditional tabbed pages"
originalUrl: https://miksovsky.blogs.com/flowstate/2012/02/ui-control-of-the-week-tabset-for-traditional-tabbed-pages.html
---

<p>
  This week&#39;s control is the standard tabbed page UI found throughout client
  apps and web sites. Here&#39;s a typical example, from iTunes Preferences:
</p>
<p>
  <img
    alt="ITunes Preferences"
    src="/images/flowstate/6a00d83451fb6769e20163007b71aa970d-pi.png"
  />
</p>
<p><strong>Key attributes</strong></p>
<ul>
  <li>
    The tabs typically represent different aspects of a single object, or
    different areas at the same navigational depth in a hierarchy.
  </li>
  <li>
    There&#39;s one button for each tab. Clicking a button selects the
    corresponding tab.
  </li>
  <li>
    The button for the active tab is always visually highlighted in some way.
    Often the active tab is shown on a surface contiguous with that of the
    active page. (iOS tabs don&#39;t do this.)
  </li>
  <li>
    The tab button are usually arranged horizontally across the top, but may
    also appear arranged along the left or, more rarely, the bottom.
  </li>
  <li>
    All tabs share the same width, and usually the same height as well. This
    consistent size probably was originally intended to reflect the consistent
    physical size of the atavistic tabbed paper folders that inspired
    this&#0160;UI representation, but even now the consistent size is useful in
    helping the user recognize all the tabs as related aspects of some single
    thing.&#0160;(Exception: On the Mac, a tabbed Preferences dialog like the
    one above, in which the window holds nothing but the tab set, will change
    size as the user changes tabs.)
  </li>
  <li>
    There&#39;s usually just one row of tabs. (Multiple rows are clunky: they
    prevent the active button from being adjacent to its corresponding tab, or
    else force tab rows to switch places.) This generally means the number of
    tabs is usually low, typically in the 3<span>–</span>9 range.
  </li>
</ul>
<p><strong>TabSet control</strong></p>
<p>
  I&#39;ve posted a
  <a href="https://quickui.org/catalog/TabSet">TabSet</a> control in the QuickUI
  Catalog that manages a set of tabs:
</p>
<p>
  <img
    alt="TabSet"
    src="/images/flowstate/6a00d83451fb6769e20168e6727e9d970c-pi.png"
  />
</p>
<p>
  The pages within the TabSet can be any type of element or control, although
  for convenience a&#0160;<a href="https://quickui.org/catalog/Tab">Tab</a>
  control is provided to make it easy to set the page&#39;s descriptive label.
</p>
<p>
  Usage: Use a TabSet when you need to fit a large number of controls into a
  comparatively small space, and the controls can be grouped into meaningful
  tabs with clear labels. The controls in each tab should generally only have
  local effects within that tab&#39;s UI; it would be extremely confusing if
  checking a box in one tab disabled some control on a different tab.
</p>
<p>
  A scrolling page may often be a simpler alternative to a tabbed UI. One
  advantage tabs do have is that the labeled tab buttons provide a summary; they
  help give the user an overview of what object properties, navigational areas,
  etc., are available. To the extend the tab labels are meaningful and clearly
  reflect the tab&#39;s contained controls, this labeled structure may
  accelerate a user&#39;s search for a particular control.
</p>
<p><strong>Implementation notes</strong></p>
<p>
  I&#39;ve built TabSet top of a more primitive control called&#0160;<a
    href="https://quickui.org/catalog/Switch"
    >Switch</a
  >. Switch acts as a container for other elements, and will only show one of
  those elements at a time. (The &quot;Switch&quot; name is inspired by the
  &quot;switch&quot; statement in&#0160;programming languages like C and
  JavaScript.) There are actually plenty of cases where a UI will contain a
  mutually-exclusive set of elements, and not all of these cases happen to look
  like tabs, so upon reflection it&#39;s somewhat surprising to me that more UI
  toolkits don&#39;t offer something like a Switch control.
</p>
<p>
  In this case, the TabSet wraps a Switch, adding a&#0160;<a
    href="https://quickui.org/catalog/List"
    >List</a
  >
  of buttons and populating them with the description() property of the
  corresponding tabs.
</p>
<p>
  The trickiest part of TabSet turned out to be handling the common case in
  which the TabSet itself should be as tall as its tallest tab (regardless of
  the individual tab heights). This allows for a consistent border or
  background, which helps the user interpret the disparate tabs as being closely
  related; it also avoids potential document reflow when the user switches tabs.
  The standard ad hoc solution in a case like this is to force all the elements
  to a known height (e.g., in pixels), but hard-coding element sizes seems like
  a cop-out if one&#39;s goal is to create a flexible control that handle a wide
  range of content. It seems like TabSet (or, actually, Switch) should be able
  to inspect the height of its contained elements and automatically resize
  itself to be as tall as the tallest contained element. This gets tricky
  because Switch normally hides all pages except the one which is active, and
  the height of an element hidden with display: none is reported as zero. To
  work around this, the underlying Switch class has been modified so that, in
  the auto-maximizing case like this, Switch hides the inactive pages with
  visibility: hidden instead (which lets the elements report their correct
  height), then uses absolute positioning to superimpose and top-align the
  pages.
</p>
<p>
  A related complexity arose in the case shown in the TabSet demo: the height of
  a tab may change based on asynchronously loaded content (e.g., an image). So
  the update of any tab&#39;s content, even one which isn&#39;t currently
  visible, may potentially force the TabSet to resize. Unfortunately, there
  isn&#39;t a standard DOM resize event for elements other than elements the
  <em>user</em> can resize (such as the window). So QuickUI controls have to
  make do by raising a custom event when they resize, allowing controls like
  Switch to adjust their height accordingly.
</p>
<p>
  It&#39;s boring details like resizing that forces most designers to throw up
  their hands and resort to hard-coded pixel dimensions, but UI controls that
  can flexibly handle dynamic content are ultimately far easier to use and work
  with as a design evolves.
</p>
