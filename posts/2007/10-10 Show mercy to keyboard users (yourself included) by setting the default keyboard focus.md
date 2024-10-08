---
title: "Show mercy to keyboard users (yourself included) by setting the default keyboard focus"
originalUrl: https://miksovsky.blogs.com/flowstate/2007/10/show-mercy-to-k.html
---

<p>
  As more of my UI work moves from client software to web sites, I'm often
  struck by the lack of attention most web sites spend on details of UI
  interactions. As a case in point, compare the degree to which a software
  company considers its keyboard users. Most client software products do a fair
  to middling job of keyboard support, but at least provide some basic
  facilities like keyboard accelerators for input fields, and give at least a
  bit of thought to the order in which a user will tab through fields. Most web
  sites, in comparison, apparently fail to give the keyboard user the slightest
  bit of thought.&nbsp;
</p>
<p>
  Keyboard support is often considered to be something done just for people who,
  for various physical reasons, can't use a mouse. That's an important community
  to serve, but not the only reason to think about keyboard users. Most people
  use a keyboard at some point in a given computer session. The vast majority of
  people searching with Google, sending email, IMing, twittering, and so on,
  every day are doing so with a keyboard. Laptop users routinely find themselves
  in situations where using a mouse or pointing device is cumbersome. As with
  many services initially intended for users with disabilities (closed
  captioning, sidewalk curb cuts, wheelchair ramps), keyboard support benefits
  the broader public.&nbsp;
</p>
<p>
  For all people complain about Microsoft Windows, the platform and its
  applications do a great deal of work in service of keyboard users. As much as
  I love my MacBook, I'm often frustrated by operations that have no obvious
  keyboard shortcut. And I was amazed to discover OS/X disables a good portion
  of its keyboard support by default, requiring a trip to System Preferences to
  fix. Still, OS/X does a fantastic job of keyboard support in comparison to
  almost every web site today.&nbsp;
</p>
<p>
  The very simplest thing a UI designer to help keyboard users is
  <strong
    >deliberately pick a good control to receive the keyboard focus by
    default.</strong
  >
  This is usually a trivial task—just figure out which control the user is
  likely to want to interact with first, and put the focus there. Often this
  control will be a text box. In a decent visual UI designer, setting the
  default keyboard focus is usually something that can be done purely through
  design-time UI, without resorting to code. In HTML, the default focus can
  usually be easily set with a tiny amount of the most rudimentary JavaScript in
  an onload event handler. [Example:
  onload=&quot;document.myform.textbox1.focus()&quot;]
</p>
<p>
  <strong>Yet virtually no web pages bother to do this.</strong> This is pretty
  remarkable, even more so for web forms with text input fields. On such pages,
  almost every user is going to have to click the mouse on the first input field
  so they can start typing. Every user, every day, will have to spend a second
  or two to do this. In a minute or so, a web developer could permanently
  eliminate the need for that extra click. So why don't more people
  bother?&nbsp;
</p>
<p>
  As far as I can tell, the most prominent class of web sites that consistently
  set the default keyboard focus is search engines:
  <a href="http://www.google.com">Google</a>,
  <a href="http://www.yahoo.com">Yahoo</a>,
  <a href="http://www.live.com">Windows Live</a>, etc. Most other sites don't
  bother, even those like <a href="http://www.facebook.com">Facebook</a> that
  have obvious fields, like Search boxes, that could receive the focus. And even
  the search engines that do set the keyboard focus don't appear to reflect a
  consistent corporate design goal. <br />
</p>
<p>
  <img src="/images/flowstate/Google%20Search%20Box_thumb.png" />
</p>
<p>
  <span><em>Google home page sets the default keyboard focus</em></span>
</p>
<p>&nbsp;</p>
<p>
  <img src="/images/flowstate/Google%20Reader%20Search%20Box_thumb.png" />
</p>
<p>
  <span><em>Other Google properties generally don't</em></span>
</p>
<p>
  Google's home page sets the keyboard focus, but the main page for other Google
  properties like <a href="http://www.google.com/reader">Google Reader</a>,
  <a href="http://news.google.com">Google News</a>, and
  <a href="http://www.youtube.com">YouTube</a> don't. Windows Live does, but
  <a href="http://www.microsoft.com">Microsoft's corporate home page</a>
  doesn't. This last example is particularly telling. Microsoft spends untold
  hundreds of hours every year ensuring that its Windows products comply with
  regional accessibility regulations such as the wide-reaching
  <a href="http://en.wikipedia.org/wiki/Americans_with_Disabilities_Act_of_1990"
    >Americans with Disabilities Act</a
  >. American federal agencies generally insist that suppliers like Microsoft
  create products that comply with these laws if they want to do business with
  the agency. I have no specific knowledge, but it's reasonable to assume that
  the Microsoft home page doesn't fall under these regulations—maybe for the
  simple reason that no one's paying to use the page.&nbsp;
</p>
<p>
  I think the primary reason web companies ignore keyboard users boils down to
  expectations. Web sites don't bother to set the keyboard focus because other
  web sites don't, and because by now users don't expect them to. This double
  standard is so pervasive that, as much as I care about well-designed keyboard
  support, the web version of the product I work on generally doesn't set the
  keyboard focus either. It just never occurred to me as something to worry
  about,
  <em
    >even as I devoted attention to keyboard users of the downloadable Windows
    client version of the same product.</em
  >&nbsp;
</p>
<p>
  Starting to write this post provided me the impetus to finally address this UI
  problem in some portions of on Cozi's marketing site. Some pages like the
  <a href="https://secure.cozi.com/accounts/signup.aspx">Cozi sign-up page</a>
  had forms that were completely straightforward to fix. The
  <a href="http://www.cozi.com/">Cozi home page</a> proved tougher to fix. I
  wanted to set the focus to the search box. Unfortunately, that control happens
  to use hint text, the light gray text inside a field that serves as a field
  label. Like most HTML implementations of hint text, the particular
  implementation we happen to use clears the hint text when the control receives
  the focus. This means setting the default keyboard focus has the unwanted side
  effect of removing the hint text, thereby obscuring the purpose of the very
  field the user might want to type in. As it turns out, we've been developing a
  better hint text implementation anyway that won't disappear until the user
  starts typing, and I'm looking forward to eventually using that control for
  our search box.&nbsp;
</p>
<p>
  In the meantime, I've at least resensitized myself to the interests of
  keyboard users, myself included. If your web product has a commonly used form
  or search box, why not take a minute to put the default keyboard focus in the
  right place? Setting the default keyboard focus is only a simple tiny step
  towards designing a good experience for keyboard users, but at least it's a
  start.
</p>
