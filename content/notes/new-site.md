---
title: "New Site"
date: 2021-12-04T19:02:52-08:00
draft: false

---

I'm back again with my 3rd attempt to redesign my site. Funny how the styling seems to get simpler and simpler with each iteration.
In the past few months since my last site update/redesign, I've made a couple attempts at switching the static site generation platform from Hugo to something more featureful.
Over the course of a couple weekend afternoons I tried out Next.js, Nuxt.js, Gatsby, and SvelteKit. I have been pretty fond of Svelte since I tried it out a while ago, so I spent the most time fiddling around with SvelteKit to generate a static blog. While I did end up getting something that sort of resembles a blog up and running pretty quickly, I couldn't get used to the content organization. I wanted to use MDSVex to allow inserting Svelte components directly into Markdown text because I thought it would be useful to include one-off components for certain blog posts or notes. Putting MDSVex in the site generation pipeline was extremely simple, but using it as a preprocessor with the content organization scheme I wanted did not seem like it was going to be an easy task. If I'm being completely honest, though, it's not like I gave it a real try. I pretty much stopped my work on that blog setup once I realized it definitely would take more effort that it was worth.

For a personal blog/site like this one - at least for me - content is king. If the setup does not make writing blog content feel accessible and comfortable, I'm never going to end up publishing content. I know there are client-side CMS platforms and stuff, like that Netlify one, but something like that just feels overkill. I would like to open the site content directly in Vim/Obsidian/whatever and not have to work around layout/templating files or feel like I'm working in a code repository. I work in different cognitive modes when I write copy versus when I write code, and it becomes distracting if my Markdown is in the same folder as some JavaScript file. That's why I like the Hugo content organization better than other site generators. Also, it is definitely one of the simplest platforms for setting up a basic blog. Of course, my site is not complicated (I promise I'm not lazy, it's by design!), but this is defintely a case of picking the right tool for the job and I think I've made the right choice - at least for now.
