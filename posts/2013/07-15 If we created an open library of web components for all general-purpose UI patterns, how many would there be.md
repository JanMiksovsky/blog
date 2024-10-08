---
title: "If we created an open library of web components for all general-purpose UI patterns, how many would there be?"
originalUrl: https://miksovsky.blogs.com/flowstate/2013/07/how-many-general-purpose-ui-components.html
---

<p>
  Wouldn’t it incredibly helpful if we had a library of components providing
  solid implementations for all the common, general-purpose, well-designed user
  interface patterns found in mobile and web apps? In such a library, how many
  components would there even be?
</p>
<p>
  Regardless of the exact number, I think it’s clear that a comprehensive set of
  such patterns would be much larger than what’s available in most UI component
  libraries. Why is that are most existing UI libraries so <em>small</em>?
</p>
<p>
  There are a few different kinds of UI libraries; let’s look at each in turn.
</p>
<h2><strong>Operating system UI libraries</strong></h2>
<p>
  Every software operating system (Windows, OS X, Android, iOS, etc.) offers a
  library of user interface components. These help the platform’s developers be
  more efficient — but more critically, these libraries establish the visual and
  behavior language for their respective platforms. That is, they provide
  sufficient components such that native and third-party apps can present
  customers a reasonably consistent user experience.
</p>
<p>
  OS UI libraries usually aren’t that big, though, often something in the
  neighborhood of 20–40 components. These include components for tried-and-true
  UI patterns: check boxes, radio buttons, combo boxes, tabs, menu bars,
  sliders, progress indicators, and so on.
</p>
<p>
  But OS UI libraries seldom go far beyond that. Once the platform has been
  established, the platform vendor has little incentive to invest more work in
  their platform’s UI component library. When my startup began working on an iOS
  app, for example, I was stunned to discover just how few of the conventions of
  that platform were directly facilitated by iOS itself.
</p>
<p>
  Even when an innovation such as, say, pull-to-refresh emerges in a mobile app
  like Tweetie and is widely emulated to the point where it becomes a de facto
  mobile UI standard, the UI innovation rarely makes it back into the platform
  itself. If it does make it into the platform, that step usually takes a very
  long time. Tweetie came out in 2008. Apple finally added UIRefreshControl to
  iOS 6 in 2012 — an eon later in mobile Internet time.
</p>
<p>
  Another reason why OS libraries may have been so limited historically is that
  theming native UI components has been hard. Many operating systems conflate UI
  component appearance with component behavior, so it’s impossible (or hard) to
  get something that behaves just like a standard toolbar (with docking, etc.),
  but looks significantly different. And once you get much more complex than,
  say, a text box, a designer wants more control over visual appearance. To get
  a visually distinct result, the developer usually have to build something from
  scratch. The web has an advantage here with CSS, which helps separate
  presentation from structure and behavior. So you’d think web UI libraries
  would be bigger — but they’re usually not.
</p>
<h2><strong>General-purpose web UI libraries</strong></h2>
<p>
  Web UI libraries (e.g., jQuery UI) operate under different constraints.
  They’re not really focused on ensuring a consistent user experience; even if a
  library is pretty successful, it’s still unlikely to significantly impact the
  user experience of the web at large. Rather, the primary goal of most web UI
  libraries is increasing developer efficiency. Devs don’t want to spend time
  rewriting modal dialog logic that’s been written many times before; a library
  providing a pre-authored dialog component can help them create dialogs more
  quickly.
</p>
<p>
  Curiously, most web UI libraries still still end up with about the same number
  of 20–40 components as platform libraries. Possible explanations:
