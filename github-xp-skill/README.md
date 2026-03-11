# GitHub XP Agent Skill

This is an Agent Skill for using the GitHub XP CLI tool to extract structured experience data from GitHub profiles for AI-powered resume generation.

## Installation

Install this skill using the Agent Skills CLI:

```bash
npx skills add github.com/thejamesnick/github-xp/github-xp-skill
```

Or install locally:

```bash
npx skills add ./github-xp-skill
```

## What This Skill Provides

This skill teaches AI agents how to:
- Extract project data from GitHub profiles
- Parse repository READMEs and metadata
- Generate structured JSON/Markdown output
- Create professional resume bullets from project documentation

## Prerequisites

The GitHub XP CLI tool must be installed:

```bash
npm install -g github-xp
```

## Usage

Once installed, AI agents will automatically activate this skill when users mention:
- GitHub profile analysis
- Resume generation from GitHub
- Portfolio building
- Project experience extraction

## Learn More

- GitHub XP Tool: https://github.com/thejamesnick/github-xp
- NPM Package: https://www.npmjs.com/package/github-xp
- Agent Skills Standard: https://vercel.com/kb/guide/agent-skills-creating-installing-and-sharing-reusable-agent-context
