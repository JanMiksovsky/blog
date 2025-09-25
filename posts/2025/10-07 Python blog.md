---
title: Creating a simple blog in Python with Origami concepts
draft: true
---

I’ve extended my series of [blog architecture comparison](/posts/2025/05-02-concise-expressions.html) posts from earlier this year by porting the [sample reference blog](https://github.com/WebOrigami/pondlife) from [Origami](https://weborigami.org) and [plain JavaScript](/posts/2025/04-17-zero-dependencies.html) to create a Python version ([source](https://github.com/JanMiksovsky/pondlife-python), [demo](https://pondlife-python.netlify.app/)).

The occasion was reading about improvements in async features in Python 3.14, scheduled for final release today, which prompted me to write some Python code for the first time in a long while.

The sample blog doesn’t actually need to make network requests, so it ended up only using sync functions — but all those sync functions are still _lazy_ and do work only when necessary. And with the improvements in Python 3.14, it might be possible to create an `AsyncMapping` abstract base class as a variation of `Mapping` to handle the sorts of network-based operations that Origami can do, e.g., reading post content directly out of Dropbox or Google Drive.

## Creating a static site

Python’s audience has always included people who don’t think of themselves primarily as programmers. That aligns with what I’m trying to do in Origami, so it’s interesting to explore using Python as a possible substrate for Origami ideas.

I’m not familiar with Python static site generators, but they seem to generally take the same [framework approach](https://weborigami.org/language/model#use-a-website-framework) as their Node.js counterparts: impose a particular folder structure, provide a magic transformation of that structure to static files, and offer a degree of customization through configuration.

Like all the blog implementations in this series, this Python project rejects that approach entirely. Instead, the focus is on creating useful functions and abstractions for defining the site you want to create. It leaves you to put the parts together in a way that makes sense to you so that you are always in control and can entirely satisfy your requirements.

## Lazy maps

Like the JavaScript versions of the sample blog, the Python version attempts to use native language constructions whenever possible. It makes heavy use of Python’s [`Mapping`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Mapping) abstract base class to represent collections which are fundamentally _lazy_: they do essentially no work when constructed. Only when asked for their keys, or for a particular value for a key, will they do substantive work.

An example of this is the project’s [`Folder`](https://github.com/JanMiksovsky/pondlife-python/blob/main/src/map_origami/folder.py) class, which wraps a file system folder as a lazy `Mapping` (specifically, a `MutableMapping`).

Another example of this are the project’s operations that take one `Mapping` as input and return a new, transformed `Mapping`. For example, [`map_extensions`](https://github.com/JanMiksovsky/pondlife-python/blob/main/src/map_origami/map_extensions.py), can convert a virtual collection of `.md` files into a corresponding collection of `.html` files.

```python
post_html_docs = map_extensions(folder, ".md->.html", md_doc_to_html)
```

When backed by a `Folder` containing `post.md`, the resulting map-of-a-map _says_ that it contains a `post.html` -- but it hasn’t done the real work for that yet. When you ask for `post.html`, it will ask the underlying `Folder` for `post.md`, translate the markdown content to HTML, then return that result. (The [actual data pipeline](https://github.com/JanMiksovsky/pondlife-python/blob/main/src/blog_demo/post_docs.py) is slightly more complex.)

You can use a debugger to inspect the value of a map like this at runtime with a command like:

```python
list(post_html_docs.items())
```

This lets you confirm that the map’s keys and values are what you expect.

The beauty of working at this abstract `Mapping` level is that your code doesn’t need to care how a particular collection is defined -- your code can handle real files or generated-on-demand files in exactly the same way.

## Defining a site tree with maps

At the project’s highest level, [`site_tree.py`](https://github.com/JanMiksovsky/pondlife-python/blob/main/src/blog_demo/site_tree.py) defines the root of the site’s tree of resources as a `Mapping`. Most of those top-level parts of the sites are also `Mapping` instances: some like `assets` and `images` are real folders; others are virtual collections like `posts`.

```python
# from src/blog_demo/site_tree.py

# The site tree is a tree with Mappings for interior nodes and the desired
# resources as leaves. The top level of the tree can invoke functions to
# generate the content on demand. Areas which are just Mappings are inherently
# lazy and are defined directly.
site_tree = invoke_fns({
    "about.html": lambda: about_html(),
    "assets": Folder(here / "assets"),
    "feed.json": lambda: json.dumps(feed(), indent=2),
    "feed.xml": lambda: json_feed_to_rss(feed()),
    "images": Folder(here / ".." / ".." / "images"),
    "index.html": lambda: pages_area()["1.html"],  # same as pages/1.html
    "pages": lambda: pages_area(),
    "posts": posts_area(),
})
```

This programmatic approach lets you dictate precisely how you want to compose the parts of your site; you’re not trapped within the confines of a framework and someone else’s expectations.

## Building and serving

As in Origami, the site’s tree of resources is used in two very different ways.

First, a small web server that accepts any `Mapping`-based tree converts URL requests like `/assets/styles.css` into an array of keys `["assets", "styles.css"]` that are used to traverse the tree. Given the `site_tree.py` code above, the first `”assets”` key retrieves the `Folder` wrapper for the real `assets` folder; the second key retrieves the `styles.css` file in that folder. Because the site tries to be as lazy as possible, the site only does the work necessary to fulfill the specific request.

Second, building the static site files is simply a matter of copying the site’s virtual tree of resources into a real tree in the file system.

```python
# from src/blog_demo/__main__.py

def build(m: Mapping):
    """
    Given a mapping representing the site structure, copy the entire tree into
    the build folder to create static files.
    """
    build_folder = Folder("build")
    build_folder.clear()
    build_folder.update(m)
```

A `MutableMapping` is created for the `build` output folder, and the site’s tree of resources is copied directly into it using the completely standard `update()` method to copy one map into another. This ultimately walks through the source tree, calling `__getitem__` to generate each resource, then passing the resource to the build’ folder’s `__setitem__` method to create the corresponding output file.

## Assessment

Let’s compare this Python blog port with the earlier Origami and JavaScript versions.

In terms of source code size, the Python version is written as a demo application and a separate library for map manipulations. That makes it roughly comparable to the [blog using Origami’s async-tree library](/posts/2025/04-23-async-tree.html). Accordingly, I’ll factor out the library portion of the code, and the reusable JSON feed-to-RSS translation to measure the non-reusable bytes in the demo application, including both Python (`.py`) files and Jinja (`.j2`) templates.

![](/images/2025/10/pythonSourceCode.png)

The Python version comes in at 10021 bytes, just a bit more than the 9450 bytes for the async-tree version. For this blog application, at least, both Python and JavaScript are comparably expressive. (Origami is still more concise.)

Python and Node.js are completely different environments, so it’s not possible to make an apples-to-apples comparison of the weight of the project dependencies. And in any case, measuring dependencies by total file size can only give an extremely coarse approximation of potential complexity. Still, I thought it was interesting to measure the total size on disk of the Python project’s `site-packages` as an analogue for node_modules.

![](/images/2025/10/pythonDependencies.png)

The Python version weighs more than the `async-tree` version. It’s less than Origami, but Origami is also doing a lot more. (Astro is still the most complex answer to the problem, and I don’t believe it’s actually doing enough interesting work to justify its size.)

Finally, let’s look at the time required to build the blog’s static files:

![](/images/2025/10/pythonBuildTime.png)

Python comes in at 0.24s — a hair faster than the zero-dependency JavaScript version, making it the fastest of all the blog versions I’ve created so far.

## Conclusion

This was a really interesting experiment! It was a ton of fun to write Python code again.

It seems completely feasible to serve and build a site in Python in a lightweight fashion using a library (under your control) instead of a big framework (that takes control from you). Python seems like a great substrate for Origami ideas. It’s well-designed and widely-used `Mapping` abstract base class is a natural way to represent your source content as a tree that you can transform into the tree of resources you want for your site.