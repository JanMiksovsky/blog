---
title: "Announcing QuickUI: a fast and powerful way to create web UI controls"
originalUrl: https://miksovsky.blogs.com/flowstate/2009/11/introducing-quickui-a-tool-for-creating-web-ui.html
---

<p>
  Today I want to announce the project I&#39;ve been working on as a hobby for
  most of the past year: <a href="https://quickui.org">QuickUI</a>, a framework
  for creating web user interface controls. The work on QuickUI has taken the
  place of my normal blog writing, hence the long hiatus here on flow|state.
</p>
<p>
  <strong>Why create a web control framework?<br /></strong>
</p>
<p></p>
<p>
  I couldn&#39;t find anything that met my needs. I was so completely frustrated
  by the dearth of good tools in the middle ground between image editors
  (PhotoShop), prototyping tools (I&#39;ve often used PowerPoint), HTML editors
  (e.g., DreamWeaver), and raw code using JavaScript UI frameworks and libraries
  (jQuery et al.). There are plenty of tools contending for this middle ground,
  but to me they seem to avoid working with the substance of the web—HTML, CSS,
  JavaScript—in favor of something that obscures those technologies (Cappucino,
  etc.) or does away with them altogether (Silverlight).
</p>
<p>
  I want to work in the real stuff of the web. The web is built with HTML, CSS,
  and JavaScript, so that&#39;s what I want to use. I just want to be more
  efficient doing so. The fact is, those technologies are riddled with
  idiosyncrasies, and I don&#39;t want to feel like I&#39;m solving the same
  problems over and over again. And it&#39;s not just me—the UI world wastes
  uncounted hours painfully (re)learning the various hacks to do something as
  simple as
  <a href="http://stackoverflow.com/questions/148251/css-centering-tricks"
    >centering something on the page</a
  >.
</p>
<p>
  For me, the worst problem with the web is that it lacks a native control
  framework. There&#39;s no way to easily bundle up a bunch of content, visual
  styling, and behavior into a reusable control. There are certainly JavaScript
  control frameworks (YUI, jQuery UI, etc.), but most seem to be either a very
  small library of common controls, or a set of utilities for writing controls
  on your own. Nothing seems to be scaling up to permit an <em>ecosystem </em>of
  controls. The Visual Basic 1.0 community had a more vibrant control ecosystem
  of VBX controls in 1991 than the web does nearly twenty years later.
</p>
<p>
  I&#39;m sure the HTML 5 team has worked long and hard to get to where they are
  today, but the last thing I need are new HTML tags with fixed semantics. What
  I want is to be able to write new tags and <em>define </em>their semantics.
  (<a href="http://msdn.microsoft.com/en-us/library/ms752059.aspx">XAML</a> is
  great, and would be incredible if it weren&#39;t proprietary.)
</p>
<p>
  A good framework should give me a way to package things up so that I can
  easily share those tags with other people—and they can share them with me. If
  we had a good control framework, someone could package up good solutions to
  common problems as live code. I wouldn&#39;t have to find the answer to my
  question on <a href="http://www.stackoverflow.com">StackOverflow</a> as little
  fragments of HTML, CSS or JavaScript embedded in text—the answer to my
  question would be a fully reusable piece of self-contained working code.
</p>
<p>
  <strong>A markup language for controls<br /></strong>
</p>
<p>
  The control framework I envisioned was built around a markup language that
  looked and felt like HTML, but defined controls (at any level of the UI)
  instead of only pages. The control would <em>define a new tag</em>, so it
  could be used inside of other controls just like a native HTML tag. As with
  HTML, the control markup would define document elements for the control&#39;s
  contents, a &lt;style&gt; tag for CSS defining the control&#39;s visual
  appearance, and a &lt;script&gt; tag for JavaScript defining the control&#39;s
  behavior. A control would be packaged up in a single file that could be added
  to a new UI project simply by copying the file into the project folder.
</p>
<p>
  This idea eventually took shape as QuickUI, and evolved into the release
  I&#39;m announcing today. For details and examples, including a full tutorial,
  please see the <a href="https://quickui.org">QuickUI</a> site. Here I&#39;ll
  simply mention that QuickUI currently comprises:
</p>
<ol>
  <li>The Quick markup language for defining new controls.</li>
  <li>
    A compiler for compiling Quick markup files into JavaScript and CSS files.
  </li>
  <li>
    A build tool for compiling a collection of Quick markup files and combining
    the generated output into a project-level .js and .css file.
  </li>
  <li>A JavaScript library used by QuickUI controls at run time.</li>
</ol>
<p></p>
<p>
  The QuickUI compiler and build tool are themselves written in C#, and I use
  the tools on Windows machines and Macs (via
  <a href="http://www.mono-project.com">Mono</a>) alike. (For the time being,
  I&#39;ve posted instructions only for Windows use, but hope to document Mac
  use soon.)
</p>
<p>
  The generated JavaScript makes use of the jQuery library to build the user
  interface on demand. QuickUI works well with jQuery, but should be able to
  interoperate with other JavaScript frameworks.
</p>
<p>
  Adding a compile-time step to web UI design is, admittedly, a hassle—but only
  a minor one. A small amount of tinkering with a reasonable development
  environment makes it possible to automatically invoke the QuickUI build tool
  whenever a Quick markup file is updated. These days I prefer Aptana Studio,
  and have documented steps for integrating QuickUI into that environment on the
  QuickUI site. Other tools make similar integration possible. With that in
  place, working in Quick markup feels only a small step removed from working in
  raw .html and .css files, and the productivity gains of a modular control
  framework quickly outstrip the minor inconvenience of compilation.
</p>
<p></p>
<p></p>
<p>
  <strong>So far, so good<br /></strong>
</p>
<p>
  I now use QuickUI almost exclusively to quickly prototype functional UI
  designs for <a href="http://www.cozi.com">Cozi</a>. I occasionally take
  recourse to PhotoShop to create image assets for inclusion in specific QuickUI
  controls, but the vast majority of my design work is now authored in Quick
  markup. The tools are good enough for my everyday use that I&#39;d never go
  back to working without such a framework. And, as I slowly build up a library
  of reusable controls, I&#39;m spending less and less time fighting old
  problems, and more time moving forward.
</p>
<p>
  I consider the current state of QuickUI to now be minimally interesting to
  others, hence this announcement. Nothing’s set in stone, and any part of it
  could be made better.
</p>
<p>
  If you&#39;re interested, please check out
  <a href="https://quickui.org">QuickUI</a> for yourself. You can post questions
  or comments on the discussion board there. If you like this and want to make
  it better, I would welcome the help.
</p>
