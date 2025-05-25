---
title: 'Tag Archive'
layout: 'layouts/feed.html.njk'
pagination:
  data: collections
  size: 1
  alias: tag
  filter: ['all', 'nav', 'blog', 'work', 'featuredWork', 'people', 'rss']
permalink: '/tags/{{ tag | slugify }}/'
---
