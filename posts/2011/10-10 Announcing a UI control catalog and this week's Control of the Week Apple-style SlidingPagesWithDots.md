---
title: "Announcing a UI control catalog and this week's Control of the Week: Apple-style SlidingPagesWithDots"
originalUrl: https://miksovsky.blogs.com/flowstate/2011/10/slidingpageswithdots.html
---

<p>
  I think the web UX field would benefit from having access to an open,
  comprehensive catalog of working, ready-to-use user interface controls. All
  programming platforms provide class libraries replete with hundreds of base
  classes, which are both standard implementations and starting points for
  custom work — but when it comes to user interface libraries, most provide
  something like a dozen very basic controls: a Button, a ListBox, a SpinBox, a
  Slider, etc. There’s also always a DatePicker, and it usually represents the
  pinnacle of complexity for the UI library. That’s about it. Everything else —
  i.e., much of the UI components a design team needs — has to be custom made
  from scratch.
</p>
<p>
  This is incredibly inefficient, and a state of affairs tolerated perhaps in no
  other branch of software development. Few people seem to realize that a
  solution is even possible. I think at least one key reason for that is that
  most UI frameworks don’t define the semantics of specialization (subclassing)
  by which one person can take another person’s component and specialize both
  the component’s appearance <em>and behavior</em> to their needs. With such
  semantics in hand, it should be possible to build a much richer ecosystem for
  UI components.
</p>
<p>
  A core purpose for the <a href="https://quickui.org/">QuickUI</a> framework is
  to address exactly that need: let people build robust, solid, well-tested base
  controls that can get quickly specialized for particular needs. To prove that
  is possible, and to verify QuickUI can do that well, I’m starting a project to
  create a large library of UI control base classes. My plan to tackle (first on
  my own, and then hopefully with the help of some of you) as many of the common
  UI controls found around the web as possible. Many of these aren’t even
  recognized as shareable controls; they’re often referred to as “patterns”,
  suggesting there’s no common behavior which could be shared.
</p>
<p>
  These controls will get collected into a catalog of live examples and
  ready-to-use source code. Each control in the catalog will be live code: not
  screen shots of examples, not a pattern, not a template for a prototyping
  tool, not a recipe for doing it yourself. Each one should be ready to use in
  your web app. Furthermore, each control should be able to serve as the
  starting point for your own custom refinements. As a side effect, the catalog
  should also be a useful reference for developers building UI in other ways,
  but the biggest benefits should accrue to people who can just pick up the
  working controls and start using them.
</p>
<p>
  As a working format for the project, I’ve been inspired by the efforts of
  various artists to create a something-a-day for 365 days (e.g., Noah Scalin’s
  <a href="http://gelconference.com/videos/2009/noah_scalin/">Skull a Day</a>).
  I think a good control implementation might take longer than a day to code and
  write up. I think a control a week is a more reasonable goal.
</p>
<p>So here’s my plan for Control of the Week:</p>
<ol>
  <li>
    Each week I’ll pick a common control to implement (or improve) and discuss.
  </li>
  <li>
    I’ll code up a solution in QuickUI. Each implementation will generally focus
    on doing a single UI task really well.
  </li>
  <li>
    I’ll do my best to verify that the solution works as expected in the major
    browsers: Chrome, Firefox, IE 8+, and Safari. Visuals will be done in CSS3
    whenever possible, so things might look different (clunkier) in IE8, but
    I’ll try to allow for graceful degradation.
  </li>
  <li>
    I’ll add an entry for the control to the
    <a href="https://quickui.org/catalog">QuickUI Catalog</a>. The control’s
    notes may include suggestions on when and how to use the control in a UI.
    The Catalog already contains a number of controls ready to go. Some of those
    will be revisited and spiffed up as part of this project.
  </li>
  <li>
    I’ll post the control’s source code in the
    <a href="https://github.com/JanMiksovsky/quickui-catalog"
      >quickui-catalog repo on GitHub</a
    >. From there the source could get copied into any web app project. For now,
    QuickUI is designed for use with an accompanying markup language, but they
    could fairly easily be invoked from regular JavaScript. I’ll be working on
    better documenting how to do that.
  </li>
  <li>
    I’ll blog about the control here. This will likely include a look at one or
    two examples of sites using the control, and any thoughts on how the control
    came out. Additional related controls (like RotatingPagesWithDots, below)
    may fall out of the week’s work, and as time allows I will write up some of
    those as well.
  </li>
