---
description: Field notes from a data science Master's student on moving
  maternal health disparity charts off a 512 MB Render server onto static
  D3/Plotly pages and Deepnote.
pubDate: 2026-11-20
title: Building Maternal Health Disparity Views Without Fighting a 512 MB Render Server
updatedDate: 2026-11-20
tags:
- data-science
- maternal-health
- d3
- plotly
- polars
- deepnote
---

> Field notes from a data science Master's student exploring public health
> data and testing tools around Detroit maternal health disparities.

I'm a Master's student studying data science, and maternal health is an area I
really want to dig into for further study (I am a mom of 2 with one on the way!). Somewhere along the way I came
across the Mothering Justice website and had that familiar urge: *what if I
actually tried to build something an organization like this might care about?*

Not as a finished product or an official deliverable—just as practice, seeing
how data turns into something a real person can read and use. And honestly, a
big part of today was just curiosity: trying different tools side by side to
see what the outputs actually look like instead of living in theory. I also
leaned on Gemini throughout the process and used Deepnote AI while building
out the interactive notebook side, which made experimenting and troubleshooting
a lot faster.

## Hitting the Wall on Render

At first, I had a Dash and Gunicorn app running on Render against a tight
512 MB memory limit. On paper it makes sense; in practice, watching a live
server keep hitting out-of-memory errors and `SIGKILL` gets old fast.

At some point you stop tweaking server settings and ask a simpler question:
*does this even need a live server?* For public health indicators that don't
change every second, pre-computing the numbers and shipping static files makes
a lot more sense than paying the memory tax of keeping a Python web server
alive.

## Trying Different Outputs Side by Side

I used `polars` to prepare `detroit_maternal_clean.parquet` and compute the
disparity metrics—like percentage-point gaps and Detroit-to-Michigan ratios—and
then tried a few ways of presenting the results:

- **Standalone Plotly HTML charts:** Quick to generate from Python and easy to
  inspect, including an interactive indicator view.
- **A D3.js static view (`indicators.json`):** More code up front, and definitely
  a different mental model from Python, but once it rendered it felt much
  cleaner—smoother transitions, tighter layout control, and a look that felt
  closer to an actual publication.
- **GitHub Actions + GitHub Pages:** Wiring up automated static deployment so
  pushing changes updates the pages without manual babysitting.
- **Deepnote:** Uploading the Parquet file directly to build an interactive
  notebook and app with a dropdown selector and context blocks for reviewers,
  with Deepnote AI helping move things along.

You can check out the code and scripts in my
[maternal-health-dashboard-v1 repository on GitHub](https://github.com/kayanhales/maternal-health-dashboard-v1).

## What the Data Surfaces

Even when the focus is on tools and architecture, the real reason to build
this comparison is to see how Detroit stacks up against Wayne County and
Michigan across maternal health and structural context indicators—ranking
multi-area measures by the Detroit-to-Michigan ratio while keeping
Detroit-only indicators separate so they aren't forced into an apples-to-oranges
comparison. 

**For example, one of the finds was that 25.9% of mother in Detroit did not plan to breastfeed, compared to 17.8% in Wayne county and 11.7% in Michigan.**

## What I Learned

Sometimes the best way to learn the craft is to pick a cause or topic you
genuinely care about, get a messy or multi-area dataset into shape, and test
tools until you feel the difference between them.

Seeing Plotly and D3 next to each other taught me more in an afternoon than
skimming comparisons ever would, and using AI tools as a sounding board kept
momentum high when I ran into friction. I'm still early in my Master's program
and still figuring out a lot of this as I go, but days like today make the
whole thing feel real.

I'm looking forward to continuing to build on exploring maternal health data, especially as a prep for my thesis!