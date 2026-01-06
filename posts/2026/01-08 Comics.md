---
title: Promoting a design and development tool through comics
---

To increase awareness of cool features in [Web Origami](https://weborigami.org), I kicked off a weekly comic series with a [Mastodon post](https://fosstodon.org/@JanMiksovsky/115843624038177218):

<a href="https://fosstodon.org/@JanMiksovsky/115843624038177218">
  <img src="/images/2026/01/comicPost.png" alt="4 comic panels" class="screenshot">
</a>

Each 4-panel comic will deliver a short, standalone story. I thought a 4-panel comic would be a perfect format for Twitter-like sites that allow 4 images per post. The images should add visual interest to a user's feed, and the user can read the comic right there. Each comic will also be [available as regular HTML](https://weborigami.org/comics/inline-paths) on the Origami site.

It takes a couple of hours to rough out a little story, come up with code examples, ensure they work, and revise as necessary. I write the [comic script in YAML](https://github.com/WebOrigami/docs/blob/main/comics/001%20Inline%20paths/comic.yaml), indicating who is talking, what they're saying, and what should appear in the panel.

The rest of the process is automated:

1. It's easy to compile that YAML script to HTML using Origami itself.
1. Origami can easily runs the code samples and inlines the results directly into the comic so that the terminal session and browser panels are 100% accurate.
1. To confirm code continues to work as Origami evolves, I use Origami's [`Dev.changes`](https://weborigami.org/builtins/dev/changes.html#using-changes-for-testing-static-sites) builtin to test the site and flag any changes in code output.
1. I capture HTML comic panels as PNG images using Origami's [screenshot extension](https://github.com/WebOrigami/extensions/tree/main/screenshot).
1. I use Origami and JavaScript to upload the images to Mastodon and make a post using additional information from the YAML script.
