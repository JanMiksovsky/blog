I added a JavaScript-style `...` spread operator to Origami for concise syntax to merge one tree of anything (files, data) into another tree. #programminglanguages #buildinpublic

E.g. if your website repo has a `client` folder with resource subfolders (for stylesheets, fonts, SVGs, etc), you can merge those in with `...`

```js
{
  // Generated page
  index.html = index.hbs()

  // Merge in other resources as-is
  ...client
}
```

https://weborigami.org/language/syntax#spread-operator
