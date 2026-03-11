---
name: github-xp-skill
description: Extract structured GitHub experience data (projects, READMEs, skills) in JSON/Markdown format for AI-powered resume generation. Use when user mentions GitHub profile, resume building, portfolio generation, or extracting project experience from repositories.
license: MIT
metadata:
  version: 1.0.0
  author: Nicholas James
  repository: https://github.com/thejamesnick/github-xp
---

# GitHub XP - Extract GitHub Experience for Resume Generation

## What This Skill Does

GitHub XP is a CLI tool that extracts comprehensive project data from GitHub profiles and outputs structured JSON or Markdown files containing:
- Full README content for each repository
- Programming languages used with line counts
- Skills inventory aggregated across all projects
- Project metadata (stars, forks, descriptions, URLs)

The output is designed for AI agents to generate professional resume content by reading actual project documentation.

## When to Use This Skill

Use this skill when the user:
- Wants to generate resume content from their GitHub profile
- Needs to extract project experience data
- Asks to analyze their GitHub repositories
- Wants a skills inventory from their code
- Mentions building a portfolio from GitHub projects

**Do NOT use** when:
- User just wants to view their GitHub profile (use browser)
- User wants to push/pull code (use git)

## Inputs Needed

1. **GitHub username** (required)
2. **GitHub Personal Access Token** (optional, but recommended)
   - Without token: 60 requests/hour
   - With token: 5,000 requests/hour
   - Get at: https://github.com/settings/tokens/new

## Step-by-Step Procedure

### 1. Install GitHub XP (if not installed)

```bash
npm install -g github-xp
```

### 2. Configure GitHub Token (Optional but Recommended)

```bash
gh-xp config set-token ghp_xxxxxxxxxxxx
```

### 3. Export Experience Data

```bash
gh-xp export <username> --format json --limit 10 > experience.json
```

**Key Options:**
- `--format json` - Use JSON for AI processing (recommended)
- `--limit 10` - Number of projects (default: 10)
- `--include-forks` - Include forked repos (default: excludes)

### 4. Read and Parse the JSON Output

The JSON structure contains:

```json
{
  "username": "string",
  "scannedAt": "ISO timestamp",
  "skills": {
    "TypeScript": {
      "projects": 5,
      "totalLines": 12345,
      "repos": ["repo1", "repo2"]
    }
  },
  "projects": [
    {
      "name": "project-name",
      "url": "https://github.com/user/repo",
      "description": "Short description",
      "languages": ["TypeScript", "JavaScript"],
      "languageStats": {"TypeScript": 15000},
      "stars": 42,
      "forks": 5,
      "readme": "Full README.md content"
    }
  ]
}
```

### 5. Generate Resume Bullets from README Content

For each project:

1. **Read the `readme` field** - Contains full project documentation
2. **Extract key features** from README sections (Features, What, Capabilities)
3. **Identify technologies** from `languages` array
4. **Note impact** from `stars` and `forks` (if > 10)
5. **Write 2-3 specific bullets** using action verbs

**Action Verbs to Use:**
Built, Developed, Implemented, Architected, Designed, Engineered, Created, Deployed, Integrated, Optimized

**Example Transformation:**

**Input (from JSON):**
```json
{
  "name": "github-xp",
  "description": "Extract GitHub experience into AI-ready data formats",
  "languages": ["TypeScript"],
  "readme": "# GitHub XP\n\nGitHub XP analyzes GitHub repositories and outputs structured experience data (JSON/Markdown) for AI-powered resume generation.\n\n## Features\n- Scans GitHub repos via API\n- Extracts language statistics\n- Fetches full README content\n- Outputs in JSON/Markdown formats\n- Supports authentication for private repos"
}
```

**Output (Resume Bullets):**
```
• Developed GitHub XP, a CLI tool for extracting structured experience data from GitHub repositories using TypeScript
• Implemented GitHub API integration to scan repositories and extract language statistics with rate limit handling
• Built JSON/Markdown export functionality enabling AI-powered resume generation from project READMEs
```

## Validation / How to Know We're Done

✅ JSON file created successfully  
✅ File contains `projects` array with data  
✅ Each project has `readme` field (or `description` if no README)  
✅ Resume bullets are specific and mention actual features  
✅ Technologies from `languages` array are included  
✅ Bullets start with action verbs  

## Common Failure Modes and Fixes

### "User not found"
**Cause:** Invalid GitHub username  
**Fix:** Verify username exists on GitHub

### "Rate limit exceeded"
**Cause:** Too many API requests without token  
**Fix:** Configure token with `gh-xp config set-token <token>`

### README is null
**Cause:** Repository has no README file  
**Fix:** Use the `description` field instead

### Too many obscure languages in output
**Cause:** Including forked repositories  
**Fix:** Tool excludes forks by default (don't use `--include-forks`)

### Projects seem irrelevant
**Cause:** Scanning all repos including old projects  
**Fix:** Reduce `--limit` to focus on recent projects

## Additional Commands

### Quick Scan (Overview)
```bash
gh-xp scan <username>
```
Shows list of repositories with languages and stats.

### Skills Inventory
```bash
gh-xp skills <username>
```
Shows aggregated skills across all repositories.

### Check Token Status
```bash
gh-xp config status
```

## Best Practices for AI Agents

1. **Always use JSON format** for structured data
2. **Read the README field** - it's the most valuable content
3. **Be specific** - use actual project features from README, not generic descriptions
4. **Include technologies** - mention languages from the `languages` array
5. **Add metrics** - mention stars/forks when significant (>10)
6. **Use action verbs** - start bullets with: Built, Developed, Implemented, etc.
7. **Limit to 2-3 bullets per project** - focus on key accomplishments
8. **Exclude forks** - tool does this by default

## Example Complete Workflow

```bash
# 1. Install (if needed)
npm install -g github-xp

# 2. Set up token (optional)
gh-xp config set-token ghp_xxxxxxxxxxxx

# 3. Export data
gh-xp export octocat --format json --limit 5 > octocat.json

# 4. Read JSON and generate resume content
# Parse the JSON, read each project's README, and create bullets
```

## Support

- GitHub: https://github.com/thejamesnick/github-xp
- NPM: https://www.npmjs.com/package/github-xp
- Issues: https://github.com/thejamesnick/github-xp/issues
