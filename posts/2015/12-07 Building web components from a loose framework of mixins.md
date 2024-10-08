---
title: Building web components from a loose framework of mixins
originalUrl: https://component.kitchen/blog/posts/building-web-components-from-a-loose-framework-of-mixins
---

<p>
  We think it&rsquo;s generally necessary to use
  <a
    href="/posts/2015/10-26-nobody-writes-production-web-components-in-vanilla-js-so-using-a-framework-makes-total-sense.html"
    >some sort of framework to develop web components</a
  >, but that framework may not have to be monolithic in nature. Instead, the
  framework might be built entirely as mixins on top of a kernel that enables
  <a
    href="/posts/2015/11-30-composing-mixins-to-make-a-solid-foundation-for-web-components.html"
    >mixin composition</a
  >. Rather than invoking a framework&rsquo;s class constructor, one would
  simply compose the desired mixins together to create an instantiable web
  component.
</p>
<p>
  We&rsquo;ve been prototyping a completely mixin-oriented approach to component
  development in a project called
  <a href="https://github.com/ComponentKitchen/core-component-mixins"
    >core-component-mixins</a
  >.
</p>
<ul>
  <li>
    This relies on the
    <a href="https://github.com/ComponentKitchen/Composable">Composable</a>
    facility as the kernel to compose mixins in JavaScript. An alternative mixin
    strategy could be used as long it retained the same general degree of
    expressiveness. It would be ideal if multiple web component frameworks could
    agree on a mixin architecture so that we could share some of these mixins.
    We&rsquo;d be happy to use a different mixin strategy in order to
    collaborate with more people.
  </li>
  <li>
    The repo&rsquo;s /src folder shows a core set of component mixins for
    template stamping, basic attribute marshaling, and Polymer-style automatic
    node finding. For example, the TemplateStamping mixin will add a
    createdCallback that creates a shadow root and clones into it the value of
    the component's template property:
    <pre>
import TemplateStamping from 'core-component-mixins/src/TemplateStamping';

class MyElement extends Composable.compose(HTMLElement, TemplateStamping) {
  get template() {
    return `
      &lt;style&gt;
      :host {
        font-weight: bold;
      }
      &lt;/style&gt;
      Hello, world.
    `;
  }
}
    </pre>
    Use of the TemplateStamping mixin takes care of details like shimming any
    <code>&lt;style&gt;</code> elements found in the template when running under
    the Shadow DOM polyfill.
  </li>
  <li>
    That /src folder contains a sample ReactiveElement base class that pre-mixes
    the three core mixins mentioned above to create a reasonable starting point
    for custom elements. The above example becomes:
    <pre>
import ReactiveElement from 'core-component-mixins/src/ReactiveElement';

class MyElement extends ReactiveElement {
  get template() {
    return `
      &lt;style&gt;
      :host {
        font-weight: bold;
      }
      &lt;/style&gt;
      Hello, world.
    `;
  }
}
    </pre>

    Use of the ReactiveElement class is entirely optional &mdash; you could just
    as easily create your own base class using the same mixins.
  </li>
  <li>
    The /demo folder shows some examples of components created with this
    mixin-based framework. such as
    <a
      href="https://github.com/ComponentKitchen/core-component-mixins/tree/master/demos/Hello%20World"
      >Hello World</a
    >
    example.
  </li>
  <li>
    A demo of a
    <a
      href="https://github.com/ComponentKitchen/core-component-mixins/tree/master/demos/X-Tag"
      >hypothetical X-Tag implementation</a
    >
    shows how a framework can use mixins to create its own custom element base
    class. In that demo, the hypothetical framework adds support for a mixin
    that provides X-Tag&rsquo;s &ldquo;events&rdquo; sugar, but leaves out the
    mixin for automatic node finding. The point is that frameworks and apps can
    opt in to the component features they want.
  </li>
  <li>
    In this approach, web component class definition is generally kept separate
    from custom element registration. That is, there&rsquo;s no required entry
    point like Polymer() to both create the class and register it in a single
    step. We personally feel that keeping those two steps separate makes each
    step clearer, but that&rsquo;s a matter of taste. If you feel that combining
    those steps makes your code easier to write or read, it&rsquo;s easy enough
    to accomplish that. The X-Tag demo shows how a framework could define an
    entry point for class definition and registration.
  </li>
  <li>
    The mixin architecture explicitly supports custom rules for composing
    specific properties. That&rsquo;s intended for cases like the
    &ldquo;properties&rdquo; key in Polymer behaviors, where object values
    supplied by multiple mixins need to get merged together. The Composable
    kernel supports that, although none of the demos currently show off that
    feature.
  </li>
</ul>
<p>
  Taken collectively, these core component mixins form the beginnings of a
  deliberately loose but useful framework for web component development.
  They&rsquo;re still rudimentary, but they already provide much of
  <a
    href="/posts/2015/11-02-an-evaluation-of-polymer-micro-as-a-minimal-web-component-framework.html"
    >what we need from a layer like polymer-micro</a
  >. We think this strategy confers a number of advantages:
