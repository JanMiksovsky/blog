---
title: Nobody writes production web components in vanilla JS — so using a framework makes total sense
date: 2015-10-26 16:00 UTC
originalUrl: https://component.kitchen/blog/posts/nobody-writes-production-web-components-in-vanilla-js-so-using-a-framework-makes-total-sense
---

<p>
  You may hear someone say they avoid using React, Polymer, Angular, or some
  other framework du jour, and that they prefer to write their front end code in
  vanilla JavaScript instead. But when it comes to writing web components, it
  seems <em>everybody</em> ends up writing atop a framework — even if it&#39;s a
  tiny framework of their own devising. Production web components written in
  vanilla JS appear to be very rare.
</p>
<p>
  It seems there&#39;s just a bit too much work involved to meet even baseline
  expectations for a custom element. To handle instantiation, for example, you
  might need to:
</p>
<ol>
  <li><p>Create a shadow root on the new instance.</p></li>
  <li><p>Stamp a template into the shadow root.</p></li>
  <li>
    <p>
      Marshall any attributes from the element root to the corresponding
      component properties. This process breaks down into more work, such as:
    </p>
    <ul>
      <li>Loop over the set of attributes on the element.</li>
      <li>
        For each attribute, see if the component defines a corresponding
        property. If you want to support conventionally hyphenated attribute
        names (&quot;foo-bar&quot;), you&#39;ll want to first map those
        attribute names to conventionally camel-cased property names (fooBar).
      </li>
      <li>
        If the type of a target property is numeric or boolean, parse the
        string-valued attribute to convert it to a value of the desired type.
      </li>
      <li>Set the property to the value.</li>
    </ul>
  </li>
</ol>
<p>
  Given this amount of work to simply instantiate the component, it&#39;s easy
  to see why most efforts to create interesting components typically end up
  relying on shared code. You might write a single web component in vanilla JS,
  but as soon as you start your second component, you&#39;ll be dying to factor
  the boilerplate into shared code… And now you&#39;re constructing a framework.
</p>
<p>
  That&#39;s not necessarily a bad thing. It only means that, when you hear
  someone say that they want to write a component-based app, but don&#39;t want
  to use any framework at all, you have to take that with a grain of salt.
  It&#39;s possible the person has — perhaps unintentionally — ended up building
  the foundations of their own web component framework.
</p>
<p>
  Does it matter whether that code is called a framework? Wikipedia enumerates
  these
  <a href="https://en.wikipedia.org/wiki/Software_framework"
    >software framework</a
  >
  hallmarks:
</p>
<ul>
  <li>
    inversion of control (control flow dictated by the framework, not the code
    on top of it)
  </li>
  <li>default behavior</li>
  <li>extensibility</li>
  <li>non-modifiable framework code</li>
</ul>
<p>
  Given this definition, it seems hard to conclude that frameworks are bad per
  se. Surely there are good frameworks as well as bad frameworks.
</p>
<p>
  Perhaps one reason people shy away from the concept of a framework is that, as
  a framework achieves higher levels of abstraction, it becomes something
  tantamount to a domain-specific language. If you and I both thoroughly
  understand JavaScript, but we are using different JavaScript frameworks, then
  in practice we may not find each other&#39;s code mutually intelligible.
</p>
<p>
  Since the term &quot;framework&quot; can provoke strong negative reactions,
  authors of such code may actually care whether their code is labeled a
  framework or not. Google, for example, seems to take great pains to avoid
  describing its own Polymer project as a framework. They call it a
  &quot;library&quot;, which sounds perhaps smaller or less threatening. But
  Polymer easily meets all of the above framework criteria. For example,
  Polymer&#39;s internal asynchronous task-scheduling infrastructure establishes
  the flow of control in a Polymer application, determining when to invoke
  component lifecycle callbacks and property observers.
</p>
<p>
  Whether you like the idea of a framework or not, when it comes to web
  components, the DOM API is so rudimentary that, in practice, that API alone
  does not provide a sufficient framework for web component development. As long
  as that remains the case, the use of a JavaScript web component frameworks
  seems unavoidable. If you really, really want to avoid writing or using code
  that meets the above definition of &quot;framework&quot;, perhaps you can do
  so and still be productive, but that seems like a hard way to go.
</p>
<p>
  For our own work, we <em>want</em> to be using a popular web component
  framework, be it Polymer or something else. If our alternative were to write a
  proprietary, ad hoc framework of our own, which was shared by no one else, we
  would likely waste a lot of time solving problems others have already solved.
</p>
