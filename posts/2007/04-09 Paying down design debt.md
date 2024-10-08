---
title: "Paying down design debt"
originalUrl: https://miksovsky.blogs.com/flowstate/2007/04/paying_down_des.html
---

<p>
  Developers use the term <em>technical debt</em> to refer to the backlog of
  inevitable future work produced when things are implemented in a quick and
  dirty way. An application can accrue design debt as well—user interface issues
  created by design hacks that must be resolved eventually. Like financial debt,
  you may find you don't have control when the next payment needs to be made.
</p>
<p>
  I was recently forced to make a minimum payment on some of Cozi's design debt.
  In our case, our flagship PC application
  <a href="http://www.cozi.com/products/default.aspx">Cozi Central</a> had a
  setup experience that omitted an important step. Cozi Central includes a photo
  collage screen saver that we think is pretty darn cool. Until this month,
  however, when you first ran Cozi Central on a Windows PC,
  <em
    >the application took over your screen saver, and it didn't even ask you</em
  >.
</p>
<p>
  Terrible, no? The story starts way back when we first created the product. The
  screen saver happened to be the first part of Cozi Central we wrote. We
  started giving families our very first pilot release, and Cozi Central did at
  that point was act as a screen saver. There didn't seem to be any point in
  asking them if they wanted to use the screen saver—why else would they install
  it?
</p>
<p>
  Fast forward a year, and Cozi Central now did a bunch more: it had a family
  calendar, a shopping list you can call up with your mobile phone from the
  grocery store, and a way to leave messages for family members. In fact, the
  product did enough that there were some adopters who wanted to use everything
  in it <em>but</em> the screen saver. Those people didn't want the setup
  experience to silently take over their screen saver. We knew we needed to take
  care of that, but month after month we kept pushing off this work in favor of
  fighting bigger fires. We were carrying design debt.
</p>
<p>
  The vast majority of users love the screen saver. One even wrote us
  specifically to relate how delighted they'd been by the photo screen saver
  they didn't even have to ask for. We did hear complaints from a small number
  of families, though, and a few weeks ago we finally heard from one user who
  was irate. Let's just say that business professionals may have photos on their
  PCs that they don't want suddenly displayed during a presentation.
</p>
<p>
  It was finally time to pay down our design debt, so we recently added new page
  to our setup experience that describes the screen saver and asks the user
  whether they want it:
</p>
<p>
  <img src="/images/flowstate/041007_0355_Payingdownd1.png" alt="" />
</p>
<p>
  This isn't a great solution—throwing a question into the setup experience is a
  clear hallmark of a design hack. This approach could easily cause issues later
  if we ever really do need to ask the user another question during setup, and
  discover that two questions in setup is one too many. We've made the minimum
  payment, but we've still got more design debt going forward.
</p>
<p>
  I'm happy that at least one Cozi user
  <a
    href="http://thanksgivingfeast.blogspot.com/2007/04/my-life-in-pictures.html"
    >found the new UI acceptable</a
  >. (Their post is, hands down, the funniest commentary I've read about Cozi
  Central yet.) On we go.
</p>
