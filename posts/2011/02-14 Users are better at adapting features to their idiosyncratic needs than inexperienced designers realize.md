---
title: "Users are better at adapting features to their idiosyncratic needs than inexperienced designers realize"
originalUrl: https://miksovsky.blogs.com/flowstate/2011/02/users-are-better-at-adapting-features-to-their-idiosyncratic-needs-than-inexperienced-designers-realize.html
---

<p>
  A common instinct I’ve observed in inexperience designers is a desire to
  overly complicate a new feature based on their own expectations about how
  perfectly suited the feature needs to be to a wide range of scenarios. In
  fact, users constantly surprise me with their ingenuity at adapting basic
  features to cover their idiosyncratic needs.
</p>
<p>
  I recall a user who built an organization chart in a very early version of
  Microsoft Excel (the only productivity app they really knew) by entering
  employee names in cells—and then carefully&#0160;<em
    >drawing connecting lines with cell borders</em
  >
  for cells in between. On Microsoft Money, I saw users employ Money’s
  general-purpose system of accounts and categories to track a bewildering array
  of financial instruments and personal financial arrangements. As time goes on
  and an application’s user base grows, the feature set can expand into the long
  tail of specialized needs. But in the beginning, users find all kinds of ways
  to make do with what they’ve got.
</p>
<p>
  Cozi’s own UI contains a basic household settings page for defining the
  <a href="/posts/2006/10-01-asking-for-first-names-with-an-example.html"
    >names</a
  >
  of each family member. Early pre-release builds of the product allowed a
  family to define two primary adults at the head of the household, followed by
  a list of children. This definition of a family might cover many households,
  but it obviously couldn&#39;t represent every family. This didn’t cover a
  grandparent or other relation that lived with the family, nor did this
  arrangement handle divorced families. We debated whether to add more UI
  complexity to better model a wider range of families before shipping.
</p>
<p>
  In the end, we launched with this basic definition of a family, and it turned
  out that many families had no trouble adapting it to their needs. Users were
  quick to realize the shortcomings of the UI, but just as quick to realize that
  the list labeled “children” imposed no real functional restriction against
  entering adults. So while it wasn’t ideal to describe a grandparent as a
  “child”, the family could still accomplish their objective of tracking the
  grandparent’s schedule in the family calendar. A surprising number of families
  went further, entering their dog or cat (or horses!) as family members.
</p>
<p>
  Where the UI didn’t explicitly cover the users’ needs, they improvised. This
  makeshift arrangement was functionally acceptable for those families, and
  allowed to Cozi to deliver value to them sooner than if we had had to postpone
  the release until we could explicitly cover a wider range of cases. It’s that
  value, in fact, that caused users to put up with the need for adaptation.
</p>
<p>
  Cozi’s household data model remains essentially the same today, although we
  have responded to user feedback by relabeling the list of children:
</p>
<p>
  <img
    src="/images/flowstate/6a00d83451fb6769e2014e5f28e384970c-pi.png"
    alt="Cozi - About your household"
  />
</p>
<p>
  The current label for the list of additional household members is “Children,
  other adults, and busy pets!” With that change, we essentially recognized,
  accepted, and formalized the adaptation our users were already making. (The
  “busy pets!” bit took some time to settle on. We wanted to encourage families
  who were inclined to count pets as family members to do so. However, simply
  saying “pets” would suggest to families that they needed to record every fish
  or hamster they owned, even if those pets never had vet appointments or
  otherwise appeared on the calendar. Hence, “busy pets”. We wanted to be clear
  that this was somewhat tongue-in-cheek, and considered adding a smile
  emoticon, but that seemed to trivialize the UI. The exclamation mark seemed to
  strike the right balance of playfulness and utility.)
</p>
<p>
  In the end, it turned out that having, for example, a separate section of the
  settings page for other adults was not strictly necessary; the common
  adaptation proved sufficient.&#0160;We’ll continue to evolve Cozi’s definition
  of a family (to, say, handle divorced families), but for now this seems to be
  good enough for many, many families.
</p>
<p>
  In general, I think it’s a sound strategy to assume that a user who wants to
  make your product work for them will find ways to do so. You’re best off
  shipping the simplest thing that could possibly work, seeing how people use
  it, then evolving the design from there.
</p>
