---
title: "Improving the EULA user experience with Bullet Summaries"
originalUrl: https://miksovsky.blogs.com/flowstate/2006/09/improving_the_u.html
---

<p>
  Publicly available software applications and web sites contain myriad end user
  license agreements, terms of use, and other legalese, but the user experience
  of actually reviewing and accepting these legal agreements is universally
  poor. Software users click through license agreements almost every time they
  install or upgrade software, but even vendors that care deeply about user
  interfaces leave untouched the fundamentally bad user experience of their
  legally binding dialogs and pages. I've been looking for a way to improve this
  experience in the products I work on.
</p>
<p>The canonical End User License Agreement (EULA) dialog looks like this:</p>
<p>
  <img
    alt="Windows_xp_sp_2_eula"
    src="/images/flowstate/windows_xp_sp_2_eula.png"
  />
</p>
<p>
  The dialog is a smallish window that contains a very long scrolling text box.
  Below the text box sit controls with which the user must accept or decline the
  agreement. This may take the form of an &quot;I agree&quot; check box, or a
  set of push buttons (shown above).
</p>
<p>
  The user experience of reviewing a EULA in such a dialog is, of course,
  terrible. The text of the EULA itself is dense legal language fully of text
  INEXPLICABLY IN CAPITALS warning you that you hereby AGREE to ALL SORTS OF
  STUFF YOU DON&quot;T UNDERSTAND. The text is not generally organized in any
  interesting way (e.g., important stuff first). The text is usually plain text
  or simply formatted and—profligate use of capitals to the contrary—does not
  actually highlight the most interesting bits in the text. The text goes on for
  pages and pages.
</p>
<p>
  In most cases, the application does not offer a default option. If it does,
  the default is nearly always to decline the agreement. Since the user is
  almost always going to accept the agreement anyway, the default option (if
  there is one) is essentially never the option the user wants.
</p>
<p>
  It's commonly held wisdom that most users blow through such dialogs as quickly
  as they can. Having paid for software, or at least having gone through the
  trouble to download it, are they really going to read the agreement carefully
  and Decline it?
</p>
<p>
  The effect of this is that users often end up agreeing to all sorts of things
  they'd probably not be comfortable with if they were aware of them. Here's the
  <a
    href="http://www.gripewiki.com/index.php/Microsoft_Windows_XP_Service_Pack_2_%28Supplemental_EULA%29"
    >complete text of the EULA</a
  >
  above, with highlighting around some ominous clause related to digital rights
  management. This EULA is even more daunting than it first appears: it's a
  <em>supplemental</em> EULA, amending another, probably equally lengthy EULA.
</p>
<p>
  In some cases, glossing over concerning details is exactly what the vendor had
  in mind. Still, there are many cases when the vendor probably would prefer
  that you really did know a fact that's unfortunately buried in the EULA. The
  EULA for many software products indicate that the license entitles the user to
  install the software on one computer. While there are many users who willingly
  ignore (or do their best to circumvent) such a restriction, there are surely
  others who would abide by this restriction—if only they were aware of it.
</p>
<p>
  Despite the obvious shortcomings with such a user interface, there are many,
  many very good reasons why vendors offer an interface just like this. One very
  good reason is that few vendors even give the UI a second thought. It's a
  standard part of most application Setup frameworks, so it's essentially free
  to use a framework-supplied EULA UI and it's not free to write something
  better. The company lawyers fill it in once and the dialog is forgotten
  forever.
</p>
<p>
  Another very good reason for using this interface is that everyone else uses
  it. Even if you tried to do something differently, your lawyers would probably
  tell you to cut it out. If a lawyer didn't stop you, there's always the small
  but nagging chance you could goof something up, and someone will have a good
  opportunity to successfully sue you. Most people don't think this is worth the
  trouble.
