---
title: What I learned crawling the unbelievably massive 1996 Space Jam site
date: 2023-12-11
---

To test a site-crawling feature for [Web Origami](https://weborigami.org), I thought I’d crawl the original 1996 [Space Jam](https://www.spacejam.com/1996) site. The site’s often referenced as proof of HTML longevity, but I've only ever seen the site’s famous “solar system” home page:

![Space Jam home page](/images/2023/12/spaceJamHome.png)

Having seen this home page countless times, I’d assumed the site was tiny — maybe a dozen pages?

I was wrong. The site is freaking **MASSIVE**.

Over 350 HTML files! Over 600 images! Audio clips! Videos! _VR videos!_

A map of the whole site gives a sense of scale. Click to open and explore, but, um, you’ll need to pan around or zoom out.

<a href="/images/2023/12/spaceJamMap.svg">
  <img src="/images/2023/12/spaceJamMap.png" style="border: 1px solid lightgray; max-width: 100%;" alt="Portion of a map of the Space Jam website">
</a>

It's entertaining to spelunk through this massive ancient site.

- All the HTML appears to generally work as it did when it was written. Some of it is antiquated, like the use of `<frameset>`.

- It’s been a _very_ long time since I saw anyone capitalize an HTML tag name or attribute like `HREF` or `SRC`. Still works, though!

- The `<body>` tags make use of a `background` _attribute_ that lets you pass a URI for a background image. MDN says: [Do not use this attribute!](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body)

- The site has lots of image maps — but I don’t remember ever seeing a [.map file](https://www.spacejam.com/1996/bin/bball.map) before even back in the day when the site was made. I can’t find documentation for .map files on MDN, or real docs for them anywhere.

* The [Neat Stuff](https://www.spacejam.com/1996/cmp/junior/neatstuffframes.html) page contains links to “full-size versions” of some images. The “full-size” images are 300×216 pixels in size. 🖼️🔬🤣

* The [Browser Icons](https://www.spacejam.com/1996/cmp/souvenirs/iconsframes.html) page explains how Mac users can change the icon for their copy of Netscape Navigator using the ResEdit resource editor!

* The site appears to include some [QuickTime VR movies](https://www.spacejam.com/1996/cmp/bball/qtvrframes.html), but I can’t get those to work. The web community generally cares more about backward compatibility than Apple does about its own tech.

* The original site appears to have not used separate .css files. The current site does have a single [.css file for a policy notice](https://www.spacejam.com/1996/css/wbPolicyUpdatedNoticeStyle.css), presumably added later. If you compare the current site with snapshots in the Wayback Machine, you can see Warner Bros. occasionally updates the site. It’s great that the current site has an “Accessibility” link to their accessibility policy, but that link was added long after the movie.

* Oddly, there are two copies of the home page at [jam.htm](https://www.spacejam.com/1996/jam.htm) and [jam.html](https://www.spacejam.com/1996/jam.html). The second one is only linked to by a moribund [Press](https://www.spacejam.com/1996/cmp/pressbox/pressboxframes.html) page. Someone may have updated that page later to remove the news stories and assumed the home page had a modern .html extension. Someone later noticed the broken link, but instead of fixing it created a second copy of the home page.

Poring over it, I think the original Space Jam site is a remarkable artifact.

- For an early site, it’s breathtakingly ambitious and executed to a consistent level of production values.
- It’s a beautiful work in a then-new medium, with the creators trying to match what they wanted to say with what they thought their audience would want or were ready for.
- This immense, handwritten and hand-tested pile of HTML contains remarkably few errors. The site contains 1,954 handwritten `<a>` tags, but of those the Origami crawler only finds 3 links which are broken.
- The site continues to serve as a premier example of the web platform’s admirable, vital commitment to backward compatibility.

Kudos to the [people behind the site](https://www.spacejam.com/1996/cmp/pressbox/credits.html): executive producer Donald Buckley, producer Dara Kobovy-Weiss, designers Jen Braun Davies and Andrew Stachler, and writer/coder Michael Tritter. And kudos to Warner Bros. for keeping the site up!

If you want to inspect the site yourself, you can crawl and copy it using the following command (requires Node to be installed but no other pre-installation):

```
npx @weborigami/origami "@copy @crawl(tree://www.spacejam.com/1996/), @files/spacejam"
```

Origami’s [crawl](https://weborigami.org/language/@crawl.html) command doesn’t throttle requests, and doesn’t try to recover dropped files, so it may not copy everything. Once the site is copied, you can serve it with whatever server you like, or:

```
npx @weborigami/origami @serve spacejam
```
