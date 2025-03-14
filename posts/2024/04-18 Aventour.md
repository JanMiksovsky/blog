---
title: Sample Origami site for an outdoor trekking company
---

Each month this year I'm trying to post a sample website written in [Origami](https://weborigami.org), a declarative programming language at the level of #HTML and #CSS for defining websites. This month's sample is [Aventour Expeditions](https://aventour-expeditions.netlify.app), a site for an outdoor travel company.

It's easy to have Origami call other template languages, so for this sample I used the [Handlebars](https://handlebarsjs.com) template language to turn markup and data into HTML.

![Home page for an outdoor trekking company with tagline 'Start your adventure'](/images/2024/04/trekHome.png)
![Page for a trek to the Wadi Rum desert in Jordan](/images/2024/04/trek.png)

It took just a few lines of Origami code to define the structure of the site and indicate which Handlebars template should be used to create which pages. For this outdoor travel example, Origami makes it very, very easy to:

- Create a web page for trek described in markup with front matter.
- Create index pages showing cards for a set of treks.
- Create a gallery page showing each image in a folder. Origami makes it very easy to pass a Handlebars gallery template the list of image file names, which the template can turn into img tags and links.

![Origami site definition for the trekking company site](/images/2024/04/aventourSite.png)
![Tree diagram of the trekking company site](/images/2024/04/aventourTree.png)

Origami also made it easy to cross-link the data for each trek with related treks. That allows the page for one trek to show cards links to related treks.

![Page showing related treks to mountain destinations in Canada and Nepal](/images/2024/04/relatedTrips.png)

Aside: modern HTML and CSS are soooo much better than the past. I based the trekking site on a WordPress template whose design I liked but whose HTML/CSS was ridiculously complex and burdened with tons of JavaScript for trivial things.

Rewriting slashed the size of the pages. For the home page:

Before: 42k HTML, 600k CSS, 1580k JS

After: 13k HTML, 12k CSS, 0k JS!
