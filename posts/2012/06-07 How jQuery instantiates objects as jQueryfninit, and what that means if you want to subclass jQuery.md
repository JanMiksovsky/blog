---
title: "How jQuery instantiates objects as jQuery.fn.init, and what that means if you want to subclass jQuery"
originalUrl: http://blog.quickui.org/2012/06/07/jquery-fn-init/
---

<p>
  In order for the
  <a href="http://blog.quickui.org/2012/06/07/quickui-0-9-1-released/"
    >recent release of QuickUI 0.9.1</a
  >
  to support concise creation of control classes in CoffeeScript, it was
  necessary to go deep into the bowels of jQuery’s class constructor to
  determine how it worked. Those findings are documented here in case others
  have a similar need to subclass jQuery, or would like to address the same need
  that drove jQuery to its current implementation.
</p>
<p>
  The jQuery class constructor can be found in
  <a href="https://github.com/jquery/jquery/blob/master/src/core.js">core.js</a
  >:
</p>
<pre>
jQuery = function( selector, context ) {
    // The jQuery object is actually just the init constructor 'enhanced'
    return new jQuery.fn.init( selector, context, rootjQuery );
}</pre
>
<p>
  But the comment doesn't do much to explain why init exists, or how it works.
</p>
<p>
  All jQuery developers are familiar with the form $(“div”), which is a
  shorthand for the longer jQuery(“div”). This, we are told, returns a new
  jQuery object. Actually, from the above constructor, we can see that what it
  <em>really</em> returns is an instance of the jQuery.fn.init class. (From here
  on out, we’ll just refer to that class as “init”.) The init constructor is
  defined like so:
</p>
<pre>
jQuery.fn = jQuery.prototype = {
    init: function( selector, context, rootjQuery ) {
        ...
    }
}</pre
>
<p>
  Here, first note that jQuery.fn is just a synonym for jQuery.prototype. Given
  that, we see that the init class constructor hangs off the jQuery prototype.
  Stashing the init class on the jQuery class’ prototype allows the jQuery
  library to avoid polluting the JavaScript global namespace with an extra
  class. (Of course, init could easily have been defined inside the outer
  jquery.js function closure, which would avoid namespace pollution and prevent
  access to it from outside. The init class isn't really referred to elsewhere
  in the jQuery source, so it's not immediately clear why that wasn't done.
  Perhaps the above approach makes for easier debugging.)
</p>
<p>
  Further on, we see this init class defined as a subclass of the jQuery class:
</p>
<pre>
// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;</pre
>
<p>
  Since jQuery.fn is just an abbreviation for jQuery.prototype, the above line
  is really:
</p>
<pre>jQuery.prototype.init.prototype = jQuery.prototype;</pre>
<p>
  This ensures that any instance of init will also be a functional instance of
  jQuery. This can be confirmed in the debugger:
</p>
<pre>
&gt; $e = $("div")
&gt; $e instanceof jQuery
true
&gt; $e instanceof jQuery.fn.init
true</pre
>
<p>
  So all those times when you create an instance of jQuery you are <em
    >actually </em
  >working with an instance of a jQuery <em>subclass</em>.
</p>
<p>
  Okay, but why bother? One reason is that jQuery wants to support a static
  constructor form: one you can invoke with needing to specify “new”. Regardless
  of whether you invoke the jQuery() constructor with “new” or not, it’s always
  going to return an instance of the init class. And, because init is a subclass
  of jQuery, you’ll end up with an instance of jQuery, which is what you wanted.
</p>
<pre>
// The following lines are all equal.
var $e = new jQuery("div");
var $e = jQuery("div");
var $e = new $("div");
var $e = $("div");</pre
>
<p>
  So at least one reason init exists is that it serves as a helper class to let
  you write shorter jQuery code. The thing is, supporting instantiation without
  "new" doesn't require defining a separate helper class.
</p>
<p>
  The jQuery constructor above is relying upon an oddity in the JavaScript
  language: a constructor can return an object that’s an instance of a class
  other than the class defined by the constructor. The jQuery class could more
  easily use the simpler <a
    href="http://jimmycuadra.com/posts/javascript-factory-constructors"
    >factory constructor</a
  >
  pattern to check to see whether it's been invoked without "new" (in which case
  "this" will be the window) and, if so, just return a new instance of itself.
  That is, in fact, how jQuery worked back in
  <a href="http://code.jquery.com/jquery-1.1.js">jQuery 1.1</a>:
</p>
<pre>
var jQuery = function(a,c) {
    // If the context is global, return a new object
    if ( window == this )
        return new jQuery(a,c);
    ...
};</pre
>
<p>
  By jQuery 1.2, however, the jQuery constructor was using the technique shown
  above. It's hard to tell from the code exactly why the init helper class was
  introduced. One possibility is that init has that extra rootjQuery parameter
  which is for internal use only. Burying that parameter in a helper class
  avoids having to expose the parameter in the jQuery API, where it might
  confuse jQuery developers or, worse, encourage them to create code that
  depends upon that parameter.
</p>
<strong>Subclassing jQuery</strong>
<p>
  One cost of jQuery’s class scheme is that it makes it much harder for
  <em>you</em> to subclass jQuery. One reason you might want to do this is to
  provide scoping for your own jQuery plugins. If you want to add a lot of
  plugins to jQuery’s prototype (which, as indicated above, is what you’re doing
  when you add something to jQuery.fn), you could potentially pollute the jQuery
  namespace and run into conflicts with other plugins. By subclassing jQuery,
  and working strictly with instances of your subclass, you hide all your
  plugins from anyone who’s directly instantiating the plain jQuery class.
</p>
<p>
  Unfortunately, because of this init helper class, the normal JavaScript
  prototype-based subclassing scheme won’t work with jQuery. To make your
  subclass jQuery-like, you end up needing to replicate jQuery’s complex helper
  class arrangement: create a subclass of jQuery <em>and</em> a companion init
  helper class, derive your helper class from your actual jQuery subclass, and
  ensure your subclass’s constructor actually returns an instance of your init
  class.
</p>
<p>
  The mind-breaking pain of all that is presumably what led to the creation of a
  jQuery function called
  <a href="http://api.jquery.com/jQuery.sub/">$.sub()</a>. That function does
  exactly what’s described above: it defines a new subclass of jQuery and a
  companion init helper class.
</p>
<p>
  The $.sub() plugin doesn’t seem to be used much, perhaps because its benefits
  and reason for existence aren’t well-documented. The announced plan is that
  $.sub() will be removed from the core jQuery library in version 1.8, and
  transition to become an official plugin. As a result, $.sub() is deprecated as
  a <em>native </em>jQuery feature, but $.sub() and its technique will continue
  to be useful, so it’s still worth understanding and considering it.
</p>
<p>
  QuickUI relies upon the $.sub() technique to make its base Control a subclass
  of jQuery. This is what lets you use any jQuery feature with QuickUI controls
  directly: you can bind events to them with $.on(), you can style them with
  $.css(), and so on. That’s because your control class derives from Control,
  and so ultimately derives from jQuery.
</p>
<p>
  You can
  <a href="https://quickui.org/tutorial/creating-control-class.html"
    >create a new QuickUI control class in JavaScript</a
  >
  by invoking Control.sub(). And, with QuickUI 0.9.1, you can now create
  subclasses of Control (and, therefore, jQuery )
  <a href="https://quickui.org/docs/CoffeeScript.html"
    >using CoffeeScript’s built-in class syntax</a
  >, which is concise and highly legible. In either language, you can easily
  create your own reusable web user interface components that have direct access
  to all the power of jQuery.
</p>
