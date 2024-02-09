---
title: "Puzzle: Define HTML custom element subclasses that can fill in base class insertion points"
originalUrl: http://blog.quickui.org/2013/06/11/puzzle-define-html-custom-element-subclasses-that-can-fill-in-base-class-insertion-points/
---

<p>
  This post presents a little web component architectural puzzle which I've come
  across in the early stages of creating <a
    href="http://janmiksovsky.github.io/quetzal"
    >Quetzal</a
  >. The puzzle deals with how Quetzal should best deliver an important
  component service on an HTML custom element substrate, and relates
  specifically to subclassing semantics. Any suggestions or comments would be
  much appreciated.
</p>
<h1>Background on the puzzle</h1>
<p>
  Quetzal is an attempt to deliver key features of the QuickUI component model
  in HTML custom elements. One such feature is that an element subclass should
  be able to easily populate a slot (insertion points, in HTML parlance) defined
  by a base class. In practice, there are many situations in which you want to
  be able to say, "This new UI component should be just like that existing UI
  component, only with some stuff pre-filled in." For example:
</p>
<ul>
  <li>
    The QuickUI documentation presents a
    <a href="https://quickui.org/docs/rendering.html"
      >simple page template example</a
    > in which classes in a small page template hierarchy fill in specific bits
    of their parents classes.
  </li>
  <li>
    A <a href="https://quickui.org/catalog/DateComboBox">DateComboBox</a> fills
    in the popup portion of a
    <a href="https://quickui.org/catalog/ComboBox">ComboBox</a>, which in turn
    is filling the content portion of a
    <a href="https://quickui.org/catalog/PopupSource">PopupSource</a>. This same
    facility is also used throughout the QuickUI Catalog. Moreover, it is used
    in many QuickUI apps in which a stock Catalog component is specialized for
    the app's context.
  </li>
  <li>
    Along those same lines, this same issue should crop up in any organization
    that tries to create a library of standard components which implement the
    organization's visual design language. Suppose your site's designer has
    created a cool button class as an HTML custom element, and you have used
    that to create an Add to Cart button. You write some script so the button
    can show <em>inside the button</em> the existing number of items in a
    customer's online shopping cart (to the right of the button label, say). You
    now want to package up the Add to Cart button so that it can be used as a
    component in its own right. For flexibility, you want the button's text
    label to vary in places.
  </li>
</ul>
<p>
  Well-defined subclassing semantics are essential for creating a UI component
  library with a good separation of concerns. If you look at the class hierarchy
  depicted for DateComboBox (above), you'll get a sense of the degree to which
  it's possible to portion out specific roles to a small constellation of
  classes, such that each class can focus on just doing one thing really well.
  I'm hoping that it is possible to take advantage of such subclassing semantics
  in HTML custom elements — but it's not proving to be particularly easy.
</p>
<h1>The puzzle</h1>
<p>
  The puzzle is to come up with an architecture for custom element subclasses
  that meets the following design criteria:
</p>
<ol>
  <li>
    An instance of a subclass is a proper instance of its base class. All the
    normal JavaScript stuff should work: property/method access should go up the
    prototype chain, and a subclass instance should report that it is
    an "instanceof" the base class. By default, the HTML &lt;element&gt; syntax
    permits an "extends" attribute to identify a base class, but a purely
    script-based solution that sets up the class hierarchy correctly is equally
    valid.
  </li>
  <li>
    A subclass can put stuff into an insertion point defined by the base class.
    That is, the subclass can fill in a slot (or slots) defined by a base class.
    In turn, the subclass should be able to redefine such an insertion point so
    that the subclass itself can be subclassed.
  </li>
  <li>
    Unless overridden, all base class behavior should function properly in an
    instance of the subclass. E.g., if the base class wires up an event handler,
    then this works as expected for subclass instances too.
  </li>
  <li>
    Base class properties/methods can be overridden by the subclass. A subclass'
    property/method implementation should be able to invoke the base class'
    implementation by whatever language means are necessary. (CoffeeScript
    provides sugar for this; plain JavaScript developers have alternate ways of
    achieving the same result.)
  </li>
  <li>
    The base class can be any HTML custom element class; the base class author
    shouldn't<em> </em>have to do special work <em>a priori</em> to enable this
    kind of subclassing. This ensures a Quetzal author can always use someone
    else's element class as a base class — even if that other person has never
    heard of Quetzal.
  </li>
</ol>
<p>
  A successful solution needs to meet all five of these criteria. So far, the
  approaches I've tried can satisfy at most four at a time.
