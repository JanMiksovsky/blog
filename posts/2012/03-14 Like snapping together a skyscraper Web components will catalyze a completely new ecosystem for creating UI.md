---
title: "Like snapping together a skyscraper: Web components will catalyze a completely new ecosystem for creating UI"
originalUrl: https://miksovsky.blogs.com/flowstate/2012/03/snapping-together-a-skyscraper.html
---

<p>
  In just a few years, the ecosystem in which we create UI&#0160;will change so
  dramatically that it will be hard to remember how we did things way back in
  2012.
</p>
<p>
  For a sense of perspective,&#0160;consider a similar change that transpired
  over a much longer period of time in a different industry: home construction.
  If you were building a house hundreds of years ago, you might have directly
  built or overseen most of the elements that went into your house: the framing,
  the hearth, the chimney, the roof, the windows, doors, you name it. You built
  nearly everything yourself — there were hardly any
  <em>components</em>.&#0160;Depending on where you lived, the only pre-built
  components you might have used would have been small and simple: glass from a
  glazier, bricks from a brickmaker, hardware from a blacksmith, and pipes or
  tiles from a ceramist. Even a glass window would have its surrounding parts —
  the case or sash, the wooden frame, the sill — measured, cut, and assembled on
  site and for a specific window. If you hired a craftsman like a carpenter or
  mason, everything they built for you would have been created on site
  specifically for your house.
</p>
<p>
  Now build a house&#0160;in a modern economy. The majority of your home’s
  elements are components assembled elsewhere by specialists and shipped to your
  construction site ready for final installation. When you design a house, you
  now spend a lot of your time looking through catalogs of these
  components.&#0160;Most of those components come in standardized dimensions or
  configurations. Many are quite complex. You can buy an intricate multi-part
  casement window in a variety of window configurations as a single, complete
  unit that includes wood, metal, multiple layers of glass, glass treatments,
  hinges, locks, screens,&#0160;and other hardware. You can find a similarly
  dizzying selection of pre-built roof joists, plumbing fixtures, or light
  sconces, or other components. If you want a component that someone doesn’t
  already offer for sale, you are either visionary or insane.
</p>
<p>&#0160;</p>
<p>
  <img
    alt="Window Styles 1"
    src="/images/flowstate/6a00d83451fb6769e20168e89dee22970c-pi.jpeg"
  />
</p>
<p>
  <img
    alt="Window Styles 2"
    src="/images/flowstate/6a00d83451fb6769e20167639cdd70970b-pi.jpeg"
  />
</p>
<p>
  <span
    ><em
      >A tiny handful of configurations for window components (source:
      <a href="http://www.windowexpress.co.uk/double_glazed_windows.html"
        >Window Express</a
      >)</em
    ></span
  >
</p>
<p>&#0160;</p>
<p>
  The componentization of the building industry means you can get a lot more
  house for a lot less money, and the resulting home can be better suited to
  your needs. Most of the factory-made components will be of better quality than
  what any one individual could make themselves on site. (It’s the site-built
  skylights that leak, not the factory-made ones.) And not only is the resulting
  building different; the component ecosystem brings about myriad new roles and
  industries.
</p>
<p>
  Now consider software, where&#0160;we’ve labored for years hand-crafting every
  element of the user experience like a medieval builder. The browser or OS
  gives us a tiny number of simple UI primitives; we must write nearly
  everything else in the UI by hand. For simple designs that are essentially
  fancy documents, one can use a visual editor of the Adobe DreamWeaver ilk, but
  you still have to roll up your sleeves. And any UI that affords any
  significant degree of interactively is created substantially in code on either
  the back end or front end. To the extent that UI code is “shared”, most often
  it’s actually copied and then hacked to fit, rather than implemented with a
  truly shareable component. If you did static analysis of the UI code for the
  100 most popular web apps, I’ll bet you’d find that only a tiny percentage of
  that UI code&#0160;is actually shared with another organization.
</p>
<p>
  If only there were some standard for composing and extending web UI
  components, we’d be able to unleash a UI ecosystem that would transform the UI
  world as thoroughly as the physical building component ecosystem has changed
  home construction.
</p>
<p>
  The UI field may actually undergo&#0160;a <em>bigger</em> transformation,
  because the software world isn’t subject to the same constraints as the
  physical world.&#0160;It is possible to create responsive UI components that
  change based on the device context, meta-controls that generate UI from more
  basic controls, adaptable components that change based on the user’s abilities
  and experience, and components that directly exploit third-party services.
</p>
<p>
  With such tools in hand, it should be possible to create huge, complex
  interfaces in a fraction of the time it currently takes, and for far less
  money. You’ll be able to assemble the UI of a significant application very
  quickly, and get something interesting that in many ways actually
  <em>works</em>. It will be like snapping together building parts to create a
  skyscraper.
</p>
<p>
  This transformation is still in the future, but it’s coming. One important
  step here is Google now taking the lead on a spec for web components that will
  standardize how components are defined and interact. A good summary can be
  found in
  <a
    href="http://dvcs.w3.org/hg/webcomponents/raw-file/tip/explainer/index.html"
    >Web Components Explained</a
  >. (Years ago, Microsoft tried to promulgate a standard for
  <a href="http://en.wikipedia.org/wiki/HTML_Components">HTML Components</a>,
  but it never caught on.) While closure on the web component spec is still off
  in the future — and broad availability is, of course, even further
  away&#0160;— this new world is&#0160;coming.
</p>
<p>
  This can’t happen soon enough. It will finally free us from having to waste
  such an ungodly amount of time attending to the design, coding, and testing of
  common user interface patterns, and let us move our attention up the value
  ladder to focus more on our own products’ domains.
</p>
<p>
  This development will ultimately commoditize some large portion of the
  industry’s UI output. As with the building industry, commoditization of UI
  elements will catalyze the creation of new roles in the UX industry:
  specialists who create components, component integrators, component testing
  labs, standards groups, and many more people in more organiziations creating
  better UI because they can start with solid, usable components addressing many
  of their needs.
</p>
<p>
  I’m excited by what this will mean for the QuickUI control framework. Google’s
  web component spec will eventually let the browser natively&#0160;address the
  lowermost functions which QuickUI must currently perform in JavaScript. This
  will enable much better performance, better isolation and modularity, and
  faster adoption. It’s too early to say how QuickUI evolve in this regard, but
  I want to direct its evolution such that it will transition smoothly to the
  standard web component foundation when that becomes widely available. Among
  other things, I’d looking at how to evolve the open
  <a href="https://quickui.org/catalog">QuickUI Catalog</a> of common UI
  controls so that they can someday be delivered as web components on the
  standard foundation. The goal is that someone using QuickUI controls today
  will find their investment preserved and profitable when the component future
  arrives.
</p>
<p>
  If you’re interested in tracking Google’s work on the topic, they are posting
  announcements on Google+ on the
  <a href="https://plus.google.com/103330502635338602217">Web Components</a>
  page.
</p>
