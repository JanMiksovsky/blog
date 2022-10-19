---
title: Supporting both automatic and manual registration of custom elements
date: 2019-10-07 16:00 UTC
originalUrl: https://component.kitchen/blog/posts/supporting-both-automatic-and-manual-registration-of-custom-elements
---

The latest [Elix](https://component.kitchen/elix) 8.0 release now lets you control how the Elix components are registered as custom elements. This post provides a summary of the complex topic of registering elements, then describes how Elix 8.0 addresses those complexities.

## Background: Why you need to register components as custom elements

The browser standard for [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) lets you create your own HTML elements in two steps: 1) create a class that inherits from `HTMLElement`, and 2) register that class with the browser using a unique tag name. You can then instantiate the class:

```js
class MyElement extends HTMLElement {} // Step 1: create class
customElements.define("my-element", MyElement); // Step 2: register class

const myElement = new MyElement(); // Ready for use
```

The registered tag name (above, `my-element`) gives the browser a way to represent instances of the element in the DOM, where all element nodes must have a tag (a.k.a. `localName`). That tag lets the browser know how it should represent the node in HTML representations, such as in the `innerHTML` of some containing element. The requirement that a class only gets registered _once_ ensures a clear mapping from DOM to HTML.

That said, the fact that each class must be registered once — and only once — creates a burden for component users. It would be great if, instead, you could define components like the ones in the Elix library in one step:

```js
import Carousel from "elix/src/Carousel.js"; // Import class
const carousel = new Carousel(); // Use class
```

but this will throw if the element class hasn’t been registered.

_Aside: the thrown exception is "Illegal constructor” in Chrome/Edge/Firefox, and "new.target is not a valid custom element constructor” in Safari. I find both of those wordings to be extremely unhelpful. The problem has nothing to do with your constructor, but with your failure to invoke `customElements.define`. I don't hit that exception very often, but every time I do, I waste time looking for the problem in the wrong place before I finally remember why that exception occurs._

Registration can be particularly bothersome if you yourself instantiate components using only constructors. Most of the code we've written that creates components happens to do so through their constructors. We're never actually using the components' tags, so it's a chore to have to worry about them. We wish the browser would just generate a unique tag for any component class that's instantiated without registration. (Someone else has proposed support for [anonymous custom elements](https://github.com/w3c/webcomponents/issues/842), and while I think that proposal is very likely to be shot down, I've come to think it would be nice to have.)

## Auto-registering component modules

To avoid the hassle of registering every component, Elix components in releases prior to 8.0 followed a common auto-registration pattern. Each component class was defined in a separate JavaScript module; the default export of each module was the corresponding component class. When you imported one of those modules, you obtained a reference to that class and _as a side effect_ that class was registered with the browser.

For example, the `Carousel` class in Elix 7.0 was defined in a module `/src/Carousel.js` that conceptually looked like this:

```js
// Define and export the class.
export default class Carousel extends HTMLElement { ... }

// Register the class as a side-effect.
customElements.define('elix-carousel', Carousel);
```

So if you imported that module like this:

```js
import Carousel from "elix/src/Carousel.js";
```