</p>
<h1>Example</h1>
<p>
  Let's walk through a example from the small set of custom elements currently
  shown on the <a href="http://janmiksovsky.github.io/quetzal"
    >Quetzal home page</a
  >. This set includes a base element class called quetzal-button that shows its
  content inside a button, and another element class called icon-button which
  adds an icon to the plain-button content. For clarity, here let's just call
  that base class plain-button instead of quetzal-button, since the following
  source won't actually involve Quetzal. In any event, we want markup like this:
</p>
<pre>
&lt;plain-button&gt;Plain button&lt;/plain-button&gt;
&lt;icon-button icon="document.png"&gt;Icon button&lt;/icon-button&gt;</pre
>
<p>… to produce something like this:</p>
<img alt="Buttons" src="/images/quickui/buttons.png" />

<p>
  Where icon-button is reusing all the styling and behavior from plain-button;
  it's <em>not</em> duplicating the styling and behavior. The challenge is to
  create the icon-button element so it both inherits (in the class sense) from
  plain-button <em>and</em> extends the visual representation of plain-button.
</p>
<h1>A partial solution to filling in base class insertion points</h1>
<p>
  The first challenge is: how can icon-button add elements to the content shown
  by plain-button? Some approaches:
</p>
<ol>
  <li>
    We could try to apply the template for <em>both</em> plain-button and
    icon-button to the same host element. The Shadow DOM spec supports <a
      href="https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#multiple-shadow-trees"
      >multiple shadow trees attached to the same host</a
    >. This feature alone is insufficient for the above example. Unless one
    shadow tree takes care to incorporate the other somehow, the most
    recently-added shadow subtree wins. If plain-button renders last, we get a
    button but no icon; if icon-button renders last, we get an icon but no
    button.
  </li>
  <li>
    We can include a &lt;shadow&gt; element in the template for icon-button, and
    ensure plain-button renders its shadow subtree first. The &lt;shadow&gt;
    element allows icon-button to effectively include the representation for
    plain-button. Unfortunately, this inclusion effectively <em>wraps</em> the
    base representation, rather than filling it in. An icon-button does get a
    button and an icon, but the icon and content render <em>outside</em> an
    empty button: <img alt="shadow" src="/images/quickui/shadow.png" />
  </li>
  <li>
    We can have icon-button create an instance of its own base class, then have
    that instance contain the icon and the icon-button's own content. (This
    approach is based on a suggestion from Shadow DOM spec author Dimitri
    Glazkov.)
  </li>
</ol>
<p>
  Approach #3 does what we want from a strictly visual perspective. (Behavior is
  a separate matter.) The source for a Polymer element version of this approach
  looks something like:
</p>
<pre>
&lt;element name="plain-button" extends="button"&gt;
    &lt;template&gt;
        &lt;button&gt;
            &lt;content&gt;&lt;/content&gt;
        &lt;/button&gt;
    &lt;/template&gt;
    …
&lt;/element&gt;

&lt;element name="icon-button" extends="plain-button" attributes="icon"&gt;
    &lt;template&gt;
        &lt;plain-button&gt;
            &lt;img src="{{icon}}"&gt;
            &lt;content&gt;&lt;/content&gt;
        &lt;/plain-button&gt;
    &lt;/template&gt;
    …
