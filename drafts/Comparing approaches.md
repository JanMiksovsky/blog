---
title: Comparing approaches
---

All approaches built the same blog
Equivalent results, equivalent performance

## Time invested

Astro: 1.5 days
Zero deps: less than a day

Using Astro took me longer than writing something completely from scratch, even accounting for the time required to transform markdown and generate RSS from scratch

## Package size

0 for Zero Deps!
1MB AsyncTree
27MB for Origami. X% of this is in dev tools that could be factored out at some point.
100MB of node_modules

## Build time

Astro’s elapsed “real” build time is actually less than the “user” time that (as I understand it) reflects the sum of the CPU time across all cores. I infer that Astro or something it’s calling is doing work on multiple threads. So the actual work performed by Astro here is greater than what’s represented, and perhaps on single-core machines the build times would be higher. 

The Astro team seems dedicated to performance, so I’m willing to stipulate it might do a much better job on larger sites. But I’m also willing to bet that many people and organizations have sites that are small enough that performance isn’t a critical factor.

## What do you actually need to learn?

Astro is actually several languages

## Answering questions

How hard is it to learn what the boilerplate is doing?

what should the boilerplate create?

what does getStaticPaths do?

## What do SSG frameworks provide?

Much of the value is confidence: someone has figured out the problem for you

Starter project you can clone, initial instructions to follow about what goes where

A framework makes site construction feels doable in the same way that watching a Bob Ross video makes painting feel doable
You don’t actually need Bob Ross (or anyone else) to tell you how to paint. At the beginner level, you could probably learn just as much by buying paint supplies and just trying it. But having any kind of exemplar can provide critical confidence to actually try it.