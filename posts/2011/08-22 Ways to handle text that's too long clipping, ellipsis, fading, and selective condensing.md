---
title: "Ways to handle text that's too long: clipping, ellipsis, fading, and selective condensing"
originalUrl: https://miksovsky.blogs.com/flowstate/2011/08/handling-long-text.html
---

<p>
  Every UI that renders textual data has to cope with the question of what to do
  when text is too long to fit in the space allocated for it in the UI. Here are
  some basic approaches:
</p>
<p>
  <strong>Clipping.</strong> This is straightforward to do, and the result looks
  clean. If the text gets clipped in the middle of a word or, ideally, a letter,
  it will be obvious to a user what’s happened. In some cases, a column of
  clipped letters can create a virtual border, avoiding the need for an explicit
  border. (See this
  <a
    href="/posts/2011/04-04-start-with-a-stripped-down-visual-design-and-slowly-add-elements-back-in.html"
    >discussion of Cozi’s Month view</a
  >.) The biggest risk is that text will get clipped at a word boundary, and the
  user will be unaware (or unsure) there is more content.
</p>
<p>
  <img
    src="/images/flowstate/6a00d83451fb6769e2015390d37887970b-pi.png"
    alt="Long Text - Clipped"
  />
</p>
<p>&#0160;</p>
<p>
  <strong>Ellipsis. </strong>The traditional client OS solution is to remove the
  last character or two that would have fit, and replace those with an ellipsis
  (…). The user is easily made aware of missing text. This strategy requires the
  ability to quickly measure the width of text runs at runtime—an ability
  current browsers lack—to determine where the ellipsis should go.
</p>
<p>
  <img
    src="/images/flowstate/6a00d83451fb6769e2015434a6f093970c-pi.png"
    alt="Long Text - Ellipsis"
  />
</p>
<p>
  One minor disadvantage of this technique is that, even when this approach is
  possible, it can lead to visual clutter if many lines of text will be so long
  that they require ellipsis. One variant of the ellipsis technique is employed
  by OS/X’s Finder and various IDEs, using ellipsis in the <em>middle </em>of a
  text run. This is particularly useful when showing long URLs or file paths,
  where the final page or file name is probably more interesting than a long
  list of directories in the middle. As a side benefit, this also reduces visual
  clutter in cases where many lines of text require ellipsis.
</p>
<p>&#0160;</p>
<p>
  <strong>Fading.</strong> This strategy employs an alpha-blended gradient on
  the right edge (or, for blocks of text, on the bottom) to make the text appear
  as if it has faded out. This technique, which looks quite clean, is beginning
  to get more popular as modern browsers support alpha-blended gradients. (See
  the QuickUI
  <a href="https://quickui.org/gallery/default.html#page=FaderAbout">Fader</a>
  control for sample code.)
</p>
<p>
  <img
    src="/images/flowstate/6a00d83451fb6769e2015390d37898970b-pi.png"
    alt="Long Text - Faded"
  />
</p>
<p>&#0160;</p>
<p>
  <strong>Selective condensing.</strong> This tactic can be combined with any of
  the above techniques. Long strings are rendered with tighter kerning or in a
  condensed font variant, permitting extra characters to be shown which would
  have otherwise not been visible. If this effect is handled carefully, users
  may not even be aware of it. Like ellipsis, condensing requires the ability to
  measure text length. This is still not trivial in a web browser, which will
  generally require text to be added to the DOM before its width can be
  measured, but can be done by rendering text in an element with “visibility:
  hidden”. (See the sample QuickUI
  <a href="https://quickui.org/gallery/default.html#page=TextCondenserAbout"
    >TextCondenser</a
  >
  control.)
</p>
<p>
  <img
    src="/images/flowstate/6a00d83451fb6769e2015390d378a7970b-pi.png"
    alt="Long Text - Condensed"
  />
</p>
