---
title: "Oh app, for crying out loud, go update yourself"
originalUrl: https://miksovsky.blogs.com/flowstate/2006/06/hey_app_go_upda.html
---

<p>
  When I start my PC these days, I see six or seven different applications in
  the Windows system tray screaming for attention. “An update is available!
  Update me!” “No—Update ME!” they cry. Great. Another click, another progress
  bar, another completely minor upgrade accomplished. One wonders: is there a
  meaningful role for the user in this process at all?
</p>
<p>
  When it comes to updates, companies making client software have an enormous
  disadvantage versus web-based competitors. Deploying new server bits is a
  problem of considerable complexity in its own right, but at least the web
  software company gets to decide when to deploy and who conducts the upgrade.
  The user has no choice whether to use the updated site or not. In my own
  experience, most site updates seem to go rather well (your mileage may vary),
  so it’s not something I even pay attention to.
</p>
<p>
  The client software manufacturer, meanwhile, has the challenging task of
  deploying bits to a quantity of machines orders of magnitude greater in size.
  The target machines could be running in any number of configurations the
  manufacturer isn’t even aware of, much less have in their test matrix. The
  update process is under the supervision of a user who generally has no idea
  what to do if something goes wrong.
</p>
<p>
  Nevertheless, the mere existence of the constantly upgrading web-based
  competitor puts considerable pressure on the client software manufacturer to
  make the update process as transparent as possible. To be sure, client
  software updates are much less of a pain than they used to be.
  <a href="http://en.wikipedia.org/wiki/DLL_hell">DLL hell</a> is, by and large,
  no longer a nightmare plaguing every single update. Persistent broadband
  connections make checking for updates easy, and downloading new bits quick. In
  the vast majority of cases, the user needs to supply no additional data, the
  updates fall under EULAs the user has already agreed to, and the software
  already knows where it should be installed.
</p>
<p>
  So why make the user agree to the update at all? Why not just do the update
  for them—at least in the cases where the user doesn’t have to do anything
  else?
</p>
<p>
  Users at the extreme end of the techno-savvy spectrum may demand the ability
  to control when updates happen. Let’s stipulate that they should have the
  right to do so. I expect that most users, however, don’t care to exercise this
  right. I think the average person would only ask the following of any client
  software manufacturer regarding updates:
</p>

<blockquote>
  <p>
    Rule 1: Don’t screw up my PC. This includes things like surreptitiously
    switching my home page, spamming my desktop, etc.
  </p>

  <p>
    Rule 2: Don’t try to upgrade your product when I’m in the middle of using
    it. In general, don’t distract me from what I’m doing right now. To be
    honest, you’re really not that important to me.
  </p>

  <p>
    Rule 3: Don’t reboot my PC. That’s rude. Whatever Adobe Acrobat Reader is
    doing that requires a reboot isn’t worth it to me.
  </p>
</blockquote>

<p>
  I think that’s about it. Is the typical client software upgrade user
  experience these days actually supporting these goals?
</p>
<p>
  Following a reboot on my main home PC, MSN Messenger (now called Windows Live
  Messenger) is the application most likely to be yelling for attention. Its
  upgrade experience is at the, er, “good” end of the user experience continuum
  for these sorts of things.
</p>
<p>
  <img
    alt="Msn_messenger_toast"
    src="/images/flowstate/msn_messenger_toast.png"
  />
</p>
<p>
  This little window that pops up is called a “toast” by the MSN design team
  because it pops up like a piece of toast. This particular piece of toast is
  lying. Clicking it brings up a dialog that does not, in fact, offer any more
  information.
</p>
<p>
  <img
    src="/images/flowstate/msn_messenger_upgrade_dialog_1.png"
    alt="Msn_messenger_upgrade_dialog"
  />
</p>
<p>
  Instead, the toast has actually tricked the user into starting the upgrade
  process. (For the record, this particular upgrade to MSN Messenger Version 7.5
  will require a reboot.) The user can try to leave, but only by being forced to
  agree to be bothered again later. The user can click yet another button to see
  a web page that (finally) tells them why they should care about this upgrade:
</p>
<p>
  <img
    src="/images/flowstate/msn_messenger_upgrade_page.png"
    alt="Msn_messenger_upgrade_page"
  />
</p>
<p>
  It's interesting to wonder which of the features listed above was the one that
  required a reboot.
</p>
<p>
  In any event, the list of new features is beside the point. The placement of
  this information—three clicks away from the user—makes this fact obvious. The
  user has no choice in this process. It really doesn’t matter whether they like
  the new features or not. The manufacturer has updated the software, and will
  at some point stop supporting the old software. The user is going to have to
  upgrade at some point, or run the risk of being shut out when they really do
  need the service.
</p>
<p>
  Why can’t the manufacturer simply arrange to have the client software
  automatically upgrade itself at some convenient time?
</p>
<p>
  First, there’s the matter of preference—the user might not actually prefer the
  new software to the old software. This is entirely likely, but allowing them
  to keep running the old version seems like an incredibly inefficient solution
  to the problem. This creates tribes of users running old versions,
  complicating maintenance and improvement of both the client and server
  software. The enormous resources thus wasted could be put to better use
  finding out why people hate the new software and addressing the core design
  issues. This is what good web sites do. Or, if the differences are
  irreconcilable, the manufacturer can resort to leaving in program options that
  preserve aspects of the old user experience. In any event, making upgrades
  optional simply delays the inevitable disappointment of a forced upgrade when
  the manufacturer eventually can no longer support the old version.
</p>
<p>
  Second, there’s the matter of bad upgrades. Sometimes this is because the
  manufacturer wrote buggy code. Postponing the upgrade isn’t going to fix this
  problem—the user is going to play upgrade roulette at some point. As noted
  earlier, the hapless user’s hardware and software stack may operate in a
  configuration outside of the manufacturer’s testing matrix. If this really is
  a critical reason to leave upgrades under a user’s control, then the existing
  user experiences fall far short of actually supporting this goal.
</p>
<p>
  The problem is that no upgrade experience I’ve seen actually helps the user
  conduct a realistic evaluation of whether they can expect the upgrade to go
  smoothly in their configuration. As seen above, upgrade announcements for most
  applications are entirely rosy lists of new features, with no indication of
  what might go wrong. The little pop-up toast affords no links to resources
  such as upgrade FAQs, knowledge base articles, or most importantly, current
  user discussions of issues related to the upgrade. Users who care about
  upgrades currently must find this information on their own.
</p>
<p>
  Given that the mainstream user can’t invest that kind of time, the only user
  experience that makes sense for them is automatically upgrading them at a
  convenient time (e.g., the machine is idle and it’s the middle of the night).
  If the program is in use, the program should at least download the bits,
  install as much as it can, and be prepared to cut over to the new version when
  the user next restarts the application. (Mozilla Firefox does this, although
  with too many dialogs for my taste.)
</p>
<p>
  To support those users who want to carefully manage the upgrade process, the
  manufacturer can offer an option for manual upgrades. This option
  should—quietly—notify users when an upgrade is available. Since the mainstream
  user can’t be bothered to understand that option, the option should default to
  automatic upgrades. This scheme is, in fact, the route that Microsoft has
  finally taken with Microsoft Windows upgrades. Their user experience certainly
  isn’t ideal, and yet on balance Automatic Updates probably saves far more
  grief than it inflicts. Given the challenge of the client software upgrade
  problem, that’s about as good as anyone can expect.
</p>
