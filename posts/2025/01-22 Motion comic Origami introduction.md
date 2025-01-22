---
title: "I wrote a screenplay for a programming language introduction, then wrote a program to turn that into a motion comic #WebOrigami #comics #webdev"
---

I’ve posted a short introduction to the [Origami language](https://weborigami.org/language) in the form of a motion comic you can play in your browser:

<a href="https://origami-comics.netlify.app">
	<img src="/images/2025/01/comic.png" alt="Comic panel with the text ‘Intro to Origami’ with a bright explosion behind it in the style of classic comic book covers">
</a>

## Lessons from the audio/video experiment

This comic builds on last month’s experiment to [automate the generation of the audio and video for a screencast](https://jan.miksovsky.com/posts/2024/12-21-generated-screencast) in which I was searching for a better way to create video content for the Web Origami project and the Origami language.

I learned a lot in that experiment:

* **Great**: Generating audio from a screenplay made things go much, much faster!
* **A little bad**: Writing a keyboard macro to drive a programming environment is a bit tedious and finicky. I wanted to use a real programming language.
* **A little bad**: Even with a keyboard macro triggering the action on screen, it’s still cumbersome to set up a screen capture program to record the action into video. It was annoying enough that I was reluctant to go through the process again whenever I needed to re-record video.
* **Bad**: Manually editing together the audio fragments and the video was still time-consuming.
* **Bad**: The video showed a session in Microsoft VS Code, but during the days I was working on the video, Microsoft changed the UI of VS Code! That prevented me from incorporating new video, because I didn’t want the distraction of the UI changing back and forth during the video.
* **Bad**: YouTube doesn’t allow you to replace a video with an updated one at the same URL, so each time I edited my video I had to post it at a new URL. This eroded any theoretical value of likes or comments.

What I really wanted to be able to do was write a screenplay and have both the audio and video completely generated from that. I eventually concluded that it would be easier to *mock* a user interface (like a terminal or editor) than to drive an actual application.

## Motion comics

Meanwhile I was fascinated by two UI ideas:

- Researcher Bret Victor places [thumbnails next to his videos](https://dynamicland.org/2024/Intro/). You can read the thumbnails like a comic. I wish YouTube did this, although it’s been pointed out that anything along these lines would probably reduce their ad revenue.
- Interactive [motion comics](https://en.wikipedia.org/wiki/Motion_comic) like [Florence](https://annapurnainteractive.com/en/games/florence) explore the space in between print comics and interactive games.

I decided to try to create a system that would take a screenplay as input and then output a motion comic. I loved comics as a kid and still enjoy them today. They can feel fun in a way that a tech video often does not.

One strength of a comic is that, unlike a video, the user controls the pace. It’s only a small act to scroll the page, but it feels engaging like reading, not as passive as watching a video.

## Building a motion comic in HTML/CSS

One architectural principle I adopted for this was to render the initial form of the complete comic using just HTML and CSS. This not only serves the small audience that don’t or can’t use JavaScript, but also works with the grain of the web.

This static-first approach meant I could easily build the comic page in Origami itself. The main build process feeds the [screenplay](https://github.com/WebOrigami/comics/blob/main/screenplay.yaml) to a template that generates panels for each screenplay segment. A given panel might the appearance of a terminal window or show a graphic, for example.

Given the advancing state of CSS, building a page in plain HTML and CSS still requires a lot of knowledge, but things mostly work as expected. A particularly important feature for this project was using CSS [`scroll-snap`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap) to center the current panel on the page.

The `scroll-snap` feature more or less works as advertised, although I notice some slightly odd behaviors on iOS Safari. iOS Safari also has some deeply annoying behavior related to audio autoplay that make it very difficult even to let users opt into audio. These iOS is my least favorite browser to work in.

Once I could render the basic comic, I went through and added a bit of JavaScript animation to the panels as a progressive enhancement. For now this animation mostly takes the form of typing, but it’s a start. Just as Grant Sanderson has evolved his [system for programmatic math animations](https://www.3blue1brown.com/lessons/manim-demo), this comic system can evolve in the future.

It was really fun to round out the experience with stock vector illustrations, sound effects, and gorgeous comic lettering fonts from [BlamBot](https://blambot.com/). As soon as I dropped in a dialogue font with ALL CAPS, the comic feel snapped into focus.

Building this mostly as plain HTML and CSS has two other important benefits:

* **Change detection.** As with all Origami projects, I can use Origami’s own [`changes`](https://weborigami.org/builtins/dev/changes) function to test the built files against a previously-generated baseline. That includes checking the text of any comic panels that incorporate the output of Origami expressions. If I make a change to the language itself that inadvertently changes the output shown in the comic, the `changes` function should flag those for me.
* **These plain web files can be hosted anywhere.** I don’t have any particular beef with YouTube at this time but their market position as a capricious and rapacious monopolist should give us all pause. Without the constraints of YouTube, I can update the comic whenever I want and keep the same URL. And you don’t have to sit through ads!

## What I really want to do is direct

I now have the basics of the system I’ve wanted: I can edit a screenplay and have that produce a (hopefully) engaging user experience with dynamic visual and audio components.

This feels more like directing than video production. With a video, I often couldn’t get a sense for how a particular line would feel until the video was finished — but unless I was really unhappy with it, it was inconceivable that I would go back and redo a line.

Being able to focus on the screenplay makes it much easier for me to step back, perceive the comic as a viewer, and spot something that can be improved. Editing the comic is as fast as editing any other text and the result of the edit can be viewed instantly.

## How does it feel?

This kind of motion comic sits somewhere on a spectrum between plain text documentation and recorded video tutorials. It wouldn’t take much to move this closer to regular text documentation, or push it further to the other end and render all the animated frames to video.

I’m pretty happy with this as it is, but if you go through the comic and have thoughts, I’d [love to hear them](https://jan.miksovsky.com/contact).