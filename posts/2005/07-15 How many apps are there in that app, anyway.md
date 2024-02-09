---
title: "How many apps are there in that app, anyway?"
originalUrl: https://miksovsky.blogs.com/flowstate/2005/07/how_many_apps_a.html
---

<p>
  Software product teams working on large products need to give names to
  individual application components just so they can communicate effectively --
  but that's not a good reason to force a user to learn names for different
  parts of something that, to them, is a single entity.
</p>
<p>
  A common example: a Setup app is a little application that helps install a
  bigger application. The software team needs to keep straight which application
  they're talking about (in specs, bug reports, etc.), so they give the Setup
  app its own name. The user ends up having to bear the burden of figuring out
  who does what. The following is a particularly egregious (and unfortunately
  very common) example:
</p>
<p>
  <img
    alt="Java_runtime_environment_setup"
    src="/images/flowstate/java_runtime_environment_setup.PNG"
  />
</p>
<p>
  So here we've got one named thing (Java Runtime Environment Setup) that's
  preparing another named thing (an InstallShield Wizard) that will help the
  user install a third named thing (Java). The user could care less about these
  other pieces that are involved, so there's no reason to confuse them by
  introducing these other components by name at all. All the user cares about
  here is getting Java onto their machine (and they may not really care about
  that either -- maybe what they're <em>really</em> trying to do is get a Java
  app to run).
</p>
<p>
  The dialog could easily have said, &quot;Please wait while Java is
  installed&quot;, or even just, &quot;Please wait.&quot;
</p>
