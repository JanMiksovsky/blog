---
title: Using Handlebars templates in the shell
---

It's useful to be able to apply templates written in a language like #Handlebars to things in the shell.

The Origami #CLI lets you invoke JavaScript functions defined in .js files, but you can now also identify a handler for any file extension — like OS app file associations, but for a CLI. https://weborigami.org/language/filetypes.html#custom-file-types

So a handler can load a `.hbs` file as a function that applies a Handlebars template, then apply that in the command line.

![](/images/2024/04/hello.png)

Origami can resolve pretty much anything — JSON/YAML files, files with front matter, entire folder trees, a ZIP file, whatever — to an object your Handlebars template can operate on.

![](/images/2024/04/countries.png)

You can even write a one-liner that fetches data from a server and applies a template to it.

![](/images/2024/04/fetch.png)

Applying a Handlebars template to a file system folder lets you, e.g., generate an HTML index page with links to all the HTML pages in the folder.

![](/images/2024/04/links.png)

If one Handlebars template references another template (a "partial"), Origami resolves that reference for you. If you reference `bold`, it will look for a template named `bold.hbs` and use that.

This lets you decompose templates for complex results without the usual overhead of manually loading those templates and passing them as Handlebars configuration.

![](/images/2024/04/partials.png)

Origami itself is a powerful template language, but you might prefer Handlebars or some other template language. You can use Origami to define the overall structure of your site, then use Handlebars/etc. to turn data from anything into HTML.

It was easy to rewrite the Origami "About Us" sample site using Handlebars.

![](/images/2024/04/index.png)
![](/images/2024/04/AboutUs.png)

