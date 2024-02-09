---
title: "Progress bars that start over are almost useless"
originalUrl: https://miksovsky.blogs.com/flowstate/2005/07/progress_bars_t.html
---

<p>
  An app should never show the user a progress bar, fill it up, only to reset it
  and make them watch it fill up again.
</p>
<p>
  <img src="/images/flowstate/progress_bar_1.PNG" alt="Progress_bar_1" />
  <br /><em>Two-thirds done — or is it?</em>
</p>
<p>
  An app with a progress bar that resets will fail to deliver on the promise it
  has made. The app is saying, &quot;Almost done! Almost done! Just a second
  more!&quot;, then saying, &quot;Just kidding! There's still more.&quot; The
  user loses faith the process is anywhere near completion. For all they know,
  the progress bar is going to reset again, and again, and again. If a progress
  bar can start all over, there’s practically no value in having a progress bar
  in the first place. It's more honest in such a case to use a progress
  animation instead of a progress bar; at least that doesn't make any promises
  about when an operation will finish.
</p>
<p>
  When an app has back-to-back operations that can take a long time, incorporate
  the progress for those operations into a combined progress bar. This can be
  done, for example, by assigning arbitrary percentages based on expected
  results. If the first operation usually takes about three times as long as the
  second, then the first operation can be defined to fill up 75% of the progress
  bar and the second operation to fill up the remaining 25%. This can result in
  a change in progress bar speed, but this still allows the user to derive more
  value from the progress bar, and maintains a sense a progress.
</p>
