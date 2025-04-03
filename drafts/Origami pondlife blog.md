---
title: Origami pondlife blog
---

Compare pondlife-async-tree site.js to site.ori

* All `import` statements are now implicit. Origami scope extends up from a file to the root of a project — if an expression references something that’s not in the same file, Origami finds it in the file system.
* A reference to a folder like `assets` and `images` returns a `FileTree` instance, so that class constructor doesn’t have to be explicitly called.
* Since Origami doesn’t have statements, only expressions, there’s no need for `const` declarations.
* The module’s default `export` is now implicit.

Such reductions in code typically make an Origami definition something like 10-30% smaller than the corresponding JavaScript.

Origami’s most definitely not meant for the things imperative programming is good at: loops, complex `if` statements, fine-grained string slicing and dicing — JavaScript is already great at those things, so Origami just makes it easy to call JavaScript helpers. The `parseDate.js` could easily have been kept as is, although the JavaScript version is slightly smaller.