---
title: "Are wireframes, paper prototypes, and other design outputs simply reflections of the cost of developing a real UI?"
originalUrl: https://miksovsky.blogs.com/flowstate/2011/01/design-outputs-as-reflections-of-the-cost-of-developing-ui.html
---

<p>
  I wonder how much of the current design process would go away if building
  real, functioning, deployable UI code were cheap and easy.
</p>
<p>
  The conventional wisdom of the UI design industry generally espouses a process
  in which a design proceeds through a series of increasingly sophisticated
  representations: starting with hand-drawn sketches, then wireframes, paper
  prototypes, simple interactive prototypes, and finally high-fidelity images
  (often PhotoShop) or movies showing the desired result. Most of these outputs
  are often completely static or otherwise reduced (less than fully functional)
  representations of the desired result. Much of them are thrown away when the
  real coding begins. Are those steps really necessary, or are they just a way
  to minimize the risk of spending time and money building the wrong UI?
</p>
<p>
  Over the last two years, my own design process has changed radically. In 2006,
  in a post titled
  <a
    href="/posts/2006/10-26-matching-design-sketches-to-the-desired-level-of-design-feedback.html"
    >Matching design sketches to the desired level of design feedback</a
  >, I outlined a fairly standard design process that started with hand-drawn
  sketches and proceeded from there. At that time, I felt that it was vital to
  receive critical feedback on a design concept before it got too far along.
  That post offers two reasons to recommend that practice:
</p>
<ol>
  <li>
    A minimalistic representation of the UI focuses reviewer attention on deep
    content instead of surface details.
  </li>
  <li>
    People feel more comfortable criticizing a crude representation of the UI
    because they assume it didn’t take long to create, and so they won’t be
    asking you to waste too much investment if you have to throw it away.
  </li>
</ol>
<p>
  The post does not mention a third, implicit reason I created sketches:
  developing a real, functioning UI was, in comparison, at least two orders of
  magnitude more costly. I could sketch in one hour’s time enough UI complexity
  to consume several weeks of an engineer’s time. Worse, the cost (to the
  designer) of a design change often has a non-linear relationship to the cost
  (to the engineer) of the implied architectural change. Pixels can be pushed
  around like so much fingerpaint; changing real UI code can be like trying to
  the change the framing for a house. Once you pick an architectural direction,
  you may not be able to simply change your mind without tearing it all down and
  starting over.
</p>
<p>
  Surely that’s not a given, however. Surely someday we’ll have dev tools that
  let us tinker with the whole UX stack as easily as we tinker with pixels in
  PhotoShop. It’s not even like a computational breakthrough is required for
  that to happen—all that’s probably necessary is a much, much better model for
  the UI, and a corresponding set of tools.
</p>
<p>
  So assuming we someday <em>do</em> have better coding tools that let even
  fundamental design decisions be reconsidered at any stage—what would our
  design process look like <em>then</em>? Would we really still have wireframes
  and paper prototypes and all?
</p>
<p>
  It’s not too hard to imagine all the paper stuff going away. If you could
  write real code as fast as creating a paper prototype, why bother with
  something that’s not as close as possible to the final UX? Static wireframes
  probably go too, for the same reason. It does seem like there still might be a
  point to creating stripped-down representations of a UI to focus user
  attention more on the content of the interaction (point #1 above), although
  even that I wonder about.
</p>
<p>
  Let’s assume you had the UI componentry to quickly assemble a UI whose very
  first representation already looked drop-dead gorgeous. Who’s to say that
  you’d get more meaningful results by showing users something less than
  beautiful? And, if that really were the case, would people still bother to
  create stripped-down UIs that looked like they were drawn on napkins
  (something deliberately crude, to hit point #2 above)? If everyone knew you
  could whip out something amazing in an hour, surely they’d recalibrate their
  reluctance to give you their honest opinion. And, ultimately, wouldn’t the
  whole idea of reviewing a UI change radically, moving away from off-the-cuff
  reactions to PowerPoint presentations in a conference room and more about
  watching the real performance of real users test-driving a real UI?
</p>
<p>
  I can’t wait for that day. Although such tools still aren’t here yet, my
  design process these days focuses a great deal more on UI coding at the very
  earliest stages, with an eye towards creating something interactive right away
  and refining from there. I’ll try to cover that process in more in detail in a
  separate post.
</p>
