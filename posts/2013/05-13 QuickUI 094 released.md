---
title: "QuickUI 0.9.4 released"
date: 2013-05-13
originalUrl: http://blog.quickui.org/2013/05/13/quickui-0-9-4-released/
---

<p>
  This release fixes a number of small bugs in both QuickUI and the QuickUI
  Catalog.
</p>
<p>
  The most significant change is in the Control constructor. QuickUI previously
  went through a lot of trouble to
  <a href="http://blog.quickui.org/2012/06/07/jquery-fn-init/"
    >subclass jQuery</a
  >. This code involved patching up a class when an attempt was made to
  instantiate it so that the result would be acceptable to jQuery. Specifically,
  the resulting patched-up class could be instantiated without requiring the
  "new" keyword. This code was quite complex and brittle, and was eventually
  <a
    href="http://blog.quickui.org/2013/02/27/quickui-breaks-with-coffeescript-1-5/"
    >broken by a change to the CoffeeScript 1.5 compiler</a
  >. The CoffeeScript folks graciously backed out that change in CoffeeScript
  1.6 so that QuickUI could continue to function.
</p>
<p>
  Meanwhile, a workaround had already begun to drastically simplify the Control
  constructor — in exchange for dropping the ability to instantiate a control
  class' constructor without the "new" keyword. As it turns out, QuickUI
  controls are typically instantiated via the framework itself, either
  declaratively through Control JSON or imperatively by invoking
  Control.create(). Only the framework needed to directly instantiate a control
  class, and so the framework source was updated to always make use of the "new"
  keyword.
</p>
<p>
  By the time this workaround was ready for deployment, the CoffeeScript 1.6
  change made that workaround unnecessary. However, because the workaround was
  already working, and had significantly simplified the framework source, it was
  decided to keep the workaround. It was probably still correct for CoffeeScript
  1.6 to back out the earlier breaking change to control constructors in CS 1.5.
  As this experience shows, the change not only dictated what CoffeeScript
  developers could do, it prevented or impaired their ability to integrated with
  plain JavaScript libraries which made use of "other typed" constructors.
</p>
<p>
  In general, despite this constructor change deep in the framework, QuickUI
  developers should generally observe no changes in framework behavior.
</p>
<p>
  The QuickUI Catalog has a few small bug fixes, but the version number has been
  bumped to 0.9.4.0 to keep in sync with the new version number for QuickUI
  0.9.4.
</p>