&lt;/element&gt;</pre
>
<p>
  See a <a href="http://jsbin.com/unutay/1/edit">live example of this</a>. It
  should work in most browsers, but use Chrome if you want to see it working
  with real Shadow DOM. (Note: a <a
    href="https://code.google.com/p/chromium/issues/detail?id=244869"
    >Chrome bug</a
  > prevents the buttons from responding correctly to mouse interactions. The
  buttons do receive mouse events, but for now it just doesn't look that way.)
</p>
<p>
  If you open the example and inspect it in Chrome dev tools, you'll see that an
  icon-button has a shadow subtree containing a plain-button; the plain-button
  contains its own shadow subtree. Content of an &lt;icon-button&gt; element is
  therefore distributed <em>twice</em>: once into the &lt;plain-button&gt;
  element, and then again into the native &lt;button&gt; element. The ability of
  Shadow DOM to distribute nodes multiple times is called
  <a href="http://www.w3.org/TR/shadow-dom/#reprojection">reprojection</a>. (Or,
  at least, it meets the definition of reprojection as I understand it: "when an
  insertion point is a child node of another shadow host".)
</p>
<h1><strong>Inheritance versus containment</strong></h1>
<p>
  Unfortunately, while this approach looks right, it doesn't behave quite right.
  An icon-button here is not only an instance of plain-button, it also
  contains a plain-button. That's problematic.
</p>
<ol>
  <li>
    When icon-button instantiates its inner plain-button, the inner button has
    no way to know its relationship to icon-button. Among other things, this
    means icon-button can't easily override behavior defined by plain-button
    (one of the design criteria above). In the JS Bin example, you can turn on
    the Console pane to see debug output. The plain-button element class defines
    a readyCallback (in Polymer, "ready") that invokes a base class method
    called log(). The icon-button class overrides that log() method, but because
    the inner plain-button is just that — a plain-button — its readyCallback
    will invoke the base plain-button implementation of log() instead of
    icon-button's specialized log() implementation. Running the demo invokes
    log() four times, when: 1) creating an instance of plain-button to use as
    the prototype for icon-button, 2) creating the visible plain-button with
    text "Plain button", 3) creating the inner plain-button used by the visible
    icon-button, and 4) creating the visible icon-button with text "Icon
    button". It's #3 and #4 together that are the problem: what we really wanted
    to do is invoke icon-button's log() implementation once.
  </li>
  <li>
    Automatic element references (a la Polymer, and also in Quetzal) aren't
    inherited by default. If plain-button defines an element with id #foo, then
    plain-button methods can access that element via the automatic reference
    this.$.foo. Similarly, we want an icon-button to have access to the same
    reference this.$.foo defined by the base class. (Or, at least, we can debate
    whether such automatic references should be treated as "private" or
    "protected", but it seems to me that "protected" would be useful.) It's
    possible to work around this particular issue for a known set of frameworks
    — that is, Quetzal could workaround this problem for its own classes, and
    perhaps for those defined by Polymer — but it wouldn't work in the general
    case of an unknown framework.
  </li>
  <li>
    It's easy to end up in situations where both icon-button and plain-button
    are duplicating work. Suppose an icon-button method invokes a super-method
    of the same name defined by plain-button, and suppose the base
    implementation of that method performs expensive work or obtains a reference
    to some resource. When the inner plain-button is instantiated, it might do
    that work — and then the same work or allocation might be repeated by the
    outer icon-button when it invokes the super-method. Conventions could be
    established to avoid this, but it would complicate otherwise simple
    situations, and again make it hard to use subclass elements from other
    frameworks.
  </li>
  <li>
    As a common case of the above point, if the inner plain-button wires up an
    event handler, then it's easy to end up in situations where the event is
    bound by both the inner plain-button and the outer icon-button. If the event
    bubbles up from something inside plain-button (a click on the button, say),
    you would end up handling the same event twice.
  </li>
</ol>
<p>
  We could try to simplify things by just <em>containing</em> an plain-button,
  and not deriving from it. This forces us to give up one of the original design
  criteria outlined above: an instance of icon-button wouldn't actually appear
  to be an "instanceof" plain-button. Moreover, if plain-button defined some
  attributes ("disabled", say), icon-button would have to explicitly handle
  those too and forward their implementation to the inner plain-button.
</p>
<p>
  We could have icon-button create a placeholder element (a &lt;div&gt;, say),
  create a shadow root for it, and populate that root with a copy of
  plain-button's template but
  <em>without</em> actually instantiating that inner element as a real, live
  plain-button. This is the approach that Quetzal currently uses. It solves a
  number of problems, but is dependent on knowing how a given base element class
  works. Quetzal reaches into the base class' implementation to obtain its
  template and then clones it, which might not be possible with other
  frameworks. This violates one of the design criteria above.
</p>
<p>
  We could create a temporary instance of plain-button elsewhere, then clone
  just its contents into the icon-button instance. This avoids requiring
  detailed knowledge of what the base class is doing. But it could also result
  in subtle problems. E.g., the base class might not be expecting to have to
  serialize all its state into its shadow subtree, in which case the cloned
  content might not represent a coherent instance of the base class.
</p>

<h1>Looking for suggestions</h1>
<p>
  This post is effectively a form of <a
    href="http://en.wikipedia.org/wiki/Rubber_duck_debugging"
    >rubber duck debugging</a
  >. The simple act of writing this up has forced me to better understand the
  problem, and led to consideration of alternate lines of attack. The puzzle
  remains unsolved, however. Given my understanding of custom elements, and the
  design criteria for the puzzle above, I'm not sure whether a solution exists.
</p>
<p>
  It's theoretically possible I've hit some limit in the expressiveness
  permitted to custom elements in their current state. Perhaps that limitation
  could be addressed. If not, I'd  have to write off a big chunk of the
  solutions used by the QuickUI Catalog and QuickUI apps, and find alternate
  ways of meeting the same needs.
</p>
<p>
  I'm hoping, however, that I'm just missing something. If you have some passing
  familiarity with HTML custom elements and Shadow DOM, and have ideas about how
  to approach this problem within the existing technology, I'd love to hear
  them!
</p>
