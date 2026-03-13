---
title: Is Eleventy actually simple? Comparing a sample blog in Eleventy and Origami
draft: true
---

This post is for people who want to build (or rebuild) a site. You may have heard of [Eleventy](https://www.11ty.dev), a popular static site generator, and perhaps it was described to you as simple.

To evaluate that claim, I set up the [`eleventy-base-blog`](https://github.com/11ty/eleventy-base-blog) template project, their recommended starting point for new Eleventy blogs. I studied the project until I felt I understood its construction, then ported it to [Web Origami](https://weborigami.org). (Last year I made a similar [comparison of Astro and Origami](https://jan.miksovsky.com/posts/2025/05-02-concise-expressions).)

After comparing the Eleventy and Origami blogs, I believe:

1. Explicit connections between source files are simpler than implicit connections.
1. Code is more concise than configuration.
1. Code is more expressive than configuration.

If you already use Eleventy, I’m happy you’ve found something that works for you! If you're shopping for a site-building tool, I hope this can help inform your decision.

## Experiment setup

I created two versions of Eleventy's sample blog:

* **Eleventy version:** [Source code](https://github.com/JanMiksovsky/eleventy-base-blog) and [Demo](https://original-eleventy-blog.netlify.app)
* **Origami version:** [Source code](https://github.com/JanMiksovsky/origami-eleventy-blog) and [Demo](https://origami-eleventy-blog.netlify.app)

Both demos are about as close as I can easily make them. For a cleaner comparison, I made a few modifications to the original Eleventy project:

1. The original project had an introductory message with instructions to remove it, so I removed it.
2. The original used a plugin for image optimization, but reproducing the effects of that would complicate this analysis, so I removed it.
3. I removed the original's XSLT stylesheet for the blog feed, as XSLT is being deprecated by Chrome, and WebKit and Gecko will likely follow. (I'm not saying the deprecation is warranted, but given the state of things I felt the stylesheet was a distraction.)

Beyond that I tried to port all observable behaviors and produce identical sites. One difference: The Eleventy project uses PrismJS for syntax highlighting; the Origami solution uses HighlightJS, so there are minor differences in code highlighting that could be resolved with more work.

## Follow the chain of causality

Once I had the Eleventy site working, I wanted to know: *how does it work?*

That question was hard to answer, so I started with a simpler one: *what is calling what?*

Eleventy works like most static site generators: you run the tool, and it searches around inside your project for certain folders and files, then creates an output directory with your site’s HTML pages and other resources.

For such projects there will typically be an instruction in the README to run a build command like `npm run build`. That `build` script is the main entry point to the build process, so I tried to search forward from that to follow links to related files.

I got stuck:

* The `build` script for `eleventy-base-blog` invokes Eleventy, but beyond that point it's not obvious how Eleventy does what it does.
* A promising `eleventy.config.js` file makes specific references to a folder called `content` and a file called `filters.js`, but then I hit a dead end.
* I ended up searching through the entire project looking for source files, then looking in those for references to other source files.

I constructed a partial map of what calls what:

![](/images/2026/03/eleventy.svg)

The files floating in space aren’t directly referenced by any other files. The files' names suggested what roles they played, but it was still mysterious to me how they actually played those roles.

I eventually found an Eleventy documentation page called [Order of Operations](https://www.11ty.dev/docs/advanced-order/) providing an "advanced" description of most (but not all) of what was going on. I then had Claude Code guess/explain how the remaining files worked. This clarified that, e.g., Eleventy lets you register JavaScript functions as "filters" you can call from templates. I hadn't been able to work out for myself that many of the `.njk` files were invoking code in `filters.js`.

I was able to flesh out the above dependency diagram, adding the implicit connections as dashed lines:

![](/images/2026/03/eleventy2.svg)

Many of the connections in this project are dashed lines representing “action at a distance” — if you don't already know how the system works, such connections are hard to discover or intuit. This may be acceptable for something you will use all the time, but it certainly does make learning the system (or coming back to it) more difficult.

## Explicit connections are simpler

In Web Origami you take a different approach to building a site. Instead of focusing on folders and configuration, you define the site you want in the [Origami dialect of JavaScript](https://weborigami.org/language/expressions) that's essentially JavaScript expressions with embedded file paths. You build the project with a `build` command like:

```
copy src/site.ori, clear files:build
```

Even if the [meaning of that command](https://weborigami.org/cli/incantations#building-a-site-as-static-files) may be unclear, you can still see an explicit reference to the file [`site.ori`](https://github.com/JanMiksovsky/origami-eleventy-blog/blob/main/src/site.ori). If you open that file, you’ll see it explicitly references all the files it uses. (We'll look at the file in a moment.)

You can repeat that process, following links from one file to another, to recover the _entire_ graph of source file calls:

![](/images/2026/03/origami.svg)

The Origami project has no hidden associations, so all the lines are solid. Everything happens because an explicit line of code makes it happen.

This property of an Origami project is enormously helpful when I read someone else’s project — it doesn’t matter how they’ve written it; I can *always* start at the `build` command and work forward to find all the code. The project's author also benefits from this same guarantee when they read their own project after some time away from it.

## Code is more concise than configuration

### Defining the site

Let's look at how both projects define the overall structure of the site.

Like most static site generators, Eleventy leverages the natural tree-like structure of a folder hierarchy. The good news is that the file system itself is the best picture you're going to get of the resulting site. That's also the bad news.

Let's look at the folder structure of the Eleventy project, including all relevant source files:

```
_config/
  filters.js
_data/
  eleventyDataSchema.js
  metadata.js
_includes/
  layouts/
    base.njk
    home.njk
    post.njk
  postslist.njk
content/
  blog/
    blog.11tydata.js
  blog.njk
  content.11tydata.js
  index.njk
  sitemap.xml.njk
  tag-pages.njk
  tags.njk
eleventy.config.js
```

Experienced Eleventy developers can presumably envision the resulting site, especially if they also scan [the lengthy configuration file](https://github.com/JanMiksovsky/eleventy-base-blog/blob/main/eleventy.config.js).

In contrast, the premise of a coding-focused approach like Origami is that you describe what you want in code, like this `site.ori` file which creates the blog:

```js
// This file defines the structure of the entire blog site
{
  about: {
    // About page
    index.html: templates/base.ori.html(Origami.mdHtml(about.md))
  }

  // Static assets like stylesheets
  assets/

  // Blog area
  blog: {
    // Blog index page
    index.html = templates/blogIndex.ori.html(posts.ori)

    // Create a folder for each post
    ...Tree.map(posts.ori, {
      key: (post, key) => `${ key }/`
      value: (post, key, tree) => {
        // Index page for post folder
        index.html: templates/post.ori.html(post, key, tree)
        // Any associated images
        ...post.images
      }
    })
  }

  feed: {
    // Blog feed in RSS format
    feed.xml = Origami.rss(feed.ori(posts.ori))
  }

  // Home page
  index.html = templates/index.ori.html(posts.ori)

  // Tags area
  tags: {
    // Tag index page
    index.html: templates/tagIndex.ori.html(tags.ori)

    // Create a folder for each tag
    ...Tree.map(tags.ori, {
      key: (group, tag) => `${ Origami.slug(tag) }/`,
      value: (group, tag) => {
        index.html: templates/tag.ori.html(group, tag)
      }
    })
  }

  // Not Found page
  404.html = templates/base.ori.html(Origami.mdHtml(404.md))
}

// Add a sitemap for all of that
→ (site) => {
  ...site
  sitemap.xml = Origami.sitemap(site, { base: metadata.yaml/url })
}
```

Is it cheating that this file has explanatory comments? _No!_ Files can have comments. Folders can't.

Even if you don't know Origami or JavaScript, you can probably squint and perceive the structure of the final site. For example, at the top you can see that the `about` area contains a page called `index.html`. You can ask Origami to draw a [diagram of the complete site](/images/2026/03/site.svg) to confirm your understanding.

### Defining a feed

As another example, let’s look at the code required to give this blog a feed. The Eleventy version uses the [Eleventy RSS plugin](https://www.11ty.dev/docs/plugins/rss/), which in this project is configured this way:

```js
eleventyConfig.addPlugin(feedPlugin, {
  type: "atom", // or "rss", "json"
  outputPath: "/feed/feed.xml",
  templateData: {
    eleventyNavigation: {
      key: "Feed",
      order: 4,
    },
  },
  collection: {
    name: "posts",
    limit: 10,
  },
  metadata: {
    language: "en",
    title: "Blog Title",
    subtitle: "This is a longer description about your blog.",
    base: "https://example.com/",
    author: {
      name: "Your Name",
    },
  },
});
```

The Origami project uses a function that [generates an RSS feed](https://github.com/WebOrigami/json-feed-to-rss) from a data object created this way:

```js
// The posts in JSON Feed format
(posts) => {
  version: "https://jsonfeed.org/version/1.1"
  title: metadata.yaml/title
  description: metadata.yaml/description
  feed_url: `${ metadata.yaml/url }/feed.json`
  home_page_url: metadata.yaml/url
  
  // Map the post data to JSON Feed items
  items: Tree.values(Tree.map(posts, (post, slug) => {
    // Patch image URLs to be absolute
    content_html: post._body.replaceAll('src=".\/', `src="${ metadata.yaml/url }/blog/${ slug }/`)
    date_published: post.date
    id: url
    title: post.title
    url: `${ metadata.yaml/url }/blog/${ slug }`
  }))
}
```

In both projects, you build the feed with code — but in completely different ways:

* In Eleventy you produce the feed with code that configures parameters for a feed-generation plugin whose internal workings are opaque to you. Your ability to customize that feed is limited to the extent the plugin's developers have correctly anticipated your needs.
* In Origami you produce the feed with code that creates the feed. That Origami code above is _doing the work the Eleventy plugin does_. Your ability to customize that feed is limited to the extent you can describe what you want in code.

This is the same difference between looking at numbers in Intuit QuickBooks and Microsoft Excel. The former is configured; the latter lets you calculate whatever you want. Configuration is generally sold as simpler than coding — but for creating sites, I argue that overall coding is simpler than configuration.

A separate long-term benefit of coding things is that you learn transferrable knowledge. Your potential mastery of the Eleventy RSS plugin data schema won't help you in a different blog tool, or even using a different Eleventy plugin. In contrast, learning an interchange format like RSS or (here) JSON Feed is knowledge you can apply elsewhere, as are the data manipulation techniques employed in the code above.

## Code is more expressive than configuration

Another advantage of code over configuration is expressiveness: the degree to which you can easily express your ideas without limits.

In this experiment, I could readily use Origami to support the Eleventy sample blog's preferred folder layout:

* Posts are stored in a top-level `content` folder, like `content/firstpost.md`.
* Posts with images are stored in a subfolder holding both the post (`content/fourthpost/fourthpost.md`) and associated images (`content/fourthpost/possum.png`).

I've never used this particular layout for a project before, but in code it was straightforward to implement.

I point this out because folder-based, configuration-focused tools impose very particular demands on how you organize your content. I have no idea whether it would be possible to configure, say, Astro to work with the content layout of this Eleventy project, or vice versa.

Tools like Eleventy and Astro also impose ideas about how you name and organize your source files. You might not care about that, or you may care about that a lot. In an Origami project, there's nothing special about the source file names or organization; you can structure them however makes sense to you.

To be clear, _both_ approaches require too much code! I hope someday you can make a great blog for yourself with little or no coding, one that is firmly under your complete control and isn't ransoming your own creation to you for a monthly subscription.

But we have to start somewhere. Given that today both projects have to start with a bunch of code, you might as well think about what code you want to have to learn and tinker with.

## Assessment

If you're shopping for a blogging tool, I'd encourage you to find something that's simple enough that you understand it.

As a crude metric, the conciseness of (legible) code can roughly correlate with simplicity, so I totaled the size of all source files in each project: configuration code, data, scripts, and templates. (I did not count markdown content as source, and in any event both projects use the same markdown.)

Both projects are fairly concise. Eleventy has a hidden advantage: its folder structure implicitly encodes behavior that Origami must spell out in code. Nevertheless, the Origami version is distinctly smaller:

![](/images/2026/03/sourceSize.svg)

Performance should probably be no more than a secondary concern for you when evaluating blogging tools; most static site generators are quite fast, especially for personal sites.

That said, I timed builds of both approaches via `time npm run build` on a 2024 MacBook Air M3. I threw the first (longest) time away, then averaged the `real` time of the next three builds.

Both Origami and Eleventy build this tiny blog project in less than a second:

![](/images/2026/03/buildTime.svg)

While performance shouldn't be your primary concern, in this case at least Origami comes out ahead. Origami's fundamental approach is extremely well-suited for such tasks.

### Bugs

I found three very minor possible issues in the sample `eleventy-base-blog` project. Although the issues are small and debatable, any bugs in a template project will be endlessly copied into new blogs, so their potential impact is magnified.

I want Eleventy to continue growing and their new users to have great experiences. I thought the issues might be interesting to Eleventy, so I reported them: [issue](https://github.com/11ty/eleventy-base-blog/issues/227), [issue](https://github.com/11ty/eleventy-base-blog/issues/228), [issue](https://github.com/11ty/eleventy-base-blog/issues/229).

## Conclusion

I interpret these results as demonstrating that an explicit, code-oriented solution like Origami is simpler, more concise, and more expressive than one predicated on configuration like Eleventy.

I don't know the Eleventy team personally, but they seem like perfectly nice people who care deeply about their users and want to create good tools for them. If you pick Eleventy for your site, it'll probably work out fine.

If you're interested in trying Origami for a blog, I think you'll like it. You can start with the corresponding [`origami-blog-start`](https://github.com/WebOrigami/origami-blog-start) template project.

## Appendix

The following are small points I noticed while studying the Eleventy blog; none are as important as the main points above.

### JavaScript as a template language

Template languages like Nunjucks are common, but they become another language you need to learn. If you already know JavaScript, that’s enough to be able to do anything you want in a template in Origami.

As a bonus, this means that you don’t have to do special things to invoke JavaScript from a template. When the Eleventy version wants to insert a timestamp onto a page, it registers a small JavaScript function as a [shortcode](https://www.11ty.dev/docs/shortcodes/):

```js
eleventyConfig.addShortcode("currentBuildDate", () => {
  return new Date().toISOString();
});
```

This shortcode can then be called by name from a Nunjucks template:

```
built on {% currentBuildDate %}
```

You can skip all that complexity in Origami and just inline the desired JavaScript into the template:

```js
built on ${ new Date().toISOString() }
```

If the code were longer, you could put it in its own JavaScript file and call that by file name. The Origami version uses that technique to implement the Eleventy `readableDate` function; Origami templates then call that function with

```
${ readableDate.js(post.date) }
```

### Passing data to templates

A number of the Nunjucks templates in the Eleventy blog include lines like this:

```
{% set postslist = collections.posts %}
{% include "postslist.njk" %}
```

As I understand it, a Nunjucks `include` doesn’t let you pass data directly, so you have to pass data via what's effectively a global variable. That approach is fraught with a high potential for errors. (Note: Eleventy allows the use of template engines other than Nunjucks; perhaps those are better.)

Origami templates are functions, so you can pass data to them directly:

```
${ postList.ori.html(posts) }
```

### Focusing on representing pages

Blogging tools like Eleventy use folder structure to determine the built site structure. That approach focuses on complete file resources, such as a page for an individual post.

But blog posts in this project actually have three representations:

1. The post page in the `blog` area
2. A post entry in lists of posts: home page, `blog/index.html`, and tag pages
3. A post entry in the feed at `feed/feed.xml`

The folder structure only gives you a way to conveniently express the first representation. The Origami code doesn't have any particular focus on pages; all post representations can be defined in a variety of ways.

Meanwhile, using folder structure to represent site structure has limits. It took me a while to realize that the single file [`tag-pages.njk`](https://github.com/JanMiksovsky/eleventy-base-blog/blob/main/content/tag-pages.njk) isn't just a template for a tag page; an embedded block of JavaScript at the top of the file appears to also generate the collection of pages like `tags/second-tag/index.html`.

In contrast, the Origami `site.ori` file shown earlier includes an explicit definition of the `tags` area.

### Inlining CSS

The original Eleventy blog inlined the main CSS stylesheet into every page instead of linking to it. Origami can easily do both, but as a matter of preference, I had the Origami version link to the main stylesheet.

### Navigation plugin

The Eleventy version uses an [Eleventy navigation plugin](https://www.11ty.dev/docs/plugins/navigation/). I'm probably missing something, but in this project it looks like the plugin is used to add an `aria-current` attribute to three links.

Invoking magic to do this sort of thing feels like overkill to me. I implemented this in the Origami version by adding conditions to the three links in question:

```js
${ _.area === "Home" ? `aria-current="page"` : "" }
```

This does the job, and is a lot easier for me (someone familiar with JavaScript) to understand. This could be scaled up into a helper function if necessary.

### HTML rewrites

I was baffled by this template fragment in the Eleventy version:

```
Go <a href="index.njk">home</a>.
```

I just couldn’t figure out what this was doing — what would it even mean to navigate to a Nunjucks template? Looking at the running site, I could see that the link was magically being rewritten. But even closely reading the project’s source code couldn't help me see how or why this was happening.

Claude Code identified this fragment as something handled by the [Eleventy InputPath to URL plugin](https://www.11ty.dev/docs/plugins/inputpath-to-url/).

Some people love such magic; I’m not one of them.

### Sitemaps

The original Eleventy project defined a `sitemap.xml` file so I implemented one for the Origami version. That said, a sitemap seems unnecessary for this blog; all the content is trivially discoverable by a search engine. The code to generate the sitemap ends up being both a distraction and a possible maintenance burden.

### Plugins are general features bound to specific projects

The original Eleventy blog uses a number of plugins to:

* Rewrite URLs to inject a path prefix
* Generate ID attributes for heading elements
* Transform input file paths to output URLs
* Optimize images
* Help construct navigation elements
* Define an RSS feed
* Apply syntax highlighting to blocks of code in posts

All these tasks performed by the Eleventy plugins have one thing in common: _the tasks have nothing to do with Eleventy._ Every one of them is something you might want to do on any static site, regardless of which tool you’re using to make it.

It’s in the nature of tools with proprietary interior workings to require tool-specific plugins. The lost opportunity is that, instead of sharing general-purpose code that can work with many tools, we collectively waste time rewriting the same ideas over and over for different tools.

Extensibility in Origami is provided by calling functions that can be written as generally as possible. There are no internal data structures that require proprietary plugins to manipulate. As the creator, your own code generates the requisite objects; you can pass those directly to third-party functions.

The aforementioned Origami package for [turning a data object into an RSS feed](https://github.com/WebOrigami/json-feed-to-rss) is a plain JavaScript function that has nothing to do with Origami at all. Other Origami packages are written around the use of the [standard Map class as the basis for tree structures](https://weborigami.org/async-tree/), an approach that’s at least theoretically adoptable by other tools.

