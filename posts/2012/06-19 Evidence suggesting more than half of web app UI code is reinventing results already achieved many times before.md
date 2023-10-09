---
title: "Evidence suggesting more than half of web app UI code is reinventing results already achieved many times before"
date: 2012-06-19
originalUrl: https://miksovsky.blogs.com/flowstate/2012/06/reinventing-the-ui-wheel.html
---

<p>
  Web app designers and developers spend a staggering amount of time recreating
  common effects and behavior that have already been done many times before on
  other sites, or within their own organization, or in their own code on
  previous projects, or — worse yet — in their <em>own</em> code on the
  <em>same </em>project. You may spend days and days carefully reproducing
  common UI behavior that can readily be found in other apps: menus, dialogs,
  in-place editing, progress feedback, and on and on. The web wasn’t built to
  solve those problems, so <em>you </em>have to solve them — over and over
  again.
</p>
<p>
  This situation is already at least partially avoidable with current web
  frameworks that permit the creation of reusable UI components. As a case in
  point, I recently created a
  <a href="https://quickui.org/docs/contacts.html"
    >sample Contacts application</a
  >
  in the <a href="https://quickui.org">QuickUI</a> framework. The app sports a
  reasonably interesting user interface, but the bulk of its behavior is driven
  by shared components from the
  <a href="https://quickui.org/catalog/">QuickUI Catalog</a> that provide
  layout, visual effects, editing behavior, list management, and keyboard
  navigation.
</p>
<p>
  Having built a handful of web apps in QuickUI now, there’s a pretty clear
  pattern to the <em>balance</em> of UI components used in these apps: about
  half of the UI code is comprised of components directly from the Catalog or
  from previous projects. And, in every case, the project itself has generated
  new, sharable UI components.
</p>
<p>
  Look at your app’s UI elements — at every scale, from page, to region, to
  widget, to tiny little visual element — and ask yourself: has anyone done this
  before? Will someone do it again? If this were a component, could I be sharing
  it with someone down the hall, or at another company? In asking these
  questions, you’ll generally need to scrape away purely stylistic attributes
  such as color and typography, and focus more closely on behavior.
</p>
<p>
  As you consider these question of UI reusability, it becomes apparent that the
  <em>audience</em> for a reusable UI element varies in size, depending on the
  degree to which the UI is solving a problem that comes up in other contexts.
  Some UI is completely specific to the context of a single feature, while some
  UI patterns are extremely general and come up everywhere.
</p>
<p>
  It’s possible to categorize your UI elements according to this aspect of
  context-specificity. Having created a half dozen or so web apps of reasonable
  complexity in the component-orient QuickUI framework, the proportional
  breakdown across these categories has been very consistent. This leads me to
  hypothesize that the general proportions of these categories are roughly
  consistent across most web apps.
</p>
<p>&#0160;</p>
<h3>Categories of reusable user interface components across apps</h3>
<p>
  Such a breakdown might look like this, ordered from most context-specific to
  most general:
</p>
<p>
  <img
    alt="UI Component Layers (Reduced)"
    src="/images/flowstate/6a00d83451fb6769e2016306b4f1d9970d-pi.jpeg"
  />
