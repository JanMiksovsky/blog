---
title: "Leaving dependent controls enabled"
originalUrl: https://miksovsky.blogs.com/flowstate/2005/07/leaving_depende.html
---

<p>
  In certain types of UI such as wizards and forms, it's common to see UI like
  this:
</p>
<p>
  <img
    src="/images/flowstate/dependent_control_1.png"
    alt="Dependent_control_1"
  />

  <br />
</p>
<p>
  Here the text box is said to be a &quot;dependent control&quot;, because its
  enabled state depends upon the current selected state of the radio buttons.
</p>
<p>
  In situations like the one above, I personally prefer a design that leaves the
  text box enabled at all times. Instead of using the state of the radio buttons
  to drive the state of the text box, the design goes the other way: the state
  of the text box drives the state of the radio buttons.
</p>
<p>
  <img
    alt="Dependent_control_revised"
    src="/images/flowstate/dependent_control_revised.png"
  />
</p>
<p></p>

<ul>
  <li>The text box is always enabled but is empty by default.</li>

  <li>
    If the user clicks in the text box and enters any text, the second radio
    button becomes selected to let the user know that they have now implicitly
    chosen the second option.
  </li>

  <li>
    Clearing the text box implicitly selects the first radio button (but leaves
    the focus in the text box so the user can enter something new).
  </li>

  <li>
    If the user types something in the text box and then changes their mind to
    explictly select the first radio button, the (non-empty) contents of the
    text box are left as is. If the user goes back and changes the contents of
    the text box, the second radio button is again implicitly selected (as long
    as the text box is non-empty).
  </li>
</ul>

<p>
  This lets the user who wants to enter something in the text box do so
  directly, without having to first select the second radio button. In my
  experience, this technique makes the UI feel faster, avoids frustration
  (&quot;Why can't I type in the box?&quot;), and doesn't suffer any practical
  downside.
</p>
<p></p>
