I've written a `.hbs` handler for #Handlebars templates so you can invoke them from the shell.

The Origami CLI lets you invoke functions and traverse trees. This includes the ability to invoke JavaScript functions, passing in strings, numbers, objects, data in files, entire file trees, or data from a server.

You can also do that with templates. Origami is powerful template language in its own right, but for the many other template languages one can write a little driver -- think OS File Associations but for JavaScript.

link to Handlebars extension

screenshot of greet

---

Origami can resolve pretty much anything to an in-memory object and feed that to your Handlebars template, so you can apply a template to a local data file or one from a server.

screenshot of country flags

---

You can apply a Handlebars template to a folder of files to create, e.g., a list of links to all the HTML pages in that folder.

screenshot of links

---

A Handlebars template can reference "partials" — sub templates — so you can break complex templates down into small parts. The Origami `.hbs` can resolve those references: if it sees a reference to a partial called `foo` it will look for a `foo.hbs` and use that.

screenshot of partials

---

I used this to rewrite the sample Origami About Us example using Handlebars templates.

If you'd be interested in using Origami with some other template language, let me know.
