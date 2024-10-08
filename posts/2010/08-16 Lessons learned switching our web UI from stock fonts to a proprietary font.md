---
title: "Lessons learned switching our web UI from stock fonts to a proprietary font"
originalUrl: https://miksovsky.blogs.com/flowstate/2010/08/lessons-switching-our-web-ui-from-stock-fonts-to-a-proprietary-font.html
---

<p>
  Four years ago I wrote about how
  <a href="/posts/2006/05-09-font-impoverished.html">impoverished</a>
  most UIs were when it came to rendering live text in fonts other than the
  small set of stock fonts generally available on all operating systems. This
  situation has thankfully changed in the interim, tipping to the point where
  Cozi was able to incorporate a proprietary font in a recent redesign of our
  web client. We’re now using
  <a href="http://www.fonts.com/findfonts/SearchPage.htm?kid=Avenir">Avenir</a>,
  a sans serif font in the Futura vein by reknowned designer Adrian Frutiger.
  <br />&#0160;
</p>
<p>
  <img src="/images/flowstate/6a00d83451fb6769e20133f3198294970b-pi.png" />
  <br /><em><span>Sample of Avenir 45 Book</span></em>
</p>
<p>
  <br />While many other sites cover the technical aspects of using fonts in web
  pages, I thought it was worth sharing some lessons I learned from a designer’s
  perspective. Using custom fonts is something that actually works now, but
  there are still hassles today:
</p>
<ol>
  <li>
    <strong
      >There are currently two distinct routes to using custom fonts:</strong
    >
    1) buy them and host them yourself, or 2) use a font hosting service like
    <a href="http://www.typekit.com/">Typekit</a> or the (free!)
    <a href="https://fonts.google.com/">Google Font Directory</a>. Using a font
    hosting option seems much simpler, but in my mind has some significant
    limitations. <br />
    <br />Depending on which service you use, your choices may be quite limited.
    This issue will certainly fade away quickly (a year?), but at the moment,
    you still don’t have access to everything you’d want. If you already have a
    brand identity you care about and worked to refine, it may be impractical to
    chuck it all and go with some new font just because it’s easy to reference
    on a web page. In our case, we selected a font that we felt was consistent
    with our brand values and good for both body text and data (like a family
    calendar). The font we picked wasn’t available on a hosted service at the
    time, and we were willing to go to some lengths to get it. <br />
    <br />With the service route, actually getting the supplied font code to
    work can be a hassle. Most suppliers of web componentry seems to feel that
    it’s fine to dictate where you <em>need</em> to stick their &lt;script&gt;
    tag. These solutions always work great in some toy test app, and completely
    break when added to a large complex web application. Google actually get
    this right: you can host a font with a completely plain &lt;link&gt; tag.
    Unfortunately, Google currently offers a tiny number of fonts, none of which
    were appropriate for our use. <br />
    <br />Based on these factors, we elected to just license the fonts and host
    the files ourselves. This required a bit of pain, on several fonts…
    <br />&#0160;
  </li>
  <li>
    <strong
      >The major font foundries are still just waking up to the potential of
      hosting.</strong
    >
    The Avenir typeface we wanted to use is owned by Monotype Imaging, which
    earlier this year hadn’t yet released their own
    <a href="http://webfonts.fonts.com/">Fonts.com web fonts</a> hosting
    service. This meant we’d have to host the files ourselves, which required
    signing a licensing contract. This is an old-school purchasing process: we
    had to, like, <em>sign documents</em> and fax them to Monotype. We also had
    to (or, depending on your prespective, got the chance to) negotiate a price.
    This consumed quite a bit of time. <br />
    <br />Moreover, Monotype’s lawyers were still grappling with some legal
    aspects of hosting fonts. They’re used to an older world where fonts are
    licensed to a customer for use exclusively within that company’s internal
    design team for producing printed material, or creating web imagery in which
    the text is baked into the image. In either case, there’s no risk to the
    foundry that the people who <em>read</em> the printed material or imagery
    are going to be able to use the fonts themselves. Hence, heretofore there
    hasn’t been such a pressing need to clarify what can be done with the font
    files. <br />
    <br />Now that people want to serve up web pages using proprietary fonts,
    that situation has changed. The lawyers are focused on protecting their
    intellectual property (the fonts they own), and are nervous about
    controlling where those fonts get used. If site A has paid to use a font on
    site A, what’s to stop the folks who make site B from digging through site
    A’s CSS, finding the reference to the font, and using that reference on site
    B? <br />
    <br />In our case, we asked Monotype if we could serve the licensed fonts in
    the emergent <a href="http://en.wikipedia.org/wiki/WOFF">WOFF</a> format,
    and had to wait while their lawyers finished an investigation of WOFF and
    came up with legal language in the contract to cover it. <br />&#0160;
  </li>
  <li>
    <strong
      >Hosting a font can entail legally-mandated server configuration.</strong
    >
    Monotype’s licensing contract stipulated measures we had to take to protect
    their intellectual property. Internet Explorer’s proprietary EOT font file
    format includes built-in DRM, but the WOFF format does not. We were forced
    to set up a form of Cross-Origin Resource Sharing to prevent other sites
    from linking directly to Cozi’s copies of the font we licensed. This didn’t
    take too long, but it was still annoying to deal with. <br />&#0160;
  </li>
