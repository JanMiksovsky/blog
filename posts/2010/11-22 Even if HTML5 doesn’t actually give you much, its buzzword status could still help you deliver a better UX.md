---
title: "Even if HTML5 doesn’t actually give you much, its buzzword status could still help you deliver a better UX"
originalUrl: https://miksovsky.blogs.com/flowstate/2010/11/html5-buzzword.html
---

<p>
  Sheesh, there’s a lot of
  <a href="http://en.wikipedia.org/wiki/HTML_5">HTML5</a> talk these days. I was
  initially confused and disappointed by HTML5’s buzzword status, until I
  realized that its very buzzword existence could ultimately help me deliver a
  better user experience.
</p>
<p>
  <img
    src="/images/flowstate/6a00d83451fb6769e20133f6196b00970b-pi.jpeg"
    alt="Agent 008 Ball"
  />
  <br /><em
    ><span
      >The Canvas tag makes a game like Agent 008 Ball awesome — but a
      productivity app, maybe not so much</span
    ></em
  >
</p>
<p>
  Each time I hear someone tell me that HTML5 the answer to, say,
  <a
    href="/posts/2010/09-20-dear-phone-oses-in-3rd-place-and-beyond-please-accelerate-your-demise.html"
    >the challenge of developing mobile clients for multiple platforms</a
  >, I have to wonder if they have actually reviewed the set of technologies
  actually comprising HTML5. On its face, HTML5 would seem to mean very little
  for a productivity app like Cozi.
</p>
<ol>
  <li>
    The most immediately useful aspect to Cozi is probably the &lt;audio&gt; tag
    for the few situations in which the Cozi web application plays a sound. We
    currently do that with Flash, and it’d be nice to jettison that baggage.
    Audio is not a big deal for us, however.
  </li>
  <li>
    Offline storage? Maybe. The cynic in me is betting that, once we begin
    investigating this, we’ll discover that HTML5 offline storage solves 70% of
    what we want. Still, this is somewhat interesting.
  </li>
</ol>
<p>
  And, from what I can see, that’s about it for Cozi. I’m missing the magic of
  the rest.
</p>
<ul>
  <li>
    The &lt;canvas&gt; tag is a huge step forward for slick
    graphically-intensive apps like
    <a href="http://agent8ball.com/">Agent 008 Ball</a>, but I’m not seeing the
    big breakthrough for an app that can already render everything it wants with
    native HTML elements.
  </li>
  <li>We don’t do much with video.</li>
  <li>
    Drag and drop. This is only interesting if you believe that drag and drop is
    an intuitive and convenient UI for moving files. My own belief is that users
    would benefit much more from optimized modal UIs designed for common tasks
    like picking photos. (The File Open dialog could start out showing the
    user’s actual photo storage location, show thumbnails by default, the dialog
    could allow multiple selection across multiple folders, etc.)
  </li>
  <li>
    The pile of new tags of purportedly general utility like &lt;section&gt; or
    &lt;figcaption&gt; solve no problem anywhere on our list of the 50 Biggest
    Problems We Have. What would really help instead would be a framework by
    which different communities could define new domain-specific tags that solve
    domain-specific problems. Hence my investment of time and labor in the
    <a href="https://quickui.org/">QuickUI web control framekwork</a>.
  </li>
</ul>
<p>
  “But wait!” cry the poorly-informed or deliberately overexcited
  <a href="http://www.technologyreview.com/web/25838/"
    >HTML5 buzzword-pushing media</a
  >. “What about animations? And things with rounded corners and drop-shadows?
  And
  <a
    href="/posts/2010/08-16-lessons-learned-switching-our-web-ui-from-stock-fonts-to-a-proprietary-font.html"
    >embedded fonts</a
  >? And <a href="http://www.20thingsilearned.com">single-page applications</a>?
  And increased standardization? Those things are all revolutionary!” Yes, they
  are—and all those things were possible before HTML5.
</p>
<p>There are however, some very important second-order benefits of HTML5:</p>
<ol>
  <li>
    HTML5 provides a useful shorthand for “modern web browser”. All I really
    need to pull off most of Cozi’s current feature designs is a fast JavaScript
    engine and CSS3. Those things are independent of HTML5 — but chances are
    that if someone claims their browser supports HTML5, it <em>also</em> sports
    a fast JavaScript engine and CSS3 support. So even though Cozi may not care
    about HTML5, the term “HTML5” provides a great proxy for the things we
    <em>do</em> care about.
  </li>
  <li>
    The relentless repeating of the HTML5 buzzword may have the beneficial
    side-effect of finally giving consumers a way to evaluate whether, for
    example, the latest mobile phone they’re considering buying is going to
    provide them a good browsing experience. “I’ve heard that I need HTML5. Does
    this phone has HTML5?” It doesn’t matter that the literal interpretation of
    the question is probably not what the consumer cares about; the question’s
    answer may still give the user what they want. We might finally see
    consumers and IT departments wake up and jettison their ancient copies of IE
    in favor of a modern browser on a reasonable upgrade cycle.
  </li>
</ol>
<p>
  Of course, I’m sure there are many web applications that will directly benefit
  from HTML5 in ways that completely change their business. They must be very
  happy. For now, my company probably isn’t one of those beneficiaries. Still,
  the above second-order effects of HTML5 might eventually allow me to deliver a
  better user experience to more users. If that means reducing HTML5 to a
  buzzword, I’m all for it.
</p>
