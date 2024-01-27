---
title: "Home"
layout: "layouts/home.html"
permalink: "/"
---

# Hello world

In publishing and graphic design, Lorem ipsum (/ˌlɔː.rəm ˈɪp.səm/) is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication, without the meaning of the text influencing the design.

Here is a footnote reference,[^1] and another.[^longnote]

{% image
  "https://doodleipsum.com/400?i=db790c4cb0f27b283177f8b769bc37ae",
  "Four women wearing 1990s gala dresses.",
  "This is my caption",
  "(max-width: 480px) 480px, 100vw",
  "eager"
%}

[^1]: Here is the footnote.
[^longnote]:
    Here's one with multiple blocks.
    However, when markdown is generated, links to footnotes still look like #fn1. This has the usual ordered reference problem: if more footnotes are added above a given footnote, its link changes. If it didn't work that way, using ids could have been a nice way to ensure that Cool URIs don’t change. I understand this may not always be desirable, but it could be a sensible default with an option to override it if the current behavior is desired.