</ol>
<p>
  The project format and details will certainly evolve, but rather than plan
  that all out, I want to dive in and get started. So without further ado,
  here’s…
</p>
<p><strong>Control of the Week: Apple-Style SlidingPagesWithDots</strong></p>
<p>
  <a
    href="https://quickui.org/catalog/default.html#page=SlidingPagesWithDotsAbout"
    >SlidingPagesWithDots</a
  >
  presents its content as a horizontal sequence of pages in which navigation
  between pages shows a sliding animation. The classic representation of this
  control is found in the iOS app launcher:
</p>
<p>
  <img
    src="/images/flowstate/6a00d83451fb6769e2014e8c1fa9bb970d-pi.jpeg"
    alt="iPhone Standard Launch Screen"
  />
</p>
<p><strong>Key aspects</strong></p>
<ul>
  <li>
    This control renders its content as a set of pages, one of which is shown at
    a time.
  </li>
  <li>
    A set of small dots below the pages show the user how many pages there are;
    a highlighted button indicates the current page.
  </li>
  <li>The user can navigate horizontally.</li>
  <li>
    The pages slide left and right to provide a sense of physicality — even the
    unseen pages are conceptually “there”, just not seen.
  </li>
  <li>
    To increase physicality, navigation doesn’t wrap once the user reaches the
    first or last page. Navigating from the last to the first page shows all
    intermediate pages sliding quickly by.
  </li>
</ul>
<p>
  In a touch screen implementation like the one above, the user swipes left and
  right to navigate the pages. Apple’s store also uses this device in the “hero”
  element of a product page (e.g., the
  <a href="http://www.apple.com/macbookair/">MacBook Air</a> page) to rotate
  between product shots:
</p>
<p>
  <img
    src="/images/flowstate/6a00d83451fb6769e2014e8c1fa9c9970d-pi.png"
    alt="Apple Store Sliding Pages"
  />
</p>
<p>
  Here the pages automatically rotate once through on a timer; the user can also
  click a dot to navigate to a specific page.
</p>
<p><strong>Implementation</strong></p>
<p>
  Since iOS doesn’t (yet) make swiping easy to implement, for the implementation
  I’ve focused on the Apple Store-style example. The control renders each child
  as a separate page, so their visual treatment and behavior is completely open.
  The dots can be replaced with custom controls. A subclass of
  SlidingPagesWithDots called
  <a
    href="https://quickui.org/catalog/default.html#page=RotatingPagesWithDotsAbout"
    >RotatingPagesWithDots</a
  >
  adds the Apple Store rotation behavior; the rotation interval can be
  customized.
</p>
<p>
  As will likely become a common theme, getting this to work in Mozilla and
  WebKit was straightforward, and getting it to work in IE9 wasn’t too bad.
  Getting it to work in IE8 was an enormous pain that necessitated fixing some
  optimistic assumptions deep in the QuickUI framework. Furthermore, IE8&#39;s
  lack of border-radius support means that the circular&#0160;“dots” will
  degrade to squares. This could be addressed by falling back to a sprited image
  on IE8, but as I’d already spent more time than I’d intended on IE8, I’ve
  punted on that for now.
</p>
<p><strong>Usage notes</strong></p>
<p>
  This control seems useful for showing a small set of, say, 3-7 pages. The
  sliding animation is nice, but for high-frequency tasks could become annoying.
  The automatic rotation could be distracting in any situation where the user is
  forced to perform a task while the animation is playing. It seems more
  appropriate for, say, a site’s home page, where it could be used to
  temporarily highlight content in the hopes of showing something that interests
  the user.
</p>
