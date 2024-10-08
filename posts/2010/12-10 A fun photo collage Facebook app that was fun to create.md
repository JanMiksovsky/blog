---
title: "A fun photo collage Facebook app that was fun to create"
originalUrl: https://miksovsky.blogs.com/flowstate/2010/12/a-fun-photo-collage-facebook-app-that-was-fun-to-create.html
---

<p>
  Ever since I wrote the first version of the
  <a href="http://www.cozi.com/Photo-Screensaver.htm"
    >Cozi Collage photo screen saver</a
  >
  in 2005, I’ve been itching for the chance to port it from Windows to the web.
  Things that were only possible on a desktop client five years ago — access to
  user photos, animated transition effects — are now trivial in a web app. A
  quick attempt to generate photo collages from Facebook photos led to an idea:
  what if you could condense an entire year’s worth of interesting moments in
  your friends’ lives into a 3 minute video showing Cozi-style photo collages
  set to music?
</p>
<p>
  This seemed like a fun year-end project for the holiday season, when people
  are inclined to take a look back at the past year. A Cozi colleague joined me
  in bringing the idea to fruition, and we released the app earlier this week.
  The result is
  <a href="http://garage.cozi.com/collage/">The Year in OUR Pictures 2010</a>.
</p>
<p>
  <img
    src="/images/flowstate/6a00d83451fb6769e20148c6962428970c-pi.png"
    alt="The Year in OUR Pictures 2010"
  />
</p>
<p>
  I thought this came out pretty neat myself. The experience of creating this
  was itself&#0160;fun and interesting, so I thought I’d share some highlights
  and lessons.
</p>
<ol>
  <li>
    The Facebook Graph API is awesome. I worked on a Facebook app just about a
    year ago using their older JavaScript SDK, and it was a complete pain (you
    couldn&#39;t easily develop on localhost, etc.). The new API is
    straightforward and easy to use. In particular, it was a joy to discover
    that Facebook can return data via JSONP in exactly the right way to be
    consumed by jQuery’s AJAX functions. The result of this was that the entire
    application is comprised entirely of static web resources and client-side
    code. The app entails no code running on Cozi’s servers, which makes it
    highly scalable. All the heavy pounding to get photos happens on servers
    that belong to <em>Facebook</em>. (Thanks, guys!)
  </li>
  <li>
    The first time the user clicks on one of the video thumbnails (above),
    they’re presented with a Facebook permissions dialog. We were pretty
    concerned about the degree of fall-off we’d see at that point. We crafted a
    bunch of language for the above screen intended to prepare the user for the
    Facebook permissions dialog. (“When you click the button above, you’ll see a
    dialog from Facebook…”) We ultimately concluded that this sort of text
    wouldn’t help. People weren’t likely to read it, and there didn’t seem to be
    any wording we could put in that would <em>increase</em> the number of
    people successfully getting through the dialog. As it turns out, the vast
    majority of visitors are making past the Facebook permissions dialog with no
    preparation. This is great for us and lets us keep the above introduction
    very clean.
  </li>
  <li>
    The whole user interface is created in jQuery and&#0160;<a
      href="https://quickui.org"
      target="_self"
      >QuickUI</a
    >, which let us move extremely quickly. It was great to have a QuickUI
    library of general-purpose&#0160;JavaScript/CSS-based UI&#0160;components
    that already worked in all browsers, so we could just drop them in and focus
    on the experience. And being able to refactor UI classes cleanly kept things
    stable even as we iterated quickly.
  </li>
  <li>
    Today’s web browsers rock. The original Cozi Collage screen saver has a
    drop-dead simple crossfade animation between collage slides
    &#0160;implemented in DirectX. That simple, stupid DirectX crossfade cost us
    days and days of development time. No matter how we coded it, the
    hardware-accelerated transition was only as good as the user’s video card
    driver — which is to say, we could always find someone whose machine would
    crash when running the screen saver. The current state of browser rendering
    engines and JavaScript engines is such that we can make simple jQuery
    fadeIn/fadeOut calls that work reasonably well everywhere. (Oh: To move
    quickly, we completely ignored IE 7. Good riddance.)
  </li>
  <li>
    We were excited to use the HTML5 audio tag. (Hey, we wanted to join the
    <a
      href="/posts/2010/11-22-even-if-html5-doesnt-actually-give-you-much-its-buzzword-status-could-still-help-you-deliver-a-better-ux.html"
      >HTML5 bandwagon</a
    >.) However, for backward compatibility with IE 8, we also included a
    standard Flash audio player. We ran into a puzzling JavaScript error, and
    eventually learned there are
    <a
      href="http://groups.google.com/group/jquery-en/browse_thread/thread/58a9cbc1068d28c0/eb4bedb2cc36b126?pli=1"
      target="_self"
      >issues using jQuery to insert HTML5 tags into IE 8</a
    >.
  </li>
  <li>
    The music completely makes this user experience what it is. It was a delight
    to discover Wikimedia Commons’ extensive catalog of freely usable
    <a href="http://commons.wikimedia.org/wiki/Category:Ogg_sound_files"
      >audio files in the Ogg format</a
    >&#0160;so we could find music that was both appropriate and free.
  </li>
  <li>
    The volume of information posted by Facebook friends is literally
    overwhelming. Even if your best friend posts a photo album of people you
    care about, the chances are very high you’re not going to see it because it
    will be quickly buried below the “Older posts” fold. The most common
    reaction to seeing a slideshow of friends’ pictures is: “I never saw any of
    these”.We’ve discovered that people really enjoy posting photos of food,
    cats, and weird signs.
  </li>
  <li>
    People are more narcissistic than we’d imagined. It’s our observation that
    most people have a more interesting experience if they click the option to
    see a slideshow of “Your friends’ pictures”. However, they’re more likely to
    <em>share</em> the experience if they click the option to see their own
    pictures. Since we want people to share this, we moved the “Your pictures”
    option to be first, where it gets the most clicks.
  </li>
  <li>
    The one thing I’d wish we could get via the Facebook Graph API that is a
    list of friends sorted by Facebook’s own magic friend-weighting algorithm.
    With no way to evaluate the <em>quality </em>of a friend relationship, the
    end user’s experience is something of a crapshoot. If the user has liberally
    accepted all Facebook friend requests (or they’re just really unlucky and
    our algorithm happens to pick their least-favorite friends), they’ll see a
    bunch of people they don’t even know, and they’ll have a lousy experience.
  </li>
  <li>
    On the other hand, when this thing works, it really works. If someone’s been
    parsimonious in accepting Facebook friendships (or they get very lucky, and
    our algorithm happens to pick their best friends), they’ll see a bunch of
    photos of people they care about celebrating meaningful moments of the past
    year: a birth, a vacation, a wedding. And the music can get people into a
    contemplative mood. (We’ve been using Debussy’s
    <a
      href="http://commons.wikimedia.org/wiki/File:Claude_Debussy_-_clair_de_lune.ogg"
      >Clair de Lune</a
    >, but are thinking of switching to a shorter piece.)
  </li>
</ol>
<p>
  One person wrote me to tell me that watching this made them choke up and cry.
  Wow. I’ve worked on Microsoft Windows, which has probably made a lot of people
  cry. But I’ve never before written a piece of software that made someone cry
  for joy.
</p>
<p>
  Anyway,
  <a href="http://garage.cozi.com/collage/">take a look for yourself</a>.
</p>
