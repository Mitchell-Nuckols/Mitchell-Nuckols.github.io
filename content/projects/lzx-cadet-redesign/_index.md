---
title: Remixing LZX Industries' Cadet and Castle Series
status: idea
type: project-entry

date: 2022-02-16
updated: 2022-02-16

---

# Outline:
A little over a year ago I discovered the very interesting world of analog video synthesis.
I had known about modular audio synths for a while, but since I have effectively zero musical talent, I was never particularly interested in it.
(My dad bought me an electric guitar when I was little in an attempt to teach me, but I was more interested on what was inside, so I just took it apart instead)
The cool part about video synthesis, though, is it isn't really reliant on having to understand theory behind what makes something sound good.
If it looks cool, it looks cool, if not, just do something different.
At least that's my layperson understanding from just watching YouTube videos on the subject.

A prominent figure in modular video synthesis is [LZX Industries](https://lzxindustries.net/), who has released quite the assortment of video synth gear.
About 3 years ago they released a handful of modules as open source, the Cadet and Castle series.
The main driving component in these modules is the LM6172 video-grade dual op-amp, which currently go for [$5.78 each](https://www.mouser.com/c/semiconductors/amplifier-ics/high-speed-operational-amplifiers/?m=Analog%20Devices%20Inc.&series=ADA4851-4) in quantities of 10 on Mouser.
Yikes!
I'm broke, but this type of stuff is crazy cool to me and I wanna get into it for as cheap as possible.
So...

# The Plan:
Lars Larsen of LZX Industries [mentioned](https://community.lzxindustries.net/t/cadet-castle-components-sources-and-substitutions/42/92) they are moving to the ADA4851-x series of op-amps for their next DIY series.
This was mentioned in August of 2020 and I haven't really seen anything new about it since.
There are some helpful [reference designs](https://raw.githubusercontent.com/lzxindustries/lzxdocs/master/Reference%20Designs/LZX%20Interface%20Examples%20RevA.pdf) to help with designing some circuits with these op-amps around a +/-5V supply, though.

Here's the best part: the ADA4851-4, a quad op-amp, go for [$3.33 each](https://www.mouser.com/c/semiconductors/amplifier-ics/high-speed-operational-amplifiers/?m=Analog%20Devices%20Inc.&series=ADA4851-4) in quantities of 10 on Mouser.
If my math is correct, that's $2.89 vs. $0.83, for the LM6172 and ADA4851-4 respectively, on a per-channel scale.
Nearly 3.5x cheaper!
My plan is to remix the Castle and Cadet schematics, which can be found on [GitHub](https://github.com/lzxindustries/lzxdocs), to use these lower cost parts.