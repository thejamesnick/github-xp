# GitHub XP

> Extract your GitHub experience into AI-ready data formats

GitHub XP analyzes your GitHub repositories and outputs structured experience data (JSON/Markdown) that AI or resume builders can use to generate professional resumes.

## Why?

Listing "React, TypeScript, Solana" on a resume doesn't prove anything. Recruiters want to see what you've built and the impact you made. GitHub XP scans your repos, extracts real project experience, and formats it for AI consumption.

## Installation

```bash
npm install -g github-xp
```

Or run directly with npx:
```bash
npx github-xp scan <username>
```

Or from source:
```bash
git clone https://github.com/thejamesnick/github-xp
cd github-xp
bun install
bun run src/index.ts --help
```

## Quick Start

```bash
# Scan your GitHub profile
gh-xp scan thejamesnick

# Show skills inventory
gh-xp skills thejamesnick

# Export to JSON for AI/resume builders
gh-xp export thejamesnick --format json > experience.json
```

## Commands

| Command | Description |
|---------|-------------|
| `scan <username>` | List all repos with detected skills |
| `skills <username>` | Show aggregated skills inventory |
| `export <username>` | Export experience data for AI consumption |
| `config set-token <PAT>` | Save GitHub token for private repos |
| `config status` | Check if token is configured |

## Options

| Flag | Description |
|------|-------------|
| `--token, -t` | GitHub Personal Access Token for private repos |
| `--format, -f` | Output format: `text`, `json`, `markdown` (export only) |
| `--limit, -l` | Number of projects to analyze (export only, default: 10) |

## Example Output

### Text Format (Default)
```
━ EXPERIENCE EVIDENCE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📂 PROJECT: Burner Wallet
   ├─ Stack: React JS, JavaScript, Solana Web3 JS, Crypto.JS
   └─ Experience Points:
      • Built a Solana web wallet & browser extension using React & JavaScript
      • Implemented secure transaction signing with Crypto.JS & TweetNacl.js
      • Integrated Solana blockchain using Solana Web3 JS library

📂 PROJECT: SIKGuard Wallet  
   ├─ Stack: Rust, Solana, Blockchain
   └─ Experience Points:
      • Lead development of production Solana wallet (Rust backend)
      • Implemented cryptographic security standards for crypto transactions
```

### JSON Format
```json
{
  "username": "thejamesnick",
  "scanned_at": "2026-03-11T10:30:00Z",
  "skills": {
    "React": { "projects": 3, "lines": 15420 },
    "TypeScript": { "projects": 2, "lines": 8930 },
    "Solana": { "projects": 2, "lines": 5200 }
  },
  "projects": [
    {
      "name": "Burner Wallet",
      "url": "https://github.com/thejamesnick/burner-wallet",
      "languages": ["JavaScript", "React"],
      "experience_points": [
        "Built a Solana web wallet & browser extension using React & JavaScript",
        "Implemented secure transaction signing with Crypto.JS & TweetNacl.js"
      ]
    }
  ]
}
```

### Markdown Format
```markdown
## Projects

### Burner Wallet
- **Stack:** React, JavaScript, Solana Web3 JS
- **Experience:**
  - Built a Solana web wallet & browser extension using React & JavaScript
  - Implemented secure transaction signing with Crypto.JS & TweetNacl.js
```

## Authentication

For private repositories and higher rate limits, set up a GitHub Personal Access Token:

1. Go to https://github.com/settings/tokens/new
2. Create a token with `repo` scope (or no scopes for public repos only)
3. Save it:

```bash
bun run src/index.ts config set-token ghp_xxxxxxxxxxxx

# Or use environment variable
export GITHUB_TOKEN=ghp_xxxxxxxxxxxx
```

**Rate Limits:**
- Without auth: 60 requests/hour
- With auth: 5,000 requests/hour

## Use Cases

- **AI Resume Builders:** Feed the JSON output to AI to generate tailored resumes
- **Portfolio Generation:** Convert your GitHub work into portfolio content
- **Job Applications:** Quickly match your experience to job requirements
- **Skills Inventory:** See what technologies you've actually used in production

## Supported Technologies

Frontend, Mobile, Backend, Blockchain, Databases, DevOps, and 20+ languages including:
- JavaScript, TypeScript, Python, Rust, Go, Swift, Kotlin
- React, Vue, Angular, Next.js, React Native, Flutter
- Node.js, Express, Django, FastAPI
- Solidity, Solana, ethers.js, web3.js
- PostgreSQL, MongoDB, Redis, Prisma
- Docker, Kubernetes, AWS, GCP

## Development

```bash
# Clone the repo
git clone https://github.com/thejamesnick/github-xp
cd github-xp

# Install dependencies
bun install

# Run locally
bun run src/index.ts scan <username>

# Build standalone executable
bun run build
```

## Contributing

PRs welcome! See [PRD.md](./PRD.md) for the full product specification.

## License

MIT

---

**Built by:** [Nicholas James](https://github.com/thejamesnick)  
**Purpose:** Extract GitHub experience data for AI-powered resume generation