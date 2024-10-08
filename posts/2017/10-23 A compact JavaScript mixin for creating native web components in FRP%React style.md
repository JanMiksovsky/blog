---
title: A compact JavaScript mixin for creating native web components in FRP/React style
originalUrl: https://component.kitchen/blog/posts/a-compact-javascript-mixin-for-creating-native-web-components-in-frpreact-style
---

<p>
  Perhaps you like the benefits of functional reactive programming, but would
  like to create native web components with minimal overhead. This post explores
  a relatively simple JavaScript mixin that lets you author web components in a
  functional reactive programming (FRP) style modeled after React. This mixin
  focuses exclusively on managing state and determining when the state should be
  rendered. You can use this mixin with whatever DOM rendering technology you
  like: virtual-dom, hyperHTML, lit-html, plain old DOM API calls, etc.
</p>
<p>
  I spent several months this summer writing React and Preact components, and
  the values of an FRP model were immediately clear. As React advocates claim,
  using FRP does indeed make state easier to reason about and debug, code
  cleaner, and tests easier to write.
</p>
<p>
  I wanted to bring these reactive benefits to the
  <a href="https://component.kitchen/elix/">Elix web components</a>
  project which Component Kitchen leads. Elix already uses
  <a href="https://component.kitchen/elix/mixins">functional mixins</a>
  extensively for all aspects of component functionality for everything from
  accessibility to touch gestures. I wanted to see if it were possible to
  isolate the core of an FRP architecture into a functional mixin that could be
  applied directly to HTMLElement to create a reactive web component.
</p>
<p>
  You can use the resulting
  <a href="https://component.kitchen/elix/ReactiveMixin">ReactiveMixin</a>
  to create native web components in a functional reactive style. FRP frameworks
  often use a canonical increment/decrement component as an example. The
  ReactiveMixin version looks like this:
</p>

<pre>
  
    import ReactiveMixin from '.../ReactiveMixin.js';

    // Create a native web component with reactive behavior.
    class IncrementDecrement extends ReactiveMixin(HTMLElement) {

      // This property becomes the initial value of this.state at constructor time.
      get defaultState() {
        return { value: 0 };
      }

      // Provide a public property that gets/sets state.
      get value() {
        return this.state.value;
      }
      set value(value) {
        this.setState({ value });
      }

      // Expose "value" as an attribute.
      attributeChangedCallback(attributeName, oldValue, newValue) {
        if (attributeName === 'value') {
          this.value = parseInt(newValue);
        }
      }
      static get observedAttributes() {
        return ['value'];
      }

      // … Plus rendering code, with several options for rendering engine
    }

    customElements.define('increment-decrement', IncrementDecrement);

</pre>

<p>
  <a href="https://codepen.io/JanMiksovsky/pen/WLwjwL?editors=1010"
    >Live demo</a
  >
</p>
<p>
  You end up with something that’s very similar to React’s Component class (or,
  more specifically, PureComponent), but is a native HTML web component. The
  compact mixin provides a small core of features that enable reactive web
  component development in a flexible way.
</p>

<h2>Defining state</h2>
<p>
  ReactiveMixin gives the component a member called <code>this.state</code>, a
  dictionary object with all state defined by the component and any of its other
  mixins. The <code>state</code> member, which is read-only and immutable, can
  be referenced during rendering, and to provide backing for public properties
  like the <code>value</code>
  getter above.
</p>
<p>
  ReactiveMixin provides a <code>setState</code> method the component invokes to
  update its own state. The mixin sets the initial state in the constructor by
  passing the value of the <code>defaultState</code> property to
  <code>setState</code>.
</p>

<h2>Detecting state changes</h2>
<p>
  When you call <code>setState</code>, ReactiveMixin updates the component’s
  state, and then invokes a <code>shouldComponentUpdate</code> method to
  determine whether the component should be rerendered.
</p>
<p>
  The default implementation of <code>shouldComponentUpdate</code> method
  performs a shallow check on the state properties: if any top-level state
  properties have changed identity or value, the component is considered dirty,
  prompting a rerender. This is comparable to the similar behavior in
  <code>React.PureComponent</code>. In our explorations, we have found that our
  web components tend to have shallow state, so pure components are a natural
  fit. You can override this to provide a looser dirty check (like
  <code>React.Component</code>) or a tighter one (to optimize performance, or
  handle components with deep state objects).
</p>
<p>
  If there are changes <em>and</em> the component is in the DOM, the new state
  will be rendered.
</p>

