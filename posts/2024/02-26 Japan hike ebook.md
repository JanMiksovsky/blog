---
title: I made an ebook about my hike across Japan
---

I've made a little [ebook about my hike across Japan](https://github.com/WebOrigami/ebook-sample/) last year.

In the summer of 2023, I walked for a month from the Pacific Coast to the Sea of Japan. I crossed steep mountains including Mt. Fuji, portions of the Southern Alps, the Yatsugatake range, the Northern Alps, and the Shio no Michi Trail. In between, I walked through cities, towns, and rural areas. The hike was a substantial challenge but also a fun adventure.

<a href="https://github.com/WebOrigami/ebook-sample/">
  <img src="/images/2024/02/cover.jpg" alt="Book cover showing a grassy meadow and an elevated walking path" style="max-height: 40vh">
</a>

Creating an ebook is not difficult. Will Crichton wrote a great [article advocating for using the EPUB format](https://willcrichton.net/notes/portable-epubs/) as a more portable and responsive alternative to PDFs.

Before reading it I hadn't appreciated that EPUB files are just ZIP files with a particular folder structure and some book data. In retrospect that makes sense, but for me that single insight demystified the entire prospect of creating an ebook. It's just a small bundle of files, mostly HTML, and some metadata.

You can use apps to make an ebook, but I wanted to build one more directly. Since the [Origami website definition language](https://weborigami.org) is great at processing trees of content (like a folder of text and images) into new forms, I realized it could easily generate an ebook in EPUB format.

It wasn't hard to write an Origami program to generate files in the required folder structure, and then it was just a matter of zipping it up.

Which left the question: what material could I turn into a book?

JamesG posted a good list of [ideas for things people can do on their website](https://jamesg.blog/2024/02/19/personal-website-ideas/). Facundo Olano [expanded on that](https://olano.dev/2024-02-22-a-few-more-things-you-can-do-on-your-website) to suggest adding EPUB downloads for your blog or subsets of it. Their posts made me realize my own hike posts might make an interesting sample book.

During the hike I'd kept a travel diary in markdown with photos, so it was fairly easy to add a cover image, an introduction, and some metadata. Voilà: a book!

It may seem silly, but packaging something as a "book" _feels_ weightier. Simply seeing the cover art in my ebook library alongside purchased novels was thrilling, as was opening up the book and paging through it. It felt like that day in third grade when a teacher had us bind illustrated stories into books and the school librarian put them on a library shelf. 📚

Try making an ebook — about anything — and you'll feel the same thrill.
