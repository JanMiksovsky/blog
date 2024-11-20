---
title: Sample influencer lifestyle blog for Henry David Thoreau
---

To demonstrate that Origami is a good language for building #smallweb / #indieweb blogs, I built a fun [sample blog](https://pondlife.netlify.app) reenvisioning Henry David Thoreau has a modern influencer with a lifestyle blog about off-grid living.

<a href="https://pondlife.netlify.app">
  <img src="/images/2024/05/beans.png" alt="Blog post titled Beans with text adapted from Thoreau's Walden">
</a>

Creating a site in Origami is completely different than creating a site in any other tool I know of.

Origami isn't a blog engine or framework, just like Microsoft Excel isn't an invoicing or expense reporting framework. Excel is a general tool that transforms and aggregates numbers and text in tables. Origami is a general tool that transforms and aggregates data and content in trees.

So this project isn't configuring a blog tool — it's defining what a blog is from scratch. The source is endlessly malleable, and you can readily change what gets produced to achieve a wide variety of results.

To build in Origami, think about the starting tree of content you'll write or gather by hand, and the final tree of resources in your running site. Step by step, you transform the former into the latter.

For a blog you might start with, say, a `markdown` folder containing markdown posts, an `images` folder for photos, and an `assets` folder for stylesheets.

![Tree diagram of staring point with assets, images, and markdown folders](/images/2024/05/treeStart.png)

The final resource tree comprises the `images` and `assets` as is, plus generated pages for individual posts, list pages, and feeds.

![Tree diagram of site resources showing generated pages, posts, and feed areas](/images/2024/05/treeEnd.png)

To generate individual pages you can use a template language. Origami has a nice one built in; you can use others.

But the real magic is writing formulas to process a pile of content at once, like a pipeline that transforms markdown to HTML, calculates data, and sorts the posts to prepare them for rendering.

![Origami pipeline transforming a markdown folder into data](/images/2024/05/pipeline.png)

Or a compact definition of the entire public portion of the site:

![Origami program that defines the publicly-visible resources for a blog site](/images/2024/05/public.png)

This Origami program generates the full tree of the resources for your blog, which you can browse immediately. The Origami runtime only does the work to generate a page when you ask for it.

The same Origami program can also produce a complete build folder with all your site files. Deploy those on a static web server or have a service do a build whenever you update your project.

[Full source](https://github.com/WebOrigami/pondlife)
