---
title: "If a person talked to you the same way user interfaces talk, you'd ignore them too"
originalUrl: https://miksovsky.blogs.com/flowstate/2011/06/user-interface-text-empathy.html
---

<p>
  A standard trope in software is that, “Users don’t read”. This claim is often
  made after someone observes a user blow straight through an “Are you sure you
  want to do&#0160;<em>X</em>?” dialog without reading it (possibly with some
  catastrophic result). There’s plenty of usability research showing that users
  do indeed&#0160;<a href="http://www.useit.com/alertbox/whyscanning.html"
    >scan text instead of reading it</a
  >, which has resulted in some good recommendations for&#0160;<a
    href="http://www.useit.com/papers/webwriting/"
    >writing for the web</a
  >. But I think most of that discussion overlooks the fact that much UI text is
  almost pathological in its lack of empathy, failing to consider the situation
  from the user’s perspective.
</p>
<p>
  Let’s consider some situations you might encounter in UI text, then consider
  how you would view similar behavior in a human conversational counterpart.
</p>
<ul>
  <li>
    UI text is highly redundant. A page or dialog may&#0160;<a
      href="/posts/2005/08-01-make-every-piece-of-text-count.html"
      >state its main question or point multiple times</a
    >. If a person stated the same point to you three different ways, you’d
    either think they were stupid, or conclude they
    thought&#0160;<em>you&#0160;</em>were stupid.
  </li>
  <li>
    UI text can be highly predictable. Suppose an app displays a confirmation
    dialog every single time you perform a common action, perhaps an act that is
    universally confirmed. A typical example might be a dialog intended
    to&#0160;<a
      href="/posts/2006/02-12-some-basic-ui-patterns-for-preventing-accidental-deletion.html"
      >prevent accidental deletion</a
    >. A person who asks you such a near-pointless question signals a lack of
    interest in the interaction, and in you as a person generally. (How did you
    feel when airline ticket agents used to ask questions whether you were
    carrying weapons or whatever?)
  </li>
  <li>
    UI text doesn’t address questions from the perspective of the your task. If
    an app, say, focuses on some technological detail rather than the user’s
    goal, the app sounds more interested in itself than in you or your goal.
    This sort of behavior in people is characterized as narcissistic.
  </li>
  <li>
    UI text uses jargon. By using words you are unlikely to know, the app
    signals more than disinterest in you, it places itself in a superior
    position as it pushes you down. In a human conversational counterpart, this
    behavior can be placed on some continuum between obtuse and elitist.
  </li>
  <li>
    UI text may&#0160;<a
      href="/posts/2007/06-20-dont-bury-the-lede-whats-the-real-story-behind-a-ui-interaction.html"
      >bury the lede in a UI interaction</a
    >, that is, fail to draw your attention to the larger point. Someone who
    claims to give you the information you asked for, but deliberately
    obfuscates the crux of the matter, could be viewed as passive-aggressive.
  </li>
  <li>
    UI text can be abrupt and negative. The canonical example here might be form
    validation feedback that rejects your attempt to enter data: “Error: Invalid
    email address” or such like. There are nearly always softer terms that could
    convey the same meaning as harsh terms. If a person deliberately uses
    negatively charged words like “invalid”, “incorrect”, “missing”, or “failed”
    to discuss you, your goals, or your acts, you could reasonably assume they
    felt disappointed or disgusted with you.
  </li>
</ul>
<p>
  Everyone, whether speaking with you, or writing to you through UI text, gets
  to choose their words. The existence of that choice allows you to infer the
  emotional state and intent of your conversational counterpart. While it’s
  impossible for an app today to “speak” with the same understanding of the
  situation as a person, or to accurately reflect that understanding through the
  nuances of its words, it is nevertheless eminently possible to improve a user
  interaction by writing UI text with more empathy for the user.
</p>
<p>
  Again and again, my standard UI text exercise is to envision those words
  arising in conversation between two people. If I’m playing the role of the
  app, and the words I’m saying sound obtuse, insulting, superior, or
  disinterested, then those words must be rewritten, or the UI refactored to
  avoid the need for them.
</p>
