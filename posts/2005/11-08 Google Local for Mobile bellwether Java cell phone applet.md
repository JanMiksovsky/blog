---
title: "Google Local for Mobile: bellwether Java cell phone applet"
date: 2005-11-08
originalUrl: https://miksovsky.blogs.com/flowstate/2005/11/google_local_ni.html
---

<p>
  The new <a href="http://google.com/glm">Google Local for Mobile</a> is a
  compelling little demonstration of what a Java cell phone applet can do. It's
  carefully tuned to the constraints of cell phone hardware, uses the network
  well, and makes good use of the graphic display and local caching.
</p>
<p>
  <img
    alt="Google_local_for_mobile"
    src="/images/flowstate/google_local_for_mobile.Png"
  /><br /><span>Google Local for Mobile</span>
</p>
<p>
  The installation process was much easier than I’d expected. Google’s site does
  a good job helping you figure out whether your phone will actually run their
  applet, which is nice and presumably reduces customer disappointment. The site
  directs you to a web page to open on your phone, and offers to SMS you the URL
  to save you the trouble of typing it in. The resulting web page sniffs your
  browser to determine which download you need, so you only have to make a few
  clicks to download and install the applet.
</p>
<p>
  In my case, I had to put up with some very clunky Java applet management UI
  produced by the local cell phone OS (controlled by my phone manufacturer, not
  Google). For example, the phone asked me to confirm that I wanted to install a
  “MIDlet”, whatever the heck that is. I expect most cell phone manufacturers
  outsource the utility UI like this to the cheapest bidder, with predictably
  poor results.
</p>
<p>
  The Google Local applet itself is simple but quite polished for a phone app.
  It feels a lot like Google Maps. The keyboard UI for zooming in and out took
  some getting used to. You can read a complete description in the
  <a href="http://google.com/glm/tour.html">Google Local tour</a>. The UI
  suffers from the fact that the key to zoom in (the OK button, or the center of
  the directional pad) is otherwise unrelated to the key you press to zoom out
  (a mappable button that labeled here as &quot;Zoom -&quot;). This is a
  reasonable trade-off given the small keyset available on a phone, but
  nonetheless the lack of conceptual connection between the buttons makes it
  hard to learn their relationship. It's also confusing to see the zoom out
  command clearly labeled, when what every user will need to do first is zoom
  in. The applet does offer a quick tip on how to zoom.
</p>
<p>
  The zoom UI also has the unusual behavior that setting the zoom level doesn't
  take effect immediately—you can zoom in or out multiple levels, then wait a
  second for the new zoom level to kick in. Again, this is a reasonable
  trade-off given the bandwidth on a phone, but again this is confusing for the
  new user. Now that I know how zooming works, I think it’s elegant, but I
  expect a significant number of users will be completely confused and give up
  on the applet after a few minutes of failing to successfully zoom around.
</p>
<p>
  Other small points: I was disappointed that Google’s address lookup couldn’t
  find my house. I was also disappointed that Google Local couldn’t show me my
  approximate location on the map based on info from the cell towers. Finally,
  at one point when I switched away from Google Local and then launched it
  again, Google Local lost track of the previous map view. It reset the map back
  to a high-level country view, forcing me to laboriously re-zoom down to my
  local area.
</p>
<p>
  The weakest part of the whole experience in my opinion is that it’s hard to
  get back into to the Google Local applet once you've left it. This isn't
  really Google's fault. On my phone (and probably most other phones), Java
  applets don't get their own top-level entry point in the main menu, nor is
  there an option to create such an entry point. I have to navigate to a special
  Java area first, then launch the Google Local app from there. For me, the
  entire navigation sequence in six clicks long, and requires two clicks that
  are essentially random (i.e., the UI element doesn't suggest that clicking it
  will lead you closer to a mapping application). The top-level Java area
  eventually did show up as a shortcut on a top-level MRU (Most Recently Used)
  list, which cut out a few clicks, but that shortcut will age off the MRU list
  if I don’t keep using it.
</p>
<p>
  I’ll bet that a big chunk of people who download Google Local won’t be able to
  find the applet after the first time they run it, so this single issue of
  finding the app’s entry point could be a critical weakness. Convincing cell
  phone OS designers to make it easier to launch Java applets is a
  chicken-and-egg problem: OS designers won't do this until there are more
  interesting applets like Google Local for Mobile, and app ISVs won't create a
  significant body of interesting cell phone applets unless they can be sure
  users can quickly and easily run them.
</p>
<p>
  Nevertheless, my overall reaction to this applet is quite positive. Google
  Local for Mobile may become a bellwether entry in the mobile app space, in
  much the same way Google Maps broke ground for highly interactive AJAX apps.
  This is the first non-game Java app I’ve seen that’s worth downloading. If you
  have a Java-capable phone, it's worth checking out.
</p>
