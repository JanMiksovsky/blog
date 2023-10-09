---
title: "Placebo controls make implicit actions explicit"
date: 2011-02-07
originalUrl: https://miksovsky.blogs.com/flowstate/2011/02/placebo-controls-make-implicit-actions-explicit.html
---

<p>
  My
  <a
    href="/posts/2011/01-24-once-a-routine-animation-has-made-its-point-speed-it-up.html"
    >last post</a
  >
  referenced the toolbar in Cozi’s
  <a href="http://www.cozi.com/Family-Calendar.htm">family calendar</a> for
  entering appointments in natural language. Interestingly, the toolbar’s little
  “X” button for cancelling appointment entry is something of a placebo
  control—it’s not strictly necessary, but nevertheless improves usability:
</p>
<p>
  <img
    src="/images/flowstate/6a00d83451fb6769e20148c855db61970c-pi.png"
    alt="Cozi Calendar Toolbar Animation 2"
  />
</p>
<p>
  It turns out that the user can implicitly cancel appointment entry and close
  the toolbar by clicking <em>anywhere</em> on the page outside the highlighted
  box. They can also press the ESC key. These mechanisms seem to suffice when
  the text box is empty; the user figures they can click outside the box to
  close it, and discovers that does exactly what they want.
</p>
<p>
  However, once the user enters some appointment text, the stakes for a mistake
  increase. In that state, it’s not at all clear whether clicking outside the
  box will save the appointment or throw it away. By offering a little “X” close
  box, the user can see a clear, explicit means of cancelling the appointment,
  and can be confident that a click on that control will produce the expected
  result.
</p>
<p>
  Here both the implicit and explicit means of closing the toolbar feel
  necessary to me. The implicit means isn’t clear enough when it really matters,
  and the explicit means feels too demanding in the common case where the user
  is just clicking around to explore the product. A casual click inside the
  toolbar produces the state shown above, and a click outside cancels that
  state. So both mechanisms play a useful role.
</p>
