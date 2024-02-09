---
title: "The web could benefit from a control panel for cross-app settings (e.g., for sounds)"
originalUrl: https://miksovsky.blogs.com/flowstate/2011/12/the-web-could-benefit-from-a-control-panel-for-cross-app-settings.html
---

<p>
  I think many web sites could benefit from the thoughtful use of sounds in
  their UI, but they avoid sound because the cost of doing so becomes too great.
  Client apps on Windows and OS/X get some degree of sound support for free with
  the operating system, as do mobile apps. In all cases, the OS provides a
  control panel that lets the user control whether sounds play for various
  events, and which sounds to use. Here’s the venerable Sounds tab of the
  Windows Sound control panel, virtually unchanged since something like Windows
  95:
</p>
<p>&#0160;</p>
<p>
  <img src="/images/flowstate/6a00d83451fb6769e2015437feb0ec970c-pi.png" />
</p>
<p>&#0160;</p>
<p>
  For each standard UI event capable of generating a sound, the user can turn
  the sound off, or map the event to various sound files. Other sound control
  panels work similarly: the OS/X one is, by comparison, more limited, but the
  iOS Sound page in Settings has a substantial list of UI events which can be
  mapped to sounds (or vibration).
</p>
<p>
  With this in mind, consider the work a web team has to do just to support
  sound. To support a pre-HTML 5 browser, they have to select from several
  different sound-playing technologies; in HTML 5 they can at least use the
  standard &lt;audio&gt; tag. Since many users won’t want sounds, they have to
  provide a Settings area within their app where the user can adjust settings.
  Maybe their app doesn’t even <em>have</em> a Settings area yet, so they’ll
  have to create a new one from scratch. Then they have to do some real sound
  design, to come up with a set of sounds that are: a) pleasing to a wide range
  of users, b) high quality, c) appropriate for the UI context, and d) very,
  very cheap. They’ll also have to do some work to ensure that sounds on their
  pages don’t bog down web site performance, e.g., by delaying the loading of
  the sound files, and being careful about which sound files are loaded and
  when.
</p>
<p>
  For years, I’ve been a passionate believer in the use of sounds for
  <em>positive </em>reinforcement in a UI. That is, sounds can and should be
  used to let the user know when something has gone <em>right</em>, as opposed
  to when something’s gone wrong. The canonical example I offer is the
  satisfying sound of a car door closing: even when walking away from a car, you
  can hear when the door’s closed correctly. Even if you never consciously pay
  attention to that sound, the <em>absence</em> of that door-closing sound lets
  you know the door isn’t completely closed, and you turn around and walk back
  to close it again.
</p>
<p>
  User interfaces can similarly benefit from the use of sounds for positive
  reinforcement. Not negative reinforcement; observe above what proportion of
  sound events in Windows are different flavors of, “Something’s gone horribly
  wrong.” I think many people in the software community, and many users, have a
  strong bias against sound because sound has been used so poorly in the past.
  The very best designers of sounds in UI are probably game designers, because
  they work so hard to make sound an integral and emotionally satisfying part of
  the game experience. The web at large could learn a lot from game sound
  designers.
</p>
<p>
  With that in mind, I pushed hard at <a href="http://cozi.com">Cozi</a> to get
  sounds into our web app. Cozi’s web product has only two sounds:
</p>
<ol>
  <li>
    A “Message Sent” sound used whenever the service successfully transmitted a
    message to an external destination: e.g., a shopping list was sent via SMS
    to a family member’s phone.
  </li>
  <li>
    A “Got it!” sound played by the app whenever the client had successfully
    saved user data (e.g., a new appointment) on the server.
  </li>
</ol>
<p>
  These sounds were tightly mapped to the UI, helping to subtly confirm to the
  user that some desirable thing had just gone as expected. A musician and sound
  designer created the sounds for us, taking care to make sure the sounds fit
  the application aesthetic, were suggestive of the event in question, and were
  not intrusive. With all that work, I think the sounds worked really well,
  helping to round out the application user experience and gave the product some
  dimensionality.
</p>
<p>
  And despite claims from some people that, “No one likes web sites that play
  sounds”, I never heard complaints about these. Most people didn’t even notice
  them — which is just what was intended. Just like the car door-closing sound,
  these sounds perform their work at a subconscious level. Still, it would have
  been great to offer the user a way to turn sounds on and off, and potentially
  let them change which sounds played. Unfortunately, it was hard to justify the
  additional investment in doing that.
</p>
<p>
  To that end, I’m hoping that someone will eventually create a shared sound
  control panel for the web. This could offer sound storage, sound mapping UI
  (such as the above), and easy sound integration for third-party web sites.
  This could work something like
  <a href="http://www.gravatar.com">Gravatar</a> (from Automattic, the folks
  behind WordPress.com), which lets <em>other </em>web sites offer
  user-customizable “avatars”. These are really just glorified profile pictures,
  but such pictures do serve a useful role on sites in bringing a community of
  users to life. A site like <a href="http://www.github.com">GitHub</a> can use
  Gravatar as a complete solution for user-customizable profile pictures at a
  trivial development cost.
</p>
<p>
  I think Gravatar is an example of what could be possible with shared cross-app
  control panels: small bits of utility that let a user customize some settings
  they can carry with them to other sites. Facebook and Google are obviously
  already players in that game, but the stakes are all wrong. A site that wants
  to integrate with Facebook just to get a user profile picture is both making a
  substantial commitment to an entity whose behavior is sometimes threatening
  <em>and</em> the site must force its users to entangle themselves in
  Facebook’s plans — something a substantial number of people are loathe to do.
  I like Facebook, but if I’m just looking for someone to store a profile
  picture, frankly I trust Gravatar for that purpose more than I do Facebook.
</p>
<p>
  There’s no great revenue model for a settings site like Gravatar, so
  presumably most of them would exist as public services provided by larger
  entities like Automattic. Hopefully more people will follow their lead, and
  build out some of the web’s missing control panels.
</p>
