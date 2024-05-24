To demonstrate that Origami is a good language for building #smallweb / #indieweb blogs, I built a fun sample site reenvisioning Henry David Thoreau has a modern influencer with a lifestyle blog about off-grid living. #BuildInPublic https://pondlife.netlify.app

Creating a site in Origami is completely different than creating a site in any other tool I know of.

![Blog post titled "Beans" with text adapted from Thoreau's "Walden"]

---

Origami isn't a blog engine or framework, just like Microsoft Excel isn't an invoicing or expense reporting framework. Excel is a general tool that transforms and aggregates numbers and text in tables. Origami is a general tool that transforms and aggregates data and content in trees. https://weborigami.org

So this project isn't configuring a blog tool — it's defining what a blog is from scratch. The source is endlessly malleable, and you can readily change what gets produced to achieve a wide variety of results.

---

To build in Origami, think about the starting tree of content you'll write or gather by hand, and the final tree of resources in your running site. Step by step, you transform the former into the latter.

For a blog you might start with, say, a `markdown` folder containing markdown posts, an `images` folder for photos, and an `assets` folder for stylesheets.

The final resource tree comprises the `images` and `assets` as is, plus generated pages for individual posts, list pages, and feeds.

![](Starting tree of content)
![](Desired tree of website resources)

---

To generate individual pages you can use a template language. Origami has a nice one built in; you can use others.

But the real magic is writing formulas to process a pile of content at once, like a pipeline that transforms markdown to HTML, calculates data, and sorts the posts to prepare them for rendering — or a compact definition of the entire public portion of the site.

![](Origami pipeline transforming a markdown folder into data)
![](Origami program that defines the publicly-visible resources for a blog site)

---

This Origami program generates the full tree of the resources for your blog, which you can browse immediately. The Origami runtime only does the work to generate a page when you ask for it.

The same Origami program can also produce a complete build folder with all your site files. Deploy those on a static web server or have a service do a build whenever you update your project.

---

Full source with more details: https://github.com/WebOrigami/pondlife
Original post: https://jan.miksovsky.com/posts/2024/05-24-pondlife.html