<h2>Rendering</h2>
<p>
  This mixin stays intentionally independent of the way you want to render state
  to the DOM. Instead, the mixin invokes an internal component method whenever
  your component should render, and that method can invoke whatever DOM updating
  technique you like. This could be a virtual DOM engine, or you could just do
  it with plain DOM API calls.
</p>
<p>
  Here’s a plain DOM API render implementation for the increment/decrement
  example above. We’ll start with a template:
</p>
<pre>

    &lt;template id="template">
      &lt;button id="decrement">-&lt;/button>
      &lt;span id="value">&lt;/span>
      &lt;button id="increment">+&lt;/button>
    &lt;/template>

</pre>

<p>
  To the component code above, we’ll add an internal render method for
  ReactiveMixin to invoke. The mixin uses a <code>Symbol</code> object to
  identify the internal render method. This avoids name collisions, and
  discourages someone from trying to invoke the render method from the outside.
  (The render method can become a private method when JavaScript supports
  those.)
</p>

<pre>

    import symbols from ‘.../symbols.js’;

    // This goes in the IncrementDecrement class ...
    [symbols.render]() {
      if (!this.shadowRoot) {
        // On our first render, clone the template into a shadow root.
        const root = this.attachShadow({ mode: 'open' });
        const clone = document.importNode(template.content, true);
        root.appendChild(clone);
        // Wire up event handlers too.
        root.querySelector('#decrement').addEventListener('click', () => {
          this.value--;
        });
        root.querySelector('#increment').addEventListener('click', () => {
          this.value++;
        });
      }
      // Render the state into the shadow.
      this.shadowRoot.querySelector('#value').textContent = this.state.value;
    }

</pre>

<p>
  That’s all that’s necessary. The last line is the core bit that will update
  the DOM every time the state changes. The two buttons update state by setting
  the <code>value</code> property, which in turn calls <code>setState</code>.
</p>
<p>
  This ReactiveMixin would also be a natural fit with template literal libraries
  like
  <a href="https://github.com/PolymerLabs/lit-html/">lit-html</a> or
  <a href="https://github.com/WebReflection/hyperHTML/">hyperHTML</a>. That
  could look like:
</p>

<pre>

    import { html, render } from ‘.../lit-html.js’;
    import symbols from ‘.../symbols.js’;

    // Render using an HTML template literal.
    [symbols.render]() {
      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
      }
      const template = html`
        &lt;button on-click=${() => this.value-- }>-&lt;/button>
        &lt;span>${this.state.value}&lt;/span>
        &lt;button on-click=${() => this.value++ }>+&lt;/button>
      `;
      render(template, this.shadowRoot);
    }
  
</pre>

<p>
  The creation of the shadow root and the invocation of the rendering engine are
  boilerplate you could factor into a separate mixin to complement
  ReactiveMixin.
</p>

<h2>Web component and FRP lifecycle methods</h2>
<p>
  Since components created with this mixin are still regular web components,
  they receive all the standard lifecycle methods. ReactiveMixin augments
  <code>connectedCallback</code> so that a component will be rendered when it’s
  first added to the DOM.
</p>
<p>
  The mixin provides React-style lifecycle methods for
  <code>componentDidMount</code>
  (invoked when the component has finished rendering for the first time) and
  <code>componentDidUpdate</code> (whenever the component has completed a
  subsequent rerender). The mixin doesn’t provide
  <code>componentWillUnmount</code>; use the standard
  <code>disconnectedCallback</code> instead. Similarly, use the standard
  <code>attributeChangedCallback</code> instead of
  <code>componentWillReceiveProps</code>.
</p>

<h2>Conclusion</h2>
<p>
  This ReactiveMixin gives us much of what we like about React, but lets us
  write web components which are closer to the metal. All it does is help us
  manage a component’s state, then tell our component when it needs to render
  that state to the DOM. Separating state management from rendering is useful —
  we’ve already changed our minds about which rendering engine to use several
  times, but those changes entailed only minimal updates to our components.
</p>
<p>
  The coding experience feels similar to React’s, although I don’t see a need to
  make the experience identical. For example, I thought setState would work well
  as an `async` Promise-returning function so that you can wait for a new state
  to be applied. And it’s nice to avoid all the platform-obscuring abstractions
  (e.g., synthetic events) React pushes on you.
</p>
<p>
  We’re using this ReactiveMixin to rewrite the Elix components in a functional
  reactive style. That work is proceeding fairly smoothly, and we’re moving
  towards an initial 1.0 release of Elix that uses this approach in the near
  future. In the meantime, if you’d like to play with using this mixin to create
  web components, give it a try and let us know how it goes.
</p>
