---
title: "UI Controls of the Week: Making HTML check boxes and radio buttons work the way they should have in the first place"
date: 2012-02-20
originalUrl: https://miksovsky.blogs.com/flowstate/2012/02/labeledinput.html
---

<p>
  Here’s the current Sign In UI on a typical e-commerce web site (United
  Airlines, one of the largest airlines in North America) with a minor but
  common user interface bug:
</p>
<p>&#0160;</p>
<p>
  <img
    alt="United Airlines Sign In"
    src="/images/flowstate/6a00d83451fb6769e201630156faf9970d-pi.png"
  />
</p>
<p>&#0160;</p>
<p>
  The bug is this: the “Remember me” check box can only be checked by clicking
  the tiny 13 by 13 pixel square; clicking the text <em>label</em> for the check
  box has no effect. This minor but common bug appears on many web sites because
  an HTML &lt;input&gt; check box on its own can’t define a label. The label can
  only be defined by creating a separate &lt;label&gt; tag. I have no idea who
  came up with this arrangement, and can only imagine that this was intended to
  allow flexibility. It does allow, for example, a check box label to be placed
  above, under, or to the left of, a check box. But this flexibility comes at a
  cost: many web developers aren’t aware of the need for &lt;label&gt; tags, and
  so they end up with check boxes with static, unclickable labels. HTML radio
  buttons suffer from the same issue.
</p>
<p>
  Of course, users have been long trained by client OSes that the text next to a
  check box or radio button <em>should</em> be clickable. It makes sense, after
  all, to give the user a large hit area (especially on a touch device). If the
  site above were to correctly define a check box label, the hit target would be
  600% times as large as using the box alone, at no additional cost in screen
  real estate. Furthermore, the UI would be more accessible to a larger
  population, including vision-impaired people using screen readers.
</p>
<p>
  The situation is improving, and a quick survey of some highly-trafficked web
  sites shows that many of them do correctly define labels for check boxes and
  radio buttons. But even some popular sites do not, or don’t do so
  consistently. Quantcast estimates the above United Airlines site gets about 1M
  U.S. visitors a month, and it’s fair to guess that some significant portion of
  those people are being driven through the faulty Sign In UI above.
</p>
<p>
  The problem persists because here
  <em>it’s harder to create a correct UI than an incorrect one</em>. For the
  correct result here, the developer has to:
</p>
<ol>
  <li>Hear about the need for the &lt;label&gt; tag and learn how it works.</li>
  <li>Remember to use a &lt;label&gt;.</li>
  <li>Set an ID on the &lt;input&gt; element.</li>
  <li>Create the &lt;label&gt; element.</li>
  <li>Type in the user-visible text.</li>
  <li>Set the label’s “for” attribute to the input element’s ID.</li>
</ol>
<p>
  In contrast, to create this check box the <em>wrong</em> way, the developer
  just has to:
</p>
<ol>
  <li>Type in the user-visible text.</li>
</ol>
<p>
  A check box created the wrong way looks pretty much like one created the right
  way, so it can be hard for the team creating the UI to spot the bug. And, of
  course, when the problem exists in UI that’s generally shown only to new users
  (like the UI above), team members will rarely be exposed to the bug
  themselves.
</p>
<p>
  Usability experts can exhort the correct use of &lt;label&gt; tags until
  they’re blue in the face, but a real fix requires that it be easier to create
  a correct UI than an incorrect UI. Client OSes have made this easy for years,
  and I can probably count on one hand the number of times I’ve seen a check box
  in a client app in which the text was not correctly clickable.
</p>
<p>
  Oh, and one more thing. On the web, it turns out that
  <em>even if you do things the way you’re told to</em>, your check box or radio
  button UI may still have a tiny bug. By default WebKit and Mozilla put an
  unclickable 3px margin around the input element. So even if you use a
  &lt;label&gt; tag in the recommended fashion, you still end up with a 3 pixel
  gap (highlighted below in red) between the input element and the label:
</p>
<p>&#0160;</p>
<p>
  <img
    alt="Check Box Label Gap"
    src="/images/flowstate/6a00d83451fb6769e20168e74de1e4970c-pi.png"
  />
</p>
<p>&#0160;</p>
<p>
  Clicks in this gap have no effect! This is a teeny tiny bug that nevertheless
  happens to show up in WebKit and Mozilla on nearly every web site. (IE takes
  care to leave no gap.) This probably means that on any given day thousands of
  users happen to click in that gap, and are puzzled that nothing has happened
  before they quickly click again. I noticed that one site, Gmail, carefully
  works around this very issue by overriding the margins on the check box and
  label to eliminate the gap. Once again, it seems the platform makes it harder
  to create a correct UI than an incorrect one.
</p>
<p><strong>CheckBox and RadioButton</strong></p>
<p>
  I’ve added <a href="http://quickui/catalog/CheckBox">CheckBox</a> and
  <a href="http://quickui/catalog/RadioButton">RadioButton</a> controls to the
  QuickUI Catalog that implicitly associate a label with an input element, and
  close up the gap described above.
</p>
<p>
  These aren’t particularly fancy or interesting components, but they’re
  nevertheless simple to use and solve the problem defined above. I wish HTML
  check boxes and radio buttons had always worked like this.
</p>
<p><strong>Implementation notes</strong></p>
<p>
  Both CheckBox and RadioButton inherit from a
  <a href="http://quickui/catalog/LabeledInput">LabeledInput</a> base class that
  creates the automatic link between the label and the input element.
</p>
<p>
  I originally implemented the LabeledInput base class as an inline div
  containing an input and a label element, and had some JavaScript explicitly
  link the two elements with a generated ID. But then I noticed something
  interesting on Gmail’s sign in page: the input element is <em>inside</em> the
  label element, right before the static text. I’ve never seen this approach
  documented on pages that describe the use of &lt;label&gt;. Every site seems
  to document the label appearing in the HTML immediately after the input. But
  putting the input inside the label seems to work in all the mainstream
  browsers. The advantage of this approach is that there’s no need to set the
  “for” attribute on the label; the label automatically binds to the input
  element it contains.
</p>
<p>
  Taking another hint from Gmail, the LabeledInput class also sets margins so as
  to leave no gap between the input element and the adjacent text.
</p>
<p>
  Finally, as an extra bonus, the RadioButton control solves an annoyance
  specific to HTML radio buttons. An HTML developer must manually designate an
  internal radio button group name for each radio button in the group that
  should work together (i.e., which should be mutually exclusive). This isn’t
  hard to do, but it’s still an extra step, and more work than should really be
  necessary. So, by default, if you don’t explicitly put a RadioButton into a
  group, it will automatically group itself with any siblings (with the same DOM
  parent) that are similarly ungrouped.
</p>
