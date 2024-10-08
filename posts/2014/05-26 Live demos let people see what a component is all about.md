---
title: Live demos let people see what a component is all about
originalUrl: https://component.kitchen/blog/posts/live-demos-let-people-see-what-a-component-is-all-about
---

<p>
  We recently added live demos to the Component Kitchen site for all components
  that define a demo. Components with demos are marked on the
  <a href="https://component.kitchen">home page</a> with a "DEMO" indicator, so
  you can check out all the demos.
</p>
<p>
  We always want to make it as easy as possible to find interesting components,
  and demos are obviously the quickest way for someone to really understand what
  a component can do for them. From the beginning of our work on the service,
  we've wanted to host demos <em>in situ</em> on the pages we build for
  components. We want to let a user looking for a component to see the demos
  front and center (without having to link off to another site just to see a
  demo) so they can quickly find what they're looking for.
</p>
<p>
  As described in our evolving
  <a href="https://component.kitchen/docs/developers">developer documentation</a
  >, for the time being, you'll need to host the demo at a site you maintain
  (e.g., a GitHub Pages site for your component repository). You can then
  include a @demo line in the comments at the top of your component's main
  source file to indicate where the component is. We've also seen some
  conventions emerge whereby a component can imply the location of a demo, and
  we try to detect when one of those conventions is in use as well, but use of
  the @demo indicator is the clearest way to point to a demo.
</p>
<p>
  We host demos within an iframe, but traditional iframes make it hard to
  seamlessly incorporate content from another site, and in particular, the page
  hosting the iframe can't know how <em>tall</em> the framed page is. While it's
  fine for us to define a default height for a framed demo, we really want demo
  authors to be able to control how tall the demo is. Some components, for
  example, are really small, and so it'd be nicer to have the iframe showing the
  demo be exactly the height it needs to be.
</p>
<p>
  The standard way to securely communicate across a frame boundary is a facility
  called window.postMessage(). That approach is somewhat cumbersome to use,
  however. What we really wanted was a way to package that communication up. A
  web component was, of course, a great way to do that! We've published our
  solution through our companion of open source project,
  <a href="https://github.com/basic-web-components">basic-web-components</a>.
  There you'll find two components that work together,
  <a
    href="https://component.kitchen/components/basic-web-components/basic-seamless-iframe"
    >basic-seamless-iframe</a
  >, which goes on the <em>framing</em> page, and
  <a
    href="https://component.kitchen/components/basic-web-components/basic-framed-content"
    >basic-framed-content</a
  >, which goes on the <em>framed</em> page. These components cooperatively
  communicate across the frame boundary so that, among other things, the outer
  page can correctly adjust the height of the frame.
</p>
<p>
  So, if you'd like to have your demo auto-size when shown on our site, just add
  the basic-framed-content component to your project, and wrap the contents of
  your demo in an instance of &lt;basic-framed-content&gt;. The latter won't
  interfere with anything when someone views the demo on your site, but when
  someone views your component on Component Kitchen, the demo will communicate
  its height to the framing page so that the demo looks just right.
</p>
