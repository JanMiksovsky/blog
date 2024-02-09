---
title: "Situation normal, all fouled up"
originalUrl: https://miksovsky.blogs.com/flowstate/2005/07/outlooks_terrib.html
---

<p>
  Sometimes an application treats a situation as an error when the situation is,
  in fact, completely normal.
</p>
<p>
  For a good example of a poor user experience, consider Microsoft Outlook’s
  support for the IMAP mail protocol. The vast majority of consumers use the POP
  protocol to get email at home, which generally forces them to keep all their
  mail on one machine at home. IMAP, in contrast, lets you keep all your email
  on the server, where you can get to it from work, home and on the road. Most
  email clients -- including those found on cell phones -- support IMAP. Upon
  hearing of these wonders, most people will ask why IMAP isn't used more often.
</p>
<p>
  While large portions of Microsoft Outlook are very well designed, there’s no
  escaping the fact that the Office team cares first and foremost about the
  enterprise market. Large enterprises have more money than you do. They use
  Exchange, and Outlook's support for Exchange is fantastic.
</p>
<p>
  People who use Outlook outside of an enterprise struggle along with support
  for POP mail that hasn't improved appreciably in years. While POP isn’t great,
  at least Outlook's POP driver is reasonably solid. Outlook's IMAP driver, on
  the other hand, appears to have been left for dead in the jungle, where it was
  raised by apes.
</p>
<p>
  Among its many deficiencies, the driver can’t properly cope if you use two
  different machines (say, at home and at the office) to check your email. This
  scenario is one of the reasons for IMAP’s existence, and most IMAP clients
  handle this situation gracefully: if they see another client is checking the
  mailbox, they wait for a while then try again. If you try to use Outlook this
  way, however, the IMAP driver throws up the following error:
</p>
<blockquote>
  <p>
    Your IMAP server has closed the connection. This may occur if you have left
    the connection idle for too long.
  </p>
</blockquote>
<p>
  Not only is this message a poor indication of what's actually going on,
  Outlook displays this message <em>every few minutes</em> until you shut down
  one of the two Outlook clients trying to reach the mailbox. Outlook even
  displays this dialog even if Outlook is already displaying
  <em>another instance of the same dialog</em>. This is insane. I can come home
  from a day of work and see, literally, a hundred of such errors sitting on the
  screen.
</p>
<p>
  Somewhere, deep down in the IMAP driver, there's probably a core function that
  checks for new mail. It's a sure bet that if this function is unable to check
  for new mail -- if, say, another email client is already checking the same
  mailbox -- this function returns an error. The function does this not because
  there’s anything really wrong, but because the function doesn’t have any other
  way of communicating what’s going on. The developer who wrote the calling
  function assumed that any error result is a real error, so they wrote the
  calling function to punt things off to a general purpose error handler that
  displays a generic error message. The limited forms of expression in code have
  completely warped the top-level user experience.
</p>
<p>
  That explains why the error dialog got into the product, but why did it stay?
  Clearly the simplest reason is that none of Outlook’s developers use the
  product’s IMAP driver themselves. The above error is exactly the kind of thing
  a developer will kill in five minutes if it's in the way of them doing their
  own work. It's reasonable to assume that the reason no Outlook developers use
  IMAP is because they rely primarily on Microsoft-supplied Exchange accounts
  for email at work. The rest of the world suffers at home because of this.
</p>
<p>
  I use so many of Outlook’s PIM features that I could never go back to a pure
  email client, but if all you need is mail, I’d encourage you to try
  <a href="http://www.mozilla.org/products/thunderbird/">Mozilla Thunderbird</a
  >, which has excellent IMAP support.
</p>
