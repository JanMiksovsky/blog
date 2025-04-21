---
title: Origami pondlife blog
---


There is a way we can further simplify this project, at the cost of taking on a bigger dependency.

## Slimming JavaScript to expressions with paths

It turns out that, if you write JavaScript in a clean, modular, functional style, then a fair amount of your code, perhaps 10-40%, will be dedicated to basic housekeeping:

* `import` statements
* `export` statements
* `let` and `const` variable declarations
* reading and parsing files

It’s possible to remove these things to produce a dialect of JavaScript expressions called the [Origami programming language](https://weborigami.org/language).


Compare pondlife-async-tree site.js to site.ori

* All `import` statements are now implicit. Origami scope extends up from a file to the root of a project — if an expression references something that’s not in the same file, Origami finds it in the file system.
* A reference to a folder like `assets` and `images` returns a `FileTree` instance, so that class constructor doesn’t have to be explicitly called.
* Since Origami doesn’t have statements, only expressions, there’s no need for `const` declarations.
* The module’s default `export` is now implicit.

Such reductions in code typically make an Origami definition something like 10-30% smaller than the corresponding JavaScript.

Origami’s most definitely not meant for the things imperative programming is good at: loops, complex `if` statements, fine-grained string slicing and dicing — JavaScript is already great at those things, so Origami just makes it easy to call JavaScript helpers.