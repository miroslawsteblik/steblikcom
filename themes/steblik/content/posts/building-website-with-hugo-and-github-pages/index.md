---
author : "Miroslaw Steblik"  
date: 2025-06-28T10:58:08-04:00
title: "Building a Website with Hugo and GitHub Pages: A Complete Guide"
description: "Learn how to create a fast, secure website using Hugo static site generator and host it for free on GitHub Pages. Step-by-step guide."
featured_image: "github_actions_succesful.jpeg"
card_image: "/images/github_logo_icon_large2.png" 
tags: ["hugo", "github-pages", "static-site", "web-development", "go"]
show_reading_time: true
---

## Table of Contents
- [Introduction](#introduction)
- [What is Hugo?](#what-is-hugo)
- [Setting Up Hugo](#setting-up-hugo)
- [Creating First Content](#creating-your-first-content)
- [Custom Domain Setup](#custom-domain-setup)
- [Deploying to GitHub Pages](#deploying-to-github-pages)
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

### Setup
- Added images under `static/images/`
- Added css files under `assets/css/` and under `static/css/`
- Added Hugo shortcodes under `layouts/shortcodes/` to allow safe usage of HTML in content files
- Apdated and created HTML files under `layouts/`
- Build my website menu with three items: `Home`, `About`, `Blog`
- Added main content under `content/`


## Custom Domain Setup {#custom-domain-setup}

I chose [GoDaddy](https://www.godaddy.com/en-uk) to buy my custom domain. Whole process was relatively easy and straightforward. 

After purchase I had to configure DNS on my domain provider portal. Added `Type A` records with `Name: @` and Github IP adresses.

[NOTE] I run out into issues, as Github requires that only Type A records are associated with their IP addresses, but GoDaddy have created "is comming" page and their WebBuilder records that had to be deleted. 

More information on  [Configuring a custom domain for Github Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

I have also placed custom `CNAME` file under my `static/`  with name of my domain


## Deploying to GitHub Pages {#deploying-to-github-pages}

**GitHub Pages:** Uses the built-in Pages action to deploy directly to username.github.io or a custom domain.

```sh
git add . && git commit -m "development complete"
```

### Set up github workflow
- Added `.github/workflow/hugo.yml` to my root

```
name: Deploy Hugo site to Pages

on:
  push:
    branches:
      - master  # Set a branch to deploy
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-22.04
    permissions:
      contents: read
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true  # Fetch Hugo themes (true OR recursive)
          fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          extended: true

      - name: Build
        run: hugo --minify

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```


- Went to my repository **Settings** and under **Pages** -> **Build and deployment** *Source* selected `Github Actions`. 
- Added custom domain, DNS check was performed, once succesfull i added *Enforce HTTPS*


**Trigger:** The workflow activates when you push to a specific branch (usually main or master) or create a pull request.

**Build Process:** GitHub Actions spins up a virtual machine, installs Hugo, checks out  code, and runs hugo to generate the static site files in the public/ directory.

**Deployment:** The generated files are then deployed to hosting platform.

Now each time i perform `git push` github action provides automatic deployment, version control integration, build error detection, and the ability to preview changes through pull requests before they go live.



**See you next time!**

