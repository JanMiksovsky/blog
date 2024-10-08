---
title: "Controls of the Week: HorizontalPanels and VerticalPanels for basic CSS3 flexbox layouts today"
originalUrl: https://miksovsky.blogs.com/flowstate/2012/03/simpleflexbox.html
---

<p>
  It’s really, really common in UI to place a panel on one or both sides of a
  main content area, on the left and right or on the top and bottom:
</p>
<p>&#0160;</p>
<p>
  <img
    alt="HorizontalPanels"
    src="/images/flowstate/6a00d83451fb6769e2016763d7f924970b-pi.png"
  />
</p>
<p>&#0160;</p>
<p>
  <img
    alt="VerticalPanels"
    src="/images/flowstate/6a00d83451fb6769e20168e8d88a68970c-pi.png"
  />
</p>
<p>&#0160;</p>
<p>
  As ubiquitous as these layouts are, until recently it wasn’t easy to create
  them in HTML and CSS alone. You were either forced to hard-code the heights or
  widths of the panels, which is gross and hard to maintain — measuring the
  rendered dimension of a UI element is a task best left to the browser. You
  could write JavaScript to calculate the dimensions at runtime, but that’s a
  bunch of work many have avoided.
</p>
<p>
  The
  <a href="http://www.w3.org/TR/css3-flexbox/">CSS Flexible Box Layout Module</a
  >, a.k.a. “flexbox”, is intended to address layouts like the ones above. For a
  general introduction to flexbox layout, see
  <a
    href="http://coding.smashingmagazine.com/2011/09/19/css3-flexible-box-layout-explained/"
    >CSS3 Flexible Box Layout Explained</a
  >. This feature hasn’t gotten as much use as it could; as shown on
  <a href="http://www.caniuse.com/#feat=flexbox">When can I use</a>, it’s not
  supported on the current (as of this writing) versions of Internet Explorer.
  Moreover, the flexbox spec changed a while back; only Chrome supports the
  final spec.
</p>
<p>
  To address older browsers, it’s possible to use a
  <a href="http://en.wikipedia.org/wiki/Polyfill">polyfill</a> to support new
  CSS features. In this case, I wanted to create QuickUI controls to serve as a
  polyfill for flexbox layout. That is, these should take advantage of flexbox
  on browsers that support it. On older browsers, they should fall back to
  simpler flexbox-less CSS in cases where that is sufficient, and otherwise fall
  back to JavaScript-based layout.
</p>
<p><strong>Key attributes</strong></p>
<p>
  The flexbox layout module can handle many layouts and needs beyond the two
  shown above, but the two above are common enough that they represent a good
  starting point.
</p>
<ul>
  <li>Each layout has a stretchable main content panel.</li>
  <li>
    A horizontal layout can have a panel on the left, right, or both. Similarly,
    a vertical layout can have a panel on the top, bottom, or both.
  </li>
  <li>
    The control needs to be able to handle arbitrary content in the panels. If
    the content changes, the layout should adjust in response.
  </li>
  <li>
    Each layout comes in two forms: one with a constrained height (in which the
    content is generally scrollable) and one with no height constraint (i.e.,
    grows as tall as necessary). In practice, the unconstrained form comes up
    much more often in the horizontal layout. (In the vertical case, the
    unconstrained form is really just a stack of divs, so no special layout is
    necessary. However, controls such as
    <a href="https://quickui.org/catalog/TabSet/">TabSet</a> come in both
    height-constrained and unconstrained forms, and it’d be nice to be able to
    position the tabs using a vertical layout in either case. So even the
    unconstrained vertical layout comes up in some, albeit rare, situations.)
  </li>
</ul>
<p><strong>HorizontalPanels and VerticalPanels controls</strong></p>
<p>
  I’ve posted
  <a href="https://quickui.org/catalog/HorizontalPanels/">HorizontalPanels</a>
  and
  <a href="https://quickui.org/catalog/VerticalPanels/">VerticalPanels</a>
  controls that address the layouts described above. They can each handle up to
  one panel on either side of the content area.
</p>
<p>
  As browser implementations come up to snuff, the components can be updated to
  take advantage of native CSS flexbox support (including, eventually, the new
  syntax). You can build a UI using these layout components that will work today
  (as far back as IE 8), knowing that your UI will capitalize on flexbox support
  as it become more available.
