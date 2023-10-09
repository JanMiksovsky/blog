---
title: "UI Control of the Week: Repeater control generates multiple copies of UI elements"
date: 2012-02-27
originalUrl: https://miksovsky.blogs.com/flowstate/2012/02/repeater.html
---

<p>
  User interfaces invariably entail a certain degree of repetition; they’re
  filled with vertical or horizontal sequences of UI elements that behave
  identically are are styled identically. Sometimes the elements in such a
  sequence vary only in their label, and sometimes even that doesn’t vary; the
  controls really are all exactly the same. As an example, if we go back to the
  first post in this series on UI controls, we find that Apple’s
  <a
    href="/posts/2011/10-10-announcing-a-ui-control-catalog-and-this-weeks-control-of-the-week-apple-style-slidingpageswithdots.html"
    >sliding pages with dots</a
  >
  control contains a horizontal sequence of little dot buttons. The variant of
  this control on Apple’s web Store uses blue dots:
</p>
<p>
  <img
    alt="Apple Store Sliding Pages"
    src="/images/flowstate/6a00d83451fb6769e2014e8c1fa9c9970d-pi.png"
  />
</p>
<p>
  Those little dots along the bottom don’t contain any data, and so their DOM
  representation of each is essentially identical. (The blue selected state
  comes from a style applied with a class.) Sequences of completely identical UI
  elements like this are relatively rare in a production UI. During design and
  development, however, it’s pretty common to want to throw a bunch of
  placeholder controls into the UI. Early in the design process, a prototype’s
  toolbar might have buttons labeled, “Button 1”, “Button 2”, “Button 3”, and so
  on, until the team can work out exactly what commands they want to offer users
  there.
</p>
<p>
  But, despite the repetition, creating a collection of buttons like that is
  generally a manual process: the designer or developer must manually create a
  set of buttons, and carefully give them each a unique, placeholder name.
  Alternatively, one writes a bit of throwaway script to generate a given number
  of controls, although that can take a few minutes to work up.
</p>
<p>
  The
  <a
    href="/posts/2012/02-13-ui-controls-of-the-week-quickly-fill-up-a-ui-mockup-with-photos-placeholder-text-and-ads.html"
    >recent post on placeholder controls</a
  >
  pointed out that it can be worthwhile to have a UI control even if it’s only
  used during the design process; anything that saves time helps. Here, I think
  it’s interesting to have a control specifically for the task of generating
  repetitions in a UI. As with the
  <a
    href="/posts/2011/11-28-ui-control-of-the-week-basic-listbox-and-how-keyboard-navigation-is-never-as-simple-as-you-think.html"
    >previously-discussed</a
  >
  <a href="https://quickui.org/catalog/ListBox/">ListBox</a>, this is
  effectively a higher-order meta-control: a control that creates or manipulates
  other controls. This can be useful for mocking things up during design. And,
  per the Apple example above, it might even be useful in production UI.
</p>
<p><strong>Repeater</strong></p>
<p>
  The QuickUI Catalog contains a
  <a href="https://quickui.org/catalog/Repeater/" target="_self">Repeater</a>
  control. Given a control class and a number, it will create that many
  instances of that class. If you create a Repeater and give it a dot button
  class and a count of 5, you’ll get:
</p>
<p>&#0160;</p>
<p>
  <img
    alt="Repeater Dots 5"
    src="/images/flowstate/6a00d83451fb6769e201676283ee12970b-pi.png"
  />
</p>
<p>&#0160;</p>
<p>
  With that in hand, you can easily bump the count up or down to get whatever
  number you need. If you want to see what things look like with 20 copies of
  the dot control, instead of doing a cut-and-paste of your UI code, you can
  just change the desired count to 20:
</p>
<p>&#0160;</p>
<p>
  <img
    alt="Repeater Dots 20"
    src="/images/flowstate/6a00d83451fb6769e20163018ec55c970d-pi.png"
  />
</p>
<p>&#0160;</p>
<p>
  If you give the Repeater some content, each generated copy of the control will
  end up with that content. Here a Repeater has been told to create 5 instances
  of a simple button class and set their content to the text, “Button”:
</p>
<p>&#0160;</p>
<p>
  <img
    alt="Repeater Buttons 5"
    src="/images/flowstate/6a00d83451fb6769e201676283ee25970b-pi.png"
  />
</p>
<p>&#0160;</p>
<p>
  For a bit of variety, you can also ask the Repeater to append an incrementing
  integer to the content:
</p>
<p>&#0160;</p>
<p>
  <img
    alt="Repeater Buttons 5 with Increment"
    src="/images/flowstate/6a00d83451fb6769e20163018ec568970d-pi.png"
  />
</p>
<p>&#0160;</p>
<p>
  This is another one of those controls that, now that I have it, I end up using
  quite a bit. When poking around with a layout idea, it’s great to be able to
  fill up the UI quickly with a sequence of elements.
</p>
<p><strong>Implementation notes</strong></p>
<p>
  It’s easy enough to create a one-off bit of JavaScript that creates an
  arbitrary number of controls, but why rewrite that code every time you need
  it? By investing just a bit of time in creating a reusable component, even
  that simple bit of code has already been written for you.
</p>
<p>
  The implementation of Repeater has become simpler over time as the QuickUI
  framework has gotten better at supporting the creation of meta-controls. These
  controls generally have one or more properties that accept a control class as
  a value. Creating such a property is easily done in a single line using a
  <a href="https://quickui.org/docs/control-class-methods.html#property-class"
    >Control.property()</a
  >
  declaration. A recent update to the QuickUI runtime makes it also possible to
  pass in arbitrary UI in
  <a href="https://quickui.org/docs/control-JSON.html">Control JSON</a> format,
  so you can use the Repeater control to generate <em>n</em> copies of some
  brand-new UI fragment containing a mixture of other controls.
</p>
<p>
  As suggested above, a Repeater is incorporated into the implementation of the
  Catalog’s
  <a href="https://quickui.org/catalog/SlidingPagesWithDots/"
    >SlidingPagesWithDots</a
  >
  and
  <a href="https://quickui.org/catalog/RotatingPagesWithDots/"
    >RotatingPagesWithDots</a
  >
  (which adds automatic rotation) controls. Once the number of children (pages)
  is known, the control can simply pass that number to the Repeater’s count()
  property to generate the required number of dot buttons.
</p>