</p>
<ol>
  <li>
    <strong>This is closer to the metal.</strong>
    The only new thing here is the concept of a mixin. Everything else is part
    of the web platform. There&rsquo;s no special class constructor required to
    perform black-box operations on a component. There&rsquo;s nothing new to
    master (like React&rsquo;s JSX or Polymer&rsquo;s &lt;dom-element&gt;)
    that&rsquo;s not already in the platform. There's no sugaring provided out
    of the box &mdash; and that&rsquo;s a good thing.
  </li>
  <li>
    <strong>Each mixin can focus on doing a single task really well.</strong>
    For example, the TemplateStamping mixin just creates a shadow root and
    stamps a template into it. The only real work it&rsquo;s doing is to
    normalize the use of native vs polyfilled Shadow DOM &mdash;&nbsp;that is,
    the work you&rsquo;d need to do anyway to work on all browsers today. Given
    the boilerplate nature of that task, it&rsquo;s reasonable to share that
    code with a mixin like this. Once all the browsers support Shadow DOM v1
    natively, this mixin could be simplified, or dropped entirely, without
    needing to rearchitect everything.
  </li>
  <li>
    <strong>You can stay as close to/far from the platform as you want.</strong>
    Most user interface frameworks take you far away from the platform in one
    giant step. Here you have fine-grained control over each step you take
    toward a higher level of abstraction. Each mixin takes you a tiny bit
    further away from the platform, and in exchange for the efficiency boost the
    mixin provides, you have to accept some trade-offs: performance, mystery,
    etc. That&rsquo;s an unavoidable price for sharing code, but at least this
    way you can decide how much you want to pay.
  </li>
  <li>
    <strong>There's a potential for cross-framework mixins.</strong>
    If multiple web component frameworks could agree on a mixin architecture,
    there&rsquo;d at least be a chance we could share good solutions to common
    higher-level problems at the sub-component level. When Component Kitchen
    creates a mixin to support, say, accessibility in a list-like web component,
    it would be great if we could make that available to people developing
    list-like web components in other frameworks. While any framework could in
    theory adopt some other framework&rsquo;s mixin format, mixins are usually
    intimately tied to a framework. Explicitly deciding to factor mixins into a
    separable concept may make cross-framework mixins more feasible.
  </li>
</ol>
<p>
  It&rsquo;s worth remembering that web components are, by their very nature,
  interoperable. If you decide to write a component using an approach like this,
  it&rsquo;s still available to someone who&rsquo;s using a different framework
  (Polymer, say). The reverse is also true. That means any team can pick the
  approach that works for them, while still sharing user interface elements at
  the component level.
</p>
<p>
  As we&rsquo;re experimenting with these mixin ideas in prototype form,
  we&rsquo;re opportunistically trying some other technology choices at the same
  time:
</p>
<ul>
  <li>
    These mixins are written in ES6. As the polymer-micro blog post mentioned,
    we&rsquo;re finding that ES6 makes certain things easy enough in JavaScript
    that we can use the DOM API directly, rather than relying on a framework for
    sugar. Transpiling with
    <a href="https://babeljs.io/">Babel</a>
    feels like a fine temporary solution while waiting for native ES6
    implementations in all browsers.
  </li>
  <li>
    While the core component mixins are written in ES6, they can still be used
    by plain ES5 apps. The
    <a
      href="https://github.com/ComponentKitchen/core-component-mixins/tree/master/demos/Hello%20World%20(ES5)"
      >Hello World (ES5)</a
    >
    demo shows this in practice.
  </li>
  <li>
    The TemplateStamping mixin assumes use of the Shadow DOM polyfill if you
    want to support browsers that don&rsquo;t yet support Shadow DOM. If the
    majority of the world&rsquo;s web users have a Shadow DOM v1-capable browser
    by, say, the second half of 2016, we think businesses might accept using the
    polyfill to support the shrinking number of users with older browsers. To
    the extent using that polyfill has issues, those issues should diminish over
    time.
  </li>
  <li>
    We use JavaScript module imports as the dependency mechanism rather than
    HTML Imports. That lets us leverage tools like
    <a href="http://browserify.org/">browserify</a>
    for concatenation rather than Vulcanize. So far, that&rsquo;s working okay.
    ES6 template strings let us easily embed HTML directly inside of JavaScript
    files, instead of putting JavaScript code inside of HTML files as we did
    with HTML Imports. Both packaging formats can work, but given the need for
    JavaScript modules anyway, it seems worthwhile for us to see what we can
    build with modules alone. One thing we miss: an equivalent of HTML
    Import&#39;s &ldquo;document.currentScript&rdquo; so that a module can load
    a resource from a path relative to the JavaScript source file.
  </li>
  <li>
    We&rsquo;re trying out npm as the primary means of component distribution.
    We think that npm 3&rsquo;s support for dependency flattening addresses much
    of the need for Bower. We think the combination of ES6 modules and npm may
    prove to be a better way to distribute components, so we&rsquo;re trying
    that out with this prototype to see if we could make the switch to dropping
    Bower entirely. So far, this feels very good.
  </li>
</ul>
<p>
  This mixin-based component framework isn&rsquo;t done, but feels like
  it&rsquo;s reached the point where it&rsquo;s &ldquo;good enough to
  criticize&rdquo;. Please share your feedback at;
  <a href="https://twitter.com/ComponentK">@Component</a>
  or
  <a href="https://plus.google.com/%2BComponentKitchen">+ComponentKitchen</a>.
</p>
