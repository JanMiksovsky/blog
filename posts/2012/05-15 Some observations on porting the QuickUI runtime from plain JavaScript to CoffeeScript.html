---
title: "Some observations on porting the QuickUI runtime from plain JavaScript to CoffeeScript"
date: 2012-05-15 21:55:29
originalUrl: http://blog.quickui.org/2012/05/15/porting-quickui-to-coffeescript/
---

<p>
  This post shares some highlights of the experience porting a non-trivial
  library from plain JavaScript to CoffeeScript in case other parties are
  considering a similar transition.
</p>
<p>
  Yesterday's
  <a href="http://blog.quickui.org/2012/05/15/quickui-0-9-a-significant-update/"
    >announcement of QuickUI 0.9</a
  >
  mentioned that the framework source code has now been ported to CoffeeScript.
  The QuickUI framework is intended for plain JavaScript development as well;
  nothing in the change of source language changes that. But experimentation
  with the CoffeeScript language suggested there were enough advantages to the
  language that, going forward, it would be worth porting the runtime from plain
  JavaScript to CoffeeScript.
</p>
<p>
  Overall, the port from plain to JavaScript to CoffeeScript went rather
  smoothly, and the bulk of it took about two days. The QuickUI runtime,
  quickui.js, is a reasonably complex JavaScript library, which is to say that
  it's not a toy or trivial sample application. The last plain JavaScript
  version of the QuickUI runtime, quickui-0.8.9.js, was about 7700 lines of
  plain JavaScript (including comments), or about 60K, developed over the course
  of four and a half years.
</p>
<h2>Automatic translation with js2Coffee</h2>
<p>
  The handy <a href="http://js2coffee.org/">js2coffee</a> conversion tool was
  used to kickstart the port. Kudos to Rico Sta. Cruz for this great tool.
</p>
<ul>
  <li>
    The automatically translated CoffeeScript immediately passed 97% of the
    QuickUI unit test suite. The remaining 4 broken tests were do to a single
    <a href="https://github.com/rstacruz/js2coffee/issues/138">issue</a> related
    to translation of the "instanceof" keyword, which was easy enough to work
    around.
  </li>
  <li>
    The one thing js2coffee doesn't translate (yet) are comments, so these had
    to be copied over by hand. Tedious, but straightforward.
  </li>
  <li>
    Similarly, the js2coffee output sometimes produced long lines that needed to
    be hand-broken for legibility. Again, a bit tedious but straightforward.
  </li>
  <li>
    Once all unit tests passed, the unit tests themselves were ported to
    CoffeeScript by the same process.
  </li>
</ul>
<p>
  After about a morning of work, a CoffeeScript-based quickui.js was functional.
  It passed all unit tests, and could actually be used to drive a non-trivial
  QuickUI-based body of code like the
  <a href="https://quickui.org/catalog">QuickUI Catalog</a>.
</p>
<h2>Towards idiomatic CoffeeScript</h2>
<p>
  After the mechanical port with js2coffee, various CoffeeScript idioms were
  applied incrementally to replace the standard JavaScript idioms with their
  more concise CoffeeScript versions. This took another day and half or so.
</p>
<ul>
  <li>
    There was occasion to use pretty much all of CoffeeScript's syntactic sugar.
    References to Foo.prototype.bar() were replaced with the more concise
    Foo::bar(). Closure variables to hold "this" for use in an event handler
    were replaced with CoffeeScript's "=&gt;" syntax. Etc., etc.
  </li>
  <li>
    Because CoffeeScript can wrap a body of code in a single function closure,
    this no longer needed to be done by hand. A wrapping closure like that can
    complicate the management of a pile of plain JavaScript files. The closure
    will typically have to be created through a build process that includes a
    JavaScript fragment (to start the closure) before the real JavaScript files,
    and another fragment (to end the closure) afterwards. (The jQuery
    <a href="https://github.com/jquery/jquery/blob/master/Makefile">Makefile</a>
    does this, for example.) CoffeeScript's built-in support for a closure that
    spans multiple files finally made it easy enough to break up the quickui.js
    runtime from a single monolithic JavaScript file into a much saner and more
    manageable collection of CoffeeScript files. That is, while the same degree
    of manageability could have been achieved in plain JavaScript, CoffeeScript
    made it simple enough that it actually got done.
  </li>
  <li>
    The QuickUI runtime itself doesn't create many classes, but in some cases
    (e.g., the unit test suite), classes could be created via CoffeeScript's
    concise class syntax. This took advantages of QuickUI's new support for <a
      href="https://quickui.org/docs/CoffeeScript.html"
      >creating web user interface controls using CoffeeScript class syntax</a
    >.
  </li>
  <li>
    JavaScript "for" loops were replaced with CoffeeScript list comprehensions.
  </li>