</p>
<p><strong>Implementation notes</strong></p>
<p>
  The HorizontalPanels and VerticalPanels controls derive from a base class
  called <a href="https://quickui.org/catalog/SimpleFlexBox/">SimpleFlexBox</a>,
  which sniffs out support for display: box and its variants. In testing, it
  seemed only WebKit’s flexbox implementation is worth using today. As of this
  writing, the Mozilla implementation seems too flaky overall to depend upon.
  And even on WebKit, I hit what looks like a
  <a href="http://code.google.com/p/chromium/issues/detail?id=118004">bug</a>
  preventing the use of automatic scroll bars in a height-constrained flexbox
  panel with horizontal orientation, which is a pretty common use case. This
  means HorizontalPanels can’t always use flexbox layout, even on Chrome. And
  while I’m interested in testing these controls on IE 10, Microsoft has tied
  the IE 10 preview to the Windows 8 preview, and I’ve already wasted too much
  of my life fiddling with Windows betas to care about trying Windows 8 before
  it’s ready. (Weren’t all the tying-IE-to-Windows shenanigans supposed to end
  with the DOJ consent decree?)
</p>
<p>
  The height-unconstrained cases can be emulated on older browsers using other
  CSS (i.e., without doing layout in JavaScript), so again there’s no price to
  pay unless its necessary. If the only way to perform the layout is JavaScript,
  the control binds to a newly-overhauled pair of events in the QuickUI
  framework. There’s now a general-purpose layout event to which any control
  class can bind if it wants to be notified when the control’s dimensions have
  changed in response to a window resize. There’s a companion sizeChanged event
  a control can listen to for changes in the dimensions of its children. This is
  used by the SimpleFlexBox base class, for example, to listen for any changes
  in the size of controls in its side panels so it can determine whether it
  needs to adjust the size of the center content area. SimpleFlexBox only binds
  to these events in the cases where it needs to manually lay things out, so
  you’re only paying the price of those events when it’s necessary.
</p>
<p>
  I did hit a weird cross-browser issue in IE9: when I view the VerticalPanels
  demo in IE9 under Large Fonts, the border for the main content area
  doesn&#39;t quite touch the border for the bottom panel. This can happen in
  IE9 because elements that size to text content can end up with fractional
  pixel heights. Since IE9 doesn&#39;t support flexbox, in the constrained
  height scenario SimpleFlexBox needs to examine the height of the top and
  bottom panels so it can adjust the metrics on the main content area.
  SimpleFlexBox requires on jQuery&#39;s height() function to do this, which
  turns out to always report integral pixel values. Under certain cases, then,
  it&#39;s possible to end up with a sub-pixel gap between the main content area
  and the&#0160;panels&#0160;— and the gap can become visible if the browser or
  display is scaling things up (as with Large Fonts). IE9 can report fractional
  heights via window.getComputedStyle(), but it doesn&#39;t seem worth this
  trouble just to support IE9 under various display edge cases. IE8 reports
  integral heights, and IE10 should support flexbox, leaving only IE9 with this
  issue. A simple workaround would be to avoid setting interior borders on the
  main content area if you&#39;re also setting them on the panels.
</p>
<p>
  In any event, it’s nice to be able to wrap up a bunch of browser-dependent
  styling or code into a reusable component that can handle the details so the
  component user doesn’t have to. And, IMO, I’m not altogether sure that
  universal flexbox support will actually eliminate all need for controls like
  HorizontalPanels or VerticalPanels. Use of those controls in your code can
  arguably make it easier to clearly state your <em>intent</em>. While the CSS
  flexbox spec is very, um, flexible, the resulting CSS is not particularly easy
  to read. I preferred the Dock=“Left” syntax of Microsoft’s
  <a
    href="http://msdn.microsoft.com/en-us/library/system.windows.controls.dockpanel.aspx"
    >DockPanel</a
  >
  control to the flexbox syntax, and have tried to mirror the former in
  designing the API for HorizontalPanels and VerticalPanels. Compare: to set the
  content of the left panel of HorizontalPanels control, you can stuff that
  content into a property called “left”. To achieve the same result in CSS3, you
  <em>omit</em> the “box-flex:” property to ensure the panel
  <em>won’t</em> stretch. I think the former is easier to read and maintain.
  Even once everyone has a flexbox-capable browser, these controls might still
  find use as more legible wrappers around the underlying CSS.
</p>
