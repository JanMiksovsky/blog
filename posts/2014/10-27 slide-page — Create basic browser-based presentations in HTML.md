---
title: "slide-page — Create basic browser-based presentations in HTML"
originalUrl: https://component.kitchen/blog/posts/slide-page-create-basic-browser-based-presentations-in-html
---

<p>
  There are already a number of web components that wrap existing slide-based
  presentation libraries; slide-page is notable for being written from the
  ground up with web components. The
  <a href="https://github.com/unbug/slide-page/blob/master/slide-page.html"
    >source code</a
  >
  for the core component is little more than a wiring together of existing parts
  in a novel combination. That approach is, in fact, <em>exactly right</em>, and
  component writing at its best! This component mostly adds sequential arrow
  button navigation around Polymer's core-animated-pages component. For the
  buttons, it takes advantage of Google's Material Design theme, specifically
  the Paper floating action button.
</p>
<p>
  <strong>Likes:</strong>
  Great use of existing Polymer and Paper components; some keyboard navigation.
</p>
<p>
  <strong>Dislikes:</strong>
  The stock appearance shows a "Powered by Polymer" banner that few people are
  going to want. It's possible to turn it off through styling, but we like
  components whose default appearance is the most practical starting point.
</p>
<p>
  <a href="https://github.com/unbug/slide-page">View slide-page on GitHub</a>
</p>