</p>
<ul>
  <li>
    Web libraries follow the example of platform libraries. It is turns out to
    be quite hard to think systematically about a large realm of user interfaces
    and identify the best decomposition of atomic elements that could most
    efficiently recreate it from scratch. It’s easier to emulate a set of
    elements someone else has already worked out in other UI libraries.
  </li>
  <li>
    The limitations of HTML itself and the legacy of browser incompatibility
    have heretofore constrained the set of interesting components which can be
    created and easily integrated into other applications. These limitations
    have dampened the network effects required for a large component collection
    to gain critical mass.
  </li>
  <li>
    The cost of maintaining the existing components increases with the number of
    components. By the time a library approaches a few dozen components, a small
    project’s entire bandwidth may be consumed by ongoing maintenance.
  </li>
  <li>
    It becomes harder to maintain a library’s internal consistency with each
    additional component. A library&#39;s authors want consistent
    implementations and public APIs across all components in the library.
    Occasionally a new component forces reconsideration of the existing
    components, necessitating refactoring. Eventually the cost of adding a new
    component may become prohibitive.
  </li>
  <li>
    Creating solid, general-purpose UI components is unglamorous, tiresome, and
    thankless work. Oh, and unprofitable, too.
  </li>
</ul>
<p>
  The answer may be some combination of these factors, but that doesn’t make the
  result any more satisfying. It’s still frustrating that no open web UI library
  is really comprehensive. The last three points, in particular, all apply
  equally well to any open web library operating below the level of the visible
  UI, and many of those have grown quite large.
</p>
<h2><strong>Framework sample UI libraries</strong></h2>
<p>
  Some web UI libraries exist for a different reason: to provide samples of
  components which can be built with a given web framework. Components in such
  libraries effectively serve as framework documentation, and also as test cases
  for the framework. Their ability to simply function is what ensures other devs
  can build interesting, functioning components with the framework. While a few
  people may find the components interesting to use in their own right, that’s
  not really their main purpose.
</p>
<p>
  To these ends, sample components tend to be somewhat specialized in their
  purpose. The trouble with creatint really good general-purpose UI components
  as sample is that such components are often fiendishly complex under the hood.
  They must exhaustively cover a wide range of configurations and edge cases,
  and such complexity can obscure or confuse the use of the underlying
  framework, which is the primary goal of the library. The result is that sample
  components tend to look visually interesting, but often aren’t directly
  reusable.
</p>
<p>
  In any event, here again we see a fairly small number of components. Once the
  framework developers have delivered 10–20 examples, they may have already
  achieved good coverage of the framework’s features and provided ample sample
  code, so there’s little incentive to invest in creating more components.
</p>
<h2><strong>Why can’t we just do all the common UI patterns?</strong></h2>
<p>
  I think a compelling criteria for a open web UI library would be to say:
  &quot;This library tries to provide all the UI patterns in widespread use on
  the web.&quot; That is, if a UI pattern appears in some reasonably interesting
  percentage of popular apps, then the library should provide a component
  delivering a solid baseline implementation of that UI pattern.
</p>
<p>
  A comprehensive web UI component library sounds ambitious, but it’s not crazy.
  It&#39;s probably only an order of magnitude bigger than the tens of
  components in the OS and web UI libraries described above.
</p>
<p>
  When I first started on the
  <a href="https://quickui.org/catalog">QuickUI Catalog</a>, my hope was to
  eventually create exactly that: a home for solid implementations of all common
  UI patterns. For a while now I’ve been looking at the emerging collection of
  web component technology standards to see if they can provide a good substrate
  for such a collection. The technologies are still coming together, but it now
  appears likely that a comprehensive UI library could indeed be delivered as
  standard web components. In the short term at least, such a library would need
  to be augmented with Google’s innovative and compelling
  <a href="http://www.polymer-project.org/">Polymer project</a>, which allows
  new web technologies like custom elements to function on older browsers.
</p>
<h2><strong>Compiling a comprehensive list of UI patterns</strong></h2>
<p>
  To help make the case a comprehensive UI library is achievable, I’ve been
  compiling a list of every UI pattern I can find that seems common,
  general-purpose, and well-designed. Some notes on these criteria:
