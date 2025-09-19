---
title: Creating a simple blog in Python with Origami concepts
draft: true
---

I’m extending my series of [blog architecture comparison](/posts/2025/05-02-concise-expressions.html) posts from earlier this year by porting the [sample reference blog](https://github.com/WebOrigami/pondlife) from [Origami](https://weborigami.org) and [plain JavaScript](/posts/2025/04-17-zero-dependencies.html) to create a Python version ([source](https://github.com/JanMiksovsky/pondlife-python), [demo](https://pondlife-python.netlify.app/)).

The occasion for the port is the addition of `async` and `await` features in Python 3.14, scheduled for final release today. I’ve long used those features in JavaScript, and their pending arrival prompted me to write some Python code for the first time in a long while.

This particular blog doesn’t actually need to make network requests, so it only uses sync functions — but all those sync functions are still _lazy_ and do work only when necessary. And with the improvements in Python 3.14, it seems feasible to create an `AsyncMapping` abstract base classes that has async versions of the same members as `Mapping` to handle the sorts of network-based operations that Origami has.

## Creating a static site

Python’s audience has always included people who don’t think of themselves first as programmers. That aligns with what I’m trying to do in Origami, so I think it’s interesting to explore using Python as a possible substrate for Origami ideas.

I’m not particularly familiar with Python static site generators, but they seem to generally take the same [framework approach](https://weborigami.org/language/model#use-a-website-framework) as their Node.js counterparts: impose a particular folder structure, provide a magic transformation of that structure to static files, and offer a degree of customization through configuration.

Like all the blog implementations in this series, the Python port rejects that approach entirely. Instead, the focus is on creating useful functions and abstractions for defining the site you want to create, then leave you to put the parts together in a way that makes sense to you, keeps you in control, and meets your needs exactly.

## Lazy maps

Like the JavaScript versions of the blog, the Python version attempts to use native language constructions whenever possible. It makes heavy use of Python’s [`Mapping`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Mapping) abstract base class to represent collections which are fundamentally _lazy_: they do essentially no work when constructed. Only when asked for their keys, or a particular value for a key, will they do substantive work.

An example of this is the project’s [`Folder`](https://github.com/JanMiksovsky/pondlife-python/blob/main/src/map_origami/folder.py) class, which wraps a file system folder as a lazy `Mapping` (specifically, a `MutableMapping`).

Another example of this are the project’s collections of operations that take as input one `Mapping` and return a new `Mapping`. One such transformation is [`map_extensions`](https://github.com/JanMiksovsky/pondlife-python/blob/main/src/map_origami/map_extensions.py), which can be used to convert of a virtual collection of `.md` files into a corresponding collection of `.html` files.

```python
post_html_docs = map_extensions(folder, ".md->.html", md_doc_to_html)
```

When backed by a `Folder` containing `post.md`, the resulting map-of-a-map _says_ that it contains a `post.html` -- but it hasn’t done the real work for that yet.

When you ask for `post.html`, it will ask the underlying `Folder` for `post.md`, translate the markdown content to HTML, then return that result. (The [actual data pipeline](https://github.com/JanMiksovsky/pondlife-python/blob/main/src/blog_demo/post_docs.py) is slightly more complex.)

## Defining a site tree with maps

At the project’s highest level, [`site_tree.py`](https://github.com/JanMiksovsky/pondlife-python/blob/main/src/blog_demo/site_tree.py) defines the root of the site’s tree of resources as a `Mapping`. Most of those top-level parts of the sites are also `Mapping` instances: some like `assets` and `images` are real folders; others are virtual collections like `posts`.

```python
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

First, a small web server that accepts any `Mapping`-based tree converts URL requests like `/assets/styles.css` into an array of keys `["assets", "styles.css"]` that are used to traverse the tree. Because the site tries to be as lazy as possible, the site only does the work necessary to fulfill the request.

Second, building the static site files is simply a matter of copying the site’s virtual tree of resources into a real tree in the file system. A `MutableMapping` is created for the `build` output folder, and the site’s tree of resources is copied directly into it using the standard `update()` method:

```python
def build(m: Mapping):
    """
    Given a mapping representing the site structure, copy the entire tree into
    the build folder to create static files.
    """
    build_folder = Folder("build")
    build_folder.clear()
    build_folder.update(m)
```

## Assessment

_[Need to compile some statistics: project file size, build time. The Python version is significantly faster than the Node.js versions.]_