</ol>
<p>
  These hassles will likely disappear in a year or so. When our licensing
  contract runs out, we’ll likely switch to a hosted solution to avoid most of
  the trouble above. Even when the above issues are addressed, however, moving
  from a stock web font to a proprietary font will entail some issues you should
  keep in mind:
</p>
<ol>
  <li>
    <strong
      >Fonts that look great in simple samples may look unacceptably bad in real
      use. </strong
    >A font that looks great in print may look awful online unless it’s been
    specifically <em>hinted</em> for on-screen use. That is, the font foundry
    has to spend an insane amount of time optimizing the font for a range of
    specific point sizes at which the font may be used to render text. The
    online font stores all give you a way to see samples of the text, but (for
    the time being) in many cases those samples are rendered on a server, and
    may use better rendering than what your users will see in practice.
    Similarly, trying out a font in Photoshop may produce great-looking results
    that cannot be reproduced in a browser. The only way to ensure a font is
    going to look great on a web page is to actually use it on a web page. That
    wouldn’t be such a problem if… <br />&#0160;
  </li>
  <li>
    <strong
      >Online font stores aren’t designed for real experimentation. </strong
    >You generally have to buy the font before you can really try it out. While
    this may be a small cost ($25, say), that only covers one weight of the
    font. We ended up having to test about 6 weights of Avenir to settle on the
    two we wanted to use. This experimentation can get expensive. <br />
    <br />I’ve seen a lot of fonts that with insufficient hinting, so I was
    particularly careful to evaluate the fonts we were considering at a wide
    range of point sizes. I was particularly happy to see that, just in time for
    our use, Monotype made available a full set of Avenir weights with improved
    hinting. Despite this attention on hinting, however, we still got burned a
    bit. It turns out that a specific letter (the lowercase “e”) looks bad a
    specific point size (11pt) in a specific weight (Avenir 85 Heavy) we just
    happen to use in some of our menus. This was easy to work around (by bumping
    the text size up a point), but just goes to show that you can’t be too
    careful. <br />&#0160;
  </li>
  <li>
    <strong>Type metrics change between fonts.</strong> The same text rendered
    in the new font may be slightly bigger or smaller than the same text in the
    old font. In our case, most of our web pages had been constructed well, and
    were resilient to this change. I don’t recall any places where we need to
    make a substantial change to the UI in response to changing the font. YMMV.
    <br />&#0160;
  </li>
  <li>
    <strong>The feel of the text may change. </strong>This was something of a
    surprise to me. While Arial (our old font) has roughly similar text metrics
    to Avenir (our new font), the overall feel of Avenir is lighter. This is due
    to a thinner stem weight; i.e., the lines that make up the characters are
    slightly thinner in Avenir. When we initially deployed the Avenir font,
    users responded that the text was too light. As it turns out, we’d
    previously been using a medium-dark gray (#474040) for body text in Arial —
    precisely to lighten Arial up a bit. So we had to tweak our colors to adjust
    to the new, lighter font. <br />&#0160;
  </li>
  <li>
    <strong
      >Users of older versions of Firefox, Safari, and Chrome won’t see the
      proprietary font.</strong
    >
    (Internet Explorer has supported them for years.) This lag can complicate
    the tuning of your site for the specific text metrics of your new font:
    optimizing for the new font can make things worse for users seeing the old
    font, and it’s a pain to create slightly different style sheets for both
    conditions. <br />&#0160;
  </li>
</ol>
<p>
  So switching from a stock font to a proprietary font isn’t quite as easy or
  perfect as it should be. I’m still ecstatic things have improved to the point
  where sites can start making real use of real fonts to achieve new levels of
  design expression. In five years, we’ll all look back on screen shots of sites
  from this age and laugh at them. Today’s web sites will look <em>old</em> —
  and part of what will make them look old will be their use of stock fonts.
</p>
