---
title: Writing a web component that wraps a standard HTML element might alleviate the need for "is" syntax
originalUrl: https://component.kitchen/blog/posts/writing-a-web-component-that-wraps-a-standard-html-element-might-alleviate-the-need-for-is-syntax
---

<p>
  What if you want to create a web component that extends the behavior of a
  standard HTML element like a link? An early draft of the Custom Elements
  specification allowed you to do this with a special syntax, but the fate of
  that syntax is in doubt. We've been trying to create custom variations of
  standard elements <em>without</em> that support, and wanted to share our
  progress. Our results are mixed: more positive than we expected, but with some
  downsides.
</p>

<h2>Why would you want to extend a standard HTML element?</h2>
<p>
  Perhaps there's a standard element does <em>almost</em> everything you want,
  but you want it to give it custom properties, methods, or behavior.
  Interactive elements like links, buttons, and various forms of input are
  common examples.
</p>
<p>
  Suppose you want a custom anchor element that knows when it's pointing to the
  page the user is currently looking at. Such a situation often comes up in
  navigation elements like site headers and app toolbars. On our own site, for
  example, we have a header with some links at the top to our
  <a href="https://component.kitchen/tutorial">Tutorial</a> and
  <a href="https://component.kitchen/about">About Us</a> pages. If the user's
  currently on the About Us page, we want to highlight the About Us link so the
  user can confirm their location:
</p>
<figure>
  <a href="https://component.kitchen/about">
    <img
      src="/images/ck/Component Kitchen Toolbar.png"
      style="max-width: 100%"
    />
  </a>
</figure>
<p>
  While such highlighting is easy enough to arrange through link styling and
  dynamically choosing CSS classes in page templates, it seems weird that a link
  can't just handle this highlighting itself. The link should be able to just
  combine the information it already has access to — its own destination, and
  the address of the current page — and determine for itself whether to apply
  highlighting.
</p>
<p>
  We recently released a simple component called
  <a
    href="https://github.com/basic-web-components/basic-web-components/tree/master/packages/basic-current-anchor"
    >basic-current-anchor</a
  >
  that does this. We did this partly because it's a modestly useful component,
  and also because it's a reasonable testing ground for ways to extend the
  behavior of a standard element like an anchor.
</p>
<p>
  What's the best way to implement a component that extends a standard element?
</p>

<h2>Option 1: Recreating a standard element from scratch (Bad idea)</h2>
<p>
  Creating an anchor element completely from scratch turns out to be ferociously
  complicated. You'd think you could just apply some styling to make an element
  blue and underlined, define an <code>href</code> attribute/property, and then
  open the indicated location when the user clicks. But there's far more to an
  anchor element than that. A sample of the problems you'll face:
</p>
<ol>
  <li>
    The result of clicking the link depends on which modifier keys the user is
    pressing when they click. They may want to open the link in a new tab or
    window, and the key they usually press to accomplish that varies by browser
    and operating system.
  </li>
  <li>You'll need to do work to handle the keyboard.</li>
  <li>
    Standard links can change their color if the user has visited the
    destination page. That knowledge of browser history is not available to you
    through a DOM API, so your custom anchor element won't know which color to
    display.
  </li>
  <li>
    When you hover over a standard <code>&lt;a&gt;</code> element, the browser
    generally shows the link destination in a status bar. But there is
    <em>no way to set the status bar text in JavaScript</em>. That's probably a
    good thing! It would be annoying for sites to change the status bar for
    nefarious purposes. But even with a solid justification for doing so, your
    custom anchor element has no way to show text in the status bar.
  </li>
  <li>
    Right-clicking or long-tapping a standard link produces a context menu that
    includes link-specific commands like "Copy Address". Again, this is a
    browser feature to which you have no access in JavaScript, so your custom
    anchor element can't offer these commands.
  </li>
  <li>
    A standard anchor element has a number of accessibility features that are
    used by users with screen readers and other assistive techologies. While you
    can work around the problem to some extent with ARIA, there are numerous
    <a
      href="https://github.com/domenic/html-as-custom-elements/blob/master/docs/accessibility.md"
      >gaps in implementing accessibilty</a
    >
    completely from scratch.
  </li>
</ol>
<p>
  Given this (likely incomplete) litany of problems, we view this option as a
  non-starter, and would strongly advise others to not go down this road. It's a
  terrible, terrible idea.
</p>

<h2>Option 2: Hope/wait for is="" syntax to be supported</h2>
<p>
  The original Custom Elements spec called for an <code>extends</code> option
  for <code>document.registerElement()</code> to indicate the tag of a standard
  element you wanted to extend:
</p>
<pre>
  class MyCustomAnchor { ... }
  document.registerElement('my-custom-anchor', {
    prototype: MyCustomAnchor.prototype,
    extends: 'a'
  });
</pre>
<p>
  Having done that, you could then create your custom variant of the standard
  element by using the standard tag, and then adding an <code>is</code>
  attribute indicating the name of your element.
