---
title: "Some lessons from an open source project that never gained critical mass"
date: 2013-12-01
originalUrl: http://blog.quickui.org/2013/12/01/some-lessons-from-an-open-source-project-that-never-gained-critical-mass/
---

<p>
  I recently announced that I was
  <a
    href="http://blog.quickui.org/2013/11/26/ending-active-development-of-quickui/"
    >halting development on QuickUI</a
  >, and thought it would be a good idea to do a little post-mortem before
  moving on.
</p>
<p>
  The good side: As a framework for web application UI development, QuickUI
  measured up to its design goals. It was useful for creating complex
  application UIs with a good separation of concerns between UI components. The
  core framework was highly reliable with a fairly tight abstraction and
  acceptable performance. QuickUI was used in some companies for real production
  apps with real users. The very small number of developers who actually used
  the framework said they liked it and were impressed by what it could do.
</p>
<p>
  The bad side: As an open source project, QuickUI never achieved critical mass.
  QuickUI was my first attempt at kickstarting an open source project to help
  establish an ecosystem for component-based web user interfaces. I’d initially
  held the naive view that simply publishing something as open source (which I
  did in late 2009, two years into QuickUI’s development) would, on its own,
  generate community interest and participation. But the universe of open source
  development projects is vast, and simply making something free doesn’t make it
  popular. Free products still need to appeal to their audience and gain
  adoption through a good feature set, great distribution, and substantial luck.
  Eventually, QuickUI was overtaken by open web component standards (which is a
  good thing), and it no longer made sense to continue investment in QuickUI.
  Before moving on, I wanted to write down some of the lessons the QuickUI
  project held for me.
</p>

