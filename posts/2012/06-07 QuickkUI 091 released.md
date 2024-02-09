---
title: "QuickkUI 0.9.1 released"
originalUrl: http://blog.quickui.org/2012/06/07/quickui-0-9-1-released/
---

<p>QuickUI 0.9.1 contains two changes:</p>
<p>
  First, it’s now even easier to create web user interface components in
  CoffeeScript. When CoffeeScript support in QuickUI was
  <a
    href="http://blog.quickui.org/2012/05/07/quickui-now-supports-coffeescript/"
    >first announced</a
  >
  a month ago, you had to include a boilerplate constructor. This was required
  to work around a limitation in CoffeeScript, in which CoffeeScript’s default
  constructor for a class didn’t return a value. (See
  <a href="https://github.com/jashkenas/coffee-script/issues/1966"
    >a good summary of the issue here</a
  >.) That issue has now been
  <a href="https://github.com/jashkenas/coffee-script/pull/1970">fixed</a> in
  CoffeeScript 1.3.3. With a considerable degree of rework in the base Control
  class, you can now create a new user interface control in a single line of
  CoffeeScript:
</p>
<pre>control window.MyButton extends BasicButton</pre>
<p>
  The QuickUI
  <a href="https://quickui.org/docs/CoffeeScript.html"
    >documentation for creating controls in CoffeeScript</a
  >
  has been updated to reflect this.
</p>
<p>
  Second, QuickUI 0.9.1 has a simplified model for generic styling. The QuickUI
  Catalog controls define generic styles that allow them to function without you
  needing to provide styling for them. You can easily turn off a base class’
  generic style by setting the subclass’
  <a href="https://quickui.org/docs/control-prototype-methods.html#generic"
    >generic()</a
  >
  property to false.
</p>
