---
title: "Font impoverished"
originalUrl: https://miksovsky.blogs.com/flowstate/2006/05/what_the_font.html
---

<p>
  Over the past few months I've found myself confronted by an unexpected
  problem: the lack of a functioning platform and ecosystem for using custom
  fonts in applications. I'd assumed this problem had been solved long ago, but
  practical experience suggests otherwise, as does the the world of extant UI
  out there. Something like 99% of the client UIs seem to use a stock system
  font, and 95% of all the real text in web pages seems to be set in a standard
  sans serif font (Arial or Helvetica). I've come to view this as one of the
  tightest practical constraints on UI expression today.
</p>
<p>
  User experiences suffer from this bland uniformity, as does an organization's
  ability to reinforce its identity. Type is such an important part of
  establishing brand. No one designs printed material without careful
  consideration of typography, yet we put up with only tiny amounts of custom
  type on web pages and in applications—and this text is inevitably hardcoded as
  images where it can't do as much good. To me this is akin to the color
  limitations of yesteryear.
</p>
<p>
  <img
    src="/images/flowstate/16_color_palette.png"
    alt="16_color_palette"
  /><br />16 colors: Limited, boring, lame
</p>
<p>
  <img src="/images/flowstate/helvetica_sample.png" alt="Helvetica_sample" />
</p>
<p>Stock sans serif font: Limited, boring, lame</p>
<p>
  Here are just some highlights from the catalogue of pain accompanying attempts
  to use a custom font in a user interface:
</p>
<p>
  <strong>Lack of decent development support for rich text.</strong> On most
  client UI platforms, if you want to display static text, you use a simple
  label control. This label control can generally display a block of text in a
  single typeface, point size, weight, and style. There's generally no support
  for simple inline changes <strong>like this</strong> that apply to a span
  within the text; text properties always affect the entire text block. This
  leads to a general apathy towards typography that pervades the entire
  development experience: since doing anything interesting is hard, why bother?
  There's generally no support for styling, so evolving a user interface that
  uses anything but the system font becomes a tedious exercise in tracking down
  font references and making sure that every obscure dialog is using your fonts
  the right way. Most platforms include a rich text control, but these are meant
  for run-time editing, not design-time editing, and their performance is
  usually terrible. Alternatively, you could host your text in a browser
  control, which has an even worse design-time experience, even worse
  performance, and complicates your development substantially as you have to
  factor text into tiny fragments of HTML.
</p>
<p>
  <strong>Licensing minefield.</strong> Oh, you thought you could just give away
  that font with your app, huh? That font file is intellectual property that you
  need to pay for, and licensing anything can be a legal nightmare. Designers at
  large software companies can call in airstrikes from their legal department to
  have licensing agreements negotiated on their behalf. Startup folk have to do
  this on their own, and what a royal pain it is.
</p>
<p>
  Font foundries are focused on graphic designers. A graphic designer usually
  needs one copy of a font for their own use. They create something in Photoshop
  or whatever with the font, then create the desired physical (print) or
  electronic rasterized output (PDF, etc.). Approaching a company like this with
  a request to include their font in your application or site will get you the
  email equivalent of a blank stare. I spent an entire morning on the phone with
  one of the largest font vendors on the planet trying to find someone who could
  license one of the company's fonts to me. I was transferred
  <em>seven times</em> to different people, none of whom had the faintest idea
  was I wasking for. One person asked me whether my application would be used by
  more than 5 people. The company's web site was no help—in fact, it was
  misleading and therefore worse than useless. Whever a company has this much
  trouble accepting money from someone desperate to do the right thing and pay
  them, something is seriously wrong.
</p>
<p>
  <strong>Installation hassles.</strong> For Microsoft Windows, at least,
  support for custom fonts remains the same as it has for years: you can only
  reference fonts that installed in system's Fonts folder. This means that your
  Setup program has to physically copy the required font files to the user's PC.
  The copied fonts are loose font files
  <em>that the user can then use themselves</em>. This is Lame with a capital
  &quot;L&quot;, particularly because it compounds your licensing nightmares
  (above). Why on earth should you have to pay to give all your customers the
  ability to use a font in their own documents just because you want to use it
  in your app's UI? You don't have to give your customers loose copies of your
  audio files, or image files, or videos, or any other type of resource. Recent
  experience has convinced me that installing fonts on Windows is a fragile and
  buggy proposition. Even with the substantial assistance of a widely-used setup
  framework, it's absurdly difficult to ensure that the fonts you want get
  registered in such a way that they can be used immediately (without requiring
  a reboot) under all conditions. Other OSes may fare better here, but given the
  problems I've witnessed in Windows, it's no big surprise that most Windows
  ISVs punt and stick with Tahoma.
</p>
<p>
  <strong>Web limitations.</strong> Web sites that want to use custom fonts can
  resort to what can only be described as hacks. You can use Microsoft's
  <a href="http://www.microsoft.com/typography/web/embedding/default.htm"
    >WEFT</a
  >
  (Web Embedding Fonts Tool) if you want to limit yourself to Internet Explorer
  and sign up for a bunch of deployment hassle. You could also look at tricks
  like <a href="http://www.mikeindustries.com/sifr/">sIFR</a> that (amazingly)
  work but involve gyrations with scripting and Flash. Isn't it odd that it's
  easier to make text blink than it is to format that same text in a font that
  is part of your organization's visual identity? One can infer that the small
  number of sites using any of these hacks is a reasonable indiciator that the
  problem remains unsolved.
</p>
<p>
  Flash is a bright spot here, giving designers the choice of embedding fonts or
  referencing installed fonts. Unfortunately, for a variety of reasons, I don't
  find Flash a viable option for mainstream application development. If you're
  someone who gets to use Flash, I envy you your freedom of typographic
  expression.
</p>
<p>
  Given the pace of change, I'm sure this problem will eventually be fixed. In a
  few years we'll look back at screen shots of client apps or web pages from
  this time and instantly recognize them as dating from an earlier era—because
  most of the text will be formatted in the same stupid sans serif fonts.
</p>
