---
title: "QuickUI now lets you create user interface controls in CoffeeScript"
originalUrl: http://blog.quickui.org/2012/05/07/quickui-now-supports-coffeescript/
---

<p>
  QuickUI now supports the use and creation of web user interface controls in
  <a href="http://jashkenas.github.com/coffee-script">CoffeeScript</a>, a
  language that adds many useful features to the JavaScript language. Through
  its compiler, CoffeeScript can be easily used as a replacement for JavaScript
  in many web projects.
</p>
<p>
  QuickUI turns out to be a natural fit for CoffeeScript. One of the nice
  features in CoffeeScript is that you can create classes with the language’s
  built-in “class” syntax. You can take advantage of that syntax to create new
  QuickUI control classes, simply by extending the base Control class or any
  other control class:
</p>
<pre>
# A simple button class in CoffeeScript
class window.HelloButton extends BasicButton
  constructor: -&gt; return Control.coffee()
  inherited:
    content: "Hello, world!"
  genericSupport: true</pre
>
<p>
  QuickUI control classes are subclasses of jQuery, so one of the key features
  in QuickUI’s new support for CoffeeScript is actually being able to create
  jQuery subclasses in CoffeeScript. CoffeeScript generates a prototype-based
  class that is similar to the classes produced by jQuery’s
  <a href="http://api.jquery.com/jQuery.sub/">$.sub()</a> feature (a core part
  of jQuery that will be moved to a plugin in jQuery 1.8), but jQuery’s classes
  require a rather Byzantine construction sequence. This is handled through the
  boilerplate constructor shown above. When Control.coffee() is called, it fixes
  up the CoffeeScript class so that it conforms to jQuery’s notion of how its
  class constructors should work.
</p>
<p>
  With this in place, it’s now possible to create QuickUI controls in
  CoffeeScript with significantly less source code than the equivalent plain
  JavaScript. This is an overall win for web UI developers. If your team hasn’t
  already taken a look at CoffeeScript, now might be a good time.
</p>
<p>
  Creating QuickUI controls in CoffeeScript currently requires a plugin, but the
  plan is to fold CoffeeScript support directly into the quickui.js runtime.
  Read the
  <a href="https://quickui.org/docs/CoffeeScript.html"
    >documentation for QuickUI support of CoffeeScript</a
  >
  for more details.
</p>
