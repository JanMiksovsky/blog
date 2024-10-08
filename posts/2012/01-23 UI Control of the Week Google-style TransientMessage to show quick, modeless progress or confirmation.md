---
title: "UI Control of the Week: Google-style TransientMessage to show quick, modeless progress or confirmation"
originalUrl: https://miksovsky.blogs.com/flowstate/2012/01/transientmessage.html
---

<p>
  Sometimes an application has to deliver to the user a brief, non-vital
  message. A number of sites, including Google’s app suite, show such messages
  in a transient popup that presents a small bit of information for a second or
  two, then disappears on its own. Here’s a typical “Loading…” message, which
  appears over the standard Google toolbar:
</p>
<p>&#0160;</p>
<p>
  <img
    alt="Google Docs Loading Indicator"
    src="/images/flowstate/6a00d83451fb6769e20162ffbedcc5970d-pi.png"
  />
</p>
<p>&#0160;</p>
<p>
  An earlier generation of client applications might have shown such information
  in a status bar. One disadvantage of a status bar is that it’s always there,
  which not only takes up room, but can inure a user to its presence; they might
  easily overlook a message that appears there briefly. In contrast, the very
  appearance of Google’s “Loading…” message over the top of the toolbar helps
  draw attention to the message.
</p>
<p>
  The “Loading…” message above obviously disappears when the loading operation
  has completed. In other cases, the message is used to confirm the successful
  completion of an operation. For example, if you use
  <a href="http://www.cozi.com">Cozi</a> to send a shopping list to a family
  member’s mobile phone, a transient message lets you know the list has been
  sent successfully. In these cases, a message typically remains visible for
  about two seconds before fading away, in order to give the user enough time to
  read it. This sort of message UI may be preferable to a traditional modal
  confirmation dialog in cases like these where because the information is not
  vital. If the user happens to look away while the message is visible, they can
  nevertheless assume the operation worked; the message is just providing
  explicit confirmation. The fact that the message fades away on its own avoids
  forcing the user to take a second to dismiss it manually.
</p>
<p><strong>Key attributes</strong></p>
<ul>
  <li>
    The message goes away on its own, either when an operation completes or when
    sufficient time has passed to let the user read the message.
  </li>
  <li>
    It’s not absolutely essential that the user see the message. Hence, the app
    doesn’t require that the user acknowledge the message.
  </li>
  <li>
    The message content is fairly short, perhaps one medium-length sentence at
    most. Since reading speeds vary, the longer the text is, the longer
    variation you’ll have in how long users need to read it. Even if the message
    is not essential, it would nevertheless be disconcerting to a user for the
    message to disappear before they could finish reading it.
  </li>
  <li>
    The message often visually appears docked to the top of the page (as shown
    above) or centered vertically.
  </li>
</ul>
<p><strong>TransientMessage</strong></p>
<p>
  I’ve posted a
  <a href="https://quickui.org/catalog/TransientMessage">TransientMessage</a>
  control to the QuickUI Catalog. As you’ll see on that page, I’m experimenting
  with the impressive, embeddable
  <a href="http://ajaxorg.github.com/ace/">ACE</a> code editor from Ajax.org to
  let you experiment with controls directly within the Catalog documentation. If
  this works out, I’ll look at rolling it out to the rest of the Catalog.
  <em
    >(Known issue: The page with the code editor doesn&#39;t work in IE8
    yet.)</em
  >
</p>
<p>
  As usual, the generic styling of the message can be changed to suit an
  application’s visual aesthetic.
</p>
<p>
  Use a TransientMessage to deliver a short message, e.g., as a modeless
  indicator of a short operation (the loading example above) or as a
  confirmation of an operation that has just completed. If the message text is
  more than a simple sentence, or if it’s critical that the user acknowledge the
  message, consider a standard JavaScript alert or a
  <a href="http://quickui/catalog/Dialog">Dialog</a> instead.
</p>
<p><strong>Implementation notes</strong></p>
<p>
  This control is built on top of the general-purpose
  <a href="https://quickui.org/catalog/Popup">Popup</a> base class, making
  implementation relatively straightforward. One side effect of this
  implementation is that any click the user makes while the message is displayed
  will dismiss the message. In future versions, it might be nice to let the user
  continue to interact with the UI during the short period while the message is
  visible.
</p>
