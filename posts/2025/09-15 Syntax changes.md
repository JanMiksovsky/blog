---
title: Making Origami expressions easier to learn and use
---

Over this summer I’ve shifted the [Origami expression language](https://weborigami.org/language) to be a closer dialect of JavaScript expressions. Feedback from early adopters indicated that some differences from JavaScript created trouble; eliminating those would improve the language.

Origami is now essentially [JavaScript expressions plus paths](https://weborigami.org/language/expressions.html), with a few additional syntactic features that make it easier to define a site.

![](/images/2025/09/blogCode.png)

The language supports a conceptual model called [Content/Transformation](https://weborigami.org/language/model) you may find helpful in thinking about how to build a site.

The syntax changes to the language included:

* Supporting standard JavaScript `.` syntax for accessing a property. This required developing a [heuristic](https://weborigami.org/language/expressions#file-name-heuristic) that could reliably tell that `post.title` is a property reference but `image.jpg` is a file name — even though both use the same period syntax.
* Consolidating Origami’s [built-in functions](https://weborigami.org/builtins) into a small number of collections exposed as regular globals, like `Tree` for functions that work with trees and `Origami` for most everything else.
* Supporting JavaScript’s `new` syntax. I’d tried hard to avoid having reserved words, but `new` is so ingrained in JavaScript developers’ minds that any other syntax is hard to remember.

Origami is still missing some esoteric JavaScript expression features (e.g., function parameter destructuring), but those are all on the list tackle. The goal is that you should be able to copy any JavaScript expression and evaluate it as an Origami expression.

Why introduce an alternative expression language to JavaScript?

- Origami’s use of paths, including support for file extensions and its assumption that any expression might be `async`, lets you load or fetch files and get data out of them more concisely than with JavaScript. The resulting expression can be 20-40% shorter, making the intent of code easier to see.
- Expressions generally don’t have side effects, so restricting your code to expressions tends to keep you in the happy world of pure functions and immutable data — where things are much easier to reason about.
- With a few [shorthands](https://weborigami.org/cli/shorthand.html) to accommodate a command line, Origami makes an excellent shell language, turning your OS terminal into a JavaScript console.

Watch the [motion comic](https://origami-comics.netlify.app/) introducing the language, or walk through [how to create a basic blog](https://weborigami.org/language/tutorial.html).