---
title: "The fractal nature of UI design problems"
originalUrl: https://miksovsky.blogs.com/flowstate/2005/10/the_fractal_nat.html
---

<p>
  Getting UI right requires obsessive attention to detail, particularly if
  you're building on a platform that doesn't provide substantial help for common
  UI patterns. I've recently been designing and implementing a minor feature in
  a Windows client application, and can't believe how long it's taking to get
  this feature right. The feature? Remembering the position of an application
  window across sessions.
</p>
<p>
  Users like applications that remember the state and position of windows across
  application sessions. They can pick a window arrangement they like, close the
  app whenever they want, and next time have everything just the way they like
  it. In the case of the Microsoft Windows APIs (both Win32 and .NET), the
  platform doesn't provide any built-in support for remembering window position.
  The platform documentation blithely tells you to do this work yourself, and
  sort of implies it won't be very hard. Hah.
</p>
<p>
  Here's what the learning curve looks like during a sequence of
  design/implement/test iterations:
</p>

<ol>
  <li>
    Designer: This feature is easy to deliver: when the user closes the window,
    we'll save the window's current state (on Windows, this is either maximized,
    minimized, or normal) and the window's current position.<br /><br /><em
      >User: Huh. This kind of works, but if I close the application while the
      window is minimized (sometimes this happens if I log off while I've got a
      bunch of apps minimized), the next time I start the application, the app
      comes up minimized. That's dumb.</em
    ><br /><br />
  </li>

  <li>
    Designer: Okay, we'll only save the window state and position if the
    window's maximized or normal.<br /><br /><em
      >User: That's better, but sometimes it still doesn't do the right thing.
      If I position the window, then minimize it, then close it, the app doesn't
      remember my window position.</em
    ><br /><br />
  </li>

  <li>
    Designer: That's easy to fix: we'll always save the window position, but
    we'll only save the window state if the window is normal or maximized.<br /><br /><em
      >User: This doesn't work.</em
    ><br /><br />
  </li>

  <li>
    Designer: Ugh. It appears that, if a window is minimized, it's &quot;window
    position&quot; data is essentially junk, and not the window's last
    meaningful position like we'd expected. To fix this, whenever the user
    positions the window in its normal state, we'll remember that position as
    the user's preferred position for the window. Then, when the user closes the
    window, we save this preferred position (not the current position, which
    could be junk). Additionally, if the window is maximized or normal, we save
    the window state too.<br /><br /><em
      >User: Not bad! This seems to work most of the time. How about this,
      though: I position the window where I want it, then maximize it, then
      minimize it, then close it. The next time I open the app, the window is in
      the normal state—not the maximized state the I last saw it in. That's
      odd.</em
    ><br /><br />
  </li>

  <li>
    Designer: You are one tough customer. Fine: whenever the user puts the
    window into the normal or maximized state, we'll remember this as the
    preferred state. Then, when the user closes the window, we save this
    preferred state (regardless of what state the window is currently in).
    Satisifed?<br /><br /><em
      >User: Not by a long shot. You see, I have a laptop. I've also got this
      external monitor on my desk—a monitor whose dimensions are different than
      those of the laptop's built-in screen. If I close the application when the
      laptop is docked, then reopen the application when the laptop is undocked,
      the application tries to come up in a position that no longer makes sense.
      Sometimes I can't even get to the window with the mouse because the window
      comes up off-screen.</em
    ><br /><br />
  </li>

  <li>
    Designer: Crap. Okay, whenever we're recording the user's preferred position
    for the window, we'll also save the current dimensions of the monitor
    itself. Then, if the app is opening and the monitor's dimensions have
    changed, we'll do our best to interpolate a meaningful position for the
    window in the new monitor dimensions.<br /><br /><em
      >User: This helps a bit, but it's not perfect. Each time I move between
      the docked and undocked state, the window position shifts a bit. I really
      want the window to be one size when I'm undocked, and a different size
      when I'm docked.</em
    ><br /><br />
  </li>

  <li>
    Designer: Urg. To do this right, we'll have to save a window's position in a
    list that stores a monitor's size and the user's preferred size for the
    window whenever the window is opened on a monitor of that size. Over time,
    this list will grow to encompass all monitor sizes the user likes to use,
    and their preferred window size for each of these monitor sizes. Satisfied
    now?<br /><br /><em
      >User: Mostly. Did I mention I recently bought a high DPI monitor? I was
      thinking that your window size interpolation routine should take into
      account physical screen inches instead of assuming a fixed pixel
      size...<br /><br
    /></em>
  </li>

  <li>Designer: Please, please go away.</li>
</ol>

<p>
  And so it goes.&nbsp; Since the OS doesn't provide any help, every ISV rolls
  their own solution for this, with the unsurprising result that they all
  stumble in different ways at some point along this path. Most seem get to step
  three or so. (Internet Explorer 7.x, for example, has the bug described by the
  user after step four.) If someone were willing to bake support for saving
  window state into Windows, the work would be leveraged across enough apps that
  it'd be worth the time to implement a deep solution. Even then, there'd still
  be room for improvement.
</p>
<p>
  There is no magical point where perfection is reached. Good design is a
  fractally hard problem: the more closely you focus on any given feature, the
  more rough edges you find to polish. The only sane approach is to iterate in
  an area until you've produced a solid user experience for a substantial
  portion of the cases you care about, then move on.
</p>
<p></p>
