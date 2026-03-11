# Installation & Setup Guide

## Prerequisites

- Bun runtime (v1.0+)
- GitHub account

## Installation

### From Source

```bash
# Clone the repository
git clone https://github.com/thejamesnick/github-xp
cd github-xp

# Install dependencies
bun install

# Run locally
bun run src/index.ts --help
```

### Build Executable

```bash
# Compile to single executable
bun run build

# This creates a `gh-xp` binary you can move to your PATH
mv gh-xp /usr/local/bin/
```

## GitHub Token Setup (Recommended)

To avoid rate limits and access private repositories, set up a GitHub Personal Access Token:

### 1. Create a Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name like "github-xp"
4. Select scopes: `repo` (for private repos) or leave empty (for public only)
5. Click "Generate token"
6. Copy the token (starts with `ghp_`)

### 2. Save the Token

```bash
# Option 1: Use the config command
gh-xp config set-token ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Option 2: Set environment variable
export GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Option 3: Create .env file
echo "GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" > .env
```

### 3. Verify

```bash
gh-xp config status
```

## Rate Limits

| Type | Limit |
|------|-------|
| Without token | 60 requests/hour |
| With token | 5,000 requests/hour |

For analyzing profiles with many repos, a token is highly recommended.

## Quick Test

```bash
# Test with a public profile
gh-xp scan octocat

# Export your own profile
gh-xp export yourusername --format json > experience.json
```

## Troubleshooting

### "Rate limit exceeded"
- Set up a GitHub token (see above)
- Wait an hour for the limit to reset
- Use `--limit` flag to analyze fewer repos

### "User not found"
- Check the username spelling
- Ensure the profile is public

### "Command not found: gh-xp"
- Make sure you've built the executable: `bun run build`
- Add the binary to your PATH or use the full path
