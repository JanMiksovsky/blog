---
title: "All City Someday: a photo blog backed by Google Drive"
---

Suppose you want a #photoblog that's not on Tumblr or Instagram. Maybe you don't like being sold, or want to draw outside the lines, or want photos as part of your own site. What would a #smallweb alternative look like that let you post a photo and caption from your phone?

I made a proof-of-concept [street art photo blog](https://all-city-someday.netlify.app) that supports this on-phone flow: 1) snap a photo and set a caption, 2) save the photo to Google Drive via Files, 3) trigger a rebuild via the browser, 4) see the new photo on your own site.

<div class="sideBySide">
  <a href="/images/2024/03/postStep1.jpeg">
    <img src="/images/2024/03/postStep1.jpeg" alt="Typing a caption for a new photo in the iPhone Photos app">
  </a>
  <a href="/images/2024/03/postStep2.jpeg">
    <img src="/images/2024/03/postStep2.jpeg" alt="Saving the photo to Google Drive via iPhone Files">
  </a>
  <a href="/images/2024/03/postStep3.jpeg">
    <img src="/images/2024/03/postStep3.jpeg" alt="Triggering a Netlify redeploy in the browser">
  </a>
  <a href="/images/2024/03/postStep4.jpeg">
    <img src="/images/2024/03/postStep4.jpeg" alt="Published photo blog home page showing the new photo">
  </a>
</div>

[View source](https://github.com/WebOrigami/all-city-someday)

Google Drive is hardly #indieweb, but look beyond "corporate = bad" and consider the nature of the relationship. They provide a commodity service: you pay them, they store your files. Those files are a medium of exchange. If (when?) Google screws around, you can easily move the files to a different storage provider. Switching costs for hosted platforms like Tumblr or Instagram are _far_ higher.

All storage services provide a proprietary API to enable unique features and faster service… but also to force you to write to their stupid API and make your own code a switching cost. But most of what you want from storage is just an easy way to: 1) list directories, 2) read a whole file, and (maybe) 3) save a whole file.

The tiny [AsyncTree interface](https://weborigami.org/async-tree/interface) does exactly those things.

```ts
interface AsyncTree {
  get(key: any): Promise<any>;
  keys(): Promise<IterableIterator<any>>;
  set?(key: any, value: any): Promise<this>;
}
```

This interface lets small storage drivers deal with the stupid proprietary APIs. The Origami language can use such a driver to read images out of Google Drive and create a static, deployable site. Switching to another provider just means switching drivers.

Origami templates also understand that interface, so you can make a template that directly [maps a folder's photos](https://github.com/WebOrigami/all-city-someday/blob/main/src/index.ori) to HTML `<img>` tags with dates and captions. 🎉

<div class="sideBySide">
  <a href="/images/2024/03/photoIndexTemplate.png">
    <img src="/images/2024/03/photoIndexTemplate.png">
  </a>
  <a href="/images/2024/03/photoIndexHtml.png">
    <img src="/images/2024/03/photoIndexHtml.png">
  </a>
</div>

One significant hurdle: [obtaining a Google API credential file](https://github.com/WebOrigami/extensions/tree/main/gdrive#readme). OMG figuring out any kind of auth on Google, Azure, or AWS is like wandering through a maze of twisty little passages, all alike. It's also theoretically possible to use Google Cloud Pub/Sub to automatically trigger a site rebuild whenever a photo is added to Google Drive, but dang [that looks complicated](https://cloud.google.com/integration-connectors/docs/connectors/gsc_google_drive/configure). Maybe some other day.

Standards like Exif (for photo captions and dates) make amazing things possible. They're there for everyone to use — if a corp isn't trying to cage you in their silo.

- iOS/macOS Photos lets you edit the caption and save it _in the photo_ so this photo blog can extract it. ✅
- Google Photos lets you enter a caption but AFAICT saves it in a proprietary database instead of the photo file. Shame on them. ❌

The code for this photo blog is small: HTML + CSS + about 40 lines of Origami code. That includes defining RSS and JSON feeds. 😃

![](/images/2024/03/allCitySomeday.svg)

If I ever needed to switch storage providers, I'd just have to update the 3 lines of code that authenticate with Google and get a reference to the Drive folder. Everything else would stay the same.

Abstracting away storage doesn't just give you an interesting way to build a site, it also opens up general-purpose [terminal access](https://weborigami.org/cli/) so you can:

- Extract the caption from a specific photo on Google Drive
- Extract a specific file from Google Drive
- Extract the dates from all the photos
- Copy all the files from Google Drive to the local machine

![](/images/2024/03/cliPhotos.png)

Design notes:

1. It was fun to play with #CSS blur, text-shadow, and -webkit-text-stroke for a graffiti heading that's just plain text! May also be the first time I've ever used `magenta`.
1. I was able to auto-size the header width to be roughly as wide as the photos by playing with values for `font-size: clamp(…)`.
1. The fonts are so different from the stock fonts that any font swap was really jarring, so I forced early loading of the small font files and used `font-display: block`.
