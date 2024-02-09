---
title: Print a handy 2015 wall calendar built with web components
originalUrl: https://component.kitchen/blog/posts/print-a-handy-2015-wall-calendar-built-with-web-components
---

<p>
  If you hold or participate in project management discussions, consider
  printing out this handy
  <a href="http://janmiksovsky.github.io/printable-wall-calendar/"
    >Printable Wall Calendar</a
  >
  that was quickly built with web components.
</p>
<figure>
  <a href="http://janmiksovsky.github.io/printable-wall-calendar/">
    <img src="/images/ck/Printable Wall Calendar.jpg" style="max-width: 100%" />
  </a>
</figure>
<p>
  Jan constructed the original version of this calendar years ago to answer to
  two simple calendar questions that often come up in planning discussions:
</p>
<ol>
  <li>
    <strong>On which day of the week will a given date fall?</strong>
    If some asks, "Can you ship this on June 15?", you often want to know,
    "Well, what day of the week is that? Is that even a weekday?"
  </li>
  <li>
    <strong>What's the date of a given day of the week?</strong>
    Maybe your agile development group likes to make big releases on Mondays. If
    you think you might release something two Mondays from now, what date is
    that?
  </li>
</ol>
<p>
  You can answer these questions by pulling out your phone, but sometimes paper
  is faster than gadgets. A wall calendar can answer these questions nearly
  instantly — as long as the calendar is well designed for this purpose. The
  problem is that most wall calendars have way too much clutter. They're
  designed for a previous era in which people
  <em>wrote critical scheduling information on a paper wall calendar</em>. No
  one does that now. If instead you just want a calendar to answer the questions
  above, its design can be much simpler. A simpler design means the actual
  calendar dates can be bigger and easier to read across a room.
</p>
<p>
  This calendar was built using the
  <a
    href="https://component.kitchen/components/basic-web-components/basic-calendar-month"
    >basic-calendar-month</a
  >
  component, which takes care of all the date math, as well as handling
  localized month and day names for a huge number of languages and regional
  preferences. To build a year calendar was a simple matter of slapping 12 of
  these month calendars together and applying some styling.
</p>