</p>
<ul>
  <li>
    Common: the UI pattern has to be something you encounter in multiple
    apps/sites. If a particular app invents some clever bit of UI, but it’s so
    unique to the app’s context that it’s not used (or can’t be used) elsewhere,
    it doesn’t belong in the library.
  </li>
  <li>
    General-purpose: the pattern has to be applicable in multiple contexts and
    interesting in a range of products. Broadly speaking, this criteria
    generally excludes components which are directly bound to a proprietary web
    service. While a Facebook Like button component is certainly interesting and
    common, it’s tied to Facebook’s backend, and hence (in this context) not
    considered general purpose. In contrast, a UI component that shows blog
    headlines via RSS <em>is</em> defined as general purpose, because it can be
    used with any backend supporting RSS.
  </li>
  <li>
    Well-designed. There are some common, general-purpose UI patterns that also
    happen to be terrible. There’s no need to make these more prevalent.
  </li>
</ul>
<p>
  Beyond conventional web UI patterns, I want this list to include mobile UI
  patterns, even those typically implemented in native code. My belief is that a
  mobile web app should be able to do anything a native mobile app can do, so
  I’d prefer to include (native) mobile UI patterns from the start.
</p>
<p>
  This list comes from direct experience, as well as combing through various
  collections of UI patterns on the web. It’s by no means complete, but I think
  it can already serve to help estimate the initial size of such a library.
</p>
<p>Without further ado, the list currently stands as follows...</p>
<h2>
  <strong>An initial list of common, general-purpose web UI patterns</strong>