</p>
<p>
  I sat in on a number of early design reviews of the Microsoft Windows Vista
  Setup user experience, and asked whether we could do better than the dialog
  above. The Setup team loudly shouted, &quot;NO!&quot;, for essentially the
  reasons given above. A company like Microsoft is sued on a daily basis, and
  has probably paid for every word of its EULAs with bloody court battles they
  don't care to repeat. They would prefer not to expose themselves to new legal
  risk. Accordingly, the
  <a href="/images/flowstate/Windows_Vista_Beta_1_EULA.jpg"
    >Windows Vista EULA </a
  >experience can dress up the dialog with glassy effects, but the experience
  remains essentially unchanged.
</p>
<p>
  I've spent the last few months at my startup,
  <a href="http://www.cozi.com">Cozi</a>, preparing for the not-too-distant
  launch of our first product. I wanted to make another go at coming up with a
  better EULA user experience. We're fortunate enough to work with some
  forward-thinking lawyers who would at least entertain the idea of trying
  something new.
</p>
<p>
  Our final user interface is, for now, that of the canonical EULA dialog above.
  We rely on a third-party Setup framework, and ultimately decided we didn't
  have time to rewrite the framework's EULA dialog. However, we were able to
  introduce what I hope will prove to be an improvement in the user experience
  of trying to actually understand what the agreement says.
</p>
<p>
  The idea is to summarize the key points of the EULA (or privacy policy, or
  whatever) in 2-4 bullets at the top of the document. I call this practice the
  Bullet Summary. The bullets are introduced with the leader, &quot;Here are
  some key points to know about &lt;the topic covered by the
  agreement&gt;:&quot; The bullets are followed by a line that says,
  &quot;Please read the complete agreement that follows:&quot; The goal is to
  get these bullets and the accompanying lines above the fold; the user should
  be able to read the Bullet Summary without having to scroll.
</p>
<p>
  You'll also be able to see a Bullet Summary in the EULA of Cozi's first
  product when we announce it someday soon. In the meantime, you can see two
  examples of Bullet Summaries on the Cozi web site in our
  <a href="http://www.cozi.com/about/terms.aspx">Terms of Use</a> and our
  <a href="http://www.cozi.com/about/privacy.aspx">Privacy Policy</a>. Offering
  a summary of a legal document is not new, but perhaps this particular
  convention is, and in any event I haven't seen something like this in
  software.
</p>
<p>
  NOTE: Those simple lines above and below the bullets are absolutely critical.
  The Bullet Summary is meant to summarize, <strong>not replace</strong>, the
  text of the agreement. I'm not a lawyer, but it's my understanding that
  offering the user a summary of a legal agreement can be acceptable as long as
  the summary is not misleading, is consistent with the complete agreement that
  follows, and does not imply that the summary is a complete account of what the
  user is agreeing to.
</p>
<p>
  The reaction to the use of a Bullet Summary in our EULA has been quite
  positive. Our lawyers thought it would be helpful. And, indeed, more than one
  beta tester has offered completely unprompted feedback saying they found the
  bullets helpful. If users actually notice what's going on in a EULA dialog
  during Setup, of all things, and then take the trouble to tell you they like
  it, something must be going right.
</p>
<p>
  In an on-site usability test, I watched one user who came to the EULA page.
  They reached immediately for the &quot;I Agree&quot; button—and then paused to
  read the bullets. It was my impression that this user would never have read
  anything in the EULA if they hadn't stopped to read the bullets.
</p>
<p>
  I, for one, am happier to have people use our products knowing that they are
  at least slightly better informed about what they've agreed to. And, finally,
  writing a Bullet Summary is a highly useful design exercise. It prompts a
  deep, reflective discussion among team members about which points in the
  agreement are actually the most important for their users to understand.
</p>
<p>
  It bears repeating that <strong>I'm not a lawyer</strong>. I'm offering this
  information about the products I work on because I think this idea helps make
  life marginally better for my company's customers. Indepent of whether you
  agree with the contents of Cozi's legal agreements, you may find the Bullet
  Summary approach interesting. If you are tempted to apply this idea to your
  own product, consult an attorney before proceeding. You may find it helpful to
  point them at this post and Cozi's site. With any luck, a user interface
  precedent—and a legal precedent— will be established that results in EULAs and
  other software-related legal agreements that are just a bit easier for the
  typical user to understand.
</p>