</p>
<pre>
  &lt;body&gt;
    &lt;a is="my-custom-anchor" href="https://example.com"&gt;A custom link&lt;/a&gt;
  &lt;/body&gt;
</pre>
<p>
  However, at a W3C committee meeting in January, Apple indicated that they felt
  like this feature would likely generate many subtle problems. They do not want
  such problems to jeopardize the success of Custom Elements v1.0, and have
  argued that it should be excluded from the Custom Elements specification for
  now. Google and others would like to see this feature remain. But without
  unanimous support, the feature's future is unclear, and we're reluctant to
  depend on it.
</p>

<h2>
  Option 3: Use the Shadow DOM polyfill just for elements with
  <code>is</code> attributes
</h2>
<p>
  The
  <a href="https://github.com/webcomponents/webcomponentsjs"
    >web component polyfills</a
  >
  already support the <code>is=""</code> syntax, so in theory you could keep
  using the polyfill even in browsers where native Shadow DOM is available. But
  that feels weird for a couple of reasons. First, the polyfill won't load if
  native Shadow DOM is available, so you'd have to subvert that behavior. You'd
  have to keep just enough of the polyfill alive to handle just custom element
  instances using the <code>is=""</code> syntax. That doesn't sound like fun.
  And, second, if <code>is=""</code> isn't offically endorsed by all the
  browsers, it's future is somewhat uncertain, so it's seems somewhat risky to
  invest in it.
</p>
<p>
  You could also try to manually reproduce what the Shadow DOM polyfill is
  doing, but that seems like an even worse answer. Your approach won't be
  standard even in name, and so you'll create a burden for people that want to
  use your component.
</p>

<h2>Option 4: Wrap a standard element</h2>
<p>
  Since we think it's inadvisable to recreate standard elements from scratch
  (option 1 above), and are nervous about depending on a standard syntax in the
  near future (options 2 and 3), we want to explore other options under our
  control. The most straightforward alternative seems to be wrapping a standard
  element. The general idea is to create a custom element that exposes the same
  API as a standard element, but delegates all the work to a real instance of a
  standard element sitting inside the custom element's Shadow DOM subtree. This
  sort of works, but with some important caveats.
</p>
<p>
  The process of wrapping a standard element is consistent enough across all
  standard element types that we can try to find a general solution. We've made
  our initial implementation available in the latest v0.7.3 release of
  <a href="https://github.com/basic-web-components/basic-web-components"
    >Basic Web Components</a
  >, in the form of a new base class called
  <a
    href="https://github.com/basic-web-components/basic-web-components/tree/master/packages/basic-wrapped-standard-element"
    >WrappedStandardElement</a
  >. This component serves both as a base class for wrapped standard elements,
  and a class factory that generates such wrappers.
</p>
<p>
  We've used this facility to refactor an existing component called
  <a
    href="https://github.com/basic-web-components/basic-web-components/tree/master/packages/basic-autosize-textarea"
    >basic-autosize-textarea</a
  >
  (which wraps a standard textarea), and deliver a new component,
  <a
    href="https://github.com/basic-web-components/basic-web-components/tree/master/packages/basic-current-anchor"
    >basic-current-anchor</a
  >. The latter wraps a standard anchor element to deliver the feature discussed
  above: the anchor marks itself as current if it points to the current page.
  You can view a simple
  <a
    href="http://basicwebcomponents.org/basic-web-components/packages/basic-current-anchor/"
    >demo</a
  >.
</p>
<p>The definition of basic-current-anchor wraps a standard anchor like this:</p>
<pre>
  // Wrap a standard anchor element.
  class CurrentAnchor extends WrappedStandardElement.wrap('a') {
    // Override the href property so we can do work when it changes.
    get href() {
      // We don't do any custom work here, but need to provide a getter so that
      // the setter below doesn't obscure the base getter.
      return super.href;
    }
    set href(value) {
      super.href = value;
      /* Do custom work here */
    }
  }
  document.registerElement('basic-current-anchor', CurrentAnchor);
</pre>
<p>
  The <code>WrappedStandardElement.wrap('a')</code> returns a new class that
  does several things:
