---
title: Unicode should add missing emoji for very common words
---

While developing vocabulary for the [Emojese emoji
language](https://emojese.org), I've found many common words that might benefit
from new emoji. You can turn on Experimental Emoji in the app to see how
these could feel in practice.

![](/images/2023/01/weCanGiveYouHelp.png)

I think it would be worthwhile to deliberately fill out Unicode with emoji for the many [common words without obvious emoji representations](https://github.com/JanMiksovsky/emojese/blob/main/docs/Challenges.md). Some of these concepts are quite abstract; any visual representation might be challenging, especially at small sizes. The Unicode Emoji Subcommittee requires new emoji proposals to be legible at 18x18 pixels, which is quite small. Still, you can get a sense for just how many of these concepts _can_ be represented well.

![](/images/2023/01/wordsWithoutEmoji.png)

The Emoji Subcommittee is very conservative these days when it comes to approving new emoji — but in recent years the same subcommittee approved 150 emojis for a single idea: 💑 [Couple with Heart](https://emojipedia.org/couple-with-heart/).

People justifiably want to see themselves represented, and in the case of 💑 that requires supporting two people, three genders (female, male, neutral), 6 skin tones (including the default yellow tone and the 5 [skin tone modifiers](https://emojipedia.org/emoji-modifier-sequence/)). The combinations add up quickly.

<pre style="font-size: 32px;">
💑 💑🏻 💑🏼 💑🏽 💑🏾 💑🏿 👩‍❤️‍👨 👩‍❤️‍👨🏻 👩🏻‍❤️‍👨 👩‍❤️‍👨🏼
👩🏼‍❤️‍👨 👩🏽‍❤️‍👨 👩‍❤️‍👨🏽 👩🏾‍❤️‍👨 👩‍❤️‍👨🏾 👩‍❤️‍👨🏿 👩🏿‍❤️‍👨 👩🏻‍❤️‍👨🏻 👩🏻‍❤️‍👨🏼 👩🏻‍❤️‍👨🏽
👩🏻‍❤️‍👨🏾 👩🏻‍❤️‍👨🏿 👩🏼‍❤️‍👨🏻 👩🏼‍❤️‍👨🏼 👩🏼‍❤️‍👨🏽 👩🏼‍❤️‍👨🏾 👩🏼‍❤️‍👨🏿 👩🏽‍❤️‍👨🏻 👩🏽‍❤️‍👨🏼 👩🏽‍❤️‍👨🏽
👩🏽‍❤️‍👨🏾 👩🏽‍❤️‍👨🏿 👩🏾‍❤️‍👨🏻 👩🏾‍❤️‍👨🏼 👩🏾‍❤️‍👨🏽 👩🏾‍❤️‍👨🏾 👩🏾‍❤️‍👨🏿 👩🏿‍❤️‍👨🏻 👩🏿‍❤️‍👨🏼 👩🏿‍❤️‍👨🏽
👩🏿‍❤️‍👨🏾 👩🏿‍❤️‍👨🏿 👨‍❤️‍👨 👨🏻‍❤️‍👨 👨‍❤️‍👨🏻 👨‍❤️‍👨🏼 👨🏼‍❤️‍👨 👨🏽‍❤️‍👨 👨‍❤️‍👨🏽 👨‍❤️‍👨🏾
👨🏾‍❤️‍👨 👨🏿‍❤️‍👨 👨‍❤️‍👨🏿 👨🏻‍❤️‍👨🏻 👨🏻‍❤️‍👨🏼 👨🏻‍❤️‍👨🏽 👨🏻‍❤️‍👨🏾 👨🏻‍❤️‍👨🏿 👨🏼‍❤️‍👨🏻 👨🏼‍❤️‍👨🏼
👨🏼‍❤️‍👨🏽 👨🏼‍❤️‍👨🏾 👨🏼‍❤️‍👨🏿 👨🏽‍❤️‍👨🏻 👨🏽‍❤️‍👨🏼 👨🏽‍❤️‍👨🏽 👨🏽‍❤️‍👨🏾 👨🏽‍❤️‍👨🏿 👨🏾‍❤️‍👨🏻 👨🏾‍❤️‍👨🏼
👨🏾‍❤️‍👨🏽 👨🏾‍❤️‍👨🏾 👨🏾‍❤️‍👨🏿 👨🏿‍❤️‍👨🏻 👨🏿‍❤️‍👨🏼 👨🏿‍❤️‍👨🏽 👨🏿‍❤️‍👨🏾 👨🏿‍❤️‍👨🏿 👩‍❤️‍👩 👩🏻‍❤️‍👩
👩‍❤️‍👩🏻 👩‍❤️‍👩🏼 👩🏼‍❤️‍👩 👩🏽‍❤️‍👩 👩‍❤️‍👩🏽 👩‍❤️‍👩🏾 👩🏾‍❤️‍👩 👩🏿‍❤️‍👩 👩‍❤️‍👩🏿 👩🏻‍❤️‍👩🏻
👩🏻‍❤️‍👩🏼 👩🏻‍❤️‍👩🏽 👩🏻‍❤️‍👩🏾 👩🏻‍❤️‍👩🏿 👩🏼‍❤️‍👩🏻 👩🏼‍❤️‍👩🏼 👩🏼‍❤️‍👩🏽 👩🏼‍❤️‍👩🏾 👩🏼‍❤️‍👩🏿 👩🏽‍❤️‍👩🏻
👩🏽‍❤️‍👩🏼 👩🏽‍❤️‍👩🏽 👩🏽‍❤️‍👩🏾 👩🏽‍❤️‍👩🏿 👩🏾‍❤️‍👩🏻 👩🏾‍❤️‍👩🏼 👩🏾‍❤️‍👩🏽 👩🏾‍❤️‍👩🏾 👩🏾‍❤️‍👩🏿 👩🏿‍❤️‍👩🏻
👩🏿‍❤️‍👩🏼 👩🏿‍❤️‍👩🏽 👩🏿‍❤️‍👩🏾 👩🏿‍❤️‍👩🏿 👨🏼‍❤️‍👩🏿 👨🏽‍❤️‍👩 👨🏽‍❤️‍👩🏻 👨🏽‍❤️‍👩🏼 👨🏽‍❤️‍👩🏽 👨🏽‍❤️‍👩🏾
👨🏽‍❤️‍👩🏿 👨🏾‍❤️‍👩 👨🏾‍❤️‍👩🏻 👨🏾‍❤️‍👩🏼 👨🏾‍❤️‍👩🏽 👨🏾‍❤️‍👩🏾 👨🏾‍❤️‍👩🏿 👨🏿‍❤️‍👩🏻 👨🏿‍❤️‍👩🏿 👨🏿‍❤️‍👩🏾
👨🏿‍❤️‍👩🏽 👨🏿‍❤️‍👩🏼 👨‍❤️‍👩🏿 👨🏿‍❤️‍👩 👨‍❤️‍👩🏾 👨‍❤️‍👩🏽 👨‍❤️‍👩🏼 👨🏻‍❤️‍👩 👨🏻‍❤️‍👩🏻 👨🏻‍❤️‍👩🏼
👨🏻‍❤️‍👩🏽 👨🏻‍❤️‍👩🏾 👨🏻‍❤️‍👩🏿 👨‍❤️‍👩🏻 👨‍❤️‍👩 👨🏼‍❤️‍👩 👨🏼‍❤️‍👩🏻 👨🏼‍❤️‍👩🏼 👨🏼‍❤️‍👩🏽 👨🏼‍❤️‍👩🏾
</pre>

Clearly “love between two people” is an important concept, but we _do_ talk about many other things in our daily lives, and a substantial number of those don’t have any clear emoji representation yet.

Imagine if we introduced 150 new emojis to represent actions and ideas which are extremely common in everyday conversation but which have no obvious representation today! Surely that would be worthwhile?
