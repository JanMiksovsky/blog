---
title: "Control of the Week: Facebook-style AutoSizeTextBox"
originalUrl: https://miksovsky.blogs.com/flowstate/2011/10/autosizetextbox.html
---

<p>
  It’s nice to have multi-line text boxes resize to fit their contents. The
  native HTML &lt;textarea&gt; tag, which creates a multi-line text box, gives
  the text box a fixed height. (Chrome and Firefox will let you manually resize
  a textarea, which helps, but the resizing isn’t done for you.) A fixed height
  text box never feels like it’s the right height: if you don’t have any text to
  enter, a tall box is too big, and if want to actually enter a block of text,
  you always find yourself wishing the box were bigger.
</p>
<p>
  Auto-sizing feels like a missing feature of web forms. Many forms need to let
  the user type in lines of text into a text box, and since the size of that
  text can vary, it seems to make sense to start out with a small text box, then
  grow the text box when necessary. HTML has had form support since at least
  HTML 2.0, so it’s surprising this feature is still not standard. For
  comparison, Microsoft Word’s form support has had auto-sizing text boxes for
  years.
</p>
<p>
  I think the first solid implementation of a web auto-sizing text box was on
  Facebook, which offers you such a text box to enter a status update:
</p>
<p>&#0160;</p>
<p>
  <img
    src="/images/flowstate/6a00d83451fb6769e201543619f653970c-pi.png"
    alt="Facebook Status Box"
  />
</p>
<p>&#0160;</p>
<p>
  Facebook&#39;s design varies from week to week (and user to user), but at the
  time I took the image above, the text box started out tall enough to contain
  three lines of text. As the user types more, the text box grows in size:
</p>
<p>&#0160;</p>
<p>
  <img
    src="/images/flowstate/6a00d83451fb6769e201543619f65d970c-pi.png"
    alt="Facebook Status Box (with more text)"
  />
</p>
<p>&#0160;</p>
<p><strong>Key aspects</strong></p>
<ul>
  <li>
    The text box has a minimum height. This can be sufficient for a single line
    of text or (as on Facebook) can be bigger.
  </li>
  <li>
    As the user types, the text box grows. In a normal layout, the text box’s
    increased size will push down any elements below the text box.
  </li>
  <li>
    The height of the text box is sufficient to contain the current text, plus
    an additional blank line. This latter aspect is helpful to let the user know
    that there’s still more room to type — i.e., that they don’t need to stop
    yet.
  </li>
  <li>
    The text box may also have a maximum height. Note that this is different
    than the text box’s maximum <em>length</em>, which establishes how many
    characters can be entered.
  </li>
</ul>
<p><strong>Usage</strong></p>
<p>
  See&#0160;<a
    href="https://quickui.org/catalog/default.html#page=AutoSizeTextBoxAbout"
    >AutoSizeTextBox</a
  >&#0160;in the QuickUI Catalog for a working, reusable implementation.
</p>
<p>
  The default height of an AutoSizeTextBox is set to accommodate two lines of
  text. This suggests to the user that they’ll have ample room to type. As they
  begin to type on the second line, a third will automatically be created for
  them. As a result, they’ll never feel like they’re running out of room. In
  tight spaces, this minimum height can be overridden to produce an
  AutoSizeTextBox that’s only one line tall when empty.
</p>
<p><strong>Implementation notes</strong></p>
<p>
  I’m not aware of a pure CSS solution to this problem; the variety of ways to
  implement an auto-sizing text box all require some degree of JavaScript. A
  while back I posted a
  <a
    href="http://stackoverflow.com/questions/7477/autosizing-textarea/2032642#2032642"
    >solution on StackOverflow</a
  >
  that, at its core, leaves most of the layout calculations to the browser. In
  this approach, the textarea and a hidden element are both placed inside a
  containing div. I&#39;d originally used a div for the hidden element, but
  realized that using a &lt;pre&gt; (preformatted) element would automatically
  preserve line breaks and white space.
</p>
<p>
  The hidden pre is set to use visibility: hidden, which tells the browser to
  layout the control as normal, but leave the pre invisible.&#0160;When the user
  types in the textarea, a small bit of JavaScript simply copies the contents of
  the textarea into the hidden pre element. As the pre gets bigger, it forces
  the containing div to become bigger, which in turn makes the textarea grow.
  The textarea ends up as big as the hidden copy of the text (plus an extra
  line), which gives us the effect we want.
</p>
<p>
  The most finicky bit of the implementation deals with letting the control work
  with different font sizes. During initialization, the font of the overall
  control is copied over to the textarea and hidden pre so that the text metrics
  of the two elements will be the same. This operation has to wait until the
  control is actually in the DOM so that any relevant styles will have been
  applied.
</p>
<p>
  Moreover, the initialization logic needs to know the line height of the text
  in the textarea. Unfortunately, if line-height has not been explicitly set,
  WebKit and IE report the line-height as “normal”, instead of giving us an
  actual measurement we can use. So the control calculates an approximate
  line-height by applying a constant factor to font-size. This approximation
  means that the text box height can be off by a pixel or so in WebKit and IE.
</p>
