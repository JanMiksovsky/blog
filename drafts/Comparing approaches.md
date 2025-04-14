---
title: Comparing approaches
---

All approaches built the same blog
Equivalent results, equivalent performance

## Time invested

Astro: ~2 days
Zero deps: ~1 day

Using Astro took me longer than writing something completely from scratch, even accounting for the time required to transform markdown and generate RSS from scratch

## Code size

find src -type f \( -name "*.js" \) -exec wc -l {} +

## Package size

du -sh node_modules

0 for Zero Deps!
1MB AsyncTree
27MB for Origami


## Build time



The Astro team seems dedicated to performance, so I’m willing to stipulate it might do a much better job on larger sites. But I’m also willing to bet that many people and organizations have sites that are small enough that performance isn’t a critical factor.

## What do you actually need to learn?

Origami is a language — but so is Astro, actually several languages

## Answering questions

How hard is it to learn what the boilerplate is doing?

what should the boilerplate create?

what does getStaticPaths do?

## What do SSG frameworks provide?

All these SSGs are trying to define a way to map a tree of content onto a different tree of content

Much of the value is confidence: someone has figured out the problem for you

Starter project you can clone, initial instructions to follow about what goes where

A framework makes site construction feels doable in the same way that watching a Bob Ross video makes painting feel doable
You don’t actually need Bob Ross (or anyone else) to tell you how to paint. At the beginner level, you could probably learn just as much by buying paint supplies and just trying it. But having any kind of exemplar can provide critical confidence to actually try it.