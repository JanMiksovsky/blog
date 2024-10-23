---
title: Retire an old server to be a static site
---

<a href="https://component.kitchen/elix">
  <img src="/images/2024/10/Elix.png" alt="Screenshot of the Elix web component library documentation">
</a>

I was able retire an old #Heroku site by copying the content to a completely #static #website. Instead of resurrecting the source project and rewriting it, I used the #WebOrigami crawl command to retrieve the static files.

The [@crawl](https://weborigami.org/builtins/@crawl.html) picked up all but a few exotically-referenced resources that I copied over by hand. I dropped it all on Netlify. Some pages didn’t have an .html extension, so I added a small Netlify config to serve those as HTML. Then I pointed the old domain at the new site: Done!

Retiring this server as a static site reduces my monthly cost for it from $7/month to $0. The site’s for an old startup company but includes [documentation for a web components library](https://component.kitchen/elix) that I want to leave available.

If you’d like help retiring a site, let me know and I’ll see if I can assist.
