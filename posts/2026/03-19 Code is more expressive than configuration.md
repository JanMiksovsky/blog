---
title: "Code is more expressive than configuration: comparing a sample blog in Web Origami and Eleventy"
draft: true
---

This post is the third in a series comparing the same sample blog in [Web Origami](https://weborigami.org) and [Eleventy](https://www.11ty.dev):

- **Eleventy version:** [Source code](https://github.com/JanMiksovsky/eleventy-base-blog) and [Demo](https://original-eleventy-blog.netlify.app)
- **Origami version:** [Source code](https://github.com/JanMiksovsky/origami-eleventy-blog) and [Demo](https://origami-eleventy-blog.netlify.app)

This post looks at another advantage of code over configuration: the degree to which you can easily express your ideas without limits.

As one example, let’s look at the code required to give this blog a feed. The Eleventy version uses the [Eleventy RSS plugin](https://www.11ty.dev/docs/plugins/rss/), which in this project is configured this way:

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

In contrast, the Origami project uses a function that [generates an RSS feed](https://github.com/WebOrigami/json-feed-to-rss) from a data object created this way:

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

- In Eleventy you write code to configure parameters for a feed-generation plugin whose internal workings are opaque to you that will create the feed. Your ability to customize that feed is limited to the extent the plugin's developers have correctly anticipated your needs.
- In Origami you write code to create the feed. The Origami code above is slightly denser but it's _doing the work the Eleventy plugin does_. Your ability to customize that feed is limited to the extent you can describe what you want in code. (The code generates the feed in the JSON Feed schema, which is then easily and directly translated to RSS using a built-in function.)

The expressiveness of code gives you the freedom to tackle things the way you want to, where the code required to make the change is proportional to the complexity of the change. If you want to change the Origami feed, you can change the code above.

A long-term benefit of coding things is that you learn transferrable knowledge. Your potential mastery of the Eleventy RSS plugin data schema won't help you in a different blog tool, or even using a different Eleventy plugin. In contrast, learning an interchange format like RSS or (here) JSON Feed is knowledge you can apply elsewhere, as are the data manipulation techniques employed in the code above.

_[As I was finishing this post series, I discovered that the Eleventy RSS plugin allows you to specify a [feed template](https://www.11ty.dev/docs/plugins/rss/#sample-feed-templates), giving you the same degree of expressiveness as Origami although not as concisely. But that only makes me wonder why the plugin has to exist at all — the feed template itself isn't much longer than the plugin configuration code.]_

The expressiveness of code comes into play at every level of the Origami site. At the site's highest level, I could readily use Origami to support the Eleventy sample blog's preferred folder layout:

- Posts are stored in a top-level `content` folder, like `content/firstpost.md`.
- Posts with images are stored in a subfolder holding both the post (`content/fourthpost/fourthpost.md`) and associated images (`content/fourthpost/possum.png`).

I've never used this particular layout for a project before, but in code it was straightforward to implement.

I point this out because folder-based, configuration-focused tools impose very particular demands on how you organize your content and source files. I have no idea whether it would be possible to configure, say, Astro to work with the content layout of this Eleventy project, or vice versa.

You might not care about that, or you may care about that a lot. In an Origami project, there's nothing special about the source file names or organization; you can structure them however makes sense to you.

To be clear, _both_ approaches require too much code! I hope someday you can make a great blog for yourself with little or no coding, one that lets you design whatever you want, is firmly under your complete control, and doesn't ransom your own creation to you for a monthly subscription.

But we have to start somewhere. Given that today both projects here start with a bunch of code, you might as well think about what code you will need to learn, and whether it will let you create what you want without limits.

Other posts in this series:

1. [Code is easier to follow than configuration](/posts/2026/03-17-code-is-easier-to-follow-than-configuration.html)
1. [Code is more coherent than configuration](/posts/2026/03-18-code-is-more-coherent-than-configuration.html)
1. Code is more expressive than configuration [this post]
1. Code is more concise than configuration [coming]
