---
title: Automating generation of the audio and video for an Origami intro screencast
---

I’ve posted a new Origami intro screencast that covers some of the basics of the Origami language:

<iframe class="video16x9" src="https://www.youtube.com/embed/7KXtRQ5zFLY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

This screencast doesn’t give a complete introduction yet, but I think the production process I’m using is itself interesting and worth sharing.

Videos are a vital form of documentation but:

- Videos take _forever_ to produce — for me, easily an hour or more of production work per minute of final video!
- Videos documenting an evolving language quickly become out of date. I’ve poured weeks and weeks into videos that are already woefully out of date and have had to be taken down to avoid confusion.

## Goal

I was inspired by how [Grant Sanderson produces his 3Blue1Brown math animations programmatically](https://www.3blue1brown.com/lessons/manim-demo). Grant controls the graphics, the camera movements, highlights, text — everything — in code. This makes it easier for him to iterate on the story he’s telling by rewriting the code.

What I really want is to be able to focus on the story I want to tell — to be a screenwriter. I want to write a screencast script with stage directions (“Click on index.html”) and dialogue (“Alice: This index.html file contains…”). I’d love to be able to generate a decent screencast video directly from that.

## Process

I can’t find anything that lets me do what I want, so for now I’m trying to automate generation of the video and audio separately.

I’m trying a scriptable mouse/keyboard desktop automation product called [Keyboard Maestro](https://www.keyboardmaestro.com/main/). I can write keyboard/mouse macros for specific common actions (open the VS Code terminal, select a file, etc.), then assemble these into an overall macro for the screencast.

![](/images/2024/12/Keyboard%20Maestro.png)

This is very clunky for this purpose; I really wish some product like this offered a real programming language. In any event, I play the macro while recording the screen to get the video portion of the screencast.

I’m using Origami itself to [map a script of dialogue to generated voice files](https://github.com/WebOrigami/intro-screencast) via OpenAI. Having two alternating voices seems to reduce the fatigue of listening to generated text-to-speech.

The script is a YAML file with lines of dialogue for each of the “actors”:

```yaml
- echo: >
    To illustrate the basic ideas in their plainest form, let's start by writing
    some expressions in Origami using the command-line interface called ori. If
    I type "ori 1 plus 1", it evaluates that and displays 2.
- echo: >
    If I type "ori hello”, oree displays hello. In the shell, you'll need to
    escape quotes or surround them with extra quotes because the shell itself
    consumes quote marks.
- shimmer: >
    In addition to basic numbers and strings, you can reference files. Think of
    each file as if it were a spreadsheet cell. Instead of the A1, B2 style cell
    references in a spreadsheet, we can use paths and file names to refer to
    things. Unlike most programming languages, names in Origami can include
    characters like periods and hyphens.
```

This produces the audio portion of the screencast.
I then use [Camtasia](https://www.techsmith.com/camtasia/) to merge the audio and video to create the final screencast file. This requires a fair bit of work to position the audio clips in relation to the video, and in many places to add delays in the video to give the audio time to play.

## Lessons

This editing process still takes time but the recording of the audio and video took very little time compared to previous screencasts. And if Origami changes, it’s feasible to tweak the demo macro or dialogue, rerecord those, and splice those into the screencast.

I posted this video on the [Origami discussion board](https://matrix.to/#/%23weborigami:envs.net) to get feedback on a draft screencast. I used that feedback to refine the audio and video and then spliced in the updated parts. Being able to iterate on a screencast is fantastic.

One unpleasant surprise: After a second round of feedback, I went to rerecord the video — and discovered that VS Code had made changes to its window chrome! Uh, rats. That means that new video clips can’t be used alongside old ones, which means having to reposition all the audio in relation to the new video. That’s a real time sink.

## Future

I hope this approach pans out so that I can make more useful screencasts that can stay relevant for a longer time. Towards that end, I’d love to be able to:

* Replace the use of a keyboard/mouse desktop automation with something that has a real programming language, ideally JavaScript.
* Annotate the desktop automation script with the dialogue so that I can somehow programmatically sync the audio and video tracks.
* Alternatively, create a way to render something that looks like a generic code editor (and browser) with enough functionality to illustrate the kinds of points I make in screencasts, and where I can drive all the activity through code.

If you’re familiar with tools that can do any of those things, **please let me know!**
