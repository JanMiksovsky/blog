---
title: "QuickUI 0.8.8 released"
originalUrl: http://blog.quickui.org/2012/01/30/quickui-0-8-8-released/
---

<p>A small breaking change in this release:</p>
<ul>
  <li>
    The "name" attribute on top-level &lt;Control&gt; tags has been changed to
    "className". Before:
  </li>
</ul>
<blockquote>&lt;Control name="MyControl"&gt;</blockquote>
<p>Now:</p>
<blockquote>&lt;Control className="MyControl"&gt;</blockquote>
<p>
  This change allows some consistency with the run-time function className(),
  and also reduces the chances for confusion if a Control class itself wants to
  define a "name" property. This is a breaking change, so markup users will need
  to download/build the latest qb tool, and force a rebuild of their project.
</p>
