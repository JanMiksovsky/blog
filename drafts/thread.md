It's useful to be able to apply templates written in a language like #Handlebars to things in the shell.

The Origami #CLI lets you invoke JavaScript functions defined in .js files, but you can now also identify a handler for any file extension — like OS app file associations, but for a CLI. https://weborigami.org/language/filetypes.html#custom-file-types

So a handler can load a `.hbs` file as a function that applies a Handlebars template, then apply that in the command line.

Terminal window with a Handlebars template called with the word "world" to produce "Hello, world."

---

Origami can resolve pretty much anything — JSON/YAML files, files with front matter, entire folder trees, a ZIP file, whatever — to an object your Handlebars template can operate on.

You can even write a one-liner that fetches data from a server and applies a template to it.

Terminal window with a Handlebars template generating a list of countries and their flags from data

---

Applying a Handlebars template to a file system folder lets you, e.g., generate an HTML index page with links to all the HTML pages in the folder.

Terminal window with a Handlebars template generating link tags for each file in a folder

---

If one Handlebars template references another template (a "partial"), Origami resolves that reference for you. If you reference `bold`, it will look for a template named `bold.hbs` and use that.

This lets you decompose templates for complex results without the usual overhead of manually loading those templates and passing them as Handlebars configuration.

A Handlebars template called greet that calls another template called bold

---

Origami itself is a powerful template language, but you might prefer Handlebars or some other template language. You can use Origami to define the overall structure of your site, then use Handlebars/etc. to turn data from anything into HTML.

It was easy to rewrite the Origami "About Us" sample site using Handlebars.

A Handlebars template for an list of people on a team
An Origami site definition for a small About Us site
Screenshot of the final About Us site


---

Each month this year I'm posting a sample website written in Origami, a declarative programming language at the level of #HTML and #CSS for defining websites. This month's sample is Guided Treks, a site for an outdoor travel company.

It's easy to have Origami call other template languages, so for this sample I used the #Handlebars template language to turn markup and data into HTML.

---

It took just a few lines of Origami code to define the structure of the site and indicate which Handlebars template should be used to create which pages. For this outdoor travel example, Origami makes it very, very easy to:

- Create a web page for trek described in markup with front matter.
- Create index pages showing cards for a set of treks.
- Create a gallery page showing each image in a folder. Origami makes it very easy to pass a Handlebars gallery template the list of image file names, which the template can turn into img tags and links.

site.ori
site.ori SVG

---

Origami also made it possible to cross-link the data for each trek with related treks. That allows the page for one trek to show cards links to related treks.

related treks screenshot

---

Aside: modern HTML and CSS are soooo much better than the past. I based the trekking site on a WordPress template whose design I liked but whose HTML/CSS was ridiculously complex and burdened with tons of JavaScript for trivial things.

Rewriting slashed the size of the pages. For the home page:

Before: 42K HTML, 600K CSS, 1580K JS
After: 13K HTML, 12K CSS, 0K JS
