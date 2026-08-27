---
title: "Origami Projector: a customizable tool for working on your site"
draft: true
---

As noted, Projector 0.7.1 now includes a way for you to create custom menu commands that will be available when editing a project. See the video accompanying the release notes for a demo.

Projector is still at an early phase in its development, but I'm very happy with this milestone for several reasons.

First, this shows off the new `@weborigami/neocities` extension. I have a lot of respect for Neocities and think they're a good fit for Web Origami.

Second, I think this shows that Origami can serve as an _excellent_ configuration language. It's essentially JavaScript, so with a very small learning curve gains access to a large potential audience. Equally important is its ability to let you directly reference files without having to jump through hoops to register things. Many applications have "plugin" systems that require you to first register your custom code, but Origami just lets you reference it with a path.

Third, this moves Projector closer to my vision of creating a user-focused site editor along the lines of the defunct Glitch service — but delivering the experience as an app. One of Glitch's key insights was recognizing that requiring use of a command line presents an insurmountable obstacle to many potential site authors (and an unnecessary complication to many others).

Fourth, it's nice to be able to deploy a site from within Projector without having to use a command line. I'm already using this with the Netlify extension to directly deploy one of my sites: I make an edit, preview the change, then press a shortcut key to deploy.

Lastly, I think Projector has the potential to be an answer to an important question: if you're setting up a site for someone else — how do you let them edit their own site? Devs routinely create sites for a client, friend, relative, or organization. I'd like such devs to be able to tell the site's owner to install the Projector app. The dev can create a configuration file that adds all the custom stuff the site owner needs, so the owner can then edit and deploy the site on their own without ever having to use a command line.

There's still a long way to go but this release is a good step.
