---
title: Who else would use a shared Electron library to create and deploy Netlify sites?
---

I’m interested in helping to create a shared JavaScript library for letting Electron apps authenticate with Netlify (and potentially GitHub/GitLab pages) via OAuth for the purpose of creating new projects and uploading files to existing projects.

The users in the web publishing ecosystem are benefiting from Electron becoming a de facto standard for user-facing tools. As Niki [relates](https://tonsky.me/blog/fall-of-native/), Electron is winning because "native has nothing to offer". Many developers are voting for Electron these days; I'm one of them.

One task I want my Electron app to perform for end users is helping them select or create a site on a static site host and later deploy locally-built files to that site. Netlify is an attractive target because it supports OAuth; GitHub Pages and GitLab Pages are others.

As it stands today, many tools that want to perform this task on the user's behalf msut guide the user through creating an account with a host, obtaining a developer credential such as an access token, then copying the token and various other details into the tool. This is complex enough for a developer — and _ridiculously_ complex for a non-developer. I think [Publii's walkthrough of this process](https://getpublii.com/docs/build-a-static-website-with-netlify.html) is as clear as possible and it's probably still daunting to many people that might want to create a site.

Netlify offers developers the possibility of an OAuth-based UI flow, but that's a non-trivial thing to create from scratch:

* Create a window or dialog in the Electron renderer
* Define an HTML-based wizard that walks the user through the process, asking the absolute minimum number of questions
* Negotiate the OAuth exchange (as I understand it, this requires a server)
* Figure out what files need to be uploaded for a Manual Deploy, or bundle files for a ZIP deploy
* Upload the files
* Display progress feedback to the user
* Communicate success and errors in a meaningful way

Even with the help of AI, creating and maintaining this would be some work. But much of this work would be generic — so it could be implemented in a library shared by multiple tools.

A conceptual, back-of-the-envelope API sketch for a hypothetical `NetlifyPublish` library:

```js
// Select the site or create a new one
const siteDetails = await NetlifyPublish.selectSite({ name: "My blog" });

if (siteDetails) {
  // Successful, deploy build to site
  const files = await doTheBuild(); // However the tool wants to do that
  const success = await NetlifyPublish.deploySite(siteDetails, files);
}
```

There are many details to hammer out — how is work split across the main Electron process and the renderer? To what extent can the server component be generalized and shared as a community service? On the renderer side, how is the UI made modal: a `<dialog>` or a separate `BrowserWindow`? How are the built files represented? How is the UI themed? etc.

If you work on a tool that would might benefit from such a shared library, or are interested in participating in its design and/or implementation, please get in touch!