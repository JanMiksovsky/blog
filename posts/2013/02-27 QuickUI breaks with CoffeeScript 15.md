---
title: "QuickUI breaks with CoffeeScript 1.5"
originalUrl: http://blog.quickui.org/2013/02/27/quickui-breaks-with-coffeescript-1-5/
---

<p>
  Bad news: this week's release of CoffeeScript 1.5 is incompatible with even
  the current QuickUI release, 0.9.3.
</p>
<p>
  QuickUI goes through
  <a href="http://blog.quickui.org/2012/06/07/jquery-fn-init/"
    >significant trouble to subclass jQuery</a
  >
  because of jQuery's complex constructor. jQuery depends on an unusual feature
  of JavaScript called an "other typed" constructor: a class constructor that
  returns something other than a plain instance of the class being instantiated.
  When the CoffeeScript project considered dropping support for such
  constructors, cases were made to keep that feature (see <a
    href="https://github.com/jashkenas/coffee-script/issues/2359"
    >CoffeeScript issue #2359</a
  >, but other people made similar cases on other issues). However, those
  arguments did not carry the day, and as of CoffeeScript 1.5, "other typed"
  constructors are rejected by the compiler. This effectively breaks the
  CoffeeScript source for QuickUI itself as well as for QuickUI Catalog.
</p>
<p>
  Possible fixes are being investigated, but this issue runs very deep, and a
  number of straightforward workarounds have already been ruled out. A real fix
  will likely require a substantial change to the way QuickUI instantiates
  controls. For the time being, it is recommended that QuickUI developers use
  CoffeeScript 1.4.0.
</p>
