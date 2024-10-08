---
title: "Custom context menus always forget to support right-clicking *on* the context menu"
originalUrl: https://miksovsky.blogs.com/flowstate/2011/01/custom-context-menus-always-forget-to-support-right-clicking-on-the-context-menu.html
---

<p>
  Most users I see these days know they can use the right mouse button (or, if
  you’re being picky, the secondary mouse button) to produce a context menu.
  Essentially all creators of operating systems and UI frameworks (for platforms
  with mice) allow for this behavior. An interesting question is what happens
  when the user, having produced a context menu,
  <em>right-clicks again on the context menu itself</em>.
</p>
<p>
  This isn’t odd at all to see in practice. For one thing, there are plenty of
  “right-click people” who habitually right-click on anything. And even for
  users who understand the difference between a left and right click, it’s
  fairly natural to inadvertently use the right mouse button twice in close
  succession to first invoke a context menu and then, in the next second, to
  select a command from that menu.
</p>
<p>
  Microsoft Windows and Apple OS/X both handle this gracefully: right-clicking
  on a context menu command has the same effect as left-clicking the command.
  This behavior lets people who aren’t playing very close attention to which
  mouse button they’re clicking to still get what they want. The user can click
  with the right-mouse button to get the menu, and then immediately right-click
  again to select a command. (I’ve personally found this behavior worth
  exploiting; it feels faster to select context menu commands more quickly with
  two right clicks than a right and then a left click.)
</p>
<p>
  This right-click-on-a-menu behavior is an example of a behavior that
  distinguishes long-time UI platforms from application UI creators that think
  they know better than the platform—or haven’t studied the platform closely
  enough. Virtually every application with custom context menus I’ve found fails
  to implement this behavior.
</p>
<p>
  Case in point: Microsoft Office 2010, which should know better. I could have
  sworn they had this right at some point, but this knowledge was probably lost
  during the creation of their 19th proprietary UI framework. And if Office got
  this wrong, it&#39;s no surprise that most other apps with custom context
  menus get this wrong too. Generally, right-clicking on a context menu in such
  an application has no effect, which isn’t what the user wanted, but at least
  no harm is done.
</p>
<p>
  It’s worse in the case of web application that override the browser’s context
  menu to provide their own context menu. The user gets seriously confused when
  the browser’s context menu comes up
  <em>on top of the custom context menu:</em>
</p>
<p>
  <img
    src="/images/flowstate/6a00d83451fb6769e20147e19401f7970b-pi.png"
    alt="Right Click on Context Menu"
  />
</p>
<p>
  Now, there&#39;s a small chance that the browser&#39;s context menu is left
  active by design; i.e., that a standard context menu on a custom context menu
  actually provides some value. Say, the custom context menu provides a plain
  hyperlink, and the user wants to be able to right-click on the link to copy
  the link&#39;s address. However, that rarely seems to be the case with most
  custom context menus. It seems more likely the implementors just didn&#39;t
  consider this scenario.
</p>
<p>
  This whole situation isn&#39;t a big deal, but it’s precisely small details
  like this that prove the value of relying on the OS (or a mature UI platform)
  to provide stock control behavior. Most people assume that stock controls like
  menus,&#0160;scroll bars, and combo boxes can’t be <em>that</em> hard to
  implement, failing to appreciate the years of hard usability learning baked
  into the platform.&#0160;If you do have to roll your own context menus,
  consider whether you could save your users a bit of confusion by taking the
  time to get this right.
</p>
