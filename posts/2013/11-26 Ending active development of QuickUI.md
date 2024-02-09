---
title: "Ending active development of QuickUI"
originalUrl: http://blog.quickui.org/2013/11/26/ending-active-development-of-quickui/
---

<p>
  I’ve decided to end further investment in the development of the QuickUI web
  user interface framework.
</p>
<p>
  I’ve spent the past half-year experimentally porting various QuickUI
  components to HTML custom elements under the rubric of a project called
  <a href="http://janmiksovsky.github.io/quetzal/">Quetzal</a>. That project
  makes use of Google’s
  <a href="http://www.polymer-project.org/">Polymer</a> project, which supports
  the deployment of web components to mainstream browsers. While the Quetzal
  element collection doesn’t yet offer the complete set of QuickUI components,
  and working on top of Polymer has been shaky at times, Polymer is becoming
  good enough for real use, and the advantages of building with web standards
  will quickly outweigh any proprietary advantages which QuickUI could offer.
</p>
<p>
  I started QuickUI a number of years ago because it seemed clear to me that a
  component-oriented approach to UI design and development would let you create
  better and more maintainable user experiences. I didn't see anyone else
  working on that in an open way, and so began my own effort to make progress in
  that area.
</p>
<p>
  The current wave of web component standards embody many of the ideas I was
  pursuing in QuickUI. For fun, I just dug up from my notes the earliest source
  code I could find for the component markup language I thought would be useful
  for creating web components. Here's sample QuickUI markup I wrote at the very
  beginning, probably late 2007:
</p>
<pre>
&lt;control name="taskPage" arguments="name pageTip content"&gt;
  &lt;style&gt;
    h1 { font-face: Arial; }
  &lt;/style&gt;
  &lt;script&gt;
  function foo() { }
  &lt;/script&gt;
  &lt;template&gt;
    &lt;div ...&gt;
      &lt;h1&gt;%name%&lt;/h1&gt;
      &lt;p class="pageTip"&gt;%pageTip%&lt;/p&gt;
      &lt;div id="#content"&gt;
        %content%
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/control&gt;</pre
>

<p>
  Here's the corresponding source code in late 2013 for the same custom element
  in Polymer:
</p>

<pre>
&lt;polymer-element name="task-page" attributes="name pageTip"&gt;
  &lt;script&gt;
  function foo() { }
  &lt;/script&gt;
  &lt;template&gt;
    &lt;style&gt;
      h1 { font-face: Arial; }
    &lt;/style&gt;
    &lt;div ...&gt;
      &lt;h1&gt;{{name}}&lt;/h1&gt;
      &lt;p class="pageTip"&gt;{{pageTip}}&lt;/p&gt;
      &lt;div id="#content"&gt;
        &lt;content&gt;&lt;/content&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/polymer-element&gt;</pre
>
<p>
  Aside from minor syntactic differences (curly braces are in vogue now instead
  of percent signs; "attributes" instead of "arguments"; the style tag needs to
  be inside the template instead of outside; the element name requires a
  hyphen), the source code is nearly identical. In other words, the source code
  I wanted to be able to write in 2007 is essentially the source code I can now
  write today. Hooray for the open web!
</p>
<p>
  Going forward I’ll be using web components for my own work rather than
  QuickUI. If you have been using QuickUI or were interested in QuickUI, I would
  encourage you to look at adopting web components instead, either through the
  Polymer project or through similar projects such as Mozilla’s <a
    style="font-style: inherit; line-height: 1.625"
    href="http://x-tags.org/"
    >x-tags</a
  >.
</p>

<p>
  I’ll continue to keep the quickui.org site live for the indefinite future. In
  particular, for the time being I’ll continue to use this blog to post thoughts
  on developing user interfaces, with a focus on using web components. To those
  of you that used QuickUI or provided feedback on it, I’d like to offer my warm
  thanks for all of your support. Best, Jan Miksovsky
</p>
