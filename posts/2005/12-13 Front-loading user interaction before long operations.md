---
title: "Front-loading user interaction before long operations"
date: 2005-12-13
originalUrl: https://miksovsky.blogs.com/flowstate/2005/12/frontloading_us.html
---

<p>
  Apps often need to ask users questions during long operations like
  installation or file copying. Whenever possible, it's good to front-load these
  questions whenever possible. It's irritating to walk away from a process that
  the app says will take an hour, then come back an hour to discover the app's
  only 5% done because it's waiting for you to answer a simple Yes or No
  question.
</p>
<p>
  I was reminded of this again during a hunt for a better file synchronization
  utility for Windows. For years I've used
  <a href="http://www.secondcopy.com">Second Copy</a> by Centered Systems, which
  has been as a straightforward workhorse, but I thought I'd see what else is
  out there now.
</p>
<p>
  As a rule, file synchronization tools have atrocious user interfaces. The
  people who really care about the fine points of synchronization or backup tend
  to focus on the technical challenges and ignore the greater challenge of
  presenting a simple user experience. These products typically have tabbed
  dialogs or wizards chock full of options that cover an enormous range of
  scenarios. Figuring out how to configure these options to get the product to
  do something basic often requires far more time than I'm willing to spend.
</p>
<p>
  I've recently tried out a number of products, including
  <a href="http://www.tgrmn.com/web/file_synchronization.htm">ViceVersa</a> by
  TGRMN Software. The UI in ViceVersa is only about average in terms of
  simplicity (in other words, not very simple), but they do offer an obvious and
  helpful mode that compares the contents of two file systems locations that are
  about to be synchronized. This lets you make sure you'll get the results you
  want. I thought the comparison mode was a nice touch, and after reviewing the
  results of such a comparison, went ahead and initiated a sync.
</p>
<p>
  The sync ran for many hours, and
  <a
    href="/posts/2005/07-12-progress-bars-that-start-over-are-almost-useless.html"
    >restarted so many progress bars</a
  >
  that I lost count. Each phase of the sync process provided an estimate of how
  long that phase would take, but as far as I could determine, that estimate was
  meaningless because I had no idea how many other phases were yet to come or
  long those phases would take. Because the file sync was tying up two machines,
  I effectively had no idea when I would regain use of either of them.
</p>
<p>
  This is all par for the course in utility program UIs, but what was
  particularly irritating was coming back to the PC the next morning to find a
  dialog asking me to confirm that a given file should be overridden. This was
  quite disappointing. The application had earlier performed an exhaustive
  comparison of the files to be synchronized—<em
    >for the very purpose of letting me confirm that I wanted to copy or delete
    the files as indicated</em
  >.
</p>
<p>
  If the application wanted to draw my attention to some particularly
  questionable operations, it already had essentially all the information it
  would need to ask me all of those questions up front. As far as I could tell,
  there was virtually nothing that the product would find out later during the
  file sync process that it didn't already know before the sync began. There
  could perhaps exist some cases where this wouldn't be the case (e.g., arising
  from files that changed while the operation is in place), but even then the
  product should have been able to take some reasonable default course of
  action—confirmed in advance if necessary.
</p>
<p>
  The general point here is: when designing UI to support a long operation,
  consider whether any questions could potentially arise during the operation,
  and strive to move those questions to the point before the operation begins in
  earnest. Specifically, let the user know when they should be able to walk away
  and come back to find the process complete.
</p>
<p>
  I recall one UI like this that came up a long time ago in Microsoft's first
  email product, Microsoft Mail. (Microsoft Mail, interestingly, was written for
  Macintosh computers and ran on AppleTalk networks.) During a certain
  operation, the product needed to have the user insert and remove a sequence of
  floppy disks. To its credit, the team took incredible pains to: a) order the
  disk insertions so as to minimize the number of times during the process that
  the user needed to remove one disk and insert another, and b) ensure that the
  longest disk operation took place last.
</p>
<p>
  It's likely that no user ever perceived these refinements to the process, but
  I'm sure that some significant number of users were nevertheless saved the
  irritation of returning to their desk to discover that their computer was
  stuck halfway through, awaiting their return.
</p>
