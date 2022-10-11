---
title: A history of the HTML slot element
date: 2019-04-08 16:00 UTC
slug: a-history-of-the-html-slot-element
originalUrl: https://component.kitchen/blog/posts/a-history-of-the-html-slot-element
---

To me, the story behind the standard HTML
[`<slot>`](https://www.google.com/url?q=https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot&sa=D&ust=1554399746448000)
element illustrates the complexity of producing standards, the importance of talking with people face-to-face, and the value of compromise.

Like any standard, the `<slot>` element didn’t just appear out of thin air. It emerged out of a contentious discussion in which people fought hard for the position they thought was best. In the particular case of that element, it’s possible that a fairly small point of disagreement might have prevented the larger web components technology from reaching the level of support it now has.

I wanted to write down some of that `<slot>` history while I can still recall or reconstruct the details and much of the original content is still publicly visible. This is just my perspective on the events. The other people involved surely recall the events differently, but I’ve done my best to be as objective, complete, and accurate as I can.

## 2011: Shadow DOM v0 and `<content>`

As I understand it, people at Google including Dimitri Glazkov and Alex Russell began drafting the ideas that became known as web components in 2010 and early 2011. In various posts during 2010–11 on the
[W3C public-webapps mailing list](https://www.google.com/url?q=https://lists.w3.org/Archives/Public/public-webapps/&sa=D&ust=1554399746450000),
Dimitri laid out early thinking on web components. He summarized the state of that work in a January 2011 blog post,
[What the Heck is Shadow DOM?](https://www.google.com/url?q=https://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/&sa=D&ust=1554399746450000)

At the end of the year, Dimitri posted an updated summary,
[Web Components Explained](https://www.google.com/url?q=http://web.archive.org/web/20111217001628/https://dvcs.w3.org/hg/webcomponents/raw-file/tip/explainer/index.html%23shadow-dom-section&sa=D&ust=1554399746450000).
That summary roughly describes what eventually became known as Shadow DOM v0, which includes several key differences from the final Shadow DOM v1 standard. Among those differences was a proposed
[`<content>`](https://www.google.com/url?q=https://developer.mozilla.org/en-US/docs/Web/HTML/Element/content&sa=D&ust=1554399746451000)
element for indicating where light DOM nodes should rendered inside a shadow tree and which nodes should be rendered.

Example: if an element has a Shadow DOM tree that contains

```html
Hello, <content></content>!
```

and that element’s _light_ DOM content is the text “world”, then what the user sees is

```
Hello, world!
```

The proposed definition of the `<content>` element allowed the developer to specify which light DOM nodes should be included by using a CSS selector:

```html
<content select="img"></content>
```

The above would arrange for that `<content>` element to show the `<img>` elements in the light DOM.

Google
[landed experimental Shadow DOM v0 support](https://www.google.com/url?q=https://lists.w3.org/Archives/Public/public-webapps/2011AprJun/1345.html&sa=D&ust=1554399746453000)
in Chrome around June 2011, including support for `<content>`.

The strongest reaction to Google’s early web component proposals came from Apple. Apple’s Maciej Stachowiak
[posted](https://www.google.com/url?q=https://lists.w3.org/Archives/Public/public-webapps/2011AprJun/1364.html&sa=D&ust=1554399746454000)
several objections to the API, including that the API didn’t provide robust encapsulation. Later posts from Maciej indicate support for the general idea of Shadow DOM, but not the v0 API.

## 2012

I first came across web components in early 2012, and wrote a
[blog post about web components](https://www.google.com/url?q=https://miksovsky.blogs.com/flowstate/2012/03/snapping-together-a-skyscraper.html&sa=D&ust=1554399746455000)
that March. At the time, I was working on an open source component library based on jQuery, and was excited by the prospect of a native UI component model for the web.

On the other hand, I was concerned it might take a long time for web components to reach broad adoption across the major browsers. By 2012, the iPhone had become a major point of access to the web, and it was not clear whether Apple would ever implement support for Shadow DOM v0. Shadow DOM was already proving extremely difficult to polyfill. Without native Shadow DOM available on Mobile Safari, developers might avoid the technology altogether, and it might never take off.

Google’s strategy seemed to be: once web developers discovered the benefits of using web components in Google Chrome, those developers would pressure Apple to support the technology too. It’s impossible to say whether that strategy would have worked. We can note that Apple has declined to implement other web standards (e.g., web animations), and those decisions have almost certainly dissuaded developers from adopting those technologies. _[Note added on April 22, 2019: Apple did release initial production support for web animations last month in Safari 12.1.]_

I had my own misgivings about the initial Shadow DOM design, particularly that
[CSS selectors might be poorly suited for selecting light DOM nodes](https://www.google.com/url?q=https://blog.quickui.org/2012/07/02/web-component-properties/&sa=D&ust=1554399746456000):

> _The tool given to the developer for [selecting light DOM nodes] is CSS selectors, which at first glance seems powerful. Unfortunately, it’s also a recipe for inconsistency. Every developer will have the freedom—and chore—to approach this problem their own way, guaranteeing the emergence of a handful of different strategies, plus a number of truly bizarre solutions. …_
>
> _It’s as if you were programming in a system where functions could only accept a single array. As it turns out, we already have a good, common example of such a system: command line applications. … [Using CSS selectors] leaves devs without a consistent way to refer to component properties by name, thereby leaving the door wide open for inconsistency._

Instead, I was hoping that the spec could be modified to support named insertion points to which light DOM nodes could be assigned by name.

## 2013: Apple concerns about complexity/performance

Apple posts from spring 2013 show [concerns about the complexity of the Shadow DOM API](https://www.google.com/url?q=https://lists.w3.org/Archives/Public/public-webapps/2013AprJun/0387.html&sa=D&ust=1554399746458000). Tess O’Connor from Apple wrote:

> _While I'm very enthusiastic about Shadow DOM in the abstract, I think things have gotten really complex, and I'd like to seriously propose that we simplify the feature for 1.0, and defer some complexity to the next level… I think we can address most of the use cases of shadow DOM while seriously reducing the complexity of the feature by making one change: What if we only allowed one insertion point in the shadow DOM?_

Tess is saying that, if a shadow tree could only have one `<content>` element, there’d be no need to support CSS selectors on it. That would make it much easier for Apple and other vendors to implement and ship Shadow DOM. That in turn would let the browser vendors gain feedback from early adopters before attempting to add more complex features.

Tess’ comments were echoed by Apple colleague Ryosuke Niwa, who voiced
[concerns about the performance](https://www.google.com/url?q=https://lists.w3.org/Archives/Public/public-webapps/2013AprJun/0470.html&sa=D&ust=1554399746460000)
of a `<content>` element with CSS selectors. In later conversations with me, Ryosuke also spoke of his desire to avoid adding unnecessary complications to HTML and the DOM, because such broadly-supported specs dictate that any complexity has to be supported for the rest of time. He referenced this reluctance in the linked post:

> _I don't want to introduce a feature that imposes such a high maintenance cost without knowing for sure that they're absolutely necessary._

In 2013, I was investing my own time in an
[experimental library of general-purpose web components](https://www.google.com/url?q=https://github.com/janmiksovsky/quetzal&sa=D&ust=1554399746461000).
Those experiments revealed some limitations of the `<content>` element, such as
[challenges subclassing web components](https://www.google.com/url?q=https://blog.quickui.org/2013/06/11/puzzle-define-html-custom-element-subclasses-that-can-fill-in-base-class-insertion-points/&sa=D&ust=1554399746461000).
By that point, I was using the term
[“slot” as a friendlier-sounding synonym](https://www.google.com/url?q=https://blog.quickui.org/2013/11/08/filling-slots-in-shadow/&sa=D&ust=1554399746461000) for the spec’s use of “insertion point”.

## 2014

Ryosuke, it turned out, was also interested in
[supporting subclassing web components](https://www.google.com/url?q=https://lists.w3.org/Archives/Public/public-webapps/2014AprJun/0151.html&sa=D&ust=1554399746462000).
Towards that end, he also thought it would be useful for a web component class to identify insertion points by name. That would make it easier for a subclass to override or extend what appeared in that insertion point. Overall, he was keenly interested in simplifying the Shadow DOM specification, e.g., by dropping support for multiple shadow roots on a single element.

For these reasons and others, Apple continued to show little interest in implementing Shadow DOM v0 in WebKit.

## 2015: Shuttle diplomacy

While Google was moving towards shipping Shadow DOM v0 in production Chrome, Apple remained adamant about not supporting that spec. Ryosuke described the situation this way: “Shadow DOM as currently spec'ed is broken and won't adequately address the use cases we care about.”

From the outside, Google and Apple both seemed to be talking at each other without much progress. This impasse concerned me, because I was hoping to use web components as the basis for a component-oriented consulting practice at my startup,
[Component Kitchen](https://www.google.com/url?q=https://component.kitchen&sa=D&ust=1554399746464000).

At the same time, I felt there was room for a compromise that would reduce the complexity that concerned Apple, while still allowing Google to achieve much of its original vision.

The W3C WebApps working group was scheduled to hold a F2F (Face-to-Face meeting) in Mountain View, CA, on April 24. To me that meeting seemed like a good opportunity to make a compromise, and I wanted to do what I could to make that happen.

I began to wonder if conducting Shadow DOM discussions mostly online was reducing the potential for compromise. In February, I shared this thought with Dimitri, who had previously introduced me to Ryosuke via email. I reached out to Ryosuke and asked if he’d be interested in meeting. Ryosuke agreed and invited Tess to join as well.

The hope I expressed to Dimitri in email was that _“Ryosuke and I [could] work as a tiny team... come to agreement on something, and then jointly propose that for consideration at the F2F [web components face-to-face meeting] in April.”_

### April 3: Meeting with Apple

I met with Ryosuke and Tess at a conference room I rented for the morning in Palo Alto, not far from Apple’s headquarters. Our discussion was productive.

I proposed that we simplify the `<content>` element design to use a simple name instead of a CSS selector, and Ryosuke and Tess felt this would be a good step forward. For the sake of differentiating the proposed design from Shadow DOM v0, I wrote “slot” on the whiteboard as a working name. I offered to write up the new design as a joint proposal from Apple and Component Kitchen, and Ryosuke and Tess agreed.

Having the discussion in person — and not in the tightly-constrained medium of a mailing list — made an enormous difference. It was also helpful to ask Apple basic questions about their opinions and goals (_What do you want? What’s important to you?_) rather than constraining discussion to feedback on another company’s proposal (_Why won’t you adopt this design?_).

### April 21: Draft proposal

With feedback from Ryosuke and Tess, I posted a joint
[draft proposal](https://www.google.com/url?q=https://github.com/w3c/webcomponents/wiki/Proposal-for-changes-to-manage-Shadow-DOM-content-distribution/641b524e633678c2b25e7cb8ba31005350f36c9d&sa=D&ust=1554399746466000)
on GitHub, and Ryosuke
[shared the proposal on the webapps mailing list](https://www.google.com/url?q=https://lists.w3.org/Archives/Public/public-webapps/2015AprJun/0184.html&sa=D&ust=1554399746466000).
The proposal suggested several changes to Shadow DOM, including a new “syntax for named insertion points”:

> _In this proposal, the attribute for defining the name is called “slot”. The word “slot” is used both in the name of an attribute on the `<content>` element, and as an attribute (content-slot) for designating the insertion point to which an element should be distributed. The word “slot” should just be considered a placeholder. it could just as easily be called “name”, “parameter”, “insertion-point”, or something similar. We should focus first on the intent of the proposal and, if it seems interesting, only then tackle naming._

Eventually, the `<content>` element would be
[renamed](https://www.google.com/url?q=https://www.w3.org/Bugs/Public/show_bug.cgi?id%3D28561&sa=D&ust=1554399746468000)
`<slot>`, and the syntax `<content slot="foo">` was replaced with `<slot name="foo">`.

This definition of `<slot>` was intentionally simpler than the definition of `<content>`. Where `<content>` could specify a CSS selector, nodes could only be assigned to a `<slot>` by name.

Maciej
[summarized Apple’s positions on Shadow DOM v0](https://www.google.com/url?q=https://lists.w3.org/Archives/Public/public-webapps/2015AprJun/0225.html&sa=D&ust=1554399746468000),
including their desire to adopt the slot proposal. In email, Dimitri indicated that he was circulating the ideas at Google:

> _I just pre-flighted the ideas... and we don't hate them! :)_
>
> _Actually, the slot-based thing was received positively. It's something that would also definitely reduce the complexity of the code._

These were good words to hear. Still, Google is a big company comprised of individuals with their own opinions. Given Google’s considerable investment in Shadow DOM v0, many Googlers were still committed to pushing forward with that design.

Coincidentally, at this time my company was doing contract work for Google. To the extent that Google didn’t like the compromise proposal I had worked out with Apple, that disagreement was complicating our business relationship.

### April 24: W3C WebApps Face-to-Face

This was a critical meeting. Beforehand, Dimitri summarized the
[Contentious Bits](https://www.google.com/url?q=https://github.com/w3c/webcomponents/wiki/Shadow-DOM:-Contentious-Bits&sa=D&ust=1554399746470000)
of the Shadow DOM spec that included all the points on which Apple disagreed with Google. The `<slot>` proposal was listed under the question of removing support for multiple shadow roots.

This was my first W3C meeting, so I didn’t have other meetings to compare it to, but to me the discussion seemed fairly tense. Dimitri deftly and diplomatically started the meeting off on a positive note — by getting agreement on points that were not contentious or had been previously negotiated. He also began with an important concession, indicating that he would drop his original design that called for multiple shadow roots. From the meeting
[minutes](https://www.google.com/url?q=https://lists.w3.org/Archives/Public/public-webapps/2015AprJun/att-0307/24-minutes.html&sa=D&ust=1554399746471000):

> _This [multiple shadow roots] has been a big sticking point for the Shadow DOM spec. I was the one arguing for it. ... I think most usage isn’t that good, so I am okay with removing it._

That said, there was contention on whether the `<slot>` proposal was an adequate way to address the scenarios originally intended for multiple shadow roots.

<figure>
  <img src="/images/ck/Web Components F2F 2015.jpg">
  <figcaption>
    Whiteboard discussion at the April 2015 F2F. From left to right: Ryosuke Niwa (Apple), Anne van Kesteren (Mozilla), Hayato Ito (Google), Travis Leithead (Microsoft), Dimitri Glazkov (Google)
  </figcaption>
</figure>

Throughout the day, Ryosuke and Maciej argued Apple’s positions. Although I don’t see it captured in the minutes, I recall Ryosuke making it clear that the alternative to a negotiated agreement was that Apple would not implement Shadow DOM v0.

Google, for its part, was not enthusiastic about redesigning the `<content>` element. To keep track of the browser vendor positions on the points of contention, during the meeting I put together a spreadsheet tracking a
[Summary of positions on contentious bits of Shadow DOM](https://www.google.com/url?q=https://docs.google.com/spreadsheets/d/15rIpbH8uoiT4soB5WpLAI-geJgHf03wlgtlyUoJ_NuU/edit?usp%3Dsharing&sa=D&ust=1554399746473000).
At the end of the day, the score for the `<slot>` proposal looked like:

> _Slots Proposal_
>
> _Apple: Proposed it / Mozilla: Like it / Microsoft: Like it / Google: Opposed_

Still, substantial progress had been made during the F2F meeting towards addressing Apple’s concerns. From this meeting on, Apple seemed fully committed to resolving its remaining differences. Ryosuke and Dimitri left the meeting with a plan to meet again to discuss some of those. And Dimitri seemed very encouraged by Apple’s renewed level of interest in implementing Shadow DOM.

### May 15

A few weeks later, Scott Miles at Google posted a surprising message on the webapps mailing list, with the subject:
[How about let's go with slots?](https://www.google.com/url?q=https://lists.w3.org/Archives/Public/public-webapps/2015AprJun/0649.html&sa=D&ust=1554399746474000)

> _We think the ‘slot’ proposal can work… We would like for the working group to focus on writing the spec for the declarative ‘slot’ proposal._

Google was indicating their acceptance of Apple’s desire to replace `<content>` with `<slot>` in order to secure Apple’s support of the Shadow DOM standard in WebKit.

While I don’t have specific knowledge of Google’s internal deliberations, it seems likely that Dimitri played an important role in shifting Google’s position on this point. He had been apprehensive about the possibility Apple might walk away from the table again. If that happened, the Shadow DOM specification, and web components as an general idea, might founder and never receive significant adoption.

In contrast, yielding on this relatively small point would keep Apple not only involved, but emotionally invested in a successful outcome. Reaching a compromise was worth more in the long run that the specific merits of the competing `<content>` and `<slot>` designs.

_[Note added on April 22, 2019: Ryosuke commented that, “I don’t think we ever really considered ‘walking away’ from implementing web components per se. We just felt that what was being proposed (v0 APIs) were the wrong primitives... Fundamentally, Apple’s WebKit team always liked the basic idea of web components... I think the large part of contention was really miscommunications.”]_

## Aftermath

In the months after the April F2F, Apple and Google were reconciled their remaining differences. The Shadow DOM spec was rewritten as v1, which included the `<slot>` element as the way light DOM nodes would get displayed within a shadow tree. Ryosuke at Apple and Hayato Ito at Google began implementing Shadow DOM v1 support in WebKit and Blink, respectively.

In October 2015, initial
[Shadow DOM v1 support showed up in nightly WebKit builds](https://www.google.com/url?q=https://webkit.org/blog/4096/introducing-shadow-dom-api/&sa=D&ust=1554399746476000).
If I recall correctly, that shipped in production Safari sometime around June 2016. Google appears to have
[shipped Shadow DOM v1 in Chrome](https://www.google.com/url?q=https://groups.google.com/a/chromium.org/forum/%23!topic/blink-dev/zrZRD2ls5tw&sa=D&ust=1554399746476000)
around the same time.

Support from other vendors was slower to come. Mozilla finally
[shipped Shadow DOM v1 in Firefox](https://www.google.com/url?q=https://www.mozilla.org/en-US/firefox/63.0/releasenotes/&sa=D&ust=1554399746477000)
in October 2018. That same month, Microsoft publicly indicated that they had finally begun implementing Shadow DOM v1 in their EdgeHTML engine, but it’s unclear how much progress they ever made towards that end.

In December 2018, Microsoft announced that they were abandoning EdgeHTML in favor of using the same Chromium engine used by Chrome, so they’ll pick up Shadow DOM v1 by default. When Microsoft releases a Chromium-based version of Edge (presumably later this year), all major browsers will finally support Shadow DOM v1.

## Retrospective

Web components are still a fairly new technology, so it’s a little early to assess the strengths and weaknesses of Shadow DOM v1 across a broad range of products. I can at least say that, having now led the open
[Elix web component library](https://www.google.com/url?q=https://component.kitchen/elix&sa=D&ust=1554399746478000)
for several years, the `<slot>` design has met the Elix project’s needs to date. The project has yet to encounter the need for the sort of flexibility and complexity entailed by the original `<content>` element design. So as a technical solution, I think that `<slot>` has worked out fine so far.

Looking back, I think the `<slot>` proposal achieved what it meant to. It produced a fairly small shift in the definition of a standard but minor HTML element, and was rather unimportant on its own. But it nevertheless represented a breakthrough in the discussion. It renewed Apple’s interest in implementing Shadow DOM and the related Custom Elements specification, and ultimately ensured Apple’s support for Shadow DOM on the critical Mobile Safari web browser. While `<slot>` was just a small piece of a complex set of negotiations, I believe that, without agreement on that one point, it’s likely Apple would have not gone forward with Shadow DOM support.

At the same time, the `<slot>` compromise allowed Google to preserve much of their Shadow DOM investment and deliver Shadow DOM v1 support in a timely manner. In the grander scheme of things, it let Dimitri, Alex, and other farsighted visionaries at Google achieve their goal of finally giving the web a native UI component model. And for that, I think, we can all be grateful.

On a larger scale, it’s remarkable to consider that HTML has something like 100 standard elements, and each of them has a range of features. CSS and JavaScript are similarly complex. When we’re developing for the web, we take these standard elements and features as facts on the ground. For all we know or care, they’ve always been there — but all of them likely hold their own equally complex histories about how they came to be.

_Special thanks to Dimitri Glazkov and Ryosuke Niwa for reviewing drafts of this post._