</ul>
<h2>Idiomatic CoffeeScript iteration over jQuery objects</h2>
<p>
  Speaking of "for" loops, it turns out that a good deal of the QuickUI runtime
  deals with looping over jQuery objects. QuickUI controls are a subclass of
  jQuery object, and when looping over them in plain JavaScript, it's often
  convenient to use jQuery's $.each() function. For example, this function
  invokes foo(), a jQuery method or plugin, on each element in a jQuery object:
</p>
<pre>
var $elements = $(".someClass");
$elements.each( function( index, element ) {
    $( element ).foo();
});</pre
>
<p>
  Note that $.each() gives the callback the plain DOM element, so you have to
  wrap that element with $(element) to get a jQuery object you can then
  manipulate. To simplify that, QuickUI's runtime has long had a helper function
  called eachControl() that gives the callback the element as a wrapped jQuery
  object. (In QuickUI's case, it also ensures the control's particular subclass
  of jQuery is used, so that you can directly manipulate the control with that
  control's own specific API.) E.g.:
</p>
<pre>
var $buttons = $(".BasicButton");
$buttons.eachControl( function( index, $button ) {
    $button.foo();
});</pre
>
<p>
  To take best advantage of CoffeeScript's supports for looping constructs, a
  simple jQuery plugin was created to create an array that can directly be used
  by CoffeeScript's "for" loop and list comprehensions. This plugin, called
  Control.segments(), converts a jQuery object that holds a number of elements
  into an array of jQuery objects that each hold a single (wrapped) element. The
  definition of segments() in CoffeeScript is trivial:
</p>
<pre>
Control::segments = -&gt;
  ( @constructor element for element in @ )</pre
>

<p>
  QuickUI defines segments() on the Control class so as not to pollute the
  general jQuery plugin namespace, but the above definition could just as easily
  be done as jQuery::segments to create a plugin that worked with any jQuery
  object. In any event, the result of applying segments() to a jQuery object is
  an array that can be directly iterated over, while at the same time preserving
  type information.
</p>
<pre>$button.foo() for $button in Control(".BasicButton").segments()</pre>
<p>
  Here, the looping variable $button ends up holding an instanceof BasicButton
  (which is also an instanceof jQuery), so $button.foo() invokes
  BasicButton.prototype.foo().
</p>
<p>
  This "for" loop feels more direct and idiomatic in CoffeeScript than the
  standard $.each() approach. (In fact, it'd be nice if $.each() were extended
  so that, if invoked without arguments, it returned an array just like
  segments() does here.) This segments() call can also be used in CoffeeScript
  list comprehensions, thereby replacing many situations in which $.map() is
  currently used. A
  <a href="http://jsperf.com/each-vs-conversion-to-array-and-then-loop"
    >jsperf experiment</a
  >
  suggests the segments() approach performs roughly as well as the standard
  $.each(). The generated JavaScript for segments() does build a temporary array
  of results, but it avoids the need for the callback function and the
  accompanying closure.
</p>
<h2>Impressions</h2>
<p>
  The new, CoffeeScript-based QuickUI source code gets compiled to a plain
  JavaScript file that's essentially the same size as the handwritten JavaScript
  (61K vs 60K). The new runtime appears to perform and function just as well as
  the earlier plain JavaScript one, so QuickUI developers shouldn't notice any
  difference. At the same time, the new CoffeeScript source code
  <em>feels</em> a lot tighter and easier to read and maintain.
</p>
<p>
  This ability to write tighter code has already invited the successful
  implementation of a number of long-planned improvements to the runtime. It's
  hard to say how many of those improvements were easier to tackle because of
  advantages in the CoffeeScript language itself, and how many were tackled just
  because CoffeeScript is a shiny, new tool. But as a general rule, it seems
  that CoffeeScript permits a programmer to more directly express their
  intention than one can do in JavaScript — and any language that can do that is
  a step forward.
</p>
<p>
  Best of all, using any language like CoffeeScript that compiles to plain
  JavaScript enables a developer to finally break a hard dependence between
  language choice and the user's browser. Now that QuickUI itself is written in
  CoffeeScript, it can take immediate advantage of improvements in CoffeeScript
  the day they appear, instead of waiting years for incremental JavaScript
  improvements to make their way through committee, into browsers, and into
  users' hands.
</p>
