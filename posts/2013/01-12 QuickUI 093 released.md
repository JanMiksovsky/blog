---
title: "QuickUI 0.9.3 released"
originalUrl: http://blog.quickui.org/2013/01/11/quickui-0-9-3-released/
---

<p>
  This minor release is being made now because it contains a fix for the
  forthcoming release of jQuery 1.9. Changes:
</p>
<ul>
  <li>
    A new Control member called Control.browser replicates the behavior of the
    now-deprecated jQuery.browser member. jQuery is quite reasonably trying to
    encourage people to use feature-detection libraries like Modernizr instead
    of looking directly at the user agent to determine behavior, and jQuery 0.9
    is removing support for jQuery.browser. However, in developing the QuickUI
    Catalog controls, minor bugs have been found time and again in specific
    browsers to prevent controls from working correctly. These bugs are the
    sorts of things that will never be detectable with a feature-detection
    library, and hence checking the browser's user agent is the only practical
    way to ensure cross-browser compatibility.
  </li>
</ul>
<p>
  The corresponding release of QuickUI Catalog 0.9.3 includes some minor
  enhancements:
</p>
<ul>
  <li>
    <span style="line-height: 15px"
      >A new
      <a href="https://quickui.org/catalog/TextBoxWithButton"
        >TextBoxWithButton</a
      >
      control covers the common UI pattern of a text box with an adjacent button
      (often labeled "Go" or something similar). </span
    >The existing SearchBox control has been refactored to derive from
    TextBoxWithButton.
  </li>
  <li>
    A new <a href="https://quickui.org/catalog/Log">Log </a>control handles the
    common need to log text output (e.g., from a background process) to the
    page.
  </li>
</ul>
