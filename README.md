# GitHub XP

> Extract your GitHub experience into AI-ready data formats

GitHub XP analyzes your GitHub repositories and outputs structured experience data (JSON/Markdown) that AI or resume builders can use to generate professional resumes.

## Why?

Listing "React, TypeScript, Solana" on a resume doesn't prove anything. Recruiters want to see what you've built and the impact you made. GitHub XP scans your repos, extracts real project experience, and formats it for AI consumption.

## Installation

```bash
npm install -g github-xp
```

Or with Cargo:
```bash
cargo install github-xp
```

## Quick Start

```bash
# Scan your GitHub profile
gh-xp scan thejamesnick

# Match against a job description
gh-xp match thejamesnick --job "React TypeScript Solana Developer"

# Export to JSON for AI/resume builders
gh-xp export thejamesnick --format json > experience.json
```

## Commands

| Command | Description |
|---------|-------------|
| `gh-xp scan <username>` | List all repos with detected skills |
| `gh-xp match <username> --job "<description>"` | Generate experience data matched to job requirements |
| `gh-xp skills <username>` | Show aggregated skills inventory |
| `gh-xp export <username> --format json\|md` | Export experience data for AI consumption |
| `gh-xp config set-token <PAT>` | Save GitHub token for private repos |

## Options

| Flag | Description |
|------|-------------|
| `--job, -j` | Job description to match against |
| `--token, -t` | GitHub Personal Access Token for private repos |
| `--format, -f` | Output format: `text`, `json`, `markdown` |
| `--limit, -l` | Number of projects to analyze (default: all) |

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

For private repositories, set up a GitHub Personal Access Token:

```bash
# Set token via command
gh-xp config set-token ghp_xxxxxxxxxxxx

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
npm install

# Run locally
npm run dev

# Build
npm run build
```

## Contributing

PRs welcome! See [PRD.md](./PRD.md) for the full product specification.

## License

MIT

---

**Built by:** [Nicholas James](https://github.com/thejamesnick)  
**Purpose:** Extract GitHub experience data for AI-powered resume generation