---
name: github-xp
description: Extract structured GitHub experience data (projects, READMEs, skills) in JSON/Markdown format for AI-powered resume generation. Use when user mentions GitHub profile, resume building, portfolio generation, or extracting project experience from repositories.
license: MIT
metadata:
  version: 1.0.0
  author: Nicholas James
  repository: https://github.com/thejamesnick/github-xp
---

# GitHub XP - Extract GitHub Experience for Resume Generation

## What This Skill Does

GitHub XP extracts comprehensive project data from GitHub profiles and outputs structured JSON or Markdown files.

## When to Use

Use when user wants to generate resume content from GitHub, extract project experience, or build a portfolio from repositories.

## Installation

```bash
npm install -g github-xp
```

## Usage

```bash
gh-xp export <username> --format json > experience.json
```

See full documentation at: https://github.com/thejamesnick/github-xp
