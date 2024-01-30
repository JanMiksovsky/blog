---
title: Functions to take screenshots of sites
date: 2024-01-30
---

The Origami language gives web creators functions for making parts of web sites in the same way a spreadsheet offers functions for crunching numbers: give a function some input, get something useful back.

Case in point: every so often I want a web page to show a screenshot of another web page. [Puppeteer](https://pptr.dev/) is great for that but cumbersome to set up, so I made [screenshot functions](https://github.com/WebOrigami/extensions/tree/main/screenshot): give them HTML or a URL, get back an image.

I used this to make a new [Examples](https://weborigami.org/language/examples) page on the Origami docs site. A build script uses the screenshot function to take pictures of each sample URL, producing a virtual folder of images that get saved as real images for deployment. This will make it easy to add new samples or update the screenshots as the sample sites evolve.
