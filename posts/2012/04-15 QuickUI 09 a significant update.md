---
title: "QuickUI 0.9: a significant update"
originalUrl: http://blog.quickui.org/2012/05/15/quickui-0-9-a-significant-update/
---

<p>
  QuickUI 0.9 has been released. This is a major update which includes a number
  of changes that make it easier than ever to create reusable, extensible web
  user interface components.
</p>
<ul>
  <li>
    The means by which classes are defined has been substantially simplified,
    which means that QuickUI is doing a lot less work when a class is defined.
    One result is that the previous Control.subclass() method has been replaced
    with a simple jQuery.sub() call. An overload still permits one to pass in a
    JavaScript object defining the class, but now everything in that object is
    simply copied over to the new class’ prototype. A new “inherited:” key now
    holds the Control JSON used to render the control; see the
    <a href="https://quickui.org/docs/control-JSON.html">docs</a> for more
    details.
  </li>
  <li>
    The way you refer to an element within a control’s DOM has changed.
    Previously, you set an ID on an element in Control JSON using an “id:” key.
    Under the covers, this set an ID on the HTML element. As of QuickUI 0.9, to
    refer to an element in code, the Control JSON should include a “ref:” key.
    (See the
    <a href="https://quickui.org/tutorial/element-reference-functions.html"
      >tutorial example</a
    >.) Under the covers, this will set a CSS class on the element. As before,
    this also implicitly creates an element reference function you can use to
    get that element through code: e.g., setting ref: “foo” on an element lets
    you get back to that element with the element reference function $foo().
  </li>
  <li>
    A control’s initialize() method now implicitly invokes the initialize()
    methods of its base classes. Previously, you had to remember to have
    initialize() invoke this._super(), which was error prone. Failure to invoke
    this._super() would often mean that a base class’ event handlers didn’t get
    wired up, which could lead to bugs which were difficult to track down.
  </li>
  <li>
    CoffeeScript support,
    <a
      href="http://blog.quickui.org/2012/05/07/quickui-now-supports-coffeescript/"
      >announced earlier</a
    >, has been folded into the core quickui.js runtime.
  </li>
</ul>
<p>
  While the above work was underway, the QuickUI source code was substantially
  overhauled:
</p>
<ul>
  <li>
    The aforementioned support for creating QuickUI controls in CoffeeScript has
    gone so well that QuickUI’s own runtime has now itself been ported to
    CoffeeScript. This does <em>not</em> mean that QuickUI developers need to
    use CoffeeScript; QuickUI supports plain JavaScript development and
    CoffeeScript development equally well. For people using QuickUI, this simply
    means that a number of planned improvements to QuickUI (including those
    listed above) could more easily be tackled.
  </li>
  <li>
    The quickui.js runtime file itself is now built with Ben Alman’s handy
    <a href="https://github.com/cowboy/grunt">Grunt</a> build tool.
  </li>
  <li>
    The optional QuickUI markup compiler has been moved into a separate GitHub
    repo, quickui-markup.
  </li>
</ul>
<p>Please take a look!</p>
