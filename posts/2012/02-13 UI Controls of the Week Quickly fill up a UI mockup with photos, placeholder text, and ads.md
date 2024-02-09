---
title: "UI Controls of the Week: Quickly fill up a UI mockup with photos, placeholder text, and ads"
originalUrl: https://miksovsky.blogs.com/flowstate/2012/02/placeholders.html
---

<p>
  When you’re designing a new UI, you often need to experiment with a variety of
  UI layouts in advance of having content that’s representative of what your UI
  will eventually display. This is a good thing — you don’t want to be burdened
  with the task of creating meaningful content when you’re focused on layout and
  navigation flow. In the exploratory stages of design work, it’s also important
  for you, or your design’s reviewers, to not get caught up too much in the
  generation of sample content.
</p>
<p>
  This is why designers have long used
  <a href="http://en.wikipedia.org/wiki/Lorem_ipsum">Lorem Ipsum</a> placeholder
  text to fill up a design. It looks like real text (which would not be the case
  if you simply mashed the keyboard), and you can
  <a href="http://www.lipsum.com/">generate an infinite amount of it</a> to fill
  up any design you’re working on. Most designers also have a collection of
  placeholder images or advertisements they can use to fill up a design mockup.
  One service will dynamically serve up
  <a href="http://placekitten.com/">placeholder photos of kittens</a>, although
  I’d imagine the conspicuous presence of zillions of kittens will be highly
  distracting for most web site designs.
</p>
<p>
  Although end users never see these sorts of placeholders, they’re nevertheless
  an essential element in the software development process. I’ve yet to see
  placeholder components included in a UI library, but it seems eminently
  reasonable for these placeholders to be packaged up as reusable controls.
  Anything that cuts down on design time is money in your company’s pocket.
</p>
<p>
  With that in mind, the QuickUI library now has several placeholder controls:
</p>
<p>&#0160;</p>
<p><strong>LoremIpsum</strong></p>
<p>
  The <a href="https://quickui.org/catalog/LoremIpsum/">LoremIpsum</a> control
  generates an arbitrary number of paragraphs of Lorem Ipsum text. You can
  control number the number of sentences per paragraph. By default, the first
  sentence of the first LoremIpsum control starts with “Lorem ipsum dolor sit
  amet…”, but you can control that as well.
</p>
<p><strong>FlickrInterestingPhoto</strong></p>
<p>
  The
  <a href="https://quickui.org/catalog/FlickrInterestingPhoto/"
    >FlickrInterestingPhoto</a
  >
  control grabs a photo from Flickr’s
  <a href="http://www.flickr.com/explore/interesting/">Interestingness</a>
  collection for the previous day. You can pick one of Flickr’s standard image
  sizes, or you can use CSS to scale the photo to an arbitrary size.
</p>
<p>
  I use Flickr for this control because it’s free, has a good API, has
  high-quality images, and the images will change each day. It’d be pretty
  straightforward to adapt the control to another photo service.
</p>
<p><strong>AdPlaceholder</strong></p>
<p>
  Finally, the
  <a href="https://quickui.org/catalog/AdPlaceholder/">AdPlaceholder</a> control
  creates a rectangle the size of any
  <a href="http://www.iab.net">IAB</a> standard ad unit, or you can specify an
  arbitrary size.
</p>
<p>
  I’ve looked for a server that would serve up meaningful ad images, but haven’t
  found one. Some sites will give you a small set of ad placeholders, but
  they’re too boring to be convincing, and the small size of the sample set
  means you get too much repetition. An ad placeholder service would be quite
  useful. It would give advertisers free exposure, although the ad server would
  need to be rigged to <em>not</em> count such impressions as meaningful. All
  this means that it’s hard to provide a general-purpose ad placeholder control.
  It would be quite easy, on the other hand, to create an ad placeholder control
  that worked against a specific ad server and ad account.
</p>
<p>&#0160;</p>
<p>
  Using placeholders like these let you quickly fill up a mockup. E.g., the
  <a
    href="https://quickui.org/catalog/PersistentPanel/persistentPanelSideDemo.html"
    >demo</a
  >
  for the
  <a href="https://quickui.org/catalog/PersistentPanel/">PersistentPanel</a>
  control uses all three types to block out a fairly interesting layout on the
  fly:
</p>
<p>&#0160;</p>
<p>
  <img
    alt="PersistentPanel (side)"
    src="/images/flowstate/6a00d83451fb6769e20168e6fdf9fc970c-pi.png"
  />
</p>
<p>&#0160;</p>
<p>
  In practice, I’ve discovered that these dynamic placeholder controls deliver a
  substantial benefit over relying on static content: the random content forces
  me to cope with layout situations I might not expect or encounter until far
  later in the development process. Designers have a innate tendency towards
  perfection, and invariably pick sample content to make a layout look as
  appealing as possible. For example, a design for a window will typically show
  a set of content that perfectly fills the window, but as I noted long ago,
  such a design is
  <a
    href="/posts/2005/07-13-a-ui-sketch-whose-controls-perfectly-fill-the-window-is-probably-too-good-to-be-true.html"
    >probably too good to be true</a
  >. Your team will end up evaluating a design according to a degree of
  theoretical perfection that will never be seen in production. By building
  mockups around dynamic content, you force yourself to recognize and adapt to a
  more meaningful range of text run lengths, picture aspect ratios, and so on.
</p>
