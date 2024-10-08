---
title: The Gold Standard checklist for web components
originalUrl: https://component.kitchen/blog/posts/the-gold-standard-checklist-for-web-components
---

<p>
  For the last few months, we've been excited to help a new open project get off
  the ground: the
  <a href="https://github.com/webcomponents/gold-standard/wiki"
    >Gold Standard checklist for web components</a
  >. The checklist’s goal is to define a consistent, high quality bar for web
  components.
</p>
<p>
  We believe web components should be every bit as predictable, flexible,
  reliable, and useful as standard HTML elements. When someone is working in
  HTML, they should be able to work as if all elements work the same. They
  shouldn’t need to learn a special set of constraints or limitations that apply
  to specific custom elements. They already know how standard HTML elements
  behave; new custom elements should behave just like that.
</p>
<p>
  The standard HTML elements establish an incredibly high bar for quality. For
  example, you can use the standard elements in any combination, and they’ll not
  only work, the result is usually predictable and reasonable. But, without a
  great deal of care, custom elements don’t support that same degree of
  flexibility by default. It’s all too easy to create a custom element that only
  works when it’s used in a very particular way.
</p>
<p>
  The project began by defining what it is that makes a standard HTML element
  <em>feel</em> like a standard HTML element. It seems no one before ever wrote
  down all the criteria that govern the expected behavior of a new standard HTML
  element. We all generally know how HTML elements should behave, and through
  careful design and testing, new standard elements eventually measure up to our
  expectations.
</p>
<p>
  You can think of this as a Turing Test for elements: if you were to encounter
  an unfamiliar element in HTML, could you tell whether it was a new standard
  element or a custom element? For most custom elements today, it wouldn’t take
  too long to discover some unexpected quirk or limitation in the element that
  would reveal its custom element nature. This is not for lack of dedication on
  the component author’s part. It could simply be the case that they hadn’t
  considered some aspect of standard element behavior.
</p>
<p>
  To address that, the Gold Standard checklist captures the expected behavior of
  a standard HTML element in a form that can guide the creation of new custom
  elements. The checklist covers a wide range of topics, from accessibility to
  performance to visual presentation. A component that meets that quality bar
  should be able to generally satisfy all the expectations of people using that
  component. This will greatly facilitating the component’s adoption and use.
</p>
<p>
  A variety of people, particularly from Google, have already contributed to the
  Gold Standard checklist in its draft stages, and continue to make
  contributions to the checklist in its new wiki form. The initial focus of the
  project has been to develop a solid set of top-level checklist items. It’s the
  hope of the project contributors that every item on the list will be backed by
  a detailed explanation of the checklist item: why it’s important, examples of
  what to do or not to do, sample source code, and other resources.
</p>
<p>
  If you’re interested in creating or using high-quality components, please take
  a look at the checklist. The project welcomes comments and suggestions as
  issues, or direct contributions through pull requests.
</p>
