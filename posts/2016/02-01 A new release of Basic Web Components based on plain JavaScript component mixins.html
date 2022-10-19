---
title: A new release of Basic Web Components based on plain JavaScript component mixins
date: 2016-02-01 16:00 UTC
originalUrl: https://component.kitchen/blog/posts/a-new-release-of-basic-web-components-based-on-plain-javascript-component-mixins
---

<p>
  As discussed in this blog over the past few months, we've been plotting a
  strategy for creating web components using a library of plain JavaScript
  mixins instead of a monolithic component framework. We've just published a new
  0.7 release of the
  <a href="https://github.com/basic-web-components/basic-web-components"
    >basic-web-components</a
  >
  project that represents a transition to this mixin strategy. So far, this
  approach appears to be working well, and meeting our expectations.
</p>
<p>What's changed?</p>
<ol>
  <li>
    <strong>We've begun rewriting all our components in ES6.</strong>
    So far, we've rewritten the
    <a
      href="https://github.com/basic-web-components/basic-web-components/tree/master/packages/basic-autosize-textarea"
      >basic-autosize-textarea</a
    >,
    <a
      href="https://github.com/basic-web-components/basic-web-components/tree/master/packages/basic-carousel"
      >basic-carousel</a
    >, and
    <a
      href="https://github.com/basic-web-components/basic-web-components/tree/master/packages/basic-list-box"
      >basic-list-box</a
    >
    components in ES6. We transpile the ES6 source to ES5 using Babel.
    Developers wanting to incorporate the components into ES6 applications can
    consume the original source, while devs working in ES5 can still easily
    incorporate these components into their applications.
  </li>
  <li>
    <strong
      >We have restructured the way we distribute these components to use npm 3
      instead of Bower.</strong
    >
    The primary basic-web-components repository is now a monorepo: a single
    repository used to manage multiple packages separately registered with npm.
    This is much, much easier for us to maintain than our prior arrangement, in
    which Bower had forced us to maintain a constellation of separate
    repositories for our Bower packages. Using npm for web component
    distribution will likely bring its own challenges, but we're confident the
    much larger npm community will address those issues over time.
  </li>
  <li>
    <strong
      >Because we are just using JavaScript now, component files can be included
      with regular script tags instead of HTML Imports.</strong
    >
    That erases any concerns about cross-browser support for HTML Imports, and
    generally simplifies including these web components in an existing
    application build process. For example, instead of requiring use of a
    specialized tool like Vulcanize, developers can incorporate Basic Web
    Components into their applications using more popular tools like Browserify
    and WebPack.
  </li>
  <li>
    <strong
      >We are now offering a library of web component JavaScript mixins.</strong
    >
    See this
    <a
      href="/posts/2015/12-07-building-web-components-from-a-loose-framework-of-mixins.html"
      >blog post</a
    >
    for some background on that strategy. Mixins
    <a
      href="/posts/2016/01-05-implementing-web-component-mixins-as-functions.html"
      >take the form of functions</a
    >
    that can be applied to any component class without requiring a common
    runtime or framework. These mixins are collected in a new package,
    <a
      href="https://github.com/basic-web-components/basic-web-components/tree/master/packages/basic-component-mixins"
      >basic-component-mixins</a
    >. See that package for details, including documentation our initial set of
    25 web component mixins. We believe this arrangement will make it much
    easier for people to adopt key features of the Basic Web Components in their
    own components.
  </li>
</ol>
<p>
  As we first noted when we first looked at
  <a
    href="/posts/2015/11-02-an-evaluation-of-polymer-micro-as-a-minimal-web-component-framework.html"
    >using polymer-micro instead of full Polymer</a
  >, there are some distinct downsides to moving away from full Polymer:
</p>
<ul>
  <li>
    We can no longer use Polymer's Shady DOM to emulate Shadow DOM on older
    browsers, so anyone targeting browsers other than Google Chrome must include
    the full webcomponents.js polyfill. However, all four browser vendors are
    racing to implement native Shadow DOM v1, and it seems likely we will see
    all of them deliver native supoprt later this year. While using the full
    polyfill incurs a performance penalty today, we are very happy to be writing
    code that is squarely aimed at the future.
  </li>
  <li>
    We are left for the time being without a simple way to let developers style
    our components. Polymer provided a plausible styling solution, although it's
    based on CSS Variables (not in all browsers yet), and relies on proprietary
    extensions to CSS Variables (non-standard; unlikely to appear in any browser
    soon). So styling remains an issue for us — but then again, it's currently
    an unsolved problem for web components generally.
  </li>
</ul>
<p>
  Overall, for our project, we think the advantages of writing in plain
  JavaScript outweight any disadvantages. We're very happy to be able to write
  highly functional web components without having to use a monolithic framework
  and an accompanying required runtime. And so far, our mixin strategy is
  letting us maintain an elegant factoring of our component code, while avoiding
  the limitations of a single-inheritance class hierarchy.
</p>
<p>
  That said, we think frameworks are certainly an appropriate tool for many
  teams. For certain projects, we enjoy working in frameworks such as Polymer
  and React. One of the tremendous advantages of web components is that they're
  a <em>standard</em>. That lets us write our components in the way that makes
  most sense for us, while still allowing anyone to incorporate those components
  into applications written in other ways. In particular, Polymer remains the
  most active web component framework, so interop with Polymer is a critical
  feature for all our components. As a simple demonstration, we've posted a
  <a href="https://github.com/basic-web-components/carousel-with-tabs"
    >carousel-with-tabs</a
  >
  example showing use of our basic-carousel component with Polymer's paper-tabs
  component.
</p>
