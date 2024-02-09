---
title: "A UI sketch whose controls perfectly fill the window is probably too good to be true"
originalUrl: https://miksovsky.blogs.com/flowstate/2005/07/if_a_ui_sketch_.html
---

<p>
  If you're ever shown a UI design for a new top-level application window, be
  sure to notice whether the controls on the window happen to perfectly fill up
  on the available space. This is often a sign of trouble.
</p>
<p>
  Many application windows are resizable. (If a top-level modeless window isn't
  resizable, it's a reasonable question to ask: why not?) A common mistake when
  designing resizable windows is to focus too much on some perfect window size
  that happens to show off the window's controls to best advantage -- a window
  size that few people other than the designer is ever likely to see. It's
  important to question how the window is going to respond when the user resizes
  it. For example, many users commonly maximize the application window they're
  working in. A surprising number of applications actually look awful when
  they're maximized on a typical large display: the additional space the
  designer didn't design for is either wasted or allocated to some control
  (often a text box or list box) that didn't really need it.
</p>
<cd:preserve whitespace="CL"></cd:preserve>
