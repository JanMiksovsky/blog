---
title: "Insert key safely disarmed in Microsoft Word 2007"
originalUrl: https://miksovsky.blogs.com/flowstate/2006/07/insert_key_safe.html
---

<p>
  The Office 2007 user interface overhaul has generated justified hoopla that
  has also overshadowed some minor but welcome improvements. Case in point:
  Microsoft Word 2007 has finally neutralized the Insert key, preventing the
  accidental triggering of an utterly bewildering Overtype mode.
</p>
<p>
  I’ve been using
  <a href="http://www.microsoft.com/office/preview/default.mspx"
    >Office 2007 Beta 2</a
  >
  for production work for about a month now, with generally positive results. I
  use Word intensively, and it’s taken just a bit of time to get used to where
  all my favorite features ended up, but overall I’m fine with it. In Excel
  2007, the new UI has lead me to discover some useful features that have
  probably been there for years. Excel charting, in particular, is no longer
  awful. On the down side, while Outlook 2007 adds full-text searching, it
  continues to perpetrate its abysmally poor IMAP support on the world. They’ve
  left intact an
  <a href="/posts/2005/07-29-situation-normal-all-fouled-up.html"
    >incredibly irritating dialog</a
  >
  that could easily be removed in ten minutes by anyone on the Outlook team if
  they didn’t live in a warm bubble of intensive Exchange-focused IT support.
  For shame.
</p>
<p>
  In contrast, the Word 2007 team appears to have taken a moment from a
  completely massive redesign to fix the Insert key.
</p>
<p>
  Don’t know about the Insert key in Word? Open a document in Word 2003 or
  earlier, press Insert, then try typing somewhere in the middle of your
  document. You’ve just discovered Overtype mode. In Overtype mode, each
  character you type replaces the existing character at the insertion point,
  instead of pushing that character to the right. Uninitiated users have other
  names for this mode, such as Word Is Eating My Important Document And I Can’t
  Get It To Stop mode.
</p>
<p>
  Overtype mode has to be one of the longest-lived terrible design flaws in a
  continuously upgraded shipping product:
</p>

<ol>
  <li>
    A user can easily engage Overtype mode without realizing it. Depending on
    the keyboard used, all that's required is a slip of the finger from, say,
    the commonly pressed Delete key. The user has to press modifier keys like
    CTRL and ALT to do unusual things like, say, pick a font or print a
    document, but if it’s the destructive Overtype mode they want, then by
    golly, no modifier key should stand in their way!
  </li>

  <li>
    If a user accidentally ends up in Overtype mode, they can easily destroy
    data for a good long time if they’re not looking very closely at the screen.
    If the user happens to have left the status bar visible, Word meekly shows
    the letters “OVR” in a distant edge of the screen—far from where the
    disaster is taking place.
  </li>

  <li>
    By the time the user realizes that something is going wrong, a considerable
    length of time may have passed since they accidentally hit the Insert key.
    This reduces the chance that the user will connect the terrifying
    circumstances they are now facing with an accidental keypress they made a
    while back.
  </li>

  <li>
    Even once the user realizes that something very, very bad is happening, it’s
    still hard to pin down exactly what is happening. Stuff is disappearing from
    the screen, but because the Overtype behavior completely flies in the face
    of the user’s carefully learned model of word processor behavior, it’s hard
    to recognize that each new character is overwriting an existing character.
  </li>

  <li>
    Once an astute user has figured out that they’re in some sort of word
    processor mode from hell, there’s no obvious way to get out of the mode
    short of quitting the application and restarting. They're return to editing
    their document with shaken confidence in Word, in Microsoft products, and in
    software in general.
  </li>
</ol>

<p>
  I’ve yet to meet a user who understands—or more to the point, wants—Overtype
  mode, but it’s there anyway. In the eighteen years I’ve been using Word, I
  haven’t had a single occasion where I felt this mode could save me keystrokes.
</p>
<p>
  With a user base the size of Microsoft’s, it's virtually guaranteed that a
  large corporate customer has a vocal department that swears they need Overtype
  mode, so dropping the mode was probably out of the question. Instead, they've
  left Overtype mode in, but arranged the default keyboard settings so that the
  Insert key doesn't engage the mode. It's always been possible in Word for an
  advanced user to unmap the Insert key from Overtype mode. Word 2007 simply
  does this by default, then adds an explicit option to turn the old keyboard
  mapping back on:
</p>
<p>
  <img
    src="/images/flowstate/microsoft_word_2007_insert_key_option.png"
    alt="Microsoft_word_2007_insert_key_option"
  />
</p>
<p>
  I conjecture that Overtype mode is a user interface fossil: a piece of
  behavior leftover from a long bygone era whose entire ecosystem has been so
  utterly changed that the very rationale for the UI is hard to reconstruct. I
  have a dim memory of IBM character mode terminals that let a user could freely
  navigate a cursor with directional arrow keys across data entry forms. These
  forms to some extent mirrored the behavior of paper forms, letting a user
  “fill in the blanks” on the screen. Entering text into a field with existing
  text would overwrite the old text with the new. By some twist of fate, some
  author of a character mode word processor was compelled—perhaps under duress,
  we may never know—to include support for this behavior. An age passed, and
  support for this behavior became a requirement for backward
  compatibility—leading directly to its carefully preserved (but neutralized)
  existence years later in Microsoft’s latest word processor.
</p>
<p>
  You can read more about the substantial UI changes in Office 2007 in Jensen
  Harris'
  <a href="http://blogs.msdn.com/jensenh/">Office User Interface Blog</a>.
</p>
