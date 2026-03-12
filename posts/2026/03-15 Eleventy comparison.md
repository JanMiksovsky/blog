---
title: Is Eleventy really that simple? Comparing a sample blog in Origami and Eleventy
draft: true
---

I want to quantify and characterize the relative simplicity and explicitness of a site created with [Web Origami](https://weborigami.org) with one created in [Eleventy](https://www.11ty.dev), a popular static site generator. (Last year I [compared Origami with Astro](https://jan.miksovsky.com/posts/2025/05-02-concise-expressions) with similar results.)

This post is for people who want to build (or rebuild) a site. If you already love Eleventy, I’m happy you’ve found something that works for you! For everyone else, I hope this can help inform your decision.

I think the comparision shows that, if you want to understand your own blog, then:

1. Explicit connections between source files are simpler than implicit connections.
1. Code is more concise than configuration.
1. Code is more expressive than configuration.

## Experiment setup

You may have heard Eleventy described as simple. To evaluate that proposition, I set up the `eleventy-base-blog` template project, their recommended starting point for new Eleventy blogs.

I studied the project until I felt I understood its construction, then ported it to Origami:

* **Eleventy version:** [Source code](https://github.com/JanMiksovsky/eleventy-base-blog) and [Demo](https://original-eleventy-blog.netlify.app)
* **Origami version:** [Source code](https://github.com/JanMiksovsky/origami-eleventy-blog) and [Demo](https://origami-eleventy-blog.netlify.app)

Both demos are essentially the same, or as close as I can easily make them. For a cleaner comparison, I made a few modifications to the [original Eleventy project](https://github.com/11ty/eleventy-base-blog):

1. The original project had an introductory message with instructions to remove it, so I removed it.
2. The original used a plugin for image optimization, but reproducing the effects of that would complicate this analysis, so I removed it.
3. I removed the original's XSLT stylesheet for the blog feed, as XSLT is being deprecated by Chrome, and WebKit and Gecko will likely follow. (I'm not saying the deprecation is warranted, but given the state of things I felt the stylesheet was a distraction.)

Beyond that I tried to port all observable behaviors and produce sites as identical as possible. One difference: The Eleventy project uses PrismJS for syntax highlighting; the Origami solution uses HighlightJS, so there are minor differences in code highlighting that could be resolved with more work.

## Follow the chain of causality

Once I had the Eleventy site working, I wanted to know: *how does it work?*

That turned out to be hard to answer, so I started with a simpler question: *what is calling what?*

Eleventy works like most static site generators: you run the tool, and it searches around inside your project for certain folders and files, then creates an output directory with your site’s HTML pages and other resources.

For such projects there will typically be an instruction in the README to run a build command like `npm run build`. That `build` script is the main entry point to the build process. So I tried to search forward from that to follow links to related files.

I got stuck:

* The `build` script for `eleventy-base-blog` invokes Eleventy, but beyond that point it's not obvious how Eleventy does what it does.
* A promising `eleventy.config.js` file makes specific references to a folder called `content` and a file called `filters.js`, but then I hit a dead end.
* I ended up searching through the entire project looking for source files, then looking in those for references to other source files.

I constructed a partial map of what calls what:

![](/images/2026/03/eleventy.svg)

The files floating in space aren’t directly referenced by any other files, so their part in the process was mysterious to me.

I eventually found an “advanced” documentation page called [Order of Operations](https://www.11ty.dev/docs/advanced-order/) that explained most (but not all) of what was going on. I then had Claude Code guess/explain how the remaining files worked. This clarified that, e.g., Eleventy template engine has lets you register JavaScript functions as "filters" you can from templates, so many of the `.njk` files were actually invoking code in `filters.js`. I hadn't been able to work out such connections myself.

I was eventually able to flesh out the above dependency diagram, adding the implicit connections as dashed lines:

![](/images/2026/03/eleventy2.svg)

Roughly half the connections in this project are dashed lines representing “action at a distance” — if you don't already know how the system works, such connections are hard to discover or intuit. This may be acceptable for something you will use all the time, but it certainly does make learning the system, or coming back to it, more difficult.

## Explicit connections are simpler

In Web Origami you take a rather different approach to building a site. Instead of focusing on folders and configuration, you define the site you want in the [Origami dialect of JavaScript](https://weborigami.org/language/expressions) that's basically JavaScript expressions with embedded file paths. You build the project with a `build` command like:

```
copy src/site.ori, clear files:build
```

You don’t know Origami, so the meaning of this command will be unclear — but you can still see an explicit reference to the file [`site.ori`](https://github.com/JanMiksovsky/origami-eleventy-blog/blob/main/src/site.ori). If you open that file, you’ll see it explicitly references all the files it uses. (We'll look at the file in a moment.)

You can repeat that process, following links from one file to another, to recover the _entire_ graph of source file calls:

![](/images/2026/03/origami.svg)

The Origami project has no hidden associations. Everything happens because an explicit line of code makes it happen.

This property of an Origami project is enormously helpful when I read someone’s else project — it doesn’t matter how they’ve written it; I can *always* start at the `build` command and work forward to find all the code. The project's author also benefits from this same guarantee when they read their own project after some time away from it.

## Code is more concise than configuration

### Defining the site

Let's look at how both projects define the overall structure of the site.

Like most static site generators, Eleventy leverages the natural tree-like structure of a folder hierarchy. The good news is that the file system itself is the best picture you're going to get of the site the project will produce. That's also the bad news.

If we look at the folder structure of the Eleventy project, including all of the relevant source files, the folder structure looks like:

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

Experienced Eleventy developers can presumably picture the resulting site, especially if they also scan [the lengthy configuration file](https://github.com/JanMiksovsky/eleventy-base-blog/blob/main/eleventy.config.js).

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

Even if you don't know Origami or JavaScript, you can probably still squint and perceive the structure of the final site. For example, at the top you can guess that the `about` area will contain a page called `index.html`. You can ask Origami to draw a [diagram of the complete site](/images/2026/03/site.svg) to confirm your understanding.

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

The Origami project uses a [function that generates an RSS feed](https://github.com/WebOrigami/json-feed-to-rss) from a data object created this way:

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

Both projects use a fair bit of code but in _completely_ different ways:

* The Eleventy version configures parameters for a feed-generation system whose internal workings are opaque to you. Your ability to customize that feed is limited to the extent the plugin's developers have correctly anticipated your needs.
* The Origami version creates a feed from scratch. That fragment above is _doing the work the Eleventy plugin does_. Your ability to customize that feed is limited to the extent you can describe what you want in code.

This is the same difference between looking at numbers in Intuit QuickBooks and Microsoft Excel. The former is configured; the latter lets you code whatever you want. Configuration is generally sold as simpler than coding — but for creating sites, coding can actually be simpler than configuration.

A long-term advantage of coding things is that you're learning transferrable knowledge. Your potential mastery of the Eleventy RSS plugin data schema won't help you in a different blog tool, or even using a different Eleventy plugin. In contrast, learning an interchange format like RSS or (here) JSON Feed is knowledge you can apply elsewhere, as are the data manipulation techniques employed in the code above.

## Code is more expressive than configuration

Another advantage of code over configuration is expressiveness: the degree to which you can express your ideas without limits.

In this experiment, I could easily use Origami to work with the Eleventy sample blog's preferred folder layout:

* Posts are stored in a top-level `content` folder, like `content/firstpost.md`.
* Posts with images are stored in a subfolder holding both the post (`content/fourthpost/fourtpost.md`) and associated images (`content/fourthpost/possum.png`).

I've never used this particular layout for a project, but in code it was fairly straightforward to implement.

I point this out because folder-based, configuration-focused tools will impose particular demands on how you organize your content. I have no idea whether it would be possible to configure Astro, say, to work with the particular `content` folder layout of this Eleventy project.

Tools like Eleventy and Astro also impose very specific ideas about how you organize your source files. You might not care about that, or you may care about that a lot. In the Origami project, there's nothing special about the source file names or organization; you can structure the files in whatever way makes sense to you.

Of course, _both approaches require too much code!_ I hope someday you can make a great blog for yourself with little or no coding, one that is nevertheless under your complete control and isn't ransoming your own writings to you with a monthly subscription.

But we have to start somewhere. Given that today both projects have to start with a bunch of code, you might as well think about what code you want to have to learn and tinker with.

## Assessment

If you're shopping for a blogging tool, I'd encourage you to find something that's simple enough that you understand it.

I think that conciseness of (legible) code can often correlate with simplicity, so I totaled the size of all source files in each project: configuration code, data, scripts, and templates. (I did not count markdown content as source, and in any event both projects use the same markdown.)

Both projects are fairly concise. Eleventy has a hidden advantage: its folder structure implicitly encodes meaning that Origami must explicitly state in code. Nevertheless, the Origami version is distinctly smaller:

![](/images/2026/03/sourceSize.png)

Performance should probably be your secondary concern when evaluating blogging tools; most static site generators are fast enough, especially for personal sites.

That said, I timed builds of both approaches via `time npm run build` on a 2024 MacBook Air M3. I threw the first (longest) time away, then averaged the `real` time of the next three builds.

Both Origami and Eleventy build this tiny blog project in less than a second:

![](/images/2026/03/buildTime.png)

While performance shouldn't be your primary concern, Origami comes out ahead here. (I'm happy to see Origami perform so well; Origami's fundamental approach is precisely suited for such tasks.)

### Bugs

I found what I think are three very minor bugs in the sample `eleventy-base-blog` project.

Although the bugs I found are minor, any bugs in a template project like this will be endlessly copied into new blogs, so their impact is magnified. I want Eleventy to continue growing and for Eleventy’s new users to have great experiences. With that in mind, I reported all three bugs: [bug](https://github.com/11ty/eleventy-base-blog/issues/227), [bug](https://github.com/11ty/eleventy-base-blog/issues/228), [bug](https://github.com/11ty/eleventy-base-blog/issues/229).

## Conclusion

For tasks like making a blog, I think an explicit, code-oriented solution is simpler, more concise, and more expressive.

I don't know the Eleventy team personally, but they seem like perfectly nice people who care deeply about their users and want to create good tools for them. If you pick Eleventy for your site, it'll probably work out fine.

If you're interested in trying Origami for a blog, I think you'll like it. You can start with the corresponding [`origami-blog-start`](https://github.com/WebOrigami/origami-blog-start) template project.

## Appendix

These are small points I noticed in studying the Eleventy blog; none are as important as the main points above.

### JavaScript as a template language

Template languages like Nunjucks are common, but they become another language you need to learn. If you already know JavaScript, that’s enough to be able to do anything you want in a template in Origami.

As a bonus, this means that you don’t have to do special things to invoke JavaScript from a template. When the Eleventy version wants to insert a timestamp onto a page, it registers a small JavaScript function as a [shortcode](https://www.11ty.dev/docs/shortcodes/):

```js
eleventyConfig.addShortcode("currentBuildDate", () => {
  return new Date().toISOString();
});
```

This shortcode can then called by name from a Nunjucks template:

```
built on {% currentBuildDate %}
```

You can skip the registration in Origami and just inline the desired JavaScript directly:

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

Blogging tools like Eleventy use folder structure to determine the built site structure. This approach focuses on complete resources, such as the page for an individual post.

But blog posts in this project actually have three representations:

1. The post page in the `blog` area
2. A post entry in lists of posts: home page, `blog/index.html`, and tag pages
3. An post entry in the feed at `feed/feed.xml`

The folder structure only gives you a way to conveniently express the first representation. The Origami code doesn't have any particular focus on pages; all post representations can be defined in a variety of ways.

Meanwhile, using folder structure to represent site structure has limits. It took me a while to realize that the single file [`tag-pages.njk`](https://github.com/JanMiksovsky/eleventy-base-blog/blob/main/content/tag-pages.njk) isn't just a template for a tag page; an embedded block of JavaScript at the top of the file appears to also generate the collection of pages like `tags/second-tag/index.html`.

In contrast, the Origami `site.ori` file shown earlier includes an explicit definition of the `tags` area.

### Inlining CSS

The original Eleventy blog inlined the main CSS stylesheet into every page instead of linking to it. Origami can easily do both, but as a matter of preference, I decided to have the Origami version link the main stylesheet.

### Navigation plugin

The Eleventy version uses an [Eleventy navigation plugin](https://www.11ty.dev/docs/plugins/navigation/). I'm probably missing something, but it looks like here the plugin is used to add an `aria-current` attribute to 3 links.

Invoking magic to do this sort of thing feels like overkill to me. I implemented this by adding conditions to the 3 links in question:

```
${ _.area === "Home" ? `aria-current="page"` : "" }
```

This does the job, and is a lot easier for me to understand. This could be scaled up into a helper function if necessary.

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

The original Eleventy blog uses 4 common Eleventy plugins (plus an additional one from the lead developer) to:

* Optimize images
* Help with navigation
* Define an RSS feed
* Apply syntax highlighting
* Turn headings into anchors

All of these tasks have one thing in common: _they have nothing to do with Eleventy._ Every one of them is something you might want to do on any static site, regardless of which tool you’re using to make it.

It’s in the nature of tools with proprietary interior workings to require tool-specific plugins. The problem is that we, collectively, waste time reimplementing the same ideas over and over for different tools — instead of sharing general-purpose code that can work with many tools.

Extensibility in Origami is provided by calling functions that can be written to be as general as possible. The aforementioned Origami package for [turning a data object into an RSS feed](https://github.com/WebOrigami/json-feed-to-rss) is a plain JavaScript function that has nothing to do with Origami at all. Other Origami packages are written around the use of the [standard Map class as the basis for tree structures](https://weborigami.org/async-tree/), an approach that’s at least theoretically adoptable by other tools.