</p>
<ol>
  <li>
    The class' <code>createdCallback</code> creates a Shadow DOM subtree that
    contains an instance of the standard element being wrapped. A runtime
    instance of <code>&lt;basic-current-anchor&gt;</code> will look like this:
    <pre>
  &lt;basic-current-anchor&gt;
    #shadow-root
      &lt;a id="inner"&gt;
        &lt;slot&gt;&lt;/slot&gt;
      &lt;/a&gt;
  &lt;/basic-current-anchor&gt;</pre
    >
    Note that the inner <code>&lt;a&gt;</code> includes a
    <code>&lt;slot&gt;</code> element. This will render any content inside the
    <code>&lt;basic-current-anchor&gt;</code> inside the standard
    <code>&lt;a&gt;</code> element, which is what we want.
  </li>
  <li>
    All getter/setter properties in the API of the wrapped standard class are
    defined on the outer wrapper class and forwarded to the inner inner
    <code>&lt;a&gt;</code> element. Here, CurrentAnchor will end up exposing
    HTMLAnchorElement properties like <code>href</code> and forwarding those to
    the inner anchor. Such forwarded properties can be overridden, as shown
    above, to augment the standard behavior with custom behavior. Our
    CurrentAnchor class overrides <code>href</code> above so that, if the
    <code>href</code> is changed at runtime, the link updates its own visual
    appearance.
  </li>
  <li>
    Certain events defined by standard elements will be re-raised across the
    Shadow DOM boundary. The Shadow DOM spec defines a list of
    <a
      href="https://www.w3.org/TR/shadow-dom/#h-events-that-are-not-leaked-into-ancestor-trees"
      >events that will not bubble up across a Shadow DOM boundary</a
    >. For example, if you wrap a standard <code>&lt;textarea&gt;</code>, the
    <code>change</code> event on the textarea will <em>not</em> bubble up
    outside the custom element wrapper. That's an issue for components like
    <a
      href="https://github.com/basic-web-components/basic-web-components/tree/master/packages/basic-autosize-textarea"
      >basic-autosize-textarea</a
    >. Since Shadow DOM normally swallows <code>change</code> inside a shadow
    subtree, someone using basic-autosize-textarea wouldn't be able to listen to
    <code>change</code> events coming from the inner textarea. To fix that,
    WrappedStandardElement automatically wires up event listeners for such
    events on the inner standard element. When those events happen, the custom
    element will re-raise those events in the light DOM world. This lets users
    of basic-autosize-textarea listen to <code>change</code> events as expected.
  </li>
</ol>
<p>
  Because this approach uses a real instance of the standard element in
  question, many aspects of the standard element's behavior work as normal for
  free. For example, an instance of <code>&lt;basic-current-anchor&gt;</code>
  will exhibit all the appearance and behavior of a standard
  <code>&lt;a&gt;</code> described above. That includes mouse behavior, status
  bar behavior, keyboard behavior, accessibility behavior, etc. That's a huge
  relief!
</p>
<p>
  But this approach has one significant limitation: styling. Because our custom
  element isn't called "a", CSS rules that apply to <code>a</code> elements will
  no longer work. Link pseudo classes like <code>:visited</code> won't work
  either. Worse, because there's essentially no meaningful standard styling
  solution for web components that works across the polyfilled browsers, it's
  not clear how to provide a good styling solution.
</p>
<p>
  Things will become a little easier when CSS Variables are implemented
  everywhere, but even that is a sub-optimal solution to styling a wrapped
  standard element. For one thing, you would need to separately define new CSS
  variables for <em>every</em> attribute someone might want to style. That
  includes inventing variables to replace standard CSS pseudo-classes. Next,
  someone using your wrapped element would need to duplicate all the styling
  rules to use both the standard attributes and your custom CSS variables. That
  mess gets worse with each wrapped standard element added to a project, since
  each will likely to define different (or, worse, conflicting) variable names.
</p>
<p>
  For the time being, we're trying a different solution, which is to define the
  interesting CSS attributes on a wrapped element using the CSS
  <code>inherit</code> value. E.g., a <code>&lt;basic-current-anchor&gt;</code>
  element currently has internal styling for the inner standard anchor that
  effectively does this:
</p>
<pre>
  &lt;style&gt;
  a {
    color: inherit;
    text-decoration: inherit;
  }
  &lt;/style&gt;
</pre>
<p>
  What that means is that the inner anchor will have <em>no</em> color or text
  decoration (underline) by default. Instead, it will pick up whatever
  <code>color</code> or <code>text-decoration</code> is applied to the outer
  custom element. That's fairly close to what we want, but still not ideal. If
  someone neglects to specify a <code>color</code>, for example, they'll end up
  with links that are (most likely) black instead of the expected blue.
</p>
<p>
  In practice, we may be able to live with that. The typical use case for our
  basic-current-anchor component, for example, is in navigation elements like
  toolbars, where web applications nearly always provide custom link styling
  that overrides the standard colors anyway. That said, styling represents a
  significant complication in this wrapping approach, and should be carefully
  considered if trying this.
</p>

<h2>Wrapping up</h2>
<p>
  It would obviously be preferable for the Custom Elements specification to
  address the extension of standard elements when that becomes possible. But
  we're pragmatic, and would rather see Custom Elements v1.0 ship without
  <code>is=""</code> support if that means it comes sooner — as long as the
  problem is eventually solved correctly. Until then, wrapping a standard
  element may provide a stopgap solution to create a custom element extending
  standard behavior. It's not ideal, but may be sufficient for common cases.
</p>
<p>
  This is a complex area, and we could easily be overlooking things in our
  analysis. If you have thoughts on this topic, or know of an issue not
  discussed here, please give us a heads up!
</p>
