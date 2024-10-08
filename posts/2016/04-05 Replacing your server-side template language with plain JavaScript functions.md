---
title: Replacing your server-side template language with plain JavaScript functions
originalUrl: https://component.kitchen/blog/posts/replacing-your-server-side-template-language-with-plain-javascript-functions
---

<p>
  We’ve rewritten the
  <a href="https://component.kitchen">component.kitchen</a>
  backend server to rip out a popular templating language and replace it with
  plain JavaScript functions. Recent language improvements in ES2015 have, in
  our opinion, made it a sufficiently capable general-purpose language that
  we’ve dropped use of a special-purpose template language. As we began a
  rewrite of our site, we were inspired by our recent work
  <a
    href="/posts/2016/02-01-a-new-release-of-basic-web-components-based-on-plain-javascript-component-mixins.html"
    >using plain JavaScript functions to create web components</a
  >
  and decided to apply the same philosophy to our backend as well.
</p>
<p>
  We serve up our site using Node and
  <a href="http://expressjs.com/">Express</a>. A popular feature of Express is
  that it supports pluggable template languages, called “view engines”. Until
  now, we’ve used
  <a href="http://www.dustjs.com/">Dust.js</a>
  as our template language. This has worked okay, and we’ve done it that way for
  so long that we’ve rarely questioned the need for a special language to solve
  this one problem. But using a template language has some downsides:
</p>

<ul>
  <li>
    The template language (e.g., Dust) is different than the JavaScript the rest
    of the Node/Express backend is written in. We write in JavaScript everyday,
    but only rarely in the template language. This means we’re constantly forced
    to look even simple things up in the template langauge documentation.
  </li>
  <li>
    The syntax for most template languages is ugly and inconsistent. A template
    language’s parser needs a reliable way to identify template directives
    you’ve placed inside your content, so there’s a bias towards syntax that’s
    very unlikely to appear in normal text. Most template languages end up with
    lots of dollar signs, percent signs, curly braces, etc. Every one of these
    languages makes different choices, and you can be left trying to remember
    when you need one curly brace and when you need two.
  </li>
  <li>
    Performing work both outside the template (to prepare the data before
    pouring it into the template) and within the template (using conditional
    template directives, for example) can create an uneasy relationship between
    both pieces of code. Template languages have control-flow constructs like
    traditional languages, but they can be cumbersome to work with. For example,
    a looping construct typically expects to iterate over a simple array. If you
    want to, say, filter the array, you need to preprocess your data into a form
    directly useful in the template language. This often results in splitting
    logic across multiple files.
  </li>
</ul>

<p>
  Why use a special-purpose template language at all? Why not JavaScript? Now
  that ES2015 has template literals, we thought we’d try using those as the
  basis for a plain JavaScript solution.
</p>

<h2>Step 1: Replace each template file with a plain JavaScript function</h2>

<p>
  We create a file for each kind of page we serve up. Each file exports a single
  function that accepts an Express request object (which contains the HTTP
  headers, URL parameters, etc.) and returns a text string containing the
  response to send to the client.
</p>

<pre>
// SamplePage.js
module.exports = request =>
  `&lt;!DOCTYPE html>
  &lt;html>
    &lt;head>
    &lt;title>Hello, world!&lt;/title>
    &lt;/head>
    &lt;body>
      You’re looking at a page hosted on ${request.params.hostname}.
    &lt;/body>
  &lt;/html>`;
</pre>

<p>
  This is a pure function — it has no side effects. It returns a string using a
  template literal, splicing in data using the <code>${...}</code> syntax. As
  with all template language syntax, it is ugly. But at least this particular
  ugly syntax is now standard JavaScript. You can use the <em>same</em> ugly
  syntax throughout your code, instead of different ugly syntaxes for different
  parts of your code. JavaScript FTW!
</p>
<p class="pullQuote">
  Why use a special-purpose template language at all? Why not JavaScript?
</p>
<p>
  The render function can do whatever you want. If you need to do some
  computation — filter an array, etc. — you can do that in plain JavaScript,
  then splice the results into the string you return. While you could embed
  conditionals in the template literal directly, we prefer to avoid that, as it
  quickly gets ugly.
</p>
<p>
  If you want to have a page use a more general template, you can easily do that
  too:
</p>

<pre>
// Define a template. It’s just a function that returns a string.
let template = (request, data) =>
  `&lt;!DOCTYPE html>
  &lt;html>
    &lt;head>
    &lt;title>${data.title}&lt;/title>
    &lt;/head>
    &lt;body>
      ${data.content}
    &lt;/body>
  &lt;/html>`;

// Create a page that uses the template.
module.exports = request => template(request, {
  title: `Hello, world!`,
  content: `You’re looking at a page hosted on ${request.params.hostname}.`
});
</pre>

<p>
  Since a render function often needs to do asynchronous work, we allow a render
  function to return either a string or a Promise for a string.
</p>

<h2>Step 2: Map Express routes to render functions</h2>
<p>
  We create a simple mapping of routes to the functions that handle those
  routes. Since a render function’s file exports only that function, we can
  reference it with a <code>require()</code> statement:
</p>

<pre>
let routes = {
  '/': require('./home.js'),
  '/about': require('./about.js'),
  '/blog': require('./blogIndex.js'),
  '/blog/posts/:post': require('./blogPost.js'),
  '/robots.txt': require('./robots.js'),
  '/sitemap.xml': require('./sitemap.js')
};
</pre>

<h2>Step 3: When a request comes in, invoke the render function</h2>
<p>
  We wire up our Express routes such that, when a request comes in matching a
  given route, the corresponding render function is invoked. The result of that
  function is resolved and returned as the request’s response.
</p>

<pre>
// Map routes to render functions.
for (let path in routes) {
  let renderFunction = routes[path];
  app.get(path, (request, response) => {
    // Render the request as a string or promise for a string.
    let result = renderFunction(request);
    // If the result's not already a promise, cast it to a promise.
    Promise.resolve(result)
    .then(content => {
      // Return the rendered content as the response.
      response.set('Content-Type', inferContentType(content));
      response.send(content);
    });
  });
}
</pre>

<h2>Step 4: Set the outgoing Content-Type</h2>
<p>
  Nearly all our routes respond with HTML, but we have a small number of routes
  that return XML, JSON, or plain text. We could have a render function return
  multiple values, including an indication of the desired Content-Type. But our
  simple site serves up such a small number of content types that we can
  reliably infer the content type from the start of the response string.
</p>

<pre>
// Given textual content to return, infer its Content-Type.
function inferContentType(content) {
  if (content.startsWith('&lt;!DOCTYPE html>')) {
    return 'text/html';
  } else if (content.startsWith('&lt;?xml')) {
    return 'text/xml';
  } else if (content.startsWith('{')) {
    return 'application/json';
  } else {
    return 'text/plain';
  }
}
</pre>

<p>
  That’s it. We end up with a small set of JavaScript files, one for each kind
  of page we serve up. Each file defines a single render function, and each
  function is typically quite simple. In our opinion, our code has gotten easier
  to read and reason about. It’s also closer to the metal — we have ripped out a
  substantial, mysterious template language layer — so there are fewer
  surprises, and we don’t have to keep looking up template language tricks in
  the documentation or on StackOverflow.
</p>
<p>
  Although domain-specific template languages like Dust look very efficient,
  over time we accumulated a non-trivial amount of JavaScript to get everything
  into a form Dust could process. Now that we’re just using JavaScript
  everywhere, we have much <em>less</em> page-generation code than we did
  before, and the new code is completely consistent with the rest of our code
  base.
</p>
