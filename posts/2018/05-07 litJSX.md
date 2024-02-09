---
title: Using JavaScript template literals with JSX for server-side rendering
originalUrl: https://component.kitchen/blog/posts/using-javascript-template-literals-with-jsx-for-server-side-rendering
---

While updating our Component Kitchen site to incorporate the [Elix](https://component.kitchen/elix) web component documentation, we replaced our server-side use of Preact with template literals for JSX. The result works well and could be applied in many situations, so we describe the solution here in case others are interested in trying it.

## Some pros and cons of JSX on the server

Back in 2016, we decided to use [plain JavaScript functions to render page content](https://component.kitchen/blog/posts/replacing-your-server-side-template-language-with-plain-javascript-functions). We really liked that straightforward approach, but we eventually shifted to using JSX because the code was easier to read. The use of components as tags in JSX makes it easier to see how the page is being constructed, and code editors that apply syntax highlighting to HTML/JSX make it easier to spot simple mistakes (missing end quotes, etc.).

But using Preact on the server felt like more architecture than we needed. We'd construct a component, render it immediately to a string, then throw it away. So Preact's support for lifecycle methods and incremental rendering were all extraneous. And using JSX in our Node code base added a compile step we wouldn't have otherwise needed. Finally, we had to go through some gyrations to asynchronously collect the data a page needed before we could tell Preact to render the content.

## Using template literals

With the advent of template literal languages like hyperHTML and lit-html, we wanted to get back to the stripped-down simplicity of plain strings while incorporating the benefits of JSX legibility.

The result is a small template literal library we call [litJSX](https://github.com/componentkitchen/litJSX). It lets us concisely use JSX-like syntax in template literals that combine static content and dynamic content to create strings. All parsing is done at runtime; there's no build step. Parsing is fast, and because we're using template literals, parsing of the static content is only done once per unique template string.

```js
const jsxToTextWith = require("litjsx");
const html = jsxToTextWith({ Bold, Greet }); // Create custom template literal.

function Bold(props) {
  return html`<b>${props.children}</b>`;
}

function Greet(props) {
  return html`
    <span>
      Hello,
      <Bold>${props.name}</Bold>.
    </span>
  `;
}

html`<Greet name="world" />`; // <span>Hello, <b>world</b>.</span>
```

Our components are all just JavaScript functions that take a properties object and return a string.

With any system along these lines, it's necessary to tell the template literal function what JavaScript class names it should expect to find in the strings we give it. Some JSX template literal libraries like [t7](https://github.com/trueadm/t7) handle this by setting configuration options on the parser.

In our case, we designed litJSX as a generator of custom template literal functions. You feed it a set of classes, and it hands back a custom template literal that recognizes those classes.

The second line above creates a custom template literal called `html`. We tell it that if it sees the strings "Bold" or "Greet" in a tag, then it should invoke the JavaScript functions `Bold` and `Greet`, respectively.

Simply naming our template literal function "html" lets code editor extensions for syntax highlighting know they should parse and decorate the template contents as either HTML or JSX. So we get the design-time legibility and error-checking we were after.

## Server-side rendering

On the server, we write our top-level page components as functions that accept an HTTP `request` object and use litJSX template literals to return a string result.

```js
const html = jsxToTextWith({ Greet });

function Greet(props) {
  return html`<p>Hello, ${props.name}</p>`;
}

function GreetPage(request) {
  return html`
    <!DOCTYPE html>
    <html>
      <body>
        <Greet name="${request.params.name}" />
      </body>
    </html>
  `;
}

// The page at /greet/Jane returns HTML saying "Hello, Jane."
app.get("/greet/:name", (request, response) => {
  const content = GreetPage(request);
  response.set("Content-Type", "text/html");
  response.send(content);
});
```

## Asynchronous components

Server-side pages often need to perform asynchronous work before they can return a response, so we designed litJSX to handle components which are async functions. If any component in the JSX is async (returns a `Promise`), the tagged template literal itself returns a `Promise` for the final, complete result. This lets you create `async` component functions and `await` the final template result.

```js
async function GreetUser(props) {
  const user = await getUser(props.id); // Some async function to get data
  return html`Hello, ${user.name}.`;
}

const html = jsxToTextWith({ GreetUser });
const userId = 1001; // Jane's user id
const text = await html`<GreetUser id="${userId}" />`; // Hello, Jane.
```

Such async components allow us to cleanly encapsulate the async work performed by specific pages on our site.

## Results

We're now using litJSX to render our entire site. The words you're reading here have passed through a litJSX template literal! Our server code has gotten more concise and more clearly expresses our intentions, with very minimal library overhead and no build step. So far it's holding up well.