</p>
<ul>
  <li>
    <strong>30% Feature-specific UI. </strong>These are elements you create to
    define the UI for a specific feature: an Update Account Settings page in a
    web app, or a custom popup that applies to just one list. You take more
    basic controls (usually drawn from the categories below), compose them
    together in a unique combination, and wire them up with context-specific
    interactivity to achieve a specific task. By definition, this category of UI
    code is <em>not </em>reusable. If you find an opportunity for reuse here,
    you can factor that code out, but then you should group it one of the other
    categories.
  </li>
  <li>
    <strong>10% App-specific UI.</strong> Any app with more than one feature
    will have UI elements which are consistent across those features, and those
    consistencies can be implemented as reusable components. UI elements you
    might use across multiple features within a given app might be: page
    templates, templates or controls for table or list elements, a custom type
    of touch menu used in multiple situations, and so on. You can think of this
    set of UI as your app’s design language: a more focused expression of your
    organization’s overall design language (below).If you work on a good team,
    it should be straightforward to find and take advantage of such
    opportunities.
  </li>
  <li>
    <strong>10% Company-specific UI.</strong> Everything your company or
    organization does has <em>some </em>(maybe not enough?) consistency in its
    user interfaces. Perhaps you all follow a convention for app home pages, or
    a standard way to handle user commenting, or maybe your company prefers
    using multi-step wizards for complex tasks. These are the UI elements that
    distinguish your company’s output from that of other companies working in
    your industry. That is, this category defines your company’s design
    language: the UI solutions that make your apps recognizable to your users.
    (If your company makes only one app, then you can lump this category
    together with the App-specific UI category above.) While in company leaders
    may assume that everything in this category should be freely leveraged
    across the company as a strategic advantage, in practice this category often
    presents the most vexing practical challenges to reuse: office politics,
    conflicting project schedules, and a lack of way to secure or account for
    funding on shared work.
  </li>
  <li>
    <strong>20% Domain-specific UI.</strong> Everyone working in your industry
    works in the same problem domain. If you’re struggling to figure out the
    best way to visually represent a complex data set, or to get a credit card
    number from a customer, then others in your industry are too. You may be
    lucky enough to work in a cooperative domain, but chances are, those other
    people will be your competitors, and so for business reasons your company
    may not be inclined to share implementations, and may in fact fight
    tooth-and-nail to avoid their replication in competitive products. If you’re
    in that boat, then this category of UI code can effectively be combined with
    the Organization-specific UI category above. That is, your company will end
    up with private implementations of solutions that could be shared in theory,
    but in practice is company-specific. But occasionally even competitors may
    recognize the value of sharing work. For example, a shared solution might
    benefit your industry’s <em>customers</em>, and the result payoff for all
    your companies may be great enough to overcome corporate resistance to
    sharing.
  </li>
  <li>
    <strong>30% General purpose UI.</strong> These are the common UI patterns
    that <em>everyone </em>spends time coding up today: context menus, paginated
    search results, docking toolbars, and so on. Very few companies
    <em>want</em> to spend time on this stuff, because it’s just too far removed
    from any company’s core competencies. Everyone wants to focus on the
    categories above; no company believes they are going to beat their
    competitors with their excellent implementation of tab buttons. So most
    companies rush through the creation of these components, getting many of the
    details wrong. This UI category contains everything that
    <em>should </em>have been baked into the web, if only the web had been
    designed for creating real applications instead of sharing scientific
    research documents. As browsers evolve, the set of shared solutions here is
    expanding, but only at a glacial pace. In the meantime, we all have this
    chunk of UI problems to solve, and there is an enormous opportunity to share
    UI code here. At the same time, the broad set of possible consumers of any
    given UI component implies a significant challenge in establishing
    consensus. The UI code in this category should be written <em>once</em> (or
    maybe, because we could never get everyone to agree on anything, written a
    tiny handful of times) and never written from scratch again.
  </li>
</ul>
<p>&#0160;</p>
<p>
  The percentages I’ve given above are rough, but drawn from examining the UI
  code in apps I’ve written over the last few years. Those apps were already
  carefully componentized, and focused on code reuse, so I expect a more
  thorough analysis of more web apps would confirm that the numbers above are
  conservative. That is,&#0160;the actual degree of unnecessary reimplementation
  in a typical web application is probably far higher.&#0160;Without a component
  foundation, the most expedient way to replicate a given behavior is often to
  cut-and-paste it from somewhere else in the app’s source, then hack on the
  result to fit the new context. The app may not only be reinventing the UI
  wheel, but doing so multiple times in the same codebase.
</p>
<p>
  If the above breakdown is even roughly correct, then consider a new web
  company entering an existing market who writes their app UI entirely from
  scratch. Even if it were extremely well-factored, 50% of all the UI code they
  write would be reinventing the wheel, solving domain-specific or general
  purpose UI problems which have already been solved before. While that sounds
  extreme, it’s probably not that far off the mark for most companies. While
  most apps consume at least some third-party UI elements (to implement a
  Facebook “Like” button, say), in many cases the typical company is just
  nibbling at the edges of the problem. And, if we assume that office politics
  and other factors prevent them from sharing code internally, the percentage of
  unnecessary re-invention may be much higher.
</p>
<p>
  No matter how you slice it, chances are that&#0160;<em
    >most app teams are writing way too much UI code</em
  >.&#0160;Because the web lacks a real component model, most companies write
  reams and reams of non-modular, non-reusable UI code. If they were to build
  their apps on a UI framework that let them use and extend components, they
  could probably avoid writing much of the UI code they write today. To put this
  in business terms: if they were to componentize their UI effectively, they
  could get the same amount done in half the time or with half the resources.
  Obviously adopting a component strategy and reusing components have costs of
  their own, but I expect those are dwarfed by the mind-numbing scale of solving
  the same problems again and again.
</p>
<p>
  There already are component frameworks for developing web app user interfaces.
  I’m obviously heavily invested in QuickUI, but you can find others out there
  as well. Given the huge savings they can make possible, they’re worth a look.
</p>
