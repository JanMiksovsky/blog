---
title: Elix general-purpose web component library releases v1.0.0
originalUrl: https://component.kitchen/blog/posts/elix-general-purpose-web-component-library-releases-v100
---

We're excited to announce that the [Elix](https://component.kitchen/elix) project we lead has reached its v1.0.0 milestone.

This represents the culmination of over a year of work to create a great set of high-quality, general-purpose web components for common user interface patterns. These include:

- [SlidingCarousel](https://component.kitchen/elix/SlidingCarousel): a full-featured carousel for images and other elements that includes navigation with touch, a mouse, a keyboard, or a trackpad, as well as accessibility support.
- [Drawer](https://component.kitchen/elix/Drawer): a panel that slides in to temporarily present navigation or other UI elements. Includes touch support to swipe the drawer away.
- [Tabs](https://component.kitchen/elix/Tabs): useful for classic tabbed UIs or configurable for such patterns as tabbed navigation toolbars.

These components, and the others components in the initial Elix release, are all built from [focused JavaScript mixins](https://component.kitchen/elix/mixins) that cover a wide range of basics, from a [lightweight React-like state rendering architecture](https://component.kitchen/elix/ReactiveMixin) to [touch swipe gestures](https://component.kitchen/elix/TouchSwipeMixin) to [managing modal and modeless overlays](https://component.kitchen/elix/OverlayMixin). Elix's mixin architecture is what lets the project manage the complexity and subtle details hiding behind seemingly simple components.

Beyond the project's technology, we're also proud to be managing the project with an open governance model that includes regular core team discussions and an open [Request for Comments](https://github.com/elix/rfcs) process.

The project is already hard at work on its 2.0 release. A big focus for that release will be a system for thoroughly customizing the appearance and behavior of the key parts inside a component.
