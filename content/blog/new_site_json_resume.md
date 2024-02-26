+++
title = "Site Re-Do (Again)"
date = "2024-02-24"
+++

# Site Re-Do (Again)

I'm back with yet another site re-design.
Here are some highlights:

* Switched the site generator from [Hugo](https://gohugo.io/) to [Zola](https://www.getzola.org/)
* Added a *very small* (arguably unecessary) touch of JavaScript for those who have it enabled
* Modified the {{ j_link(path="@/resume.md", text="Resume") }} page to be entirely data-driven

## From Hugo to Zola
Honestly I just wanted to try something new.
I was only using a fraction of the features Hugo offers and figured looking at a new tool could be fun.
I came across Zola while reading an article on Alexis Lozano's site regarding [hexagonal architecture in Rust](https://alexis-lozano.com/hexagonal-architecture-in-rust-1/), which inspired me to start up my website again.
The transition from Hugo has been very smooth, though I am essentially re-doing all content on the site, so I'm not sure what the migration cost is.
Conceptually, though, it's very similar, if not simpler to understand.

## Light JavaScript Enhancement
This one is new for me.

I'm typically against JS being used where it doesn't belong, and admittedly prided myself in not using it on previous sites.
However, I began wondering if I could add something simple to swap content on page navigation to prevent having to reload my whole site and trigger an entire page refresh.

My first thought was [HTMX](https://htmx.org/) with the `hx-boost` and `hx-swap` attributes.
I became a fan of HTMX after using it to build some simple apps that could benefit from dynamic page content but didn't justify the frontend development overhead of something like React or Svelte.
However, HTMX is ~14kB minified and gzipped, of which at least 13kB was for features I didn't need.

I set the idea aside and continued working on the site content until I came across [this post](https://news.ycombinator.com/item?id=39429370) on Hacker News about [HTMZ](https://leanrada.com/htmz/).
166 *bytes* of JavaScript and it used native HTML features in the form of `<iframe>`s to boost content.
This seemed exactly like what I wanted and I spent around an hour playing with it.
However, it fell a little short when it came to pushing page history to the window.
I didn't find it entirely user-friendly to not push location changes to the address bar.
There were also some quirks with the iframe history navigation, though that could be because I was loading the entire page into the iframe instead of simple HTML snippets.

Next, there was [Swap.js](https://github.com/josephernest/Swap/tree/main), which seemed to isolate the `hx-boost` feature of HTMX and package it in a neat, small library.
This was *almost* what I needed, but I wanted to go smaller.
Swap, like HTMX and HTMZ is geared towards requesting HTML *snippets* from a server and inserting them into an element on the DOM.
I'm not interested in running a backend for this site, so any request for new page content would have to be static.
Problems with static snippets arise when the user has JavaScript disabled.
HTMX and Swap solve this problem by sending a special header letting the server know to only send a snippet if the user has JS enabled.
Without a backend, though, these headers mean nothing.
No JavaScript is a user choice this site must absolutely respect, so the lack of a dynamic backend means any new page content will have to come with the *whole* page on request.

Using Swap as a starting point and inspiration, I created what I call "Jolt".
It's named Jolt because of the universal requirement that every simple JavaScript snippet comes with a single word name that sounds cool.
A JavaScript Jolt library [already exists](https://github.com/bazaarvoice/jolt) so if you have an idea for a different cool-sounding and meaningless name, send it my way.

Anyways, here's the code:

{{ highlight_code(path="scripts/jolt.js", lang="js") }}

Links that trigger swap events are tagged with a `j-link` attribute:
```html
<a href="resume.html" j-link>Resume</a>
```
This attaches a listener that triggers an AJAX request on click, which then reads in the page specified in the `href` and swaps tags containing the `j-patch` attribute with the tag from the new HTML containing a matching `id`.
For example, if I had a title tag
```html
<title id="page-title" j-patch>Homepage Title</title>
```
and a link to another page
```html
<a href="subpage.html" j-link>Subpage Link</a>
```
following the link would trigger an AJAX request to `subpage.html` and swap `j-patch` marked tags with the new page's content (and push 'subpage.html' to the browser history).
If this was the title tag in the new page, it would get swapped in:
```html
<title id="page-title" j-patch>Subpage Title</title>
```

That's it.
I think the use cases of this type of content swap are limited and arguably not necessary, but I like the feel of content swapping rather than a whole page reload.
This also opens the opportunity to add something like a `j-preload` attribute to a select number of links to preload and cache top-level pages for even faster navigation.
Of course, preloading would have to be done sparingly and only on small pages, since the *entire* page comes with each request.

## New Resume Page and Data-Driven Content Generation
My resume on the old site was woefully out of date.
This is primarily because when I sent out a PDF of my resume to potential employers, it came from a fancy LaTeX document I maintianed regularly.
Working in LaTeX, however, meant the site's resume page had to be updated manually in Markdown to reflect any changes I made on the LaTeX file.

This was a poor method of keeping these files in sync and you could probably guess it didn't take long for the site to become neglected.

When starting this new site, I wanted to use some form of data-driven content that would allow me to define my resume in a common format, like YAML or JSON, and simply export it to markup formats like LaTeX or HTML through templating.
It didn't take long to find [JSON Resume](https://jsonresume.org/schema/), which defines a standard format to convey the typical information found on a resume using JSON.
I have a few disagreements on the content of some of the categories, but for the most part it captures the type of information I want in my resume, so I've used it as a starting point.
The actual JSON is exported with this site if you're interested in what a complete JSON Resume looks like: [My JSON Resume](/data/resume.json)

I have yet to implement the LaTeX side of this template-based resume system, but I don't expect it to take very long now that I have a standard schema to follow.
The end goal here is to have my GitHub Actions setup in such a way that a change to my resume source triggers a new build and push for both this site and the PDF generated from the LaTeX template.
This way, even if I fall behind with updating this site with posts, it'll at least contain an up-to-date copy of my resume.