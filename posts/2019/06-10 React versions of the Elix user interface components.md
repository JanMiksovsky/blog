---
title: Should the Elix project maintain React versions of its general-purpose UI components?
originalUrl: https://component.kitchen/blog/posts/should-the-elix-project-maintain-react-versions-of-its-general-purpose-ui-components
---

We've been looking at how to make the [Elix web component library](https://component.kitchen/elix) easier to use in a React application. We recently posted a [React example](https://github.com/elix/react-example) to show using an Elix web component in a simple React app, but we can do more.

# HTML custom elements don't feel quite at home in React today

As noted on [Custom Elements Everywhere](https://custom-elements-everywhere.com/#react), React currently has some well-known issues interacting with custom elements:

- Properties passed to HTML elements, including custom elements, get passed as strings. This makes it hard to pass complex properties like objects and arrays.
- Listening to events raised by custom elements requires a somewhat awkward workaround.

Based on our experience, I'd also add a third issue:

- Custom elements have to be referenced by their string tag name. E.g., the Elix [Carousel](https://component.kitchen/elix/Carousel) must be referenced as the string `elix-carousel` instead of the class `Carousel`.

That's unfortunate. React components are referenced by class, and the inability to do the same with custom element classes makes them feel alien in the context of React. It also makes it harder to do proper linting and type-checking.

To use a web component in React today, you do something like the following:

```jsx
// In custom-element.js
export default class MyCustomElement extends HTMLElement {}
customElements.define("my-custom-element", MyCustomElement);

// In app.jsx
import React from "react";
import MyCustomElement from "./custom-element.js";

class App extends React.Component {
  render() {
    return <my-custom-element></my-custom-element>;
  }
}
```

The `import MyCustomElement` statement will generate a lint error complaining that `MyCustomElement` is unused, because it can't know that the string name `my-custom-element` is an indirect reference to the `MyCustomElement` class.

You could suppress the error by dropping the class name from the import:

```jsx
import "./custom-element.js";
```

But that simply masks the problem: there's no type-safe way to confirm the JavaScript code in the React app is interacting correctly with the custom element class.

It'd be preferable to refer to HTML custom elements by class just like one can with React component classes. Specifically, it'd be nice if JSX and the underlying `React.createElement` could be extended to accept any subclass of the standard `HTMLElement` base class:

```jsx
// In custom-element.js
export default class MyCustomElement extends HTMLElement {}
customElements.define("my-custom-element", MyCustomElement);

// In app.jsx
import React from "react";
import MyCustomElement from "./custom-element.js";

class App extends React.Component {
  render() {
    return <MyCustomElement></MyCustomElement>; // This would be nice!
  }
}
```

This would open up type safety and the attendant edit-time benefits of features like auto-complete and inline documentation.

# Trying out React versions of the Elix web components

In the meantime, we're considering maintaining [React versions of the Elix web components](https://github.com/elix/elix-react) that address some of the interop issues mentioned above. They let you listen to custom events raised by an Elix component using the standard React `on` syntax. They also let you set properties using React-standard camelCase property names instead of hyphenated attribute names. (However, properties still only accept types that can be coerced to and from strings.)

Example:

```jsx
import React from "react";
import ListBox from "elix-react/src/ListBox.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
    this.selectedIndexChanged = this.selectedIndexChanged.bind(this);
  }

  render() {
    return (
      <ListBox
        onSelectedIndexChanged={this.selectedIndexChanged}
        selectedIndex={this.state.selectedIndex}
      ></ListBox>
    );
  }

  selectedIndexChanged(detail) {
    const { selectedIndex } = detail;
    this.setState({ selectedIndex });
  }
}
```

Here's a simple [demo of a React app using the React Elix components](https://elix.github.io/elix-react/demos/listAndCarousel.html). This shows a React version of an Elix [ListBox](https://component.kitchen/elix/ListBox) synchronized with an Elix [Carousel](https://component.kitchen/elix/Carousel).

As with the regular Elix web components, the React versions provide full keyboard, mouse, touch, and trackpad support, plus ARIA accessibility.

We're trying to decide if we should maintain the React versions of the Elix components on an ongoing basis. If that would be interesting to you, please tweet to the Elix project at [@ElixElements](https://twitter.com/ElixElements).