the `import` would return the [Carousel](https://component.kitchen/elix/Carousel) component class _and_ as a side effect register the `Carousel` class with the tag `elix-carousel`.

That was rather convenient, especially as it let you load a module with a `script` tag and then immediately use that component entirely in HTML, without having to write any JavaScript:

```html
<script type="module" src="./node_modules/elix/src/Carousel.js"></script>
<elix-carousel>
  <!-- Carousel items such as img elements go here. -->
  <img src="image1.jpg" />
  <img src="image2.jpg" />
  <img src="image3.jpg" />
</elix-carousel>
```

## Problems with auto-registering components

But while auto-registering components are convenient, they lead to some problems:

1. It seems like a bad idea to have importing a module make changes to global state like the custom element registry. At the very least, it can be surprising.
2. Given a component module, there's currently no standard way of predicting what tag name will be used to register that component as a custom element. Likewise, given a defined component class, there's no way of asking the browser whether that class has already been registered and, if so, what tag was used to register it. (An [open issue](https://github.com/w3c/webcomponents/issues/566) tracks whether a new API should be added to find out the tag which which a class was registered.)
3. Forcing the use of a specific tag name creates an undesirable point of entanglement between a project and a component. Imagine that you're working on the FooBar project and would like to use the Elix Carousel component. You'd like the flexibility to swap out which carousel you're using at some later point in time. But if Elix Carousel registers itself as "elix-carousel", then you need to bake that tag everywhere into your HTML. It's be better if you could register the Elix Carousel as "foo-bar-carousel", and use _that_ in your HTML so that you can more easily migrate between carousel implementations.
4. It doesn't allow multiple component versions to be loaded at the same time. People who work on big projects know that it can be extremely difficult to force every team to use the exact same version of a library. As a result, the lack of support for multiple versions can quickly become a deal-breaker for any UI component model. This is a particularly critical issue for small, general-purpose components (like buttons, combo boxes, and context menus) that might make their way into many larger components in a single big project.
5. It doesn't allow the same component to be used in multiple bundles. Even when two parts of your project are using the same component, it's possible that your project's bundling architecture will make it challenging to actually reference the same instance of the component module. If that module gets bundled into two different packages, they can't both be loaded. Arguably that just means you need a better bundling strategy, but it's nevertheless unfortunate that a limitation of the low-level `customElements` DOM API is forcing high-level constraints on how you build your application.

One complicating factor with duplicate element registration is that there's bad locality of reference. Imagine you're working on a big project, and manage to trigger a situation in which a component is trying to register itself twice. The second attempt to register the class will throw an exception — but depending on the load order of the modules, that new code might happen to get loaded _first_. If that happens, the exception will be thrown by the _old_ code when it tries to load later. That's really surprising! “This old code worked fine before. I changed something else far away in this new file, and yet I somehow managed to break the previously-working old code.”

## Anticipating scoped custom element registries

The proposal for [scoped custom element registries](https://github.com/w3c/webcomponents/issues/716) will let you register a class with a tag that's local to your own code. That will definitely be a huge help for the versioning/bundling conflicts described above.

When that feature arrives, auto-registering components could be a minor nuisance, because an auto-registered component might get registered _twice_: once when the module auto-registers in the global custom element namespace, and a second time when your code registers the class in a scoped custom element registry. If you consistently use scoped registries, registrations in the global registry are unnecessary, and just present an opportunity for potential problems.

If a component library like Elix wants to be ready for scoped custom element registries, it's worth figuring out how to move away from having all components auto-register themselves.

## Elix component modules, now in two flavors: normal and auto-registering

Given the wide variety of situations and architectures in which web components may be useful, Elix 8.0 supports both the convenience of auto-registration and the freedom to control registration yourself. To this end, all Elix component modules now come in **two** flavors:

- The modules in the project's `/src` folder now only export a component class, and do _not_ register that class as a custom element. You have to register it yourself. These `/src` modules are intended for use in apps that have some complexity, and where you want complete control over your components.
- The modules in the project's new `/define` folder export the corresponding class _and_ register that class as a custom element. Example: `elix/define/Carousel.js` exports the `Carousel` class and registers it with the tag `elix-carousel`. The tag name is always the prefix `elix-` followed by the class name in kebab case, so `ComboBox` becomes `elix-combo-box`. These `/define` modules are a convenient way to use components in straightforward apps where you're more concerned about getting things done than having complete control, and the constraints of auto-registration are acceptable.

This is, unfortunately, a breaking change for people that use Elix components in their projects. Generally speaking, if they want to preserve the previous auto-registering behavior, they need to replace `/src` in their component `import` paths with `/define`. The other modules in the library — for the extensive set of component mixins and helpers — aren't implicated in component registration, so still exist only in the `/src` folder as before. If you are migrating an Elix project, see the [release notes](https://github.com/elix/elix/releases/tag/8.0.0) for details on migrating to 8.0.

Likewise, the pure HTML use of an Elix component should now reference the `/define` modules, like so:

```html
<script type="module" src="./node_modules/elix/define/Carousel.js"></script>
<elix-carousel>
  <!-- Carousel items such as img elements go here. -->
</elix-carousel>
```

These `/define` modules each simply import the corresponding `/src` module, derive a trivial subclass, export that, and register it. So the source for `/define/Carousel.js` is:

```js
import Carousel from "../src/Carousel.js";
export default class ElixCarousel extends Carousel {}
customElements.define("elix-carousel", ElixCarousel);
```

Why does this code derive a trivial subclass before registering it? Read on...

## Registering components with your own custom element tag names

In any case where you are importing a component from a module, it seems like a good practice to _not_ assume you are the only one who will ever want to register that component. If you try to do the obvious thing:

```js
// Naive approach
import Carousel from "elix/src/Carousel.js";
customElements.define("my-carousel", Carousel);
```

that will run — but then you are effectively declaring that you will always be the only one who will ever want to register that class.

That assumption could someday cause problems. If someone working in a different part of your project (or maybe you yourself, later) also tries to register `Carousel` as a component class, then one of you will lose the registration race, and end up trying to register a class that's already been registered. As noted earlier, that will throw an exception whose poor locality of reference may make it hard to diagnose.

So a reasonable defensive pattern might be to always define a trivial subclass and register that:

```js
// Defensive approach, lets other people register Carousel too
import Carousel from "elix/src/Carousel.js";
class MyCarousel extends Carousel {}
customElements.define("my-carousel", MyCarousel);
```

If you compare this with the code in the previous section, you'll see this is, in fact, the technique used by the Elix auto-registering components. That means you can decide to register the Elix `Carousel` as `my-carousel` _and_ still let someone else import the `elix-carousel` auto-registering component from the Elix `/define` folder. Since both are registering trivial subclasses, those two subclasses can be registered in the global custom element registry without triggering exceptions.

If everyone on your project does the same with the components they import, you should always be able register a custom element class using the tag name you want.

We can use the same technique to load different versions of the same Elix component. We've posted a [sample](https://github.com/elix/multiple-version-example) showing an Elix 7.0 component and an Elix 8.0 component running side-by-side.
