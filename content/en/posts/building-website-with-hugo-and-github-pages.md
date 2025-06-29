---
author : "Miroslaw Steblik"  
date: 2025-06-28T10:58:08-04:00
title: "Building a Website with Hugo and GitHub Pages: A Complete Guide"
description: "Learn how to create a fast, secure website using Hugo static site generator and host it for free on GitHub Pages. Step-by-step guide."
featured_image: "/images/hugo-github-pages-guide.jpg"
tags: ["hugo", "github-pages", "static-site", "web-development", "go"]
show_reading_time: true
---

## Table of Contents
- [Introduction](#introduction)
- [What is Hugo?](#what-is-hugo)
- [Setting Up Hugo](#setting-up-hugo)
- [Creating First Content](#creating-your-first-content)
- [Deploying to GitHub Pages](#deploying-to-github-pages)
- [Custom Domain Setup](#custom-domain-setup)
- [Optimizing My Site](#optimizing-your-site)
- [Conclusion](#conclusion)


## Introduction {#introduction}

After years of using WordPress for my personal projects, I decided to try something different for my portfolio site. I wanted a solution that was fast, secure, and didn't require constant updates and maintenance. That's when I discovered **Hugo and GitHub Pages** - a powerful combination for creating static websites.

In this guide, I'll walk you through my complete process of building this very website using Hugo and deploying it to GitHub Pages. You'll learn how to set up a development environment, create content with Markdown, customize themes, and automate deployment - all for free (almost) and without worrying about databases or server management.


## What is Hugo? {#what-is-hugo}

[Hugo](https://gohugo.io/about/introduction/) is a static site generator written in Go, optimized for speed and designed for flexibility.

You can use Hugo’s embedded web server during development to instantly see changes to content, structure, behavior, and presentation. Then deploy the site to your host, or push changes to your Git provider for automated builds and deployment.


## Setting Up Hugo {#setting-up-hugo}

### Prerequisites

1. [Install](https://gohugo.io/installation/) Hugo 
2. Install Git 
3. Have Github account

### Create a site

```sh
hugo new site steblikcom && cd steblikcom
git init
hugo new theme steblik
echo "theme = 'steblik'" >> hugo.toml
hugo server   # Start Hugo’s development server to view the site.
```

Hugo have created folder structure in my root directory, including the `hugo.toml`

### Why you should create a theme

If you package your site's layout, partials, styles, etc., into a Hugo theme:

- It becomes modular and reusable.

- You can include it in other Hugo projects via Git submodules (or as a remote theme).

- Your main site(s) can stay clean and only define content + config.

- You can version the theme and keep it separate from site-specific content.


## Creating First Content

Add a new page to the site
```sh
hugo new content content/articles/my-first-post.md
```

Hugo created file in the `content/posts/` directory. Note that `draft` is set to true. By defaul Hugo does not publish draft content when you build site. 

To see draft content run
```sh
hugo server --buildDrafts
```

More information on  [Hugo Quick start](https://gohugo.io/getting-started/quick-start/)

### Additional setup
- i added images under `static/images`
- css

### Layout Templates
`baseof.html` - This is your master template that defines the overall HTML structure. It contains the <html>, <head>, and <body> tags, plus block definitions that other templates extend. Think of it as your site's skeleton that all other pages inherit from.
`home.html` - The template for your site's homepage (index page). This renders when someone visits your root domain. It typically shows featured content, recent posts, or whatever you want as your landing page.
`page.html` - Used for individual pages (not posts). These are standalone content pages like "About", "Contact", or any single page content you create.
`section.html` - Renders section pages that list content within a specific section of your site. For example, if you have a "blog" section, this template shows the list of all blog posts.

### Taxonomy Templates
`taxonomy.html` - Shows all terms within a taxonomy. For instance, if you have a "categories" taxonomy, this would list all your categories with their post counts.
`term.html` - Displays all content tagged with a specific taxonomy term. For example, all posts tagged with "technology" if that's one of your categories.

### Other Common Templates
`list.html` - A generic list template for any collection of content pages. Falls back when more specific templates aren't found.
`single.html` - Template for individual content items, typically blog posts or articles.
`404.html` - Your custom "page not found" error page.