---
title: "UI Control of the Week: Rendering arbitrary data on a calendar with a Flickr-style CalendarMonthNavigator"
originalUrl: https://miksovsky.blogs.com/flowstate/2011/10/calendarmonthnavigator.html
---

<p>
  This week’s UI control comes from Flickr, which for a number of years has
  offered a cool way to browse the most interesting user-contributed photos with
  their
  <a href="http://www.flickr.com/explore/interesting/">Interestingness</a>
  calendar:
</p>
<p>&#0160;</p>
<p>
  <img
    src="/images/flowstate/6a00d83451fb6769e20154366e83bd970c-pi.png"
    alt="Flickr Interestingness Calendar"
  />
</p>
<p>&#0160;</p>
<p>
  As cool as this is, most of the work to build this specific page was probably
  allocated to reproducing the same aspects of any month calendar built
  anywhere. That is, some Flickr developer spent a long time mucking about with
  date math, writing code that had nothing to do with Flickr. I’m guessing that,
  since the web was first created, the logic to render and navigate a calendar
  for an arbitrary month in HTML like this has probably been written hundreds if
  not thousands of times. And there are probably web sites that would benefit
  from displaying data in a month calendar, but can’t be bothered to make that
  investment.
</p>
<p><strong>Key attributes</strong></p>
<ul>
  <li>The calendar shows a complete month at a time.</li>
  <li>
    The user can navigate to the previous or next month. In Flickr’s case,
    navigation into the future is disabled.
  </li>
  <li>Each month shows 4 to 6 rows of seven days a week.</li>
  <li>
    Days in the previous month (on the first row, to the left of the first day
    of the month) and the next month (in the last row, to the right of the last
    day of the month) are hidden.
  </li>
  <li>
    Given how the photos are selected based on historical data, Flickr only
    shows photos for days in the past. The current date and days in the future
    are grayed out.
  </li>
  <li>
    A given date is represented visually in two ways: 1) as the number for the
    day of the month, and 2) as a photo thumbnail. In this case, the photo is
    the most interesting photo (according to the number of comments, etc.) on
    Flickr for that given day.
  </li>
  <li>
    Clicking a thumbnail pops up more thumbnails of interesting photos on that
    same day. The popup offers links to specific photo pages, or to a more
    complete list of the interesting photos for that day.
  </li>
</ul>
<p><strong>Usage</strong></p>
<p>
  I started by creating a general-purpose
  <a href="https://quickui.org/catalog/CalendarMonthNavigator"
    >CalendarMonthNavigator</a
  >
  to handle the date and navigation logic:
</p>
<p>&#0160;</p>
<p>
  <img
    src="/images/flowstate/6a00d83451fb6769e20162fbf06061970d-pi.png"
    alt="CalendarMonthNavigator"
  />
</p>
<p>&#0160;</p>
<p>
  Basic controls like this in the QuickUI catalog deliberately come with very
  generic styling. This allows one to try out the control in a minimalist mode,
  which hopefully makes it easy to see what the control actually does without
  getting distracted by its appearance. The generic styling is automatically
  turned off in a subclass so one doesn’t have to fight much with styles defined
  by the parent classes. The class used to render individual days is intended to
  be overridden, so that arbitrary content can be placed within a day.
</p>
<p>
  A month calendar like this is well-suited for displaying date-based
  information using the
  <a
    href="http://www.uxmatters.com/mt/archives/2005/12/small-multiples-within-a-user-interface.php"
    >principle of small multiples</a
  >. This could be done to render historical information (sales data, etc.) as
  Flickr has done here, or to represent information about the future (a weather
  forecast, a calendar of events, etc.). If navigation is not desired — for
  example, if the application wants to fix which month is shown — the
  lower-level
  <a href="https://quickui.org/catalog/CalendarMonthWithHeadings"
    >CalendarMonthWithHeadings</a
  >
  can be used.
</p>
<p><strong>Implementation notes</strong></p>
<p>
  Following the principle of separation of concerns, the base
  CalendarMonthNavigator is comprised of
  <a href="https://quickui.org/catalog/LateralNavigator">LateralNavigator</a>
  and a CalendarMonthWithHeadings, which itself breaks down into a calendar
  control cornucopia:
  <a href="https://quickui.org/catalog/MonthName">MonthName</a>,
  <a href="https://quickui.org/catalog/DaysOfWeek">DaysOfWeek</a>,
  <a href="https://quickui.org/catalog/CalendarWeek">CalendarWeek</a>, and
  finally <a href="https://quickui.org/catalog/CalendarDay">CalendarDay</a>.
</p>
<p>
  Once the base CalendarMonthNavigator was finished, creating a custom
  FlickrInterestingnessDay class was quite straightforward, as was styling the
  month navigator. Flickr’s calendar shows the names of the next/previous month
  alongside the next/previous buttons, which wasn’t hard to add. By dropping the
  day class into the month navigator, the FlickrInterestingnessNavigator
  (Update: Now called
  <a
    href="https://quickui.org/catalog/FlickrInterestingNavigator"
    target="_self"
    >FlickrInterestingNavigator</a
  >.)&#0160;fell out cleanly. The result is pretty close to the Flickr
  Interestingness calendar. One might even say it’s interestingnessish.
</p>
<p>
  As far as I can tell, Flickr’s API lets you grab interesting photos only for a
  single date per call. Presumably they have an internal API that lets them grab
  the most interesting photo for each day of a given month in a single call, but
  no such call is documented. So this particular calendar is forced to make a
  separate call for each day, which is obviously terrible. Nevertheless, that
  performance seemed acceptable in a calendar intended mostly as a demonstration
  of how to create a custom CalendarMonthNavigator. In a real application, one
  would want to grab all the data in one call at the month level, then apportion
  the data to the corresponding days.
</p>
<p>
  Given that performance was already an issue, I chose not to implement the
  popup Flickr shows when you click on a day (which shows additional interesting
  photos for that day). Instead, clicking a day takes you straight to the page
  listing the most interesting photos for a given date.
</p>
<p>
  In creating the calendar controls, I was able to make use of the excellent
  jQuery <a href="https://github.com/jquery/globalize">Globalize</a> project,
  which defines culture-specific information like month names and day names for
  a staggering number of cultures. (Thanks are due to Microsoft for contributing
  their vast culture database.) So the subcomponents MonthName and DaysOfWeek
  localize their output to the current culture if the culture has been set via
  Globalize.culture(). Since Globalize also indicates which day of the week
  should be shown as the first day of the week — i.e., in the leftmost column —
  I went ahead and localized that as well. For example, the first day of the
  week will be Sunday in the U.S., but will be Monday in France, or Saturday in
  Saudi Arabia. (Flickr’s own Interestingness calendar localizes the month and
  day names into other languages, but doesn’t correctly adjust the calendar
  presentation to reflect in the local culture’s first day of the week.)
</p>
<p>&#0160;</p>
<p>
  <em
    >Aside: I’ve added a new gallery to the
    <a href="https://quickui.org/catalog" target="_self"
      >main QuickUI Catalog page</a
    >, showing live demos of all the controls in the catalog so far. This is
    only the fourth Control of the Week, but the catalog started out with a
    handful of controls, and most weeks see the addition of multiple related
    controls to the catalog, so there’s about 40 controls there now. Based on
    community feedback, a high priority for the next month or so will be making
    it possible to use the catalog controls in plain JavaScript, without needing
    to know anything about how QuickUI controls are created, and without having
    to use the QuickUI markup language (which is more concise, but entails a
    learning curve).</em
  >
</p>