<ol>
  <li>
    <p>
      <strong
        >People care about the stack of technologies beneath your
        project.</strong
      >
      I used to think that all that mattered is whether a tool worked and was
      easy to use, but most developers make demands the construction of the tool
      itself: programming language, runtime platform, dependent libraries, etc.
      The most common reason someone will offer for this is that they may need
      to diagnose a bug in the code and fix it. That may also be true, but I
      think most people have less glorified reasons for considering the
      technology behind a tool.
    </p>
    <p>
      First, simply understanding the vocabulary associated with a given stack
      requires investment. Occasionally you come across a tool on GitHub whose
      Readme says the tool can be configured via a .foo file, where the location
      and syntax of a .foo file is completely obvious to current users of that
      tool’s stack. If you don’t already know what a .foo file is, you’re less
      likely to adopt that tool.
    </p>
    <p>
      Second, a developer toolchain is a creaky, cantankerous beast, and
      incorporating multiple stacks of tech is a pain. This is less about
      debugging than what Bruce Sterling refers to as the
      <em>wrangling</em> required to get things to work together.
    </p>
    <p>
      Third, you trust tools on stacks that have worked for you in the past, and
      are skeptical that tools on unfamiliar stacks will actually work as
      advertised. For example, I’ve hardly ever used Ruby, and rarely use Ruby
      gems. When I see a tool published via npm, I feel comfortable installing
      and using it, even if I never look at its source, because I’ve used many
      tools that way. If I see a tool that does
      <em>the exact same thing</em> published as a Ruby gem, I view its efficacy
      as black magic.
    </p>
    <p>
      Last, people implicitly trust other people who have selected the same
      technology stack. “If someone has made the same technology choices I have,
      they must be as enlightened as I am!” Conversely, people look askance at
      those who make different choices. A die-hard plain JavaScript coder may
      view the Clojure community are pot-smoking hippies, while the Clojure
      developer may view the original party as a latter-day COBOL dork lacking
      sufficient brainpower and awareness.
    </p>
    <p>
      In the case of QuickUI, when I started on it in late 2007 or so, I was
      most comfortable writing in C#, so when I needed to write a build-time
      compiler for UI markup, I wrote it in C#. Bad idea. Despite the fact that
      there was no run-time need for .NET, and that the compiler ran perfectly
      well on a Mac (under Mono), no one would take it seriously with the taint
      of .NET on it. I was eventually able drop the compiler altogether, and
      rely on a stack of tools which jQuery developers were already familiar,
      but that cost the project time and effort.
    </p>
  </li>
  <li>
    <p>
      <strong
        >Using anything other than native web technologies — plain HTML, plain
        JavaScript, and plain CSS — significantly constrains your
        audience.</strong
      >
      This is similar to the above point, but pertains to your project’s source
      code rather than the stack of technologies supporting that source. Again,
      part of the argument here is that they might theoretically need to dive
      into the runtime source to diagnose a problem, but I think the reaction is
      usually more instinctive than that.
    </p>
    <p>
      At one point in the development of QuickUI I discovered that working in
      CoffeeScript was much more productive for me than in plain JavaScript. In
      short order, I
      <a
        href="http://blog.quickui.org/2012/05/15/porting-quickui-to-coffeescript/"
        >ported the QuickUI runtime to CoffeeScript</a
      >. Switching to CoffeeScript was a huge productivity boost for me — but
      represented a huge reduction on the potential audience for QuickUI.
    </p>
    <p>
      For one thing, it seemed nearly impossible for me to get potential
      developers to ignore the presence of CoffeeScript. CoffeeScript compiles
      to plain JavaScript, but anyone who looked at the QuickUI source repo saw
      “CoffeeScript” listed as the primary language… and walked away. They might
      say, “Your project looks interesting, but I don’t know CoffeeScript.” I’d
      tell them they didn’t need to know CoffeeScript — that was an
      implementation detail — but they’d already decided they were uninterested.
    </p>
    <p>
      Over and over, the general feeling was, “I just don’t want to use
      something that uses something I don’t already know.” And then, of course,
      for most people who really did want to be able to grok the source,
      CoffeeScript was a non-starter.
    </p>
    <p>
      To build a community around a project, you probably want as many people as
      possible to be able to participate. Even if you hate JavaScript, it’s the
      web’s lingua franca. Using any other language for an open web project may
      not be an insurmountable obstacle, but at the very least it’s a
      significant handicap. As much as it pained me, when I started up the
      subsequent
      <a href="http://janmiksovsky.github.io/quetzal/"
        >Quetzal web components</a
      >
      experiments, I did so in plain JavaScript.
    </p>
  </li>
  <li>
    <p>
      <strong
        >Everyone will insist there is one thing you must do that will make your
        library more acceptable — and all those things are different, and all
        those things together are probably still insufficient.</strong
      >
      Over the course of the past few years, I have given many, many QuickUI
      demos, and received feedback on all aspects of the tool, the accompanying
      site at quickui.org, the learning process, etc. Very little of this
      feedback was consistent; everyone fixated on something different. I
      thought, if I just respond to all the feedback, surely at some point the
      barrier to adoption will be low enough that people will start adopting the
      tool.
    </p>
    <p>
      On the basis of such feedback, I spent a huge amount of time improving
      things. Early on, someone said I should move the source to GitHub, so I
      did. Someone said it needed better documentation, so I wrote a lot of
      documentation. As discussed above, numerous people suggested moving away
      from .NET, so I did. Someone suggested having live examples of UI
      components, so I built those. Someone thought a tutorial would be helpful,
      so I made an interactive tutorial. (Which many people complimented. Thank
      you!) One person’s key complaint with the entire framework was that the
      home page didn’t have icons; if the framework was to be successful, the
      home page needed little icons to indicate which browsers were supported by
      the framework. I did that. I received many, many other suggestions, and I
      incorporated almost all of them.
    </p>
    <p>
      None of it mattered. The feedback was actionable, and probably much of it
      was accurate, but even addressing (nearly) all of it wasn’t enough to make
      the project successful.
    </p>
    <p>
      The fact is that most people are unwilling to invest the time to
      understand, analyze, and articulate what’s really wrong with your project.
      Of the people who gave me feedback, few of them actually looked hard at
      it, very few had actually tried it beyond the online tutorial, and very,
      very few were willing to speak directly to their key concerns. This is all
      understandable — people are busy, spending time on a framework of unknown
      value is potentially wasted, and most people want to be nice to you — but
      feedback on a project should be accepted with these phenomena in mind.
    </p>
  </li>
  <li>
    <p>
      <strong>Paradigm shift is prohibitively expensive.</strong> Early on, one
      person told me that building UI in a component-oriented fashion
      represented a significant paradigm shift — and that represented a
      potentially insurmountable obstacle for QuickUI.
    </p>
    <p>
      The problem with a paradigm shift is that it’s hard to even have a
      conversation with someone whose conceptualization of the world doesn’t
      even allow them to recognize the problem they have. I spoke with many
      developers who viewed the undifferentiated pile of JavaScript generating
      their UI as the way things had to be done. They were more concerned with
      getting their UI to work across multiple browsers than to worry about
      componentization — even though a good component library is exactly the
      sort of thing that would have made cross-browser work more manageable.
      (The cross-browser hacks could have been folded into the components,
      allowing them to work at a higher level of abstraction, etc.)
      Interestingly, these same developers would carefully factor their code
      into classes or functions with clear lines of responsibility. They applied
      good factoring to every other thing they coded
      <em>except their web UI</em>.
    </p>
    <p>
      Over the past year or so, Google and others have been evangelizing a
      component-oriented paradigm for web development. At some point, we’ll go
      through some phase-change where that paradigm will suddenly become
      dominant. I’m betting that change will happen before late 2015. By then,
      it will be hard to find a good web UI developer who doesn't think of their
      UI in terms of components.
    </p>
  </li>
  <li>
    <p>
      <strong
        >People are only interested in something if others are already using
        it.</strong
      >
      This is true for both seasoned developers and novice developers — but for
      different reasons. The novice teaches themself jQuery or Backbone or LESS
      because experienced people use those things, which means they’re probably
      interesting and useful. The seasoned developer picks up a new tool that
      others are using because the alternative — using something with a tiny
      user base — represents unacceptable risk.
    </p>
    <p>
      This last point was made to me by the most abrasive person I ever spoke
      with about QuickUI. In fact, I think it’s because they were untroubled by
      politeness that they could speak the truth. They said: “I would love to
      use this, but I can’t. If something were to happen to you, I would be
      stuck having to fix your bugs. I made a bet like this in the past, and was
      stuck supporting someone else’s framework. I won’t do that again. Come
      back when lots of other people are using this.”
    </p>
    <p>
      So this developer had, at some point, found a great piece of technology,
      developed by someone else, and they staked their own reputation on
      adopting this technology, only to have it completely fall apart when the
      other party went away (went bankrupt, was acquired, whatever). It’s
      probably safe to assume that most seasoned developers have had a similar
      experience. For every open library, there must exist some critical mass at
      which the library’s community becomes self-sustaining.
    </p>
    <p>
      At that point, if you find a bug in the library, someone else in the
      community has probably also found the bug, and maybe even fixed it. Enough
      other people are invested in the library that, even if the original
      developer disappears, the remaining investors will keep it going for as
      long as that makes technological sense.
    </p>
    <p>
      I’d be very interested if someone could pinpoint the size of that critical
      mass. I’m guessing the number is pretty small: perhaps 10 active
      contributors might be sufficient to create the perception the library is
      well-maintained and not going away. Whatever that size is, I couldn’t grow
      QuickUI to that size.
    </p>
  </li>
  <li>
    <p>
      <strong
        >Google could publish a JavaScript library for cloud-based ham
        sandwiches and a thousand people would immediately star the repo on
        GitHub.</strong
      >
      For much of my career, I focused my attention almost entirely on the value
      a product created, and gave very little thought to how a product would be
      distributed. Distribution is, in fact, at least as important, and maybe
      more important, than underlying value. That’s certainly true in the short
      term. And, over the long term, well, maybe technology changes quickly
      enough that the long term never comes into play.
    </p>
    <p>
      I’m not saying individuals can’t launch successful open source projects,
      but rather that doing so within the context of a company with name
      recognition and a developer outreach program makes it much, much easier.
      The people working within such a context may not realize it. I once heard
      someone describe people who work at big companies as “basketball players
      on the moon”. Those people can jump very high, but they may not realize
      the extent to which their performance depends on that context.
    </p>
    <p>
      I have deep respect for a person who can launch something entirely on
      their own, without relying on the backing of their company (or industry
      name recognition predicated on work they launched previously at some
      earlier company). If someone can make a disruptive technology successful
      entirely on its own merits, both that tech and that person are impressive
      indeed.
    </p>
  </li>
</ol>

<p>
  Ah, well, live and learn. I’m still looking forward to watching the web’s UI
  component ecosystem take shape, because we’ll all get to make awesome stuff
  together.
</p>
