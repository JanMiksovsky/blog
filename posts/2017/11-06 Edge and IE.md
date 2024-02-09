---
title: Is it worth creating web components that work on IE 11? Or Edge?
originalUrl: https://component.kitchen/blog/posts/is-it-worth-creating-web-components-that-work-on-ie-11-or-edge
---

I spent the last week on my least favorite engineering task: trying to get a body of code that works on Chrome/Safari/Firefox to work on Microsoft Edge and Microsoft Internet Explorer. In this case, I've been trying to get the Elix project's unit tests and basic component set working as expected in Edge and IE 11. Such work is never fun. Lately I've been wondering whether it's worth the Elix project's time to support Microsoft's browsers.

## Internet Explorer 11

IE 11 is still supported by Microsoft, but as the mainstream browsers have accelerated away from it, working in IE feels increasingly anachronistic. Although many modern web technologies come with a polyfill or other means to accommodate IE 11, the set of workarounds required today has really piled up.

In the case of the Elix project, here's the current set of things we need to do for IE 11:

- Transpile everything to ES5.
- Bundle everything into old school script files, since IE can't handle modules. (While bundling is currently appropriate for production deployments in all browsers, we prefer to have our unit tests and demos run as native modules. Performance is not the primary consideration in those contexts, and we prefer to work directly against the real code. We test in Firefox with module support turned on, although production Firefox doesn't yet support modules by default.)
- Maintain a build process in general. In modern browsers, all of Elix can run directly as is.
- Load a Shadow DOM polyfill.
- Load a Custom Elements polyfill.
- Load a `Promise` polyfill.
- Load a runtime that lets us use transpiled `async` functions.
- Load a `Symbol` polyfill.
- Load a polyfill for `Object.assign`.
- Incorporate many, many workarounds for deficiencies or quirks in IE. Did you know that IE's `classList` object has a `toggle` method that [does _not_ support the standard second argument](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList#Browser_compatibility)? We know that now, and have had to work around that.

Everything we're forced to add to the above list moves us further and further away from the metal. When we hit a bug, it's really hard to be confident about where the bug lies. Is it our code? Or somewhere in the list above?

I joked on Twitter that getting a modern web app to run on IE is possible, in the same way it's possible to [play Doom on a thermostat](https://www.youtube.com/watch?v=2T5LyEjLfP8). In truth, the situation is worse. For all I know, a modern thermostat has better hardware than the 1993 PCs which Doom originally ran on. A better comparison might be that getting a modern web app to run on IE is like getting a modern game title like _Horizon Zero Dawn_ to run on a thermostat.

## Edge

Microsoft Edge 16 is much better than IE, but it's still no picnic.

While Edge supports many modern web technologies, Microsoft still hasn't begun implementing Shadow DOM and Custom Elements. And Edge still suffers from some of the same painful, glaring problems as its predecessor:

- Edge's debugging tools are godawful. The debugger is slow. It hangs. It crashes. Its feature set is weak, weak, weak. It's so flaky, there was a point I couldn't get Elix's unit tests to pass in Edge _unless the debug tools were closed_. Opening the Edge debug tools would introduce unit test failures. How's that for a friendly developer experience?
- Edge's release cadence is too slow. Today I isolated and filed an [Edge flex box bug](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/14496746/). Even if Microsoft fixes the bug immediately, we could be waiting for the better part of a year to see the fix widely available.
- Microsoft has offered no compelling vision of its own for the web. Interest in the Windows API as an application platform appears to be negligible and getting smaller. If that's correct, you would think Microsoft would invest heavily in a web-focused future. But at this past summer's Edge Developer Conference, Microsoft presentations were almost entirely focused on ideas introduced by Google long ago.

It's not that Microsoft has forgotten about developers and how to cater to them. I'm continually impressed by the speed and quality of the work currently going into Visual Studio Code and TypeScript, for example. But when it comes to the developer experience in modern browsers, Edge is dead last.

## Market share and inertia

In discussions about browser support, IE and Edge support are often presumed to be important. But given the current state of the market and some [usage summaries](https://en.wikipedia.org/wiki/Usage_share_of_web_browsers#Summary_tables), I'm not sure that makes sense.

Mobile browser usage exceeds desktop browser usage. On mobile, China's UC Browser appears to have significantly more market share than IE and Edge on the desktop. Samsung Internet for Android likewise may have already passed Edge in market share, and may soon pass IE.

The cost to keep things working on IE steadily grows. Even when new web advances come with polyfills that run on IE, the combined weight of all that's necessary to support IE is considerable. How much faster could your team go if it didn't have to support IE? In the case of the Elix project, I'm guessing IE support soaks up 10% of our time, and 50% of our positive emotions.

And though Edge is Microsoft's replacement for IE, it's not clear Edge is on a path to any kind of interesting market position. In the 2 years Edge has been on the market, it's made miniscule gains. As far as I can tell, everyone who can abandon IE has already moved to Chrome. And those Chrome users must be sticking with Chrome even when they upgrade to a Windows machine capable of running Edge.

In the global political order, the country of France retains one of 5 permanent seats on the U.N. Security Council solely for historical reasons, out of all proportion to its current importance. It feels like similar historical reasons may soon be the primary justification for Microsoft's position on web app browser requirements lists. Microsoft acts as if it automatically deserves a seat at the table, but I question that. It's reasonable to ask Microsoft: _What are you doing, today, as a browser vendor, that makes you worth the time and energy you force developers to spend on you?_

As someone who worked at Microsoft for many years, I hold no grudge against them. To the contrary, as an alum, I really _want_ them to be successful. But if they're going to be relevant as a browser vendor, they're going to have to do a lot better. In the meantime, I'm wondering whether their browsers are worth the trouble.