</h2>
<ol>
  <li>
    Accordion. A list that can have a single item or multiple items expanded to
    show more detail.
  </li>
  <li>
    Alphabetic indices. Renders the characters in a culture’s alphabet in
    standard order (e.g., as a vertical or horizontal strip). If supplied with a
    set of strings, the UI will disable those characters which are not found as
    the initial character of any string.
  </li>
  <li>
    Async operation button. A button whose caption changes to reflect an
    operation in progress (e.g., changing from “Sign In” to “Signing In...”)
    until the operation completes.
  </li>
  <li>
    Auto-complete. A text input field that helps the user quickly enter strings
    from a known list.
  </li>
  <li>
    Auto-format. Applies a collection of heuristics for formatting text: adding
    smart quotes, converts double hyphens to endashes, etc.
  </li>
  <li>Auto-size text box. A text area that expands to contain its text.</li>
  <li>
    Backdrop. Shows a background region of non-interactive elements behind the
    region’s main contents.
  </li>
  <li>Blog. Shows some or all of the entries in the indicated RSS feed.</li>
  <li>
    Blog headlines. Shows the headlines of some or all of the entries in the
    indicated RSS feed as links to the full articles.
  </li>
  <li>
    Breadcrumb bar. Indicates the user’s position in a navigational hierarchy.
  </li>
  <li>
    Browser specific. Conditionally shows contents based on the browser being
    used and/or whether the current browser supports a given feature.
  </li>
  <li>Calendar day. Shows a single day in a calendar.</li>
  <li>
    Calendar month navigator. Lets the user select a date, typically in the near
    future, by navigating through calendar months.
  </li>
  <li>
    Calendar month. Shows a single month from a calendar as a standard
    seven-column table, taking care to reflect a given culture’s preference for
    the first day of the week.
  </li>
  <li>Calendar months. Shows multiple months from a calendar.</li>
  <li>
    Calendar week. Shows a single week from a calendar as seven days in a row,
    taking care to reflect a given culture’s preference for the first day of the
    week.
  </li>
  <li>
    Carousel. Lets user navigate laterally between panels with a sliding
    transition.
  </li>
  <li>
    Central column. A region whose main central column is fixed in width, and
    horizontally&#0160;centered with respect to the viewport.
  </li>
  <li>
    Checked list box. A list box showing a check box next to each item; the user
    can create a multiple selection by checking the boxes.
  </li>
  <li>
    Close box. A platform-sensitive representation of a button that will close
    the current dialog or window.
  </li>
  <li>
    Closeable panel. Shows information (e.g., a warning, or the result of a
    completed operation) that can be dismissed to remove the panel from the
    visible page.
  </li>
  <li>
    Collapsible panel. A region that can be toggled between collapsed and
    expanded states.
  </li>
  <li>
    Color wheel. Lets the user select a color in a variety of color spaces.
  </li>
  <li>
    Combed text box. A text box sporting tick marks or vertical lines to
    visually indicate how many characters should be entered.
  </li>
  <li>
    Content grid. A region which provides a sense of visual organization by
    dividing its width into a number of columns (e.g., 12) which can be variably
    spanned by content panels.
  </li>
  <li>
    Content transition. When supplied with new content, transitions from the
    existing content to the new content using a common animated transition
    (fade, fade through black, slide, wipe, etc.)
  </li>
  <li>
    Content with banner(s), such as toolbar (on top) or status bar (on the
    bottom).
  </li>
  <li>Content with sidebar(s) on the left and/or right side.</li>
  <li>
    Countdown clock. Represents the time (in days/hours/etc.) until a given
    point in time.
  </li>
  <li>
    Credit card. Asks the user to supply a credit card and performs initial
    validation.
  </li>
  <li>
    Date combo box. Lets the user type a date or choose one from a dropdown
    calendar.
  </li>
  <li>
    Date range calendar. Lets the user select a date range, typically in the
    near future.
  </li>
  <li>
    Date text box. Lets the user type a date in several culture-specific
    formats.
  </li>
  <li>
    Days of week. Shows the names of the seven days of the week using a given
    culture’s day names in short/abbreviated/full format.
  </li>
  <li>
    Delimited list. A list of items interspersed with a decorative element
    (bullet, vertical bar, etc.) for cleaner delineation.
  </li>
  <li>
    Device specific. Conditionally shows contents based on the type of device
    being used and/or device capabilities.
  </li>
  <li>Dialog. A popup window, typically modal.</li>
  <li>Editable in place. An element that supports its own in situ editing.</li>
  <li>
    Editable text. A piece of static text data which can be clicked to produce a
    text box that can then be used to edit the data.
  </li>
  <li>
    Expandable summary. A block of content with a “More” link at bottom;
    clicking this reveals the remainder of the content.
  </li>
  <li>
    Fader. Instead of clipping content, it fades out content on the right or
    bottom edge to suggest additional content exists but could not fit.
  </li>
  <li>
    File uploader. Allows the user to click or drag-and-drop to supply a single
    file for upload.
  </li>
  <li>
    Full screen region. A region supporting a mode in which the region will
    expand to fill the entire screen.
  </li>
  <li>
    Full size-able. A region which fills the viewport, independent of the size
    of the page content.
  </li>
  <li>
    Infinite list. A list which asynchronously loads additional contents as the
    user scrolls.
  </li>
  <li>
    Labeled input. An HTML input control (generally a check box or radio button)
    with an associated clickable label.
  </li>
  <li>
    Lateral navigator. A panel with previous and next arrows on either side,
    allowing the user to navigate laterally through a discrete set of states.
  </li>
  <li>
    Link list. Uses a platform-sensitive presentation of a set of links (or
    items that behave like links).
  </li>
  <li>
    List. Renders each item in a heterogenous set as a vertically stacked set of
    elements.
  </li>
  <li>
    List box. A list that supports single selection, including keyboard
    navigation.
  </li>
  <li>
    List combo box. A combo box which presents its choices as a dropdown list.
  </li>
  <li>
    List with detail pane. A list box showing a set of items, paired with a
    means of showing properties of the selected item. These properties are
    either a pane (usually to the right) on desktop or tablet devices, or a
    separate page on mobile devices with smaller screens.
  </li>
  <li>
    Log. Displays a growing text log showing, for example, the output of an
    ongoing process.
  </li>
  <li>Markdown. Renders a block of Markdown as rich text.</li>
  <li>
    Masked text. A text box which only accepts specified input characters.
  </li>
  <li>Menu bar. A row of menus.</li>
  <li>Menu item. A command in a menu.</li>
  <li>Menu separator. A line separating commands in a menu.</li>
  <li>Menu. A popup menu, often in a menu bar.</li>
  <li>
    Mobile date/time picker. Platform-sensitive collection of elements which
    emulate the platform’s native date/time picker.
  </li>
  <li>Modes. Shows exactly one item at a time.</li>
  <li>
    Month and year. Shows the month and year of a given date in a format
    appropriate for a given culture.
  </li>
  <li>
    Month name. Shows a given culture’s name for the month of a given date.
  </li>
  <li>
    Multi list box. A list that supports multiple selection, including keyboard
    navigation.
  </li>
  <li>
    Multiple file uploader. Allows the user to click or drag-and-drop to supply
    multiple files for upload.
  </li>
  <li>
    Number with units. Facilitates entry of a number with units (e.g., “10 in.”,
    “5 minutes”, “60 kg”).
  </li>
  <li>
    Overlay. A transparent or semi-transparent blanket over the entire page
    which absorbs interactions outside a modal element.
  </li>
  <li>
    Packed columns. Packs its children into a dynamic number of columns of
    roughly equal height (e.g., see the Pinterest home page).
  </li>
  <li>
    Page number navigator. Indicates the number of pages, e.g. of search
    results, and also allows navigation to a particular page of results.
  </li>
  <li>
    Palette window. A persistent set of tools adjacent to, or superimposed on, a
    work surface, providing tools for manipulating the information on the
    surface.
  </li>
  <li>
    Panel with overflow. A panel fixed in width or height which allows any items
    which don&#39;t fit to overflow into a dropdown menu.
  </li>
  <li>
    Password strength assessment. Provides a rough assessment of the strength of
    a possible password.
  </li>
  <li>
    Persistent header. A scrolling list in which the header for the group of
    items currently at the top of the visible list remains visible until the
    user scrolls the next group to the top. At this point, the new group header
    pushes the previous group header out of sight.
  </li>
  <li>
    Persistent panel. A panel whose contents will bump up against the top or
    bottom of a scrolling parent so as to remain always visible.
  </li>
  <li>
    Person name. A set of input elements for obtaining all or part of a person’s
    name.
  </li>
  <li>
    Phone number. Allows entry of a phone number for a single locale or a range
    of global locales.
  </li>
  <li>
    Popout. An item that can expand (e.g., on hover) without affecting the
    visual position of surrounding items.
  </li>
  <li>Popup button. A button that produces a popup when clicked.</li>
  <li>Popup source. An element which invokes a popup.</li>
  <li>
    Popup. An element which temporarily pops up over other things. Can be modal
    or modeless.
  </li>
  <li>
    Postal address. Allows entry of a postal address for a single locale or a
    range of global locales.
  </li>
  <li>
    Postal code. Allows entry of a postal code for a single locale or a range of
    global locales.
  </li>
  <li>
    Process steps. Shows a numbered list of steps in a task, disabling steps
    which are not yet available.
  </li>
  <li>
    Progress bar. Indicates the fraction of an operation which has been
    completed.
  </li>
  <li>
    Progress indicator. Platform-sensitive representation of an ongoing
    operation whose expected duration is unknown.
  </li>
  <li>
    Pull to refresh. A region which the user can pull down to reveal a
    platform-sensitive “Pull to refresh” and “Loading” representation.
  </li>
  <li>
    Radio button list. A list box showing a radio button next to each item; an
    alternative way to represent selection in a single-selection list.
  </li>
  <li>
    Repeater. Creates a certain number of instances of another element class.
  </li>
  <li>Ribbon. A space-sensitive presentation of a set of commands.</li>
  <li>
    Rich text editor. Supports the basics: bold, italic, insert link, etc.
  </li>
  <li>
    Rotating panels with dots. Rotates (once or indefinitely) through a sequence
    of horizontally-arranged pages, usually to add visual interest to a home
    page.
  </li>
  <li>
    Search box. A text box with standard decorations (magnifying class,
    customizable “Search” hint) to suggest a search field.
  </li>
  <li>
    Sequence navigator. A lateral navigator that lets the user navigate left and
    right through an ordered sequence of items.
  </li>
  <li>Slider. Accepts a discrete number in a constrained range.</li>
  <li>
    Sliding panels with dots. Sliding panels which add a series of dots to
    navigate its contents.
  </li>
  <li>
    Sliding panels. Arranges a set of items on a horizontally sliding strip;
    only one item can be fully seen at any time.
  </li>
  <li>
    Spin box. Accepts a discrete number, potentially in a constrained range.
  </li>
  <li>
    Splitter. A movable line sitting between two panels which can be dragged to
    change their relative sizes.
  </li>
  <li>
    Sprite. Shows a single image at a time from a strip or grid of images.
  </li>
  <li>
    Stacked navigation pages. As the user navigates deeper in an app, a small
    residual portion of the previous page remains visible (typically on the
    left); the user can swipe away the top page to navigate back to an earlier
    point.
  </li>
  <li>
    Star rating. Lets the user rate something (a restaurant, product, etc.)
    using the conventional star system.
  </li>
  <li>
    Tab strip. A set of tab buttons, typically used to navigate among tabbed
    pages presenting different content, but which can also be used, for example,
    to apply one of a set of filters to a results list.
  </li>
  <li>Tab. A tabbed page which can be hosted in a set of tabs.</li>
  <li>
    Tabs. A set of pages which can be navigated by a set of tab buttons across
    the top.
  </li>
  <li>
    Tag text box. Tokenizes text input into a set of tags, and provides
    auto-completion against a set of existing tags.
  </li>
  <li>
    Text box with button. A control with a content area (usually some form of
    text box) and an associated button (“Go”, “Submit”, etc.).
  </li>
  <li>
    Text condenser. Switches to a condensed font when necessary to squeeze in
    more text.
  </li>
  <li>
    Time combo box. Lets the user type a time or choose one from a dropdown time
    picker.
  </li>
  <li>Timeline. Positions items on a horizontal time axis.</li>
  <li>
    Toggle button. A button the user can click to toggle its selected state.
  </li>
  <li>
    ToolTip. A popup that appears when hovering the mouse over another element,
    providing more detail about that element.
  </li>
  <li>
    Transient message. A message which briefly appears on a page before
    automatically disappearing. Typically used to display feedback after an
    operation has completed (e.g., “Message sent”) without requiring user
    acknowledgement.
  </li>
  <li>
    Tree view. Visually renders a hierarchy of items as a tree whose branches
    can be expanded and collapsed.
  </li>
  <li>
    Validating text box. Verifies that text box content meets some criteria.
  </li>
  <li>
    Vote up/down. A pair of buttons to vote something up or down; can reflect
    the current state of the user’s vote.
  </li>
  <li>Wizard. Steps the user through a task through a small set of pages.</li>
