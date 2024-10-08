---
title: "Make every piece of text count"
originalUrl: https://miksovsky.blogs.com/flowstate/2005/08/make_every_piec.html
---

<p>
  Avoid the trap of letting a design template make you write redundant text.
  Consider the instructions in this wizard page from Windows XP:
</p>
<p>
  <img src="/images/flowstate/order_prints_online_2.png" />
</p>
<p>
  Wow! Depending on how you count, this page tells the user the same thing at
  least twice, maybe even three or four times. (If you just had the label
  &quot;Companies&quot; above a list box, the user could probably guess that
  they were supposed to select a company from the list.)
</p>
<p>
  Why does a UI end up with so much redundant text? Part of the problem can lie
  with the template used to create the UI. The Windows wizard template used for
  the above dialog includes the ability to easily add a subheading below the
  main heading. The person writing text for the page ends up feeling compelled
  to fill this out, even if the subheading adds no information of value to the
  user. (The user could probably assume that the photo companies print
  high-quality photos -- although that didn't stop Shutterfly from adding its
  <em>own</em> redundant text on that point.)
</p>
<p>
  One problem with this template is that it puts the headings on a separate
  visual surface than the main page content (the list box). Suppose we decided
  to drop all the unnecessary text and stick with a single instruction. The
  template forces a result like this:
</p>
<p>
  <img src="/images/flowstate/order_prints_online_take_2_1.png" />
</p>
<p>
  The top of the dialog now feels somewhat unbalanced. Worse, the instruction
  feels separated from the list box that the instructions refer to. Looking at
  this, you might see why someone felt compelled to add a subheading for
  balance, and then some more text to the main content area where it could sit
  directly next to the list box.
</p>
<p>
  Fixing this requires jettisoning the template altogether. If we put the
  instruction on the same visual surface as the list box (and lose the rather
  unhelpful icon in the upper right), we end up with:
</p>
<p>
  <img src="/images/flowstate/order_prints_online_take_3_1.png" />
</p>
<p>
  There's more visual design work that could be done here, but this is a big
  step in the right direction.
</p>
<p>
  We see so much redundant text in UIs that we can become inured to the clutter.
  Pare back your text to what is essential. If you find yourself writing text
  that adds no value, step back and consider whether your template is part of
  the problem.
</p>
