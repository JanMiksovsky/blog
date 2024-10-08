---
title: "Designing for families"
originalUrl: https://miksovsky.blogs.com/flowstate/2006/09/designing_for_f_1.html
---

<p>
  This week my company Cozi launched
  <a href="http://www.cozi.com/products/default.aspx">Cozi Central</a>, a
  product that lets busy families communicate with each other and juggle the
  many elements of their lives at home. Among other things, our public launch
  means I can now cover my own user interface designs in this blog. I thought a
  good place to start this coverage was a quick look at what it means to design
  software for families.
</p>
<p>
  Most software products and services for the home market oddly do not, in fact,
  recognize the family dynamics that dominate home life. Consider any service
  with which the entire household has a single account, then see how many family
  members are allowed to administer that account. In most consumer products, the
  single person who signs up for a household account becomes the account’s sole
  administrator. They can add other family members to the account, but those
  other users are invariably treated as second class participants in the
  account.
</p>
<p>
  Many households have not one, but <strong>two</strong> people running the
  household. In these cases, the user model doesn’t match the household’s actual
  organization. If Mom ends up as the family’s account administrator, how does
  Dad feel asking her to reset his password? Or if Dad ends up as the account
  administrator, how does Mom feel asking him to give her access to a new
  feature? A poor design decision in the virtual world provokes awkward
  interactions between family members.
</p>
<p>
  Products like this are presumably made by organizations that unintentionally
  mirror their business paradigm in a home product—since groups in the business
  world tend to be organized with a single leader, they fail to question whether
  a similar hierarchy will actually work in the home. As it turns out, a strict
  hierarchical approach is also easier for a developer to code: if you’re going
  to have two classes of users, the data schema and accompanying UI is easier to
  manage if you can simply designate exactly one of the users as an
  administrator than if you can designate one or at most two. If a company does
  decide to support more than one administrator, the design usually makes
  administrative privileges an option that can be enabled for any account. So
  instead of letting two people run the account, they allow N people to run the
  account, which often needlessly complicates the product’s interface. (A good
  example of
  <a href="/posts/2005/08-18-the-tyranny-of-1-or-n.html"
    >The Tyranny of 1 or N</a
  >.)
</p>
<p>
  We designed Cozi Central from the ground up for the dynamics of families, not
  small businesses. Either one OR two people can be identified as the adults
  running the household.
</p>
<p>
  <img src="/images/flowstate/cozi_central_household_settings.png" />
  <br />
</p>
<p>
  There are, of course, numerous households with multiple adults, but in most of
  them, one or two people can be identified as running the household. For our
  v1.0, those edge cases weren't worth pursuing if they would cause the 90% case
  to suffer.
</p>
<p>
  Designing things this way does require a bit more design and development work.
  On the whole, however, the product’s model of family organization now more
  closely represents that of actual households, so it enables unique features
  that capitalize on family dynamics.
</p>
<p>
  A good example is the “Hand Off” feature in Cozi Central’s family calendar.
  Couples, especially parents in homes with children, are constantly trading
  errands and other responsibilities. It might be the case that Dad usually
  drives his daughter to soccer practice, but if he suddenly needs to take his
  son to the doctor, he may hand the driving duty off to Mom. This happens so
  often that Cozi Central has an explicit “Hand Off” menu command on
  appointments just for this purpose:
</p>
<p>
  <img
    src="/images/flowstate/Cozi_20Central_20Appointment_20Menu.png"
    alt="Cozi Central Appointment Menu"
  />
</p>
<p>
  This user interface shortcut would be far more cumbersome to offer in a
  product that assumes families are organized in a hierarchy with a single
  person at the top. (By the way, Cozi Central's appointment menu comes up on
  left click as well as right click, a trick I think could be useful in other
  UIs.)
</p>
<p>
  You can see more examples of family-ready design in Cozi Central itself. The
  product, which includes features to track family calendars, messages, and
  shopping lists, is available for free at
  <a href="http://www.cozi.com/">http://www.cozi.com</a>.
</p>