</ol>
<h2><strong>This seems totally doable</strong></h2>
<p>
  Okay, so there’s a little over 100 UI patterns in this list, suggesting that a
  comprehensive, general-purpose web UI library would contain a number of
  components of that order. (Some patterns may require implementation as
  multiple components.) You and I will likely disagree about the correct
  decomposition of a given UI into a set of patterns, or about the best way to
  implement a pattern with components, or about what everything should be
  called, but I’m guessing that debate won’t change the size of the list much.
</p>
<p>
  More eyes on the problem — more people looking for common, general-purpose UI
  components — would certainly increase the size of the list, but probably not
  too much. For argument’s sake, let’s assume the list above captures little
  more than half of the general-purpose UI components the library should
  ultimately deliver. That still puts the list at only 200 components. My
  instinct is that any organizational strategy that can produce a library of 100
  components can also produce 200 components.
</p>
<p>
  There’s clearly some kind of existing inflection point when a library reaches
  approximately 40 components, or else we would see more libraries with more
  components. But I’m hoping the next inflection point won’t be reached until a
  much higher number of components. Specifically, it’s my contention that the
  apparent barrier of 40 components in a UI library can be breached with network
  effects.
</p>
<p>
  That is, a key limiting factor to date which has prevent a comprehensive UI
  library (or marketplace, or ecosystem, whatever) has been the inability for
  one group to benefit from another group’s UI work. I hope web components,
  seeded with efforts like Polymer, will change this dynamic, enabling us to
  blow through this barrier and create easily sharable solutions to common UI
  patterns. As I’ve often said before, that will allow us to stop burning so
  much time reinventing things, and focus more of our precious time on
  delivering value unique to our apps.
</p>
