---
title: "Asking for first names with an example"
originalUrl: https://miksovsky.blogs.com/flowstate/2006/10/asking_for_firs.html
---

<p>
  To keep things friendly and approachable, applications often ask a new user to
  supply their first name. In designing the sign up procedure for Cozi Central,
  I applied my favorite trick for asking for first names: provide an example of
  what kind of name you want.
</p>
<p>
  To ask a user their first name, you'd think you could just create a text box
  labeled &quot;First name:&quot;. The problem is that many people don't
  <em>want</em> to use their first name. A user might prefer to go by a
  nickname, for example. However, at sign up time, the user has no idea how your
  product is going to use the name they enter, so they may hesitate to enter a
  nickname instead of their real first name. Your application may end up
  addressing the user by a name they dislike.
</p>
<p>
  You could just ask the user for &quot;Name:&quot;, and figure that they can
  enter whatever they want. Now you've got a new problem: tons and tons of
  people will enter their full name, or their last name, or something else. Your
  program might then address them cheerfully but stiffly: &quot;Good morning,
  John Anthony Smith!&quot;
</p>
<p>
  To elicit a first name but leave the door open for something else, ask the
  user for &quot;Name:&quot;,
  <em>but provide an example that shows a first name</em>:
</p>
<p>
  <img
    alt="Cozi_central_signup_page_section"
    src="/images/flowstate/cozi_central_signup_page_section.png"
  />
</p>
<p>
  This seems to work quite well in practice. (I give credit for this trick to
  software designer and all-around nice guy David Sloo.)
</p>
<p>
  Caution: There's a limit to how far you can push this idea, as Cozi learned
  this past week. Since our sign up page used an example for Name, we went ahead
  and put examples next to most of the fields, including the email address
  fields. The sample email addresses were at cozi.com, so that we could avoid
  collisions with a real domain name. Bad idea: many users thought we were
  giving them a new email address, so they entered their own name @cozi.com
  instead of entering their existing email address. We promptly cut the email
  address examples from the sign up page. By now, most people should know what
  an email address looks like.
</p>
